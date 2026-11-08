// ============================================================
// src/pages/home/sections/HomeHero.tsx
// Static home-page hero.
//
// All content is hardcoded in this file — no props, no
// imports, no dependency on courses.ts, homeContent.ts, or
// any helper. Drop it into HomePage's render and it works
// as-is.
//
// Values match the taxation-compliance-2026 course data,
// but this file doesn't read from that data — it just uses
// the same values inline.
// ============================================================

import { Button } from "../../../components/common/Button";

export function HomeHero() {
  return (
    <section
      id="home"
      className="pt-12 relative overflow-hidden"
    >
      {/* ---------- Decorative SVGs (background layer) ---------- */}
      {/* Sparkle at 44% / 56px */}
      <svg
        aria-hidden="true"
        className="absolute text-yellow-warm pointer-events-none hidden lg:block"
        style={{ left: "43%", top: "150px" }}
        width="34"
        height="30"
        viewBox="0 0 34 30"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      >
        <path d="M4 4l6 6M18 2v9M30 8l-8 4" />
      </svg>

      {/* Dot grid at 18% / 70px */}
      <svg
        aria-hidden="true"
        className="absolute text-teal pointer-events-none hidden lg:block"
        style={{ right: "18%", top: "70px" }}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="8" cy="8" r="4" />
        <circle cx="32" cy="6" r="4" />
        <circle cx="56" cy="8" r="4" />
        <circle cx="8" cy="32" r="4" />
        <circle cx="32" cy="32" r="4" />
        <circle cx="56" cy="32" r="4" />
      </svg>

      <div className="mx-auto max-w-[1120px] px-6 lg:grid lg:grid-cols-[50%_50%] gap-1 items-end">
        {/* ============================================================
            LEFT: copy + CTAs + chips
            ============================================================ */}
        <div>
          <span className="inline-block border border-ink-950 text-ink-950 text-[11px] font-bold tracking-[0.08em] uppercase px-3.5 py-[7px] rounded-full mb-5">
            Practical taxation &amp; compliance learning
          </span>

          <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-[1.15] tracking-[-0.02em] text-slate-800 mb-5">
            <span className="text-teal-deep">GST &amp; ITR</span>{" "}
            skills that build a practice that{" "}
            <span className="text-brand-600">wins clients.</span>
          </h1>

          <p className="max-w-[460px] mb-7 text-slate-600 leading-[1.65]">
            Step-by-step training on real portals and software, plus the
            portfolio website, ads and outreach to get found by clients
            across India.
          </p>

          <div className="flex flex-wrap  gap-3.5 mb-6">
            

            <Button
                      variant="dark"
                    //   onClick={handleEnroll}
                      className="w-fit max-md:w-full py-3.5 px-4 text-[15px]"
                      color="blue-700"
                    >
                      Explore Courses ↗
                    </Button>
            
            <Button
                      variant="outline-primary"
                    //   onClick={handleEnroll}
                      className="w-fit max-md:w-full py-3.5 px-4 text-[15px]"
                    >
                      See How It Works →
                    </Button>
          </div>

          <div className="text-[13px] font-semibold text-ink-950 flex flex-wrap gap-y-2 gap-x-[18px] pb-5">
            <span className="before:content-[''] before:inline-block before:w-[7px] before:h-[7px] before:rounded-full before:bg-teal before:mr-[7px]">
              Proffessional certificate
            </span>
            <span className="before:content-[''] before:inline-block before:w-[7px] before:h-[7px] before:rounded-full before:bg-teal before:mr-[7px]">
              Live + Recorded
            </span>
            <span className="before:content-[''] before:inline-block before:w-[7px] before:h-[7px] before:rounded-full before:bg-teal before:mr-[7px]">
              Hindi + English
            </span>
          </div>
        </div>

        {/* ============================================================
            RIGHT: visual column
            ============================================================ */}
        <div className="relative min-h-[520px] max-lg:min-h-[360px] mt-8 lg:mt-0">
          {/* Blob (brand-pink organic shape behind the image) */}
          <div
            aria-hidden="true"
            className="absolute -right-[30px] bottom-0 w-[440px] h-[400px] max-lg:w-[340px] max-lg:h-[320px] max-lg:right-[-11px] bg-primary opacity-90 rounded-[58%_42%_12%_12%/60%_55%_0_0]"
          />

          {/* Hero image */}
          <img
            src={import.meta.env.BASE_URL + "images/home/heroSection.png"}
            alt="Student talking to a course advisor"
            className="absolute object-cover right-[0px] bottom-[-18px] h-[400px] w-full  max-lg:right-[0px] z-[2]"
            loading="lazy"
          />

          {/* Hashtag script (top-right, rotated) */}
          <span
            aria-hidden="true"
            className="max-lg:hidden absolute right-1.5 top-[150px] z-[4] text-[22px] text-ink-950 -rotate-[5deg] font-script font-bold"
          >
            #SkillSeIncomeTak ↙
          </span>

          {/* Floating preview card (bottom-left) */}
          {/* <div
            aria-label="Course preview"
            className="absolute left-0 bottom-14 z-[3] w-[270px] max-lg:w-[230px] bg-white border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(10,15,30,0.05),0_8px_24px_-12px_rgba(10,15,30,0.14)] p-4"
          >
            <b className="block text-[12px] text-ink-950 mb-2.5 font-bold">
              3 courses · one complete path
            </b>
            <div className="flex justify-between gap-2.5 text-[12px] px-2.5 py-2 rounded-[10px] mt-1.5 text-white font-semibold bg-rose-600">
              <span>GST &amp; Compliance</span>
              <span className="text-white font-medium whitespace-nowrap">
                8 modules
              </span>
            </div>
            <div className="flex justify-between gap-2.5 text-[12px] px-2.5 py-2 rounded-[10px] mt-1.5 text-white font-semibold bg-green-600">
              <span>ITR &amp; Accounting</span>
              <span className="text-white font-medium whitespace-nowrap">
                10 modules
              </span>
            </div>
            <div className="flex justify-between gap-2.5 text-[12px] px-2.5 py-2 rounded-[10px] mt-1.5 text-white font-semibold bg-yellow-soft">
              <span>Digital Marketing</span>
              <span className="text-white font-medium whitespace-nowrap">
                6 modules
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}