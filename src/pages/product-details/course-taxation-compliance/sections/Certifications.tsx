// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/Certifications.tsx
// Certifications section — purple block with dot pattern,
// copy + trust bullets on the left, certificate mockup image
// on the right.
//
// Ported 1:1 from the "CERTIFICATIONS" <section> in index.html.
//
// The section background is a specific dark purple (#241E5C)
// set via inline style in the source — preserved here to keep
// the exact colour.
// ============================================================

import { Button } from "../../../../components/common/Button";

export function Certifications() {
  return (
    <section
      className="relative overflow-hidden py-14 lg:py-0"
      style={{ backgroundColor: "#241E5C" }}
    >
      {/* Decorative dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern" />

      <div className="shell relative grid lg:grid-cols-2 gap-10 items-center certificate-grid">
        {/* ============================================================
            LEFT: copy + trust bullets + CTA
            ============================================================ */}
        <div className="md:py-20 py-8">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-rose-500/15 text-rose-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 01.894.553l1.382 2.764 3.05.443a1 1 0 01.555 1.706l-2.207 2.152.521 3.037a1 1 0 01-1.451 1.054L10 12.203l-2.744 1.506a1 1 0 01-1.451-1.054l.521-3.037-2.207-2.152a1 1 0 01.555-1.706l3.05-.443L9.106 2.553A1 1 0 0110 2z" />
            </svg>
            CERTIFICATIONS
          </span>

          {/* Heading */}
          <h2 className="text-white text-2xl sm:text-[34px] font-extrabold leading-tight tracking-tight">
            Industry-Recognized Taxation &amp; Compliance Certification
          </h2>

          {/* Intro paragraph */}
          <p className="text-indigo-200 text-[15px] leading-relaxed mt-5 max-w-md">
            Add this certificate to your CV or LinkedIn profile to enhance your professional credibility and attract
            more clients. It's proof that you've completed practical, industry-relevant training in GST, ITR,
            accounting, and client acquisition.
          </p>

          {/* Trust bullets */}
          <ul className="mt-6 space-y-3">
            <CertTrustItem>Shareable on LinkedIn, CV, and client proposals</CertTrustItem>
            <CertTrustItem>Instant digital delivery after course completion</CertTrustItem>
            <CertTrustItem>Unique certificate ID for verification</CertTrustItem>
          </ul>

          {/* CTA */}
          <Button href="#enroll" variant="dark" className="px-6 py-3.5 mt-7 text-sm">
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
          </Button>
        </div>

        {/* ============================================================
            RIGHT: certificate mockup
            ============================================================ */}
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

/* ------------------------------------------------------------
   Internal: single trust bullet
   Used 3 times in this section. Same exact structure (emerald
   check + text), so a tiny file-local helper removes the
   repetition without a shared abstraction.
   ------------------------------------------------------------ */

import type { ReactNode } from "react";
import { API_BASE_URL } from "../../../../constants/api";

function CertTrustItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-indigo-100 text-[14.5px]">
      <svg className="w-4 h-4 mt-1 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
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