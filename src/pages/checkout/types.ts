// ============================================================
// src/pages/checkout/types.ts
// All TypeScript types for the checkout page and its API.
//
// This is the single source of truth for every shape that
// crosses a boundary in the checkout flow:
//   - URL-parsed course + plan selection
//   - Local page state
//   - API request / response shapes
//
// The course/product shape itself now lives in
// `src/data/courses.ts` (the single source of truth for the
// catalogue). This file re-exports those types under the
// checkout's existing names (`Product`, `ProductPlan`,
// `PlanType`) so no consumer has to change its import paths.
//
// Consumed by:
//   - pages/checkout/utils.ts        (parser, totals, validators)
//   - pages/checkout/constants.ts    (typed maps)
//   - pages/checkout/CheckoutPage.tsx
//   - pages/checkout/sections/*.tsx
//   - pages/checkout/modals/*.tsx
//   - services/checkoutApi.ts
//   - services/mocks/checkoutMocks.ts
// ============================================================

import type {
  Course,
  CoursePlan,
  PlanType,
} from "../../data/courses";

/* ------------------------------------------------------------
   Re-exports — the checkout's stable names for the catalogue
   ------------------------------------------------------------
   The checkout components import `Product` and `ProductPlan`.
   Those are now aliases of the central `Course` / `CoursePlan`
   so the whole app agrees on one shape.
   ------------------------------------------------------------ */

/** The two plans a product can offer. */
export type { PlanType };

/**
 * A single plan offered by a product.
 * Alias of the central `CoursePlan` — the source of truth.
 */
export type ProductPlan = CoursePlan;

/**
 * The product being checked out.
 * Alias of the central `Course` — the source of truth.
 */
export type Product = Course;

/* ------------------------------------------------------------
   Primitives / unions (checkout-only)
   ------------------------------------------------------------ */

/** Preferred contact channel for the OTP. */
export type OTPChannel = "sms" | "wa";

/** Which identity is being verified. Used by the OTP modal. */
export type VerifyChannel = "phone" | "email";
/** How the user proved ownership of their contact. */
export type VerifiedBy = null | "phone" | "email";

/** Coupon discount kinds supported by the API. */
export type CouponType = "percent" | "flat";

/* ------------------------------------------------------------
   Page state
   ------------------------------------------------------------ */

/** GST information captured from the accordion. */
export interface GstDetails {
  number: string;
  name: string;
  address: string;
  state: string;
}

/** Inline error messages for the three validatable forms. */
export interface CheckoutErrors {
  phone: string;
  coupon: string;
  gst: string;
  email: string;
}

/**
 * Which modal is currently open, if any. `null` means none.
 * Only one modal can be open at a time — stacking is not
 * supported.
 *
 * Post-refactor, this is intentionally narrow: the phone and
 * email verification flows are served by a single `"otp"` kind
 * that carries the channel + identity. Phone vs email is a
 * *payload* distinction, not a *modal* distinction.
 */
export type CheckoutModal =
  | null
  | {
    kind: "otp";
    /** Which channel the OTP was sent to. */
    channel: "phone" | "email";
    /** The phone number (10 digits) or the email address. */
    identity: string;
    /** Only present in mock mode. Real backends omit this. */
    devCode?: string;
  }
  | { kind: "pay-error"; message: string };

/**
 * The full local state of the checkout page. Held in
 * `CheckoutPage` via `useState` — nothing here belongs in
 * Redux, since it's not read by anything outside the page.
 */
export interface CheckoutState {
  /** Currently selected plan. Initial value from URL `plan`. */
  plan: PlanType;
  /** Preferred OTP channel (SMS vs WhatsApp). */
  channel: OTPChannel;
  /** Phone number (10 digits, no prefix). */
  phone: string;
  /** Email address. */
  email: string;
  /** Set once a verification step succeeds. */
  verifiedBy: VerifiedBy;
  /** "View more details" toggle. */
  moreOpen: boolean;
  /** GST accordion open state. */
  gstOpen: boolean;
  /** GST form values. */
  gst: GstDetails;
  /** Coupon accordion open state. */
  couponOpen: boolean;
  /** Live value of the coupon input. */
  couponInput: string;
  /** Applied coupon code, or null when none is applied. */
  coupon: string | null;
  /** Discount in rupees, as returned by the API. */
  discount: number;
  /** Human-readable label for the applied discount. */
  discountLabel: string | null;
  /** True while the pay flow is in flight. */
  submitting: boolean;
  /** True while an OTP send call is in flight. */
  sending: boolean;
  /** Inline error messages for the validatable forms. */
  errors: CheckoutErrors;
}

/* ------------------------------------------------------------
   API — OTP (phone + email, same shape)
   ------------------------------------------------------------ */

export interface SendPhoneOtpArgs {
  phone: string;
}

export interface SendEmailOtpArgs {
  email: string;
}

/**
 * Response from either `sendPhoneOtp` or `sendEmailOtp`.
 *
 * `devCode` is only present when the backend is a mock — real
 * backends omit it and the modal hides its dev hint.
 */
export interface SendOtpResponse {
  sent: boolean;
  /** Only present in mock mode. Real backends omit this. */
  devCode?: string;
  /** Cooldown seconds the client should enforce before resend. */
  resendAfter?: number;
}

export interface VerifyPhoneOtpArgs {
  phone: string;
  otp: string;
}

export interface VerifyEmailOtpArgs {
  email: string;
  otp: string;
}

/** Response from either `verifyPhoneOtp` or `verifyEmailOtp`. */
export interface VerifyOtpResponse {
  verified: boolean;
  /** Present when `verified` is false. */
  reason?: string;
}

/* ------------------------------------------------------------
   API — coupon
   ------------------------------------------------------------ */

export interface ValidateCouponArgs {
  code: string;
  /** Subtotal the coupon applies to (plan price, in rupees). */
  subtotal: number;
}

export interface ValidateCouponResponse {
  valid: boolean;
  /** Discount amount in rupees. Zero when invalid. */
  discount: number;
  /** Human-readable discount label, e.g. "10% off". */
  label?: string;
  /** Present when `valid` is false. */
  reason?: string;
}

/* ------------------------------------------------------------
   API — GST
   ------------------------------------------------------------ */

export interface ValidateGstArgs extends GstDetails { }

export interface ValidateGstResponse {
  valid: boolean;
  /** Present when `valid` is false. */
  reason?: string;
}

/* ------------------------------------------------------------
   API — order
   ------------------------------------------------------------ */

/** Contact block inside the order payload. */
export interface OrderContact {
  method: VerifiedBy;
  channel: OTPChannel;
  /** E.164-ish phone with "+91" prefix, or null. */
  phone: string | null;
  /** Email address, or null. */
  email: string | null;
}

/** Amount block inside the order payload. */
export interface OrderAmount {
  subtotal: number;
  discount: number;
  total: number;
  currency: "INR";
}

/**
 * Payload sent to `createOrder`.
 *
 * Post-refactor, `courseId` is the explicit identifier of the
 * course being purchased. It comes from the resolved checkout
 * state (ultimately the URL's `?courseId=` param), never
 * hardcoded, and is never derived from the plan alone (the
 * same plan id `"year"` exists on multiple courses).
 *
 * Every other field is unchanged from the source's
 * `buildPayload()` so any downstream listener of the
 * `checkout:submit` event keeps working.
 */
export interface OrderPayload {
  /** Identifier of the course being purchased. */
  courseId: string;
  plan: { id: PlanType; label: string };
  amount: OrderAmount;
  coupon: string | null;
  contact: OrderContact;
  gst: GstDetails | null;
}

export interface CreateOrderResponse {
  /** Stable order id issued by the backend. */
  orderId: string;
  /** "created" | "pending" | "failed" — mirrors common PSP states. */
  status: "created" | "pending" | "failed";
  /**
   * When present, the client should redirect the browser here
   * (typically a payment gateway URL). When absent, the client
   * treats the order as successfully captured in-place.
   */
  redirectUrl?: string;
}

/* ------------------------------------------------------------
   Derived values
   ------------------------------------------------------------ */

/** Output of `computeTotals`. */
export interface OrderTotals {
  subtotal: number;
  discount: number;
  total: number;
}