// ============================================================
// src/pages/product-details/course-digital-marketing/sections/FaqSection.tsx
// REUSE — identical structure to the taxation FAQ section,
// consuming FAQ_DATA_DIGITAL_MARKETING instead.
// ============================================================

import { useState } from "react";

import { FAQ_DATA, type FaqCategoryName } from "../data/faqData";

export function FaqSection() {
  const categories = Object.keys(FAQ_DATA) as FaqCategoryName[];
  const [activeCategory, setActiveCategory] = useState<FaqCategoryName>(categories[0]);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  const handleCategoryChange = (category: FaqCategoryName) => {
    setActiveCategory(category);
    setOpenQuestionIndex(0);
  };

  const items = FAQ_DATA[activeCategory];

  return (
    <section className="bg-white py-14 lg:py-20 border-t border-slate-100">
      <div className="shell">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-emerald-600 font-bold text-sm tracking-wide mb-2">FAQS</p>
          <h2 className="section-title text-2xl sm:text-[34px]">
            Frequently <span className="text-emerald-600">Asked Questions</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 faq-grid">
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 faq-tabs-scroll">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`text-left whitespace-nowrap shrink-0 px-4 py-3 rounded-lg font-semibold text-[14.5px] border-l-2 border-transparent transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 border-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, index) => {
              const isOpen = index === openQuestionIndex;
              return (
                <div key={item.q} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenQuestionIndex(isOpen ? -1 : index)}
                    className={`w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-slate-900 text-[15px] ${
                      isOpen ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`px-5 text-[14.5px] text-slate-600 leading-relaxed transition-all ${
                      isOpen ? "max-h-96 pb-5 pt-0 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}