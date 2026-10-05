// ============================================================
// src/pages/checkout/types.ts
// All TypeScript types for the checkout page and its API.
//
// This is the single source of truth for every shape that
// crosses a boundary in the checkout flow:
//   - URL-parsed product data
//   - Local page state
//   - API request / response shapes
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

/* ------------------------------------------------------------
   Primitives / unions
   ------------------------------------------------------------ */

/** The two plans a product can offer. */
export type PlanId = "year" | "life";

/** Preferred contact channel for the OTP. */
export type Channel = "sms" | "wa";

/** How the user proved ownership of their contact. */
export type VerifiedBy = null | "phone" | "email";

/** Coupon discount kinds supported by the API. */
export type CouponType = "percent" | "flat";

/* ------------------------------------------------------------
   Product (URL + server)
   ------------------------------------------------------------ */

/**
 * A single plan offered by a product. Mirrors the fields the
 * source's vanilla `CONFIG.plans` carried, plus a per-plan
 * label the UI renders inside the toggle button.
 */
export interface ProductPlan {
  /** Toggle button label, e.g. "1 Year — ₹1,599". */
  label: string;
  /** Final price in rupees (integer). */
  price: number;
  /** Struck-through original price in rupees (integer). */
  original: number;
  /** Discount pill text, e.g. "Flat 27% Off". */
  off: string;
}

/**
 * The product being checked out. Fields come from two sources:
 *   - the URL (authoritative for the first render)
 *   - the server (`getProduct` response — reconciles and
 *     overrides on success)
 *
 * The `id`, `title`, `image`, and `price` (for the selected
 * plan) are required; everything else is optional and either
 * rendered conditionally or hidden.
 */
export interface Product {
  /** Stable product identifier, e.g. "taxation-compliance-2026". */
  id: string;
  /** Display title shown in Order Details. */
  title: string;
  /** Absolute or root-relative image URL for the thumbnail. */
  image: string;
  /** Plans offered. At least one required. */
  plans: Partial<Record<PlanId, ProductPlan>> & {
    year?: ProductPlan;
    life?: ProductPlan;
  };
  /** Rating out of 5, e.g. 4.9. */
  rating?: number;
  /** Human-readable rating count, e.g. "7,200+ ratings". */
  ratingCount?: string;
  /** Pipe-separated short feature line shown under the title. */
  shortFeatures?: string[];
  /** Extra feature items shown under "View more details". */
  moreFeatures?: string[];
  /** Optional category, currently unused visually. */
  type?: string;
}

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
 * Only one modal can be open at a time — the source had no
 * concept of stacked dialogs, and stacking is not supported.
 */
export type CheckoutModal =
  | null
  | { kind: "phone-otp"; phone: string; devCode?: string }
  | { kind: "email-input" }
  | { kind: "email-otp"; email: string; devCode?: string }
  | { kind: "pay-error"; message: string };

/**
 * The full local state of the checkout page. Held in
 * `CheckoutPage` via `useState` — nothing here belongs in
 * Redux, since it's not read by anything outside the page.
 */
export interface CheckoutState {
  /** Currently selected plan. Initial value from URL `plan`. */
  plan: PlanId;
  /** Preferred OTP channel. */
  channel: Channel;
  /** Phone number (10 digits, no prefix). */
  phone: string;
  /** Email address (empty until email verification runs). */
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
  /** Inline error messages for the three forms. */
  errors: CheckoutErrors;
}

/* ------------------------------------------------------------
   API — product
   ------------------------------------------------------------ */

/** `GET /products/:id` response. */
export type GetProductResponse = Product;

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

export interface ValidateGstArgs extends GstDetails {}

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
  channel: Channel;
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
 * Payload sent to `createOrder`. Matches the shape the source
 * built in `buildPayload()`, so any downstream consumer can
 * treat them interchangeably.
 */
export interface OrderPayload {
  plan: { id: PlanId; label: string };
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