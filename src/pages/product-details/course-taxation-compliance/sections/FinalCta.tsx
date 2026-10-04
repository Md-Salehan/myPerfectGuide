// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/FinalCta.tsx
// Final CTA block — blue/indigo gradient, copy + bullets on
// the left, person image on the right.
//
// The "Request A Callback" button dispatches openCallback() and
// opens the callback modal. The "Enroll Now" anchor is a plain
// link, unchanged from the source.
//
// Note: the grid uses `items-bottom`, which is not a default
// Tailwind class (the correct one is `items-end`). Preserved
// from the source to keep the markup 1:1. If you want the
// intended alignment, change to `items-end`.
// ============================================================

import type { ReactNode } from "react";

import { useAppDispatch } from "../../../../app/hooks";
import { openCallback } from "../../../../features/callback/callbackSlice";
import { API_BASE_URL } from "../../../../constants/api";

export function FinalCta() {
  const dispatch = useAppDispatch();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 px-5 sm:px-14">
      <div className="shell grid lg:grid-cols-2 gap-10 items-bottom pt-14 lg:pt-20 cta-grid">
        {/* ============================================================
            LEFT: copy + bullets + CTAs
            ============================================================ */}
        <div className="text-white pb-14 lg:pb-20">
          <h2 className="text-2xl sm:text-[36px] font-extrabold leading-tight tracking-tight">
            Start Your Taxation Career Today — Earn ₹1 Lakh+/Month From Home
          </h2>

          <p className="mt-5 text-blue-100 font-medium">Talk to our Course Advisor to:</p>

          <ul className="mt-4 space-y-2.5">
            <AdvisorBullet>See if this course matches your current knowledge and goals</AdvisorBullet>
            <AdvisorBullet>Understand how you can get clients from all over India</AdvisorBullet>
            <AdvisorBullet>Learn about the 90% discount for the first 50 students</AdvisorBullet>
            <AdvisorBullet>Explore EMI options and batch schedules</AdvisorBullet>
          </ul>

          <div className="flex flex-wrap gap-3 mt-8">
            {/* Request A Callback — opens the callback modal */}
            <button
              type="button"
              onClick={() => dispatch(openCallback())}
              className="btn bg-white text-indigo-700 px-6 py-3.5 text-sm hover:bg-blue-50"
            >
              Request A Callback
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3.5A1.5 1.5 0 013.5 2h1.05a1.5 1.5 0 011.45 1.12l.6 2.4a1.5 1.5 0 01-.4 1.45l-1 1a11.5 11.5 0 005.83 5.83l1-1a1.5 1.5 0 011.45-.4l2.4.6A1.5 1.5 0 0117 14.45v1.05a1.5 1.5 0 01-1.5 1.5H14C7.37 17 2 11.63 2 5V3.5z" />
              </svg>
            </button>

            {/* Enroll Now — plain link, unchanged from the source */}
            <a
              href="#"
              className="btn border border-white/50 text-white px-6 py-3.5 text-sm hover:bg-white/10"
            >
              Enroll Now
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* ============================================================
            RIGHT: person image (lg+ only)
            ============================================================ */}
        <div className="relative hidden lg:flex justify-center">
          <img
            src={API_BASE_URL + "/course-detail-asset/person.png"}
            alt="Student talking to course advisor"
            className="relative z-10 w-[430px] max-w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Internal: single advisor bullet
   ------------------------------------------------------------ */

function AdvisorBullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-blue-50 text-[15px]">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
      {children}
    </li>
  );
}