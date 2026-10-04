// ============================================================
// src/components/ToolsYouMaster.tsx
// "Tools You'll Master" section — a light slate card with a
// heading, subtitle, and a responsive grid of tool chips.
//
// Fully reusable: all variable content (heading, subtitle,
// tool list) is supplied via props. Each chip renders the
// tool's logo (SVG / PNG / JPEG / WEBP) followed by the tool
// name, matching the original chip structure.
// ============================================================

import type { CSSProperties, ReactNode } from "react";

/**
 * A single tool chip. Provide either `svg` (inline markup) or
 * `src` (image URL/import) for the logo. The `name` is always
 * rendered as the chip label.
 */
export interface Tool {
  /** The brand/tool name — used as the React key, alt text, and label. */
  name: string;
  /** Inline SVG markup for the logo. */
  svg?: ReactNode;
  /** Path/URL to a logo image (SVG, PNG, JPEG, WEBP). */
  src?: string;
  /** Alt text for image logos. Defaults to `name`. */
  alt?: string;
  /** Optional classes applied to the rendered logo element. */
  logoClassName?: string;
  /** Optional inline styles applied to the rendered logo element. */
  logoStyle?: CSSProperties;
  /**
   * Optional chip-level class override. Defaults to the exact
   * classes used by the original component so the layout is
   * unchanged when this prop is omitted.
   */
  chipClassName?: string;
}

/** Props for the `ToolsYouMaster` section. */
export interface ToolsYouMasterProps {
  /** Section heading. */
  heading?: string;
  /** Section subtitle / descriptive line. */
  subtitle?: string;
  /** Ordered list of tool chips to render. */
  tools: Tool[];
  /**
   * Optional grid class override. Defaults to the exact classes
   * used by the original component so the layout is unchanged
   * when this prop is omitted.
   */
  gridClassName?: string;
  /** Default logo size classes applied when a tool doesn't override. */
  defaultLogoClassName?: string;
}

const DEFAULT_GRID =
  "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3 learners-grid";

const DEFAULT_CHIP =
  "border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-1.5 bg-white";

const DEFAULT_LOGO_CLASS = "w-5 h-5 shrink-0 object-contain";

export function ToolsYouMaster({
  heading = "Tools You'll Master",
  subtitle,
  tools,
  gridClassName = DEFAULT_GRID,
  defaultLogoClassName = DEFAULT_LOGO_CLASS,
}: ToolsYouMasterProps) {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <div className="card p-6 sm:p-8 !bg-[#FAFBFD]">
        <h2 className="text-center text-lg font-bold text-slate-400 mb-2 tracking-wide">
          {heading}
        </h2>
        {subtitle !== undefined && (
          <p className="text-center text-slate-500 text-[13.5px] mb-7 max-w-md mx-auto">
            {subtitle}
          </p>
        )}

        <div className={gridClassName}>
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={tool.chipClassName ?? DEFAULT_CHIP}
            >
              {tool.svg ? (
                <span
                  className={tool.logoClassName ?? defaultLogoClassName}
                  style={tool.logoStyle}
                >
                  {tool.svg}
                </span>
              ) : tool.src ? (
                <img
                  src={tool.src}
                  alt={tool.alt ?? tool.name}
                  className={tool.logoClassName ?? defaultLogoClassName}
                  style={tool.logoStyle}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}