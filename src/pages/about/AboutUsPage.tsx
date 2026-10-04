// ============================================================
// src/pages/about/AboutUsPage.tsx
// About Us page — full page composed of ten sections.
// ============================================================

import type { ReactNode } from "react";


// ============================================================
// Page
// ============================================================

export function AboutUsPage() {
  return (
    <div className="relative bg-white">
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <WhatWeOffer />
      <WhyLearnWithUs />
      <WhoItsFor />
      <OurApproach />
      <OurCommitment />
      {/* FIX 7: renamed local FinalCta -> AboutFinalCta to avoid
          name collision with the course-detail page's FinalCta. */}
      <AboutFinalCta />
    </div>
  );
}

// ============================================================
// 1. HERO
// ============================================================

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 about-hero-grid opacity-[0.15]" />
      <div className="pointer-events-none absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="shell relative py-20 lg:py-28">
        <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-200 text-[11px] font-extrabold tracking-wider px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ABOUT US
        </span>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <h1 className="text-[28px] sm:text-4xl lg:text-[46px] leading-[1.1] font-extrabold tracking-tight max-w-3xl">
              We teach the skills that actually{" "}
              <span className="text-brand-500">change how you earn.</span>
            </h1>

            <p className="mt-6 text-slate-300 text-[15px] sm:text-base leading-relaxed max-w-2xl">
              We're an EdTech platform built around practical, skill-based learning. Our courses
              help you build a business, grow a career, start freelancing, or develop the
              real-world skills that modern work actually demands — not just certificates.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Practical learning",
                "Industry-relevant skills",
                "Career & business outcomes",
                "Beginner-friendly",
                "100% online",
              ].map((label) => (
                <li
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-lg px-3.5 py-1.5 text-[13px] text-slate-200"
                >
                  {label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              {/* FIX 1: `Button` is a <button> primitive and doesn't
                  accept `href`. Use a plain <a> for navigation,
                  matching the course-detail page's convention. */}
              <a
                href="#explore-courses"
                className="btn bg-brand-500 text-white px-6 py-3.5 text-sm font-bold hover:bg-brand-600 inline-flex items-center gap-2"
              >
                Explore Courses
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </a>

              <a
                href="#our-approach"
                className="btn border border-white/25 text-white px-6 py-3.5 text-sm font-bold hover:bg-white/10"
              >
                How We Teach
              </a>
            </div>
          </div>

          {/* Visual — stat panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-2">
              <div className="rounded-xl bg-gradient-to-br from-indigo-700 via-blue-800 to-ink-950 p-7">
                <p className="text-[11px] font-extrabold tracking-wider text-blue-200">
                  OUR FOCUS
                </p>
                <p className="text-white text-xl sm:text-2xl font-extrabold leading-snug mt-3 max-w-sm">
                  Learning that turns into something you can actually use.
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-8 pt-6 border-t border-white/10">
                  {/* FIX 4: shortened values so the 2x2 grid stays
                      visually balanced (long words like "Beginner"
                      and "Applied" broke the numeric rhythm). */}
                  <HeroStat value="10+" label="Skill categories" />
                  <HeroStat value="100%" label="Online & flexible" />
                  <HeroStat value="All" label="Skill levels welcome" />
                  <HeroStat value="Real" label="World focus" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-emerald-400 text-2xl sm:text-3xl font-extrabold leading-none">
        {value}
      </p>
      <p className="text-slate-400 text-xs mt-1.5">{label}</p>
    </div>
  );
}

// ============================================================
// 2. WHO WE ARE
// ============================================================

function WhoWeAre() {
  return (
    <section className="shell py-16 lg:py-24 border-t border-slate-100">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionEyebrow tone="indigo">WHO WE ARE</SectionEyebrow>
          <h2 className="section-title text-2xl sm:text-[34px] mt-3">
            A modern EdTech platform for people who want to{" "}
            <span className="text-indigo-600">do more with what they learn.</span>
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="text-slate-600 text-[15px] leading-relaxed space-y-4">
            <p>
              We are a skill-development platform that focuses on practical, industry-relevant
              education. Instead of teaching concepts in isolation, our programs are designed
              around what learners actually need to do — file a return, run a campaign, build a
              website, manage a business, land a role, or start freelancing.
            </p>
            <p>
              Our catalog spans business, technology, finance, marketing, and professional
              development. Whether someone is just starting out or looking to sharpen an existing
              skill, our goal is the same: make the learning usable from day one.
            </p>
            <p className="font-semibold text-slate-800">
              We're not here to hand out certificates. We're here to help people build capability
              they can apply — in a job, in a business, or on their own.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <Pillar
              title="Practical first"
              description="Every course is built around real tasks, tools, and outcomes."
            />
            <Pillar
              title="Industry-relevant"
              description="Curriculum reflects what's actually used in the field today."
            />
            <Pillar
              title="Accessible"
              description="Online, flexible, and beginner-friendly by design."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({ title, description }: { title: string; description: string }) {
  return (
    <div className="card p-5">
      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
        <svg
          className="w-4 h-4 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-bold text-slate-900 text-[15px]">{title}</p>
      <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1.5">{description}</p>
    </div>
  );
}

// ============================================================
// 3 + 4. MISSION & VISION
// ============================================================

function MissionVision() {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-16 lg:py-24">
      <div className="shell grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Mission */}
        <div className="relative rounded-2xl bg-white border border-slate-200 p-7 sm:p-10 flex flex-col">
          <span className="inline-flex items-center gap-2 self-start bg-emerald-50 text-emerald-700 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-5">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            OUR MISSION
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Make practical education accessible — and genuinely useful.
          </h3>

          <p className="text-slate-600 text-[15px] leading-relaxed mt-5">
            Our mission is to close the gap between what people learn and what they can actually
            do. We focus on skills that translate directly into careers, businesses, and
            independent income — and we make those skills accessible to anyone willing to put in
            the work.
          </p>

          <ul className="mt-7 space-y-3.5">
            <MissionItem>
              Teach skills that are applicable from day one, not just theoretical.
            </MissionItem>
            <MissionItem>
              Keep programs affordable, flexible, and beginner-friendly.
            </MissionItem>
            <MissionItem>
              Focus on outcomes — capability, not just completion.
            </MissionItem>
          </ul>
        </div>

        {/* Vision */}
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 text-white p-7 sm:p-10 flex flex-col overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative flex flex-col flex-1">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              OUR VISION
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              A community of skilled, confident, and independent professionals.
            </h3>

            <p className="text-blue-100 text-[15px] leading-relaxed mt-5">
              We envision a future where learners don't have to choose between education and
              real-world application. Our goal is to help build a generation of professionals and
              entrepreneurs who are self-reliant, continuously learning, and equipped to create
              their own opportunities.
            </p>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white text-lg sm:text-xl font-extrabold leading-snug">
                Skills that open doors — and the confidence to walk through them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
        <svg
          className="w-3.5 h-3.5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-slate-700 text-[14.5px] leading-relaxed">{children}</span>
    </li>
  );
}

// ============================================================
// 5. WHAT WE OFFER
// ============================================================

interface OfferCategory {
  title: string;
  description: string;
  courses: string[];
  accent: string;
  icon: ReactNode;
}

const OFFER_CATEGORIES: OfferCategory[] = [
  {
    title: "Business & Management",
    description:
      "Programs for people who want to run, grow, or manage a business more effectively.",
    courses: ["MBA & Business Management", "Entrepreneurship", "Import & Export Business"],
    accent: "from-indigo-500 to-blue-700",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18M6 21V7l6-4 6 4v14M10 12h4M10 16h4"
        />
      </svg>
    ),
  },
  {
    title: "Finance & Taxation",
    description:
      "Practical training in compliance, filing, and financial skills used every day.",
    courses: ["Taxation & GST", "ITR & Accounting", "Tax Planning"],
    accent: "from-emerald-500 to-green-700",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
      </svg>
    ),
  },
  {
    title: "Marketing",
    description:
      "Learn how to reach, attract, and convert audiences across modern digital channels.",
    courses: ["Digital Marketing", "Facebook & Instagram Ads", "Google Ads"],
    accent: "from-fuchsia-500 to-purple-700",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5a2 2 0 104 0 2 2 0 00-4 0zM3 19a2 2 0 104 0 2 2 0 00-4 0zM17 19a2 2 0 104 0 2 2 0 00-4 0zM7 17l4-8M17 17l-4-8"
        />
      </svg>
    ),
  },
  {
    title: "Technology",
    description:
      "Build technical skills in programming, data, and modern software development.",
    courses: ["Web Development", "Machine Learning", "Artificial Intelligence", "Programming"],
    accent: "from-sky-500 to-blue-700",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
      </svg>
    ),
  },
  {
    title: "Career Development",
    description:
      "Skills that help you switch careers, freelance independently, or grow professionally.",
    courses: ["Freelancing", "Client Acquisition", "Professional Skills"],
    accent: "from-amber-500 to-orange-600",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        />
      </svg>
    ),
  },
  {
    title: "Entrepreneurship",
    description:
      "For people who want to build something of their own — from idea to execution.",
    courses: ["Business Building", "Import & Export", "Growth & Strategy"],
    accent: "from-rose-500 to-red-600",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        />
      </svg>
    ),
  },
];

function WhatWeOffer() {
  return (
    <section id="explore-courses" className="shell py-16 lg:py-24 border-t border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-12">
        {/* FIX 3: use SectionEyebrow for consistent size/weight,
            instead of relying on a bare heading. */}
        <SectionEyebrow tone="indigo" center>
          WHAT WE OFFER
        </SectionEyebrow>
        <h2 className="section-title text-2xl sm:text-[34px] mt-3">
          Courses across the skills that matter most
        </h2>
        <p className="text-slate-600 text-[15px] mt-4">
          From finance and marketing to technology and entrepreneurship — our programs are
          organized around real career and business outcomes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OFFER_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="card p-6 flex flex-col hover:shadow-lg transition-shadow"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.accent} text-white flex items-center justify-center mb-5`}
            >
              {cat.icon}
            </div>

            <h3 className="font-bold text-slate-900 text-lg leading-snug">{cat.title}</h3>
            <p className="text-slate-600 text-[14px] leading-relaxed mt-2">
              {cat.description}
            </p>

            <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2">
              {cat.courses.map((course) => (
                <li
                  key={course}
                  className="flex items-center gap-2 text-[13.5px] text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-500 text-[13.5px] mt-8">
        And a growing catalog of other practical, skill-based professional programs.
      </p>
    </section>
  );
}

// ============================================================
// 6. WHY LEARN WITH US
// ============================================================

const WHY_ITEMS: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Practical, application-focused learning",
    description:
      "Courses are built around doing, not just watching. You work with real tools, tasks, and scenarios.",
    icon: <WhyIconPath d="M9 12l2 2 4-4M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />,
  },
  {
    title: "Industry-relevant skills",
    description:
      "Curriculum reflects what's actually being used in modern roles and businesses today.",
    icon: <WhyIconPath d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    title: "Beginner-friendly programs",
    description:
      "No prior background required for most courses. Start from the fundamentals and build up.",
    icon: <WhyIconPath d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.42a12 12 0 01.84 4.42c0 1.5-3.13 3-7 3s-7-1.5-7-3c0-1.55.3-3.05.84-4.42L12 14zM12 14v7" />,
  },
  {
    title: "Career-oriented learning",
    description:
      "Skills that help you get hired, get promoted, or move into a new field with confidence.",
    icon: <WhyIconPath d="M3 17l6-6 4 4 8-8M14 7h7v7" />,
  },
  {
    title: "Business-oriented learning",
    description:
      "For owners and operators who want to run things better, smarter, and more profitably.",
    icon: <WhyIconPath d="M3 21h18M6 21V7l6-4 6 4v14M10 12h4M10 16h4" />,
  },
  {
    title: "Freelancing opportunities",
    description:
      "Learn how to package your skills, find clients, and build independent income streams.",
    icon: <WhyIconPath d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "Flexible online learning",
    description:
      "Learn at your own pace, from anywhere, with access to course material when you need it.",
    icon: <WhyIconPath d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z" />,
  },
  {
    title: "Diverse course options",
    description:
      "From taxation to technology, marketing to management — a catalog built for many paths.",
    icon: <WhyIconPath d="M4 6h16M4 12h16M4 18h16" />,
  },
];

function WhyIconPath({ d }: { d: string }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function WhyLearnWithUs() {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-16 lg:py-24">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionEyebrow tone="emerald" center>
            WHY LEARN WITH US
          </SectionEyebrow>
          <h2 className="section-title text-2xl sm:text-[34px] mt-3">
            Built for learners who want to apply what they learn
          </h2>
          <p className="text-slate-600 text-[15px] mt-4">
            Every decision we make — from curriculum to format — is guided by one question: will
            this help someone do something meaningful with the skill?
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ITEMS.map((item) => (
            <div
              key={item.title}
              className="card p-5 flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-[15px] leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-600 text-[13.5px] leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 7. WHO OUR COURSES ARE FOR
// ============================================================

const AUDIENCE: { title: string; description: string }[] = [
  {
    title: "Students",
    description:
      "Build practical skills alongside your studies and graduate with more than just a degree.",
  },
  {
    title: "Working professionals",
    description:
      "Sharpen existing skills, add new ones, and position yourself for better opportunities.",
  },
  {
    title: "Entrepreneurs",
    description:
      "Learn what you need to launch, run, and grow a business without hiring for every role.",
  },
  {
    title: "Business owners",
    description:
      "Take more control of your operations, finances, marketing, and compliance.",
  },
  {
    title: "Freelancers",
    description:
      "Package your skills, find clients, and build a sustainable independent income.",
  },
  {
    title: "Career switchers",
    description:
      "Move into a new field with focused, practical training instead of a long formal degree.",
  },
  {
    title: "Anyone learning for themselves",
    description:
      "Develop new skills for personal growth, curiosity, or future opportunities.",
  },
];

function WhoItsFor() {
  return (
    <section className="shell py-16 lg:py-24 border-t border-slate-100">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* FIX 6: removed `lg:sticky lg:top-8` — the right column
            is shorter than the left at most breakpoints, so the
            sticky effect never engages and produces a small
            "jump" when the section scrolls past. */}
        <div className="lg:col-span-5">
          <SectionEyebrow tone="rose">WHO IT'S FOR</SectionEyebrow>
          <h2 className="section-title text-2xl sm:text-[34px] mt-3">
            If you want to <span className="text-rose-600">build something</span>, this is for you.
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed mt-5">
            Our courses are designed for a wide range of learners — but they share one thing in
            common: they want to turn knowledge into capability.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {AUDIENCE.map((item, i) => (
              <div
                key={item.title}
                className="card p-5 flex gap-4 hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl font-black text-slate-200 leading-none select-none shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px]">{item.title}</h3>
                  <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 8. OUR APPROACH TO LEARNING
// ============================================================

const APPROACH_STEPS = [
  {
    step: "Learn",
    description:
      "Start with clear, structured lessons that build understanding from the ground up.",
    accent: "from-sky-500 to-blue-700",
  },
  {
    step: "Practice",
    description:
      "Apply what you've learned through exercises, assignments, and real tools.",
    accent: "from-emerald-500 to-green-700",
  },
  {
    step: "Apply",
    description:
      "Use your skills in real-world scenarios — at work, in your business, or with clients.",
    accent: "from-indigo-500 to-blue-700",
  },
  {
    step: "Grow",
    description:
      "Keep building, keep improving, and turn your skills into long-term opportunity.",
    accent: "from-fuchsia-500 to-purple-700",
  },
];

function OurApproach() {
  return (
    <section
      id="our-approach"
      className="bg-ink-950 text-white py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="shell relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* FIX 3 (cont.): use SectionEyebrow for consistency.
              The dark variant needs a light-text tone override,
              so we add a `dark` prop rather than inlining. */}
          <SectionEyebrow tone="brand" center dark>
            OUR APPROACH
          </SectionEyebrow>
          <h2 className="text-2xl sm:text-[34px] font-extrabold tracking-tight leading-tight">
            Learning that goes beyond{" "}
            <span className="text-brand-500">just consuming content.</span>
          </h2>
          <p className="text-slate-300 text-[15px] mt-4 leading-relaxed">
            Our philosophy is simple: knowledge becomes valuable when it's applied. That's why
            every course is structured around a four-step path.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPROACH_STEPS.map((step, i) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center text-white font-extrabold text-sm mb-5`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-white font-extrabold text-lg">{step.step}</h3>
              <p className="text-slate-300 text-[14px] leading-relaxed mt-2">
                {step.description}
              </p>

              {/* FIX 5: connector arrow was sitting half-behind
                  the next card because gap-5 (20px) is barely
                  wider than the arrow (20px), and -right-3 pushes
                  it out of the gap. Repositioned to sit cleanly
                  centered in the gap. */}
              {i < APPROACH_STEPS.length - 1 && (
                <svg
                  className="hidden lg:block absolute top-1/2 -right-[22px] w-5 h-5 text-white/30 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-[14px] mt-10 max-w-xl mx-auto">
          The goal isn't to finish a course. It's to finish with something you can actually use.
        </p>
      </div>
    </section>
  );
}

// ============================================================
// 9. OUR COMMITMENT
// ============================================================

function OurCommitment() {
  return (
    <section className="shell py-16 lg:py-24 border-t border-slate-100">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionEyebrow tone="emerald">OUR COMMITMENT</SectionEyebrow>
          <h2 className="section-title text-2xl sm:text-[34px] mt-3">
            Relevant, accessible, and{" "}
            <span className="text-emerald-600">always improving.</span>
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed mt-5">
            We're committed to building education that stays useful. That means keeping our
            curriculum current, listening to learners, and continually raising the standard of what
            we offer.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <CommitmentCard
            title="Relevant curriculum"
            description="We update courses as tools, practices, and industry expectations change — so what you learn stays useful."
          />
          <CommitmentCard
            title="Accessible learning"
            description="Online, flexible, and beginner-friendly. We believe practical education should be within reach for anyone willing to learn."
          />
          <CommitmentCard
            title="Continuous improvement"
            description="We actively improve our programs based on learner feedback and real-world outcomes."
          />
          <CommitmentCard
            title="Honest positioning"
            description="We don't promise guaranteed jobs or income. We focus on teaching real skills that give you the best possible chance to succeed."
          />
        </div>
      </div>
    </section>
  );
}

function CommitmentCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card p-5 flex gap-4">
      <span className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
        <svg
          className="w-4 h-4 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <div>
        <h3 className="font-bold text-slate-900 text-[15px]">{title}</h3>
        <p className="text-slate-600 text-[14px] leading-relaxed mt-1">{description}</p>
      </div>
    </div>
  );
}

// ============================================================
// 10. FINAL CTA
// ============================================================

function AboutFinalCta() {
  return (
    // FIX 2: removed `px-5 sm:px-14` from the section — the
    // inner `shell` already provides horizontal padding, and
    // double-padding caused the content to be over-indented
    // on tablet/desktop relative to every other section.
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800">
      <div className="shell py-16 lg:py-24 text-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white max-w-3xl mx-auto">
          Start developing skills you can actually use.
        </h2>

        <p className="mt-5 text-blue-100 text-[15px] sm:text-base max-w-xl mx-auto leading-relaxed">
          Whether you're building a business, growing a career, or starting to freelance — explore
          our courses and find the next skill worth learning.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-9">
          {/* FIX 1 (cont.): `Button` doesn't accept `href`.
              Use a plain <a> with btn styling. */}
          <a
            href="/courses"
            className="btn bg-white text-indigo-700 px-6 py-3.5 text-sm font-bold hover:bg-blue-50 inline-flex items-center gap-2"
          >
            Explore Courses
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </a>

          <a
            href="/contact"
            className="btn border border-white/50 text-white px-6 py-3.5 text-sm font-bold hover:bg-white/10"
          >
            Talk to Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Shared internal: section eyebrow
// ============================================================

function SectionEyebrow({
  children,
  tone = "indigo",
  center = false,
  dark = false,
}: {
  children: ReactNode;
  tone?: "indigo" | "emerald" | "rose" | "amber" | "brand";
  center?: boolean;
  dark?: boolean;
}) {
  const toneMap: Record<string, string> = {
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
    amber: "text-amber-600",
    brand: "text-brand-500",
  };

  return (
    <p
      className={`text-sm font-bold tracking-wide ${toneMap[tone]} ${
        center ? "text-center" : ""
      } ${dark ? "bg-white/5 border border-white/10 inline-block px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider text-slate-200" : ""}`}
    >
      {children}
    </p>
  );
}