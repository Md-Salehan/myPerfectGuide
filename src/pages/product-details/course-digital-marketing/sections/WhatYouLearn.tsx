// ============================================================
// src/pages/product-details/course-digital-marketing/sections/WhatYouLearn.tsx
// "What you'll learn" section — four phase cards, each
// with a cover image, title, meta line, curriculum link, and
// a two-column bullet list.
//
// Cards are written inline (not iterated from a data array)
// because each has a distinct image, distinct bullets, and
// distinct module range — a data-driven shape would push JSX
// markup into the data for no readability gain.
//
// Image paths preserve the source layout exactly:
//   - mobile/tablet source (< lg)
//   - desktop source (>= lg)
//   - fallback <img>
// Placeholder asset paths and gradient backgrounds are used
// since the copy has no per-phase cover images yet.
// ============================================================

export function WhatYouLearn() {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-1">What you'll learn</h2>
      <p className="text-slate-500 text-[15px] mb-7">
        4 phases, 15+ modules · Live + recorded · Real campaign projects · AI tools integrated · Capstone project
      </p>

      <div className="space-y-5">
        {/* ============================================================
            Card 1 — Phase 1: Foundations & Marketing Psychology
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-sky-400 to-cyan-600">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/phase-1-mobile.png" />
                <source media="(min-width: 1024px)" srcSet="/asset/phase-1-desktop.png" />
                <img
                  src="/asset/phase-1-desktop.png"
                  alt="Phase 1 — Foundations & Marketing Psychology cover"
                  className="w-full h-full object-fit"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                Foundations &amp; Marketing Psychology
              </h3>
              <p className="text-sm text-slate-500 mt-1">Modules 1–2</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                View detailed module list →
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>How the digital ecosystem works: search, social, email</Bullet>
                <Bullet>Buyer's journey and consumer touchpoints</Bullet>
                <Bullet>Key metrics: CPM, CPC, CTR, ROAS, CAC, LTV</Bullet>
                <Bullet>How platform algorithms work</Bullet>
                <Bullet>Why people buy: cognitive biases and emotional triggers</Bullet>
                <Bullet>AIDA, PAS and StoryBrand frameworks, applied to campaigns</Bullet>
                <Bullet>Scarcity, social proof, authority, reciprocity</Bullet>
                <Bullet>Writing for different buyer awareness stages</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================
            Card 2 — Phase 2: Core Channels
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-emerald-400 to-green-700">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/phase-2-mobile.png" />
                <source media="(min-width: 1024px)" srcSet="/asset/phase-2-desktop.png" />
                <img
                  src="/asset/phase-2-desktop.png"
                  alt="Phase 2 — Core Channels cover"
                  className="w-full h-full object-fit"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                Core Channels
              </h3>
              <p className="text-sm text-slate-500 mt-1">Modules 3–7</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                View detailed module list →
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>SEO: keyword research, on-page, technical SEO, link building</Bullet>
                <Bullet>Google Ads: Search, Display, YouTube; match types, Quality Score, Smart Bidding</Bullet>
                <Bullet>Meta Ads: Business Manager, pixel, audiences, creatives, cold/warm/retargeting funnels</Bullet>
                <Bullet>Social media marketing: platform strategy, content calendars, community, LinkedIn for B2B</Bullet>
                <Bullet>Content marketing: strategy, SEO blogs, video scripting, repurposing</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================
            Card 3 — Phase 3: Convert, Automate & Measure
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-fuchsia-500 to-purple-700">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/phase-3-mobile.png" />
                <source media="(min-width: 1024px)" srcSet="/asset/phase-3-desktop.png" />
                <img
                  src="/asset/phase-3-desktop.png"
                  alt="Phase 3 — Convert, Automate & Measure cover"
                  className="w-full h-full object-fit"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                Convert, Automate &amp; Measure
              </h3>
              <p className="text-sm text-slate-500 mt-1">Modules 8–11</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                View detailed module list →
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>Email marketing: sequences, segmentation, A/B testing (Mailchimp, Klaviyo, HubSpot)</Bullet>
                <Bullet>Lead generation: lead magnets, landing pages, CRO, Meta Lead Ads, Google Lead Forms</Bullet>
                <Bullet>Analytics &amp; reporting: GA4, attribution, Looker Studio dashboards, client-ready reports</Bullet>
                <Bullet>Marketing automation: trigger-based sequences, CRM integration, lead scoring basics</Bullet>
              </ul>
            </div>
          </div>
        </div>

        {/* ============================================================
            Card 4 — Phase 4: AI, Tools & Real Execution
            ============================================================ */}
        <div className="card p-5 sm:p-6 course-card">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-44 rounded-xl overflow-hidden shrink-0 aspect-video bg-gradient-to-br from-amber-400 to-orange-600">
              <picture>
                <source media="(max-width: 1023px)" srcSet="/asset/phase-4-mobile.png" />
                <source media="(min-width: 1024px)" srcSet="/asset/phase-4-desktop.png" />
                <img
                  src="/asset/phase-4-desktop.png"
                  alt="Phase 4 — AI, Tools & Real Execution cover"
                  className="w-full h-full object-fit"
                  loading="lazy"
                />
              </picture>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-slate-900 break-words">
                AI, Tools &amp; Real Execution
              </h3>
              <p className="text-sm text-slate-500 mt-1">Modules 12–15</p>
              <a
                href="#"
                className="text-indigo-600 text-sm font-semibold mt-2 inline-block hover:underline"
              >
                View detailed module list →
              </a>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <Bullet>AI tools: ChatGPT, Jasper, Canva AI, Surfer SEO, Frase; AI-assisted workflows that save 10+ hours a week</Bullet>
                <Bullet>Industry tools masterclass: Search Console + GA4 + GTM, SEMRush/Ahrefs/MOZ, Buffer/Later/Hootsuite, Shopify marketing, Wati, Power BI</Bullet>
                <Bullet>Practical campaign execution: launch a full Google Ads campaign and Meta funnel, audit real ad accounts</Bullet>
                <Bullet>Capstone &amp; career readiness: end-to-end campaign plan, portfolio, resume, LinkedIn, mock interviews</Bullet>
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
   Shared by all four cards. Each bullet is a <li> with a
   check icon and a text label — 21 instances across the
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