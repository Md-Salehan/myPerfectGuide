// src/pages/product-details/course-digital-marketing/sections/DigitalMarketingHero.tsx
// Wraps the reusable HeroSection with the Digital Marketing course content.

import { SidebarEnrollCardDigitalMarketing } from "../../../../components/product/SidebarEnrollCardDigitalMarketing";
import type { HeroSectionProps } from "../../../../components/product/sections";
import { HeroSection } from "../../../../components/product/sections";

export function DigitalMarketingHero() {
  const props: HeroSectionProps = {
    breadcrumbCurrent: "Digital Marketing Course with Placement Support",
    badges: [
      { variant: "bestseller", label: "₹6 LPA PLACEMENT PROMISE" },
      { variant: "cohort", label: "LAUNCH PRICING: UP TO 75% OFF" },
    ],
    title:
      "Become a Job-Ready Digital Marketer — With Skills, Proof, and a Career Behind You",
    description:
      "Learn SEO, Google Ads, Meta Ads, Email Marketing, Analytics and AI tools — then put them to work in two real internships and freelance projects. On the Premium plan, we back your outcome with a promise: a job offer of ₹6 LPA or more through our placement network within 30 days of course completion — or your Placement fee is refunded.",
    metaItems: [
      {
        icon: (
          <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001.5.87l10-6a1 1 0 000-1.74l-10-6A1 1 0 004 3z" />
          </svg>
        ),
        label: "15+ modules",
      },
      {
        icon: (
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              d="M3 12h18M12 3c2.5 2.7 2.5 14.3 0 18M12 3c-2.5 2.7-2.5 14.3 0 18"
            />
          </svg>
        ),
        label: "Hinglish",
      },
      {
        icon: (
          <svg
            className="w-4 h-4 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3l1.9 5.8L20 10l-5 3.4L16.5 20 12 16.8 7.5 20 9 13.4 4 10l6.1-1.2z"
            />
          </svg>
        ),
        label: "AI integrated",
      },
      {
        icon: (
          <span className="flex items-center gap-0.5 text-amber-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.5 11.545.5 7.41l6.061-.88L10 1l3.439 5.53 6.061.88-5 4.135 1.378 6.545z" />
            </svg>
          </span>
        ),
        trailing: (
          <>
            <span className="text-white font-semibold">2,400+</span>
            <span className="text-slate-400">Students Placed</span>
          </>
        ),
      },
    ],
    pills: [
      { label: "Mode:", value: "Live + Recorded" },
      { label: "Duration:", value: "15 weeks" },
      { label: "Batch starts:", value: "15 Oct 2026" },
    ],
    sidebarCard: <SidebarEnrollCardDigitalMarketing />,
  };

  return <HeroSection {...props} />;
}