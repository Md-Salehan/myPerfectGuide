// ============================================================
// src/services/checkoutApi.ts
// RTK Query endpoints for the checkout flow.
//
// Injected into the shared `baseApi` (services/baseApi.ts), so
// no changes to the store are needed — RTK Query merges injected
// endpoints automatically.
//
// All endpoints use the declarative `query:` form. This is
// deliberate: RTK Query creates an AbortController per request
// and passes the signal into `fetchBaseQuery`, so an in-flight
// request is genuinely aborted when:
//   - the subscriber unmounts, OR
//   - `.reset()` is called on the mutation result, OR
//   - the caller passes `{ signal }` to `.initiate(arg, opts)`.
//
// URLs below are DUMMY. They point at `${VITE_API_BASE_URL}/…`
// (default `/api`). Nothing is running at these paths yet, so
// every call will fail with a network error in dev — this is
// the correct end state after removing the in-memory mocks.
// When a real backend is wired in, either:
//   - set VITE_API_BASE_URL to the real host, or
//   - change the `url:` strings below to the real routes.
// Nothing else in the app changes.
// ============================================================

import { baseApi } from "./baseApi";

import type {
  CreateOrderResponse,
  OrderPayload,
  SendEmailOtpArgs,
  SendOtpResponse,
  SendPhoneOtpArgs,
  ValidateCouponArgs,
  ValidateCouponResponse,
  ValidateGstArgs,
  ValidateGstResponse,
  VerifyEmailOtpArgs,
  VerifyOtpResponse,
  VerifyPhoneOtpArgs,
} from "../pages/checkout/types";

/* ------------------------------------------------------------
   Request options
   ------------------------------------------------------------
   Extra options RTK Query forwards to the underlying
   `fetchBaseQuery`. `signal` is the one we care about — the
   checkout page passes it from an AbortController so the OTP
   modal can cancel an in-flight verify when the user closes
   the modal.

   Exported so `CheckoutPage` can type its adapter signatures
   against the same shape the mutations accept.
   ------------------------------------------------------------ */

export interface RequestOptions {
  /** Caller-supplied AbortSignal. Forwarded to `fetch`. */
  signal?: AbortSignal;
}

/* ------------------------------------------------------------
   API
   ------------------------------------------------------------ */

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* ---------- 1a. Send phone OTP ------------------------------ */
    sendPhoneOtp: build.mutation<
      SendOtpResponse,
      SendPhoneOtpArgs & RequestOptions
    >({
      query: ({ phone }) => ({
        url: "/otp/phone/send",
        method: "POST",
        body: { phone },
      }),
    }),

    /* ---------- 1b. Verify phone OTP ---------------------------- */
    verifyPhoneOtp: build.mutation<
      VerifyOtpResponse,
      VerifyPhoneOtpArgs & RequestOptions
    >({
      query: ({ phone, otp }) => ({
        url: "/otp/phone/verify",
        method: "POST",
        body: { phone, otp },
      }),
    }),

    /* ---------- 2a. Send email OTP ------------------------------ */
    sendEmailOtp: build.mutation<
      SendOtpResponse,
      SendEmailOtpArgs & RequestOptions
    >({
      query: ({ email }) => ({
        url: "/otp/email/send",
        method: "POST",
        body: { email },
      }),
    }),

    /* ---------- 2b. Verify email OTP ---------------------------- */
    verifyEmailOtp: build.mutation<
      VerifyOtpResponse,
      VerifyEmailOtpArgs & RequestOptions
    >({
      query: ({ email, otp }) => ({
        url: "/otp/email/verify",
        method: "POST",
        body: { email, otp },
      }),
    }),

    /* ---------- 3. Validate coupon ------------------------------ */
    validateCoupon: build.mutation<
      ValidateCouponResponse,
      ValidateCouponArgs & RequestOptions
    >({
      query: ({ code, subtotal }) => ({
        url: "/coupons/validate",
        method: "POST",
        body: { code, subtotal },
      }),
    }),

    /* ---------- 4. Validate GST --------------------------------- */
    validateGst: build.mutation<
      ValidateGstResponse,
      ValidateGstArgs & RequestOptions
    >({
      query: (gst) => ({
        url: "/gst/validate",
        method: "POST",
        body: gst,
      }),
    }),

    /* ---------- 5. Create order --------------------------------- */
    createOrder: build.mutation<
      CreateOrderResponse,
      OrderPayload & RequestOptions
    >({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        // The full payload — including `courseId` — goes to the
        // server. The server validates it and, if it accepts,
        // either returns a `redirectUrl` (payment gateway) or
        // a captured-in-place order id.
        body: payload,
      }),
    }),
  }),
});

/* ------------------------------------------------------------
   Generated hooks
   ------------------------------------------------------------
   RTK Query auto-generates one hook per endpoint. Exporting
   them here keeps component imports tidy.
   ------------------------------------------------------------ */

export const {
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useValidateCouponMutation,
  useValidateGstMutation,
  useCreateOrderMutation,
} = checkoutApi;