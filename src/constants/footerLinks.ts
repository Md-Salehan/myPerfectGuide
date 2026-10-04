// ============================================================
// src/constants/footerLinks.ts
// All footer link content, split into the three shapes that
// actually appear in the original markup:
//
//   1. Titled columns (COMPANY / RESOURCES / COURSES)
//   2. Flat pipe-separated rows (POPULAR HANDBOOKS)
//   3. Flat pipe-separated rows (ONLINE TOOLS)
//
// Consumed by:
//   - components/layout/Footer.tsx
// ============================================================

import type { FooterColumn, FooterLink } from "../types/common";

/**
 * The three titled footer columns rendered in a 4-column grid
 * on desktop (the fourth column is the brand block).
 *
 * Order matches the original markup exactly.
 */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "COMPANY",
    links: [
      { label: "About Us", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Pricing & Refund Policy", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { label: "GST Return Filing Guide", href: "#" },
      { label: "ITR Filing Checklist", href: "#" },
      { label: "Tax Saving Tips", href: "#" },
      { label: "Accounting Templates", href: "#" },
      { label: "Digital Marketing for Tax Professionals", href: "#" },
      { label: "Client Acquisition Playbook", href: "#" },
    ],
  },
  {
    heading: "COURSES",
    links: [
      {
        // The current course is rendered in white / semibold.
        label: "Complete Taxation & Compliance Course",
        href: "#",
        emphasis: true,
      },
      { label: "GST Mastery Course", href: "#" },
      { label: "ITR Filing Course", href: "#" },
      { label: "Accounting & Bookkeeping Course", href: "#" },
      { label: "Tax Planning Course", href: "#" },
    ],
  },
] as const;

/**
 * Links shown under the "POPULAR HANDBOOKS" heading.
 * Rendered as an inline row separated by "|" characters
 * (the pipes are added by the Footer component, not stored
 * in the data).
 */
export const POPULAR_HANDBOOKS: readonly FooterLink[] = [
  { label: "GST Handbook", href: "#" },
  { label: "ITR Filing Handbook", href: "#" },
  { label: "Tax Planning Handbook", href: "#" },
  { label: "Accounting Handbook", href: "#" },
  { label: "Client Acquisition Handbook", href: "#" },
] as const;

/**
 * Links shown under the "ONLINE TOOLS" heading.
 * Same pipe-separated inline layout as POPULAR_HANDBOOKS.
 */
export const ONLINE_TOOLS: readonly FooterLink[] = [
  { label: "GST Calculator", href: "#" },
  { label: "Income Tax Calculator", href: "#" },
  { label: "TDS Calculator", href: "#" },
  { label: "HRA Calculator", href: "#" },
  { label: "EMI Calculator", href: "#" },
] as const;