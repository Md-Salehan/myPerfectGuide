// ============================================================
// src/pages/checkout/modals/PhoneOtpModal.tsx
// Phone OTP entry modal.
//
// Renders <Modal /> + <OtpInput /> and drives the phone OTP
// verify flow via RTK Query:
//   - <Verify> is disabled until all 6 digits are filled
//     (explicit submit — no auto-submit on the 6th digit)
//   - resend triggers sendPhoneOtp again, with a 60s cooldown
//   - the modal cannot be dismissed while verifying
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Modal } from "../../../components/common/Modal";
import { OtpInput } from "../../../components/common/OtpInput";

import {
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
} from "../../../services/checkoutApi";

import {
  OTP_LENGTH,
  RESEND_COOLDOWN_SECONDS,
} from "../constants";

interface PhoneOtpModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Phone number the OTP was sent to (10 digits, no prefix). */
  phone: string;
  /**
   * Dev hint code returned by the mock send call. When absent,
   * the hint is not rendered. Real backends omit this.
   */
  devCode?: string;
  /** Called when verification succeeds. Parent closes the modal. */
  onSuccess: () => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

export function PhoneOtpModal({
  open,
  phone,
  devCode,
  onSuccess,
  onClose,
}: PhoneOtpModalProps) {
  /* ---------- Local state ---------- */

  // Array of single-character strings. Length matches OTP_LENGTH.
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  // Local dev-hint mirror, so a resend can update it.
  const [hintCode, setHintCode] = useState<string | undefined>(devCode);

  // Tracks the latest mutation error so we don't lose it when
  // we clear local state on a subsequent attempt.
  const verifyMutation = useVerifyPhoneOtpMutation()[0];
  const resendMutation = useSendPhoneOtpMutation()[0];
  const verifyMutationState = useVerifyPhoneOtpMutation()[1];
  const resendMutationState = useSendPhoneOtpMutation()[1];

  // Ref to avoid a stale closure inside the cooldown timer.
  const cooldownRef = useRef<number>(RESEND_COOLDOWN_SECONDS);

  /* ---------- Reset state on open ---------- */

  // When the modal opens, clear digits, errors, and restart the
  // resend cooldown. When it closes, we leave state intact —
  // the parent unmounts us anyway.
  useEffect(() => {
    if (!open) return;
    setDigits(Array.from({ length: OTP_LENGTH }, () => ""));
    setError(null);
    setVerifying(false);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    cooldownRef.current = RESEND_COOLDOWN_SECONDS;
    setHintCode(devCode);
  }, [open, devCode]);

  /* ---------- Resend cooldown ticker ---------- */

  useEffect(() => {
    if (!open) return;
    if (resendCooldown <= 0) return;

    const id = window.setInterval(() => {
      cooldownRef.current = Math.max(0, cooldownRef.current - 1);
      setResendCooldown(cooldownRef.current);
      if (cooldownRef.current === 0) {
        window.clearInterval(id);
      }
    }, 1000);

    return () => window.clearInterval(id);
  }, [open, resendCooldown]);

  /* ---------- Derived ---------- */

  const code = digits.join("");
  const isComplete = code.length === OTP_LENGTH && digits.every(Boolean);
  const canResend = !resending && !verifying && resendCooldown === 0;

  /* ---------- Handlers ---------- */

  const handleSubmit = async () => {
    if (!isComplete || verifying) return;
    setVerifying(true);
    setError(null);

    try {
      const result = await verifyMutation({ phone, otp: code }).unwrap();
      if (result.verified) {
        onSuccess();
      } else {
        setError(result.reason ?? "Incorrect code. Please try again.");
        setVerifying(false);
      }
    } catch {
      setError("Could not verify the code. Please try again.");
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResending(true);
    setError(null);

    try {
      const result = await resendMutation({ phone }).unwrap();
      if (result.devCode) {
        setHintCode(result.devCode);
      }
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      cooldownRef.current = RESEND_COOLDOWN_SECONDS;
    } catch {
      setError("Could not resend the code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleClose = () => {
    if (verifying) return; // block close while verifying
    onClose();
  };

  /* ---------- Render ---------- */

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Verify your phone"
      description={`Enter the ${OTP_LENGTH}-digit code sent to +91 ${phone}.`}
    >
      <div className="space-y-5">
        {/* OTP input */}
        <OtpInput
          value={digits}
          onChange={(next) => {
            setDigits(next);
            if (error) setError(null);
          }}
          length={OTP_LENGTH}
          disabled={verifying}
          invalid={!!error}
          autoFocus
        />

        {/* Dev hint */}
        {hintCode && (
          <p className="text-center text-[12px] text-slate-400">
            Dev code:{" "}
            <span className="font-mono font-semibold text-slate-600">
              {hintCode}
            </span>
          </p>
        )}

        {/* Inline error */}
        {error && (
          <p
            role="alert"
            className="text-rose-600 text-[13px] text-center flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Verify button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete || verifying}
          className={[
            "w-full h-11 rounded-lg text-white text-[15px] font-medium transition",
            isComplete && !verifying
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-300 cursor-not-allowed",
          ].join(" ")}
        >
          {verifying ? "Verifying…" : "Verify"}
        </button>

        {/* Resend link */}
        <p className="text-center text-[13.5px] text-slate-500">
          Didn't get the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          ) : (
            <span className="text-slate-400">
              Resend in {resendCooldown}s
            </span>
          )}
        </p>
      </div>

      {/*
        Silent reads of mutation state to keep the hook
        subscriptions active. The fields are unused because we
        drive the UI from the awaited unwrap() results above,
        but reading .isLoading here keeps React happy if the
        hook ever needs to trigger a re-render on status change.
      */}
      <span className="hidden">
        {String(verifyMutationState.isLoading)}
        {String(resendMutationState.isLoading)}
      </span>
    </Modal>
  );
}