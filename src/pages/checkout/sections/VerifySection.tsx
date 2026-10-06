// ============================================================
// src/pages/checkout/sections/VerifySection.tsx
// Channel-aware verification form.
//
// Owns:
//   - which channel the user is editing ("phone" | "email")
//   - the inline input for the active channel
//   - the SMS / WhatsApp chips (phone only)
//   - the "Continue With …" submit
//
// Does NOT own:
//   - the OTP modal (lives in CheckoutPage)
//   - the OTP mutations (called by CheckoutPage via onSendOtp)
//   - verifiedBy (parent owns it)
//
// The parent passes `onSendOtp(channel)`; the parent runs the
// correct mutation and, on success, opens the unified modal.
// This keeps the section channel-agnostic above the boundary
// and keeps every mutation call in one place (CheckoutPage).
// ============================================================

import { useCallback, useState } from "react";

import type { OTPChannel, VerifyChannel, VerifiedBy } from "../types";

// Re-export so CheckoutPage can import { type VerifyChannel }
// from this module without reaching into types.ts.
export type { VerifyChannel };

interface VerifySectionProps {
  /** Current phone number (10 digits, no prefix). */
  phone: string;
  /** Current email address. */
  email: string;
  /** Current SMS/WhatsApp channel. */
  channel: OTPChannel;
  /** How the user proved ownership, or null. */
  verifiedBy: VerifiedBy;
  /** Inline error message for the active input, or "" for none. */
  error: string;
  /** True while the OTP send call is in flight. */
  sending: boolean;

  /** Called when the user edits the phone field. */
  onPhoneChange: (value: string) => void;
  /** Called when the user edits the email field. */
  onEmailChange: (value: string) => void;
  /** Called when the user picks an SMS/WhatsApp channel. */
  onChannelChange: (channel: OTPChannel) => void;
  /** Called when the user clears an inline error. */
  onClearError: () => void;

  /**
   * Called when the user submits. The parent runs the correct
   * mutation based on `channel`, and on success opens the
   * unified OTP modal.
   */
  onSendOtp: (channel: VerifyChannel) => void;
}

export function VerifySection({
  phone,
  email,
  channel,
  verifiedBy,
  error,
  sending,
  onPhoneChange,
  onEmailChange,
  onChannelChange,
  onClearError,
  onSendOtp,
}: VerifySectionProps) {
  // Which channel the user is currently editing. Separate from
  // `verifiedBy` — the user can switch inputs after verifying.
  const [activeChannel, setActiveChannel] = useState<VerifyChannel>("phone");

  const hasError = error.length > 0;

  const switchTo = useCallback(
    (next: VerifyChannel) => {
      setActiveChannel(next);
      onClearError();
    },
    [onClearError],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || verifiedBy !== null) return;
    onSendOtp(activeChannel);
  };

  return (
    <div className="order-2 mt-[39px] lg:mt-0 px-[15px] lg:px-0 w-full lg:max-w-[400px] lg:ml-[57px]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-lg border border-slate-200 p-[11px]"
      >
        <h3 className="text-[16px] lg:text-[17px] font-medium h-[28px] flex items-center">
          Verify your details
        </h3>

        {/* ---------- Channel tabs ---------- */}
        <div className="mt-[10px] flex gap-2">
          <ChannelTab
            active={activeChannel === "phone"}
            onClick={() => switchTo("phone")}
          >
            Phone
          </ChannelTab>
          <ChannelTab
            active={activeChannel === "email"}
            onClick={() => switchTo("email")}
          >
            Email
          </ChannelTab>
        </div>

        {/* ---------- Phone input ---------- */}
        {activeChannel === "phone" && (
          <div className="mt-[8px] flex h-[45px] lg:h-[40px] rounded-md border border-slate-200 overflow-hidden">
            <button
              type="button"
              className="w-[81px] lg:w-[72px] flex items-center justify-center gap-1 text-[14px] font-medium border-r border-slate-200"
            >
              +91
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 15V4m0 0L3 8m4-4 4 4M17 9v11m0 0 4-4m-4 4-4-4" />
              </svg>
            </button>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                onPhoneChange(value);
              }}
              disabled={sending}
              placeholder="Enter your phone number"
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? "checkout-verify-error" : undefined}
              className="flex-1 min-w-0 px-[11px] text-[14px] placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
            />
          </div>
        )}

        {/* ---------- Email input ---------- */}
        {activeChannel === "email" && (
          <div className="mt-[8px]">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={sending}
              placeholder="you@example.com"
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? "checkout-verify-error" : undefined}
              className="w-full h-[45px] lg:h-[40px] px-[11px] rounded-md border border-slate-200 text-[14px] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
            />
          </div>
        )}

        {/* ---------- Inline error ---------- */}
        {hasError && (
          <p
            id="checkout-verify-error"
            role="alert"
            className="mt-[8px] lg:mt-[7px] text-[13px] lg:text-[12px] leading-4 text-rose-500"
          >
            {error}
          </p>
        )}

        {/* ---------- SMS / WhatsApp chips (phone only) ---------- */}
        {activeChannel === "phone" && (
          <div className="mt-[14px] lg:mt-[12px] flex gap-3">
            <ChannelChip
              active={channel === "sms"}
              onClick={() => onChannelChange("sms")}
              icon={
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                </svg>
              }
            >
              SMS
            </ChannelChip>

            <ChannelChip
              active={channel === "wa"}
              onClick={() => onChannelChange("wa")}
              icon={
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21Z" />
                  <path d="M9 9.5c0 3 2.500 5.500 5.500 5.500l1-1.500-2-1-.8.8c-.8-.4-1.600-1.200-2-2l.8-.8-1-2L9 9.500Z" />
                </svg>
              }
            >
              Whatsapp
            </ChannelChip>
          </div>
        )}

        {/* ---------- Send OTP button ---------- */}
        <button
          type="submit"
          disabled={sending || verifiedBy !== null}
          className={[
            "mt-[16px] lg:mt-[14px] w-full h-[40px] lg:h-[36px] rounded-md text-white text-[14px] font-medium flex items-center justify-center gap-3 transition",
            sending || verifiedBy !== null
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700",
          ].join(" ")}
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="6" y="2" width="12" height="20" rx="2" />
          </svg>
          {sending
            ? "Sending…"
            : verifiedBy !== null
              ? "Verified"
              : activeChannel === "phone"
                ? "Continue With Phone"
                : "Continue With Email"}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------
   Internal: channel tab (Phone / Email)
   ------------------------------------------------------------ */

interface ChannelTabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ChannelTab({ active, onClick, children }: ChannelTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex-1 h-[34px] rounded-md text-[14px] font-medium transition border",
        active
          ? "bg-indigo-50 border-indigo-200 text-indigo-700"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------
   Internal: SMS / WhatsApp chip
   ------------------------------------------------------------ */

interface ChannelChipProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ChannelChip({ active, onClick, icon, children }: ChannelChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "h-[34px] lg:h-[30px] px-[14px] rounded-full border border-slate-200 flex items-center gap-2 text-[14px] lg:text-[13px] transition",
        active ? "bg-slate-100" : "bg-white",
      ].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}