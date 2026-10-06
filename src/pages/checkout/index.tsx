// ============================================================
// src/pages/checkout/CheckoutPage.tsx
// Checkout page orchestrator.
//
// Responsibilities:
//   - Read + validate URL params (redirect to "/" if invalid)
//   - Fetch product via RTK Query, reconcile with URL data
//   - Own all page state (plan, phone, email, coupon, gst, modals)
//   - Run all API flows (verify, coupon, gst, order)
//   - Dispatch checkout:submit / checkout:redirect events
//   - Render the two-column layout with the mobile reflow
//
// OTP architecture (post-refactor):
//   - One <OtpModal />, one OtpInput, one cooldown ticker.
//   - The modal is channel-agnostic: it receives `sendOtp`
//     and `verifyOtp` adapters built here, which translate
//     { channel, identity, otp } into the correct mutation.
//   - VerifySection calls onSendOtp(channel); this page runs
//     the matching mutation and opens the modal on success.
// ============================================================

import { useCallback, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { CheckoutHeader } from "./sections/CheckoutHeader";
import { CouponSection } from "./sections/CouponSection";
import { GstSection } from "./sections/GstSection";
import { OrderDetailsSection } from "./sections/OrderDetailsSection";
import { PayBar } from "./sections/PayBar";
import { ReceiptSection } from "./sections/ReceiptSection";
import {
    VerifySection,
    type VerifyChannel,
} from "./sections/VerifySection";

import { OtpModal } from "./modals/OtpModal";
import { PayErrorModal } from "./modals/PayErrorModal";

import {
    CHECKOUT_ERROR_EVENT,
    CHECKOUT_REDIRECT_EVENT,
    CHECKOUT_SUBMIT_EVENT,
    DEFAULT_OTP_CHANNEL,
    DEFAULT_PLAN,
    EMAIL_REGEX,
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
    GstDetails,
    PlanType,
    Product,
    VerifiedBy,
    OTPChannel,
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

    const urlProduct = useMemo(
        () => parseProductFromParams(searchParams),
        [searchParams],
    );

    const productId = urlProduct?.id ?? "";

    const productQuery = useGetProductQuery(productId, {
        skip: !productId,
    });

    /* ---------- State ---------- */

    const [plan, setPlan] = useState<PlanType>(() =>
        urlProduct?.plans.year
            ? (searchParams.get("plan") as PlanType) ?? DEFAULT_PLAN
            : DEFAULT_PLAN,
    );
    const [channel, setChannel] = useState<OTPChannel>(DEFAULT_OTP_CHANNEL);
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
    const [sending, setSending] = useState(false);

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
        const server = productQuery.data;
        if (!server) return urlProduct;
        return {
            ...urlProduct,
            ...server,
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

    /* ---------- Inline-field handlers ---------- */

    const handlePhoneChange = useCallback((value: string) => {
        setPhone(value);
        // Editing the number invalidates a previous phone verification.
        setVerifiedBy((current) => (current === "phone" ? null : current));
        setErrors((e) => (e.phone ? { ...e, phone: "" } : e));
    }, []);

    const handleEmailChange = useCallback((value: string) => {
        setEmail(value);
        // Editing the email invalidates a previous email verification.
        setVerifiedBy((current) => (current === "email" ? null : current));
        setErrors((e) => (e.email ? { ...e, email: "" } : e));
    }, []);

    const clearVerifyError = useCallback(() => {
        setErrors((e) =>
            e.phone || e.email ? { ...e, phone: "", email: "" } : e,
        );
    }, []);

    /* ---------- Plan change (also resets coupon discount) ---------- */

    const handleSelectPlan = useCallback((next: PlanType) => {
        setPlan(next);
        // Plan change invalidates any coupon discount tied to the old subtotal.
        setDiscount(0);
        setDiscountLabel(null);
    }, []);

    /* ------------------------------------------------------------
       Channel-bound adapters handed to <OtpModal />
       ------------------------------------------------------------
       These translate the modal's channel-agnostic call shape
       ({ channel, identity, otp }) into the correct RTK Query
       mutation. The modal never imports the mutations itself.
       ------------------------------------------------------------ */

    const sendOtpAdapter = useCallback(
        async ({
            channel: c,
            identity,
        }: {
            channel: VerifyChannel;
            identity: string;
        }) => {
            if (c === "phone") {
                const res = await sendPhoneOtp({ phone: identity }).unwrap();
                return { devCode: res.devCode };
            }
            const res = await sendEmailOtp({ email: identity }).unwrap();
            return { devCode: res.devCode };
        },
        [sendPhoneOtp, sendEmailOtp],
    );

    const verifyOtpAdapter = useCallback(
        async ({
            channel: c,
            identity,
            otp,
        }: {
            channel: VerifyChannel;
            identity: string;
            otp: string;
        }) => {
            if (c === "phone") {
                return verifyPhoneOtp({ phone: identity, otp }).unwrap();
            }
            return verifyEmailOtp({ email: identity, otp }).unwrap();
        },
        [verifyPhoneOtp, verifyEmailOtp],
    );

    /* ------------------------------------------------------------
       Send OTP (from VerifySection)
       ------------------------------------------------------------ */

    const handleSendOtp = useCallback(
        async (activeChannel: VerifyChannel) => {
            if (sending || verifiedBy !== null) return;

            // Client-side fast path per channel.
            if (activeChannel === "phone") {
                if (!PHONE_REGEX.test(phone)) {
                    setErrors((e) => ({
                        ...e,
                        phone: "Please provide a valid phone number.",
                    }));
                    return;
                }
                setErrors((e) => ({ ...e, phone: "" }));

                setSending(true);
                try {
                    const result = await sendPhoneOtp({ phone }).unwrap();
                    if (result.sent) {
                        setModal({
                            kind: "otp",
                            channel: "phone",
                            identity: phone,
                            devCode: result.devCode,
                        });
                    }
                } catch {
                    setErrors((e) => ({
                        ...e,
                        phone: "Could not send the code. Please try again.",
                    }));
                } finally {
                    setSending(false);
                }
                return;
            }

            // Email branch
            const trimmed = email.trim();
            if (!EMAIL_REGEX.test(trimmed)) {
                setErrors((e) => ({
                    ...e,
                    email: "Please provide a valid email address.",
                }));
                return;
            }
            setErrors((e) => ({ ...e, email: "" }));

            setSending(true);
            try {
                const result = await sendEmailOtp({ email: trimmed }).unwrap();
                if (result.sent) {
                    setModal({
                        kind: "otp",
                        channel: "email",
                        identity: trimmed,
                        devCode: result.devCode,
                    });
                }
            } catch {
                setErrors((e) => ({
                    ...e,
                    email: "Could not send the code. Please try again.",
                }));
            } finally {
                setSending(false);
            }
        },
        [
            sending,
            verifiedBy,
            phone,
            email,
            sendPhoneOtp,
            sendEmailOtp,
        ],
    );

    /* ------------------------------------------------------------
       OTP success
       ------------------------------------------------------------ */

    const handleOtpSuccess = useCallback(() => {
        // The modal only reports success for the channel it was
        // opened with, so we can derive `verifiedBy` from the
        // current modal payload before clearing it.
        setModal((current) => {
            if (current?.kind === "otp") {
                setVerifiedBy(current.channel);
            }
            return null;
        });
    }, []);

    /* ------------------------------------------------------------
       Coupon
       ------------------------------------------------------------ */

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
                // Keep the panel open so the applied coupon is visible.
                setCouponOpen(true);
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

    /* ------------------------------------------------------------
       Pay
       ------------------------------------------------------------ */

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
                document.dispatchEvent(
                    new CustomEvent(CHECKOUT_REDIRECT_EVENT, {
                        detail: { payload, response: result },
                    }),
                );
                window.location.href = result.redirectUrl;
                return;
            }

            document.dispatchEvent(
                new CustomEvent(CHECKOUT_SUBMIT_EVENT, {
                    detail: { payload, response: result },
                }),
            );
            setSubmitting(false);
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

    /* ---------- Redirect if URL is invalid ---------- */

    if (!urlProduct || !product) {
        return <Navigate to="/" replace />;
    }

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
                    onSelectPlan={handleSelectPlan}
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
                    email={email}
                    channel={channel}
                    verifiedBy={verifiedBy}
                    error={errors.phone || errors.email}
                    sending={sending}
                    onPhoneChange={handlePhoneChange}
                    onEmailChange={handleEmailChange}
                    onChannelChange={setChannel}
                    onClearError={clearVerifyError}
                    onSendOtp={handleSendOtp}
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

            <OtpModal
                open={modal?.kind === "otp"}
                channel={modal?.kind === "otp" ? modal.channel : "phone"}
                identity={modal?.kind === "otp" ? modal.identity : ""}
                devCode={modal?.kind === "otp" ? modal.devCode : undefined}
                sendOtp={sendOtpAdapter}
                verifyOtp={verifyOtpAdapter}
                onSuccess={handleOtpSuccess}
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