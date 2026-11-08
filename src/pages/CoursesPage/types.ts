// ============================================================
// src/pages/CoursesPage/types.ts
// Types specific to the All Courses page.
// Course / PlanType come from the shared types, not redefined.
// ============================================================

import type { Course } from "../../types/course";

/* ---------- Sorting ---------- */

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "discount-desc";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

/* ---------- Price ---------- */

export interface PriceRange {
  /** Inclusive lower bound in rupees. */
  min: number;
  /** Inclusive upper bound in rupees. */
  max: number;
}

/* ---------- Filter state ---------- */

/**
 * Everything the user can change on the page. Search, category,
 * mode, price, and sort all live in one object so they always
 * combine, rather than acting independently.
 */
export interface CourseFilterState {
  query: string;
  /** Empty array means "All Categories". */
  categories: string[];
  /** Empty array means "any learning mode". */
  modes: string[];
  price: PriceRange;
  sort: SortOption;
}

/* ---------- Derived catalogue entry ---------- */

/**
 * A course plus values computed once from it. Computing these up
 * front keeps filtering and sorting cheap on every keystroke.
 */
export interface CatalogEntry {
  course: Course;
  /** Position in the original catalogue. Passed to CourseCard as `index`. */
  catalogIndex: number;
  /** Lowest price across the course's plans (0 = free). */
  startingPrice: number;
  /** Largest discount percentage across plans (0 if none). */
  maxDiscount: number;
  /** Lower-cased, pre-joined text used by the search box. */
  searchText: string;
}

/* ---------- Facet options (category / mode) ---------- */

export interface FacetOption {
  value: string;
  /** Number of catalogue courses with this value. */
  count: number;
}

/* ---------- Active filter chips ---------- */

export type ActiveFilterKind = "query" | "category" | "mode" | "price";

export interface ActiveFilter {
  /** Stable key for React lists, e.g. "category:Finance". */
  id: string;
  kind: ActiveFilterKind;
  label: string;
  /** Present for category / mode chips so the right value is removed. */
  value?: string;
}