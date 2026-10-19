// ============================================================
// src/pages/checkout/CheckoutPage.tsx
// Checkout page orchestrator.
//
// Responsibilities:
//   - Read courseId + plan from the URL, resolve them against
//     the central catalogue (src/data/courses.ts) and redirect
//     to "/" if invalid
//   - Own all page state (plan, phone, email, coupon, gst, modals)
//   - Run all API flows (verify, coupon, gst, order)
//   - Dispatch checkout:submit / checkout:redirect events
//   - Render the two-column layout with the mobile reflow
//
// Data-flow:
//   URL: ?courseId=<id>&plan=<id>
//     -> resolveCourseFromParams(searchParams)
//     -> courses[courseId] + course.plans[plan]
//     -> every section reads from this resolved pair
//     -> buildOrderPayload({ courseId, ... })
//
// OTP architecture:
//   - One <OtpModal />, one OtpInput, one cooldown ticker.
//   - The modal is channel-agnostic: it receives `sendOtp`
//     and `verifyOtp` adapters built here, which translate
//     { channel, identity, otp } into the correct mutation
//     trigger.
//   - The adapters RETURN the RTK Query request handle
//     unchanged. They do NOT await it. The modal retains the
//     handle and calls `.abort()` on close; RTK Query's
//     internal AbortController reaches fetchBaseQuery → fetch.
//
// Cancellation model:
//   - Only the OTP send + verify requests are abortable. The
//     modal is the only place that retains a handle for them.
//   - createOrder is NOT aborted on unmount — it is a
//     consequential mutation (see checkoutApi.ts).
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
    useSendEmailOtpMutation,
    useSendPhoneOtpMutation,
    useValidateGstMutation,
    useVerifyEmailOtpMutation,
    useVerifyPhoneOtpMutation,
} from "../../services/checkoutApi";

import type {
    CheckoutErrors,
    CheckoutModal,
    GstDetails,
    PlanType,
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

    // A stable courseId for the payload below, even when `resolved`
    // is null (the redirect branch runs first in that case). Reading
    // it defensively keeps the hook order identical on every render.
    const courseId = resolved?.course.courseId ?? "";

    /* ---------- State ---------- */

    // The URL plan is authoritative on first render. `resolved`
    // guarantees the plan exists on the course, so no fallback is
    // needed here — the only reason to reach `DEFAULT_PLAN` would
    // be a missing `plan` param, which `resolveCourseFromParams`
    // already normalises.
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

    /* ---------- Mutations ---------- */

    // OTP — used via adapters below; each trigger returns a request
    // handle the modal retains and can `.abort()`.
    const [sendPhoneOtp] = useSendPhoneOtpMutation();
    const [verifyPhoneOtp] = useVerifyPhoneOtpMutation();
    const [sendEmailOtp] = useSendEmailOtpMutation();
    const [verifyEmailOtp] = useVerifyEmailOtpMutation();

    // Coupon / GST / order — no cancellation affordance; used
    // directly with `.unwrap()` at the call sites.
    const [validateGst] = useValidateGstMutation();
    const [createOrder] = useCreateOrderMutation();

    /* ---------- Effective product (from central data) ---------- */

    const product = resolved?.course ?? null;

    /* ---------- Derived: plan, totals ---------- */

    const planData = resolved?.planData;
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

    const handleSelectPlan = useCallback(
        (next: PlanType) => {
            setPlan(next);
            // Keep the URL in sync so a reload lands on the same plan.
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
       Channel-bound adapters handed to <OtpModal />
       ------------------------------------------------------------
       These translate the modal's channel-agnostic call shape
       ({ channel, identity, otp }) into the correct RTK Query
       mutation trigger.

       IMPORTANT: the adapters RETURN the request handle from the
       trigger. They do NOT await it. The modal retains the handle
       so it can call `.abort()` on close; RTK Query's internal
       AbortController then cancels the in-flight fetch.

       If the adapter awaited `.unwrap()` here, the handle would
       be gone by the time the modal tried to cancel it — the
       exact anti-pattern the RTK Query guide §4.3 warns against.
       ------------------------------------------------------------ */

    const sendOtpAdapter = useCallback(
        ({
            channel: c,
            identity,
        }: {
            channel: VerifyChannel;
            identity: string;
        }) => {
            if (c === "phone") {
                return sendPhoneOtp({ phone: identity });
            }
            return sendEmailOtp({ email: identity });
        },
        [sendPhoneOtp, sendEmailOtp],
    );

    const verifyOtpAdapter = useCallback(
        ({
            channel: c,
            identity,
            otp,
        }: {
            channel: VerifyChannel;
            identity: string;
            otp: string;
        }) => {
            if (c === "phone") {
                return verifyPhoneOtp({ phone: identity, otp });
            }
            return verifyEmailOtp({ email: identity, otp });
        },
        [verifyPhoneOtp, verifyEmailOtp],
    );

    /* ------------------------------------------------------------
       Send OTP (from VerifySection)
       ------------------------------------------------------------
       The initial send is not cancellable from the UI — the modal
       opens only after it resolves — so this call site awaits the
       handle. If we later add a cancel affordance for the initial
       send, the change is to retain the handle instead of
       awaiting it inline.
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
                    const result = await sendOtpAdapter({
                        channel: "phone",
                        identity: phone,
                    }).unwrap();
                    setModal({
                        kind: "otp",
                        channel: "phone",
                        identity: phone,
                        devCode: result.devCode,
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
                const result = await sendOtpAdapter({
                    channel: "email",
                    identity: trimmed,
                }).unwrap();
                setModal({
                    kind: "otp",
                    channel: "email",
                    identity: trimmed,
                    devCode: result.devCode,
                });
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
            sendOtpAdapter,
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
        if (
            submitting ||
            verifiedBy === null ||
            !product ||
            !planData
        ) {
            return;
        }

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
                />

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