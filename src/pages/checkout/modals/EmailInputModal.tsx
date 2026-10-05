// ============================================================
// src/pages/checkout/modals/EmailInputModal.tsx
// Email input step — replaces the source's prompt() call in
// verifyEmail().
//
// Single email field + "Send code" button. On success hands
// the email + devCode back to the parent, which closes this
// modal and opens EmailOtpModal.
//
// Client-side email regex runs first as a fast path; the
// server-side check runs inside the mutation.
// ============================================================

import { useEffect, useState } from "react";

import { Modal } from "../../../components/common/Modal";

import { useSendEmailOtpMutation } from "../../../services/checkoutApi";

import { EMAIL_REGEX } from "../constants";

interface EmailInputModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /**
   * Called when the API accepts the email and sends a code.
   * Parent uses this to close the current modal and open the
   * OTP entry modal.
   */
  onSuccess: (args: { email: string; devCode?: string }) => void;
  /** Called when the user requests to close (X / Escape / backdrop). */
  onClose: () => void;
}

export function EmailInputModal({
  open,
  onSuccess,
  onClose,
}: EmailInputModalProps) {
  /* ---------- Local state ---------- */

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sendEmailOtp] = useSendEmailOtpMutation();

  /* ---------- Reset on open ---------- */

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setSending(false);
    setError(null);
  }, [open]);

  /* ---------- Derived ---------- */

  const canSubmit = email.trim().length > 0 && !sending;

  /* ---------- Handlers ---------- */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const trimmed = email.trim();

    // Fast path: client-side regex. Rejects obvious typos
    // without a network round-trip — matches the source's
    // behaviour of validating locally before proceeding.
    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const result = await sendEmailOtp({ email: trimmed }).unwrap();
      if (result.sent) {
        onSuccess({ email: trimmed, devCode: result.devCode });
      } else {
        setError("Could not send the code. Please try again.");
        setSending(false);
      }
    } catch {
      setError("Could not send the code. Please try again.");
      setSending(false);
    }
  };

  const handleClose = () => {
    if (sending) return;
    onClose();
  };

  /* ---------- Render ---------- */

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Verify using email"
      description="Enter your email address and we'll send you a 6-digit verification code."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email input */}
        <div>
          <label
            htmlFor="checkout-email"
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            Email address
          </label>
          <input
            id="checkout-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            disabled={sending}
            placeholder="you@example.com"
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "checkout-email-error" : undefined}
            className={[
              "w-full h-11 rounded-lg border bg-white px-3 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition disabled:opacity-60 disabled:cursor-not-allowed",
              error
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100",
            ].join(" ")}
          />
          {error && (
            <p
              id="checkout-email-error"
              role="alert"
              className="text-rose-600 text-[13px] mt-1.5 flex items-center gap-1.5"
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
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            "w-full h-11 rounded-lg text-white text-[15px] font-medium transition",
            canSubmit
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-300 cursor-not-allowed",
          ].join(" ")}
        >
          {sending ? "Sending…" : "Send code"}
        </button>
      </form>
    </Modal>
  );
}