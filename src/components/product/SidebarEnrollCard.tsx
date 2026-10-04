// ============================================================
// src/components/product/SidebarEnrollCard.tsx
// Dynamic sticky price + enroll card.
// ============================================================

import { useState, type ReactNode } from "react";

import { Button } from "../common/Button";
import { formatPrice } from "../../utils/formatPrice";

/** Image or video source for the promo banner. */
export type PromoThumbnail =
    | { type: "image"; src: string; alt?: string }
    | { type: "video"; src: string; poster?: string; alt?: string };

export interface PriceNote {
    icon?: ReactNode;
    text: string;
}

export interface PlanOption {
    /** Short label rendered inside the toggle button. */
    label: string;
    /** Numeric price shown when this plan is selected. */
    price: number;
    /** Struck-through original price. */
    original: number;
    /** Percentage-off value shown in the "% off" pill. */
    off: number;
    /** Checklist rows shown for this plan. */
    features: readonly string[];
    /** Small line under the price row (e.g. "1 Year Validity"). */
    priceNote?: PriceNote;
    /**
     * Optional note shown under the plan toggle when this plan
     * is selected (e.g. the Premium refund promise).
     */
    note?: string;
    /** Optional override for the CTA label when this plan is selected. */
    ctaLabel?: string;
}



export interface SidebarEnrollCardProps {
    /** Promo banner media — image or video. */
    promoThumbnail: PromoThumbnail;
    /** Plan options. First plan is selected by default. */
    plans: readonly PlanOption[];
    /** Optional footNote rendered under the feature list. */
    footNote?: ReactNode;
    /** Optional className passthrough on the root card. */
    className?: string;
}

export function SidebarEnrollCard({
    promoThumbnail,
    plans,
    footNote,
    className = "",
}: SidebarEnrollCardProps) {
    // Index of the currently selected plan. Defaults to the
    // first plan, matching the original `active` class on the
    // first button in the source markup.
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

    const selectedPlan = plans[selectedPlanIndex];
    const ctaLabel =
        selectedPlan.ctaLabel ?? `Enroll in ${selectedPlan.label.split(" — ")[0]}`;

    return (
        <div className={`card min-md:mr-8 overflow-hidden shadow-sidebar ${className}`}>
            {/* ---------- Promo banner (thumbnail image or video) ---------- */}
            <div className="p-3 bg-slate-100">
                <div className="rounded-xl border-[3px] border-amber-400 bg-ink-950 relative overflow-hidden aspect-[16/10]">
                    {promoThumbnail.type === "video" ? (
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            src={promoThumbnail.src}
                            poster={promoThumbnail.poster}
                            aria-label={promoThumbnail.alt}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={promoThumbnail.src}
                            alt={promoThumbnail.alt ?? ""}
                            loading="lazy"
                        />
                    )}
                </div>
            </div>

            {/* ---------- Price + plan toggle + CTA + features ---------- */}
            <div className="px-5 pb-5">
                <div className="flex items-baseline gap-2 flex-wrap mt-2">
                    <span className="text-2xl font-extrabold text-slate-900">
                        {formatPrice(selectedPlan.price)}
                    </span>
                    <span className="text-slate-400 line-through text-base">
                        {formatPrice(selectedPlan.original)}
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {selectedPlan.off}% off
                    </span>
                </div>

                <p className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                    {selectedPlan.priceNote?.icon && selectedPlan.priceNote.icon}
                    {selectedPlan.priceNote?.text}
                </p>

                {/* Plan toggle */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {plans.map((plan, index) => (
                        <button
                            key={plan.label}
                            type="button"
                            onClick={() => setSelectedPlanIndex(index)}
                            className={`plan-btn${index === selectedPlanIndex ? " active" : ""}`}
                        >
                            {plan.label}
                        </button>
                    ))}
                </div>

                {/* Optional per-plan note (e.g. Premium refund promise) */}
                {selectedPlan.note && (
                    <p className="mt-3 text-[12.5px] leading-relaxed text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                        {selectedPlan.note}
                    </p>
                )}

                <Button
                    href="#enroll"
                    variant="primary"
                    className="w-full py-3.5 mt-4 text-[15px]"
                >
                    {ctaLabel}
                </Button>

                {/* Feature list — changes with plan */}
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {selectedPlan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                            <svg
                                className="w-4 h-4 text-slate-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>

                {footNote && <div className="text-slate-500 text-[12px] mt-4">{footNote}</div>}
            </div>
        </div>
    );
}