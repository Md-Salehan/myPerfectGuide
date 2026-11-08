// ============================================================
// src/pages/CoursesPage/sections/CourseFilters.tsx
// Filter UI: category pills, price range, learning mode, sort.
//
//   <CourseFilters />   desktop sidebar (hidden below lg), sticky
//   <MobileFilters />   button + drawer (reuses common/Modal)
//   <SortSelect />      sort dropdown, used by both layouts
//
// All three are presentational. State lives in useCourseFilters.
// ============================================================

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Button } from "../../../components/common/Button";
import { Modal } from "../../../components/common/Modal";
import {
  ALL_CATEGORIES_LABEL,
  PRICE_STEP,
  SORT_OPTIONS,
} from "../data/constants";
import type {
  CourseFilterState,
  FacetOption,
  PriceRange,
  SortOption,
} from "../types";
import { formatPrice, isPriceFilterActive } from "../utils/courseFilters";

/* ------------------------------------------------------------
   Sidebar stickiness
   The sticky offset is header height + breathing room. The site
   header is ~76px (see #mobileMenu in index.css), so top-24
   (96px) leaves ~20px. The max-height reserves the same top
   offset plus 1.5rem at the bottom.
   ------------------------------------------------------------ */

const SIDEBAR_STICKY_CLASS = "lg:sticky lg:top-24";
const SIDEBAR_MAX_HEIGHT_CLASS = "lg:max-h-[calc(100vh-7.5rem)]";

/* ------------------------------------------------------------
   Props
   ------------------------------------------------------------ */

export interface FilterControlsProps {
  filters: CourseFilterState;
  categoryOptions: FacetOption[];
  modeOptions: FacetOption[];
  priceBounds: PriceRange;
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
  onToggleMode: (mode: string) => void;
  onPriceMinChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
  onReset: () => void;
}

/** Filters that live inside the panel (the search query does not). */
function countPanelFilters(
  filters: CourseFilterState,
  bounds: PriceRange,
): number {
  return (
    filters.categories.length +
    filters.modes.length +
    (isPriceFilterActive(filters.price, bounds) ? 1 : 0)
  );
}

/* ------------------------------------------------------------
   Small building blocks
   ------------------------------------------------------------ */

function SectionTitle({
  id,
  index,
  hint,
  children,
}: {
  id: string;
  index: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-baseline gap-2.5">
      <span
        aria-hidden="true"
        className="text-[10px] font-semibold tabular-nums text-slate-400"
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <h3
          id={id}
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
        >
          {children}
        </h3>
        {hint && <p className="mt-1 text-xs leading-relaxed text-slate-400">{hint}</p>}
      </div>
    </div>
  );
}

interface FilterPillProps {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: ReactNode;
}

/**
 * Active = soft ink fill with a subtle ring and a check glyph.
 * Inactive = quiet paper chip that warms on hover.
 */
function FilterPill({ active, onClick, count, children }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium",
        "transition duration-200 motion-reduce:transition-none motion-safe:active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        active
          ? "bg-slate-900 text-white shadow-[0_2px_8px_-2px_rgba(15,23,42,0.35)]"
          : "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200/80 hover:bg-white hover:text-slate-900 hover:ring-slate-300",
      ].join(" ")}
    >
      {active && (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-ml-0.5 h-3 w-3 text-white/90"
        >
          <path d="m3.5 8.5 3 3 6-7" />
        </svg>
      )}
      {children}
      {count !== undefined && (
        <span
          className={[
            "text-[11px] tabular-nums",
            active ? "text-white/60" : "text-slate-400 group-hover:text-slate-500",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ---------- Price: number input with a draft value ---------- */

interface PriceInputProps {
  label: string;
  value: number;
  /** Values outside [low, high] are clamped before committing. */
  low: number;
  high: number;
  onCommit: (value: number) => void;
}

/**
 * Keeps what the user is typing in local state and only commits on
 * blur / Enter. Otherwise typing "5000" would be clamped to the
 * minimum bound after the first digit.
 */
function PriceInput({ label, value, low, high, onCommit }: PriceInputProps) {
  const [draft, setDraft] = useState(String(value));

  // Follow external changes (slider drag, reset).
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = () => {
    const parsed = Number(draft);
    if (draft.trim() === "" || Number.isNaN(parsed)) {
      setDraft(String(value));
      return;
    }
    const next = Math.min(Math.max(parsed, low), high);
    setDraft(String(next));
    onCommit(next);
  };

  return (
    <label className="block flex-1">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400">
        {label}
      </span>
      <span className="relative block">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400"
        >
          ₹
        </span>
        <input
          type="number"
          inputMode="numeric"
          step={PRICE_STEP}
          min={low}
          max={high}
          value={draft}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDraft(event.target.value)
          }
          onBlur={commit}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          className={[
            "h-10 w-full rounded-xl border border-transparent bg-slate-50 pl-7 pr-3",
            "text-sm font-semibold tabular-nums text-slate-900 transition duration-200 motion-reduce:transition-none",
            "hover:bg-slate-100/70",
            "focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          ].join(" ")}
        />
      </span>
    </label>
  );
}

/* ---------- Price: dual-thumb slider ---------- */

/** Styles the native thumb (WebKit + Firefox) of a transparent range input. */
const RANGE_INPUT_CLASS = [
  "pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent focus:outline-none",
  "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent",
  // WebKit thumb
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white",
  "[&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(15,23,42,0.2)] [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:duration-150",
  "[&::-webkit-slider-thumb]:hover:scale-110",
  "[&:focus-visible::-webkit-slider-thumb]:ring-4 [&:focus-visible::-webkit-slider-thumb]:ring-blue-500/20",
  // Firefox thumb
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
  "[&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(15,23,42,0.2)]",
  "[&:focus-visible::-moz-range-thumb]:ring-4 [&:focus-visible::-moz-range-thumb]:ring-blue-500/20",
].join(" ");

interface PriceRangeFilterProps {
  price: PriceRange;
  bounds: PriceRange;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

function PriceRangeFilter({
  price,
  bounds,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  const span = bounds.max - bounds.min;
  // Nothing to filter when every course costs the same.
  if (span <= 0) return null;

  const toPercent = (value: number) => ((value - bounds.min) / span) * 100;
  const fillLeft = toPercent(price.min);
  const fillRight = 100 - toPercent(price.max);

  // When both thumbs sit at the top end, the max thumb would cover
  // the min thumb. Lift the min input so it can still be dragged back.
  const minOnTop = price.min > bounds.min + span / 2;

  return (
    <div>
      <p className="mb-5  text-xl font-semibold tabular-nums tracking-tight text-slate-900">
        {formatPrice(price.min)}
        <span className="mx-2 text-base font-normal text-slate-300">–</span>
        {formatPrice(price.max)}
      </p>

      {/* Slider */}
      <div className="relative h-6">
        <div
          aria-hidden="true"
          className="absolute inset-x-[8px] top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200/90"
        >
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            style={{ left: `${fillLeft}%`, right: `${fillRight}%` }}
          />
        </div>

        <input
          type="range"
          aria-label="Minimum price"
          aria-valuetext={formatPrice(price.min)}
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={price.min}
          onChange={(event) => onMinChange(Number(event.target.value))}
          className={`${RANGE_INPUT_CLASS} ${minOnTop ? "z-30" : "z-20"}`}
        />
        <input
          type="range"
          aria-label="Maximum price"
          aria-valuetext={formatPrice(price.max)}
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={price.max}
          onChange={(event) => onMaxChange(Number(event.target.value))}
          className={`${RANGE_INPUT_CLASS} ${minOnTop ? "z-20" : "z-30"}`}
        />
      </div>

      {/* Exact values */}
      <div className="mt-5 flex items-end gap-2">
        <PriceInput
          label="Min"
          value={price.min}
          low={bounds.min}
          high={price.max}
          onCommit={onMinChange}
        />
        <span aria-hidden="true" className="pb-2.5 text-slate-300">
          –
        </span>
        <PriceInput
          label="Max"
          value={price.max}
          low={price.min}
          high={bounds.max}
          onCommit={onMaxChange}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Panel body (shared by the sidebar and the drawer)
   ------------------------------------------------------------ */

interface FilterPanelProps extends FilterControlsProps {
  /** The drawer already has its own title and reset button. */
  hideHeader?: boolean;
}

function FilterPanel({
  filters,
  categoryOptions,
  modeOptions,
  priceBounds,
  onToggleCategory,
  onClearCategories,
  onToggleMode,
  onPriceMinChange,
  onPriceMaxChange,
  onReset,
  hideHeader = false,
}: FilterPanelProps) {
  const categoryLabelId = useId();
  const priceLabelId = useId();
  const modeLabelId = useId();

  const panelCount = countPanelFilters(filters, priceBounds);
  const totalCourses = categoryOptions.reduce((sum, o) => sum + o.count, 0);

  return (
    <div>
      {!hideHeader && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Filter
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {panelCount > 0
                ? `${panelCount} ${panelCount === 1 ? "filter" : "filters"} applied`
                : "Narrow the list to what fits"}
            </p>
          </div>
          {panelCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="-mr-2 rounded-full px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
            >
              Clear
            </button>
          )}
        </div>
      )}

      <div className="divide-y divide-slate-100 [&>section]:py-5 [&>section:first-child]:pt-0 [&>section:last-child]:pb-0">
        {/* Category */}
        {categoryOptions.length > 0 && (
          <section aria-labelledby={categoryLabelId}>
            <SectionTitle id={categoryLabelId} index="01">
              Category
            </SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              <FilterPill
                active={filters.categories.length === 0}
                onClick={onClearCategories}
                count={totalCourses}
              >
                {ALL_CATEGORIES_LABEL}
              </FilterPill>
              {categoryOptions.map((option) => (
                <FilterPill
                  key={option.value}
                  active={filters.categories.includes(option.value)}
                  onClick={() => onToggleCategory(option.value)}
                  count={option.count}
                >
                  {option.value}
                </FilterPill>
              ))}
            </div>
          </section>
        )}

        {/* Price */}
        {priceBounds.max > priceBounds.min && (
          <section aria-labelledby={priceLabelId}>
            <SectionTitle
              id={priceLabelId}
              index="02"
              hint="Based on each course's starting price"
            >
              Price range
            </SectionTitle>
            <PriceRangeFilter
              price={filters.price}
              bounds={priceBounds}
              onMinChange={onPriceMinChange}
              onMaxChange={onPriceMaxChange}
            />
          </section>
        )}

        {/* Learning mode: only useful when there is a real choice */}
        {modeOptions.length > 1 && (
          <section aria-labelledby={modeLabelId}>
            <SectionTitle id={modeLabelId} index="03">
              Learning mode
            </SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {modeOptions.map((option) => (
                <FilterPill
                  key={option.value}
                  active={filters.modes.includes(option.value)}
                  onClick={() => onToggleMode(option.value)}
                  count={option.count}
                >
                  {option.value}
                </FilterPill>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Desktop sidebar

   STICKY FIX: `sticky` lives on the <aside> (the grid item) with
   `self-start`, so its containing block is the full grid row.
   The inner panel is height-capped and scrolls on its own when
   the viewport is short. No ancestor may clip overflow for this
   to work — verified against page layout.
   ------------------------------------------------------------ */

export function CourseFilters(props: FilterControlsProps) {
  return (
    <aside
      aria-label="Course filters"
      className={`hidden lg:block lg:self-start ${SIDEBAR_STICKY_CLASS}`}
    >
      <div
        className={[
          SIDEBAR_MAX_HEIGHT_CLASS,
          "overflow-y-auto overscroll-contain rounded-2xl",
          "border border-slate-200/80 bg-white/80 p-5",
          "shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm",
          "[scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent]",
        ].join(" ")}
      >
        <FilterPanel {...props} />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------
   Mobile / tablet: button + drawer
   ------------------------------------------------------------ */

interface MobileFiltersProps extends FilterControlsProps {
  /** Live count of courses matching the current filters. */
  resultCount: number;
}

export function MobileFilters({ resultCount, ...panelProps }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  // Stable references: Modal re-runs its focus effect when onClose
  // changes, which would yank focus back to the first control.
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  const panelCount = countPanelFilters(panelProps.filters, panelProps.priceBounds);

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        aria-haspopup="dialog"
        className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 transition duration-200 hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.15)] hover:ring-slate-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-slate-500"
        >
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        Filters
        {panelCount > 0 && (
          <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-[11px] font-semibold text-white tabular-nums">
            {panelCount}
          </span>
        )}
      </button>

      <Modal
        open={open}
        onClose={closeDrawer}
        title="Filters"
        description="Narrow the course list to what fits you."
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 px-5 py-3 text-sm"
              onClick={panelProps.onReset}
              disabled={panelCount === 0}
            >
              Clear all
            </Button>
            <Button
              variant="dark"
              className="flex-[2] px-5 py-3 text-sm"
              onClick={closeDrawer}
            >
              Show {resultCount} {resultCount === 1 ? "course" : "courses"}
            </Button>
          </div>
        }
      >
        <FilterPanel {...panelProps} hideHeader />
      </Modal>
    </>
  );
}

/* ------------------------------------------------------------
   Sort dropdown
   ------------------------------------------------------------ */

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const selectId = useId();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // Look the value up instead of casting, so only valid options pass.
    const match = SORT_OPTIONS.find((o) => o.value === event.target.value);
    if (match) onChange(match.value);
  };

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor={selectId} className="sr-only">
        Sort courses
      </label>
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        className={[
          "h-10 cursor-pointer appearance-none rounded-full bg-white pl-9 pr-9",
          "text-sm font-medium text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200",
          "transition duration-200 motion-reduce:transition-none",
          "hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.15)] hover:ring-slate-300",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
        ].join(" ")}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400"
      >
        <path d="M3 6h18M6 12h12M10 18h4" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}