// ============================================================
// src/pages/CoursesPage/utils/courseFilters.ts
// Pure helpers: build the searchable catalogue, compute facets
// and price bounds, then search + filter + sort in one pass.
// ============================================================

import type { Course } from "../../../types/course";
import { PRICE_STEP } from "../data/constants";
import type {
  ActiveFilter,
  CatalogEntry,
  CourseFilterState,
  FacetOption,
  PriceRange,
} from "../types";

/* ------------------------------------------------------------
   Derived values from a Course
   ------------------------------------------------------------ */

/**
 * Lowest price across the plans the course offers.
 * Checkout requires at least one plan, so the 0 fallback only
 * applies to malformed data; it never overrides a real price.
 */
function getStartingPrice(course: Course): number {
  const prices = Object.values(course.plans)
    .filter((plan): plan is NonNullable<typeof plan> => Boolean(plan))
    .map((plan) => plan.price);
  return prices.length > 0 ? Math.min(...prices) : 0;
}

/** Largest discount percentage across plans (0 when none). */
function getMaxDiscount(course: Course): number {
  const discounts = Object.values(course.plans)
    .filter((plan): plan is NonNullable<typeof plan> => Boolean(plan))
    .map((plan) => plan.offPercent);
  return discounts.length > 0 ? Math.max(...discounts) : 0;
}

/**
 * One lower-cased string per course, built from the text fields
 * that actually exist on the Course type. No instructor/tags
 * field exists, so none is searched.
 */
function buildSearchText(course: Course): string {
  return [
    course.title,
    course.shortTitle,
    course.category,
    course.summary,
    course.mode,
    ...(course.highlights ?? []),
    ...(course.shortFeatures ?? []),
    ...(course.moreFeatures ?? []),
  ]
    .filter((part): part is string => Boolean(part))
    .join(" ")
    .toLowerCase();
}

/* ------------------------------------------------------------
   Catalogue + facets + bounds
   ------------------------------------------------------------ */

/** Wraps each course with precomputed values. Call once (memoised). */
export function buildCatalog(courses: readonly Course[]): CatalogEntry[] {
  return courses.map((course, catalogIndex) => ({
    course,
    catalogIndex,
    startingPrice: getStartingPrice(course),
    maxDiscount: getMaxDiscount(course),
    searchText: buildSearchText(course),
  }));
}

/**
 * Min/max starting price across the catalogue, rounded outward to
 * PRICE_STEP so a range slider can actually land on both ends
 * (a slider only reaches `max` if it is a multiple of the step
 * from `min`).
 */
export function getPriceBounds(catalog: readonly CatalogEntry[]): PriceRange {
  if (catalog.length === 0) return { min: 0, max: 0 };
  const prices = catalog.map((entry) => entry.startingPrice);
  return {
    min: Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
    max: Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
  };
}

/**
 * Distinct values of a string field with their course counts,
 * most common first, then alphabetical. Missing values are skipped.
 */
export function getFacetOptions(
  catalog: readonly CatalogEntry[],
  select: (course: Course) => string | undefined,
): FacetOption[] {
  const counts = new Map<string, number>();
  for (const { course } of catalog) {
    const value = select(course)?.trim();
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Array.from(counts, ([value, count]) => ({ value, count })).sort(
    (a, b) => b.count - a.count || a.value.localeCompare(b.value),
  );
}

/* ------------------------------------------------------------
   Search
   ------------------------------------------------------------ */

/** Splits the query into lower-case words. Empty query → []. */
export function tokenizeQuery(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Relevance score used only when a search query is present.
 * Title hits outrank category/short-title hits, which outrank
 * hits anywhere else in the searchable text.
 */
function scoreEntry(entry: CatalogEntry, tokens: string[]): number {
  const title = entry.course.title.toLowerCase();
  const shortTitle = entry.course.shortTitle.toLowerCase();
  const category = (entry.course.category ?? "").toLowerCase();

  return tokens.reduce((score, token) => {
    if (title.includes(token)) return score + 3;
    if (shortTitle.includes(token) || category.includes(token)) return score + 2;
    return score + 1;
  }, 0);
}

/* ------------------------------------------------------------
   Filter + sort pipeline
   ------------------------------------------------------------ */

function matchesFilters(
  entry: CatalogEntry,
  filters: CourseFilterState,
  tokens: string[],
): boolean {
  const { course, startingPrice, searchText } = entry;

  // Every typed word must appear somewhere (AND semantics).
  if (tokens.length > 0 && !tokens.every((token) => searchText.includes(token))) {
    return false;
  }

  if (
    filters.categories.length > 0 &&
    !(course.category && filters.categories.includes(course.category))
  ) {
    return false;
  }

  if (filters.modes.length > 0 && !filters.modes.includes(course.mode)) {
    return false;
  }

  // Inclusive on both ends; free (0) courses pass when min is 0.
  const low = Math.min(filters.price.min, filters.price.max);
  const high = Math.max(filters.price.min, filters.price.max);
  return startingPrice >= low && startingPrice <= high;
}

/**
 * Applies search, category, mode and price filters together,
 * then sorts. Returns a new array; the catalogue is not mutated.
 */
export function applyFilters(
  catalog: readonly CatalogEntry[],
  filters: CourseFilterState,
): CatalogEntry[] {
  const tokens = tokenizeQuery(filters.query);
  const results = catalog.filter((entry) => matchesFilters(entry, filters, tokens));

  // Array.prototype.sort is stable, so equal items keep catalogue order.
  switch (filters.sort) {
    case "price-asc":
      return results.sort((a, b) => a.startingPrice - b.startingPrice);
    case "price-desc":
      return results.sort((a, b) => b.startingPrice - a.startingPrice);
    case "rating-desc":
      return results.sort(
        (a, b) => (b.course.rating ?? 0) - (a.course.rating ?? 0),
      );
    case "discount-desc":
      return results.sort((a, b) => b.maxDiscount - a.maxDiscount);
    case "relevance":
    default:
      if (tokens.length === 0) return results; // already in catalogue order
      return results.sort(
        (a, b) =>
          scoreEntry(b, tokens) - scoreEntry(a, tokens) ||
          a.catalogIndex - b.catalogIndex,
      );
  }
}

/* ------------------------------------------------------------
   Active-filter helpers
   ------------------------------------------------------------ */

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** "₹1,599", or "Free" for 0. */
export function formatPrice(amount: number): string {
  return amount === 0 ? "Free" : rupeeFormatter.format(amount);
}

/** True when the selected range is narrower than the catalogue bounds. */
export function isPriceFilterActive(
  price: PriceRange,
  bounds: PriceRange,
): boolean {
  return price.min > bounds.min || price.max < bounds.max;
}

/**
 * Turns the filter state into removable chips. Sort is excluded
 * on purpose: it orders results rather than narrowing them.
 */
export function buildActiveFilters(
  filters: CourseFilterState,
  bounds: PriceRange,
): ActiveFilter[] {
  const chips: ActiveFilter[] = [];

  const query = filters.query.trim();
  if (query) {
    chips.push({ id: "query", kind: "query", label: `“${query}”` });
  }

  for (const category of filters.categories) {
    chips.push({
      id: `category:${category}`,
      kind: "category",
      label: category,
      value: category,
    });
  }

  for (const mode of filters.modes) {
    chips.push({ id: `mode:${mode}`, kind: "mode", label: mode, value: mode });
  }

  if (isPriceFilterActive(filters.price, bounds)) {
    chips.push({
      id: "price",
      kind: "price",
      label: `${formatPrice(filters.price.min)} – ${formatPrice(filters.price.max)}`,
    });
  }

  return chips;
}