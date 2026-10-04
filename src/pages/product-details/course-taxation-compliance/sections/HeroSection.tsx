// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/HeroSection.tsx
// Course 1 hero block.
//
// Ported 1:1 from the <section id="heroSection"> block in
// index.html: breadcrumb, badges, title, description, meta
// row, mode/duration/schedule pills, and the mobile-only
// sidebar card slot.
//
// On desktop, the sidebar card lives in a separate sticky
// column rendered by the parent page component. This section
// only renders the mobile slot (matching the `lg:hidden`
// wrapper in the source).
// ============================================================

import { Badge } from "../../../../components/common/Badge";
import { SidebarEnrollCard } from "../../../../components/product/SidebarEnrollCardx";

export function HeroSection() {
  return (
    <section
      id="heroSection"
      className="relative text-white lg:rounded-lg lg:mt-6 pt-7 pb-10 px-5 bg-ink-950 hero-padding min-md:ml-8"
    >
      {/* ---------- Breadcrumb ---------- */}
      <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-400 mb-6 breadcrumb">
        <a href="#" className="underline decoration-slate-600 hover:text-white">
          Home
        </a>
        <span>&gt;</span>
        <a href="#" className="underline decoration-slate-600 hover:text-white">
          Courses
        </a>
        <span>&gt;</span>
        <span className="text-slate-200">Complete Taxation &amp; Compliance Course</span>
      </nav>

      {/* ---------- Badges ---------- */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <Badge variant="bestseller">BEST-SELLER</Badge>
        <Badge variant="cohort">90% OFF FOR FIRST 50</Badge>
      </div>

      {/* ---------- Title ---------- */}
      <h1 className="text-[24px] sm:text-4xl lg:text-[34px] leading-[1.15] font-extrabold max-w-3xl hero-title">
        Complete Taxation &amp; Compliance Course 2026 — GST, ITR, Accounting &amp; Client Acquisition — Earn ₹1
        Lakh+/Month From Home
      </h1>

      {/* ---------- Description ---------- */}
      <p className="mt-5 text-slate-300 text-[15px] sm:text-base leading-relaxed max-w-2xl hero-desc">
        Master GST registration, GST returns, ITR filing, bookkeeping, tax planning, and business compliance —
        practically, step-by-step. But that's not all. We'll also teach you how to build your professional portfolio
        website, run ads, and get clients from all over India through Facebook, Instagram, LinkedIn, and WhatsApp.
        Skill se lekar portfolio, marketing aur clients tak — we'll set up your complete taxation business.
      </p>

      {/* ---------- Meta row ---------- */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm meta-row">
        {/* 120+ Lectures */}
        <span className="flex gap-2 text-slate-200">
          <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001.5.87l10-6a1 1 0 000-1.74l-10-6A1 1 0 004 3z" />
          </svg>
          120+ Lectures
        </span>

        {/* Hindi + English */}
        <span className="flex gap-2 text-slate-200">
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              d="M3 12h18M12 3c2.5 2.7 2.5 14.3 0 18M12 3c-2.5 2.7-2.5 14.3 0 18"
            />
          </svg>
          Hindi + English
        </span>

        {/* 4.9 (2,800+) */}
        <span className="flex gap-2 text-slate-200">
          <span className="flex items-center gap-0.5 text-amber-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.5 11.545.5 7.41l6.061-.88L10 1l3.439 5.53 6.061.88-5 4.135 1.378 6.545z" />
            </svg>
          </span>
          <span className="text-white font-semibold">4.9</span>
          <span className="text-slate-400">(2,800+)</span>
        </span>

        {/* 7 days Refund Window */}
        <span className="flex gap-2 text-slate-200">
          <svg
            className="w-4 h-4 text-emerald-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 3-6.7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v5h5" />
          </svg>
          <span>
            <strong className="text-white">7 days</strong> Refund Window
          </span>
        </span>
      </div>

      {/* ---------- Mode / Duration / Schedule pills ---------- */}
      <div className="mt-5 flex flex-wrap gap-3 pill-container">
        <span className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-200">
          <span className="text-slate-400">Mode:</span> Live + Recorded
        </span>
        <span className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-200">
          <span className="text-slate-400">Duration:</span> 3 Months
        </span>
        <span className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-200">
          <span className="text-slate-400">Schedule:</span> Mon - Fri (09:30 PM - 10:30 PM)
        </span>
      </div>

      {/* ---------- Mobile-only sidebar card ---------- */}
      <div className="lg:hidden mt-8">
        <div className="sidebar-card">
          <SidebarEnrollCard />
        </div>
      </div>
    </section>
  );
}