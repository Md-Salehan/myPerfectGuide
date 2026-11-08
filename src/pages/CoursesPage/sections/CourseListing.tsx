// ============================================================
// src/pages/CoursesPage/sections/CourseListing.tsx
// Results area: count line + toolbar slot, responsive grid of
// the existing CourseCard, skeleton loading, and empty state.
//
// This is the only live region on the page, so screen readers
// hear one "Showing X of Y courses" update per change.
// ============================================================

import { memo, type ReactNode } from "react";

import { Button } from "../../../components/common/Button";
import { SKELETON_COUNT } from "../data/constants";
import type { CatalogEntry } from "../types";
import { CourseCard } from "../../../components/common/CourseCard";

/* ------------------------------------------------------------
   Shared grid classes
   One column on phones, two from md, three on very wide screens
   (the filter sidebar takes a column's worth of width on lg+).
   ------------------------------------------------------------ */

const GRID_CLASS =
  "grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 2xl:grid-cols-3";

const pluralCourses = (count: number) => (count === 1 ? "course" : "courses");

/* ------------------------------------------------------------
   Grid of real cards
   Memoised on `entries`, so typing in the search box does not
   re-render every card; the grid only updates when results change.
   ------------------------------------------------------------ */

const CourseGrid = memo(function CourseGrid({
  entries,
}: {
  entries: CatalogEntry[];
}) {
  return (
    <ul className={GRID_CLASS}>
      {entries.map(({ course, catalogIndex }) => (
        <li key={course.courseId} className="flex">
          <div className="flex w-full flex-col [&>article]:flex-1 [&>article]:transition [&>article]:duration-300 [&>article]:motion-reduce:transition-none">
            <CourseCard course={course} index={catalogIndex} />
          </div>
        </li>
      ))}
    </ul>
  );
});

/* ------------------------------------------------------------
   Skeleton card (loading state)
   Mirrors CourseCard's proportions to avoid layout jump.
   ------------------------------------------------------------ */

function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="aspect-[16/9] bg-slate-100" />
      <div className="space-y-4 p-5">
        <div className="h-2.5 w-20 rounded-full bg-slate-100" />
        <div className="h-5 w-4/5 rounded-full bg-slate-100" />
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-slate-100" />
          <div className="h-2.5 w-2/3 rounded-full bg-slate-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-24 rounded-full bg-slate-100" />
        </div>
        <div className="h-px bg-slate-100" />
        <div className="h-4 w-28 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className={GRID_CLASS} aria-hidden="true">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Empty state
   ------------------------------------------------------------ */

interface EmptyStateProps {
  /** True when filters/search are the reason nothing matched. */
  hasActiveFilters: boolean;
  onReset: () => void;
}

function EmptyState({ hasActiveFilters, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-white px-6 py-16 text-center sm:py-20">
      <span
        aria-hidden="true"
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/80"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M8.5 11h5" />
        </svg>
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-yellow-500 ring-2 ring-white" />
      </span>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {hasActiveFilters ? "No matches" : "Coming soon"}
      </p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
        {hasActiveFilters ? "Nothing fits these filters" : "No courses yet"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {hasActiveFilters
          ? "Try a different keyword, widen the price range, or remove a filter to see more courses."
          : "New courses will appear here as soon as they are published."}
      </p>

      {hasActiveFilters && (
        <Button
          variant="primary"
          onClick={onReset}
          className="mt-6 px-6 py-2.5 text-sm"
        >
          Reset all filters
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------
   Section
   ------------------------------------------------------------ */

interface CourseListingProps {
  /** Filtered + sorted entries from useCourseFilters. */
  results: CatalogEntry[];
  /** Number of courses in the whole catalogue. */
  totalCount: number;
  isLoading: boolean;
  hasActiveFilters: boolean;
  onReset: () => void;
  /** Right-hand side of the count row (mobile filter button, sort). */
  toolbar?: ReactNode;
}

export function CourseListing({
  results,
  totalCount,
  isLoading,
  hasActiveFilters,
  onReset,
  toolbar,
}: CourseListingProps) {
  const shown = results.length;

  const isFiltered = hasActiveFilters || shown !== totalCount;

  return (
    <section aria-label="Course results" className="min-w-0">
      {/* Count + toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-slate-500"
        >
          {isLoading ? (
            <span className="font-medium text-slate-400">Loading courses…</span>
          ) : isFiltered ? (
            <>
              Showing{" "}
              <span className="font-semibold tabular-nums text-slate-900">
                {shown}
              </span>{" "}
              of{" "}
              <span className="font-semibold tabular-nums text-slate-900">
                {totalCount}
              </span>{" "}
              {pluralCourses(totalCount)}
            </>
          ) : (
            <>
              <span className="font-semibold tabular-nums text-slate-900">
                {totalCount}
              </span>{" "}
              {pluralCourses(totalCount)} in the catalogue
            </>
          )}
        </p>
        {toolbar && (
          <div className="flex items-center gap-2 sm:gap-3">{toolbar}</div>
        )}
      </div>

      {/* Body */}
      <div aria-busy={isLoading}>
        {isLoading ? (
          <SkeletonGrid />
        ) : shown > 0 ? (
          <CourseGrid entries={results} />
        ) : (
          <EmptyState hasActiveFilters={hasActiveFilters} onReset={onReset} />
        )}
      </div>
    </section>
  );
}