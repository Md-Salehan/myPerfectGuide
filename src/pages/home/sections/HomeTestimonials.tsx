import React from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

// type Role = { title: string; company: string };

interface StatStory {
    kind: "stat";
    id: string;
    hike: string; // e.g. "214%"
    name: string;
    currentRole: string; // line under the name
    before: string;
    now: string;
    offers: number;
}

interface QuoteStory {
    kind: "quote";
    id: string;
    quote: string;
    rating: number;
    name: string;
    role: string;
}

type Thumb = "orange" | "gold" | "dark";

interface VideoStory {
    kind: "video";
    id: string;
    variant: Thumb;
    // overlay copy on the thumbnail
    headline?: string;
    subHeadline?: string;
    // person info
    name: string;
    role: string;
    before?: string;
    now?: string;
    // lets a card drop lower in the column (matches the gap in the design)
    offsetClass?: string;
}

type Story = StatStory | QuoteStory | VideoStory;

/* -------------------------------------------------------------------------- */
/*  Dummy data (3 columns, exactly like the screenshot)                       */
/* -------------------------------------------------------------------------- */

const columns: Story[][] = [
    // Column 1
    [
        {
            kind: "stat",
            id: "s1",
            hike: "214%",
            name: "Shivam Prakash",
            currentRole: "Computer Scientist, Adobe",
            before: "Backend Engineer, Ericsson",
            now: "Computer Scientist, Adobe",
            offers: 3,
        },
        {
            kind: "quote",
            id: "q1",
            quote:
                "This journey has been an incredible blend of theoretical knowledge and hands-on experience, equipping me with the skills to tackle real-world challenges in the dynamic field of AI and ML. I'm excited to leverage this knowledge to contribute meaningfully to the ever-evolving landscape of technology and innovation.",
            rating: 5,
            name: "Sahil Bansal",
            role: "Data Scientist, Fractal",
        },
        {
            kind: "video",
            id: "v3",
            variant: "orange",
            headline: "ML Engineer",
            subHeadline: "Rajesh Somasundaram",
            name: "Rajesh Somasundaram",
            role: "Machine Learning Ops Engineer-2, NinjaCart",
            before: "Software Engineer - II, HERE Technologies",
            now: "Machine Learning Ops Engineer-2, NinjaCart",
        },
    ],
    // Column 2
    [
        {
            kind: "video",
            id: "v1",
            variant: "dark",
            headline: "From Mysore to GoKwik",
            subHeadline: "Arun M V",
            name: "Arun M V",
            role: "Applied scientist, GoKwik",
        },
        {
            kind: "stat",
            id: "s2",
            hike: "250%",
            name: "Divyanshu Tanter",
            currentRole: "AI Researcher and Developer, Dassault Systems",
            before: "Data Scientist, Wipro Limited",
            now: "AI Researcher and Developer, Dassault Systems",
            offers: 4,
        },
        {
            kind: "quote",
            id: "q2",
            quote:
                "In just 2.5 months of joining Scaler, I not only learned the fundamentals but also advanced-level concepts in Data Science and Machine Learning. The structured approach, comprehensive curriculum, and unwavering guidance of mentors like Srikanth Varma Chekuri, Naman Bhalla, Mudit Goel , and a fantastic cohort of peers made this journey incredibly rewarding.",
            rating: 5,
            name: "Akshat Arora",
            role: "Data Scientist, Landmark Group",
        },
    ],
    // Column 3
    [
        {
            kind: "video",
            id: "v2",
            variant: "gold",
            headline: "DSML WEEKLY CATCH-UP",
            name: "Madhuri Kukreja",
            role: "Associate Analyst, Razorpay",
            before: "Associate Analyst, XL Dynamics",
            now: "Associate Analyst, Razorpay",
        },
        {
            kind: "stat",
            id: "s3",
            hike: "142%",
            name: "Sayyam Bhandari",
            currentRole: "Data Engineer, Amazon",
            before: "Sr BI Analyst, USEReady INC.",
            now: "Data Engineer, Amazon",
            offers: 2,
        },
        {
            kind: "quote",
            id: "q3",
            quote:
                "Scaler Academy's program is truly exceptional, providing me with the skills and confidence necessary to thrive in the field of Full-Stack_Data Engineer. The practical projects and real-world scenarios prepared me well for the challenges ahead",
            rating: 5,
            name: "Vempali B N V D Sivasanthosh",
            role: "Full Stack data Engineer, Fractal",
        },
    ],
];

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

const cardBase = "border border-[#e4e4e7] bg-white";

const Stars: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex gap-[6px]" aria-label={`${count} out of 5 stars`} role="img">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#f0a030]" aria-hidden="true">
                <path d="M12 2.2l2.95 6.2 6.8.9-5 4.75 1.25 6.75L12 17.4l-6 3.4 1.25-6.75-5-4.75 6.8-.9L12 2.2z" />
            </svg>
        ))}
    </div>
);

const PlayButton: React.FC<{ className?: string }> = ({ className = "" }) => (
    <button
        type="button"
        aria-label="Play story video"
        className={`flex h-[43px] w-[43px] items-center justify-center rounded-full bg-[#f1f1f1] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
        <svg viewBox="0 0 10 12" className="ml-[2px] h-[11px] w-[9px] fill-[#111]" aria-hidden="true">
            <path d="M0 0l10 6-10 6z" />
        </svg>
    </button>
);

const ExpandIcon: React.FC = () => (
    <svg
        viewBox="0 0 16 16"
        className="absolute left-[10px] top-[10px] h-[14px] w-[14px] fill-none stroke-white/80"
        strokeWidth="1.6"
        aria-hidden="true"
    >
        <rect x="1.5" y="5.5" width="9" height="9" rx="1" />
        <path d="M5.5 5.5V2.5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-3" />
    </svg>
);

/** Simple person silhouette used in place of real photos */
const Person: React.FC<{ skin?: string; shirt?: string; className?: string }> = ({
    skin = "#c89674",
    shirt = "#2b2b33",
    className = "",
}) => (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true">
        <path d="M6 110c0-26 17-38 44-38s44 12 44 38z" fill={shirt} />
        <rect x="40" y="58" width="20" height="18" rx="6" fill={skin} />
        <ellipse cx="50" cy="38" rx="20" ry="24" fill={skin} />
        <path d="M29 34c0-17 10-26 22-26s21 9 20 26c-4-9-10-12-21-12s-17 3-21 12z" fill="#1c1410" />
    </svg>
);

const BeforeNow: React.FC<{ before?: string; now?: string }> = ({ before, now }) => (
    <dl className="space-y-[10px] text-[14px] leading-[1.35]">
        {before && (
            <div className="flex items-baseline gap-[8px]">
                <dt className="shrink-0 text-[14px] uppercase tracking-[0.12em] text-[#6b6b73]">Before:</dt>
                <dd className="text-[#18181b]">{before}</dd>
            </div>
        )}
        {now && (
            <div className="flex items-baseline gap-[8px]">
                <dt className="shrink-0 text-[14px] uppercase tracking-[0.12em] text-[#6b6b73]">Now:</dt>
                <dd className="text-[#18181b]">{now}</dd>
            </div>
        )}
    </dl>
);

/* -------------------------------------------------------------------------- */
/*  Cards                                                                     */
/* -------------------------------------------------------------------------- */

const StatCard: React.FC<{ story: StatStory }> = ({ story }) => (
    <article className={`${cardBase} p-[22px]`}>
        <p className="flex items-baseline gap-[6px] border-b border-[#e4e4e7] pb-[26px] pt-[14px]">
            <span className="text-[56px] font-medium leading-none tracking-[-0.03em] text-[#111]">
                {story.hike}
            </span>
            <span className="text-[24px] font-normal text-[#111]">Hike</span>
        </p>

        <h3 className="mt-[28px] text-[22px] font-normal leading-tight text-[#111]">{story.name}</h3>
        <p className="mt-[8px] text-[15px] text-[#6b6b73]">{story.currentRole}</p>

        <div className="mt-[22px]">
            <BeforeNow before={story.before} now={story.now} />
        </div>

        <div className="mt-[22px] flex items-center justify-between">
            <span className="border border-[#18181b] px-[12px] py-[9px] text-[14px] uppercase tracking-[0.14em] text-[#18181b]">
                {story.offers} Offers
            </span>
            <a
                href="#"
                className="text-[20px] text-[#1a2aa8] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2aa8]"
            >
                Explore more <span aria-hidden="true">→</span>
            </a>
        </div>
    </article>
);

const QuoteCard: React.FC<{ story: QuoteStory }> = ({ story }) => (
    <figure className={`${cardBase} p-[22px]`}>
        <blockquote className="pt-[22px] text-[17px] leading-[1.55] text-[#18181b]">
            “{story.quote}”
        </blockquote>
        <div className="mt-[20px] border-b border-[#e4e4e7] pb-[22px]">
            <Stars count={story.rating} />
        </div>
        <figcaption className="pb-[12px] pt-[26px]">
            <p className="text-[22px] leading-tight text-[#111]">{story.name}</p>
            <p className="mt-[8px] text-[15px] text-[#6b6b73]">{story.role}</p>
        </figcaption>
    </figure>
);

const ThumbnailOrange: React.FC<{ story: VideoStory }> = ({ story }) => (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#8c3f22]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b4524] to-[#7d3820]" />
        {/* lower grey wedge */}
        <div
            className="absolute bottom-0 right-0 h-[38%] w-[78%] bg-[#8f8a86]"
            style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        <Person className="absolute bottom-0 left-[4%] h-[92%]" skin="#b98462" shirt="#7b86a1" />
        <div className="absolute right-[4%] top-[18%] text-right">
            <span className="inline-block bg-[#d7d4d1] px-[10px] py-[2px] text-[18px] font-bold text-[#222]">
                {story.headline}
            </span>
            <p className="mt-[6px] pr-[2px] text-[13px] text-[#e8c9bb]">who got</p>
            <span className="mt-[4px] inline-block bg-[#161616] px-[10px] py-[2px] text-[19px] font-bold text-white">
                142% Salary Hike
            </span>
        </div>
        <div className="absolute bottom-[8%] right-[3%] text-right">
            <p className="text-[11px] italic text-[#e5a58a]">Story of</p>
            <p className="text-[17px] font-bold text-[#f19a77]">{story.subHeadline}</p>
            <p className="text-[10px] font-semibold text-[#222]">Machine Learning Engineer, Ninjacart</p>
        </div>
        <PlayButton className="absolute left-[18%] top-1/2 -translate-y-1/2" />
        <ExpandIcon />
        <div className="absolute inset-0 bg-black/25" />
    </div>
);

const ThumbnailGold: React.FC<{ story: VideoStory }> = ({ story }) => (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#9a7a34]">
        <p
            className="absolute inset-x-0 top-[6%] px-6 text-center text-[27px] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
            style={{ WebkitTextStroke: "2px #111", paintOrder: "stroke fill", textShadow: "2px 2px 0 #111" }}
        >
            DSML Weekly
            <br />
            Catch-up
        </p>
        <div className="absolute inset-x-[7%] bottom-0 top-[40%] flex items-end gap-[2px]">
            <div className="relative flex h-full flex-1 items-end justify-center rounded-t-[10px] bg-[#7f6a3a]">
                <Person className="h-[86%]" skin="#d9a88a" shirt="#1f2326" />
                <span className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col rounded border border-white/30 bg-[#1a1a1a] px-2 py-[2px] text-center text-[7px] leading-tight text-white">
                    <b>Abhimanyu Saxena</b>
                    Co-Founder, SCALER
                </span>
            </div>
            <div className="relative flex h-full flex-1 items-end justify-center rounded-t-[10px] bg-[#6f5d33]">
                <Person className="h-[86%]" skin="#c78d6c" shirt="#1b2a1f" />
                <span className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 flex-col rounded border border-white/30 bg-[#1a1a1a] px-2 py-[2px] text-center text-[7px] leading-tight text-white">
                    <b>{story.name}</b>
                    Analytics Associate, Razorpay
                </span>
            </div>
        </div>
        <PlayButton className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2" />
        <ExpandIcon />
    </div>
);

const VideoCardSplit: React.FC<{ story: VideoStory }> = ({ story }) => (
    <article className={`${cardBase} overflow-hidden`}>
        {story.variant === "orange" ? <ThumbnailOrange story={story} /> : <ThumbnailGold story={story} />}
        <div className="p-[22px] pb-[26px]">
            <h3 className="mt-[8px] text-[22px] font-normal leading-tight text-[#111]">{story.name}</h3>
            <p className="mt-[8px] text-[15px] text-[#6b6b73]">{story.role}</p>
            <div className="mt-[22px]">
                <BeforeNow before={story.before} now={story.now} />
            </div>
        </div>
    </article>
);

/** Dark full-bleed video card (Arun M V) */
const VideoCardDark: React.FC<{ story: VideoStory }> = ({ story }) => (
    <article className="relative aspect-[348/352] w-full overflow-hidden bg-black">
        {/* letter-boxed footage */}
        <div className="absolute inset-x-0 top-[12.5%] bottom-[12.5%] overflow-hidden bg-gradient-to-br from-[#1b2a26] via-[#10201d] to-[#0b1411]">
            <Person className="absolute -left-[4%] bottom-0 h-[110%]" skin="#b68262" shirt="#8a3a34" />
            <div className="absolute inset-0 bg-black/45" />
            {/* thin yellow diagonal line */}
            <div className="absolute left-[34%] top-0 h-[2px] w-[40%] origin-left rotate-[-38deg] bg-[#e8b800]" />
            <div className="absolute right-[2%] top-[44%] w-[56%] text-[26px] font-extrabold leading-[1.02] text-[#f4c20d]">
                <span className="text-white">From Mysore</span>
                <br />
                <span className="text-white">to GoKwik</span>
                <p className="mt-[14px] text-[18px] font-bold leading-tight text-[#f4c20d]">
                    {story.name.replace(" ", " ")}
                    <br />
                    <span className="font-semibold text-[#f6e9b6]">Applied Scientist</span>
                    <br />
                    <span className="font-semibold text-[#f6e9b6]">GoKwik</span>
                </p>
            </div>
        </div>
        <PlayButton className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-x-0 bottom-0 px-[22px] pb-[14px]">
            <h3 className="text-[26px] font-normal leading-none text-white">{story.name}</h3>
            <p className="mt-[8px] text-[16px] text-[#a4a4aa]">{story.role}</p>
        </div>
    </article>
);

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
    switch (story.kind) {
        case "stat":
            return <StatCard story={story} />;
        case "quote":
            return <QuoteCard story={story} />;
        case "video":
            return story.variant === "dark" ? <VideoCardDark story={story} /> : <VideoCardSplit story={story} />;
    }
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export const HomeTestimonials: React.FC = () => {
    return (
        <section
            aria-labelledby="stories-heading"
            className="bg-white font-['Manrope',ui-sans-serif,system-ui,sans-serif] text-[#111]"
        >
            <div className="mx-auto max-w-[1288px] px-5 pb-20 pt-6 sm:px-10 lg:px-[100px]">
                {/* Heading */}
                <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#18181b]">Stories</p>
                <h2
                    id="stories-heading"
                    className="mt-[18px] max-w-[900px] text-[32px] font-medium leading-[1.08] tracking-[-0.035em] text-[#0b0b0f] sm:text-[44px] lg:text-[52px]"
                >
                    Real AI-era career moves, not generic success stories.
                </h2>
                <p className="mt-[22px] text-[18px] text-[#18181b] sm:text-[20px]">
                    Numbers tell part of the story. These are the role shifts behind them.
                </p>

                {/* Masonry-style 3 column layout */}
                <div className="mt-[72px] grid grid-cols-1 gap-[21px] md:grid-cols-2 lg:grid-cols-3">
                    {columns.map((col, i) => (
                        <div
                            key={i}
                            className={
                                i === 2
                                    ? "flex flex-col gap-[21px] md:col-span-2 md:grid md:grid-cols-2 md:items-start lg:col-span-1 lg:flex"
                                    : "flex flex-col gap-[21px]"
                            }
                        >
                            {col.map((story, idx) => (
                                <div
                                    key={story.id}
                                    /* Column 3 has a larger gap after the first card in the design */
                                    className={i === 2 && idx === 1 ? "lg:mt-[112px]" : ""}
                                >
                                    <StoryCard story={story} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

