// ============================================================
// src/pages/checkout/sections/ReceiptSection.tsx
// Receipt card — zigzag top edge + Sub Total + total row.
//
// Presentational: receives the two amounts and displays them.
// The zigzag comes from the .zig utility in src/index.css,
// ported 1:1 from the source's inline <style> block.
//
// Numbers are pre-computed by the parent (subtotal from the
// selected plan; total after discount). This section does not
// look at the coupon or the plan.
// ============================================================

import { formatPrice } from "../utils";

interface ReceiptSectionProps {
  /** Subtotal in rupees (plan price). */
  subtotal: number;
  /** Total in rupees (subtotal minus discount). */
  total: number;
}

export function ReceiptSection({ subtotal, total }: ReceiptSectionProps) {
  return (
    <div className="order-5 mt-[38px] lg:mt-[40px] px-[15px] lg:px-0 w-full lg:max-w-[400px] lg:ml-[57px]">
      <div className="relative">
        {/* Zigzag top edge — styled by .zig in src/index.css */}
        <div className="zig" aria-hidden="true" />

        <div className="bg-white rounded-b-lg border border-t-0 border-slate-200 text-[14px] lg:text-[17px] font-medium">
          {/* Sub Total row */}
          <div className="h-[50px] lg:h-[44px] pt-[10px] px-[22px] lg:px-[22px] max-lg:px-[16px] flex items-center justify-between">
            <span>Sub Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-slate-200" />

          {/* Amount to be paid row */}
          <div className="h-[45px] lg:h-[40px] px-[22px] max-lg:px-[16px] flex items-center justify-between">
            <span>Amount to be paid :</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}