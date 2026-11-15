import type { ValidateCouponArgs, ValidateCouponResponse, ValidateGstArgs, ValidateGstResponse } from "../pages/checkout/types";
import { baseApi } from "./baseApi";

/* ════════════════════════════════════════════════════════════════
   Types — mirror the backend DTOs from
   src/modules/checkout/checkout.service.ts
   ════════════════════════════════════════════════════════════════ */

export type PlanUrlId = "year" | "threeyear" | "life";

export interface QuoteCourse {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
}

export interface QuotePlan {
  id: PlanUrlId;
  type: "ONE_YEAR" | "THREE_YEAR" | "LIFETIME";
  label: string;              // "1 Year" / "3 Years" / "Lifetime"
  price: number;              // ₹ (not paise)
  mrp: number;
  durationDays: number | null;
}

export interface QuoteResult {
  course: QuoteCourse;
  plan: QuotePlan;
  alreadyEnrolled: boolean;
}

export interface CreateOrderResult {
  success: boolean;
  data: {
    orderId: string;
    razorpayOrderId: string;
    keyId: string;
    amount: number;             // paise
    currency: "INR";
    name: string;
    description: string;
    prefill: { email: string | null; contact: string | null };
  }
  message: string;
}

export interface VerifyPaymentResult {
  success: true;
  orderId: string;
  invoiceId: string;
  enrollmentId: string;
}

export interface OrderDetailResult {
  order: {
    id: string;
    status: "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "REFUNDED";
    amount: number;
    totalAmount: number;
    currency: string;
    courseId: string;
    planType: string | null;
    planDurationDays: number | null;
    createdAt: string;
    updatedAt: string;
  };
  payments: Array<{
    id: string;
    status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    amount: number;
    gatewayOrderId: string | null;
    gatewayPaymentId: string | null;
    paidAt: string | null;
  }>;
  enrollment: { id: string; status: string; expiresAt: string | null } | null;
  invoice: {
    id: string;
    invoiceNumber: string;
    status: string;
    totalAmount: number;
  } | null;
}

/* ════════════════════════════════════════════════════════════════
   Endpoints
   ════════════════════════════════════════════════════════════════ */

export interface CreateOrderArgs {
  courseId: string;
  plan: PlanUrlId;
  idempotencyKey: string;
}

export interface QuoteArgs {
  courseId: string;
  plan: PlanUrlId;
}

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCheckoutQuote: build.query<QuoteResult, QuoteArgs>({
      query: ({ courseId, plan }) => ({
        url: `/checkout/${courseId}`,
        params: { plan },
      }),
      // Not cached — price and alreadyEnrolled must be fresh on each visit.
      keepUnusedDataFor: 0,
    }),

    createOrder: build.mutation<CreateOrderResult, CreateOrderArgs>({
      query: ({ courseId, plan, idempotencyKey }) => ({
        url: "/orders",
        method: "POST",
        body: { courseId, plan },
        headers: { "Idempotency-Key": idempotencyKey },
      }),
    }),

    verifyPayment: build.mutation<
      VerifyPaymentResult,
      {
        orderId: string;
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
      }
    >({
      query: (body) => ({ url: "/payments/verify", method: "POST", body }),
    }),

    getOrder: build.query<OrderDetailResult, string>({
      query: (orderId) => ({ url: `/orders/${orderId}` }),
      // Polled by SuccessPage; do not aggressively cache.
      keepUnusedDataFor: 0,
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

  }),
});

export const {
  useGetCheckoutQuoteQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetOrderQuery,
  useLazyGetOrderQuery,

  useValidateCouponMutation,
  useValidateGstMutation
} = checkoutApi;