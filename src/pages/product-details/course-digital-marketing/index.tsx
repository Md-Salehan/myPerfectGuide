// ============================================================
// src/pages/product-details/course-digital-marketing/CourseDigitalMarketingPage.tsx
// Digital Marketing course product detail page.
//
// Mirrors the layout of CourseTaxationCompliancePage.tsx:
//   - outer wrapper with a dark hero bleed behind the top
//   - lg two-column grid: sections on the left, sticky sidebar on the right
//   - full-width sections rendered below the grid
//
// Section order is tailored to the AdsAcademy copy — internships,
// freelance program, placement program and the full pricing
// comparison are promoted to full-width sections because they
// carry the Premium value proposition and need the room.
// ============================================================


import { CareerOutcomes } from "./sections/CareerOutcomes";
import { Certifications } from "./sections/Certifications";
import { CourseHighlights } from "./sections/CourseHighlights";
import { CourseIncludes } from "./sections/CourseIncludes";
import { FaqSection } from "./sections/FaqSection";
import { FinalCta } from "./sections/FinalCta";
import { FreelanceProgram } from "./sections/FreelanceProgram";
import { DigitalMarketingHero } from "./sections";
import { HowItWorks } from "./sections/HowItWorks";
import { MarketGapAndSolution } from "./sections/MarketGapAndSolution";
import { OurPromise } from "./sections/OurPromise";
import { PlacementProgram } from "./sections/PlacementProgram";
import { PlansPricing } from "./sections/PlansPricing";
import { ProofCohortResults } from "./sections/ProofCohortResults";
import { RealInternships } from "./sections/RealInternships";
import { ToolsYouMaster } from "./sections/ToolsYouMaster";
import { WhatYouLearn } from "./sections/WhatYouLearn";
import { WhoThisIsFor } from "./sections/WhoThisIsFor";
import { SidebarEnrollCard } from "../../../components/product/SidebarEnrollCard";

export function CourseDigitalMarketingPage() {
    return (
        <div className="relative">
            {/* Dark hero bleed behind hero + desktop sidebar column */}
            <div
                id="heroDarkBg"
                className="hero-bleed absolute top-0 bg-ink-950 z-0"
                style={{ height: 600 }}
            />

            <div className="relative z-10 max-lg:px-0 lg:grid lg:grid-cols-[1fr_400px] lg:gap-8 xl:gap-12">
                {/* ============================================================
            LEFT COLUMN — top-of-page sections
            ============================================================ */}
                <div className="min-w-0">
                    <DigitalMarketingHero /> //Dynamic Reused
                    <CourseHighlights /> // Dynamic Reused
                    <CourseIncludes /> // Reused
                    <WhatYouLearn /> // Reused
                    <ToolsYouMaster />
                    <WhoThisIsFor /> // Reused
                    <HowItWorks /> // Reused
                </div>

                {/* ============================================================
            RIGHT COLUMN — sticky sidebar (lg+ only)
            ============================================================ */}
                <aside className="hidden lg:block">
                    <div className="sticky-sidebar">
                        <div className="sidebar-card">
                            <SidebarEnrollCard
                                promoThumbnail={{ type: "video", src: "/video/ads-promo.mp4", poster: "/img/ads-promo.jpg" }}
                                footNote="Premium seats are limited per batch."
                                plans={[
                                    {
                                        label: "Standard — ₹4,999",
                                        price: 4999,
                                        original: 10000,
                                        off: 50,
                                        ctaLabel: "Enroll in Standard — ₹4,999",
                                        features: [
                                            "15-module curriculum",
                                            "Live interactive classes",
                                            "Lifetime access to recordings",
                                            "Capstone project",
                                            "Certificate of completion",
                                        ],
                                    },
                                    {
                                        label: "Premium — ₹14,999",
                                        price: 14999,
                                        original: 60000,
                                        off: 75,
                                        ctaLabel: "Enroll in Premium — ₹14,999",
                                        
                                        note:
                                            "Your ₹10,000 Placement & Internship fee is 100% refundable if we don't deliver your internships and placement.",
                                        features: [
                                            "Everything in Standard",
                                            "2 real internships & placement ",
                                            "₹6 LPA+ placement promise",
                                        ],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </aside>
            </div>

            {/* ============================================================
          FULL-WIDTH SECTIONS — below the two-column grid
          ============================================================ */}
            <div>
                <MarketGapAndSolution />
                <RealInternships />
                <FreelanceProgram />
                <PlacementProgram />
                <OurPromise />
                <PlansPricing />
                <CareerOutcomes />
                <ProofCohortResults />
                <Certifications />
                <FaqSection />
                <FinalCta />
            </div>
        </div>
    );
}