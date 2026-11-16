// src/pages/checkout/index.tsx
//
// Approach A — verify before order. Firebase Phone Auth + Email Link.
// Razorpay Checkout for payment. Authoritative price comes from the
// backend quote endpoint — never from the static catalogue.
//
// Payment flow (callback-based, no polling):
//   PayBar click
//     → POST /orders (internal Order + Razorpay order + Payment row)
//     → window.Razorpay(...).open()
//     → user pays → handler(response)
//     → POST /payments/verify (signature + Razorpay fetch)
//        → backend commits Payment PAID + Order PAID + Enrollment + Invoice
//     → navigate to /order/success with the verify result in router state
//     → SuccessPage renders immediately from state (no further requests)

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";

// import { CheckoutHeader } from "./sections/CheckoutHeader";
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
    DEFAULT_OTP_CHANNEL,
    EMAIL_REGEX,
    PHONE_REGEX,
} from "./constants";
import { computeTotals, resolveCourseFromParams } from "./utils";

import {
    useCreateOrderMutation,
    useVerifyPaymentMutation,
    type CreateOrderResult,
    type PlanUrlId,
} from "../../services/checkoutApi";

import type {
    CheckoutErrors,
    CheckoutModal,
    PlanType,
    VerifiedBy,
    OTPChannel,
} from "./types";

import { useAuth } from "../../features/auth/useAuth";
import { useEmailLink } from "../../features/auth/useEmailLink";
import { usePhoneVerification } from "../../features/auth/usePhoneVerification";
import { useStudentAuth } from "../../features/auth/useStudentAuth";
import { getFirebaseAuthClient } from "../../config/firebase";

const EMPTY_ERRORS: CheckoutErrors = {
    phone: "",
    gst: "",
    email: "",
};

/* ── Razorpay global typings ── */
declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpaySuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface RazorpayFailureResponse {
    error: {
        code: string;
        description: string;
        reason: string;
        metadata?: { order_id?: string; payment_id?: string };
    };
}

interface RazorpayOptions {
    key: string;
    order_id: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    prefill: { email: string | null; contact: string | null };
    handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
    modal?: { ondismiss?: () => void };
    theme?: { color?: string };
}

interface RazorpayInstance {
    open: () => void;
    on: (event: "payment.failed", cb: (response: RazorpayFailureResponse) => void) => void;
}

export function CheckoutPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { courseKey } = useParams();
    const navigate = useNavigate();

    const resolved = useMemo(
        () => resolveCourseFromParams({
            // courseId: searchParams.get("courseId"),
            plan: searchParams.get("plan"),
            courseKey: courseKey ?? "",
        }),
        [searchParams],
    );
    const courseId = resolved?.course.courseId ?? "";
    const planUrlId: PlanUrlId = (resolved?.plan ?? "year") as PlanUrlId;

    /* ---------- Auth ---------- */

    const authState = useAuth();
    const { login } = useStudentAuth();
    const { sendOtp: sendPhoneOtp, verifyOtp: verifyPhoneOtp } =
        usePhoneVerification("recaptcha-container");
    const { sendLink } = useEmailLink();

    /* ---------- State ---------- */

    const [plan, setPlan] = useState<PlanType>(() => resolved?.plan ?? "year");
    const [channel, setChannel] = useState<OTPChannel>(DEFAULT_OTP_CHANNEL);
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [verifiedBy, setVerifiedBy] = useState<VerifiedBy>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<CheckoutErrors>(EMPTY_ERRORS);
    const [modal, setModal] = useState<CheckoutModal>(null);
    const [sending, setSending] = useState<boolean>(false);
    const [emailLinkSent, setEmailLinkSent] = useState<boolean>(false);

    // One idempotency key per checkout attempt. Regenerated when the user
    // retries after Razorpay dismisses the modal or a terminal error.
    const idempotencyKeyRef = useRef<string>(crypto.randomUUID());



    /* ---------- Backend quote (authoritative price) ---------- */



    const alreadyEnrolled = false;
    const subtotal = resolved?.planData.price ?? 0;
    const totals = useMemo(() => computeTotals(subtotal, 0), [subtotal]);

    /* ---------- Product (catalogue — display only) ---------- */

    const product = resolved?.course ?? null;
    const planData = resolved?.planData;

    /* ---------- Hydrate verifiedBy after the email-link round-trip ---------- */

    useEffect(() => {
        if (verifiedBy !== null) return;
        const p = authState.principal;
        (() => {
            if (!p) return;
            if (p.phoneVerified) {
                setVerifiedBy("phone");
                if (p.phone) setPhone(p.phone.replace(/^\+91/, ""));
            } else if (p.emailVerified) {
                setVerifiedBy("email");
                if (p.email) setEmail(p.email);
                setEmailLinkSent(true);
            }
        })()
    }, [authState.principal, verifiedBy]);

    /* ---------- Inline-field handlers ---------- */

    const handlePhoneChange = useCallback((value: string) => {
        setPhone(value);
        setVerifiedBy((cur) => (cur === "phone" ? null : cur));
        setErrors((e) => (e.phone ? { ...e, phone: "" } : e));
    }, []);

    const handleEmailChange = useCallback((value: string) => {
        setEmail(value);
        setEmailLinkSent(false);
        setVerifiedBy((cur) => (cur === "email" ? null : cur));
        setErrors((e) => (e.email ? { ...e, email: "" } : e));
    }, []);

    const clearVerifyError = useCallback(() => {
        setErrors((e) => (e.phone || e.email ? { ...e, phone: "", email: "" } : e));
    }, []);

    /* ---------- Plan change ---------- */

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
            // New plan → new Razorpay order needed on next attempt.
            idempotencyKeyRef.current = crypto.randomUUID();
        },
        [setSearchParams],
    );

    /* ---------- Verification ---------- */

    const handleSendOtp = useCallback(
        async (activeChannel: VerifyChannel) => {
            if (sending || verifiedBy !== null) return;

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
                    setModal({ kind: "otp", channel: "phone", identity: phone });
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

    const handleOtpSuccess = useCallback(async () => {
        setModal(null);
        try {
            const user = getFirebaseAuthClient().currentUser;
            if (!user) throw new Error("No Firebase user after phone verification");
            await user.getIdToken(true);
            await login();
            setVerifiedBy("phone");
        } catch {
            setErrors((e) => ({
                ...e,
                phone: "Could not register your account. Please try again.",
            }));
        }
    }, [login]);

    /* ---------- Razorpay mutations ---------- */

    const [createOrder] = useCreateOrderMutation();
    const [verifyPayment] = useVerifyPaymentMutation();

    /* ---------- Pay ---------- */

    const handlePay = useCallback(async () => {
        if (
            submitting ||
            verifiedBy === null ||
            !product ||
            !planData ||
            alreadyEnrolled
        ) {
            return;
        }

        setSubmitting(true);
        setErrors(EMPTY_ERRORS);

        let order: CreateOrderResult["data"];
        try {
            const result = await createOrder({
                courseId,
                plan: planUrlId,
                idempotencyKey: idempotencyKeyRef.current,
            }).unwrap();
            if (!result.success) throw new Error("No order returned from backend");
            order = result.data;
        } catch (err) {
            setSubmitting(false);
            const code = (err as { data?: { error?: { code?: string } } })?.data
                ?.error?.code;
            if (code === "ALREADY_ENROLLED") {
                return;
            }
            setModal({
                kind: "pay-error",
                message:
                    code === "GATEWAY_ERROR"
                        ? "The payment gateway is temporarily unavailable. Please try again."
                        : "We couldn't create your order. Please try again.",
            });
            return;
        }

        const rzp = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            order_id: order.razorpayOrderId,
            amount: order.amount,
            currency: order.currency,
            name: order.name,
            description: order.description,
            prefill: order.prefill,
            theme: { color: "#4f46e5" }, // indigo-600
            handler: async (response) => {

                try {
                    const verified = await verifyPayment({
                        orderId: order.orderId,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }).unwrap();

                    // Confirmation page reads this from router state — no polling.
                    navigate(`/order/success?orderId=${order.orderId}`, {
                        replace: true,
                        state: { verified },
                    });
                } catch (err) {
                    setSubmitting(false);
                    const code = (err as { data?: { error?: { code?: string } } })?.data
                        ?.error?.code;
                    const message =
                        code === "SIGNATURE_INVALID"
                            ? "Payment could not be verified. If money was debited, contact support."
                            : code === "PAYMENT_NOT_CAPTURED"
                                ? "Payment was not captured by Razorpay. Please try again."
                                : code === "AMOUNT_MISMATCH"
                                    ? "Payment amount mismatch. Please try again."
                                    : code === "ORDER_ALREADY_PAID"
                                        ? "This order was already paid. Check your order history."
                                        : "We couldn't confirm your payment. If money was debited, contact support.";
                    setModal({ kind: "pay-error", message });
                }
            },
            modal: {
                ondismiss: () => {
                    // Modal closed without a result. Order stays PENDING.
                    // New idempotency key on retry — Razorpay expires old orders.
                    setSubmitting(false);
                    idempotencyKeyRef.current = crypto.randomUUID();
                },
            },
        });

        // In-modal failure — surface through PayErrorModal.
        rzp.on("payment.failed", (failure) => {
            setSubmitting(false);
            setModal({
                kind: "pay-error",
                message:
                    failure.error.description ||
                    "Payment failed. Please try again.",
            });
            idempotencyKeyRef.current = crypto.randomUUID();
        });

        rzp.open();
    }, [
        submitting,
        verifiedBy,
        product,
        planData,
        alreadyEnrolled,
        courseId,
        planUrlId,
        createOrder,
        verifyPayment,
        navigate,
    ]);

    /* ---------- Redirect if the URL is invalid ---------- */

    if (!resolved || !product) {
        return <Navigate to="/" replace />;
    }

    /* ---------- Render ---------- */

    return (
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-white pb-[150px] lg:pb-0">
            {/* LEFT COLUMN */}
            <section className="max-lg:contents lg:block lg:bg-white lg:pb-10">
                {/* <CheckoutHeader /> */}

                <OrderDetailsSection
                    product={product}
                    selectedPlan={plan}
                    onSelectPlan={handleSelectPlan}
                />


            </section>

            {/* RIGHT COLUMN */}
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



                {alreadyEnrolled && (
                    <div className="mt-[16px] px-[15px] lg:px-0 lg:max-w-[400px] lg:ml-[57px]">
                        <p className="text-[14px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                            You already own this course.{" "}
                            <a
                                href={`/course/}`}
                                className="font-medium text-emerald-800 underline"
                            >
                                Go to course
                            </a>
                        </p>
                    </div>
                )}

                <ReceiptSection subtotal={totals.subtotal} total={totals.total} />

                <PayBar
                    total={totals.total}
                    disabled={
                        verifiedBy === null || alreadyEnrolled
                    }
                    submitting={submitting}
                    onPay={handlePay}
                />
            </section>

            {/* MODALS */}
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