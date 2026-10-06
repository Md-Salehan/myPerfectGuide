// ============================================================
// src/data/courses.ts
// Single source of truth for every course / product.
//
// Keyed by `courseId`. The checkout page receives ONLY the
// courseId + selected plan (e.g. /order?courseId=...&plan=year),
// looks the course up here, resolves the plan, and renders from
// the returned object. The product-detail sidebar reads from the
// same object, so a price or feature is edited in exactly one
// place.
//
// Every value below was carried over from the existing code:
//   - checkout fields  <- MOCK_PRODUCTS (checkoutMocks.ts)
//   - sidebar fields   <- the <SidebarEnrollCard /> props in
//                         CourseTaxationCompliancePage.tsx and
//                         CourseDigitalMarketingPage (index.tsx)
// Nothing was invented. Fields that the source did not have for
// a course are simply absent (all of them are optional).
//
// Consumed by:
//   - pages/checkout/utils.ts            (resolveCourseFromParams)
//   - pages/checkout/types.ts            (Product / ProductPlan aliases)
//   - pages/checkout/CheckoutPage.tsx
//   - components/product/SidebarEnrollCard.tsx
//   - pages/product-details/**           (courseId + plan source)
// ============================================================

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

/**
 * The two plan slots a course can offer.
 * NOTE: the ids are kept as "year" | "life" because the checkout
 * toggle, DEFAULT_PLAN and OrderPayload all depend on them. For
 * Digital Marketing, "year" = Standard and "life" = Premium
 * (same mapping the existing mock used).
 */
export type PlanType = "year" | "life";

/** Image or video source for the sidebar promo banner. */
export type PromoThumbnail =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

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

export interface Course {
  /** Unique id. Same string as the key in `courses`. */
  courseId: string;
  /** Display title shown in Order Details. */
  title: string;
  /** Root-relative image URL for the checkout thumbnail. */
  image: string;
  /** Optional category. */
  type?: string;
  /** Rating out of 5, e.g. 4.9. */
  rating?: number;
  /** Human-readable rating count, e.g. "2,800+ ratings". */
  ratingCount?: string;
  /** Pipe-joined under the title in checkout. */
  shortFeatures?: string[];
  /** Shown under "View more details" in checkout. */
  moreFeatures?: string[];
  /** Plans offered. At least one is required for checkout. */
  plans: Partial<Record<PlanType, CoursePlan>>;

  /* ---- Sidebar-only (product detail page) ---- */

  /** Promo banner media in the sidebar card. */
  promoThumbnail?: PromoThumbnail;
  /** Small note rendered under the sidebar feature list. */
  footNote?: string;
}

/* ------------------------------------------------------------
   Course catalogue
   ------------------------------------------------------------ */

const courses: Record<string, Course> = {
  /* --- Taxation & Compliance course ------------------------------ */
  "taxation-compliance-2026": {
    courseId: "taxation-compliance-2026",
    title: "Complete Taxation & Compliance Course 2026",
    image: "/img/taxation-promo.jpg",
    type: "finance",
    rating: 4.9,
    ratingCount: "2,800+ ratings",
    shortFeatures: [
      "Complete GST & ITR Training",
      "Portfolio Website Building",
      "Digital Marketing & Client Acquisition",
      "10+ Real-World Projects",
    ],
    moreFeatures: [
      "Live + Recorded Sessions",
      "1 Year Access",
      "1:1 Doubt Support",
      "Certificate of Completion",
    ],
    plans: {
      year: {
        label: "1 Year — ₹1,599",
        price: 1599,
        original: 15990,
        off: "Flat 90% Off",
        offPercent: 90,
        priceNote: "1 Year Validity",
        features: [
          "Complete GST & ITR Training",
          "Portfolio Website Building",
          "Digital Marketing & Client Acquisition",
          "10+ Real-World Projects",
          "Live + Recorded Sessions",
          "1 Year Access",
        ],
      },
      life: {
        label: "Lifetime — ₹2,999",
        price: 2999,
        original: 19990,
        off: "Flat 85% Off",
        offPercent: 85,
        priceNote: "Lifetime Access",
        features: [
          "Everything in 1 Year",
          "Lifetime access to recordings",
          "All future updates",
          "Priority doubt support",
          "Certificate of completion",
        ],
      },
    },
    promoThumbnail: {
      type: "image",
      src: "/img/taxation-promo.jpg",
      alt: "Taxation & Compliance Course",
    },
  },

  /* --- Digital Marketing course ---------------------------------- */
  // "year" slot = Standard, "life" slot = Premium.
  "digital-marketing-2026": {
    courseId: "digital-marketing-2026",
    title: "Digital Marketing & Client Acquisition System 2026",
    image: "/img/ads-promo.jpg",
    type: "marketing",
    rating: 4.8,
    ratingCount: "1,200+ ratings",
    shortFeatures: [
      "Facebook & Instagram Ads",
      "Google Ads & SEO",
      "LinkedIn & WhatsApp outreach",
      "Client acquisition playbook",
    ],
    moreFeatures: [
      "Portfolio website building",
      "Service packaging & pricing",
      "Referral system design",
      "2 real internships & placement",
    ],
    plans: {
      year: {
        label: "Standard — ₹4,999",
        price: 4999,
        original: 10000,
        off: "Flat 50% Off",
        offPercent: 50,
        ctaLabel: "Enroll in Standard — ₹4,999",
        features: [
          "15-module curriculum",
          "Live interactive classes",
          "Lifetime access to recordings",
          "Capstone project",
          "Certificate of completion",
        ],
      },
      life: {
        label: "Premium — ₹14,999",
        price: 14999,
        original: 60000,
        off: "Flat 75% Off",
        offPercent: 75,
        ctaLabel: "Enroll in Premium — ₹14,999",
        note: "Your ₹10,000 Placement & Internship fee is 100% refundable if we don't deliver your internships and placement.",
        features: [
          "Everything in Standard",
          "2 real internships & placement",
          "₹6 LPA+ placement promise",
        ],
      },
    },
    promoThumbnail: {
      type: "video",
      src: "/video/ads-promo.mp4",
      poster: "/img/ads-promo.jpg",
    },
    footNote: "Premium seats are limited per batch.",
  },

  /* --- Web Development course ------------------------------------ */
  // Checkout data only: the source had no sidebar data (features,
  // promo, notes) for this course, so none is added here.
  "web-development-2026": {
    courseId: "web-development-2026",
    title: "Full Stack Web Development Bootcamp 2026",
    image: "/img/webdev-promo.jpg",
    type: "technology",
    rating: 4.9,
    ratingCount: "3,500+ ratings",
    shortFeatures: [
      "HTML, CSS, JavaScript",
      "React + TypeScript",
      "Node.js, Express & MongoDB",
      "Full-stack capstone project",
    ],
    moreFeatures: [
      "Deployment on Vercel & Railway",
      "System design fundamentals",
      "Portfolio & interview prep",
    ],
    plans: {
      year: {
        label: "1 Year — ₹4,999",
        price: 4999,
        original: 24999,
        off: "Flat 80% Off",
        offPercent: 80,
      },
      life: {
        label: "Lifetime — ₹7,999",
        price: 7999,
        original: 34999,
        off: "Flat 77% Off",
        offPercent: 77,
      },
    },
  },
};

/* ------------------------------------------------------------
   Lookup
   ------------------------------------------------------------ */

/**
 * Safe lookup by courseId.
 *
 * Uses an own-property check so inherited keys such as
 * "constructor" or "__proto__" (easy to type into a URL) never
 * resolve to a bogus "course".
 */
export function getCourse(
  courseId: string | null | undefined,
): Course | undefined {
  if (!courseId) return undefined;
  return Object.prototype.hasOwnProperty.call(courses, courseId)
    ? courses[courseId]
    : undefined;
}

export default courses;