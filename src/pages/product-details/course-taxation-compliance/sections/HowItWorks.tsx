// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/HowItWorks.tsx
// "How It Works" section — a five-step vertical timeline.
//
// Ported 1:1 from the "How It Works" <section> in index.html.
//
// Each step has its own icon SVG, pill label, ordinal, and
// four-bullet checklist. Written inline (not iterated) because
// the icon SVGs and per-step content differ too much for a
// data array to be shorter or clearer.
//
// Responsive behaviour (mobile stacking, hidden connector
// lines, hidden ordinals below md) is handled by the
// pillar-flex / pillar-icon / pillar-line classes from
// src/index.css.
// ============================================================

export function HowItWorks() {
  return (
    <section className="shell py-8 border-t border-slate-100 learn-section lg:py-10 lg:pl-10">
      <h2 className="section-title text-2xl sm:text-[28px] mb-2">How It Works</h2>
      <p className="text-slate-600 text-[15px] mb-8 max-w-xl">
        A simple, step-by-step path that takes you from complete beginner to confident taxation professional — and
        then helps you get your first paying clients.
      </p>

      <div className="flex flex-col">
        {/* ============================================================
            Step 01 — Enroll & Get Instant Access
            ============================================================ */}
        <div className="relative flex gap-5 pillar-flex">
          {/* Left rail: icon + connector line */}
          <div className="flex flex-col items-center shrink-0 pillar-icon">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-blue-500 my-1 pillar-line" />
          </div>

          {/* Body + ordinal */}
          <div className="flex-1 pb-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                START HERE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Enroll &amp; Get Instant Access
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Secure your seat with the 90% discount (first 50 students only)
                </CheckItem>
                <CheckItem>Get instant access to your student dashboard</CheckItem>
                <CheckItem>
                  Receive your welcome kit: templates, checklists &amp; software guides
                </CheckItem>
                <CheckItem>Join the private community and meet your mentors</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              01
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 02 — Learn GST & Compliance Practically
            ============================================================ */}
        <div className="relative flex gap-5 pillar-flex">
          <div className="flex flex-col items-center shrink-0 pillar-icon">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6M9 11h6M9 15h3M6 3h9l3 3v15H6z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4h4" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-blue-500 my-1 pillar-line" />
          </div>

          <div className="flex-1 pb-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                MONTH 1
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Learn GST &amp; Compliance Practically
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Master GST registration, returns, ITC, E-Way Bill &amp; LUT filing
                </CheckItem>
                <CheckItem>Handle real GST notices and audit scenarios</CheckItem>
                <CheckItem>
                  Practice on actual government portals and accounting software
                </CheckItem>
                <CheckItem>Complete assignments that mirror real client work</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              02
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 03 — Master ITR, Accounting & Tax Planning
            ============================================================ */}
        <div className="relative flex gap-5 pillar-flex">
          <div className="flex flex-col items-center shrink-0 pillar-icon">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h4" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-blue-500 my-1 pillar-line" />
          </div>

          <div className="flex-1 pb-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                MONTH 2
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Master ITR, Accounting &amp; Tax Planning
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  File ITRs for salaried, business, professionals &amp; freelancers
                </CheckItem>
                <CheckItem>Learn legal tax planning that saves clients real money</CheckItem>
                <CheckItem>
                  Prepare balance sheets, P&amp;L and cash flow statements
                </CheckItem>
                <CheckItem>Handle income tax notices, TDS, TCS and advance tax</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              03
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 04 — Build Your Portfolio Website & Start Marketing
            ============================================================ */}
        <div className="relative flex gap-5 pillar-flex">
          <div className="flex flex-col items-center shrink-0 pillar-icon">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg
                className="w-5 h-5"
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
            </div>
            <div className="w-px flex-1 bg-blue-500 my-1 pillar-line" />
          </div>

          <div className="flex-1 pb-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                MONTH 3
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Build Your Portfolio Website &amp; Start Marketing
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Build your own professional tax services website (no coding needed)
                </CheckItem>
                <CheckItem>
                  Set up WhatsApp Business, LinkedIn &amp; social profiles
                </CheckItem>
                <CheckItem>Create your service packages and pricing structure</CheckItem>
                <CheckItem>Launch your first Facebook &amp; Instagram ad campaign</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              04
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 05 — Get Clients & Start Earning (no connector line)
            ============================================================ */}
        <div className="relative flex gap-5 pillar-flex">
          <div className="flex flex-col items-center shrink-0 pillar-icon">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </div>
            {/* No connector line on the last step — matches source. */}
          </div>

          <div className="flex-1 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                ONGOING
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Get Clients &amp; Start Earning
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Apply the client acquisition system to get inquiries from all over India
                </CheckItem>
                <CheckItem>
                  Onboard clients with ready-made proposals and agreements
                </CheckItem>
                <CheckItem>
                  Collect payments and deliver services with confidence
                </CheckItem>
                <CheckItem>
                  Build referrals and grow towards ₹1 lakh+/month income
                </CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Internal: single checklist item
   Used 4 times per step × 5 steps = 20 instances. The exact
   markup is identical each time (a filled blue check-circle
   SVG + text), so a file-local helper removes a lot of
   duplication without introducing a shared abstraction.
   ------------------------------------------------------------ */

import type { ReactNode } from "react";

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-[14.5px] text-slate-600">
      <svg className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </li>
  );
}