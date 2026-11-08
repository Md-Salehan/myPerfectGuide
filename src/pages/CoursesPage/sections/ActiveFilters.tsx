// ============================================================
// src/pages/CoursesPage/sections/ActiveFilters.tsx
// Removable chips for every filter currently applied.
// Presentational: the chips come from buildActiveFilters() via
// useCourseFilters, and removal is delegated back to the hook.
// ============================================================

import type { ActiveFilter, ActiveFilterKind } from "../types";

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (filter: ActiveFilter) => void;
  onClearAll: () => void;
}

/**
 * Category and mode chips are self-explanatory ("Finance"), but a
 * bare "₹1,599 – ₹4,999" or a quoted query is not, so those two
 * get a short prefix.
 */
const KIND_PREFIX: Partial<Record<ActiveFilterKind, string>> = {
  query: "Search",
  price: "Price",
};

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <section
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="mr-1 text-sm font-semibold text-slate-500">
        Active filters:
      </span>

      <ul className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const prefix = KIND_PREFIX[filter.kind];

          return (
            <li key={filter.id}>
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-1 pl-3.5 pr-1 text-sm font-semibold text-blue-700">
                {prefix && (
                  <span className="font-medium text-blue-700/70">{prefix}:</span>
                )}
                <span className="max-w-[16rem] truncate">{filter.label}</span>

                <button
                  type="button"
                  onClick={() => onRemove(filter)}
                  aria-label={`Remove filter: ${
                    prefix ? `${prefix} ${filter.label}` : filter.label
                  }`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-100 hover:text-blue-900"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    className="h-3 w-3"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </span>
            </li>
          );
        })}
      </ul>

      {/* A lone chip already has its own remove button */}
      {filters.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-full px-3 py-1.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          Clear all
        </button>
      )}
    </section>
  );
}