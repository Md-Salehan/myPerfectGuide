// ============================================================
// src/pages/product-details/course-digital-marketing/sections/FinalCta.tsx
// REUSE — same blue gradient CTA, content swapped. Keeps the
// callback modal dispatch and the secondary "Chat on WhatsApp"
// action from the AdsAcademy copy.
// ============================================================

import type { ReactNode } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { openCallback } from "../../../../features/callback/callbackSlice";
import { API_BASE_URL } from "../../../../constants/api";

export function FinalCta() {
  const dispatch = useAppDispatch();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 px-5 sm:px-14">
      <div className="shell grid lg:grid-cols-2 gap-10 items-end pt-14 lg:pt-20 cta-grid">
        <div className="text-white pb-14 lg:pb-20">
          <h2 className="text-2xl sm:text-[36px] font-extrabold leading-tight tracking-tight">
            New batch seats are filling. Start your marketing career with skills, proof and a team behind you.
          </h2>

          <p className="mt-5 text-blue-100 font-medium">
            Premium seats are capped each batch to protect the quality of internship placement and
            career support.
          </p>

          <ul className="mt-4 space-y-2.5">
            <AdvisorBullet>See which plan fits you</AdvisorBullet>
            <AdvisorBullet>Understand the internships and placement promise</AdvisorBullet>
            <AdvisorBullet>Check the batch schedule</AdvisorBullet>
          </ul>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              type="button"
              onClick={() => dispatch(openCallback())}
              className="btn bg-white text-indigo-700 px-6 py-3.5 text-sm hover:bg-blue-50"
            >
              Reserve Your Seat Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <a
              href="https://wa.me/"
              className="btn border border-white/50 text-white px-6 py-3.5 text-sm hover:bg-white/10"
            >
              Chat on WhatsApp
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2z" />
              </svg>
            </a>
          </div>
        </div>

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

function AdvisorBullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-blue-50 text-[15px]">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
      {children}
    </li>
  );
}