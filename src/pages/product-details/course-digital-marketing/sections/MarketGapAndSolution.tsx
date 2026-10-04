// ============================================================
// src/pages/product-details/course-digital-marketing/sections/MarketGapAndSolution.tsx
// REUSE — same two-column "problem vs solution" shell, copy
// swapped to "The Real Problem" / "How We Solve It".
// ============================================================

export function MarketGapAndSolution() {
    return (
        <section className="shell py-14 lg:py-20 border-t border-slate-100">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                {/* LEFT — THE REAL PROBLEM */}
                <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-7 sm:p-9 flex flex-col">
                    <span className="inline-flex items-center gap-2 self-start bg-slate-200 text-slate-700 text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        THE REAL PROBLEM
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        You can watch a hundred tutorials and still not know how to run a campaign that works.
                    </h2>

                    <p className="text-slate-600 text-[15px] leading-relaxed mt-5 font-medium">
                        The gap isn't motivation or talent. It's structured practice, real experience, and career
                        support that doesn't end when the course does.
                    </p>

                    <div className="mt-7 pt-6 border-t border-slate-200 space-y-5">
                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-[14.5px]">The Knowledge Gap</p>
                                <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                                    Most courses show you which buttons to click, not why campaigns succeed or fail.
                                    Without marketing psychology and channel logic, you're guessing with someone else's
                                    budget.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-[14.5px]">The Experience Gap</p>
                                <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                                    Certificates don't get you hired. Hiring managers want portfolio pieces, campaign
                                    results and proof you've actually executed.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-[14.5px]">The Career Gap</p>
                                <p className="text-slate-600 text-[13.5px] leading-relaxed mt-1">
                                    Even motivated students stall after a course ends. Where do you apply? How do you
                                    pitch yourself? Who's hiring? Most programs leave you to figure it out alone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 rounded-xl bg-slate-900 text-white p-5">
                        <p className="text-slate-300 text-[14.5px] leading-relaxed">
                            <span className="font-bold text-white">Most digital marketing courses hand you a certificate and wish you luck.</span>{" "}
                            We commit to your outcome — and back it with a refund if we fall short.
                        </p>
                    </div>
                </div>

                {/* RIGHT — THE SOLUTION */}
                <div className="relative rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 text-white p-7 sm:p-9 flex flex-col overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                            backgroundSize: "22px 22px",
                        }}
                    />

                    <div className="relative flex flex-col flex-1">
                        <span className="inline-flex items-center gap-2 self-start bg-white/15 backdrop-blur-sm text-white text-[11px] font-extrabold tracking-wider px-3 py-1.5 rounded-full mb-5 border border-white/20">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            THE SOLUTION
                        </span>

                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                            Skills you can use. Proof you can show.{" "}
                            <span className="text-amber-300">A team behind your job search.</span>
                        </h2>

                        <div className="mt-7 space-y-3">
                            <SolStep n={1} title="Learn the theory and the tactics">
                                Every module teaches the "why" behind the "how," so you can adapt when platforms
                                change.
                            </SolStep>
                            <SolStep n={2} title="Execute on real campaigns">
                                Live briefs, real ad accounts, two real internships and freelance projects.
                            </SolStep>
                            <SolStep n={3} title="Get placed — or get refunded">
                                A placement team works your resume, interviews and introductions. If the promise
                                isn't met, your Placement fee comes back.
                            </SolStep>
                        </div>

                        <div className="mt-7 pt-6 border-t border-white/20">
                            <p className="text-white text-lg sm:text-xl font-extrabold leading-snug">
                                Skills. Proof. A placement team behind you.
                            </p>
                            <p className="text-blue-100 text-[14.5px] leading-relaxed mt-3">
                                That's how you start a marketing career.
                            </p>
                        </div>

                        <a
                            href="#curriculum"
                            className="btn bg-white text-indigo-700 hover:bg-blue-50 px-6 py-3.5 mt-7 self-start text-sm font-bold"
                        >
                            See the Full Curriculum
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SolStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-4 flex gap-4">
            <span className="w-8 h-8 rounded-lg bg-white text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                {n}
            </span>
            <div>
                <p className="font-bold text-white text-[15px]">{title}</p>
                <p className="text-blue-100 text-[13.5px] leading-relaxed mt-1">{children}</p>
            </div>
        </div>
    );
}