// ============================================================
// src/pages/checkout/constants.ts
// Client-side constants for the checkout page.
//
// This file deliberately does NOT contain:
//   - the coupon catalogue (server / mock owns it)
//   - the product catalogue (server / mock owns it)
//   - the GSTIN checksum algorithm (server validates; client
//     only runs a shape regex)
//   - any sessionStorage key (persistence was removed)
//
// Consumed by:
//   - pages/checkout/utils.ts
//   - pages/checkout/CheckoutPage.tsx
//   - pages/checkout/sections/*.tsx
//   - pages/checkout/modals/*.tsx
//   - services/mocks/checkoutMocks.ts  (for regex parity)
// ============================================================

import type { Channel, PlanId } from "./types";

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
export const RESEND_COOLDOWN_SECONDS = 60;

/* ------------------------------------------------------------
   Coupon input
   ------------------------------------------------------------ */

/** Maximum length of a coupon code the input will accept. */
export const COUPON_MAX_LENGTH = 16;

/* ------------------------------------------------------------
   Defaults — used when the URL omits the corresponding param
   ------------------------------------------------------------ */

/** Applied when `?plan=` is missing or unrecognised. */
export const DEFAULT_PLAN: PlanId = "year";

/** Applied when no channel has been chosen yet. */
export const DEFAULT_CHANNEL: Channel = "wa";

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