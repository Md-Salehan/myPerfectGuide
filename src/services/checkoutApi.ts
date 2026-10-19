// ============================================================
// src/services/checkoutApi.ts
// RTK Query endpoints for the checkout flow.
//
// Injected into the shared `baseApi` (services/baseApi.ts), so
// no changes to the store are needed — RTK Query merges injected
// endpoints automatically.
//
// All endpoints use the declarative `query:` form. RTK Query
// creates an AbortController per request and threads the signal
// into `fetchBaseQuery` → `fetch`. Callers do NOT create their
// own AbortController and do NOT pass a `signal` argument; they
// cancel by retaining the request handle returned from the
// trigger and calling `request.abort()` on it.
//
//   const request = verifyPhoneOtp({ phone, otp });
//   request.abort();          // cancels the underlying fetch
//   await request.unwrap();   // rejects when aborted
//
// The request handle is the ONLY public cancellation mechanism.
// See the RTK Query cancellation guide for the full rationale.
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
   API
   ------------------------------------------------------------ */

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* ---------- 1a. Send phone OTP ------------------------------ */
    sendPhoneOtp: build.mutation<SendOtpResponse, SendPhoneOtpArgs>({
      query: ({ phone }) => ({
        url: "/otp/phone/send",
        method: "POST",
        body: { phone },
      }),
    }),

    /* ---------- 1b. Verify phone OTP ---------------------------- */
    verifyPhoneOtp: build.mutation<VerifyOtpResponse, VerifyPhoneOtpArgs>({
      query: ({ phone, otp }) => ({
        url: "/otp/phone/verify",
        method: "POST",
        body: { phone, otp },
      }),
    }),

    /* ---------- 2a. Send email OTP ------------------------------ */
    sendEmailOtp: build.mutation<SendOtpResponse, SendEmailOtpArgs>({
      query: ({ email }) => ({
        url: "/otp/email/send",
        method: "POST",
        body: { email },
      }),
    }),

    /* ---------- 2b. Verify email OTP ---------------------------- */
    verifyEmailOtp: build.mutation<VerifyOtpResponse, VerifyEmailOtpArgs>({
      query: ({ email, otp }) => ({
        url: "/otp/email/verify",
        method: "POST",
        body: { email, otp },
      }),
    }),

    /* ---------- 3. Validate coupon ------------------------------ */
    validateCoupon: build.mutation<ValidateCouponResponse, ValidateCouponArgs>({
      query: ({ code, subtotal }) => ({
        url: "/coupons/validate",
        method: "POST",
        body: { code, subtotal },
      }),
    }),

    /* ---------- 4. Validate GST --------------------------------- */
    validateGst: build.mutation<ValidateGstResponse, ValidateGstArgs>({
      query: (gst) => ({
        url: "/gst/validate",
        method: "POST",
        body: gst,
      }),
    }),

    /* ---------- 5. Create order --------------------------------- */
    /*
     * NOTE: createOrder is a consequential mutation (it creates
     * an order on the server). Per the RTK Query cancellation
     * guide §4.2 / §11.12, callers should NOT abort it on
     * component unmount. The request handle is still returned
     * by the trigger for callers that explicitly need to cancel
     * (e.g. a user-initiated "cancel order" affordance), but
     * CheckoutPage does not retain it and does not abort it.
     */
    createOrder: build.mutation<CreateOrderResponse, OrderPayload>({
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