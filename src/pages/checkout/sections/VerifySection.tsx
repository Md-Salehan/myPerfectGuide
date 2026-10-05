// ============================================================
// src/pages/checkout/sections/VerifySection.tsx
// Phone verification form.
//
// Controlled: the parent owns phone, channel, error, sending.
// This section reports changes up and runs no API calls of
// its own. The send flow, the OTP modal, and the email flow
// all live in CheckoutPage.
// ============================================================

import type { Channel } from "../types";

interface VerifySectionProps {
  /** Current phone number (10 digits, no prefix). */
  phone: string;
  /** Current channel. */
  channel: Channel;
  /** Inline error message for the phone input, or "" for none. */
  error: string;
  /** True while the OTP send call is in flight. */
  sending: boolean;
  /** Called when the user edits the phone field. */
  onPhoneChange: (value: string) => void;
  /** Called when the user picks a channel. */
  onChannelChange: (channel: Channel) => void;
  /** Called when "Continue With Phone" is submitted. */
  onSubmit: () => void;
  /** Called when "Verify using email" is clicked. */
  onEmailClick: () => void;
}

export function VerifySection({
  phone,
  channel,
  error,
  sending,
  onPhoneChange,
  onChannelChange,
  onSubmit,
  onEmailClick,
}: VerifySectionProps) {
  const hasError = error.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    onSubmit();
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

        {/* ---------- Phone input with +91 prefix ---------- */}
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
            aria-describedby={hasError ? "checkout-phone-error" : undefined}
            className="flex-1 min-w-0 px-[11px] text-[14px] placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
          />
        </div>

        {/* ---------- Phone error ---------- */}
        {hasError && (
          <p
            id="checkout-phone-error"
            role="alert"
            className="mt-[8px] lg:mt-[7px] text-[13px] lg:text-[12px] leading-4 text-rose-500"
          >
            {error}
          </p>
        )}

        {/* ---------- Channel chips ---------- */}
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

        {/* ---------- Continue button ---------- */}
        <button
          type="submit"
          disabled={sending}
          className={[
            "mt-[16px] lg:mt-[14px] w-full h-[40px] lg:h-[36px] rounded-md text-white text-[14px] font-medium flex items-center justify-center gap-3 transition",
            sending
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
          {sending ? "Sending…" : "Continue With Phone"}
        </button>

        {/* ---------- Email link ---------- */}
        <p className="mt-[18px] mb-[8px] text-center text-[14px]">
          <span className="text-slate-500">OR,&nbsp;</span>
          <button
            type="button"
            onClick={onEmailClick}
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Verify using email
          </button>
        </p>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------
   Internal: channel chip
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