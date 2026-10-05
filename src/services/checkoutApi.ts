// ============================================================
// src/services/checkoutApi.ts
// RTK Query endpoints for the checkout flow.
//
// Injected into the shared `baseApi` (services/baseApi.ts),
// so no changes to the store are needed — RTK Query merges
// injected endpoints automatically.
//
// Every endpoint uses a queryFn that hits the in-memory mock
// (services/mocks/checkoutMocks.ts). When a real backend
// arrives, each queryFn swaps to the url/method/body form:
//
//   query: (args) => ({ url: "/products/" + args, method: "GET" })
//
// and nothing else in the app changes.
// ============================================================

import { baseApi } from "./baseApi";

import {
  computeDiscount,
  findCoupon,
  maybeFail,
  MOCK_OTP_CODE,
  MOCK_OTP_FAIL_CODE,
  MOCK_PRODUCTS,
  simulateLatency,
} from "./mocks/checkoutMocks";

import { EMAIL_REGEX, GSTIN_REGEX, PHONE_REGEX } from "../pages/checkout/constants";

import type {
  CreateOrderResponse,
  GetProductResponse,
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
   Latency budget per endpoint (ms)
   ------------------------------------------------------------
   Tuned so loading states are visible without feeling slow.
   Replace with real numbers when a backend exists.
   ------------------------------------------------------------ */

const LATENCY = {
  getProduct: 180,
  sendOtp: 250,
  verifyOtp: 350,
  validateCoupon: 300,
  validateGst: 250,
  createOrder: 900,
} as const;

/* ------------------------------------------------------------
   API
   ------------------------------------------------------------ */

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* ---------- 1. Get product ---------------------------------- */
    getProduct: build.query<GetProductResponse, string>({
      async queryFn(id) {
        await simulateLatency(LATENCY.getProduct);
        try {
          maybeFail();
        } catch (error) {
          return {
            error: { status: 503, data: "Could not load product" },
          };
        }
        const product = MOCK_PRODUCTS[id];
        if (!product) {
          return {
            error: { status: 404, data: `Product "${id}" not found` },
          };
        }
        return { data: product };
      },
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),

    /* ---------- 2a. Send phone OTP ------------------------------ */
    sendPhoneOtp: build.mutation<SendOtpResponse, SendPhoneOtpArgs>({
      async queryFn({ phone }) {
        await simulateLatency(LATENCY.sendOtp);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not send code" } };
        }
        // Server-side validation parity with the client.
        if (!PHONE_REGEX.test(phone)) {
          return { error: { status: 400, data: "Invalid phone number" } };
        }
        return {
          data: {
            sent: true,
            // Shown to the user in dev; absent on a real backend.
            devCode: MOCK_OTP_CODE,
          },
        };
      },
    }),

    /* ---------- 2b. Verify phone OTP ---------------------------- */
    verifyPhoneOtp: build.mutation<VerifyOtpResponse, VerifyPhoneOtpArgs>({
      async queryFn({ phone, otp }) {
        await simulateLatency(LATENCY.verifyOtp);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not verify code" } };
        }
        if (!PHONE_REGEX.test(phone)) {
          return { data: { verified: false, reason: "Invalid phone number" } };
        }
        if (otp === MOCK_OTP_FAIL_CODE) {
          return { data: { verified: false, reason: "Incorrect code" } };
        }
        if (otp !== MOCK_OTP_CODE) {
          return { data: { verified: false, reason: "Incorrect code" } };
        }
        return { data: { verified: true } };
      },
    }),

    /* ---------- 3a. Send email OTP ------------------------------ */
    sendEmailOtp: build.mutation<SendOtpResponse, SendEmailOtpArgs>({
      async queryFn({ email }) {
        await simulateLatency(LATENCY.sendOtp);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not send code" } };
        }
        if (!EMAIL_REGEX.test(email)) {
          return { error: { status: 400, data: "Invalid email address" } };
        }
        return {
          data: {
            sent: true,
            devCode: MOCK_OTP_CODE,
          },
        };
      },
    }),

    /* ---------- 3b. Verify email OTP ---------------------------- */
    verifyEmailOtp: build.mutation<VerifyOtpResponse, VerifyEmailOtpArgs>({
      async queryFn({ email, otp }) {
        await simulateLatency(LATENCY.verifyOtp);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not verify code" } };
        }
        if (!EMAIL_REGEX.test(email)) {
          return { data: { verified: false, reason: "Invalid email" } };
        }
        if (otp === MOCK_OTP_FAIL_CODE || otp !== MOCK_OTP_CODE) {
          return { data: { verified: false, reason: "Incorrect code" } };
        }
        return { data: { verified: true } };
      },
    }),

    /* ---------- 4. Validate coupon ------------------------------ */
    validateCoupon: build.mutation<ValidateCouponResponse, ValidateCouponArgs>({
      async queryFn({ code, subtotal }) {
        await simulateLatency(LATENCY.validateCoupon);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not validate coupon" } };
        }
        const normalised = code.trim().toUpperCase();
        if (!normalised) {
          return { data: { valid: false, discount: 0, reason: "Please enter a coupon code" } };
        }
        const found = findCoupon(normalised);
        if (!found) {
          return { data: { valid: false, discount: 0, reason: "Invalid coupon code" } };
        }
        const discount = computeDiscount(found.coupon, subtotal);
        return {
          data: {
            valid: true,
            discount,
            label: found.coupon.label,
          },
        };
      },
    }),

    /* ---------- 5. Validate GST --------------------------------- */
    validateGst: build.mutation<ValidateGstResponse, ValidateGstArgs>({
      async queryFn(gst) {
        await simulateLatency(LATENCY.validateGst);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Could not validate GST" } };
        }
        // Server-side parity: all fields required, GSTIN must
        // match the shape regex.
        const { number, name, address, state } = gst;
        if (!number.trim() || !name.trim() || !address.trim() || !state) {
          return { data: { valid: false, reason: "All GST fields are required." } };
        }
        if (!GSTIN_REGEX.test(number.trim())) {
          return {
            data: {
              valid: false,
              reason: "Please enter a valid 15-character GST number.",
            },
          };
        }
        return { data: { valid: true } };
      },
    }),

    /* ---------- 6. Create order --------------------------------- */
    createOrder: build.mutation<CreateOrderResponse, OrderPayload>({
      async queryFn(payload) {
        await simulateLatency(LATENCY.createOrder);
        try {
          maybeFail();
        } catch {
          return { error: { status: 503, data: "Order creation failed" } };
        }
        // Sanity check: subtotal must match a plan price.
        if (payload.amount.subtotal <= 0) {
          return { error: { status: 400, data: "Invalid order amount" } };
        }
        // Mock order id, deterministic per timestamp so it looks
        // realistic in logs and the UI.
        const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
        return {
          data: {
            orderId,
            status: "created",
            // No redirectUrl: real capture happens in-place for
            // the mock. A real backend would return a payment
            // gateway URL here for card/UPI flows.
          },
        };
      },
      invalidatesTags: [{ type: "Order" }],
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
  useGetProductQuery,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useValidateCouponMutation,
  useValidateGstMutation,
  useCreateOrderMutation,
} = checkoutApi;