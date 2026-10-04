// ============================================================
// src/pages/product-details/course-digital-marketing/sections/PlacementProgram.tsx
// NEW SECTION — Premium's dedicated placement team and
// 5-step process. OurPromise covers the refund terms; this
// section covers the actual placement work, which needs to be
// communicated separately so neither hides the other.
// ============================================================

const CAPABILITIES = [
  {
    title: "Hiring network access",
    body: "Introductions to partners actively hiring digital marketers.",
  },
  {
    title: "Resume & LinkedIn optimization",
    body: "Reviewed and refined by our placement team before you apply.",
  },
  {
    title: "Mock interviews",
    body: "Practice rounds on your answers, portfolio presentation and technical questions.",
  },
  {
    title: "Career guidance",
    body: "Which roles suit you, how to negotiate, how to position your internship experience.",
  },
];

const PROCESS = [
  "Course completion + portfolio review",
  "Resume & LinkedIn",
  "Mock interviews",
  "Introductions to hiring partners",
  "Job offer of ₹6 LPA+ within 30 days, or full Placement fee refund",
];

export function PlacementProgram() {
  return (
    <section className="bg-ink-950 text-white py-14 lg:py-20">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4 border border-white/20">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            PREMIUM PLACEMENT
          </span>
          <h2 className="text-2xl sm:text-[34px] font-extrabold tracking-tight leading-tight">
            A dedicated placement team. A real hiring network.{" "}
            <span className="text-amber-300">A concrete salary target.</span>
          </h2>
          <p className="text-slate-300 text-[15px] mt-4">
            We work with agencies, D2C brands, SaaS companies and marketing teams that hire digital
            marketers, and we don't stop until we place you.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-white text-[15px] mb-1.5">{cap.title}</p>
              <p className="text-slate-400 text-[13px] leading-relaxed">{cap.body}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[11px] font-extrabold tracking-wider text-slate-400 mb-5">
            THE PLACEMENT PROCESS
          </p>
          <ol className="space-y-3">
            {PROCESS.map((step, idx) => (
              <li key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="w-8 h-8 rounded-lg bg-amber-400 text-amber-950 font-extrabold text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-slate-200 text-[14.5px] font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}