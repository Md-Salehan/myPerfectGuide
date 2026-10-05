// ============================================================
// src/routes/paths.ts
// Central route path constants.
// ============================================================

export const ROUTES = {
  /** About Us page — migrated from about_us.html. */
  ABOUT: "/about",
  CONTACT: "/contact",
  CHECKOUT: "/checkout",
  COURSE_1: "/courses/complete-taxation-compliance",
  COURSE_2: "/courses/digital-marketing",
  COURSE_3: "/courses/itr-filing",
  COURSE_4: "/courses/accounting-bookkeeping",
  COURSE_5: "/courses/tax-planning",
} as const;

/**
 * Convenience union of every route value. Useful when a
 * component needs to accept "any valid route" as a prop.
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];