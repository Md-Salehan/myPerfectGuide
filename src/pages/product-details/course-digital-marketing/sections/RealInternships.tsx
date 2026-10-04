// ============================================================
// src/pages/product-details/course-digital-marketing/sections/RealInternships.tsx
// NEW SECTION — Premium's two real internships, presented as
// a side-by-side comparison table. No existing section has a
// parallel 2-column comparison layout, and this is the core
// Premium differentiator.
//
// Design language: matches the existing dark/indigo solution
// cards and the amber-bordered highlight card. Uses the same
// card, badge-pill, and section-title classes as the rest of
// the page.
// ============================================================

const INTERNSHIPS = [
  {
    label: "Internship 1 — Mid-Course (Months 1–2)",
    focus: "SEO, content and social media focus",
    rows: [
      "Real company brief and deliverables",
      "Supervised by AdsAcademy mentors",
      "Certificate of completion",
      "Builds confidence before placement",
    ],
  },
  {
    label: "Internship 2 — Pre-Placement (near completion)",
    focus: "Performance marketing, campaign management and analytics",
    rows: [
      "Campaign execution + analytics tracking and reporting",
      "Interview-ready portfolio piece",
      "Exposure to agency or brand workflow",
      "Directly aligned to placement roles",
    ],
  },
];

export function RealInternships() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118L10.588 15.6a1 1 0 00-1.176 0l-3.365 2.447c-.783.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.363-1.118L2.064 9.382c-.782-.57-.38-1.81.588-1.81h4.161a1 1 0 00.95-.69l1.286-3.955z" />
          </svg>
          EXCLUSIVE TO PREMIUM
        </span>
        <h2 className="section-title text-2xl sm:text-[34px]">
          2 real internships — <span className="text-indigo-600">while you're still in the program</span>
        </h2>
        <p className="text-slate-600 text-[15px] mt-3">
          Not after graduation. Not someday. Two structured internships with real companies, with
          real briefs and deliverables.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {INTERNSHIPS.map((internship, idx) => (
          <div
            key={internship.label}
            className={`relative rounded-2xl p-7 sm:p-9 flex flex-col overflow-hidden ${
              idx === 0
                ? "bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 text-white"
                : "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 text-white"
            }`}
          >
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex flex-col flex-1">
              <span className="inline-flex items-center gap-2 self-start bg-white/15 backdrop-blur-sm text-white text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4 border border-white/20">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {internship.label}
              </span>

              <p className="text-white font-extrabold text-lg leading-snug mb-4">
                {internship.focus}
              </p>

              <ul className="space-y-3">
                {internship.rows.map((row) => (
                  <li key={row} className="flex gap-3 text-blue-50 text-[14px] leading-relaxed">
                    <svg className="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-xl bg-slate-900 text-white p-5 max-w-3xl mx-auto">
        <p className="text-slate-300 text-[14.5px] leading-relaxed">
          <span className="font-bold text-white">Why two matter:</span> Hiring managers weigh real
          work experience above certificates. Two internship certificates, plus the deliverables
          behind them, give you something concrete to talk about in every interview.
        </p>
      </div>
    </section>
  );
}