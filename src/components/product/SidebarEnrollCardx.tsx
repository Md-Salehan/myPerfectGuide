// ============================================================
// src/components/product/SidebarEnrollCard.tsx
// Sticky price + enroll card, rendered twice on the product
// detail page (mobile in-hero, desktop sticky sidebar).
//
// Ported 1:1 from the <template id="sidebarTemplate"> block
// and the companion price-toggle script in index.html.
//
// Plan selection is LOCAL state — the two instances (mobile
// and desktop) don't need to share it, and nothing outside
// this component reads it.
// ============================================================

import { useState } from "react";

import { Button } from "../common/Button";
import { formatPrice } from "../../utils/formatPrice";

interface PlanOption {
  /** Short label rendered inside the toggle button. */
  label: string;
  /** Numeric price shown when this plan is selected. */
  price: number;
  /** Percentage-off value shown in the "% off" pill. */
  off: number;
}

/**
 * The two plan options from the original markup. Prices and
 * discount percentages are taken directly from the
 * data-price / data-off attributes on the source buttons.
 */
const PLANS: readonly PlanOption[] = [
  { label: "1 Year — ₹1,599", price: 1599, off: 90 },
  { label: "Lifetime — ₹2,999", price: 2999, off: 85 },
];

export function SidebarEnrollCard() {
  // Index of the currently selected plan. Defaults to the
  // first plan (1 Year), matching the `active` class on the
  // first button in the original markup.
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const selectedPlan = PLANS[selectedPlanIndex];

  return (
    <div className="card min-md:mr-8 overflow-hidden shadow-sidebar">
      {/* ---------- Promo banner ---------- */}
      <div className="p-3 bg-slate-100">
        <div className="rounded-xl border-[3px] border-amber-400 bg-ink-950 relative overflow-hidden aspect-[16/10] flex">
          {/* Left column: pill, title, feature tags, tech chips */}
          <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
            <span className="self-start bg-white text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wide">
              JOB READY
            </span>

            <div>
              <h3 className="text-amber-300 font-extrabold text-[15px] leading-tight">
                Complete Taxation &amp; Compliance Course 5.0
              </h3>

              <div className="flex flex-wrap gap-1 mt-2">
                <span className="bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-1 rounded">
                  GST + ITR + Accounting
                </span>
                <span className="bg-white text-slate-900 text-[9px] font-bold px-1.5 py-1 rounded">
                  Portfolio + Ads + Clients
                </span>
                <span className="bg-amber-400 text-amber-950 text-[9px] font-bold px-1.5 py-1 rounded">
                  90% OFF
                </span>
              </div>

              <div className="flex gap-1 mt-2">
                {/* GST Portal */}
                <span className="tech-chip w-6 h-6" style={{ background: "#059669" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                    />
                  </svg>
                </span>

                {/* Income Tax */}
                <span className="tech-chip w-6 h-6" style={{ background: "#4F46E5" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 21h18M5 21V7l7-4 7 4v14M9 12h2M13 12h2M9 16h2M13 16h2"
                    />
                  </svg>
                </span>

                {/* Tally / Accounting */}
                <span className="tech-chip w-6 h-6" style={{ background: "#1D4ED8" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6M9 12h6M9 16h3"
                    />
                  </svg>
                </span>

                {/* Calculator / Tax planning */}
                <span className="tech-chip w-6 h-6" style={{ background: "#0EA5E9" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 6h8M8 10h2M12 10h2M16 10h.01M8 14h2M12 14h2M16 14h.01M8 18h6"
                    />
                  </svg>
                </span>

                {/* Marketing / Ads */}
                <span className="tech-chip w-6 h-6" style={{ background: "#DB2777" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                    />
                  </svg>
                </span>

                {/* WhatsApp / Client */}
                <span className="tech-chip w-6 h-6" style={{ background: "#25D366" }}>
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Right visual column */}
          <div className="w-[30%] bg-gradient-to-b from-slate-600 to-slate-800 relative shrink-0">
            <svg
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] text-slate-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ---------- Price + plan toggle + CTA + features ---------- */}
      <div className="px-5 pb-5">
        <div className="flex items-baseline gap-2 flex-wrap mt-1">
          <span className="text-2xl font-extrabold text-slate-900">
            {formatPrice(selectedPlan.price)}
          </span>
          <span className="text-slate-400 line-through text-base">
            ₹15,990
          </span>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {selectedPlan.off}% off
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 3" />
          </svg>
          1 Year Validity
        </p>

        {/* Plan toggle */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {PLANS.map((plan, index) => (
            <button
              key={plan.label}
              type="button"
              onClick={() => setSelectedPlanIndex(index)}
              className={`plan-btn${index === selectedPlanIndex ? " active" : ""}`}
            >
              {plan.label}
            </button>
          ))}
        </div>

        <Button href="#enroll" variant="primary" className="w-full py-3.5 mt-4 text-[15px]">
          Enroll Now
        </Button>

        {/* Feature list */}
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
            Complete GST &amp; ITR Training
          </li>

          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
              />
            </svg>
            Portfolio Website Building
          </li>

          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
              />
            </svg>
            Digital Marketing &amp; Client Acquisition
          </li>

          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
              />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            10+ Real-World Projects
          </li>

          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l5 3-5 3V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 22h8M12 18v4" />
            </svg>
            Live + Recorded Sessions
          </li>

          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M12 7v5l3 3" />
            </svg>
            1 Year Access
          </li>
        </ul>
      </div>
    </div>
  );
}