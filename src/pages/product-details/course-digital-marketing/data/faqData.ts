// ============================================================
// src/data/faqData.ts
// FAQ content for the product detail page.

// ============================================================

import type {  FaqGroups } from "../../../../types/faq";

export type FaqCategoryName =
  | "General Questions"
  | "Program & Tools"
  | "Standard vs Premium"
  | "Internships & Placement"
  | "Still have questions?";

export const FAQ_DATA: FaqGroups<FaqCategoryName> = {
  "General Questions": [
    {
      q: "Do I need prior experience?",
      a: "No. We start from what digital marketing is and how platforms work. If you can use a smartphone, you can start.",
    },
    {
      q: "What happens after the Standard plan?",
      a: "You graduate with a certificate, a capstone project and full curriculum knowledge, ready to apply for roles, pitch freelance clients and pursue opportunities independently.",
    },
  ],
  "Program & Tools": [
    {
      q: "How long is the program?",
      a: "About 3 months (15 weeks) of live and recorded classes. The Premium placement window starts after course completion and runs 30 days.",
    },
    {
      q: "How are classes delivered?",
      a: "Live interactive classes on scheduled days, recordings afterward, regular doubt-clearing sessions, and lifetime access to recordings.",
    },
    {
      q: "What tools will I use?",
      a: "25+ tools, hands-on, including Google Ads, SEMRush, Ahrefs, Meta Ads Manager, GA4, HubSpot, Mailchimp, Canva, ChatGPT, Jasper, Surfer SEO and Power BI.",
    },
  ],
  "Standard vs Premium": [
    {
      q: "What's the real difference?",
      a: "Standard is the complete curriculum and certificate. Premium adds two real internships, freelance access, a placement team, resume/LinkedIn support, mock interviews and the refund-backed ₹6 LPA promise.",
    },
  ],
  "Internships & Placement": [
    {
      q: "Are the internships real?",
      a: "Yes. Real organizations, real briefs and deliverables, and an internship certificate. Not mock projects.",
    },
    {
      q: "What exactly is the ₹6 LPA promise?",
      a: "If we don't place you in a full-time job of ₹6 LPA+ through our placement network within 30 days of course completion, you get 100% of your Placement fee back. The refund covers the Premium add-on fee, not the base course fee.",
    },
    {
      q: "What if I get a job on my own?",
      a: "You still get 100% of your Placement fee back. The fee is for our service, not your outcome.",
    },
    {
      q: "Is there an eligibility criterion?",
      a: "Yes. You need to complete the program and actively participate in career-prep sessions. Specifics are shared at enrollment.",
    },
  ],
  "Still have questions?": [
    {
      q: "How do I reach you?",
      a: "Reach out on WhatsApp. We answer everything.",
    },
  ],
};