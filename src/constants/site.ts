// ============================================================
// src/constants/site.ts
// Site-wide constants: brand identity, tagline, social links,
// and the floating WhatsApp CTA target.
//
// These values are reused by:
//   - components/layout/Header.tsx
//   - components/layout/Footer.tsx
//   - components/layout/WhatsAppButton.tsx
//
// In the original static HTML, the logo block, tagline, and
// social links were duplicated in both index.html and
// about_us.html. Here they have a single source of truth.
// ============================================================

/** Two-line brand name shown next to the logo mark. */
export const BRAND = {
  /**
   * Top line of the wordmark (rendered in slate/white).
   * In the header this appears above the second line; in the
   * footer it appears in white.
   */
  line1: "CODING",
  /**
   * Bottom line of the wordmark (rendered in brand colour).
   * Note: the original HTML uses "CODING SHUTTLE" in the
   * header logo but "TAXPRO ACADEMY" in the footer logo and
   * page titles. To preserve the existing UI 1:1, both
   * variants are kept as separate constants below.
   */
  line2: "SHUTTLE",
} as const;

/**
 * Footer brand wordmark. The footer in the original markup
 * uses a different two-line wordmark ("TAXPRO / ACADEMY")
 * than the header ("CODING / SHUTTLE"), and the tab title on
 * the About page also uses "TaxPro Academy".
 */
export const FOOTER_BRAND = {
  line1: "TAXPRO",
  line2: "ACADEMY",
} as const;

/** Marketing tagline shown under the footer brand block. */
export const TAGLINE = "#SkillSeIncomeTak";

/**
 * Floating WhatsApp button target.
 * In the original HTML this is a placeholder `#` href on both
 * pages; keeping it as a named constant so the real number can
 * be dropped in later without touching the component.
 */
export const WHATSAPP_URL = "#";

/**
 * Social links rendered in the footer under the "FOLLOW US ON"
 * heading, in the exact same order as the original markup:
 * YouTube, LinkedIn, Instagram, WhatsApp.
 *
 * `icon` is a short identifier the Footer component maps to
 * an inline SVG. Using a string key instead of importing SVGs
 * here keeps this file free of JSX and reusable from non-React
 * contexts if ever needed.
 */
export type SocialIconKey = "youtube" | "linkedin" | "instagram" | "whatsapp";

export interface SocialLink {
  /** Accessibility label / aria-label for the icon link. */
  label: string;
  /** Target href for the icon link. */
  href: string;
  /** Which inline SVG icon to render. */
  icon: SocialIconKey;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "WhatsApp", href: "#", icon: "whatsapp" },
] as const;

/** Copyright line shown at the very bottom of the footer. */
export const COPYRIGHT = "© 2026 TaxPro Academy. All rights reserved.";

