// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/CourseIncludes.tsx
// "This course includes:" section — a heading and a responsive
// two-column grid of eight icon + label rows.
//
// Ported 1:1 from the <section> block with the same heading in
// index.html. Each of the eight items has a different icon, so
// they are written as inline JSX rows rather than iterated from
// a data array — this matches the source markup 1:1 and avoids
// embedding JSX inside a data structure.
// ============================================================

export function CourseIncludes() {
  return (
    <section className="shell max-md:px-8 py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-6">This course includes:</h2>

      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4 includes-grid">
        {/* 1:1 Doubts Support */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          1:1 Doubts Support
        </div>

        {/* Step-by-step practical training on real software */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h8M8 10h8M8 14h4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 17h2v2h-2z" />
          </svg>
          Step-by-step practical training on real software
        </div>

        {/* 100+ hours on-demand video */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l5 3-5 3V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 22h8M12 18v4" />
          </svg>
          100+ hours on-demand video
        </div>

        {/* 150+ downloadable resources */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 3v6h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h4" />
          </svg>
          150+ downloadable resources (templates, checklists, formats)
        </div>

        {/* 10+ real-world practice assignments */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
          10+ real-world practice assignments
        </div>

        {/* Portfolio website building + digital marketing training */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
            />
          </svg>
          Portfolio website building + digital marketing training
        </div>

        {/* Legal tax planning techniques */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18M7 7l5-4 5 4M5 21h14M7 7l-3 7a3 3 0 006 0L7 7zM17 7l-3 7a3 3 0 006 0l-3-7z"
            />
          </svg>
          Legal tax planning techniques to save clients' money
        </div>

        {/* Certificate of completion */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="9" r="5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5"
            />
          </svg>
          Certificate of completion
        </div>
      </div>
    </section>
  );
}