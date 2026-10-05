// ============================================================
// src/pages/checkout/CheckoutPage.tsx
// Checkout page orchestrator.
//
// Responsibilities:
//   - Read + validate URL params (redirect to "/" if invalid)
//   - Fetch product via RTK Query, reconcile with URL data
//   - Own all page state (plan, phone, coupon, gst, modals)
//   - Run all API flows (verify, coupon, gst, order)
//   - Dispatch checkout:submit / checkout:redirect events
//   - Render the two-column layout with the mobile reflow
//
// Sections and modals are pure presentational components;
// this file wires them together and holds the state they
// read from.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { CheckoutHeader } from "./sections/CheckoutHeader";
import { CouponSection } from "./sections/CouponSection";
import { GstSection } from "./sections/GstSection";
import { OrderDetailsSection } from "./sections/OrderDetailsSection";
import { PayBar } from "./sections/PayBar";
import { ReceiptSection } from "./sections/ReceiptSection";
import { VerifySection } from "./sections/VerifySection";

import { EmailInputModal } from "./modals/EmailInputModal";
import { EmailOtpModal } from "./modals/EmailOtpModal";
import { PayErrorModal } from "./modals/PayErrorModal";
import { PhoneOtpModal } from "./modals/PhoneOtpModal";

import {
  CHECKOUT_ERROR_EVENT,
  CHECKOUT_REDIRECT_EVENT,
  CHECKOUT_SUBMIT_EVENT,
  DEFAULT_CHANNEL,
  DEFAULT_PLAN,
  GSTIN_REGEX,
  PHONE_REGEX,
} from "./constants";
import {
  buildOrderPayload,
  computeTotals,
  isGstFilled,
  parseProductFromParams,
} from "./utils";

import {
  useCreateOrderMutation,
  useGetProductQuery,
  useSendEmailOtpMutation,
  useSendPhoneOtpMutation,
  useValidateCouponMutation,
  useValidateGstMutation,
  useVerifyEmailOtpMutation,
  useVerifyPhoneOtpMutation,
} from "../../services/checkoutApi";

import type {
  CheckoutErrors,
  CheckoutModal,
  Channel,
  GstDetails,
  PlanId,
  Product,
  VerifiedBy,
} from "./types";

/* ------------------------------------------------------------
   Constants local to the page
   ------------------------------------------------------------ */

const EMPTY_GST: GstDetails = {
  number: "",
  name: "",
  address: "",
  state: "",
};

const EMPTY_ERRORS: CheckoutErrors = {
  phone: "",
  coupon: "",
  gst: "",
  email: "",
};

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function CheckoutPage() {
  /* ---------- URL + product ---------- */

  const [searchParams] = useSearchParams();

  // Parse once per search-params change. `null` means required
  // fields are missing → we redirect.
  const urlProduct = useMemo(
    () => parseProductFromParams(searchParams),
    [searchParams],
  );

  // If the URL is missing required fields, redirect immediately.
  // This runs before any hooks below would try to use `null`.
  // NOTE: hooks below are called unconditionally — the redirect
  // is a `render` decision, not an early return, so the hooks
  // order stays stable.
  const productId = urlProduct?.id ?? "";

  // Product fetch — skipped when there is no id (empty string).
  const productQuery = useGetProductQuery(productId, {
    skip: !productId,
  });

  /* ---------- State ---------- */

  const [plan, setPlan] = useState<PlanId>(
    () => urlProduct?.plans.year ? (searchParams.get("plan") as PlanId) ?? DEFAULT_PLAN : DEFAULT_PLAN,
  );
  const [channel, setChannel] = useState<Channel>(DEFAULT_CHANNEL);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verifiedBy, setVerifiedBy] = useState<VerifiedBy>(null);
  const [gstOpen, setGstOpen] = useState(false);
  const [gst, setGst] = useState<GstDetails>(EMPTY_GST);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<CheckoutErrors>(EMPTY_ERRORS);
  const [modal, setModal] = useState<CheckoutModal>(null);

  /* ---------- Mutations ---------- */

  const [sendPhoneOtp] = useSendPhoneOtpMutation();
  const [verifyPhoneOtp] = useVerifyPhoneOtpMutation();
  const [sendEmailOtp] = useSendEmailOtpMutation();
  const [verifyEmailOtp] = useVerifyEmailOtpMutation();
  const [validateCoupon] = useValidateCouponMutation();
  const [validateGst] = useValidateGstMutation();
  const [createOrder] = useCreateOrderMutation();

  /* ---------- Effective product (server wins over URL) ---------- */

  const product: Product | null = useMemo(() => {
    if (!urlProduct) return null;
    // Server response is authoritative for the fields it returns.
    // If it hasn't loaded yet, fall back to the URL.
    const server = productQuery.data;
    if (!server) return urlProduct;
    return {
      ...urlProduct,
      ...server,
      // Merge plans field-by-field so URL-only plans still work
      // even if the server returns a subset.
      plans: { ...urlProduct.plans, ...server.plans },
    };
  }, [urlProduct, productQuery.data]);

  /* ---------- Derived: plan, totals ---------- */

  const planData = product?.plans[plan];
  const subtotal = planData?.price ?? 0;
  const totals = useMemo(
    () => computeTotals(subtotal, discount),
    [subtotal, discount],
  );

  /* ---------- Redirect if URL is invalid ---------- */

  // Rendered as a component, not an early return, so the hook
  // order above stays stable across renders.
  if (!urlProduct || !product) {
    return <Navigate to="/" replace />;
  }

  /* ---------- Handlers ---------- */

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    // Editing the number invalidates a previous phone verification.
    setVerifiedBy((current) => (current === "phone" ? null : current));
    setErrors((e) => (e.phone ? { ...e, phone: "" } : e));
  }, []);

  const handlePhoneSubmit = useCallback(async () => {
    // Fast path: client regex.
    if (!PHONE_REGEX.test(phone)) {
      setErrors((e) => ({
        ...e,
        phone: "Please provide a valid phone number.",
      }));
      return;
    }
    setErrors((e) => ({ ...e, phone: "" }));

    try {
      const result = await sendPhoneOtp({ phone }).unwrap();
      if (result.sent) {
        setModal({
          kind: "phone-otp",
          phone,
          devCode: result.devCode,
        });
      }
    } catch {
      setErrors((e) => ({
        ...e,
        phone: "Could not send the code. Please try again.",
      }));
    }
  }, [phone, sendPhoneOtp]);

  const handlePhoneOtpSuccess = useCallback(() => {
    setVerifiedBy("phone");
    setModal(null);
  }, []);

  const handleEmailClick = useCallback(() => {
    setModal({ kind: "email-input" });
  }, []);

  const handleEmailInputSuccess = useCallback(
    ({ email: newEmail, devCode }: { email: string; devCode?: string }) => {
      setEmail(newEmail);
      setModal({ kind: "email-otp", email: newEmail, devCode });
    },
    [],
  );

  const handleEmailOtpSuccess = useCallback(() => {
    setVerifiedBy("email");
    setModal(null);
  }, []);

  const handleCouponToggle = useCallback(() => {
    if (verifiedBy === null) {
      setErrors((e) => ({
        ...e,
        coupon: "Please verify your details first",
      }));
      return;
    }
    setCouponOpen((open) => !open);
    setErrors((e) => (e.coupon ? { ...e, coupon: "" } : e));
  }, [verifiedBy]);

  const handleCouponApplyOrRemove = useCallback(async () => {
    // Remove path
    if (coupon) {
      setCoupon(null);
      setDiscount(0);
      setDiscountLabel(null);
      setCouponInput("");
      setErrors((e) => ({ ...e, coupon: "" }));
      return;
    }

    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setErrors((e) => ({ ...e, coupon: "Please enter a coupon code" }));
      return;
    }

    try {
      const result = await validateCoupon({ code, subtotal }).unwrap();
      if (result.valid) {
        setCoupon(code);
        setDiscount(result.discount);
        setDiscountLabel(result.label ?? null);
        setErrors((e) => ({ ...e, coupon: "" }));
      } else {
        setErrors((e) => ({
          ...e,
          coupon: result.reason ?? "Invalid coupon code",
        }));
      }
    } catch {
      setErrors((e) => ({
        ...e,
        coupon: "Could not validate coupon. Please try again.",
      }));
    }
  }, [coupon, couponInput, subtotal, validateCoupon]);

  const handlePay = useCallback(async () => {
    if (submitting || verifiedBy === null || !product || !planData) return;

    // GST validation (client fast path + server)
    if (isGstFilled(gst)) {
      if (!GSTIN_REGEX.test(gst.number.trim())) {
        setGstOpen(true);
        setErrors((e) => ({
          ...e,
          gst: "Please enter a valid 15-character GST number.",
        }));
        return;
      }
      try {
        const result = await validateGst(gst).unwrap();
        if (!result.valid) {
          setGstOpen(true);
          setErrors((e) => ({
            ...e,
            gst: result.reason ?? "Invalid GST information.",
          }));
          return;
        }
      } catch {
        setGstOpen(true);
        setErrors((e) => ({
          ...e,
          gst: "Could not validate GST. Please try again.",
        }));
        return;
      }
    }
    setErrors((e) => ({ ...e, gst: "" }));

    // Order creation
    setSubmitting(true);
    const payload = buildOrderPayload({
      plan,
      planLabel: planData.label,
      totals,
      coupon,
      verifiedBy,
      channel,
      phone,
      email,
      gst,
    });

    try {
      const result = await createOrder(payload).unwrap();

      if (result.redirectUrl) {
        // Redirect-based payment. Notify listeners, then go.
        document.dispatchEvent(
          new CustomEvent(CHECKOUT_REDIRECT_EVENT, {
            detail: { payload, response: result },
          }),
        );
        window.location.href = result.redirectUrl;
        return;
      }

      // In-place success.
      document.dispatchEvent(
        new CustomEvent(CHECKOUT_SUBMIT_EVENT, {
          detail: { payload, response: result },
        }),
      );
      setSubmitting(false);
      // Parent might want to route to a thank-you page here;
      // for now we just log.
      // eslint-disable-next-line no-console
      console.info("Order created", result);
    } catch (error) {
      document.dispatchEvent(
        new CustomEvent(CHECKOUT_ERROR_EVENT, { detail: error }),
      );
      setSubmitting(false);
      setModal({
        kind: "pay-error",
        message:
          "Something went wrong while creating your order. Please try again.",
      });
    }
  }, [
    submitting,
    verifiedBy,
    product,
    planData,
    gst,
    plan,
    totals,
    coupon,
    channel,
    phone,
    email,
    validateGst,
    createOrder,
  ]);

  /* ---------- Auto-open coupon if applied ---------- */

  useEffect(() => {
    if (coupon && !couponOpen) setCouponOpen(true);
    // Intentionally only reacting to `coupon` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon]);

  /* ---------- Reset discount when plan changes ---------- */

  useEffect(() => {
    // Re-validate the applied coupon against the new subtotal.
    // Simpler than a second API round-trip: drop the discount
    // and let the user re-apply if they want.
    if (discount > 0) {
      setDiscount(0);
      setDiscountLabel(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-white pb-[150px] lg:pb-0">
      {/* ============================================================
          LEFT COLUMN
          ============================================================ */}
      <section className="max-lg:contents lg:block lg:bg-white lg:pb-10">
        <CheckoutHeader />

        <OrderDetailsSection
          product={product}
          selectedPlan={plan}
          onSelectPlan={setPlan}
        />

        <GstSection
          open={gstOpen}
          gst={gst}
          error={errors.gst}
          onToggle={() => setGstOpen((o) => !o)}
          onChange={setGst}
        />
      </section>

      {/* ============================================================
          RIGHT COLUMN
          ============================================================ */}
      <section className="max-lg:contents lg:block lg:bg-slate-50 lg:pt-[71px] lg:pb-12">
        <VerifySection
          phone={phone}
          channel={channel}
          error={errors.phone}
          sending={false}
          onPhoneChange={handlePhoneChange}
          onChannelChange={setChannel}
          onSubmit={handlePhoneSubmit}
          onEmailClick={handleEmailClick}
        />

        <CouponSection
          open={couponOpen}
          value={couponInput}
          applied={coupon}
          error={errors.coupon}
          validating={false}
          onToggle={handleCouponToggle}
          onValueChange={(v) => {
            setCouponInput(v);
            setErrors((e) => (e.coupon ? { ...e, coupon: "" } : e));
          }}
          onApplyOrRemove={handleCouponApplyOrRemove}
        />

        <ReceiptSection subtotal={totals.subtotal} total={totals.total} />

        <PayBar
          total={totals.total}
          disabled={verifiedBy === null}
          submitting={submitting}
          onPay={handlePay}
        />
      </section>

      {/* ============================================================
          MODALS
          ============================================================ */}

      <PhoneOtpModal
        open={modal?.kind === "phone-otp"}
        phone={modal?.kind === "phone-otp" ? modal.phone : ""}
        devCode={modal?.kind === "phone-otp" ? modal.devCode : undefined}
        onSuccess={handlePhoneOtpSuccess}
        onClose={() => setModal(null)}
      />

      <EmailInputModal
        open={modal?.kind === "email-input"}
        onSuccess={handleEmailInputSuccess}
        onClose={() => setModal(null)}
      />

      <EmailOtpModal
        open={modal?.kind === "email-otp"}
        email={modal?.kind === "email-otp" ? modal.email : ""}
        devCode={modal?.kind === "email-otp" ? modal.devCode : undefined}
        onSuccess={handleEmailOtpSuccess}
        onClose={() => setModal(null)}
      />

      <PayErrorModal
        open={modal?.kind === "pay-error"}
        message={modal?.kind === "pay-error" ? modal.message : ""}
        onClose={() => setModal(null)}
      />
    </div>
  );
}