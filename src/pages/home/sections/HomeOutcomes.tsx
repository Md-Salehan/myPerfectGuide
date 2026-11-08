// ============================================================
// src/pages/home/sections/HomeOutcomes.tsx
// ============================================================

/* Small label above the heading. */
const EYEBROW = "What you'll learn";

const OUTCOMES = [
    {
        icon: "₹",
        title: "GST & Compliance",
        description: "Registration, returns, ITC, LUT and notice handling.",
        card: "bg-blue-500",
        iconBg: "bg-white",
        iconText: "text-blue-500",
        divider: "border-white/30",
    },
    {
        icon: "%",
        title: "ITR & Tax Planning",
        description: "Income tax filing, TDS and legal ways to save clients money.",
        card: "bg-yellow-500",
        iconBg: "bg-white",
        iconText: "text-yellow-500",
        divider: "border-black/15",
        text: "text-gray-800",
    },
    {
        icon: "≡",
        title: "Accounting",
        description:
            "Bookkeeping, balance sheet, P&L and cash flow, with Tally and Zoho Books.",
        card: "bg-emerald-500",
        iconBg: "bg-white",
        iconText: "text-emerald-500",
        divider: "border-white/30",
    },
    {
        icon: "↗",
        title: "Client Acquisition",
        description: "Portfolio site, Meta & Google ads, LinkedIn and WhatsApp.",
        card: "bg-rose-500",
        iconBg: "bg-white",
        iconText: "text-rose-500",
        divider: "border-white/30",
    },
];

export function HomeOutcomes() {
    return (
        <section
            id="programs"
            aria-labelledby="outcomes-heading"
            className="bg-white font-['Manrope',ui-sans-serif,system-ui,sans-serif] text-[#1C2B33]"
        >
            <div className="mx-auto max-w-[1288px] px-5 pb-[52px] pt-2 sm:px-10 md:pb-[72px] lg:px-[100px]">
                {/* ---------- Heading ---------- */}
                <span className="inline-flex items-center rounded-full bg-[#E7F3FF] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
                    {EYEBROW}
                </span>
                <h2
                    id="outcomes-heading"
                    className="mt-[18px] max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.035em] text-[#0b0b0f] sm:text-[44px] lg:text-[52px]"
                >
                    Skills you will walk away with.
                </h2>

                {/* ---------- Outcome cards ---------- */}
                <ul className="m-0 mt-[48px] grid list-none grid-cols-1 gap-[21px] p-0 md:grid-cols-2 lg:mt-[64px] lg:grid-cols-4">
                    {OUTCOMES.map((outcome) => {
                        const textColor = outcome.text ?? "text-white";
                        const descColor = outcome.text ?? "text-white/90";
                        return (
                            <li
                                key={outcome.title}
                                className={`flex flex-col rounded-xl p-[22px] transition-transform duration-200 hover:-translate-y-1 ${outcome.card}`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`mb-[28px] grid h-[48px] w-[48px] place-items-center rounded-full text-[22px] font-extrabold ${outcome.iconBg} ${outcome.iconText}`}
                                >
                                    {outcome.icon}
                                </span>
                                <h3
                                    className={`border-t pt-[22px] text-[22px] font-normal leading-tight ${outcome.divider} ${textColor}`}
                                >
                                    {outcome.title}
                                </h3>
                                <p className={`mt-[10px] text-[15px] leading-[1.6] ${descColor}`}>
                                    {outcome.description}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default HomeOutcomes;