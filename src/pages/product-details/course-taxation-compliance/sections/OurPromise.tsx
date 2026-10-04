// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/OurPromise.tsx
// "Our Promise to You" section — dark block with a visual
// card on the left and copy + bullets + stats on the right.
//
// Ported 1:1 from the "OUR PROMISE" <section> in index.html.
//
// Note: this section reuses the `instructor-grid` class from
// src/index.css for its two-column responsive behaviour. That
// naming is a source-level detail (the class was originally
// written for the instructor block) but the source markup
// applies it here too, and changing the class name would
// diverge from the source. Preserved as-is.
// ============================================================

export function OurPromise() {
  return (
    <section className="bg-ink-950 text-white py-14 lg:py-20">
      <div className="shell grid lg:grid-cols-2 gap-10 lg:gap-16 items-center instructor-grid">
        {/* ============================================================
            LEFT: visual card
            ============================================================ */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-2xl border border-white/10 p-2">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
              {/* Brand mark */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="9" fill="#E31B54" />
                  <path d="M13 12L27 20L13 28V12Z" fill="white" />
                </svg>
                <span className="text-white font-bold text-sm">
                  TAXPRO <span className="text-brand-500">ACADEMY</span>
                </span>
              </div>

              {/* Shield-check icon */}
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 text-amber-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"
                  />
                </svg>
              </div>

              {/* Promise statement */}
              <p className="text-white font-extrabold text-lg sm:text-xl leading-snug max-w-xs">
                We don't just teach you taxation.
              </p>
              <p className="text-amber-300 font-extrabold text-lg sm:text-xl leading-snug max-w-xs mt-1">
                We stand behind you until you're earning.
              </p>

              {/* Bottom trust line */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-slate-300 text-[10px] tracking-wider font-semibold">
                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                BACKED BY OUR COMMITMENT
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            RIGHT: copy + bullets + stats + footnote
            ============================================================ */}
        <div className="order-1 lg:order-2">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6l-1.3-1.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            OUR PROMISE
          </span>

          {/* Heading + divider */}
          <h2 className="text-2xl sm:text-[34px] font-extrabold tracking-tight leading-tight">
            Our Promise to You
          </h2>
          <span className="block w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mt-4 mb-6" />

          <p className="text-slate-300 text-[15px] leading-relaxed mb-4">
            Enrolling in a course is a leap of faith. You're investing money, time, and trust — and you deserve to
            know exactly what we commit to in return. Here's ours, in plain language.
          </p>

          {/* Promise bullets */}
          <ul className="space-y-3.5 mb-8">
            <PromiseItem
              title="Practical training, not just theory"
              description="Every concept is taught on real portals and software — the same tools working professionals use daily."
            />
            <PromiseItem
              title="1:1 doubt support, not a dead-end forum"
              description="Weekly doubt-solving sessions and a private community where real mentors respond — not just other students."
            />
            <PromiseItem
              title="Curriculum kept current"
              description="Tax laws change. We update the course whenever GST, ITR, or compliance rules shift — at no extra cost to you."
            />
            <PromiseItem
              title="Refund policy you can actually rely on"
              description="If the course isn't what we promised, you can request a refund within the window described in our Refund Policy. No runaround."
            />
          </ul>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-white/10 pt-6 stats-grid">
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">&lt; 24h</p>
              <p className="text-slate-400 text-xs mt-1">Doubt Response Time</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">7 days</p>
              <p className="text-slate-400 text-xs mt-1">Refund Window*</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">Weekly</p>
              <p className="text-slate-400 text-xs mt-1">Live Doubt Sessions</p>
            </div>
            <div>
              <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold">Free</p>
              <p className="text-slate-400 text-xs mt-1">Curriculum Updates</p>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-slate-500 text-[11.5px] mt-5">
            *Full refund terms are described in our{" "}
            <a href="#" className="text-slate-300 underline hover:text-white transition">
              Pricing &amp; Refund Policy
            </a>
            . Please read before enrolling.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Internal: single promise bullet
   Used 4 times in this section. Same exact structure each
   time (emerald check-circle + bold title + description), so
   a file-local helper removes the repetition.
   ------------------------------------------------------------ */

interface PromiseItemProps {
  title: string;
  description: string;
}

function PromiseItem({ title, description }: PromiseItemProps) {
  return (
    <li className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
        <svg
          className="w-3.5 h-3.5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
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