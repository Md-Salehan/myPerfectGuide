// ============================================================
// src/pages/contact/ContactUsPage.tsx
// Contact Us page — matches the site's existing UI/UX:
//   - dark hero with dot-pattern overlay + breadcrumb
//   - alternating white / bg-slate-50 sections
//   - .card surfaces, section-title headings
//   - indigo as the primary accent
//
// The page has its own inline contact form (full message
// form). That form is separate from the global callback modal
// — the modal is a lighter, phone-only (optionally slot-aware)
// flow that opens from the "Request A Callback" CTA in the
// final section, matching the pattern used on About and Course 1.
//
// The inline form is a STATIC styled mock — no API call is
// made. Submitting toggles a success state locally.
// ============================================================

import { useState, type FormEvent } from "react";

import { Button } from "../../components/common/Button";

import { useAppDispatch } from "../../app/hooks";
import { openCallback } from "../../features/callback/callbackSlice";

export function ContactUsPage() {
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No backend yet — just flip to the success state.
    // When an endpoint exists, replace this with the API call.
    setSubmitted(true);
  };

  return (
    <>
      {/* ============================================================
          HERO (dark, dot pattern) — matches the About page hero
          ============================================================ */}
      <section className="relative bg-ink-950 text-white overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="shell relative py-16 lg:py-24">
          <div className="max-w-3xl">
            <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-400 mb-6">
              <a href="#" className="underline decoration-slate-600 hover:text-white">
                Home
              </a>
              <span>&gt;</span>
              <span className="text-slate-200">Contact Us</span>
            </nav>

            <span className="badge badge-cohort mb-4 inline-block">GET IN TOUCH</span>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight">
              Talk to a Course Advisor,{" "}
              <span className="text-brand-500">Not a Sales Bot</span>
            </h1>

            <p className="mt-6 text-slate-300 text-[16px] sm:text-lg leading-relaxed max-w-2xl">
              Whether you're a complete beginner, a working professional looking for a side income, or an accountant
              wanting to scale — tell us where you are and we'll help you figure out if this course is the right next
              step for you.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT FORM + SIDE PANEL
          ============================================================ */}
      <section className="shell py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
          {/* ---------- FORM ---------- */}
          <div>
            <span className="text-brand-600 font-bold text-sm tracking-wide">SEND US A MESSAGE</span>
            <h2 className="section-title text-3xl sm:text-[40px] leading-tight mt-3 mb-2">
              Tell Us About Your Goal
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 max-w-xl">
              Fill in a few details and our course advisor will reach out within one working day. No automated
              sequences, no spam — just a conversation about whether this course fits what you're trying to do.
            </p>

            {submitted ? (
              <div className="card p-7 sm:p-9 border-emerald-200 bg-emerald-50/40">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Thanks — we've got your message.</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  A course advisor will reach out to you within one working day. Keep an eye on your inbox and
                  WhatsApp. If your query is urgent, you can reach us directly using the contact details on the right.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>

                {/* Email + Phone (side by side on sm+) */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-800 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-800 mb-2"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                    />
                  </div>
                </div>

                {/* Current situation */}
                <div>
                  <label
                    htmlFor="situation"
                    className="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Where are you right now?
                  </label>
                  <select
                    id="situation"
                    name="situation"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  >
                    <option value="" disabled>
                      Select one option
                    </option>
                    <option value="student">Student or fresher — no prior accounting knowledge</option>
                    <option value="working">Working professional — looking for a side income</option>
                    <option value="accountant">Accountant or tax professional — want to scale</option>
                    <option value="business">Freelancer or business owner — manage my own taxes</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us what you're hoping to achieve, or ask us anything about the course, fees, schedule, EMI options, or refund policy."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition resize-none"
                  />
                </div>

                {/* Consent + submit */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <label className="flex items-start gap-2.5 text-[13.5px] text-slate-600 leading-snug cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>
                      I agree to be contacted by TaxPro Academy via email or WhatsApp about this enquiry.
                    </span>
                  </label>

                  <Button
                    type="submit"
                    variant="primary"
                    className="px-6 py-3.5 text-sm shrink-0"
                  >
                    Send Message
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* ---------- SIDE PANEL ---------- */}
          <aside className="space-y-5">
            {/* Contact details card */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-5">Contact Details</h3>

              <ul className="space-y-5">
                {/* WhatsApp */}
                <li className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0012.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-[14.5px]">WhatsApp</p>
                    <a
                      href="#"
                      className="text-slate-600 text-[14px] hover:text-indigo-600 transition break-words"
                    >
                      +91 98XXX XXXXX
                    </a>
                    <p className="text-slate-400 text-[12.5px] mt-0.5">Fastest way to reach us</p>
                  </div>
                </li>

                {/* Email */}
                <li className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-[14.5px]">Email</p>
                    <a
                      href="mailto:support@taxproacademy.in"
                      className="text-slate-600 text-[14px] hover:text-indigo-600 transition break-all"
                    >
                      support@taxproacademy.in
                    </a>
                    <p className="text-slate-400 text-[12.5px] mt-0.5">We reply within one working day</p>
                  </div>
                </li>

                {/* Phone */}
                <li className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-sky-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.25 1.05L7.9 9.66a14 14 0 006.44 6.44l1.33-1.28a1 1 0 011.05-.25l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-[14.5px]">Phone</p>
                    <a
                      href="tel:+919800000000"
                      className="text-slate-600 text-[14px] hover:text-indigo-600 transition"
                    >
                      +91 98000 00000
                    </a>
                    <p className="text-slate-400 text-[12.5px] mt-0.5">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
                  </div>
                </li>

                {/* Office hours */}
                <li className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-[14.5px]">Advisor Hours</p>
                    <p className="text-slate-600 text-[14px]">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
                    <p className="text-slate-400 text-[12.5px] mt-0.5">Closed on Sundays and public holidays</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* What to expect card */}
            <div className="card p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-5">What Happens Next</h3>

              <ol className="space-y-4">
                <NextStep
                  number="1"
                  title="We read your message"
                  description="A course advisor — not an automated system — reviews your enquiry."
                />
                <NextStep
                  number="2"
                  title="We get in touch"
                  description="Within one working day, via WhatsApp or email, whichever you prefer."
                />
                <NextStep
                  number="3"
                  title="We help you decide"
                  description="No pressure. If the course isn't right for you, we'll tell you that too."
                />
              </ol>
            </div>

            {/* Dark reassurance card */}
            <div className="rounded-2xl bg-ink-950 text-white p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-white font-semibold text-[15px]">
                  Your details stay between you and us.
                </p>
              </div>
              <p className="text-slate-400 text-[13.5px] leading-relaxed">
                We don't sell, rent, or share your contact information. No spam, no drip campaigns, no
                "final reminder" emails. Just a conversation about your goals.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ============================================================
          FAQ STRIP — 3 quick answers, matching the site's card style
          ============================================================ */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 lg:py-24">
        <div className="shell">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-indigo-600 font-bold text-sm tracking-wide">QUICK ANSWERS</span>
            <h2 className="section-title text-3xl sm:text-[40px] mt-2">
              Questions We Get Asked Before You Write
            </h2>
            <p className="text-slate-600 text-[15px] mt-4">
              Three things most people want to know before they hit send. If yours isn't here, ask us directly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickAnswer
              title="How fast will I hear back?"
              body="Within one working day, usually much sooner on WhatsApp. Every enquiry is reviewed by a real advisor, not a queue."
            />
            <QuickAnswer
              title="Is there really a 90% discount?"
              body="Yes — for the first 50 students of each batch. If the discount is still live when you enquire, we'll tell you honestly."
            />
            <QuickAnswer
              title="Do I need a B.Com or CA background?"
              body="No. The course starts from absolute zero. Students, freshers, and career switchers are the majority of our learners."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — matches the About page's final CTA treatment
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 px-5 sm:px-14">
        <div className="shell grid lg:grid-cols-2 gap-10 items-center py-14 lg:py-20">
          <div className="text-white">
            <h2 className="text-2xl sm:text-[36px] font-extrabold leading-tight tracking-tight">
              Prefer to Talk First?
            </h2>
            <p className="mt-4 text-blue-100 text-[15px] leading-relaxed max-w-md">
              You can also request a callback and we'll reach out to you. No forms, no waiting — just a direct
              conversation about whether this course fits what you're trying to do.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {/* Request A Callback — opens the callback modal */}
              <button
                type="button"
                onClick={() => dispatch(openCallback())}
                className="btn bg-white text-indigo-700 px-6 py-3.5 text-sm hover:bg-blue-50"
              >
                Request A Callback
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h1.05a1.5 1.5 0 011.45 1.12l.6 2.4a1.5 1.5 0 01-.4 1.45l-1 1a11.5 11.5 0 005.83 5.83l1-1a1.5 1.5 0 011.45-.4l2.4.6A1.5 1.5 0 0117 14.45v1.05a1.5 1.5 0 01-1.5 1.5H14C7.37 17 2 11.63 2 5V3.5z" />
                </svg>
              </button>

              {/* Explore Courses — plain link, unchanged */}
              <a
                href="#"
                className="btn border border-white/50 text-white px-6 py-3.5 text-sm hover:bg-white/10"
              >
                Explore Courses
              </a>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center">
            <div className="text-white/10 text-[180px] font-black select-none leading-none">
              ?
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------
   Internal: a "what happens next" step
   ------------------------------------------------------------ */

function NextStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-[13px] flex items-center justify-center shrink-0">
        {number}
      </span>
      <div>
        <p className="font-semibold text-slate-900 text-[14.5px]">{title}</p>
        <p className="text-slate-600 text-[13.5px] leading-relaxed mt-0.5">{description}</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------
   Internal: a quick-answer card
   ------------------------------------------------------------ */

function QuickAnswer({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-7">
      <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
      <p className="text-slate-600 text-[14.5px] leading-relaxed">{body}</p>
    </div>
  );
}