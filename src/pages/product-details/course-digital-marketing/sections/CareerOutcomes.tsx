// ============================================================
// src/pages/product-details/course-digital-marketing/sections/CareerOutcomes.tsx
// REUSE — same shell (story card + stat cards + paths list),
// content swapped to the six AdsAcademy outcomes.
// ============================================================

const CAREER_PATHS = [
  "Performance Marketer / PPC Specialist",
  "SEO & Content Strategist",
  "Social Media Manager",
  "Email & Automation Specialist",
  "Marketing Analytics Executive",
  "AI-Assisted Marketing Operations",
  "Growth / Funnel Manager",
  "Digital Marketing Executive",
];

const OUTCOMES = [
  "Run complete campaigns on Google Ads, Meta Ads and LinkedIn — set up, optimize, scale and report to clients.",
  "Rank content and drive organic traffic — keyword strategy to on-page optimization to link building.",
  "Build email funnels — segmentation, automation flows, A/B testing, deliverability.",
  "Use AI to work 10x faster — ChatGPT, Jasper, Surfer SEO and Canva AI, used throughout.",
  "Read analytics and decide with data — GA4, Meta Insights, SEMRush, Search Console.",
  "Build a portfolio that gets you hired — two internships, freelance projects, a capstone campaign.",
];

export function CareerOutcomes() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-indigo-600 font-bold text-sm tracking-wide mb-2">CAREER OUTCOMES</p>
        <h2 className="section-title text-2xl sm:text-[34px]">
          By the end, you won't just understand digital marketing.{" "}
          <span className="text-indigo-600">You'll execute it.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 career-grid">
        {/* LEFT — story card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 min-h-[360px] flex flex-col">
          <div className="flex gap-1.5 p-4">
            <span className="h-1 flex-1 rounded-full bg-white" />
            <span className="h-1 flex-1 rounded-full bg-white" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <svg className="w-28 h-28 text-white/15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>

          <div className="p-6 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white font-bold text-lg">Your Name Here</p>
            <p className="text-slate-300 text-sm flex items-center gap-2 mt-0.5">
              Digital Marketer
              <span className="bg-white text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded">
                JOB-READY
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT — outcomes + stat tiles + career paths */}
        <div className="flex flex-col gap-5">
          <ul className="grid sm:grid-cols-2 gap-4">
            {OUTCOMES.map((o, i) => (
              <li key={i} className="rounded-xl border border-slate-200 p-4 bg-white">
                <span className="text-[11px] font-extrabold text-indigo-600 tracking-wider">
                  0{i + 1}
                </span>
                <p className="text-slate-700 text-[13.5px] leading-relaxed mt-1.5">{o}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatTile label="Modules" value="15+" />
            <StatTile label="Tools" value="25+" />
            <StatTile label="Internships" value="2" note="Premium" />
            <StatTile label="Placement" value="₹6 LPA+" note="Premium" />
          </div>

          <div className="rounded-2xl bg-ink-950 text-white p-6">
            <p className="text-xs font-extrabold tracking-wider text-slate-400 mb-3">
              CAREER PATHS YOU CAN PURSUE
            </p>
            <div className="flex flex-wrap gap-2">
              {CAREER_PATHS.map((path) => (
                <span
                  key={path}
                  className="bg-white/10 text-[12px] font-semibold px-3 py-1.5 rounded-md"
                >
                  {path}
                </span>
              ))}
            </div>
            <p className="text-slate-500 text-[11.5px] mt-4">
              Roles depend on your background, portfolio and interview performance. These are common
              paths our students pursue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 text-white p-4">
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-indigo-100 text-[11px] font-semibold tracking-wide mt-1">
        {label}
        {note && <span className="text-amber-300"> ({note})</span>}
      </p>
    </div>
  );
}