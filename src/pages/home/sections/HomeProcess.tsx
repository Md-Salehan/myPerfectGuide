// ============================================================
// src/pages/home/sections/HomeProcess.tsx
// "How it works" process timeline, restyled in a Scaler + Meta look:
//   Scaler: white bordered square cards, big light numerals,
//           tracked uppercase labels, tight display heading.
//   Meta:   #0866FF blue accent, soft #F1F4F7 surface, rounded pill
//           chip, dark #1C2B33 text, timeline with blue nodes.
//
// Content is unchanged. Self-contained: no custom Tailwind tokens
// (all colours are arbitrary values), no props, no imports other
// than React's JSX runtime.
// ============================================================

const STEPS: readonly { title: string; text: string }[] = [
  {
    title: "Enroll",
    text: "Get instant access, a welcome kit of templates and checklists, and the private community.",
  },
  {
    title: "Learn",
    text: "Months 1–2: GST, ITR, accounting and tax planning on real portals.",
  },
  {
    title: "Build",
    text: "Month 3: your portfolio website, service packages and first ad campaign.",
  },
  {
    title: "Reach clients",
    text: "Ongoing: use the client acquisition system, proposals and onboarding formats.",
  },
] as const;

const EYEBROW = "How it works";
const SUBTEXT = "Four steps. Each one builds on the last.";

export function HomeProcess() {
  if (STEPS.length === 0) return null;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className=" font-['Manrope',ui-sans-serif,system-ui,sans-serif] text-[#1C2B33]"
    >
      <div className="mx-auto max-w-[1288px] px-5 py-[52px] sm:px-10 md:py-[72px] lg:px-[100px]">
        {/* ---------- Heading ---------- */}
        <span className="inline-flex items-center rounded-full bg-[#E7F3FF] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
          {EYEBROW}
        </span>
        <h2
          id="process-heading"
          className="mt-[18px] max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.035em] text-[#0b0b0f] sm:text-[44px] lg:text-[52px]"
        >
          A simple path from enrolment to results.
        </h2>
        <p className="mt-[18px] text-[18px] text-[#465A69] sm:text-[20px]">{SUBTEXT}</p>

        {/* ---------- Timeline ---------- */}
        <ol className="relative mt-[56px] grid grid-cols-1 gap-[21px] md:grid-cols-2 lg:mt-[72px] lg:grid-cols-4">
          {/* Connector line behind the nodes (lg+ only) */}
          {STEPS.length > 1 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[-27px] hidden h-px bg-[#CED0D4] lg:block"
            />
          )}

          {STEPS.map((step, i) => (
            <li key={`${step.title}-${i}`} className="relative">
              {/* Timeline node (Meta blue dot) */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[-33px] hidden h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-[#F1F4F7] bg-[#0866FF] ring-1 ring-[#0866FF] lg:block"
              />

              <article className="h-full border border-[#e4e4e7] bg-white p-[22px]">
                {/* Big numeral, Scaler stat-card style */}
                <p className="flex items-baseline gap-[6px] border-b border-[#e4e4e7] pb-[22px] pt-[10px]">
                  <span className="text-[56px] font-medium leading-none tracking-[-0.03em] text-[#111]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[20px] font-normal text-[#6b6b73]">Step</span>
                </p>

                <h3 className="mt-[24px] text-[22px] font-normal leading-tight text-[#111]">
                  {step.title}
                </h3>
                <p className="mt-[10px] text-[15px] leading-[1.6] text-[#465A69]">{step.text}</p>

                {/* Meta-style progress pill: shows position in the path */}
                <div className="mt-[22px] flex items-center gap-[6px]" aria-hidden="true">
                  {STEPS.map((_, d) => (
                    <span
                      key={d}
                      className={`h-[6px] rounded-full ${
                        d === i ? "w-[24px] bg-[#0866FF]" : "w-[6px] bg-[#CED0D4]"
                      }`}
                    />
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HomeProcess;