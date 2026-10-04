// ============================================================
// src/data/faqData.ts
// FAQ content for the product detail page.

// ============================================================

import type {  FaqGroups } from "../../../../types/faq";

export type FaqCategoryName =
  | "General Questions"
  | "Program & Curriculum"
  | "Teaching & Mentorship"
  | "Income & Client Acquisition"
  | "Fee & Payment";

export const FAQ_DATA: FaqGroups<FaqCategoryName> = {
  "General Questions": [
    {
      q: "What is this Complete Taxation & Compliance Course?",
      a: "It's a practical, 2-month program that teaches you GST registration & returns, ITR filing, accounting, bookkeeping, and legal tax planning — plus how to build a portfolio website and get clients through digital marketing. By the end, you'll have both the skill and the client-acquisition system to start earning from home.",
    },
    {
      q: "Do I need any prior accounting or tax knowledge?",
      a: "No. The course starts from the absolute basics and builds up step by step. You don't need a B.Com, CA, or any accounting background — just a willingness to learn and practise.",
    },
    {
      q: "Is this course suitable for complete beginners?",
      a: "Yes. It's designed specifically for beginners — students, freshers, working professionals, and freelancers who want to learn taxation from scratch and turn it into an income source.",
    },
    {
      q: "Why should I take this course instead of a traditional degree?",
      a: "A traditional degree takes 3–5+ years and doesn't guarantee income. This course takes just 2 months, focuses entirely on practical, billable skills, and includes client acquisition training — so you can start earning while others are still studying theory.",
    },
    {
      q: "In which language is this course taught?",
      a: "The course is taught primarily in Hindi with English terminology for technical and legal terms. This makes it easy to follow for learners across India while ensuring you're comfortable with the professional vocabulary used in the industry.",
    },
  ],

  "Program & Curriculum": [
    {
      q: "How long is the course?",
      a: "The core program runs for 2 months, split into GST & Compliance (Month 1) and ITR, Accounting & Tax Planning (Month 2). Digital Marketing & Client Acquisition is taught alongside, so you're ready to get clients as soon as you finish.",
    },
    {
      q: "Will I get access to recordings?",
      a: "Yes. Every live session is recorded and uploaded to your student dashboard, usually within 24 hours. You can revisit them anytime during your access period.",
    },
    {
      q: "What practical skills will I learn?",
      a: "You'll learn GST registration, GSTR-1/3B/9 filing, ITC reconciliation, E-Way Bill, LUT filing, ITR filing for all income types, TDS/TCS, bookkeeping, balance sheet preparation, legal tax planning, portfolio website building, and digital marketing to get clients.",
    },
    {
      q: "Is the portfolio website and digital marketing training included?",
      a: "Yes — it's fully included. You'll learn how to build your own professional tax services website (no coding needed), run Facebook & Instagram ads, use LinkedIn and WhatsApp for outreach, and create a complete client acquisition system.",
    },
    {
      q: "Can I start earning after completing this course?",
      a: "Yes. The entire third month is dedicated to helping you launch — building your portfolio, setting up your services, and getting your first clients. Many students begin filing returns for their first clients within weeks of finishing.",
    },
  ],

  "Teaching & Mentorship": [
    {
      q: "Who teaches this course?",
      a: "The course is taught by an experienced taxation professional who has helped hundreds of businesses and individuals with GST, ITR, and legal tax planning. Full instructor details are available in the 'Meet the Instructor' section above.",
    },
    {
      q: "Is there doubt support?",
      a: "Yes. You get 1:1 doubt support along with dedicated doubt-solving sessions every week. You can also post questions in the private community and get answers from mentors and peers.",
    },
    {
      q: "Is there a community for students?",
      a: "Yes. Every student gets access to a private community (Discord/WhatsApp) where you can network with peers, ask questions, share wins, and get support from mentors.",
    },
    {
      q: "Will I get feedback on my work?",
      a: "Yes. Selected assignments and project submissions are reviewed, and personalised feedback is shared during the mentorship sessions. This is how you build confidence before working with real clients.",
    },
  ],

  "Income & Client Acquisition": [
    {
      q: "How much can I realistically earn after this course?",
      a: "It depends on how many clients you take on and how you price your services. Students typically start with ₹500–₹2,000 per GST return and ₹1,000–₹5,000 per ITR filing. With a handful of monthly retainer clients, reaching ₹1 lakh+/month is achievable — and the course teaches you exactly how to get there.",
    },
    {
      q: "How will I get clients?",
      a: "You'll learn a complete client acquisition system: building a professional portfolio website, running Facebook and Instagram ad campaigns, using LinkedIn and WhatsApp for outreach, setting up Google Ads, and creating a referral engine. You'll be equipped to get clients from all over India, not just your local area.",
    },
    {
      q: "Do you teach legal tax planning?",
      a: "Yes — and it's a core part of the course. You'll learn how to legally structure a client's income, deductions, and investments to reduce their tax liability. This is the skill that separates a replaceable filer from a sought-after advisor.",
    },
    {
      q: "What tools and software will I learn?",
      a: "You'll work with the GST Portal, Income Tax Portal, TRACES, Tally or Zoho Books, Canva, Meta Ads Manager, Google Ads, WhatsApp Business, and website builders like WordPress — all tools used by professional tax consultants today.",
    },
  ],

  "Fee & Payment": [
    {
      q: "What is the course fee?",
      a: "The course is priced at ₹15,990, but the first 50 students get a 90% discount — bringing it down to just ₹1,599. Lifetime access is available at ₹2,999. Exact pricing is displayed in the enrollment card on this page.",
    },
    {
      q: "How do I get the 90% discount?",
      a: "The 90% discount is automatically applied for the first 50 students who enroll. No coupon code is needed — the discounted price will show at checkout. Once the first 50 seats are filled, the price returns to the standard rate.",
    },
    {
      q: "Are EMI options available?",
      a: "Yes, no-cost EMI options are available at checkout through our payment partners for both the 1-year and lifetime plans. You can split the payment across 3, 6, or 9 months depending on your card issuer.",
    },
    {
      q: "Is there a refund policy?",
      a: "Yes, we have a refund policy. Please refer to our Pricing & Refund Policy page (linked in the footer) for complete details, including eligibility windows and the process for requesting a refund.",
    },
  ],
};