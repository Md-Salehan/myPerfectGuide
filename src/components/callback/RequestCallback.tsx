// ============================================================
// src/components/callback/RequestCallback.tsx
// Reusable callback request form.
//
// Deliberately independent of the Modal. Can be rendered:
//   - inside <Modal> (via <RequestCallbackModal />)
//   - standalone on a page
//   - inside a drawer, popover, etc.
//
// Slot-time field is gated entirely by `showSlotTime`:
//   - false (default) -> phone only, no slot in the payload
//   - true            -> phone + slot, both validated and sent
//
// Submission is delegated to `onSubmit`. When omitted, a
// simulated success runs so the flow works without a backend.
// When an endpoint exists, pass onSubmit wired to it.
// ============================================================

import { useState, type FormEvent } from "react";

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export interface CallbackPayload {
  /** The user's phone number, trimmed. */
  phone: string;
  /** Preferred callback slot. Present only when showSlotTime was true. */
  slotTime?: string;
}

export interface RequestCallbackProps {
  /**
   * Whether to render and validate the slot-time field.
   * Also controls whether `slotTime` is included in the
   * submitted payload.
   *
   * Default: false.
   */
  showSlotTime?: boolean;

  /**
   * Submission handler. Receives the validated payload.
   * When omitted, a simulated 900ms success runs so the UI
   * works end-to-end without a backend.
   */
  onSubmit?: (data: CallbackPayload) => Promise<void>;

  /** Called after a successful submission (after onSubmit resolves). */
  onSuccess?: () => void;

  /** Called when submission throws. */
  onError?: (error: unknown) => void;

  /** Override the submit button label. Default: "Request Callback". */
  submitLabel?: string;

  /** Override the success heading. */
  successMessage?: string;

  /** Extra classes on the outer wrapper (form or success card). */
  className?: string;
}

/* ------------------------------------------------------------
   Slot options (used only when showSlotTime is true)
   ------------------------------------------------------------ */

const SLOT_OPTIONS: readonly string[] = [
  "Today, 10:00 AM – 11:00 AM",
  "Today, 12:00 PM – 1:00 PM",
  "Today, 3:00 PM – 4:00 PM",
  "Today, 6:00 PM – 7:00 PM",
  "Tomorrow, 10:00 AM – 11:00 AM",
  "Tomorrow, 12:00 PM – 1:00 PM",
  "Tomorrow, 3:00 PM – 4:00 PM",
  "Tomorrow, 6:00 PM – 7:00 PM",
] as const;

/* ------------------------------------------------------------
   Validation
   ------------------------------------------------------------ */

/**
 * Permissive Indian mobile number check.
 * Accepts 10-digit numbers optionally prefixed with +91 / 91
 * and/or spaced / hyphenated. Strips non-digits before testing.
 */
function isValidIndianPhone(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  // Last 10 digits must start 6–9 (valid Indian mobile prefix).
  const last10 = digits.slice(-10);
  return /^[6-9]\d{9}$/.test(last10) && digits.length >= 10 && digits.length <= 12;
}

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function RequestCallback({
  showSlotTime = false,
  onSubmit,
  onSuccess,
  onError,
  submitLabel = "Request Callback",
  successMessage,
  className = "",
}: RequestCallbackProps) {
  const [phone, setPhone] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    // Client-side validation.
    let valid = true;

    if (!phone.trim()) {
      setPhoneError("Please enter your phone number.");
      valid = false;
    } else if (!isValidIndianPhone(phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      valid = false;
    } else {
      setPhoneError(null);
    }

    if (showSlotTime && !slotTime) {
      setSlotError("Please choose a preferred callback slot.");
      valid = false;
    } else {
      setSlotError(null);
    }

    if (!valid) return;

    // Build the payload. slotTime is included only when the field
    // was actually shown — mirroring `showSlotTime`.
    const payload: CallbackPayload = showSlotTime
      ? { phone: phone.trim(), slotTime }
      : { phone: phone.trim() };

    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // No handler supplied — simulate a successful request so
        // the UI works without a backend.
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }
      setSuccess(true);
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Success state ---------- */
  if (success) {
    return (
      <div
        className={[
          "rounded-xl border border-emerald-200 bg-emerald-50/50 p-6",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-2">
          {successMessage ?? "Request received."}
        </h3>
        <p className="text-slate-600 text-[14.5px] leading-relaxed">
          A course advisor will call you on{" "}
          <span className="font-semibold text-slate-800">{phone}</span>
          {showSlotTime && slotTime && (
            <>
              {" "}
              during{" "}
              <span className="font-semibold text-slate-800">{slotTime}</span>
            </>
          )}
          . Keep an eye on your phone — and if you miss the call, we'll try once more within the next hour.
        </p>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={["space-y-4", className].filter(Boolean).join(" ")}
    >
      {/* ---------- Phone ---------- */}
      <div>
        <label
          htmlFor="callback-phone"
          className="block text-sm font-semibold text-slate-800 mb-2"
        >
          Phone Number
        </label>
        <input
          id="callback-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            if (phoneError) setPhoneError(null);
          }}
          placeholder="+91 98XXXXXXXX"
          aria-invalid={phoneError ? "true" : undefined}
          aria-describedby={phoneError ? "callback-phone-error" : undefined}
          disabled={submitting}
          className={[
            "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition disabled:opacity-60 disabled:cursor-not-allowed",
            phoneError
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100",
          ].join(" ")}
        />
        {phoneError && (
          <p
            id="callback-phone-error"
            className="text-rose-600 text-[13px] mt-1.5 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z"
                clipRule="evenodd"
              />
            </svg>
            {phoneError}
          </p>
        )}
      </div>

      {/* ---------- Slot time (conditional) ---------- */}
      {showSlotTime && (
        <div>
          <label
            htmlFor="callback-slot"
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            Preferred Callback Time
          </label>
          <div className={[
                "w-full rounded-xl border bg-white px-4 pr-8 py-3 text-[15px] text-slate-900 focus:outline-none focus:ring-2 transition disabled:opacity-60 disabled:cursor-not-allowed",
                slotError
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"].join(" ")}>
            <select
              id="callback-slot"
              name="slotTime"
              required
              value={slotTime}
              onChange={(event) => {
                setSlotTime(event.target.value);
                if (slotError) setSlotError(null);
              }}
              aria-invalid={slotError ? "true" : undefined}
              aria-describedby={slotError ? "callback-slot-error" : undefined}
              disabled={submitting}
              className={[
                "w-full bg-white text-[15px] text-slate-900 focus:outline-none transition disabled:opacity-60 disabled:cursor-not-allowed",
                
                // Ensure the placeholder colour applies only when no
                // option is selected.
                slotTime === "" ? "text-slate-400" : "",
              ].join(" ")}
            >
              <option value="" disabled>
                Select a slot
              </option>
              {SLOT_OPTIONS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <p className="text-slate-400 text-[12.5px] mt-1.5">
            Slots are shown in IST. Our advisors are available Mon–Sat, 10:00 AM – 7:00 PM.
          </p>
          {slotError && (
            <p
              id="callback-slot-error"
              className="text-rose-600 text-[13px] mt-1.5 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z"
                  clipRule="evenodd"
                />
              </svg>
              {slotError}
            </p>
          )}
        </div>
      )}

      {/* ---------- Submission error banner ---------- */}
      {submitError && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14px] text-rose-700 flex items-start gap-2.5"
        >
          <svg
            className="w-4 h-4 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.516 11.583c.75 1.334-.213 2.98-1.742 2.98H3.484c-1.53 0-2.493-1.646-1.743-2.98L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      {/* ---------- Submit ---------- */}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-full py-3.5 text-[15px] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.25"
              />
              <path
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Requesting…
          </>
        ) : (
          <>
            {submitLabel}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </button>

      {/* ---------- Small print ---------- */}
      <p className="text-slate-400 text-[12px] text-center leading-relaxed">
        We'll use your number only to call you about this enquiry. No spam, no sharing.
      </p>
    </form>
  );
}