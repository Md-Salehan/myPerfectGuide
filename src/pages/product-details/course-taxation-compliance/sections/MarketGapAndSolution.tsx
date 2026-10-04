// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/MarketGapAndSolution.tsx
// Two-column "The Market Gap" vs "The Solution" section.
//
// Ported 1:1 from the corresponding <section> in index.html.
// Left card: light slate treatment with warning eyebrow,
// three bullets, and a dark callout. Right card: indigo
// gradient with dot pattern overlay, three numbered steps,
// and a CTA.
//
// Both cards are written inline (no data-driven iteration)
// because every block of copy and every bullet is one-off.
// ============================================================

export function MarketGapAndSolution() {
  return (
    <section className="shell py-14 lg:py-20 border-t border-slate-100">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* ============================================================
            LEFT: THE MARKET GAP
            ============================================================ */}
        <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-7 sm:p-9 flex flex-col">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 self-start bg-slate-200 text-slate-700 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            THE MARKET GAP
          </span>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Anyone Can File a Return.{" "}
            <span className="text-slate-400">Almost Nobody Can Save a Client Money.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-slate-600 text-[15px] leading-relaxed mt-5 font-medium">
            Filing is a commodity, priced like one. Legal tax-saving is what clients pay for, stay for, and talk about
            — and it's exactly where the market has a shortage, not a surplus.
          </p>

          {/* Body */}
          <div className="text-slate-600 text-[15px] leading-relaxed mt-5 space-y-4">
            <p>
              Every business needs GST registration, returns, ITC management, E-Way Bills and compliance. Every
              salaried employee wants to know how to legally reduce their tax outgo. Every freelancer and
              self-employed professional needs ITR filing and guidance on managing variable income. That's not a niche
              — that's nearly every working person in India.
            </p>
            <p>
              But look at what the market actually offers them. Walk into most tax consultants and you get the same
              service: last year's numbers, put in the right boxes, submitted on time, a few thousand rupees changing
              hands. The client's tax bill is whatever it was always going to be. Nothing was saved, because nothing
              was planned — and nothing about that experience gives the client a reason to recommend you over the next
              filer down the road.
            </p>
            <p className="font-semibold text-slate-800">
              That's the gap in this market. Thousands of people can file a return. Very few can look at a client's
              income, structure and timing and show them — legally — how to keep more of what they earn. The ones who
              can aren't competing with anyone. They're the market leaders in their space, because there's almost no
              one else offering what they offer.
            </p>
          </div>

          {/* Supporting bullets */}
          <div className="mt-7 pt-6 border-t border-slate-200">
            <p className="text-[11px] font-extrabold tracking-wider text-slate-500 mb-4">
              WHY LEGAL TAX-SAVING BUILDS MARKET LEADERSHIP
            </p>

            <div className="space-y-4">
              {/* Bullet 1 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-[14.5px]">
                    A filer competes on price. A planner competes on nothing.
                  </p>
                  <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                    Once you've legally saved a client ₹50,000 in tax, your fee stops being an expense and becomes a
                    return on investment. You've left the crowded, price-driven end of the market entirely.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-[14.5px]">
                    Planning is what makes clients stay, year after year.
                  </p>
                  <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                    Filing is a once-a-year transaction anyone can replace. Legal tax-saving is an ongoing relationship
                    built on money you put back in the client's pocket — and it renews itself automatically.
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-[14.5px]">
                    Saved money is the only referral engine that runs on its own.
                  </p>
                  <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                    Nobody tells a friend about an accountant who filed correctly and on time. Everyone tells a friend
                    about the one who legally cut their tax bill — which is how the few genuine tax planners in any
                    market end up known by name, while everyone else stays interchangeable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Closing callout */}
          <div className="mt-7 rounded-xl bg-slate-900 text-white p-5">
            <p className="text-slate-300 text-[14.5px] leading-relaxed">
              <span className="font-bold text-white">So why doesn't everyone learn it?</span> Because almost nobody
              teaches it. Most courses teach you what GSTR-3B is, not how to actually file one — and they go nowhere
              near how to legally structure a client's income and deductions to reduce what they owe. That single
              skill gap is what keeps the market for genuine tax planners this thin.
            </p>
          </div>
        </div>

        {/* ============================================================
            RIGHT: THE SOLUTION
            ============================================================ */}
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 text-white p-7 sm:p-9 flex flex-col overflow-hidden">
          {/* Decorative dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative flex flex-col flex-1">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 self-start bg-white/15 backdrop-blur-sm text-white text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-5 border border-white/20">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              THE SOLUTION
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              We Train You to Be the Person Who{" "}
              <span className="text-amber-300">Saves Them Money</span> — Not Just the One Who Files
            </h2>

            {/* Subheadline */}
            <p className="text-blue-100 text-[15px] leading-relaxed mt-5 font-medium">
              Compliance gets you in the door. Legal tax-saving is what makes you the name clients recommend — and what
              makes you the market leader instead of one of the crowd.
            </p>

            {/* Sequence */}
            <div className="mt-7 space-y-3">
              <p className="text-[11px] font-extrabold tracking-wider text-blue-200 mb-3">
                THE SEQUENCE THAT TURNS YOU INTO A SOUGHT-AFTER PROFESSIONAL
              </p>

              {/* Step 1 */}
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex gap-4">
                <span className="w-8 h-8 rounded-lg bg-white text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <p className="font-bold text-white text-[15px]">
                    Master the compliance work — done properly
                  </p>
                  <p className="text-blue-100 text-[13.5px] leading-relaxed mt-1">
                    GST and ITR, executed reliably, so clients trust the basics are covered.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex gap-4">
                <span className="w-8 h-8 rounded-lg bg-white text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <p className="font-bold text-white text-[15px]">
                    Learn the skill almost nobody teaches — legal tax-saving
                  </p>
                  <p className="text-blue-100 text-[13.5px] leading-relaxed mt-1">
                    Show businesses, salaried employees, and freelancers how to legally reduce what they owe. This is
                    what separates a replaceable filing service from a trusted advisor.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex gap-4">
                <span className="w-8 h-8 rounded-lg bg-white text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <p className="font-bold text-white text-[15px]">
                    Get in front of the people who need it
                  </p>
                  <p className="text-blue-100 text-[13.5px] leading-relaxed mt-1">
                    A professional portfolio, ads, and outreach that reaches clients across India — not just your own
                    neighbourhood.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing punchline */}
            <div className="mt-7 pt-6 border-t border-white/20">
              <p className="text-white text-lg sm:text-xl font-extrabold leading-snug">
                Skill that legally saves clients money. Proof that you can do it. A way to be found.
              </p>
              <p className="text-blue-100 text-[14.5px] leading-relaxed mt-3">
                That's what turns a course completion into{" "}
                <span className="text-amber-300 font-semibold">market leadership</span>.
              </p>
            </div>

            {/* CTA */}
            <a
              href="#curriculum"
              className="btn bg-white text-indigo-700 hover:bg-blue-50 px-6 py-3.5 mt-7 self-start text-sm font-bold"
            >
              See the Full Curriculum
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}