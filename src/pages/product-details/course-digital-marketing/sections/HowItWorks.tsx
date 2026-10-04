// ============================================================
// src/pages/product-details/course-digital-marketing/sections/HowItWorks.tsx
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
        A clear, five-step path from enrollment to placement — with internships and freelance
        projects running alongside your learning.
      </p>

      <div className="flex flex-col">
        {/* ============================================================
            Step 01 — Enroll & choose your plan
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
                Enroll &amp; choose your plan
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Pick Standard or Premium and join the batch
                </CheckItem>
                <CheckItem>Get instant access to your student dashboard</CheckItem>
                <CheckItem>
                  Join the private community and meet your mentors
                </CheckItem>
                <CheckItem>Receive your welcome kit and tool guides</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              01
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 02 — Foundation Phase
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
                  d="M12 6.5A5.5 5.5 0 006.5 3H3v15h4a5 5 0 015 5 5 5 0 015-5h4V3h-3.5A5.5 5.5 0 0012 6.5z"
                />
              </svg>
            </div>
            <div className="w-px flex-1 bg-blue-500 my-1 pillar-line" />
          </div>

          <div className="flex-1 pb-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                WEEKS 1–4
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Foundation Phase
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Core concepts and how the digital ecosystem works
                </CheckItem>
                <CheckItem>Marketing psychology and consumer behavior</CheckItem>
                <CheckItem>
                  Metrics that matter: CPM, CPC, CTR, ROAS, CAC, LTV
                </CheckItem>
                <CheckItem>Full toolstack orientation and account setup</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              02
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 03 — Execution Phase
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
                  d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"
                />
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
                Execution Phase
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Live campaigns across SEO, Google Ads, Meta Ads, email and content
                </CheckItem>
                <CheckItem>Real ad accounts, real briefs, real deliverables</CheckItem>
                <CheckItem>
                  Premium: Internship 1 begins mid-course
                </CheckItem>
                <CheckItem>Assignments reviewed by instructors</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              03
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 04 — Advanced + AI Phase
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
                  d="M12 3l1.9 5.8L20 10l-5 3.4L16.5 20 12 16.8 7.5 20 9 13.4 4 10l6.1-1.2z"
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
                Advanced + AI Phase
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Analytics, automation, AI tools and lead generation
                </CheckItem>
                <CheckItem>
                  Capstone campaign plan and portfolio build
                </CheckItem>
                <CheckItem>Premium: Internship 2 and placement prep begin</CheckItem>
                <CheckItem>Mock interviews, resume and LinkedIn revamp</CheckItem>
              </ul>
            </div>
            <span className="hidden md:block text-8xl font-black text-blue-200 leading-none select-none shrink-0">
              04
            </span>
          </div>
        </div>

        {/* ============================================================
            Step 05 — Portfolio, prep & placement window (no connector line)
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
                  d="M5 15l-1 4 4-1M14 4c3 0 6 3 6 6-3.5 3.5-8 6-10 6l-4-4c0-2 2.5-6.5 8-8z"
                />
                <circle cx="15" cy="9" r="1.5" />
              </svg>
            </div>
            {/* No connector line on the last step — matches source. */}
          </div>

          <div className="flex-1 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="badge-pill bg-blue-100 text-blue-700 mb-2.5 inline-block">
                POST-COURSE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Portfolio, prep &amp; placement window
              </h3>
              <ul className="space-y-2">
                <CheckItem>
                  Capstone review and portfolio presentation
                </CheckItem>
                <CheckItem>
                  Resume &amp; LinkedIn finalized with the placement team
                </CheckItem>
                <CheckItem>
                  Premium: 30-day placement window with active introductions
                </CheckItem>
                <CheckItem>
                  Standard: you apply independently with full portfolio support
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