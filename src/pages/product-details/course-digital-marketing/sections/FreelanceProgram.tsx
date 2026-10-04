// ============================================================
// src/pages/product-details/course-digital-marketing/sections/FreelanceProgram.tsx
// NEW SECTION — Premium's freelance opportunity program.
// The copy has a 5-step horizontal flow plus an "honest
// expectations" callout. The existing HowItWorks is a vertical
// timeline for the whole course; this sub-program needs its
// own horizontal step pattern and a visually distinct caveat
// block so the honest expectations aren't buried.
// ============================================================

const STEPS = [
  { n: 1, title: "Skill Up", body: "Complete the curriculum" },
  { n: 2, title: "Get Connected", body: "We match you with brands, agencies or startups" },
  { n: 3, title: "Get Briefed", body: "You get a real brief with goals, budget, timeline" },
  { n: 4, title: "Execute & Report", body: "You deliver with mentor guidance and build real metrics" },
  { n: 5, title: "Earn", body: "You earn agreed project fees" },
];

export function FreelanceProgram() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118L10.588 15.6a1 1 0 00-1.176 0l-3.365 2.447c-.783.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.064 9.382c-.782-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.955z" />
          </svg>
          PREMIUM
        </span>
        <h2 className="section-title text-2xl sm:text-[34px]">
          Earn while you learn — <span className="text-emerald-600">and build a portfolio that speaks for itself</span>
        </h2>
        <p className="text-slate-600 text-[15px] mt-3">
          Get access to real freelance projects with brands, manage campaigns, deliver, and earn
          while still in the program.
        </p>
      </div>

      {/* 5-step horizontal flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-3">
        {STEPS.map((step, idx) => (
          <div key={step.n} className="relative">
            <div className="card p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {step.n}
                </span>
                <p className="font-extrabold text-slate-900 text-[15px]">{step.title}</p>
              </div>
              <p className="text-slate-600 text-[13.5px] leading-relaxed">{step.body}</p>
            </div>
            {/* Connector arrow (sm+) */}
            {idx < STEPS.length - 1 && (
              <svg
                className="hidden sm:block absolute top-1/2 -right-2.5 -translate-y-1/2 w-4 h-4 text-slate-300 z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Honest expectations callout */}
      <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="flex items-start gap-3 text-[14px] text-amber-900 leading-relaxed">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span>
            <span className="font-bold">Honest expectations:</span> Freelance earnings depend on the
            projects you take on and the results you deliver. This is active, skill-based work, not
            passive income. We provide the connections, the structure and the guidance. You deliver
            the results.
          </span>
        </p>
      </div>
    </section>
  );
}