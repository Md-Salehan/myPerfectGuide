// ============================================================
// src/pages/product-details/course-digital-marketing/sections/WhoThisIsFor.tsx
// REUSE — same 4-card gradient header grid, content swapped
// to the four AdsAcademy audience types.
// ============================================================

export function WhoThisIsFor() {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-2">Who This Is For</h2>
      <p className="text-slate-600 text-[15px] mb-7 max-w-xl">
        Whether you're starting from zero or adding a career skill, this program is built for
        people who want skills, proof and a path to income.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 project-grid">
        {/* 01 — Complete beginners */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">01</span>
            <svg className="w-12 h-12 text-white/90 relative" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.42a12 12 0 01.84 4.42c0 1.5-3.13 3-7 3s-7-1.5-7-3c0-1.55.3-3.05.84-4.42L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">FOR BEGINNERS</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">Complete beginners</h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>No experience needed — we start from the basics</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>If you can use a smartphone, you can start</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Structured learning path from zero to job-ready</li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">No Experience Needed</span>
              <span className="badge-pill">15 Weeks</span>
              <span className="badge-pill">Beginner Friendly</span>
            </div>
          </div>
        </div>

        {/* 02 — Self-starters */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">02</span>
            <svg className="w-12 h-12 text-white/90 relative" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">SKILLS FIRST</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">Self-starters (Standard plan)</h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Get the full curriculum and certificate at 50% off</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Find your own opportunities after graduating</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Ideal if you're confident in your own job search</li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">Standard Plan</span>
              <span className="badge-pill">50% Off</span>
              <span className="badge-pill">Self-Paced Career</span>
            </div>
          </div>
        </div>

        {/* 03 — Career-seekers */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">03</span>
            <svg className="w-12 h-12 text-white/90 relative" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">CAREER SUPPORT</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">Career-seekers (Premium plan)</h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Two real internships + a dedicated placement team</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Mock interviews, resume &amp; LinkedIn optimization</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Refund-backed ₹6 LPA placement promise</li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">Premium Plan</span>
              <span className="badge-pill">2 Internships</span>
              <span className="badge-pill">₹6 LPA Promise</span>
            </div>
          </div>
        </div>

        {/* 04 — Aspiring freelancers */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">04</span>
            <svg className="w-12 h-12 text-white/90 relative" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V7l6-4 6 4v14M10 12h4M10 16h4" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">EARN WHILE YOU LEARN</span>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">Aspiring freelancers (Premium plan)</h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Work on real brand briefs with agreed project fees</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Build a portfolio with real campaign metrics</li>
              <li className="flex gap-2"><span className="text-indigo-500 mt-0.5">•</span>Freelance access is part of the Premium plan</li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">Premium Plan</span>
              <span className="badge-pill">Real Briefs</span>
              <span className="badge-pill">Freelance Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}