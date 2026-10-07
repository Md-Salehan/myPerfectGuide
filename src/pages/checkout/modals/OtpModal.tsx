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
// Abort semantics:
//   - Each in-flight send/verify is owned by an AbortController.
//   - Closing the modal (X / Escape / backdrop) aborts both.
//   - Unmounting aborts both.
//   - The parent's `sendOtp` / `verifyOtp` accept a `signal`
//     and forward it into the RTK Query mutation, which passes
//     it to `fetch` via fetchBaseQuery — so the network request
//     is genuinely cancelled, not just ignored.
//   - AbortError is swallowed: the modal is already going away.
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
   *
   * `signal` is optional: when provided, it is forwarded into
   * the underlying mutation so the request can be cancelled.
   * Resolves with the fresh devCode (if any) so the modal can
   * update its hint. Should reject on failure.
   */
  sendOtp: (args: {
    channel: OtpChannel;
    identity: string;
    signal?: AbortSignal;
  }) => Promise<{ devCode?: string }>;
  /**
   * Verify the OTP for `channel` + `identity`.
   *
   * `signal` is optional: when provided, it is forwarded into
   * the underlying mutation so the request can be cancelled.
   * Resolves with `{ verified: true }` on success, or
   * `{ verified: false, reason?: string }` on a wrong code.
   * Should reject on a network-shaped failure.
   */
  verifyOtp: (args: {
    channel: OtpChannel;
    identity: string;
    otp: string;
    signal?: AbortSignal;
  }) => Promise<{ verified: boolean; reason?: string }>;
  /** Called when verification succeeds. Parent closes the modal. */
  onSuccess: () => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

/* ------------------------------------------------------------
   Helpers
   ------------------------------------------------------------ */

/**
 * True when `err` came from an AbortSignal-driven cancellation.
 *
 * The DOM spec throws a `DOMException` with `name === "AbortError"`
 * from `fetch`. RTK Query re-throws the same. Some environments
 * (older polyfills, custom baseQueries) may instead throw a plain
 * `Error` with `name === "AbortError"` — both are treated as
 * cancellations.
 */
function isAbortError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return true;
  if (err instanceof Error && err.name === "AbortError") return true;
  return false;
}

/* ------------------------------------------------------------
   Outer wrapper — owns only "should the body exist?"
   ------------------------------------------------------------ */

export function OtpModal(props: OtpModalProps) {
  const { open, channel, identity, devCode } = props;

  // A change to any of these begins a *new* verification attempt,
  // so the body below should start from a clean slate.
  //   - channel / identity  → user switched target
  //   - devCode             → a fresh send produced a new code
  //                           (present in mock mode; "" on real
  //                           backends, so only channel+identity
  //                           drive the reset there)
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

  /* ---------- Abort controllers ----------
     One per in-flight request kind. A new attempt replaces the
     previous controller (the old one is aborted first, so a
     lingering request can never race a new one to completion).
     Refs, not state — mutating them must not trigger a render.
     ------------------------------------------------------------ */

  const verifyAbortRef = useRef<AbortController | null>(null);
  const resendAbortRef = useRef<AbortController | null>(null);

  /**
   * Abort whichever requests are currently in flight.
   * Safe to call unconditionally; a no-op when nothing is running.
   */
  const abortAllInFlight = () => {
    verifyAbortRef.current?.abort();
    verifyAbortRef.current = null;
    resendAbortRef.current?.abort();
    resendAbortRef.current = null;
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

  
    verifyAbortRef.current?.abort();

    const controller = new AbortController();
    verifyAbortRef.current = controller;

    setVerifying(true);
    setError(null);

    try {
      const result = await verifyOtp({
        channel,
        identity,
        otp: code,
        signal: controller.signal,
      });

      // A stale resolve (from a superseded attempt) must not touch
      // state. `controller.signal.aborted` catches the case where
      // abort raced the response.
      if (controller.signal.aborted) return;

      if (result.verified) {
        onSuccess();
      } else {
        setError(result.reason ?? "Incorrect code. Please try again.");
        setVerifying(false);
      }
    } catch (err) {
      // Cancellation is not a user-facing error — the modal is
      // either closing or a newer attempt superseded this one.
      if (isAbortError(err) || controller.signal.aborted) return;

      setError("Could not verify the code. Please try again.");
      setVerifying(false);
    } finally {
      // Only clear the ref if we're still the current attempt.
      if (verifyAbortRef.current === controller) {
        verifyAbortRef.current = null;
      }
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    resendAbortRef.current?.abort();
    const controller = new AbortController();
    resendAbortRef.current = controller;

    setResending(true);
    setError(null);

    try {
      const result = await sendOtp({
        channel,
        identity,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      if (result.devCode) {
        setHintCode(result.devCode);
      }
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      if (isAbortError(err) || controller.signal.aborted) return;

      setError("Could not resend the code. Please try again.");
    } finally {
      if (resendAbortRef.current === controller) {
        resendAbortRef.current = null;
      }
      // Only unset `resending` if the modal is still open and this
      // is still the active attempt. On abort the component is
      // unmounting, so setting state would warn.
      if (!controller.signal.aborted) {
        setResending(false);
      }
    }
  };

  /**
   * Close the modal — unconditionally.
   *
   * Any in-flight send/verify is aborted first, so the network
   * request is genuinely cancelled (via fetchBaseQuery's signal →
   * fetch → AbortController). AbortError from the cancelled
   * promise is swallowed inside the handlers above; this function
   * does not need to await anything.
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