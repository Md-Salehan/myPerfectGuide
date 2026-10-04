// ============================================================
// src/pages/product-details/course-digital-marketing/sections/PlansPricing.tsx
// NEW SECTION — full-width plans comparison.
// The existing SidebarEnrollCard is a sticky widget that
// shows one plan at a time. The copy has a 16-row comparison
// table that needs to be visible side-by-side, which only
// works as a full-width section below the main grid.
//
// The sidebar's toggle is independent local state (per the
// requirement), so this section owns its own static layout.
// ============================================================

import { Button } from "../../../../components/common/Button";

const COMPARISON: { feature: string; standard: boolean; premium: boolean }[] = [
  { feature: "15-module curriculum", standard: true, premium: true },
  { feature: "Live interactive classes", standard: true, premium: true },
  { feature: "Lifetime access to recordings", standard: true, premium: true },
  { feature: "Doubt-clearing sessions", standard: true, premium: true },
  { feature: "Assignments and projects", standard: true, premium: true },
  { feature: "Capstone with instructor review", standard: true, premium: true },
  { feature: "Certificate of completion", standard: true, premium: true },
  { feature: "2 real internships + certificates", standard: false, premium: true },
  { feature: "Freelance project opportunities", standard: false, premium: true },
  { feature: "Dedicated placement team", standard: false, premium: true },
  { feature: "Resume & LinkedIn optimization", standard: false, premium: true },
  { feature: "Mock interviews", standard: false, premium: true },
  { feature: "Career guidance sessions", standard: false, premium: true },
  { feature: "Job assistance with hiring partners", standard: false, premium: true },
  { feature: "₹6 LPA placement promise", standard: false, premium: true },
  { feature: "100% Placement fee refund if we fail to place you", standard: false, premium: true },
];

export function PlansPricing() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118L10.588 15.6a1 1 0 00-1.176 0l-3.365 2.447c-.783.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.064 9.382c-.782-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.955z" />
          </svg>
          LAUNCH BATCH PRICING — LIVE NOW
        </span>
        <h2 className="section-title text-2xl sm:text-[34px]">
          Same rigorous curriculum.{" "}
          <span className="text-indigo-600">The difference is what happens after you graduate.</span>
        </h2>
        <p className="text-slate-600 text-[15px] mt-3">
          Standard gives you the skills at 50% off. Premium adds internships, freelance access and a
          refund-backed placement promise at 75% off. For a limited time.
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {/* Standard */}
        <div className="card p-7 sm:p-8 flex flex-col">
          <p className="text-[11px] font-extrabold tracking-wider text-slate-500 mb-2">
            STANDARD
          </p>
          <h3 className="font-bold text-xl text-slate-900 mb-1">Digital Marketing Mastery</h3>
          <div className="flex items-baseline gap-2 flex-wrap mt-2">
            <span className="text-3xl font-extrabold text-slate-900">₹4,999</span>
            <span className="text-slate-400 line-through">₹10,000</span>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
              50% off
            </span>
          </div>
          <p className="text-slate-500 text-[13.5px] mt-2">One-time · You save ₹5,001</p>

          <ul className="mt-5 space-y-2.5 text-[14px] text-slate-700 flex-1">
            {COMPARISON.filter((c) => c.standard).map((c) => (
              <li key={c.feature} className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
                </svg>
                {c.feature}
              </li>
            ))}
          </ul>

          <p className="text-slate-500 text-[12.5px] italic mt-5">
            Best for self-starters confident in finding their own opportunities.
          </p>

          <Button href="#enroll" variant="dark" className="w-full py-3.5 mt-4 text-[15px]">
            Enroll in Standard — ₹4,999
          </Button>
        </div>

        {/* Premium */}
        <div className="relative card p-7 sm:p-8 flex flex-col ring-2 ring-amber-400">
          <span className="absolute -top-3 right-6 bg-amber-400 text-amber-950 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full">
            MOST POPULAR
          </span>

          <p className="text-[11px] font-extrabold tracking-wider text-amber-600 mb-2">
            PREMIUM
          </p>
          <h3 className="font-bold text-xl text-slate-900 mb-1">Mastery + Placement Promise</h3>
          <div className="flex items-baseline gap-2 flex-wrap mt-2">
            <span className="text-3xl font-extrabold text-slate-900">₹14,999</span>
            <span className="text-slate-400 line-through">₹60,000</span>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
              75% off
            </span>
          </div>
          <p className="text-slate-500 text-[13.5px] mt-2">
            You save ₹45,001 · Course fee ₹4,999 + Placement &amp; Internship fee ₹10,000
          </p>

          <ul className="mt-5 space-y-2.5 text-[14px] text-slate-700 flex-1">
            {COMPARISON.filter((c) => c.premium).map((c) => (
              <li key={c.feature} className="flex gap-2.5">
                <svg className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
                </svg>
                {c.feature}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[12.5px] leading-relaxed text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            Your ₹10,000 Placement &amp; Internship fee is 100% refundable if we don't deliver your
            internships and placement.
          </p>

          <p className="text-slate-500 text-[12.5px] italic mt-3">
            Best for students who want structured career support and a backed outcome.
          </p>

          <Button href="#enroll" variant="primary" className="w-full py-3.5 mt-4 text-[15px]">
            Enroll in Premium — ₹14,999
          </Button>
        </div>
      </div>

      {/* Comparison table */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-5 py-4 text-[13px] font-extrabold text-slate-700">
                Feature
              </th>
              <th className="px-5 py-4 text-[13px] font-extrabold text-slate-700 text-center w-28">
                Standard
              </th>
              <th className="px-5 py-4 text-[13px] font-extrabold text-slate-700 text-center w-28">
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, idx) => (
              <tr
                key={row.feature}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-5 py-3 text-[13.5px] text-slate-700">{row.feature}</td>
                <td className="px-5 py-3 text-center">
                  {row.standard ? (
                    <CheckIcon className="text-emerald-500" />
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3 text-center">
                  {row.premium ? (
                    <CheckIcon className="text-emerald-500" />
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-5 h-5 mx-auto ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}