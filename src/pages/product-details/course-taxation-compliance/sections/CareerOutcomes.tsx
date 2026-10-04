// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/CareerOutcomes.tsx
// "Career Outcomes" section — a profile-preview story card on
// the left, and a stack of stat cards on the right.
//
// Ported 1:1 from the corresponding <section> in index.html.
// All content is static; no interactive state.
// ============================================================

export function CareerOutcomes() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      {/* ---------- Header ---------- */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-indigo-600 font-bold text-sm tracking-wide mb-2">CAREER OUTCOMES</p>
        <h2 className="section-title text-2xl sm:text-[34px]">
          Built for <span className="text-indigo-600">Students Who Aim Higher</span>
        </h2>
        <p className="text-slate-600 text-[15px] mt-3">
          This course doesn't just teach taxation — it teaches you how to turn that skill into a real, recurring
          income by getting paying clients.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 career-grid">
        {/* ============================================================
            LEFT: profile-preview story card
            ============================================================ */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 min-h-[360px] flex flex-col">
          {/* Top progress strip */}
          <div className="flex gap-1.5 p-4">
            <span className="h-1 flex-1 rounded-full bg-white" />
            <span className="h-1 flex-1 rounded-full bg-white" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
          </div>

          {/* Avatar placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <svg className="w-28 h-28 text-white/15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>

          {/* Bottom gradient overlay + text */}
          <div className="p-6 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white font-bold text-lg">Your Name Here</p>
            <p className="text-slate-300 text-sm flex items-center gap-2 mt-0.5">
              Independent Tax Consultant
              <span className="bg-white text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded">
                FROM HOME
              </span>
            </p>
          </div>
        </div>

        {/* ============================================================
            RIGHT: stat cards column
            ============================================================ */}
        <div className="flex flex-col gap-5">
          {/* Two gradient stat cards */}
          <div className="grid grid-cols-2 gap-5 career-stats-grid">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 text-white p-6">
              <p className="text-3xl sm:text-4xl font-extrabold">₹1 Lakh+</p>
              <p className="text-indigo-100 text-xs font-semibold tracking-wide mt-2">
                TARGET MONTHLY INCOME
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 text-white p-6">
              <p className="text-3xl sm:text-4xl font-extrabold">3 Months</p>
              <p className="text-indigo-100 text-xs font-semibold tracking-wide mt-2">
                TO JOB-READY SKILLS
              </p>
            </div>
          </div>

          {/* Dark service-types card */}
          <div className="rounded-2xl bg-ink-950 text-white p-6 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-slate-300 text-sm font-semibold leading-snug max-w-[200px]">
                THIS COURSE EQUIPS YOU TO SERVE
              </p>
              <p className="text-3xl font-extrabold mt-1">
                4+ <span className="text-xl font-bold">Service Types</span>
              </p>
            </div>
            <div className="flex -space-x-3">
              <div className="w-14 h-14 rounded-lg bg-slate-700 border-2 border-ink-950 flex items-center justify-center text-[9px] font-bold text-center leading-tight px-1">
                GST
                <br />
                Filing
              </div>
              <div className="w-14 h-14 rounded-lg bg-slate-600 border-2 border-ink-950 flex items-center justify-center text-[9px] font-bold text-center leading-tight px-1">
                ITR
                <br />
                Filing
              </div>
              <div className="w-14 h-14 rounded-lg bg-slate-500 border-2 border-ink-950 flex items-center justify-center text-[9px] font-bold text-center leading-tight px-1">
                Book-
                <br />
                keeping
              </div>
            </div>
          </div>

          {/* India-wide card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
            <p className="text-3xl font-extrabold mb-1">India-Wide</p>
            <p className="text-blue-100 text-xs font-semibold tracking-wide mb-4">
              CLIENT REACH VIA DIGITAL MARKETING
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                Facebook Ads
              </span>
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                Instagram Ads
              </span>
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                LinkedIn
              </span>
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                WhatsApp
              </span>
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                Google Ads
              </span>
              <span className="bg-white/15 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                Portfolio Website
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}