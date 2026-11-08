// ============================================================
// src/pages/checkout/index.tsx
// Checkout page orchestrator.
//
// Verification architecture (Approach A — verify before order):
//
//   Phone  → Firebase Phone Auth SDK (SMS OTP).
//            usePhoneVerification returns plain Promises.
//            <OtpModal> is phone-only and Promise-native — no
//            adapters, no fake RequestHandle, no abort shim.
//
//   Email  → Firebase Email Link (sendSignInLinkToEmail).
//            No modal. The user leaves, clicks the link, and
//            lands on /auth/email-link, which signs in, refreshes
//            the ID token, calls /auth/sync, and redirects back
//            here with ?courseId=…&plan=… preserved.
//
//   Both   → POST /auth/sync → principal in Redux.
//   verifiedBy is hydrated from authState.principal on mount so
//   the email-link round-trip restores the gate after remount.
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";
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
    CHECKOUT_PLAN_PARAM,
    CHECKOUT_ERROR_EVENT,
    CHECKOUT_REDIRECT_EVENT,
    CHECKOUT_SUBMIT_EVENT,
    DEFAULT_OTP_CHANNEL,
    EMAIL_REGEX,
    GSTIN_REGEX,
    PHONE_REGEX,
} from "./constants";
import {
    buildOrderPayload,
    computeTotals,
    isGstFilled,
    resolveCourseFromParams,
} from "./utils";

import {
    useCreateOrderMutation,
    useValidateGstMutation,
} from "../../services/checkoutApi";

import type {
    CheckoutErrors,
    CheckoutModal,
    GstDetails,
    PlanType,
    VerifiedBy,
    OTPChannel,
} from "./types";

import { useAuth } from "../../features/auth/useAuth";
import { useEmailLink } from "../../features/auth/useEmailLink";
import { usePhoneVerification } from "../../features/auth/usePhoneVerification";
import { useSyncMutation } from "../../services/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setPrincipal } from "../../features/auth/authSlice";
import { getFirebaseAuthClient } from "../../config/firebase";

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
    gst: "",
    email: "",
};

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function CheckoutPage() {
    /* ---------- URL + resolved course + plan ---------- */

    const [searchParams, setSearchParams] = useSearchParams();

    const resolved = useMemo(
        () => resolveCourseFromParams(searchParams),
        [searchParams],
    );

    const courseId = resolved?.course.courseId ?? "";

    /* ---------- State ---------- */

    const [plan, setPlan] = useState<PlanType>(() => resolved?.plan ?? "year");
    const [channel, setChannel] = useState<OTPChannel>(DEFAULT_OTP_CHANNEL);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [verifiedBy, setVerifiedBy] = useState<VerifiedBy>(null);
    const [gstOpen, setGstOpen] = useState(false);
    const [gst, setGst] = useState<GstDetails>(EMPTY_GST);
    const [coupon, setCoupon] = useState<string | null>(null);
    const [discount, setDiscount] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<CheckoutErrors>(EMPTY_ERRORS);
    const [modal, setModal] = useState<CheckoutModal>(null);
    const [sending, setSending] = useState(false);
    const [emailLinkSent, setEmailLinkSent] = useState(false);

    /* ---------- Mutations ---------- */
    const [validateGst] = useValidateGstMutation();
    const [createOrder] = useCreateOrderMutation();
    const [sync] = useSyncMutation();
    const dispatch = useAppDispatch();

    /* ---------- Auth hooks ---------- */
    const authState = useAuth();
    const { sendOtp: sendPhoneOtp, verifyOtp: verifyPhoneOtp } =
        usePhoneVerification("recaptcha-container");
    const { sendLink } = useEmailLink();

    /* ---------- Effective product ---------- */

    const product = resolved?.course ?? null;

    /* ---------- Derived: plan, totals ---------- */

    const planData = resolved?.planData;
    const subtotal = planData?.price ?? 0;
    const totals = useMemo(
        () => computeTotals(subtotal, discount),
        [subtotal, discount],
    );

    /* ------------------------------------------------------------
       Hydrate verifiedBy after the email-link round-trip.
       ------------------------------------------------------------
       EmailLinkPage signs in, calls /auth/sync, then redirects
       back to /order?courseId=...&plan=..., which remounts this
       component with fresh state (verifiedBy = null). The Firebase
       session + principal survive, so we restore the gate here.
       ------------------------------------------------------------ */
    useEffect(() => {
        if (verifiedBy !== null) return;
        const p = authState.principal;
        if (!p) return;
        if (p.phoneVerified) {
            (() => {
                setVerifiedBy("phone");
                if (p.phone) setPhone(p.phone.replace(/^\+91/, ""));
            })();
        } else if (p.emailVerified) {
            (() => {
                setVerifiedBy("email");
                if (p.email) setEmail(p.email);
                setEmailLinkSent(true);
            })();
        }
    }, [authState.principal, verifiedBy]);

    /* ---------- Inline-field handlers ---------- */

    const handlePhoneChange = useCallback((value: string) => {
        setPhone(value);
        setVerifiedBy((current) => (current === "phone" ? null : current));
        setErrors((e) => (e.phone ? { ...e, phone: "" } : e));
    }, []);

    const handleEmailChange = useCallback((value: string) => {
        setEmail(value);
        setEmailLinkSent(false);
        setVerifiedBy((current) => (current === "email" ? null : current));
        setErrors((e) => (e.email ? { ...e, email: "" } : e));
    }, []);

    const clearVerifyError = useCallback(() => {
        setErrors((e) =>
            e.phone || e.email ? { ...e, phone: "", email: "" } : e,
        );
    }, []);

    /* ---------- Plan change (also resets coupon discount) ---------- */

    const handleSelectPlan = useCallback(
        (next: PlanType) => {
            setPlan(next);
            setSearchParams(
                (prev) => {
                    const params = new URLSearchParams(prev);
                    params.set(CHECKOUT_PLAN_PARAM, next);
                    return params;
                },
                { replace: true },
            );
        },
        [setSearchParams],
    );

    /* ------------------------------------------------------------
       Send verification (from VerifySection)
       ------------------------------------------------------------
       Phone  → open OtpModal on success.
       Email  → send the Firebase sign-in link; user leaves the page.
       ------------------------------------------------------------ */

    const handleSendOtp = useCallback(
        async (activeChannel: VerifyChannel) => {
            if (sending || verifiedBy !== null) return;

            /* ---------- Phone ---------- */
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
                    await sendPhoneOtp(phone);
                    setModal({
                        kind: "otp",
                        channel: "phone",
                        identity: phone,
                    });
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

            /* ---------- Email ---------- */
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
                await sendLink(trimmed);
                setEmailLinkSent(true);
            } catch {
                setErrors((e) => ({
                    ...e,
                    email: "Could not send the link. Please try again.",
                }));
            } finally {
                setSending(false);
            }
        },
        [sending, verifiedBy, phone, email, sendPhoneOtp, sendLink],
    );

    /* ------------------------------------------------------------
       Phone OTP success
       ------------------------------------------------------------
       1. force-refresh the ID token so the backend sees the
          latest phone_number claim;
       2. POST /auth/sync to resolve/create the Student;
       3. store the principal in Redux;
       4. set verifiedBy = "phone".
       ------------------------------------------------------------ */

    const handleOtpSuccess = useCallback(async () => {
        setModal(null);
        try {
            const user = getFirebaseAuthClient().currentUser;
            if (!user) throw new Error("No Firebase user after phone verification");
            await user.getIdToken(true);

            const result = await sync().unwrap();
            dispatch(setPrincipal(result.principal));
            setVerifiedBy("phone");
        } catch {
            setErrors((e) => ({
                ...e,
                phone: "Could not register your account. Please try again.",
            }));
        }
    }, [sync, dispatch]);

    /* ------------------------------------------------------------
       Coupon
       ------------------------------------------------------------ */

    const handleCouponApply = useCallback(
        (result: { code: string | null; discount: number }) => {
            setCoupon(result.code);
            setDiscount(result.discount);
        },
        [],
    );

    /* ------------------------------------------------------------
       Pay
       ------------------------------------------------------------ */

    const handlePay = useCallback(async () => {
        if (submitting || verifiedBy === null || !product || !planData) {
            return;
        }

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

        setSubmitting(true);
        const payload = buildOrderPayload({
            courseId,
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
        courseId,
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

    if (!resolved || !product) {
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
                    emailLinkSent={emailLinkSent}
                />
                <div id="recaptcha-container" />

                <CouponSection
                    subtotal={subtotal}
                    onApply={handleCouponApply}
                    locked={verifiedBy === null}
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
                identity={modal?.kind === "otp" ? modal.identity : ""}
                sendOtp={sendPhoneOtp}
                verifyOtp={verifyPhoneOtp}
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