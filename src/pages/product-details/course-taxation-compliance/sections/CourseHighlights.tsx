// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/CourseHighlights.tsx
// ============================================================

import { CourseHighlights as CourseHighlightsBase } from "../../../../components/product/sections";

export function CourseHighlights() {
  return (
    <CourseHighlightsBase
      items={[
        { text: <>Learn GST, ITR, Accounting &amp; Tax Planning practically</> },
        { text: <>Build your portfolio website + run ads + get clients</> },
        { text: <>1:1 Mentorship &amp; Doubts support</> },
      ]}
    />
  );
}