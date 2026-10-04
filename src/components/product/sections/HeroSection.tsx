// ============================================================
// src/components/product/sections/HeroSection.tsx
//
// Ported 1:1 from the <section id="heroSection"> block in
// index.html: breadcrumb, badges, title, description, meta
// row, mode/duration/schedule pills, and the mobile-only
// sidebar card slot.
//
// On desktop, the sidebar card lives in a separate sticky
// column rendered by the parent page component. This section
// only renders the mobile slot (matching the `lg:hidden`
// wrapper in the source).
//
// All varying content is now provided via props. DOM, class
// names, IDs, and layout are preserved exactly.
// ============================================================

import type { ReactNode } from "react";
import { Badge } from "../../common/Badge";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type BadgeVariant = "bestseller" | "cohort";

export interface HeroBadge {
  variant: BadgeVariant;
  label: string;
}

export interface BreadcrumbLink {
  label: string;
  href: string;
}

export interface MetaItem {
  /** Inline SVG (or any node) rendered before the text. */
  icon: ReactNode;
  /** Optional trailing content — used for rich star/rating items. */
  trailing?: ReactNode;
  /** Plain text label rendered after the icon (when `trailing` is absent). */
  label?: string;
}

export interface PillItem {
  label: string;
  value: string;
}

export interface HeroSectionProps {
  /** Optional section id — defaults to "heroSection". */
  id?: string;

  /** Breadcrumb links shown before the current page label. */
  breadcrumbLinks?: BreadcrumbLink[];
  /** Current page label shown at the end of the breadcrumb. */
  breadcrumbCurrent: string;

  /** Badges rendered under the breadcrumb. */
  badges?: HeroBadge[];

  /** Main hero title. */
  title: string;

  /** Hero description paragraph. */
  description: string;

  /** Meta row items (icon + text). */
  metaItems?: MetaItem[];

  /** Mode / Duration / Schedule pills. */
  pills?: PillItem[];

  /** Mobile-only sidebar card (rendered inside `lg:hidden`). */
  sidebarCard?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                          */
/* ------------------------------------------------------------------ */

const DEFAULT_BREADCRUMB_LINKS: BreadcrumbLink[] = [
  { label: "Home", href: "#" },
  { label: "Courses", href: "#" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function HeroSection({
  id = "heroSection",
  breadcrumbLinks = DEFAULT_BREADCRUMB_LINKS,
  breadcrumbCurrent,
  badges,
  title,
  description,
  metaItems,
  pills,
  sidebarCard,
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className="relative text-white lg:rounded-lg lg:mt-6 pt-7 pb-10 px-5 bg-ink-950 hero-padding min-md:ml-8"
    >
      {/* ---------- Breadcrumb ---------- */}
      <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-400 mb-6 breadcrumb">
        {breadcrumbLinks.map((link, index) => (
          <span key={`${link.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span>&gt;</span>}
            <a
              href={link.href}
              className="underline decoration-slate-600 hover:text-white"
            >
              {link.label}
            </a>
          </span>
        ))}
        <span>&gt;</span>
        <span className="text-slate-200">{breadcrumbCurrent}</span>
      </nav>

      {/* ---------- Badges ---------- */}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {badges.map((badge, index) => (
            <Badge key={`${badge.variant}-${index}`} variant={badge.variant}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {/* ---------- Title ---------- */}
      <h1 className="text-[24px] sm:text-4xl lg:text-[34px] leading-[1.15] font-extrabold max-w-3xl hero-title">
        {title}
      </h1>

      {/* ---------- Description ---------- */}
      <p className="mt-5 text-slate-300 text-[15px] sm:text-base leading-relaxed max-w-2xl hero-desc">
        {description}
      </p>

      {/* ---------- Meta row ---------- */}
      {metaItems && metaItems.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm meta-row">
          {metaItems.map((item, index) => (
            <span key={index} className="flex gap-2 text-slate-200">
              {item.icon}
              {item.trailing ?? item.label}
            </span>
          ))}
        </div>
      )}

      {/* ---------- Mode / Duration / Schedule pills ---------- */}
      {pills && pills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3 pill-container">
          {pills.map((pill, index) => (
            <span
              key={`${pill.label}-${index}`}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-200"
            >
              <span className="text-slate-400">{pill.label}</span> {pill.value}
            </span>
          ))}
        </div>
      )}

      {/* ---------- Mobile-only sidebar card ---------- */}
      {sidebarCard && (
        <div className="lg:hidden mt-8">
          <div className="sidebar-card">{sidebarCard}</div>
        </div>
      )}
    </section>
  );
}