// ============================================================
// src/data/courses.ts
// Single source of truth for every course / product.

// ============================================================

import type {
  Course,
  CoursePlan,
  PlanType,
  PromoThumbnail,
} from "../types/course";

// Re-export for back-compat. Consumers that import these from
// courses.ts continue to work; new consumers should import
// from types/course.ts directly.
export type { Course, CoursePlan, PlanType, PromoThumbnail };

/* ------------------------------------------------------------
   Course catalogue
   ------------------------------------------------------------ */

const courses: Record<string, Course> = {
  /* ============================================================
     Taxation & Compliance
     ============================================================ */
  "taxation-compliance-2026": {
    courseId: "taxation-compliance-2026",
    url: "courses/complete-taxation-compliance",
    title: "Complete Taxation & Compliance Course 2026",
    shortTitle: "Taxation & Compliance",
    category: "Finance",
    rating: 4.9,
    ratingCount: "2,800+ ratings",
    summary:
      "From Fundamentals to Client Acquisition: GST, ITR, Accounting & Digital Marketing.",
    duration: "3 Months",
    modules: 3,
    lectures: 120,
    mode: "Live + Recorded",
    highlights: ["120+ lectures", "Live + Recorded", "Hindi + English"],
    shortFeatures: [
      "All Taxation & Compliance Training",
      "Portfolio Website Building",
      "Digital Marketing & Client Acquisition",
      "10+ Real-World Projects",
      "Certificate of Completion"
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
      imageUrl: `${import.meta.env.BASE_URL}images/course-detail-asset/taxation/thumbnail.png`,
      videoUrl: `${import.meta.env.BASE_URL}video/taxation-compliance-promo.mp4`,
    },
    batchStartDate: "2026-11-15",
    enrollmentOpen: true,
  },

  /* ============================================================
     Digital Marketing
     Homepage content mapped from `marketing` in the source.
     Note: "year" slot = Standard, "life" slot = Premium.
     ============================================================ */
  "digital-marketing-2026": {
    courseId: "digital-marketing-2026",
    url: "courses/digital-marketing-2026",
    title: "Digital Marketing & Client Acquisition System 2026",
    shortTitle: "Digital & Performance Marketing",
    summary:
      "Build your portfolio website and learn ads, LinkedIn and WhatsApp outreach.",
    category: "Marketing",
    rating: 4.8,
    ratingCount: "1,200+ ratings",
    duration: "1 Month",
    modules: 6,
    lectures: 45,
    mode: "Live + Recorded",
    highlights: ["15-module curriculum", "Live + Recorded", "Certificate"],

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
      imageUrl: "/img/marketing-promo.jpg",
      videoUrl: "/video/marketing-promo.mp4",
    },
    footNote: "Premium seats are limited per batch.",
    batchStartDate: "2026-09-15",
    enrollmentOpen: false,
  },

  "web-development-2026": {
    courseId: "web-development-2026",
    url: "courses/web-development-2026",
    title: "Full Stack Web Development Bootcamp 2026",
    shortTitle: "Full-Stack Web Development",
    summary:
      "Build and deploy real projects with React, Node.js and databases.",
    category: "Technology",
    rating: 4.9,
    ratingCount: "3,500+ ratings",
    duration: "4 Months",
    modules: 12,
    lectures: 300,
    mode: "Live + Recorded",
    highlights: ["12 modules", "Live + Recorded", "Portfolio projects"],
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
    promoThumbnail: {
      imageUrl: "/img/web-dev-promo.jpg",
      videoUrl: "/video/web-dev-promo.mp4",
    },
    batchStartDate: "2026-8-01",
    enrollmentOpen: false,
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

/** All courses, in declaration order. Used by the home page catalog. */
export function getAllCourses(): Course[] {
  return Object.values(courses);
}

export default courses;