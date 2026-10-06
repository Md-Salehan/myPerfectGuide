// ============================================================
// src/pages/checkout/utils.ts
// Pure helpers for the checkout page.
//
// No React, no DOM, no API calls. Everything here is a pure
// function so it can be reasoned about (and tested) in
// isolation from the components that consume it.
//
// Consumed by:
//   - pages/checkout/CheckoutPage.tsx
//   - pages/checkout/sections/*.tsx
//   - pages/checkout/modals/*.tsx
// ============================================================

import type {
    GstDetails,
    OrderPayload,
    OrderTotals,
    OTPChannel,
    PlanType,
    Product,
    ProductPlan,
    VerifiedBy,
} from "./types";
import { DEFAULT_PLAN } from "./constants";

// Re-export the shared price formatter so consumers don't need
// to know it lives elsewhere. The implementation is unchanged.
export { formatPrice } from "../../utils/formatPrice";

/* ------------------------------------------------------------
   URL parsing
   ------------------------------------------------------------ */

/**
 * Splits a pipe-separated string into a trimmed array.
 * Empty segments and empty strings are dropped.
 *
 *   "A | B | C"   -> ["A", "B", "C"]
 *   "A||C"        -> ["A", "C"]
 *   ""            -> []
 *   undefined     -> []
 */
export function parsePipeList(value: string | null): string[] {
    if (!value) return [];
    return value
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
}

/**
 * Parses a URL string into a finite integer.
 * Returns `undefined` when the input is missing, empty,
 * non-numeric, or not finite.
 */
function parseInteger(value: string | null): number | undefined {
    if (value === null || value.trim() === "") return undefined;
    const n = Number(value);
    if (!Number.isFinite(n) || !Number.isInteger(n)) return undefined;
    return n;
}

/**
 * Parses a URL string into a finite float.
 * Returns `undefined` when the input is missing or non-numeric.
 */
function parseFloatSafe(value: string | null): number | undefined {
    if (value === null || value.trim() === "") return undefined;
    const n = Number(value);
    if (!Number.isFinite(n)) return undefined;
    return n;
}

/**
 * Normalises the plan param. Anything other than "year" or
 * "life" falls back to DEFAULT_PLAN.
 */
function parsePlan(value: string | null): PlanType {
    return value === "year" || value === "life" ? value : DEFAULT_PLAN;
}

/**
 * Reads the required `price` and optional `original` and builds
 * a `ProductPlan` for the requested plan.
 *
 * The `off` label and `label` are expected from the URL; when
 * absent they're omitted from the plan object (the UI hides
 * those pieces when the field is missing).
 */
function buildPlanFromParams(
    params: URLSearchParams,
    plan: PlanType,
): ProductPlan | null {
    const price = parseInteger(params.get("price"));
    if (price === undefined) return null;

    const original = parseInteger(params.get("original")) ?? price;
    const off = params.get("off") ?? "";
    const title = params.get("title") ?? "";

    // The label shown inside the toggle button. Falls back to a
    // canonical "{Title} — ₹{price}" if the URL doesn't carry an
    // explicit label. The plan id itself is not rendered.
    const label =
        params.get("planLabel") ??
        `${plan === "year" ? "1 Year" : "Lifetime"} — ₹${price.toLocaleString("en-IN")}`;

    // Unused `title` for now — kept here in case a future plan
    // label wants to include the product title.
    void title;

    return { label, price, original, off };
}

/**
 * Reads the checkout product from the URL's search params.
 *
 * Required params (missing → returns null → caller redirects):
 *   - id
 *   - title
 *   - image
 *   - price
 *
 * Optional params:
 *   - plan        (default: "year")
 *   - original
 *   - off
 *   - rating
 *   - ratingCount
 *   - short       (pipe-separated)
 *   - more        (pipe-separated)
 *   - type
 *   - planLabel
 */
export function parseProductFromParams(
    params: URLSearchParams,
): Product | null {
    const id = params.get("id");
    const title = params.get("title");
    const image = params.get("image");
    const plan = parsePlan(params.get("plan"));

    if (!id || !title || !image) return null;

    const planData = buildPlanFromParams(params, plan);
    if (!planData) return null;

    // The other plan slot is populated only when the URL supplies
    // a `priceLife` param. This lets a two-tier product still be
    // described through the URL without inventing a second query
    // string shape.
    const priceLife = parseInteger(params.get("priceLife"));
    const planLife: ProductPlan | undefined =
        priceLife !== undefined
            ? {
                label: `Lifetime — ₹${priceLife.toLocaleString("en-IN")}`,
                price: priceLife,
                original: parseInteger(params.get("originalLife")) ?? priceLife,
                off: params.get("offLife") ?? "",
            }
            : undefined;

    const plans: Product["plans"] = {
        [plan]: planData,
        ...(planLife ? { life: planLife } : {}),
    };

    return {
        id,
        title,
        image,
        plans,
        rating: parseFloatSafe(params.get("rating")),
        ratingCount: params.get("ratingCount") ?? undefined,
        shortFeatures: parsePipeList(params.get("short")),
        moreFeatures: parsePipeList(params.get("more")),
        type: params.get("type") ?? undefined,
    };
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
    plan: PlanType;
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
 * Assembles the payload sent to `createOrder`. Mirrors the
 * source's `buildPayload()` key-for-key, so any downstream
 * listener of the `checkout:submit` event keeps working.
 */
export function buildOrderPayload({
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