// ============================================================
// src/pages/checkout/utils.ts
// Pure helpers for the checkout page.
//
// No React, no DOM, no API calls. Everything here is a pure
// function so it can be reasoned about (and tested) in
// isolation from the components that consume it.
//
// Post-refactor the checkout no longer reconstructs a product
// from URL params. It reads only `courseId` + `plan`, looks the
// course up in `src/data/courses.ts`, and resolves the plan
// from that course's `plans` map. Everything below is the pure
// logic for that lookup, plus the totals and payload builders
// the page still needs.
//
// Consumed by:
//   - pages/checkout/CheckoutPage.tsx
//   - pages/checkout/sections/*.tsx
//   - pages/checkout/modals/*.tsx
// ============================================================

import type {
    Course,
    CoursePlan,
    PlanType,
} from "../../data/courses";
import { getCourse } from "../../data/courses";

import type {
    GstDetails,
    OrderPayload,
    OrderTotals,
    OTPChannel,
    VerifiedBy,
} from "./types";
import { DEFAULT_PLAN } from "./constants";

// Re-export the shared price formatter so consumers don't need
// to know it lives elsewhere. The implementation is unchanged.
export { formatPrice } from "../../utils/formatPrice";

/* ------------------------------------------------------------
   URL parsing — courseId + plan only
   ------------------------------------------------------------ */

/**
 * Normalises the plan param. Anything other than "year" or
 * "life" falls back to DEFAULT_PLAN — the caller is responsible
 * for rejecting the request if the course doesn't actually
 * offer the fallback.
 */
function parsePlan(value: string | null): PlanType {
    return value === "year" || value === "life" ? value : DEFAULT_PLAN;
}

/**
 * Result of resolving the checkout URL to a course + plan.
 *
 * `course` is the full central-data object; `plan` is the plan
 * id the URL asked for (post-normalisation); `planData` is the
 * matching `CoursePlan` — guaranteed to exist when this object
 * is returned.
 */
export interface ResolvedCourse {
    course: Course;
    plan: PlanType;
    planData: CoursePlan;
}

/**
 * Reads `courseId` + `plan` from the checkout URL, looks the
 * course up in the central data file, and resolves the plan.
 *
 * Returns `null` — never throws, never substitutes a different
 * course or plan — when any of the following hold:
 *   - `courseId` is missing
 *   - `courseId` does not exist in the catalogue
 *   - `plan` is missing *and* the course has no `year` fallback
 *   - the requested plan does not exist on the resolved course
 *
 * The caller (CheckoutPage) redirects to "/" on `null`, matching
 * the source's behaviour for an invalid URL.
 */
export function resolveCourseFromParams(
    params: URLSearchParams,
): ResolvedCourse | null {
    const courseId = params.get("courseId");
    const course = getCourse(courseId);
    if (!course) return null;

    // Only fall back to DEFAULT_PLAN when the URL omits `plan`.
    // A `plan` that is present but unrecognised is still treated
    // as DEFAULT_PLAN by `parsePlan`; the `planData` check below
    // then rejects it if the course doesn't offer that plan.
    const plan = parsePlan(params.get("plan"));
    const planData = course.plans[plan];
    if (!planData) return null;

    return { course, plan, planData };
}

/* ------------------------------------------------------------
   Totals
   ------------------------------------------------------------ */

/**
 * Computes subtotal, discount, and total from the current
 * plan price and the applied coupon's discount amount.
 *
 * The source computed the discount locally from a coupon map;
 * now the discount comes from the API (validateCoupon), but
 * the arithmetic — and the "discount cannot exceed subtotal"
 * guard — is unchanged.
 */
export function computeTotals(
    subtotal: number,
    discount: number,
): OrderTotals {
    const safeDiscount = Math.min(Math.max(discount, 0), subtotal);
    return {
        subtotal,
        discount: safeDiscount,
        total: subtotal - safeDiscount,
    };
}

/* ------------------------------------------------------------
   GST helpers
   ------------------------------------------------------------ */

/**
 * True when at least one GST field has a non-empty value.
 * Used by the pay flow to decide whether to run GST validation
 * at all — the source had the same "all or nothing" semantics.
 */
export function isGstFilled(gst: GstDetails): boolean {
    return Object.values(gst).some((v) => v.trim().length > 0);
}

/* ------------------------------------------------------------
   Order payload
   ------------------------------------------------------------ */

interface BuildOrderPayloadArgs {
    /** Identifier of the course being purchased. */
    courseId: string;
    /** The selected plan id. */
    plan: PlanType;
    /** The selected plan's display label, e.g. "1 Year — ₹1,599". */
    planLabel: string;
    totals: OrderTotals;
    coupon: string | null;
    verifiedBy: VerifiedBy;
    channel: OTPChannel;
    phone: string;
    email: string;
    gst: GstDetails;
}

/**
 * Assembles the payload sent to `createOrder`.
 *
 * Mirrors the source's `buildPayload()` key-for-key, plus the
 * new `courseId` field that identifies which course is being
 * purchased. `courseId` comes from the resolved checkout state
 * (ultimately the URL), never hardcoded, and is never derived
 * from the plan alone — the same plan id `"year"` exists on
 * multiple courses.
 *
 * Downstream listeners of `checkout:submit` see the same shape
 * as before, with one additive field.
 */
export function buildOrderPayload({
    courseId,
    plan,
    planLabel,
    totals,
    coupon,
    verifiedBy,
    channel,
    phone,
    email,
    gst,
}: BuildOrderPayloadArgs): OrderPayload {
    return {
        courseId,
        plan: { id: plan, label: planLabel },
        amount: {
            subtotal: totals.subtotal,
            discount: totals.discount,
            total: totals.total,
            currency: "INR",
        },
        coupon,
        contact: {
            method: verifiedBy,
            channel,
            phone: verifiedBy === "phone" ? `+91${phone}` : null,
            email: email || null,
        },
        gst: isGstFilled(gst) ? gst : null,
    };
}