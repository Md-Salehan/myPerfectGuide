// ============================================================
// src/pages/checkout/constants.ts
// Client-side constants for the checkout page.
//
// This file deliberately does NOT contain:
//   - the coupon catalogue (server / mock owns it)
//   - the product catalogue (src/data/courses.ts owns it)
//   - the GSTIN checksum algorithm (server validates; client
//     only runs a shape regex)
//   - any sessionStorage key (persistence was removed)
//
// Post-refactor, this file also owns the *route* and *URL
// param names* the checkout flow uses, so the navigator
// (SidebarEnrollCard / product-detail pages) and the resolver
// (utils.resolveCourseFromParams) cannot drift apart.
//
// Consumed by:
//   - pages/checkout/utils.ts
//   - pages/checkout/CheckoutPage.tsx
//   - pages/checkout/sections/*.tsx
//   - pages/checkout/modals/*.tsx
//   - components/product/SidebarEnrollCard.tsx
//   - services/mocks/checkoutMocks.ts  (for regex parity)
// ============================================================

import type { OTPChannel, PlanType } from "./types";

/* ------------------------------------------------------------
   Routing / URL shape
   ------------------------------------------------------------
   The checkout page is reached at:
     {CHECKOUT_ROUTE}?{COURSE_PARAM}=<courseId>&{PLAN_PARAM}=<plan>

   These are the ONLY identifiers the URL carries. Everything
   else about the course / plan is resolved from
   `src/data/courses.ts` inside the checkout page.
   ------------------------------------------------------------ */

/** Path of the checkout / order page. */
export const CHECKOUT_ROUTE = "/order";

/** Query param carrying the selected course id. */
export const CHECKOUT_COURSE_PARAM = "courseId";

/** Query param carrying the selected plan id. */
export const CHECKOUT_PLAN_PARAM = "plan";

/* ------------------------------------------------------------
   Validation regexes
   ------------------------------------------------------------
   These mirror the source's checks 1:1. They run on the client
   as a fast path — catching obvious typos before a network
   round-trip — and the server runs the authoritative check.
   ------------------------------------------------------------ */

/**
 * Indian mobile number: exactly 10 digits, first digit 6–9.
 * Matches the source's `/^[6-9]\d{9}$/`.
 */
export const PHONE_REGEX = /^[6-9]\d{9}$/;

/**
 * Permissive email check: non-empty local part, non-empty
 * domain, no spaces. Matches the source's regex.
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GSTIN: 15 characters.
 *   2 digits (state code)
 *   5 uppercase letters (PAN first half)
 *   4 digits (PAN second half)
 *   1 uppercase letter
 *   1 alphanumeric (entity number)
 *   1 uppercase 'Z'
 *   1 alphanumeric (checksum)
 * Matches the source's `/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/`.
 */
export const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

/* ------------------------------------------------------------
   OTP configuration
   ------------------------------------------------------------ */

/** Digits in a verification code. Locked at 6. */
export const OTP_LENGTH = 6;

/**
 * Seconds the "Resend code" link stays disabled after a send.
 * Matches the pattern real OTP flows use.
 */
export const RESEND_COOLDOWN_SECONDS = 6;

/* ------------------------------------------------------------
   Coupon input
   ------------------------------------------------------------ */

/** Maximum length of a coupon code the input will accept. */
export const COUPON_MAX_LENGTH = 16;

/* ------------------------------------------------------------
   Defaults — used when the URL omits the corresponding param
   ------------------------------------------------------------ */

/**
 * Applied when `?plan=` is missing.
 *
 * NOTE: this is only a *fallback for a missing param*. If the
 * URL names a plan the resolved course does not offer,
 * `resolveCourseFromParams` returns `null` and the page
 * redirects — the default is never substituted for an invalid
 * plan.
 */
export const DEFAULT_PLAN: PlanType = "year";

/** Applied when no channel has been chosen yet. */
export const DEFAULT_OTP_CHANNEL: OTPChannel = "wa";

/* ------------------------------------------------------------
   GST states
   ------------------------------------------------------------
   The same 11 states the source populated into the <select>,
   in the same order. When the real backend supplies the full
   list, this fallback can be removed — until then, it keeps
   the accordion usable offline.
   ------------------------------------------------------------ */

export const GST_STATES: readonly string[] = [
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
] as const;

/* ------------------------------------------------------------
   Custom events
   ------------------------------------------------------------
   The source dispatched `checkout:submit` on successful order
   creation. Kept as a named constant so any future listener
   and the CheckoutPage dispatcher agree on the same string.
   ------------------------------------------------------------ */

/** Fires on `document` after `createOrder` resolves (no redirect). */
export const CHECKOUT_SUBMIT_EVENT = "checkout:submit";

/** Fires on `document` when a redirect-based payment is initiated. */
export const CHECKOUT_REDIRECT_EVENT = "checkout:redirect";

/** Fires on `document` when order creation fails. */
export const CHECKOUT_ERROR_EVENT = "checkout:error";