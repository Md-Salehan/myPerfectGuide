// ============================================================
// src/services/mocks/checkoutMocks.ts
// In-memory dummy data + helpers for the checkout API.
//
// This is the ONLY place in the app that contains "server
// data" for OTPs and coupons. When a real backend arrives,
// this file becomes dead code and the queryFns in
// services/checkoutApi.ts swap to real URLs.
//
// NOTE: the product / course catalogue is NOT here. It lives
// in src/data/courses.ts and is consumed synchronously by the
// checkout page — it is not fetched from the mock.
//
// Contains:
//   - MOCK_COUPONS       valid coupon codes and their effects
//   - MOCK_OTP_CODE      the fixed code the mock accepts
//   - MOCK_OTP_FAIL_CODE a specific code that always fails
//   - simulateLatency()  promise-based delay
//   - maybeFail()        probabilistic network-shaped error
//   - MOCK_FAILURE_RATE  dev knob (default 0)
//
// No React, no RTK Query. Pure data + helpers.
// ============================================================

import type { CouponType } from "../../pages/checkout/types";

/* ------------------------------------------------------------
   Failure-rate knob
   ------------------------------------------------------------ */

/**
 * Probability (0–1) that any mock call will fail with a
 * network-shaped error. Set to a small value (e.g. 0.1) during
 * development to exercise error paths.
 *
 * Default 0: no random failures, so normal flows never break.
 */
export const MOCK_FAILURE_RATE = 0;

/* ------------------------------------------------------------
   Latency + failure helpers
   ------------------------------------------------------------ */

/** Resolve after `ms` milliseconds. Awaited by every mock call. */
export function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/**
 * Throws a network-shaped error with probability `rate`.
 * The error shape mimics what a real fetch failure produces,
 * so the UI's error handling is exercised end-to-end.
 */
export function maybeFail(rate: number = MOCK_FAILURE_RATE): void {
  if (rate > 0 && Math.random() < rate) {
    const error = new Error("Network error (mock)") as Error & {
      status?: number;
      isMockFailure?: boolean;
    };
    error.status = 503;
    error.isMockFailure = true;
    throw error;
  }
}

/* ------------------------------------------------------------
   OTP
   ------------------------------------------------------------ */

/** Fixed code the mock accepts. Shown to the user in dev mode. */
export const MOCK_OTP_CODE = "123456";

/**
 * A code that always fails verification. Useful for exercising
 * the error path in the OTP modals without guessing inputs.
 */
export const MOCK_OTP_FAIL_CODE = "000000";

/* ------------------------------------------------------------
   Coupons
   ------------------------------------------------------------ */

export interface MockCoupon {
  type: CouponType;
  value: number;
  /** Human label shown next to the discount in the receipt. */
  label: string;
}

/**
 * Valid coupon codes. Keys are uppercase — the API normalises
 * the user's input before lookup, so this stays uppercase.
 *
 * Seeded with the source's two codes plus two more for testing.
 */
export const MOCK_COUPONS: Record<string, MockCoupon> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off" },
  FLAT500: { type: "flat", value: 500, label: "₹500 off" },
  SUMMER25: { type: "percent", value: 25, label: "25% off" },
  FESTIVE1000: { type: "flat", value: 1000, label: "₹1,000 off" },
};

/* ------------------------------------------------------------
   Helpers for the API layer
   ------------------------------------------------------------ */

/**
 * Case-insensitive coupon lookup. The API normalises before
 * calling this, so both "welcome10" and "WELCOME10" work.
 */
export function findCoupon(
  code: string,
): { code: string; coupon: MockCoupon } | null {
  const normalised = code.trim().toUpperCase();
  const coupon = MOCK_COUPONS[normalised];
  return coupon ? { code: normalised, coupon } : null;
}

/**
 * Compute the discount for a coupon against a subtotal.
 * Percent coupons round to the nearest rupee; flat coupons are
 * capped at the subtotal.
 */
export function computeDiscount(
  coupon: MockCoupon,
  subtotal: number,
): number {
  const raw =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;
  return Math.min(raw, subtotal);
}