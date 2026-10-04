// ============================================================
// src/pages/product-details/course-digital-marketing/sections/CourseIncludes.tsx
// REUSE — same 8-item icon grid, content swapped to the
// AdsAcademy "This course includes" list.
// ============================================================

export function CourseIncludes() {
  return (
    <section className="shell max-md:px-8 py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <h2 className="section-title text-2xl sm:text-[28px] mb-6">This course includes:</h2>

      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-4 includes-grid">
        {/* Live interactive classes + recorded lectures with lifetime access */}
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
          Live interactive classes + recorded lectures with lifetime access
        </div>

        {/* Regular doubt-clearing sessions */}
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
          Regular doubt-clearing sessions
        </div>

        {/* 15+ modules covering the full digital marketing ecosystem */}
        <div className="flex items-center gap-3 text-[15px] text-slate-800 font-semibold">
          <svg
            className="w-5 h-5 text-slate-800 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
          </svg>
          15+ modules covering the full digital marketing ecosystem
        </div>

        {/* 25+ industry tools, practiced hands-on */}
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
              d="M14.7 6.3a4 4 0 105.4 5.4L21 21H3V3h9.6l2.1 3.3z"
            />
          </svg>
          25+ industry tools, practiced hands-on
        </div>

        {/* AI tools (ChatGPT, Jasper, Canva AI and more) woven through every module */}
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
              d="M12 3l1.9 5.8L20 10l-5 3.4L16.5 20 12 16.8 7.5 20 9 13.4 4 10l6.1-1.2z"
            />
          </svg>
          AI tools (ChatGPT, Jasper, Canva AI and more) woven through every module
        </div>

        {/* Practical assignments and real campaign projects */}
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
          Practical assignments and real campaign projects
        </div>

        {/* Capstone project with instructor review */}
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
              d="M12 3v18M5 21h14M7 7l5-4 5 4"
            />
          </svg>
          Capstone project with instructor review
        </div>

        {/* Verified certificate of completion + student community access */}
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
          Verified certificate of completion + student community access
        </div>
      </div>
    </section>
  );
}