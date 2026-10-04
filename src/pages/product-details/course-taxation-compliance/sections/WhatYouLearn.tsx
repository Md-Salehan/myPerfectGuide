// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/WhatYouLearn.tsx
// "What you'll learn" section — three sub-course cards, each
// with a cover image, title, meta line, curriculum link, and
// a two-column bullet list.
//
// Ported 1:1 from the "What you'll learn" <section> in
// index.html. Cards are written inline (not iterated from a
// data array) because each has a distinct image, distinct
// bullets, and distinct module count — a data-driven shape
// would push JSX markup into the data for no readability gain.
//
// Image paths preserve the source layout exactly:
//   - mobile/tablet source (< lg)
//   - desktop source (>= lg)
//   - fallback <img>
// All three reference files under /asset/, which Vite serves
// from the public folder.
// ============================================================

export function WhatYouLearn() {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-1">What you'll learn</h2>
      <p className="text-slate-500 text-[15px] mb-7">You get these 3 courses</p>

      <div className="space-y-5">
        {/* ============================================================
            Card 1 — Complete GST & Compliance Mastery 2026
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-sky-400 to-cyan-600">
              <picture>
                <source media="(max-width: 1023px)" srcSet={`${import.meta.env.BASE_URL}images/course-detail-asset/taxation/1_desk.png`} />
                <source media="(min-width: 1024px)" srcSet={`${import.meta.env.BASE_URL}images/course-detail-asset/taxation/1_mob.png`} />
                <img
                  src={`${import.meta.env.BASE_URL}images/course-detail-asset/taxation/1_desk.png`}
                  alt="Complete GST & Compliance Mastery course cover"
                  className="w-full h-full object-fit"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                Complete GST &amp; Compliance Mastery 2026
              </h3>
              <p className="text-sm text-slate-500 mt-1">1 Month · 8 Modules</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                Checkout the complete course curriculum here
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>GST Registration — end-to-end practical</Bullet>
                <Bullet>GST Returns — GSTR-1, GSTR-3B, GSTR-9, GSTR-9C</Bullet>
                <Bullet>LUT filing, ITC claims, E-Way Bill generation</Bullet>
                <Bullet>Handling GST notices &amp; replies</Bullet>
                <Bullet>Input Tax Credit optimization</Bullet>
                <Bullet>Composition scheme vs regular scheme</Bullet>
                <Bullet>Reverse charge mechanism</Bullet>
                <Bullet>GST audit &amp; annual return filing</Bullet>
                <Bullet>Real client scenarios &amp; case studies</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================
            Card 2 — ITR Filing, Accounting & Tax Planning Mastery 2026
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-emerald-400 to-green-700">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/itr-course-mobile.jpg" />
                <source media="(min-width: 1024px)" srcSet="/asset/itr-course-desktop.jpg" />
                <img
                  src="/asset/itr-course-desktop.jpg"
                  alt="ITR Filing, Accounting & Tax Planning Mastery course cover"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                ITR Filing, Accounting &amp; Tax Planning Mastery 2026
              </h3>
              <p className="text-sm text-slate-500 mt-1">1 Month · 10 Modules</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                Checkout the complete course curriculum here
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>ITR filing for salaried, business, professionals, freelancers</Bullet>
                <Bullet>Income Tax Act basics to advanced</Bullet>
                <Bullet>TDS, TCS, advance tax calculations</Bullet>
                <Bullet>Bookkeeping &amp; accounting fundamentals</Bullet>
                <Bullet>Balance sheet, P&amp;L, cash flow preparation</Bullet>
                <Bullet>Legal tax planning to save clients' money</Bullet>
                <Bullet>Tax notices &amp; assessment handling</Bullet>
                <Bullet>Business compliance (ROC, MSME, etc.)</Bullet>
                <Bullet>Real client case studies &amp; practice</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================
            Card 3 — Digital Marketing & Client Acquisition System 2026
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-fuchsia-500 to-purple-700">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/marketing-course-mobile.jpg" />
                <source media="(min-width: 1024px)" srcSet="/asset/marketing-course-desktop.jpg" />
                <img
                  src="/asset/marketing-course-desktop.jpg"
                  alt="Digital Marketing & Client Acquisition System course cover"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                Digital Marketing &amp; Client Acquisition System 2026
              </h3>
              <p className="text-sm text-slate-500 mt-1">1 Month · 6 Modules</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                Checkout the complete course curriculum here
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>Build your professional portfolio website (no coding needed)</Bullet>
                <Bullet>Create high-converting Facebook &amp; Instagram ads</Bullet>
                <Bullet>LinkedIn outreach &amp; personal branding for tax professionals</Bullet>
                <Bullet>WhatsApp Business setup &amp; automated client follow-ups</Bullet>
                <Bullet>Google Ads basics for local &amp; India-wide client acquisition</Bullet>
                <Bullet>Pricing your services &amp; creating service packages</Bullet>
                <Bullet>Client onboarding, proposals &amp; payment collection</Bullet>
                <Bullet>Build a referral system &amp; retain clients long-term</Bullet>
                <Bullet>Real ad campaigns &amp; client acquisition case studies</Bullet>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Internal: single bullet item
   Shared by all three cards. Each bullet is a <li> with a
   check icon and a text label — 27 instances across the
   section, so extracting this small helper removes a lot of
   near-identical markup without introducing indirection.
   ------------------------------------------------------------ */

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm text-slate-600">
      <svg
        className="w-4 h-4 mt-0.5 text-slate-400 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </li>
  );
}