// ============================================================
// src/pages/home/sections/HomeStats.tsx
// Static stats banner, restyled in a Scaler + Meta look:
//   Scaler: square bordered panel, big medium-weight numerals,
//           tracked uppercase labels, thin dividers.
//   Meta:   #F1F4F7 surface, #0866FF accent bar, #1C2B33 text.
//
// All content is hardcoded here. No props, no imports, no
// dependency on course data or custom Tailwind tokens.
//
// Responsive:
//   - Mobile (< 768px): 2 columns
//   - Tablet+ (>= 768px): 4 columns (fixed, matching the 4 stats)
// ============================================================

/* The four stats rendered in the banner. */
const STATS: readonly { value: string; label: string }[] = [
  { value: "120+", label: "Lectures" },
  { value: "150+", label: "Downloadable resources" },
  { value: "10+", label: "Practice assignments" },
  { value: "7 days", label: "Refund window*" },
] as const;

/* Footnote rendered under the stats banner. */
const STATS_NOTE = "*See the Pricing & Refund Policy for full terms.";

export function HomeStats() {
  // Defensive guard: hide the section if STATS is ever emptied.
  if (STATS.length === 0) return null;

  return (
    <section
      id="outcomes"
      aria-label="Course highlights"
      className="bg-[#F1F4F7] font-['Manrope',ui-sans-serif,system-ui,sans-serif] text-[#1C2B33]"
    >
      <div className="mx-auto max-w-[1288px] px-5 py-[52px] sm:px-10 md:py-[72px] lg:px-[100px]">
        <dl className="relative m-0 grid grid-cols-2 overflow-hidden border border-[#e4e4e7] bg-white md:grid-cols-4">
          {/* Meta-blue accent bar */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-[#0866FF]"
          />

          {STATS.map((stat, i) => (
            <div
              key={`${stat.value}-${i}`}
              className={[
                "px-[22px] pb-[30px] pt-[36px]",
                // Mobile (2-col): odd items get a left divider, rows get a top divider
                i % 2 === 1 ? "border-l border-[#e4e4e7]" : "",
                i >= 2 ? "border-t border-[#e4e4e7]" : "",
                // md+ (4-col): single row, divider before every item but the first
                "md:border-t-0",
                i === 0 ? "md:border-l-0" : "md:border-l md:border-[#e4e4e7]",
              ].join(" ")}
            >
              <dd className="m-0 text-[40px] font-medium leading-none tracking-[-0.03em] text-[#111] sm:text-[48px] lg:text-[56px]">
                {stat.value}
              </dd>
              <dt className="mt-[14px] text-[13px] font-medium uppercase tracking-[0.14em] text-[#6b6b73]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {STATS_NOTE && (
          <p className="mt-[14px] text-[13px] text-[#6b6b73]">{STATS_NOTE}</p>
        )}
      </div>
    </section>
  );
}

export default HomeStats;