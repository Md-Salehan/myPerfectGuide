// ============================================================
// src/pages/product-details/course-digital-marketing/sections/OurPromise.tsx
// MODIFIED — the AdsAcademy "Promise" is a placement promise
// with a refund policy, not a generic trust block. Same dark
// shell and 2-col layout are preserved, but the left visual
// card and right copy are rewritten around the ₹6 LPA promise
// and the three refund triggers from the copy.
// ============================================================

const REFUND_TRIGGERS = [
  {
    title: "No offer within 30 days",
    description:
      "No full-time offer of ₹6 LPA+ through our network within 30 days of course completion.",
  },
  {
    title: "Offer below ₹6 LPA",
    description:
      "We connect you with an employer but the offer is under ₹6 LPA. Sub-threshold offers don't count.",
  },
  {
    title: "You find a job on your own",
    description:
      "Through contacts, LinkedIn, job portals or referrals. You only pay for what we deliver.",
  },
];

export function OurPromise() {
  return (
    <section className="bg-ink-950 text-white py-14 lg:py-20">
      <div className="shell grid lg:grid-cols-2 gap-10 lg:gap-16 items-center instructor-grid">
        {/* LEFT: visual card */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl border border-white/10 p-2">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="9" fill="#E31B54" />
                  <path d="M13 12L27 20L13 28V12Z" fill="white" />
                </svg>
                <span className="text-white font-bold text-sm">
                  ADS<span className="text-brand-500">ACADEMY</span>
                </span>
              </div>

              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
                </svg>
              </div>

              <p className="text-white font-extrabold text-lg sm:text-xl leading-snug max-w-xs">
                Like a delivery guarantee —
              </p>
              <p className="text-amber-300 font-extrabold text-lg sm:text-xl leading-snug max-w-xs mt-1">
                but for your career.
              </p>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-slate-300 text-[10px] tracking-wider font-semibold">
                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
                </svg>
                BACKED BY OUR COMMITMENT
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: copy + refund triggers + stat tiles */}
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clipRule="evenodd" />
            </svg>
            THE PLACEMENT PROMISE
          </span>

          <h2 className="text-2xl sm:text-[34px] font-extrabold tracking-tight leading-tight">
            Like a delivery guarantee — but for your career.
          </h2>
          <span className="block w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mt-4 mb-6" />

          <p className="text-slate-300 text-[15px] leading-relaxed mb-4">
            We believe in the program enough to put real money on it. If we don't place you in a
            full-time job of ₹6 LPA or higher through our placement network within 30 days of course
            completion, you get your Placement fee back. Here are the exact terms, in plain English.
          </p>

          <p className="text-[11px] font-extrabold tracking-wider text-slate-400 mb-3">
            WHAT COUNTS AS A SUCCESSFUL PLACEMENT (BOTH MUST BE TRUE)
          </p>
          <ol className="space-y-2 mb-6 text-[13.5px] text-slate-300">
            <li className="flex gap-2.5">
              <span className="text-emerald-400 font-bold">1.</span>
              The job is sourced through our placement network and direct efforts, not a job portal,
              referral or contact you found yourself.
            </li>
            <li className="flex gap-2.5">
              <span className="text-emerald-400 font-bold">2.</span>
              The offered package is ₹6 LPA or higher.
            </li>
          </ol>

          <p className="text-[11px] font-extrabold tracking-wider text-slate-400 mb-3">
            YOU GET YOUR PLACEMENT FEE REFUNDED IF
          </p>
          <ul className="space-y-3.5 mb-8">
            {REFUND_TRIGGERS.map((t) => (
              <PromiseItem key={t.title} title={t.title} description={t.description} />
            ))}
          </ul>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-4 mb-6">
            <p className="text-emerald-300 font-bold text-[14px] mb-1">
              Your ₹10,000 is protected.
            </p>
            <p className="text-slate-300 text-[13.5px] leading-relaxed">
              Premium costs ₹10,000 more than Standard, which is exactly our Placement &amp;
              Internship fee. If we don't deliver the 2 internships or the ₹6 LPA placement, you get
              the full ₹10,000 back. The refund applies to the Placement &amp; Internship fee only,
              not the ₹4,999 course fee.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-6 stats-grid">
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">₹6 LPA+</p>
              <p className="text-slate-400 text-xs mt-1">Promise threshold</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">30 days</p>
              <p className="text-slate-400 text-xs mt-1">Placement window</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">100%</p>
              <p className="text-slate-400 text-xs mt-1">Placement fee refund</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">₹10,000</p>
              <p className="text-slate-400 text-xs mt-1">Protected fee</p>
            </div>
          </div>

          <p className="text-slate-500 text-[11.5px] mt-5">
            Eligibility: Premium placement support is for students who complete the program and
            actively take part in career-prep sessions. Specific conditions are shared at enrollment.
          </p>
        </div>
      </div>
    </section>
  );
}

function PromiseItem({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <div>
        <p className="text-white font-semibold text-[15px]">{title}</p>
        <p className="text-slate-400 text-[13.5px] leading-relaxed mt-0.5">{description}</p>
      </div>
    </li>
  );
}