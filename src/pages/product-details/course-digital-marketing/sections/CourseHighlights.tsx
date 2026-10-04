// ============================================================
// src/pages/product-details/course-digital-marketing/sections/CourseHighlights.tsx
// ============================================================

import { CourseHighlights as CourseHighlightsBase } from "../../../../components/product/sections";

export function CourseHighlights() {
  return (
    <CourseHighlightsBase
      items={[
        { text: <>15+ modules, 25+ tools — theory + live campaign practice</> },
        { text: <>2 real internships, freelance projects and a capstone campaign</> },
        { text: <>Dedicated placement team + ₹6 LPA promise (refund-backed)</> },
      ]}
    />
  );
}