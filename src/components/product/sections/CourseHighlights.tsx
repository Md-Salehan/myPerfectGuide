// ============================================================
// src/components/product/sections/CourseHighlights.tsx

// "Course Highlights" row — amber-bordered card with a small
// floating label pill and three inline highlight items.
//
// Ported 1:1 from the <section> block immediately below the
// hero in index.html. The floating "Course Highlights" pill
// uses absolute positioning (top -4 / left 5) to straddle the
// card's top border — this is preserved exactly.
//
// ============================================================

import type { ReactNode } from "react";

export interface CourseHighlightItem {
  /** Highlight text shown next to the icon. */
  text: ReactNode;
  /**
   * Icon rendered inside the item. Pass any JSX (e.g. <svg ... />).
   * If omitted, a default neutral icon is rendered.
   */
  icon?: ReactNode;
}

export interface CourseHighlightsProps {
  /** Floating pill label. Defaults to "Course Highlights". */
  label?: ReactNode;
  /** Optional custom label icon. Defaults to the amber star. */
  labelIcon?: ReactNode;
  /** The three (or more) highlight items. */
  items: CourseHighlightItem[];
}

/**
 * Default icon set — matches the original 3 icons 1:1 so the
 * component renders identically when no icons are supplied.
 * The color class is applied per-index, mirroring the original.
 */
const DEFAULT_ICON_COLORS = ["text-blue-500", "text-amber-700", "text-rose-500"];

function DefaultIcon({ index }: { index: number }) {
  const colorClass = DEFAULT_ICON_COLORS[index % DEFAULT_ICON_COLORS.length];
  const className = `w-7 h-7 ${colorClass} shrink-0`;

  if (index % 3 === 0) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l7-2 8-7-5 9-2 8-2-6-6-2z" />
      </svg>
    );
  }
  if (index % 3 === 1) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c1.8 0 3 1 3.5 2 .5-1 1.7-2 3.5-2 1.4 0 2.6.6 3.4 1.6M14 9l2.5 2.5L21 7"
      />
    </svg>
  );
}

/**
 * Tailwind class slices per item position, extracted so the
 * exact original responsive classes are preserved 1:1 for the
 * 3-item case, while still working for other item counts.
 */
const ITEM_WRAPPER_CLASSES = [
  "flex items-center gap-3 pb-4 sm:pb-0 sm:pr-5",
  "flex items-center gap-3 py-4 sm:py-0 sm:px-5",
  "flex items-center gap-3 pt-4 sm:pt-0 sm:pl-5",
];

function getItemWrapperClass(index: number, total: number): string {
  // Preserve the exact original classes for a 3-item layout.
  if (total === 3 && ITEM_WRAPPER_CLASSES[index]) {
    return ITEM_WRAPPER_CLASSES[index];
  }
  // Generic fallback that still mirrors the original pattern.
  if (index === 0) return "flex items-center gap-3 pb-4 sm:pb-0 sm:pr-5";
  if (index === total - 1) return "flex items-center gap-3 pt-4 sm:pt-0 sm:pl-5";
  return "flex items-center gap-3 py-4 sm:py-0 sm:px-5";
}

export function CourseHighlights({
  label = "Course Highlights",
  labelIcon,
  items,
}: CourseHighlightsProps) {
  return (
    <section className="shell max-md:px-8 pt-8 pb-8 lg:pt-10 lg:pb-10">
      <div className="card relative pt-8 pb-5 px-5 sm:px-6 highlight-card">
        {/* ---------- Floating "Course Highlights" pill ---------- */}
        <div className="absolute -top-4 left-5 inline-flex items-center gap-2 bg-amber-400 text-amber-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-card">
          {labelIcon ?? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118L10.588 15.6a1 1 0 00-1.176 0l-3.365 2.447c-.783.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.064 9.382c-.782-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.955z" />
            </svg>
          )}
          {label}
        </div>

        {/* ---------- Highlights grid ---------- */}
        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-amber-200/70 mt-2 highlight-grid">
          {items.map((item, index) => (
            <div
              key={index}
              className={getItemWrapperClass(index, items.length)}
            >
              {item.icon ?? <DefaultIcon index={index} />}
              <p className="font-semibold text-slate-800 text-[15px] leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}