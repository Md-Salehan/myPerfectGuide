// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/FaqSection.tsx
// FAQ section — category tabs on the left, accordion on the
// right.
//
// Interactive state is LOCAL to this component:
//   - activeCategory   (which tab is selected)
//   - openQuestionIndex (which item is expanded within it)
//
// The source implements this with vanilla JS that rebuilds the
// DOM on each interaction; in React the same behaviour is
// driven entirely by these two pieces of state.
// ============================================================

import { useState } from "react";

import { FAQ_DATA, type FaqCategoryName } from "../data/faqData";

export function FaqSection() {
  // Default to the first category, matching the initial state
  // of the vanilla script in the source.
  const [activeCategory, setActiveCategory] = useState<FaqCategoryName>(
    "General Questions",
  );

  // First question is open by default, matching `openQuestionIndex = 0`
  // in the source.
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  // Category names come straight from the FAQ_DATA keys, in the
  // same order they're declared in the data file (matching the
  // source's `Object.keys(faqData)` iteration).
  const categories = Object.keys(FAQ_DATA) as FaqCategoryName[];

  const handleCategoryChange = (category: FaqCategoryName) => {
    setActiveCategory(category);
    // Reset open question to the first one on category change,
    // matching the source's behaviour on tab click.
    setOpenQuestionIndex(0);
  };

  const handleQuestionToggle = (index: number) => {
    // Toggle: clicking the open item closes it (index -1),
    // clicking a closed item opens it.
    setOpenQuestionIndex((current) => (current === index ? -1 : index));
  };

  const items = FAQ_DATA[activeCategory];

  return (
    <section className="bg-white py-14 lg:py-20 border-t border-slate-100">
      <div className="shell">
        {/* ---------- Header ---------- */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-emerald-600 font-bold text-sm tracking-wide mb-2">FAQS</p>
          <h2 className="section-title text-2xl sm:text-[34px]">
            Frequently <span className="text-emerald-600">Asked Questions</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 faq-grid">
          {/* ============================================================
              Category tabs (left column)
              ============================================================ */}
          <div
            id="faqTabs"
            className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 faq-tabs-scroll"
          >
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`text-left whitespace-nowrap shrink-0 px-4 py-3 rounded-lg font-semibold text-[14.5px] border-l-2 lg:border-l-2 border-transparent transition ${isActive
                      ? "bg-indigo-50 text-indigo-700 border-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* ============================================================
              Accordion (right column)
              ============================================================ */}
          <div id="faqAccordion" className="flex flex-col gap-3">
            {items.map((item, index) => {
              const isOpen = index === openQuestionIndex;
              return (
                <div
                  key={item.q}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  {/* Question header */}
                  <button
                    type="button"
                    onClick={() => handleQuestionToggle(index)}
                    className={`w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold text-slate-900 text-[15px] ${isOpen ? "bg-slate-50" : "bg-white"
                      }`}
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Answer body */}
                  <div
                    className={`px-5 text-[14.5px] text-slate-600 leading-relaxed transition-all ${isOpen
                        ? "max-h-96 pb-5 pt-0 opacity-100"
                        : "max-h-0 py-0 opacity-0 overflow-hidden"
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