// ============================================================
// src/pages/product-details/course-digital-marketing/sections/ProofCohortResults.tsx
// MODIFIED from the taxation Testimonials section — the copy
// has one featured quote plus cohort stats, not three named
// student cards. Same light-bg, centered-header shell is
// preserved; the 3-card grid becomes a featured quote card
// followed by a stat tile strip.
// ============================================================

export function ProofCohortResults() {
  return (
    <section className="bg-slate-50 border-t border-slate-100 py-14 lg:py-20">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-rose-600 font-bold text-sm tracking-wide mb-3">
            SHAPING CAREERS SINCE 2022
          </p>
          <h2 className="section-title text-2xl sm:text-[34px] leading-tight">
            In digital marketing,{" "}
            <span className="text-rose-600">proof matters more than promises.</span>
          </h2>
        </div>

        {/* Featured quote */}
        <div className="max-w-3xl mx-auto card p-7 sm:p-9 text-center">
          <svg className="w-9 h-9 text-rose-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.983 3v7.391c0 5.209-3.973 7.61-6.965 8.609l-.997-1.522c2.997-.774 4.965-2.824 4.965-5.087h-3.986v-9.391h6.983zm14.017 0v7.391c0 5.209-3.973 7.61-6.965 8.609l-.997-1.522c2.997-.774 4.965-2.824 4.965-5.087h-3.986v-9.391h6.983z" />
          </svg>
          <p className="text-slate-800 text-lg sm:text-xl font-semibold leading-relaxed">
            "The placement support was real. I had three offers within 30 days of graduating."
          </p>
          <p className="text-slate-500 text-sm mt-4">
            <span className="font-bold text-slate-900">Priya M.</span> · Premium Graduate · Placed at ₹7.4 LPA · Batch 2024
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mt-10 max-w-4xl mx-auto">
          <StatTile value="92%" label="Placement rate" note="2024 Premium cohort" />
          <StatTile value="₹6.8L" label="Median CTC post-program" note="up from ₹2.4L" />
          <StatTile value="180%" label="Median salary hike" note="full-program completers" />
          <StatTile value="30 days" label="Avg. time to first offer" />
        </div>
      </div>
    </section>
  );
}

function StatTile({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="card p-5 text-center">
      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="text-slate-600 text-[13px] font-semibold mt-1.5">{label}</p>
      {note && <p className="text-slate-400 text-[11px] mt-0.5">{note}</p>}
    </div>
  );
}