// ============================================================
// src/pages/checkout/sections/CouponSection.tsx
// Coupon accordion — self-contained widget.
//
// Owns everything about the coupon UI:
//   - accordion open/closed
//   - the input text
//   - the applied code + the subtotal it was validated against
//   - inline validation error
//   - the in-flight flag
//   - the validateCoupon API call itself
//
// The parent only supplies:
//   - `subtotal`  — the amount the coupon is computed against
//                   (parent owns plan selection, so it owns price)
//   - `locked`    — whether the user is allowed to use a coupon
//                   (parent owns `verifiedBy`)
//   - `onApply`   — a single outcome callback
//
// Plan-change behaviour:
//   When `subtotal` changes, an applied coupon becomes invalid
//   (its discount was computed against the old price). We detect
//   this DURING RENDER by comparing the stored subtotal with the
//   current one, and reset inline — no useEffect, no cascading
//   renders, no flash of stale discount.
//
//   This is the React-idiomatic "adjust state when a prop
//   changes" pattern from the docs:
//   https://react.dev/learn/you-might-not-need-an-effect
// ============================================================

import { useCallback, useState } from "react";

import { COUPON_MAX_LENGTH } from "../constants";
import { useValidateCouponMutation } from "../../../services/checkoutApi";

interface CouponSectionProps {
  /** Amount the coupon is computed against (the current plan price). */
  subtotal: number;
  /** Fires when the applied coupon changes. `null` code = none. */
  onApply: (result: { code: string | null; discount: number }) => void;
  /**
   * True when the user is not yet verified. The accordion will
   * not open and the header click surfaces a "verify first"
   * hint instead.
   */
  locked?: boolean;
}

/**
 * The applied coupon is stored together with the subtotal it
 * was validated against. The invariant we maintain is:
 *
 *   applied === null || applied.subtotal === current subtotal
 *
 * If that invariant is ever violated by a `subtotal` prop
 * change, we reset the coupon during render.
 */
interface AppliedCoupon {
  code: string;
  subtotal: number;
}

export function CouponSection({
  subtotal,
  onApply,
  locked = false,
}: CouponSectionProps) {
  /* ---------- Local state ---------- */

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [error, setError] = useState("");
  const [validating, setValidating] = useState(false);

  /* ---------- Mutation ---------- */

  const [validateCoupon] = useValidateCouponMutation();

  /* ---------- Report outcome to the parent ---------- */

  const report = useCallback(
    (code: string | null, discount: number) => {
      onApply({ code, discount });
    },
    [onApply],
  );

  /* ------------------------------------------------------------
     Adjust state during render when `subtotal` changes.
     ------------------------------------------------------------
     If the user switches plans while a coupon is applied, the
     applied discount was computed against the OLD price. We
     cannot call the server here (no effects in render), but we
     CAN invalidate the local "applied" marker immediately.

     The parent notification (`report`) must NOT happen during
     render — that would be "update a component while rendering
     a different component". We defer it to a microtask, which
     React batches into the same commit, so the parent never
     sees the stale discount in its own render output.
     ------------------------------------------------------------ */

  if (applied && applied.subtotal !== subtotal) {
    setApplied(null);
    setInput("");
    setError("Coupon no longer valid for this plan.");
    // Defer to keep render pure. React batches this with the
    // current commit, so no extra paint occurs.
    queueMicrotask(() => report(null, 0));
  }

  /* ---------- Handlers ---------- */

  const handleToggle = () => {
    if (locked) {
      // Keep the existing UX: surface a hint instead of opening.
      setError("Please verify your details first");
      return;
    }
    setOpen((o) => !o);
    if (error) setError("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (error) setError("");
  };

  /**
   * Apply or remove. Remove is synchronous and local; apply is
   * an API call whose result decides whether the coupon becomes
   * "applied".
   */
  const handleApplyOrRemove = useCallback(async () => {
    // ----- Remove path -----
    if (applied) {
      setApplied(null);
      setInput("");
      setError("");
      report(null, 0);
      return;
    }

    // ----- Apply path -----
    const code = input.trim().toUpperCase();
    if (!code) {
      setError("Please enter a coupon code");
      return;
    }

    setValidating(true);
    try {
      const result = await validateCoupon({ code, subtotal }).unwrap();
      if (result.valid) {
        setApplied({ code, subtotal });
        setInput(code);
        setError("");
        setOpen(true);
        report(code, result.discount);
      } else {
        setError(result.reason ?? "Invalid coupon code");
      }
    } catch {
      setError("Could not validate coupon. Please try again.");
    } finally {
      setValidating(false);
    }
  }, [applied, input, subtotal, validateCoupon, report]);

  /* ---------- Render ---------- */

  const hasError = error.length > 0;
  const isApplied = applied !== null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validating) return;
      handleApplyOrRemove();
    }
  };

  return (
    <div className="order-3 mt-[33px] lg:mt-[29px] px-[15px] lg:px-0 w-full lg:max-w-[400px] lg:ml-[57px]">
      <div className="bg-white rounded-lg border border-slate-200">
        {/* ---------- Header ---------- */}
        <button
          type="button"
          onClick={handleToggle}
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
              value={input}
              onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              readOnly={isApplied}
              maxLength={COUPON_MAX_LENGTH}
              disabled={validating}
              placeholder="Enter coupon code"
              className="flex-1 min-w-0 h-[36px] px-3 rounded-md border border-slate-200 text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 read-only:bg-slate-50"
            />
            <button
              type="button"
              onClick={handleApplyOrRemove}
              disabled={validating}
              className={[
                "h-[36px] px-4 rounded-md text-white text-[14px] font-medium transition",
                validating
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700",
              ].join(" ")}
            >
              {validating ? "…" : isApplied ? "Remove" : "Apply"}
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