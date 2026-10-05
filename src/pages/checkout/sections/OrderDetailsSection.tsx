// ============================================================
// src/pages/checkout/sections/OrderDetailsSection.tsx
// Product summary — thumbnail, title, rating, features,
// price, and plan toggle.
//
// Every field except the ones the URL requires (title, image,
// price) is rendered conditionally. When a URL parameter is
// absent, its corresponding UI block is hidden — no placeholders.
//
// The "View more details" button + list appear only when the
// URL's `more` param produced a non-empty list. Same for
// `short`, `rating`, `ratingCount`, `original`, and `off`.
// ============================================================

import { useState } from "react";

import { formatPrice } from "../utils";
import type { PlanId, Product, ProductPlan } from "../types";

interface OrderDetailsSectionProps {
  product: Product;
  /** Currently selected plan id. */
  selectedPlan: PlanId;
  /** Called when the user picks a different plan. */
  onSelectPlan: (plan: PlanId) => void;
}

export function OrderDetailsSection({
  product,
  selectedPlan,
  onSelectPlan,
}: OrderDetailsSectionProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const plan = product.plans[selectedPlan];
  // If the product only has one plan, we still render the
  // toggle with a single button (matching the source's layout),
  // but the click is a no-op.
  const availablePlans = Object.keys(product.plans) as PlanId[];

  const hasRating =
    typeof product.rating === "number" && !!product.ratingCount;
  const hasShort = !!product.shortFeatures?.length;
  const hasMore = !!product.moreFeatures?.length;

  return (
    <div className="order-4 mt-[34px] lg:mt-[30px] px-[15px] lg:px-0 w-full lg:max-w-[401px] lg:ml-[185px]">
      <h1 className="flex items-center gap-2 text-[18px] lg:text-[20px] font-semibold h-[26px]">
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 2h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
        </svg>
        Order Details
      </h1>

      {/* ---------- Product row: thumbnail + title + rating ---------- */}
      <div className="mt-[16px] lg:mt-[14px] flex gap-3">
        {/* Thumbnail — always an <img>. URL requires `image`. */}
        <div className="relative shrink-0 w-[130px] h-[73px] lg:w-[116px] lg:h-[65px] rounded-lg overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Title + rating */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-[17px] leading-6 lg:text-[20px] lg:leading-[26px] font-medium tracking-[-0.01em]">
              {product.title}
            </h2>
            <button
              type="button"
              aria-label="Collapse"
              className="shrink-0 w-[26px] h-[26px] rounded-md bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
            >
              <svg width="12" height="2" viewBox="0 0 12 2">
                <rect width="12" height="1.5" rx=".75" fill="currentColor" />
              </svg>
            </button>
          </div>

          {hasRating && (
            <div className="mt-[8px] lg:mt-[6px] flex items-center gap-2 text-[13px] lg:text-[14px]">
              <span className="text-orange-700 font-medium">
                {product.rating}
              </span>
              <span className="flex text-amber-600 -ml-1">
                <Stars rating={product.rating!} />
              </span>
              <span className="text-slate-600">({product.ratingCount})</span>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Short feature line ---------- */}
      {hasShort && (
        <p className="mt-[14px] text-[12px] leading-[19.5px] lg:text-[13px] lg:leading-[17.5px] text-slate-500">
          {product.shortFeatures!.join(" | ")}
        </p>
      )}

      {/* ---------- View more details ---------- */}
      {hasMore && (
        <>
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            className="mt-[16px] lg:mt-[18px] flex items-center gap-1 text-[13px] font-medium text-indigo-600"
          >
            View more details
            <svg
              className={`w-3.5 h-3.5 transition-transform ${
                moreOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {moreOpen && (
            <ul className="mt-2 pl-4 list-disc text-[13px] text-slate-600 space-y-1">
              {product.moreFeatures!.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* ---------- Price row ---------- */}
      {plan && (
        <div className="mt-[12px] lg:mt-[10px] flex items-center gap-2">
          <span className="text-[16px] lg:text-[20px] font-semibold tracking-tight">
            {formatPrice(plan.price)}
          </span>
          {plan.original > plan.price && (
            <span className="text-[16px] lg:text-[17px] font-medium text-slate-400 line-through decoration-slate-400">
              {formatPrice(plan.original)}
            </span>
          )}
          {plan.off && (
            <span className="px-2.5 py-[3px] rounded text-[12px] lg:text-[13px] font-medium bg-emerald-50 text-emerald-700">
              {plan.off}
            </span>
          )}
        </div>
      )}

      {/* ---------- Plan toggle ---------- */}
      {availablePlans.length > 1 && (
        <div className="mt-[12px] lg:mt-[10px] p-[4px] lg:p-[3px] rounded-xl bg-slate-100 max-lg:border max-lg:border-slate-200 grid grid-cols-2 h-[46px] lg:h-[39px] text-[14px] lg:text-[15px] font-medium">
          {availablePlans.map((planId) => {
            const planData = product.plans[planId] as ProductPlan;
            const active = planId === selectedPlan;
            return (
              <button
                key={planId}
                type="button"
                onClick={() => onSelectPlan(planId)}
                aria-pressed={active}
                className={`rounded-lg transition ${
                  active ? "bg-white shadow-sm" : "text-slate-600"
                }`}
              >
                {planData.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ---------- Divider ---------- */}
      <hr className="mt-[32px] lg:mt-[30px] border-slate-200" />
    </div>
  );
}

/* ------------------------------------------------------------
   Internal: star rating
   Renders 5 stars, filling full/half/empty based on `rating`.
   Matches the source's "4 full + 1 half" for a 4.9 value.
   ------------------------------------------------------------ */

function Stars({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return fill;
  });

  return (
    <>
      {stars.map((fill, i) => (
        <svg
          key={i}
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* Full star path */}
          <path
            d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9 12 2Z"
            fill={fill >= 1 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={fill >= 1 ? 0 : 1.5}
          />
          {/* Half fill overlay */}
          {fill > 0 && fill < 1 && (
            <path
              d="M12 2v16l-6.5 4 1.7-7.4-5.7-5L9 8.9 12 2Z"
              fill="currentColor"
            />
          )}
        </svg>
      ))}
    </>
  );
}