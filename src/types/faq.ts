// ============================================================
// src/types/faq.ts
// Types for the FAQ content and its tab categories.
//
// Consumed by:
//   - data/faqData.ts
//   - pages/product-details/course-taxation-compliance/sections/FaqSection.tsx
// ============================================================

/**
 * A single question/answer pair rendered inside the FAQ accordion.
 *
 * Both fields are plain text — no HTML markup — matching the
 * source content exactly. They are rendered as text nodes by
 * the FaqSection component.
 */
export interface FaqItem {
  /** The question shown as the accordion header. */
  q: string;
  /** The answer revealed when the item is expanded. */
  a: string;
}

export type FaqList = readonly FaqItem[];

export type FaqGroups<K extends string = string> = Record<K, FaqList>;

