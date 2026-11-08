// ============================================================
// src/pages/CoursesPage/data/constants.ts
// Page-level configuration: sort options, defaults, timings.
// Course information itself always comes from src/data/courses.ts.
// ============================================================

import type { CourseFilterState, PriceRange, SortOptionConfig } from "../types";

/* ---------- Sorting ---------- */

/**
 * "Newest First" is intentionally absent: the Course type has no
 * created/published date. "Highest Rated" and "Biggest Discount"
 * use fields that already exist (rating, plans[].offPercent).
 */
export const SORT_OPTIONS: readonly SortOptionConfig[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "discount-desc", label: "Biggest Discount" },
] as const;

/* ---------- Search / UI behaviour ---------- */

/** Delay before the typed query is applied to the listing. */
export const SEARCH_DEBOUNCE_MS = 200;

/** Step (in rupees) for the price sliders. */
export const PRICE_STEP = 100;

/** Number of placeholder cards shown while loading. */
export const SKELETON_COUNT = 6;

/** Brief artificial delay so the skeleton is visible on first paint. */
export const INITIAL_LOAD_MS = 350;

/* ---------- Copy ---------- */

export const SEARCH_PLACEHOLDER =
  "Search by course, category or topic (e.g. GST, Ads, React)";

export const ALL_CATEGORIES_LABEL = "All Categories";

/* ---------- Defaults ---------- */

/**
 * Builds the "nothing applied" filter state. The price range
 * spans the full catalogue bounds, which means "no price filter".
 */
export function createDefaultFilters(priceBounds: PriceRange): CourseFilterState {
  return {
    query: "",
    categories: [],
    modes: [],
    price: { min: priceBounds.min, max: priceBounds.max },
    sort: "relevance",
  };
}