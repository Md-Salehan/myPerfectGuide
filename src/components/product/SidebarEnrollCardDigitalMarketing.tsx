// ============================================================
// src/components/product/SidebarEnrollCardDigitalMarketing.tsx
// Sticky price + enroll card for the Digital Marketing course.
//
// MODIFIED SHARED COMPONENT:
//   Mirrors the structure and visual language of the existing
//   SidebarEnrollCard (promo banner, price row, plan toggle,
//   CTA, feature list) but is a sibling component because:
//     - plans differ (Standard ₹4,999 / Premium ₹14,999)
//     - Premium shows a green refund note
//     - the feature checklist changes with the toggle
//     - the promo banner copy is AdsAcademy-specific
//
// Plan selection is LOCAL state, per the requirement that the
// sidebar toggle does not sync with the full PlansPricing
// section further down the page.
// ============================================================

import { useState } from "react";

import { Button } from "../common/Button";
import { formatPrice } from "../../utils/formatPrice";

interface PlanOption {
  /** Short label rendered inside the toggle button. */
  label: string;
  /** Numeric price shown when this plan is selected. */
  price: number;
  /** Struck-through original price. */
  original: number;
  /** Percentage-off value shown in the "% off" pill. */
  off: number;
  /** Checklist rows shown for this plan. */
  features: readonly string[];
}

/**
 * The two AdsAcademy plans. Premium carries the placement
 * promise, internships and freelance access.
 */
const PLANS: readonly PlanOption[] = [
  {
    label: "Standard — ₹4,999",
    price: 4999,
    original: 10000,
    off: 50,
    features: [
      "15-module curriculum",
      "Live interactive classes",
      "Lifetime access to recordings",
      "Capstone project",
      "Certificate of completion",
    ],
  },
  {
    label: "Premium — ₹14,999",
    price: 14999,
    original: 60000,
    off: 75,
    features: [
      "Everything in Standard",
      "2 real internships",
      "Freelance project access",
      "Dedicated placement team",
      "₹6 LPA placement promise",
    ],
  },
];

export function SidebarEnrollCardDigitalMarketing() {
  // Index of the currently selected plan. Defaults to Standard,
  // matching the source's intent to lead with the lower-priced
  // entry point.
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const selectedPlan = PLANS[selectedPlanIndex];
  const isPremium = selectedPlanIndex === 1;

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
                Digital Marketing Mastery + Placement Promise
              </h3>

              <div className="flex flex-wrap gap-1 mt-2">
                <span className="bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-1 rounded">
                  SEO + Ads + AI
                </span>
                <span className="bg-white text-slate-900 text-[9px] font-bold px-1.5 py-1 rounded">
                  Internships + Placement
                </span>
                <span className="bg-amber-400 text-amber-950 text-[9px] font-bold px-1.5 py-1 rounded">
                  UP TO 75% OFF
                </span>
              </div>

              <div className="flex gap-1 mt-2">
                {/* Google Ads */}
                <span className="tech-chip w-6 h-6" style={{ background: "#4285F4" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </span>

                {/* Meta Ads */}
                <span className="tech-chip w-6 h-6" style={{ background: "#1877F2" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </span>

                {/* GA4 / Analytics */}
                <span className="tech-chip w-6 h-6" style={{ background: "#F9AB00" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
                  </svg>
                </span>

                {/* SEO */}
                <span className="tech-chip w-6 h-6" style={{ background: "#0EA5E9" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                  </svg>
                </span>

                {/* Email */}
                <span className="tech-chip w-6 h-6" style={{ background: "#DB2777" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path strokeLinecap="round" d="M3 7l9 6 9-6" />
                  </svg>
                </span>

                {/* AI */}
                <span className="tech-chip w-6 h-6" style={{ background: "#7C3AED" }}>
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.9 5.8L20 10l-5 3.4L16.5 20 12 16.8 7.5 20 9 13.4 4 10l6.1-1.2z" />
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
            ₹{selectedPlan.original.toLocaleString("en-IN")}
          </span>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {selectedPlan.off}% off
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 3" />
          </svg>
          15 weeks · Live + Recorded
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

        {/* Green refund note — only under Premium */}
        {isPremium && (
          <p className="mt-3 text-[12.5px] leading-relaxed text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            Your ₹10,000 Placement &amp; Internship fee is 100% refundable if we don't deliver your internships and placement.
          </p>
        )}

        <Button
          href="#enroll"
          variant="primary"
          className="w-full py-3.5 mt-4 text-[15px]"
        >
          {isPremium ? "Enroll in Premium — ₹14,999" : "Enroll in Standard — ₹4,999"}
        </Button>

        {/* Feature list — changes with plan */}
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          {selectedPlan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <svg
                className="w-4 h-4 text-slate-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <p className="text-slate-500 text-[12px] mt-4">
          Premium seats are limited per batch.
        </p>
      </div>
    </div>
  );
}