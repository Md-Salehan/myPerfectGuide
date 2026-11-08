// ============================================================
// src/types/course.ts
// Type definitions for the extended Course shape used by the
// home page and the checkout flow.
//
// Why these live here, not in courses.ts:
//   - courses.ts holds the DATA (the actual course catalogue).
//   - this file holds the TYPES.
//   - Keeping them separate lets the home page components
//     import types without pulling in the full data file
//     (useful for tree-shaking, and for reasoning about the
//     contract in one place).
//
// courses.ts imports from here and re-exports the same
// names so existing consumers keep working unchanged.
// ============================================================

/* ------------------------------------------------------------
   Primitives
   ------------------------------------------------------------ */

/**
 * The two plan slots a course can offer.
 *
 * "year" and "life" are historical names from the checkout
 * flow (see checkout/constants.ts → DEFAULT_PLAN). For a
 * course where the two plans are Standard + Premium, the
 * mapping is: "year" → Standard, "life" → Premium.
 */
export type PlanType = "year" | "life";

/**
 * Image or video source for the sidebar promo banner.
 * Re-exported for parity with the existing courses.ts.
 */
export type PromoThumbnail = {
  imageUrl: string;
  videoUrl: string;
}

/* ------------------------------------------------------------
   Plans
   ------------------------------------------------------------ */

/**
 * A single plan offered by a course.
 *
 * Fields split into two groups:
 *   - Checkout fields (price, original, off) — read by the
 *     checkout page and the OrderPayload builder.
 *   - Sidebar fields (features, note, ctaLabel) — read by the
 *     SidebarEnrollCard on the product-detail pages.
 *
 * A course plan may populate either group, both, or neither;
 * absent fields simply don't render.
 */
export interface CoursePlan {
  /** Toggle button label, e.g. "1 Year — ₹1,599". */
  label: string;
  /** Final price in rupees (integer). */
  price: number;
  /** Struck-through original price in rupees (integer). */
  original: number;
  /** Discount pill text used by checkout, e.g. "Flat 90% Off". */
  off: string;
  /** Discount percentage used by the sidebar pill, e.g. 90. */
  offPercent: number;

  /* ---- Sidebar-only (product detail page) ---- */

  /** Checklist rows shown in the sidebar for this plan. */
  features?: readonly string[];
  /** Small line under the sidebar price, e.g. "1 Year Validity". */
  priceNote?: string;
  /** Note shown under the sidebar plan toggle (e.g. refund promise). */
  note?: string;
  /** Overrides the sidebar CTA label for this plan. */
  ctaLabel?: string;
}



/* ------------------------------------------------------------
   Top-level Course
   ------------------------------------------------------------ */

/**
 * A course/product.
 *
 * `plans` is `Partial<Record<PlanType, CoursePlan>>` because a
 * course may offer only one plan (e.g. a single-tier product)
 * or both. At least one plan is expected for the checkout
 * flow to work; the home page can render courses without
 * plans (the enroll section's price block just hides).
 */
export interface Course {
  /** Unique id. Same string as the key in the courses map. */
  courseId: string;
  url: string;
  /** Display title shown in Order Details and on the card. */
  title: string;
  shortTitle: string;
  summary: string;
  /** Root-relative image URL for the checkout thumbnail. */
  /** Optional category. */
  // type?: string;
  category?: string;
  /** Rating out of 5, e.g. 4.9. */
  rating?: number;
  /** Human-readable rating count, e.g. "2,800+ ratings". */
  ratingCount?: string;
  duration: string;
  modules: number;
  lectures: number;
  mode: string;
  highlights: string[];
  /** Pipe-joined under the title in checkout. */
  shortFeatures?: string[];
  /** Shown under "View more details" in checkout. */
  moreFeatures?: string[];
  /** Plans offered. At least one required for checkout. */
  plans: Partial<Record<PlanType, CoursePlan>>;

  /* ---- Sidebar-only (product detail page) ---- */

  /** Promo banner media in the sidebar card. */
  promoThumbnail?: PromoThumbnail;
  /** Small note rendered under the sidebar feature list. */
  footNote?: string;
  batchStartDate?: string | Date | null;
  enrollmentOpen?: boolean;

  /* ---- Home-page-only ---- */


}