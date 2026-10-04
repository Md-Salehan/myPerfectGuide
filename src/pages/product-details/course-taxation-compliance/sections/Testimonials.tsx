// ============================================================
// src/pages/product-details/course-taxation-compliance/sections/Testimonials.tsx
// Student testimonials strip — three cards, each with a
// layered layout (card body, bottom-right student photo,
// bottom-left name/role badge).
//
// Ported 1:1 from the "STUDENT TESTIMONIALS" <section> in
// index.html.
//
// Student images are served from /asset/students/ via Vite's
// public folder. The source referenced them as relative paths
// (./asset/students/...) which would break under a nested
// route — the absolute form is required.
// ============================================================

import { API_BASE_URL } from "../../../../constants/api";

export function Testimonials() {
  return (
    <section className="bg-slate-50 border-t border-slate-100 py-14 lg:py-20">
      <div className="shell">
        {/* ---------- Header ---------- */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-rose-600 font-bold text-sm tracking-wide mb-3">STUDENT TESTIMONIALS</p>
          <h2 className="section-title text-2xl sm:text-[34px] leading-tight">
            This course has already helped students start their own{" "}
            <span className="text-rose-600">taxation practices</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 testimonial-grid">
          {/* ============================================================
              Testimonial 1 — Rahul Sharma, Tax Consultant, Pune
              ============================================================ */}
          <div className="card overflow-visible relative testimonial-card">
            <div className="p-6 pb-28">
              <h3 className="text-blue-600 font-bold text-lg leading-snug mb-3">
                "From zero knowledge to filing GST returns for real clients in 2 months"
              </h3>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-20">
                I had no accounting background. The step-by-step practical training made everything so simple. The
                client acquisition module helped me get my first 3 clients within a month of finishing the course.
                Best decision I've made.
              </p>
            </div>

            <img
              src={API_BASE_URL + "/students/stu_7.png"}
              alt="Rahul Sharma"
              className="absolute right-0 bottom-0 w-50 h-52 object-fit rounded-br-2xl"
            />

            <div className="absolute left-5 bottom-5 z-10 bg-white rounded-2xl shadow-lg px-5 py-3.5 max-w-[75%]">
              <p className="font-bold text-slate-900 text-[15px]">Rahul Sharma</p>
              <p className="text-slate-500 text-[11px] font-bold tracking-wide mt-1.5 flex items-center gap-2 flex-wrap">
                TAX CONSULTANT
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  PUNE
                </span>
              </p>
            </div>
          </div>

          {/* ============================================================
              Testimonial 2 — Priya Kapoor, Tax Advisor, Kolkata
              ============================================================ */}
          <div className="card overflow-visible relative testimonial-card">
            <div className="p-6 pb-28">
              <h3 className="text-blue-600 font-bold text-lg leading-snug mb-3">
                "The tax planning techniques alone are worth 10x the course fee"
              </h3>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-20">
                I already had some taxation knowledge, but the legal tax planning strategies I learned here help me
                save my clients lakhs. They happily pay my fees because I'm saving them so much more.
              </p>
            </div>

            <img
              src={API_BASE_URL + "/students/stu_2.png"}
              alt="Priya Kapoor"
              className="absolute right-0 bottom-0 w-50 h-52 object-fit rounded-br-2xl"
            />

            <div className="absolute left-5 bottom-5 z-10 bg-white rounded-2xl shadow-lg px-5 py-3.5 max-w-[75%]">
              <p className="font-bold text-slate-900 text-[15px]">Priya Kapoor</p>
              <p className="text-slate-500 text-[11px] font-bold tracking-wide mt-1.5 flex items-center gap-2 flex-wrap">
                TAX ADVISOR
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  KOLKATA
                </span>
              </p>
            </div>
          </div>

          {/* ============================================================
              Testimonial 3 — Amit Mehta, Tax Consultant, Mumbai
              ============================================================ */}
          <div className="card overflow-visible relative testimonial-card">
            <div className="p-6 pb-28">
              <h3 className="text-blue-600 font-bold text-lg leading-snug mb-3">
                "The portfolio website and ads training changed everything for me"
              </h3>
              <p className="text-slate-600 text-[14.5px] leading-relaxed mb-20">
                I was struggling to get clients. But after building my professional website and running the ad
                campaigns as taught, I now get inquiries every single day. The system works.
              </p>
            </div>

            <img
              src={API_BASE_URL + "/students/stu_3.png"}
              alt="Amit Mehta"
              className="absolute right-0 bottom-0 w-50 h-52 object-fit rounded-br-2xl"
            />

            <div className="absolute left-5 bottom-5 z-10 bg-white rounded-2xl shadow-lg px-5 py-3.5 max-w-[75%]">
              <p className="font-bold text-slate-900 text-[15px]">Amit Mehta</p>
              <p className="text-slate-500 text-[11px] font-bold tracking-wide mt-1.5 flex items-center gap-2 flex-wrap">
                TAX CONSULTANT
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  MUMBAI
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}