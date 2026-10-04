// ============================================================
// src/pages/product-details/course-digital-marketing/sections/Certifications.tsx
// REUSE — same purple certificate block, content swapped.
// ============================================================

import type { ReactNode } from "react";
import { Button } from "../../../../components/common/Button";
import { API_BASE_URL } from "../../../../constants/api";

export function Certifications() {
  return (
    <section className="relative overflow-hidden py-14 lg:py-0" style={{ backgroundColor: "#241E5C" }}>
      <div className="absolute inset-0 dot-pattern" />

      <div className="shell relative grid lg:grid-cols-2 gap-10 items-center certificate-grid">
        <div className="md:py-20 py-8">
          <span className="inline-flex items-center gap-2 bg-rose-500/15 text-rose-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 01.894.553l1.382 2.764 3.05.443a1 1 0 01.555 1.706l-2.207 2.152.521 3.037a1 1 0 01-1.451 1.054L10 12.203l-2.744 1.506a1 1 0 01-1.451-1.054l.521-3.037-2.207-2.152a1 1 0 01.555-1.706l3.05-.443L9.106 2.553A1 1 0 0110 2z" />
            </svg>
            CERTIFICATION
          </span>

          <h2 className="text-white text-2xl sm:text-[34px] font-extrabold leading-tight tracking-tight">
            Proof of your skills, signed and verified.
          </h2>

          <p className="text-indigo-200 text-[15px] leading-relaxed mt-5 max-w-md">
            Every graduate gets an official certificate of completion, digitally issued, uniquely
            numbered and verifiable online. Add it to LinkedIn or any job application with
            confidence. Included in both plans.
          </p>

          <ul className="mt-6 space-y-3">
            <TrustItem>Watch 60% of course videos</TrustItem>
            <TrustItem>Complete 60% of quizzes and assignments</TrustItem>
            <TrustItem>Attend 60% of live sessions</TrustItem>
          </ul>

          <p className="text-indigo-300 text-[12.5px] mt-4">
            Features: Digitally issued · LinkedIn shareable · Online verifiable
          </p>

          <Button href="#enroll" variant="dark" className="px-6 py-3.5 mt-7 text-sm">
            Enroll Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </div>

        <div className="relative">
          <img
            src={API_BASE_URL + "/course-detail-asset/certificate-tax-course.png"}
            alt="Certificate Mockup"
            className="rounded-2xl w-full max-w-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-indigo-100 text-[14.5px]">
      <svg className="w-4 h-4 mt-1 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
      </svg>
      {children}
    </li>
  );
}