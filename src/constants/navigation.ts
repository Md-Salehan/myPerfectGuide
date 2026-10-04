// ============================================================
// src/constants/navigation.ts
// Header navigation items, split into two arrays because the
// desktop nav and the mobile menu are rendered differently in
// the original markup (different variants, different items).
//
// Consumed by:
//   - components/layout/Header.tsx
// ============================================================

import type { NavLink } from "../types/common";

/**
 * Desktop navigation links.
 *
 * Order matches the original desktop nav exactly:
 *   1. Courses        (dark pill button, has chevron)
 *   2. AI Course      (light slate highlight, "NEW" badge)
 *   3. Placements     (plain link)
 *   4. Resources      (plain link, has chevron)
 *   5. Request Callback (plain link)
 *
 * "Log In" is rendered separately in the Header as a primary
 * CTA button, so it is not part of this list.
 */
export const NAV_LINKS: readonly NavLink[] = [
  {
    label: "Courses",
    href: "#",
    variant: "primary",
    hasDropdown: true,
  },
  {
    label: "AI Course",
    href: "#",
    variant: "highlight",
    badge: "NEW",
  },
  {
    label: "Placements",
    href: "#",
    variant: "plain",
  },
  {
    label: "Resources",
    href: "#",
    variant: "plain",
    hasDropdown: true,
  },
  {
    label: "Request Callback",
    href: "#",
    variant: "plain",
  },
] as const;

/**
 * Mobile menu links.
 *
 * Order matches the original mobile menu panel exactly:
 *   1. Courses        (highlighted row with slate background)
 *   2. AI Course      (plain row, "NEW" badge)
 *   3. Placements     (plain row)
 *   4. Resources      (plain row)
 *   5. Request Callback (plain row)
 *
 * "Log In" is rendered separately in the mobile panel as a
 * full-width primary CTA button, so it is not part of this
 * list. Chevrons are not rendered in the mobile panel, so
 * `hasDropdown` is intentionally omitted here.
 */
export const MOBILE_NAV_LINKS: readonly NavLink[] = [
  {
    label: "Courses",
    href: "#",
    variant: "highlight",
  },
  {
    label: "AI Course",
    href: "#",
    variant: "plain",
    badge: "NEW",
  },
  {
    label: "Placements",
    href: "#",
    variant: "plain",
  },
  {
    label: "Resources",
    href: "#",
    variant: "plain",
  },
  {
    label: "Request Callback",
    href: "#",
    variant: "plain",
  },
] as const;