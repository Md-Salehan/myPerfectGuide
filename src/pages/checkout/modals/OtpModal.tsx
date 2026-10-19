// ============================================================
// src/pages/checkout/modals/OtpModal.tsx
// Unified, channel-agnostic OTP verification modal.

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


export interface RequestHandle<T> {
  unwrap(): Promise<T>;
  abort(): void;
}

interface OtpModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Which channel is being verified. Drives copy only. */
  channel: OtpChannel;
  /** The phone number or email the code was sent to. */
  identity: string;
  /**
   * Dev hint code returned by the send call. When absent,
   * the hint is not rendered. Real backends omit this.
   */
  devCode?: string;
  /**
   * Trigger the send (or resend) mutation for `channel` +
   * `identity`.
   *
   * MUST return the RTK Query request handle — do NOT await
   * inside this callback. The modal retains the handle so it
   * can call `.abort()` later.
   */
  sendOtp: (args: {
    channel: OtpChannel;
    identity: string;
  }) => RequestHandle<{ devCode?: string }>;
  /**
   * Trigger the verify mutation for `channel` + `identity`.
   *
   * MUST return the RTK Query request handle — do NOT await
   * inside this callback. The modal retains the handle so it
   * can call `.abort()` later.
   */
  verifyOtp: (args: {
    channel: OtpChannel;
    identity: string;
    otp: string;
  }) => RequestHandle<{ verified: boolean; reason?: string }>;
  /** Called when verification succeeds. Parent closes the modal. */
  onSuccess: () => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

/* ------------------------------------------------------------
   Outer wrapper — owns only "should the body exist?"
   ------------------------------------------------------------ */

export function OtpModal(props: OtpModalProps) {
  const { open, channel, identity, devCode } = props;

  const resetKey = `${channel}:${identity}:${devCode ?? ""}`;

  if (!open) return null;

  return <OtpModalBody key={resetKey} {...props} />;
}

/* ------------------------------------------------------------
   Inner body — owns all interactive state for one attempt
   ------------------------------------------------------------ */

function OtpModalBody({
  channel,
  identity,
  devCode,
  sendOtp,
  verifyOtp,
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
  // Local dev-hint mirror, so a resend can update it.
  const [hintCode, setHintCode] = useState<string | undefined>(devCode);


  const verifyRequestRef = useRef<RequestHandle<{
    verified: boolean;
    reason?: string;
  }> | null>(null);

  const resendRequestRef = useRef<RequestHandle<{
    devCode?: string;
  }> | null>(null);

  /**
   * Abort whichever requests are currently in flight.
   * Safe to call unconditionally; a no-op when nothing is running.
   */
  const abortAllInFlight = () => {
    verifyRequestRef.current?.abort();
    verifyRequestRef.current = null;
    resendRequestRef.current?.abort();
    resendRequestRef.current = null;
  };

  /* ---------- Abort on unmount ----------
     The modal is unmounted by the parent on close (via the outer
     wrapper returning null), so this covers the "closed" case
     as well as "navigated away".
     ------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      abortAllInFlight();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Supersede any previous in-flight verify. Defensive: the UI
    // can't normally reach this while `verifying` is true, but a
    // fast double-click plus a stale `verifying=false` could.
    verifyRequestRef.current?.abort();

    // Trigger the mutation and RETAIN the handle. Do NOT await
    // the trigger itself — the handle is what we cancel with.
    const request = verifyOtp({
      channel,
      identity,
      otp: code,
    });
    verifyRequestRef.current = request;

    setVerifying(true);
    setError(null);

    try {
      const result = await request.unwrap();

      // A stale resolve (superseded by a newer attempt) must not
      // touch state. Identity check covers the case where the
      // request was aborted between the server response arriving
      // and this line running.
      if (verifyRequestRef.current !== request) return;

      if (result.verified) {
        onSuccess();
      } else {
        setError(result.reason ?? "Incorrect code. Please try again.");
        setVerifying(false);
      }
    } catch {
      // Cancellation is not a user-facing error. If the ref no
      // longer points at THIS request, the request was aborted
      // or superseded — either way the modal no longer owns it.
      // No error string, no state write.
      if (verifyRequestRef.current !== request) return;

      setError("Could not verify the code. Please try again.");
      setVerifying(false);
    } finally {
      // Only clear the ref if we're still the current attempt.
      // A newer request must not have its ref clobbered here.
      if (verifyRequestRef.current === request) {
        verifyRequestRef.current = null;
      }
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    resendRequestRef.current?.abort();

    const request = sendOtp({
      channel,
      identity,
    });
    resendRequestRef.current = request;

    setResending(true);
    setError(null);

    try {
      const result = await request.unwrap();

      if (resendRequestRef.current !== request) return;

      if (result.devCode) {
        setHintCode(result.devCode);
      }
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      if (resendRequestRef.current !== request) return;

      setError("Could not resend the code. Please try again.");
    } finally {
      if (resendRequestRef.current === request) {
        resendRequestRef.current = null;
      }
      // Only unset `resending` if this request is still the
      // active one — a superseded request must not clear the
      // newer request's loading flag.
      if (resendRequestRef.current === request) {
        setResending(false);
      }
    }
  };

  /**
   * Close the modal — unconditionally.
   *
   * Any in-flight send/verify handle is aborted via
   * `request.abort()`, which reaches RTK Query's internal
   * AbortController and cancels the fetch. The cancelled
   * promise rejects; the handlers above recognise the
   * cancellation by request identity and stay silent.
   *
   * The parent owns "modal open" state, so `onClose()` is the
   * one and only signal that the modal should disappear.
   */
  const handleClose = () => {
    abortAllInFlight();
    onClose();
  };

  /* ---------- Render ---------- */

  return (
    <Modal
      open
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