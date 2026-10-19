// ============================================================
// src/pages/checkout/sections/CouponSection.tsx
// Coupon accordion.
//
// Controlled: the parent owns open, value, applied, error,
// and validating. This section reports changes up and runs
// no API calls of its own.
//
// Behaviour mirrors the source:
//   - header toggle with ticket icon + plus glyph
//   - body (open only) with input + Apply/Remove button
//   - input is read-only when a coupon is applied
//   - the button's label toggles between Apply and Remove
//   - Enter in the input triggers the same handler as the
//     button
//   - error is rendered BELOW the card, matching the source
//     (not inside the body)
// ============================================================

import { COUPON_MAX_LENGTH } from "../constants";

interface CouponSectionProps {
  /** Whether the accordion body is expanded. */
  open: boolean;
  /** Current input value. The parent uppercases before storing. */
  value: string;
  /** Applied coupon code, or null when none. */
  applied: string | null;
  /** Inline error message, or "" for none. */
  error: string;
  /** True while a coupon validation request is in flight. */
  validating: boolean;
  /** Called when the header is clicked to toggle open. */
  onToggle: () => void;
  /** Called when the input value changes. */
  onValueChange: (value: string) => void;
  /** Called when the Apply/Remove button is clicked (or Enter pressed). */
  onApplyOrRemove: () => void;
}

export function CouponSection({
  open,
  value,
  applied,
  error,
  validating,
  onToggle,
  onValueChange,
  onApplyOrRemove,
}: CouponSectionProps) {
  const hasError = error.length > 0;
  const isApplied = applied !== null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validating) return;
      onApplyOrRemove();
    }
  };

  return (
    <div className="order-3 mt-[33px] lg:mt-[29px] px-[15px] lg:px-0 w-full lg:max-w-[400px] lg:ml-[57px]">
      <div className="bg-white rounded-lg border border-slate-200">
        {/* ---------- Header ---------- */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="coupon-body"
          className="w-full h-[45px] lg:h-[40px] px-3 flex items-center gap-3"
        >
          {/* Ticket icon */}
          <svg
            className="w-4 h-4 text-slate-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="m12 1 2.600 2.200 3.400-.2.800 3.300 2.900 1.800-1.200 3.200 1.200 3.200-2.900 1.800-.8 3.300-3.400-.2L12 23l-2.600-2.200-3.400.2-.8-3.300-2.900-1.800L3.500 12 2.300 8.800l2.900-1.800.8-3.300 3.400.2L12 1Z" />
            <path
              d="m9 15 6-6"
              stroke="#fff"
              strokeWidth="1.800"
              strokeLinecap="round"
            />
            <circle cx="9.200" cy="9.200" r="1.100" fill="#fff" />
            <circle cx="14.800" cy="14.800" r="1.100" fill="#fff" />
          </svg>

          <span className="flex-1 text-left text-[15px] lg:text-[17px] font-medium">
            Have a coupon?
          </span>

          {/* Plus icon */}
          <svg
            className="w-4 h-4 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 4v16M4 12h16" />
          </svg>
        </button>

        {/* ---------- Body ---------- */}
        {open && (
          <div id="coupon-body" className="flex gap-2 px-3 pb-3">
            <input
              type="text"
              value={value}
              onChange={(e) => onValueChange(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              readOnly={isApplied}
              maxLength={COUPON_MAX_LENGTH}
              disabled={validating}
              placeholder="Enter coupon code"
              className="flex-1 min-w-0 h-[36px] px-3 rounded-md border border-slate-200 text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 read-only:bg-slate-50"
            />
            <button
              type="button"
              onClick={onApplyOrRemove}
              disabled={validating}
              className={[
                "h-[36px] px-4 rounded-md text-white text-[14px] font-medium transition",
                validating
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700",
              ].join(" ")}
            >
              {validating
                ? "…"
                : isApplied
                  ? "Remove"
                  : "Apply"}
            </button>
          </div>
        )}
      </div>

      {/* ---------- Inline error (outside the card) ---------- */}
      {hasError && (
        <p
          role="alert"
          className="mt-[8px] text-[13px] lg:text-[14px] text-rose-500 -ml-px"
        >
          {error}
        </p>
      )}
    </div>
  );
}