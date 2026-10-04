// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/ToolsYouMaster.tsx
// "Tools You'll Master" section — a light slate card with a
// heading, subtitle, and a 2/3-column grid of nine tool chips.
//
// Ported 1:1 from the corresponding <section> in index.html.
// Chips are written inline (not iterated from a data array)
// because each has a distinct visual treatment — icons vs
// wordmarks, different colours, and one gradient wordmark.
// ============================================================

export function ToolsYouMaster() {
  return (
    <section className="shell py-8 lg:py-10 border-t border-slate-100 lg:pl-10 learn-section">
      <div className="card p-6 sm:p-8 !bg-[#FAFBFD]">
        <h2 className="text-center text-lg font-bold text-slate-400 mb-2 tracking-wide">
          Tools You'll Master
        </h2>
        <p className="text-center text-slate-500 text-[13.5px] mb-7 max-w-md mx-auto">
          Everything you need to run a professional taxation practice — from government portals to client-facing tools.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 learners-grid">
          {/* GST Portal */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-2 bg-white">
            <svg
              className="w-5 h-5 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              />
            </svg>
            <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
              GST Portal
            </span>
          </div>

          {/* Income Tax Portal */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-2 bg-white">
            <svg
              className="w-5 h-5 text-indigo-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M5 21V7l7-4 7 4v14M9 12h2M13 12h2M9 16h2M13 16h2"
              />
            </svg>
            <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
              Income Tax Portal
            </span>
          </div>

          {/* Tally */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 bg-white">
            <span className="font-sans text-lg font-extrabold text-blue-700 tracking-tight">
              Tally<span className="text-amber-500">.</span>
            </span>
          </div>

          {/* Zoho Books */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 bg-white">
            <span className="font-sans text-base font-extrabold text-red-600 tracking-tight">
              Zoho<span className="text-slate-800"> Books</span>
            </span>
          </div>

          {/* TRACES */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 bg-white">
            <span className="font-sans text-base font-extrabold text-slate-900 tracking-wider">
              TRACES
            </span>
          </div>

          {/* Meta Ads Manager */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-1.5 bg-white">
            <svg
              className="w-5 h-5 text-blue-600 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm6 8h-2v-4c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v-6h2v.5c.5-.3 1.1-.5 1.5-.5 1.4 0 2.5 1.1 2.5 2.5V17z" />
            </svg>
            <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
              Meta Ads Manager
            </span>
          </div>

          {/* Google Ads */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-1.5 bg-white">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path
                d="M3.3 20.7a2 2 0 01-.3-1.1c0-.4.1-.7.3-1l5-8.6 2.2 3.8-3.5 6a1.9 1.9 0 01-1.7 1c-.4 0-.7-.1-1-.1z"
                fill="#FBBC04"
              />
              <path
                d="M11.6 3.2c-.6-1-1.5-1.5-2.7-1.5S7 2.2 6.4 3.2L.6 13.2A3 3 0 000 14.7c0 .6.1 1.1.4 1.6.6 1 1.5 1.5 2.7 1.5s2.1-.5 2.7-1.5l5.8-10c.3-.5.4-1 .4-1.5s-.2-1.1-.4-1.6z"
                fill="#4285F4"
              />
              <path
                d="M23.4 13.2c-.6-1-1.5-1.5-2.7-1.5s-2.1.5-2.7 1.5l-5.8 10c-.3.5-.4 1-.4 1.5 0 .1 0 .2.1.3h5.2l6.3-10.8c.3-.5.4-1 .4-1.5-.1-.2-.2-.4-.4-.5z"
                fill="#34A853"
              />
              <path
                d="M12.2 12.5l-3.5 6c-.6 1-1.5 1.5-2.7 1.5h-.1c1.1.7 2.3.9 3.4.4.5-.2 1-.6 1.3-1.1l1.6-2.8v-4z"
                fill="#EA4335"
                opacity=".35"
              />
            </svg>
            <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
              Google Ads
            </span>
          </div>

          {/* WhatsApp Business */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 gap-1.5 bg-white">
            <svg
              className="w-5 h-5 text-[#25D366] shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
            </svg>
            <span className="font-sans text-[13px] font-bold text-slate-800 leading-tight">
              WhatsApp Business
            </span>
          </div>

          {/* Canva */}
          <div className="border border-slate-200 rounded-xl h-16 flex items-center justify-center px-4 bg-white">
            <span
              className="font-sans text-base font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(90deg,#00C4CC,#7D2AE8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Canva
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}