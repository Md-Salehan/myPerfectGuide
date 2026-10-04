// ============================================================
// src/pages/product-details/course-taxation-compliance/CourseTaxationCompliancePage.tsx
// Course 1 Product Detail page — assembles all sections and
// the desktop sticky sidebar.
//
// Layout mirrors the source:
//   - outer .shell wrapper with two-column grid on lg+
//   - left column contains every section in order
//   - right column contains the sticky SidebarEnrollCard
//   - a dark background bleed behind the hero on desktop
//
// The source adjusts the bleed div's height at runtime via
// inline JS; we approximate it with a CSS height that matches
// the desktop hero (~600px). The `hero-bleed` class hides it
// below lg, so it has no effect on mobile.
// ============================================================

import { Clock4 } from "lucide-react";
import { SidebarEnrollCard } from "../../../components/product/SidebarEnrollCard";

import { CareerOutcomes } from "./sections/CareerOutcomes";
import { Certifications } from "./sections/Certifications";
import { CourseHighlights } from "./sections/CourseHighlights";
import { CourseIncludes } from "./sections/CourseIncludes";
import { FaqSection } from "./sections/FaqSection";
import { FinalCta } from "./sections/FinalCta";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorks } from "./sections/HowItWorks";
import { MarketGapAndSolution } from "./sections/MarketGapAndSolution";
import { OurPromise } from "./sections/OurPromise";
import { Testimonials } from "./sections/Testimonials";
import { ToolsYouMaster } from "./sections/ToolsYouMaster";
import { WhatYouLearn } from "./sections/WhatYouLearn";
import { WhoThisIsFor } from "./sections/WhoThisIsFor";

export function CourseTaxationCompliancePage() {
  return (
    <div className="relative">
      {/*
        Full-bleed dark background behind the hero + desktop
        sidebar column. Hidden below lg via .hero-bleed.
      */}
      <div
        id="heroDarkBg"
        className="hero-bleed absolute top-0 bg-ink-950 z-0"
        style={{ height: 600 }}
      />

      <div className="relative z-10 max-lg:px-0 lg:grid lg:grid-cols-[1fr_400px] lg:gap-8 xl:gap-12">
        {/* ============================================================
            LEFT COLUMN — all sections in order
            ============================================================ */}
        <div className="min-w-0">
          <HeroSection />
          <CourseHighlights />
          <CourseIncludes />
          <WhatYouLearn />
          <ToolsYouMaster />
          <WhoThisIsFor />
          <HowItWorks />

        </div>

        {/* ============================================================
            RIGHT COLUMN — sticky sidebar (lg+ only)
            ============================================================ */}
        <aside className="hidden lg:block">
          <div className="sticky-sidebar">
            <div className="sidebar-card">
              <SidebarEnrollCard
                promoThumbnail={{ type: "image", src: "/img/taxation-promo.jpg", alt: "Taxation & Compliance Course" }}
                plans={[
                  {
                    label: "1 Year — ₹1,599",
                    price: 1599,
                    original: 15990,
                    off: 90,
                    priceNote: { text: "1 Year Validity", icon: <Clock4 /> },
                    features: [
                      "Complete GST & ITR Training",
                      "Portfolio Website Building",
                      "Digital Marketing & Client Acquisition",
                      "10+ Real-World Projects",
                      "Live + Recorded Sessions",
                      "1 Year Access",
                    ],
                  },
                  {
                    label: "Lifetime — ₹2,999",
                    price: 2999,
                    original: 19990,
                    off: 85,
                    priceNote: { text: "Lifetime Access", icon: <Clock4 /> },
                    features: [
                      "Everything in 1 Year",
                      "Lifetime access to recordings",
                      "All future updates",
                      "Priority doubt support",
                      "Certificate of completion",
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </aside>

      </div>
      <div>
        <MarketGapAndSolution />
        <CareerOutcomes />
        <Testimonials />
        <OurPromise />
        <Certifications />
        <FaqSection />
        <FinalCta />

      </div>
    </div>
  );
}