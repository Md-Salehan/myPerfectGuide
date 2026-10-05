// ============================================================
// src/pages/checkout/modals/EmailOtpModal.tsx
// Email OTP entry modal.
//
// Structurally identical to PhoneOtpModal — the only
// differences are the identity the flow is bound to (email
// instead of phone) and the two RTK Query hooks it uses.
//
// Kept as a separate file (rather than a `channel` prop on a
// shared modal) because sharing would require a hook lookup
// table and would make both call sites harder to read.
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Modal } from "../../../components/common/Modal";
import { OtpInput } from "../../../components/common/OtpInput";

import {
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
} from "../../../services/checkoutApi";

import {
  OTP_LENGTH,
  RESEND_COOLDOWN_SECONDS,
} from "../constants";

interface EmailOtpModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Email address the code was sent to. */
  email: string;
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

export function EmailOtpModal({
  open,
  email,
  devCode,
  onSuccess,
  onClose,
}: EmailOtpModalProps) {
  /* ---------- Local state ---------- */

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  const [hintCode, setHintCode] = useState<string | undefined>(devCode);

  const [verifyEmailOtp] = useVerifyEmailOtpMutation();
  const [sendEmailOtp] = useSendEmailOtpMutation();

  const cooldownRef = useRef<number>(RESEND_COOLDOWN_SECONDS);

  /* ---------- Reset on open ---------- */

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
      const result = await verifyEmailOtp({ email, otp: code }).unwrap();
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
      const result = await sendEmailOtp({ email }).unwrap();
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
    if (verifying) return;
    onClose();
  };

  /* ---------- Render ---------- */

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Verify your email"
      description={`Enter the ${OTP_LENGTH}-digit code sent to ${email}.`}
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
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
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
    </Modal>
  );
}