// ============================================================
// src/routes/paths.ts
// Central route path constants.
// ============================================================

export const ROUTES = {
  /** About Us page — migrated from about_us.html. */
  ABOUT: "/about",
  CONTACT: "/contact",
  /**
   * Product Detail routes, one per course.
   * Course 1 is the page currently being migrated
   * (the Complete Taxation & Compliance Course).
   * Courses 2–5 are reserved slots matching the four other
   * courses listed in the footer COURSES column.
   */
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