// ============================================================
// src/pages/CoursesPage/sections/PageHeader.tsx
// Page heading, subtitle, dynamic course count and (when the
// course data supports it) a featured-offer highlight.
// Renders inside MainLayout's <main>, so no header/footer here.
// ============================================================



interface PageHeaderProps {
    /** Total number of courses in the catalogue (not the filtered count). */
    totalCount: number;
}



export function PageHeader({ totalCount }: PageHeaderProps) {
    

    return (
        <section
            aria-labelledby="courses-page-heading"
            className="relative bg-[#0056D2] overflow-hidden"
        >
            {/* Soft corner light — solid, no gradient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/[0.06]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/[0.04]"
            />

            <div className="shell relative pb-10 pt-10 sm:pb-12 sm:pt-14 lg:pt-16">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                    {/* Left: copy column */}
                    <div className="min-w-0 max-w-2xl">
                        {/* Chip row — translucent on blue, high contrast */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                                <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 rounded-full bg-emerald-300"
                                />
                                Live + recorded
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.6}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-3 w-3 text-emerald-300"
                                >
                                    <path d="m5 12 5 5L20 7" />
                                </svg>
                                Built for real careers
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            id="courses-page-heading"
                            className="mt-5 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem]"
                        >
                            Explore{" "}
                            <span className="relative inline-block whitespace-nowrap">
                                <span className="relative z-10 text-white">
                                    All Courses
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-1 z-0 h-2.5 rounded-full bg-white/20 sm:bottom-1.5 sm:h-3"
                                />
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-blue-50/85 sm:text-base">
                            Search, compare and pick the program that fits your goals — from
                            taxation and compliance to marketing and full-stack development.
                        </p>
                    </div>

                    {/* Right: compact stat tiles.
              Stacks below the copy on mobile, sits inline on lg+. */}
                    <div className="flex shrink-0 flex-wrap items-stretch gap-3 lg:justify-end">
                        {/* Courses tile */}
                        <div className="flex min-w-[9.5rem] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_-12px_rgba(2,20,60,0.45)] ring-1 ring-inset ring-white/60">
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                                </svg>
                            </span>
                            <div className="leading-tight">
                                <p className="text-lg font-bold tabular-nums text-slate-900">
                                    {totalCount}
                                </p>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                                    {totalCount === 1 ? "Course" : "Courses"}
                                </p>
                            </div>
                        </div>

                        {/* Offer tile (only when a discount exists) */}

                        <div className="flex min-w-[11rem] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_-12px_rgba(2,20,60,0.45)] ring-1 ring-inset ring-white/60">
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4v5.59a2 2 0 0 0 .59 1.41l9.59 9.59a2 2 0 0 0 2.82 0l3.59-3.59a2 2 0 0 0 0-2.82Z" />
                                    <circle
                                        cx="7.5"
                                        cy="7.5"
                                        r="1.2"
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </svg>
                            </span>
                            <div className="min-w-0 leading-tight">
                                <p className="text-sm font-bold text-rose-600">
                                    Up to 90% off
                                </p>
                                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400">
                                    For 1st 50 students
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Hairline divider — solid, no gradient */}
            <div aria-hidden="true" className="h-px bg-white/15" />
        </section>
    );
}