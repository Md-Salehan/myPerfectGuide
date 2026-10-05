// ============================================================
// src/pages/checkout/sections/PayBar.tsx
// Pay button + payment-brand chips.
//
// Two visual modes (matching the source):
//   - mobile: fixed to the bottom of the viewport
//   - desktop: static block in the right column
//
// The button is disabled until the user is verified. While
// submitting, it shows "Processing…" and cannot be clicked
// again. The payment-brand chips are decorative — the source
// had no click handlers on them.
// ============================================================

import { formatPrice } from "../utils";

interface PayBarProps {
  /** Total amount in rupees to render in the button label. */
  total: number;
  /** True when the user has not verified yet. */
  disabled: boolean;
  /** True while createOrder is in flight. */
  submitting: boolean;
  /** Called when the user clicks the pay button. */
  onPay: () => void;
}

export function PayBar({ total, disabled, submitting, onPay }: PayBarProps) {
  const isDisabled = disabled || submitting;

  return (
    <div
      className={[
        // Placement: mobile fixed, desktop static
        "order-8",
        "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-10",
        "max-lg:bg-white max-lg:border-t max-lg:border-slate-200",
        "max-lg:px-[15px] max-lg:pt-[16px] max-lg:pb-[14px]",
        "lg:mt-[38px] lg:max-w-[400px] lg:ml-[57px]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onPay}
        disabled={isDisabled}
        className={[
          "w-full h-[48px] lg:h-[43px] rounded-md text-white text-[16px] lg:text-[17px] font-medium transition",
          isDisabled
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700",
        ].join(" ")}
      >
        {submitting ? "Processing…" : `Proceed to Pay ${formatPrice(total)}`}
      </button>

      {/* Payment-brand chips (decorative) */}
      <div className="mt-[16px] lg:mt-[24px] flex items-center justify-center gap-[8px] lg:gap-[10px] text-[13px]">
        <span className="italic font-bold text-slate-500 text-[11px]">UPI▸</span>

        {/* Paytm */}
        <span className="w-[22px] h-[22px] rounded-full bg-[#5f259f] text-white text-[11px] flex items-center justify-center font-bold">
          पे
        </span>
        <span className="font-extrabold text-[#00baf2] text-[15px] tracking-tight">
          Paytm
        </span>

        {/* VISA */}
        <span className="font-extrabold italic text-[#1a1f71] text-[17px]">
          VISA
        </span>

        {/* Mastercard overlapping circles */}
        <span className="relative w-[28px] h-[18px]">
          <i className="absolute left-0 w-[18px] h-[18px] rounded-full bg-[#eb001b]" />
          <i className="absolute left-[10px] w-[18px] h-[18px] rounded-full bg-[#f79e1b] opacity-90" />
        </span>

        {/* RuPay */}
        <span className="font-extrabold italic text-[#1a4f9c] text-[14px]">
          RuPay<span className="text-orange-500">▸</span>
        </span>

        {/* Google Pay */}
        <span className="text-slate-600">
          <b className="text-blue-500">G</b> Pay
        </span>
      </div>
    </div>
  );
}