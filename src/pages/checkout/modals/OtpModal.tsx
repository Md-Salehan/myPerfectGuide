// ============================================================
// src/pages/checkout/modals/OtpModal.tsx
// Phone-only OTP verification modal (Firebase Phone Auth).
//
// Contract:
//   sendOtp(identity)      → Promise<{ devCode?: string }>
//   verifyOtp(otp)         → Promise<{ verified, reason? }>
//
// No RequestHandle / abort: Firebase phone sign-in has no
// cancellation token. Stale responses are discarded via an
// attempt-id counter (React's recommended pattern for
// "ignore the result of a superseded async call").
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Modal } from "../../../components/common/Modal";
import { OtpInput } from "../../../components/common/OtpInput";

import {
  OTP_LENGTH,
  RESEND_COOLDOWN_SECONDS,
} from "../constants";

interface OtpModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** The phone number the code was sent to (10 digits). */
  identity: string;
  /**
   * Trigger the send (or resend). Resolves once Firebase has
   * accepted the request; rejects on reCAPTCHA / Firebase error.
   */
  sendOtp: (identity: string) => Promise<{ devCode?: string }>;
  /**
   * Verify the entered code. Resolves with `verified: false`
   * (never rejects) on a wrong/expired/superseded code.
   */
  verifyOtp: (otp: string) => Promise<{ verified: boolean; reason?: string }>;
  /** Called when verification succeeds. Parent closes the modal. */
  onSuccess: () => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

/* ------------------------------------------------------------
   Outer wrapper — owns only "should the body exist?"
   ------------------------------------------------------------ */

export function OtpModal(props: OtpModalProps) {
  const { open, identity } = props;

  if (!open) return null;

  // Remount the body whenever the identity changes, so a fresh
  // phone number always starts with empty digits + a fresh timer.
  return <OtpModalBody key={identity} {...props} />;
}

/* ------------------------------------------------------------
   Inner body — owns all interactive state for one attempt
   ------------------------------------------------------------ */

function OtpModalBody({
  identity,
  verifyOtp,
  sendOtp,
  onSuccess,
  onClose,
}: OtpModalProps) {
  /* ---------- Local state (initialised per attempt) ---------- */

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);

  /* ---------- Stale-attempt guards ---------- */

  const verifyAttemptId = useRef(0);
  const resendAttemptId = useRef(0);

  /* ---------- Resend cooldown ticker ---------- */

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const id = window.setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [resendCooldown]);

  /* ---------- Derived ---------- */

  const code = digits.join("");
  const isComplete = code.length === OTP_LENGTH && digits.every(Boolean);
  const canResend = !resending && !verifying && resendCooldown === 0;

  const title = "Verify your phone";
  const description = `Enter the ${OTP_LENGTH}-digit code sent to +91 ${identity}.`;

  /* ---------- Handlers ---------- */

  const handleSubmit = async () => {
    if (!isComplete || verifying) return;

    const myAttempt = ++verifyAttemptId.current;
    setVerifying(true);
    setError(null);

    try {
      const result = await verifyOtp(code);
      if (myAttempt !== verifyAttemptId.current) return; // superseded

      if (result.verified) {
        onSuccess();
      } else {
        setError(result.reason ?? "Incorrect code. Please try again.");
        setVerifying(false);
      }
    } catch {
      if (myAttempt !== verifyAttemptId.current) return;
      setError("Could not verify the code. Please try again.");
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    const myAttempt = ++resendAttemptId.current;
    setResending(true);
    setError(null);

    try {
      await sendOtp(identity);
      if (myAttempt !== resendAttemptId.current) return;
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      if (myAttempt !== resendAttemptId.current) return;
      setError("Could not resend the code. Please try again.");
    } finally {
      if (myAttempt === resendAttemptId.current) {
        setResending(false);
      }
    }
  };

  /* ---------- Render ---------- */

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="space-y-5">
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