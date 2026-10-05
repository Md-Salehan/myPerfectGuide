// ============================================================
// src/services/mocks/checkoutMocks.ts
// In-memory dummy data + helpers for the checkout API.
//
// This is the ONLY place in the app that contains "server
// data" for checkout. When a real backend arrives, this file
// becomes dead code and the queryFns in services/checkoutApi.ts
// swap to real URLs.
//
// Contains:
//   - MOCK_PRODUCTS      product catalogue keyed by id
//   - MOCK_COUPONS       valid coupon codes and their effects
//   - MOCK_OTP_CODE      the fixed code the mock accepts
//   - MOCK_OTP_FAIL_CODE a specific code that always fails
//   - simulateLatency()  promise-based delay
//   - maybeFail()        probabilistic network-shaped error
//   - MOCK_FAILURE_RATE  dev knob (default 0)
//
// No React, no RTK Query. Pure data + helpers.
// ============================================================

import type { CouponType, Product } from "../../pages/checkout/types";

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
   Product catalogue
   ------------------------------------------------------------ */

/**
 * Products keyed by id. Two are seeded so both can be reached
 * via /checkout?id=...
 *
 * Note: the plans match what the corresponding SidebarEnrollCard
 * would present on each product page, so the URL-driven checkout
 * shows consistent numbers.
 */
export const MOCK_PRODUCTS: Record<string, Product> = {
  /* --- Taxation & Compliance course ------------------------------ */
  "taxation-compliance-2026": {
    id: "taxation-compliance-2026",
    title: "Complete Taxation & Compliance Course 2026",
    image: "/img/taxation-promo.jpg",
    rating: 4.9,
    ratingCount: "2,800+ ratings",
    shortFeatures: [
      "Complete GST & ITR Training",
      "Portfolio Website Building",
      "Digital Marketing & Client Acquisition",
      "10+ Real-World Projects",
    ],
    moreFeatures: [
      "Live + Recorded Sessions",
      "1 Year Access",
      "1:1 Doubt Support",
      "Certificate of Completion",
    ],
    plans: {
      year: {
        label: "1 Year — ₹1,599",
        price: 1599,
        original: 15990,
        off: "Flat 90% Off",
      },
      life: {
        label: "Lifetime — ₹2,999",
        price: 2999,
        original: 19990,
        off: "Flat 85% Off",
      },
    },
    type: "finance",
  },

  /* --- Digital Marketing course ---------------------------------- */
  "digital-marketing-2026": {
    id: "digital-marketing-2026",
    title: "Digital Marketing & Client Acquisition System 2026",
    image: "/img/ads-promo.jpg",
    rating: 4.8,
    ratingCount: "1,200+ ratings",
    shortFeatures: [
      "Facebook & Instagram Ads",
      "Google Ads & SEO",
      "LinkedIn & WhatsApp outreach",
      "Client acquisition playbook",
    ],
    moreFeatures: [
      "Portfolio website building",
      "Service packaging & pricing",
      "Referral system design",
      "2 real internships & placement",
    ],
    plans: {
      year: {
        label: "Standard — ₹4,999",
        price: 4999,
        original: 10000,
        off: "Flat 50% Off",
      },
      life: {
        label: "Premium — ₹14,999",
        price: 14999,
        original: 60000,
        off: "Flat 75% Off",
      },
    },
    type: "marketing",
  },

  /* --- Web Development course ------------------------------------ */
  "web-development-2026": {
    id: "web-development-2026",
    title: "Full Stack Web Development Bootcamp 2026",
    image: "/img/webdev-promo.jpg",
    rating: 4.9,
    ratingCount: "3,500+ ratings",
    shortFeatures: [
      "HTML, CSS, JavaScript",
      "React + TypeScript",
      "Node.js, Express & MongoDB",
      "Full-stack capstone project",
    ],
    moreFeatures: [
      "Deployment on Vercel & Railway",
      "System design fundamentals",
      "Portfolio & interview prep",
    ],
    plans: {
      year: {
        label: "1 Year — ₹4,999",
        price: 4999,
        original: 24999,
        off: "Flat 80% Off",
      },
      life: {
        label: "Lifetime — ₹7,999",
        price: 7999,
        original: 34999,
        off: "Flat 77% Off",
      },
    },
    type: "technology",
  },
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