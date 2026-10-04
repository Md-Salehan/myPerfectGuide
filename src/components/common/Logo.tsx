// ============================================================
// src/components/common/Logo.tsx
// Brand logo: the rounded-square SVG mark + two-line wordmark.
//
// Used in two places in the original markup with different
// wordmarks and colours:
//   - Header: "CODING" (slate-900) over "SHUTTLE" (brand-600)
//   - Footer: "TAXPRO" (white) over "ACADEMY" (brand-500)
//
// The SVG mark itself is byte-identical between the two, so
// it lives here once; only the text content and text colours
// switch on the `variant` prop.
// ============================================================

import { BRAND, FOOTER_BRAND } from "../../constants/site";

type LogoVariant = "header" | "footer";

interface LogoProps {
  /**
   * Which wordmark + colour treatment to render.
   *   - "header": CODING / SHUTTLE with slate + brand colours
   *   - "footer": TAXPRO / ACADEMY with white + brand colours
   */
  variant: LogoVariant;
}

export function Logo({ variant }: LogoProps) {
  const isHeader = variant === "header";

  // Header uses the CODING/SHUTTLE wordmark; footer uses TAXPRO/ACADEMY.
  const wordmark = isHeader ? BRAND : FOOTER_BRAND;

  // Text colour for the first line: slate-900 in header, white in footer.
  const line1Class = isHeader ? "text-slate-900" : "text-white";

  // Second line is brand-600 in the header and brand-500 in the footer
  // (matching the original markup exactly).
  const line2Class = isHeader ? "text-brand-600" : "text-brand-500";

  return (
    <div className="flex items-center gap-2">
      {/* SVG mark — identical in header and footer. */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="9" fill="#E31B54" />
        <path d="M13 12L27 20L13 28V12Z" fill="white" />
        {isHeader && (
          <circle cx="30" cy="11" r="3.2" fill="white" stroke="#E31B54" strokeWidth="1" />
        )}
      </svg>

      {/* Two-line wordmark. */}
      <span className="leading-none">
        <span
          className={`block text-[17px] font-extrabold tracking-tight logo-text ${line1Class}`}
        >
          {wordmark.line1}
        </span>
        <span
          className={`block text-[17px] font-extrabold tracking-tight -mt-1 logo-text ${line2Class}`}
        >
          {wordmark.line2}
        </span>
      </span>
    </div>
  );
}