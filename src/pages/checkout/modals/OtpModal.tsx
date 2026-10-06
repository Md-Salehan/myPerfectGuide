// ============================================================
// src/pages/checkout/modals/OtpModal.tsx
// Unified, channel-agnostic OTP verification modal.
//
// Handles BOTH phone and email verification through a single
// implementation. The parent (CheckoutPage, via VerifySection)
// supplies:
//   - `channel`  : "phone" | "email"  — used only for copy
//   - `identity` : the phone number or email the code was sent to
//   - `sendOtp`  : callback to (re)send the code for this channel
//   - `verifyOtp`: callback to verify the code for this channel
//
// This modal deliberately does NOT import any RTK Query hooks.
// It is purely presentational + flow-driven, so the same
// component serves both channels without branching on which
// mutation to call. All channel-specific wiring lives in
// CheckoutPage / VerifySection.
//
// Reuses:
//   - <Modal />      (src/components/common/Modal.tsx)
//   - <OtpInput />   (src/components/common/OtpInput.tsx)
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Modal } from "../../../components/common/Modal";
import { OtpInput } from "../../../components/common/OtpInput";

import {
  OTP_LENGTH,
  RESEND_COOLDOWN_SECONDS,
} from "../constants";

import type { VerifyChannel } from "../types";

/** The verification channel this modal is currently driving. */
export type OtpChannel = VerifyChannel;

interface OtpModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Which channel is being verified. Drives copy only. */
  channel: OtpChannel;
  /** The phone number or email the code was sent to. */
  identity: string;
  /**
   * Dev hint code returned by the mock send call. When absent,
   * the hint is not rendered. Real backends omit this.
   */
  devCode?: string;
  /**
   * Send (or resend) the OTP for `channel` + `identity`.
   * Resolves with the fresh devCode (if any) so the modal can
   * update its hint. Should reject on failure.
   */
  sendOtp: (args: {
    channel: OtpChannel;
    identity: string;
  }) => Promise<{ devCode?: string }>;
  /**
   * Verify the OTP for `channel` + `identity`.
   * Resolves with `{ verified: true }` on success, or
   * `{ verified: false, reason?: string }` on a wrong code.
   * Should reject on a network-shaped failure.
   */
  verifyOtp: (args: {
    channel: OtpChannel;
    identity: string;
    otp: string;
  }) => Promise<{ verified: boolean; reason?: string }>;
  /** Called when verification succeeds. Parent closes the modal. */
  onSuccess: () => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

export function OtpModal({
  open,
  channel,
  identity,
  devCode,
  sendOtp,
  verifyOtp,
  onSuccess,
  onClose,
}: OtpModalProps) {
  /* ---------- Local state ---------- */

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  // Local dev-hint mirror, so a resend can update it.
  const [hintCode, setHintCode] = useState<string | undefined>(devCode);

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

  // Channel-specific copy. This is the ONLY place the modal
  // branches on `channel` — everything else is channel-agnostic.
  const title = channel === "phone" ? "Verify your phone" : "Verify your email";
  const description =
    channel === "phone"
      ? `Enter the ${OTP_LENGTH}-digit code sent to +91 ${identity}.`
      : `Enter the ${OTP_LENGTH}-digit code sent to ${identity}.`;

  /* ---------- Handlers ---------- */

  const handleSubmit = async () => {
    if (!isComplete || verifying) return;
    setVerifying(true);
    setError(null);

    try {
      const result = await verifyOtp({ channel, identity, otp: code });
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
      const result = await sendOtp({ channel, identity });
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
      title={title}
      description={description}
    >
      <div className="space-y-5">
        {/* OTP input — the ONLY OTP input in the app */}
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