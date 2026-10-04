// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/WhoThisIsFor.tsx
// "Who This Is For" section — heading + subheading and a
// responsive 2-column grid of four audience cards.
//
// Ported 1:1 from the corresponding <section> in index.html.
// Each card has a distinct gradient, icon, title, bullets, and
// pill set, so they are written inline rather than iterated
// from a data array (which would push JSX markup into data for
// no readability benefit).
// ============================================================

export function WhoThisIsFor() {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-2">Who This Is For</h2>
      <p className="text-slate-600 text-[15px] mb-7 max-w-xl">
        This course is built for anyone who wants to earn from home by mastering taxation and compliance — no degree
        required, only 3 months of focused effort.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 project-grid">
        {/* ============================================================
            Audience 01 — Students & Freshers
            ============================================================ */}
        <div className="card overflow-hidden flex flex-col project-card">
          {/* Coloured header block */}
          <div className="relative h-36 bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">
              01
            </span>
            <svg
              className="w-12 h-12 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l6.16-3.42a12 12 0 01.84 4.42c0 1.5-3.13 3-7 3s-7-1.5-7-3c0-1.55.3-3.05.84-4.42L12 14z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">
              FOR BEGINNERS
            </span>
          </div>

          {/* Body */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">
              Students &amp; Freshers Wanting Income Without a Degree
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                No B.Com, CA, or accounting background required — start from zero
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Learn a practical skill in 3 months that pays more than most degrees
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Work from home and serve clients across India with just a laptop
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">No Experience Needed</span>
              <span className="badge-pill">3 Months</span>
              <span className="badge-pill">Work From Home</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            Audience 02 — Working Professionals
            ============================================================ */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">
              02
            </span>
            <svg
              className="w-12 h-12 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"
              />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">
              SIDE INCOME
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">
              Working Professionals Seeking a Side Income
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Weekend live classes that fit around your full-time job
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Build a second income stream without quitting your job
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Grow towards ₹1 lakh+/month by serving just a handful of clients
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">Weekend Classes</span>
              <span className="badge-pill">Flexible</span>
              <span className="badge-pill">₹1L+ Potential</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            Audience 03 — Accountants & Tax Professionals
            ============================================================ */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">
              03
            </span>
            <svg
              className="w-12 h-12 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">
              SCALE UP
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">
              Accountants &amp; Tax Professionals Wanting to Scale
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Stop depending on referrals — get clients through digital marketing
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Build a professional portfolio website and run ads that convert
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Package your services, raise your fees, and scale beyond your city
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">Client Acquisition</span>
              <span className="badge-pill">Digital Marketing</span>
              <span className="badge-pill">Higher Fees</span>
            </div>
          </div>
        </div>

        {/* ============================================================
            Audience 04 — Freelancers & Business Owners
            ============================================================ */}
        <div className="card overflow-hidden flex flex-col project-card">
          <div className="relative h-36 bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center overflow-hidden">
            <span className="absolute -left-2 -top-4 text-[80px] font-black text-white/15 select-none">
              04
            </span>
            <svg
              className="w-12 h-12 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M6 21V7l6-4 6 4v14M10 12h4M10 16h4"
              />
            </svg>
            <span className="absolute bottom-3 left-4 badge-pill bg-white/15 text-white">
              SELF-RELIANT
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3">
              Freelancers &amp; Business Owners Managing Their Own Taxes
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 mb-4">
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                File your own GST and ITR without paying expensive consultants
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Understand legal tax planning to keep more of what you earn
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 mt-0.5">•</span>
                Stay compliant with ROC, MSME, and other business requirements
              </li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="badge-pill">GST Filing</span>
              <span className="badge-pill">ITR</span>
              <span className="badge-pill">Compliance</span>
              <span className="badge-pill">Bookkeeping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}