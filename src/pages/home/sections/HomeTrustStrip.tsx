// ============================================================
// src/pages/home/sections/HomeTrustStrip.tsx
// Static trust strip — perks band between the hero and the
// catalog.
//
// All content is hardcoded here. No props, no imports, no
// dependency on HOME_CONTENT or any course data.
//
// If you want to change the perks shown, edit the PERKS array
// below. If you want to change the label above them, edit
// PERKS_LABEL.
// ============================================================

/* Perks rendered with ✦ bullets. Same five values the site
   used by default (HOME_CONTENT.perks in the dynamic version). */
const PERKS: readonly string[] = [
  "Practical, hands-on training",
  "1:1 doubt support",
  "Downloadable resources",
  "Certificate of completion",
  "7-day refund window",
] as const;

/* Small uppercase label above the perks row. */
const PERKS_LABEL = "What every learner gets";

export function HomeTrustStrip() {
  // Defensive guard: if the PERKS array is ever emptied,
  // render nothing (matches the source's "hide if empty" rule).
  if (PERKS.length === 0) return null;

  return (
    <div className="relative z-[5] border-y border-slate-200 py-[26px] text-center bg-white">
      <div className="mx-auto max-w-[1120px] px-6">
        {PERKS_LABEL && (
          <small className="block text-[10px] tracking-[0.2em] uppercase text-slate-700 mb-3.5">
            {PERKS_LABEL}
          </small>
        )}
        <ul className="list-none p-0 flex justify-center max-sm:justify-start flex-wrap gap-y-2.5 gap-x-[34px] font-semibold text-slate-700 text-[14px]">
          {PERKS.map((perk, i) => (
            <li
              key={`${perk}-${i}`}
              className="before:content-['✦'] before:text-gray-700 before:mr-2"
            >
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}