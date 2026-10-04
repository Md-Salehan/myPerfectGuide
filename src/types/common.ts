// ============================================================
// src/types/common.ts
// Small set of shared, cross-cutting types.
// Only types that are used by more than one module live here.
// Domain-specific types (FAQ, reviews, product, etc.) live in
// their own dedicated files.
// ============================================================

/**
 * A single navigation entry shown in the header desktop nav
 * or the mobile menu panel.
 *
 * `hasDropdown` controls whether the chevron-down icon is
 * rendered next to the label (used by the "Courses" and
 * "Resources" entries in the original markup).
 *
 * `badge` is an optional short label rendered as the small
 * "NEW" pill (used by the "AI Course" item).
 *
 * `variant` distinguishes the two visually distinct header
 * items from the plain text links:
 *   - "primary"   → the dark pill button used for "Courses"
 *   - "highlight" → the light slate pill used for "AI Course"
 *   - "plain"     → every other nav link
 */
export interface NavLink {
  /** Visible label of the link. */
  label: string;
  /** Target href (or route path). */
  href: string;
  /** Optional variant controlling the visual style. */
  variant?: "primary" | "highlight" | "plain";
  /** Whether to render a chevron-down indicator after the label. */
  hasDropdown?: boolean;
  /** Optional short badge text, e.g. "NEW". */
  badge?: string;
}

/**
 * A single link inside a footer column.
 *
 * `emphasis` marks the one link per column that is rendered
 * in white / semibold rather than the default slate tone
 * (used for the current course in the COURSES column).
 */
export interface FooterLink {
  /** Visible label of the link. */
  label: string;
  /** Target href (or route path). */
  href: string;
  /** When true, render with the stronger "active" style. */
  emphasis?: boolean;
}

/**
 * A titled column of footer links.
 * Rendered under an uppercase heading such as "COMPANY".
 */
export interface FooterColumn {
  /** Column heading, e.g. "COMPANY", "RESOURCES". */
  heading: string;
  /** Links rendered inside the column, in order. */
  links: FooterLink[];
}