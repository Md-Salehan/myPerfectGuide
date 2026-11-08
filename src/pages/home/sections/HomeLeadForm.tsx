// ============================================================
// src/pages/home/sections/HomeLeadForm.tsx
// Lead capture form inside the enroll section.
//
// Fields: name, email, phone, course (select), optional message.
// Client-side validation on submit (source rules). Success/
// error message rendered in a status line below.
//
// ENDPOINT is currently "" (demo mode) — matches the source.
// When a real endpoint URL is added, the form does a JSON POST
// to it and shows a real success message.
//
// Controlled only where necessary:
//   - selectedCourse -> parent controls this so the "Enquire"
//     button on a catalog card can pre-fill it
//   - errors/status/submitting -> local to this form
//   - other field values -> uncontrolled, read via formData
//     on submit (matches the source's approach)
// ============================================================

import { useRef, useState, type FormEvent } from "react";

import { getAllCourses } from "../../../data/courses";
import { HOME_CONTENT } from "../data/homeContent";
import { HomeButton } from "./HomeButton";

interface HomeLeadFormProps {
    /** Currently selected course (or "" / "unsure"). */
    selectedCourse: string;
    /** Called when the user changes the course dropdown. */
    onCourseChange: (value: string) => void;
}

/* Local regexes — deliberately more permissive than the
   checkout's PHONE_REGEX. The lead form accepts +91, spaces,
   dashes, and international formats. Matches the source. */
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const PHONE_RE = /^[+\d][\d\s-]{8,14}$/;

/* Field names used as keys in the errors state and formData. */
type Field = "name" | "email" | "phone" | "course";

/** Set this to a backend or form-service URL to enable real POSTs. */
const ENDPOINT = "";

export function HomeLeadForm({
    selectedCourse,
    onCourseChange,
}: HomeLeadFormProps) {
    const courses = getAllCourses();
    const formRef = useRef<HTMLFormElement | null>(null);

    // Inline error text per field. Empty string = no error.
    const [errors, setErrors] = useState<Record<Field, string>>({
        name: "",
        email: "",
        phone: "",
        course: "",
    });

    const [status, setStatus] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);

    const validate = (values: {
        name: string;
        email: string;
        phone: string;
        course: string;
    }): Record<Field, string> => {
        return {
            name: values.name.trim() ? "" : "Please enter your name.",
            email: EMAIL_RE.test(values.email)
                ? ""
                : "Enter a valid email address.",
            phone: PHONE_RE.test(values.phone.trim())
                ? ""
                : "Enter a valid phone number.",
            course: values.course ? "" : "Please choose a course.",
        };
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;

        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const values = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            course: String(formData.get("course") ?? ""),
        };

        // ---------- Validation ----------
        const validationErrors = validate(values);
        setErrors(validationErrors);

        const hasError = Object.values(validationErrors).some(Boolean);
        if (hasError) {
            setStatus("Please fix the highlighted fields.");
            return;
        }

        // ---------- Demo mode (no ENDPOINT) ----------
        if (!ENDPOINT) {
            setStatus(
                "Form is valid, but not sent: no submission endpoint is connected yet (demo mode).",
            );
            return;
        }

        // ---------- Real submission ----------
        setSubmitting(true);
        setStatus("");

        try {
            const message = String(formData.get("message") ?? "");
            const payload = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                course: values.course,
                message,
            };

            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`Request failed (${res.status})`);

            setStatus("Thanks! We will call you back soon.");
            form.reset();
            onCourseChange("");
        } catch {
            setStatus("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="grid grid-cols-1 md:grid-cols-2 gap-4 px-7 py-10 md:px-10 md:py-10 bg-white"
        >
            {/* ---------- Full name ---------- */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="home-lead-name"
                    className="text-[12px] font-semibold text-ink-950"
                >
                    Full name
                </label>
                <input
                    id="home-lead-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name || undefined}
                    aria-describedby={errors.name ? "home-lead-name-error" : undefined}
                    className={[
                        "w-full min-h-[46px] px-3.5 py-3 rounded-xl border-[1.5px] text-[14px] text-ink-950 bg-white",
                        "placeholder:text-slate-400",
                        "focus:outline-none focus:ring-[3px] focus:ring-indigo-100 focus:border-indigo-600",
                        errors.name ? "border-brand-600" : "border-slate-300",
                    ].join(" ")}
                />
                <span
                    id="home-lead-name-error"
                    role="alert"
                    className="text-[12px] text-brand-700 min-h-0"
                >
                    {errors.name}
                </span>
            </div>

            {/* ---------- Email ---------- */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="home-lead-email"
                    className="text-[12px] font-semibold text-ink-950"
                >
                    Email
                </label>
                <input
                    id="home-lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={!!errors.email || undefined}
                    aria-describedby={errors.email ? "home-lead-email-error" : undefined}
                    className={[
                        "w-full min-h-[46px] px-3.5 py-3 rounded-xl border-[1.5px] text-[14px] text-ink-950 bg-white",
                        "placeholder:text-slate-400",
                        "focus:outline-none focus:ring-[3px] focus:ring-indigo-100 focus:border-indigo-600",
                        errors.email ? "border-brand-600" : "border-slate-300",
                    ].join(" ")}
                />
                <span
                    id="home-lead-email-error"
                    role="alert"
                    className="text-[12px] text-brand-700 min-h-0"
                >
                    {errors.email}
                </span>
            </div>

            {/* ---------- Phone ---------- */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="home-lead-phone"
                    className="text-[12px] font-semibold text-ink-950"
                >
                    Phone
                </label>
                <input
                    id="home-lead-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    aria-invalid={!!errors.phone || undefined}
                    aria-describedby={errors.phone ? "home-lead-phone-error" : undefined}
                    className={[
                        "w-full min-h-[46px] px-3.5 py-3 rounded-xl border-[1.5px] text-[14px] text-ink-950 bg-white",
                        "placeholder:text-slate-400",
                        "focus:outline-none focus:ring-[3px] focus:ring-indigo-100 focus:border-indigo-600",
                        errors.phone ? "border-brand-600" : "border-slate-300",
                    ].join(" ")}
                />
                <span
                    id="home-lead-phone-error"
                    role="alert"
                    className="text-[12px] text-brand-700 min-h-0"
                >
                    {errors.phone}
                </span>
            </div>

            {/* ---------- Course of interest ---------- */}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="home-lead-course"
                    className="text-[12px] font-semibold text-ink-950"
                >
                    Course of interest
                </label>
                <select
                    id="home-lead-course"
                    name="course"
                    required
                    value={selectedCourse}
                    onChange={(e) => onCourseChange(e.target.value)}
                    aria-invalid={!!errors.course || undefined}
                    aria-describedby={
                        errors.course ? "home-lead-course-error" : undefined
                    }
                    className={[
                        "w-full min-h-[46px] px-3.5 py-3 rounded-xl border-[1.5px] text-[14px] text-ink-950 bg-white",
                        "focus:outline-none focus:ring-[3px] focus:ring-indigo-100 focus:border-indigo-600",
                        errors.course ? "border-brand-600" : "border-slate-300",
                        selectedCourse === "" ? "text-slate-500" : "",
                    ].join(" ")}
                >
                    <option value="" disabled>
                        Select a course
                    </option>
                    {courses.map((c) => (
                        <option key={c.courseId} value={c.courseId}>
                            {c.title}
                        </option>
                    ))}
                    <option value="unsure">Not sure yet</option>
                </select>
                <span
                    id="home-lead-course-error"
                    role="alert"
                    className="text-[12px] text-brand-700 min-h-0"
                >
                    {errors.course}
                </span>
            </div>

            {/* ---------- Message (optional) ---------- */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label
                    htmlFor="home-lead-message"
                    className="text-[12px] font-semibold text-ink-950"
                >
                    Message (optional)
                </label>
                <textarea
                    id="home-lead-message"
                    name="message"
                    rows={4}
                    className="w-full min-h-[100px] px-3.5 py-3 rounded-xl border-[1.5px] border-slate-300 text-[14px] text-ink-950 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-[3px] focus:ring-indigo-100 focus:border-indigo-600 resize-y"
                />
            </div>

            {/* ---------- Submit + status ---------- */}
            <div className="md:col-span-2">
                <HomeButton variant="primary" type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : HOME_CONTENT.enroll.submit}
                </HomeButton>
            </div>
            <p
                id="home-lead-status"
                role="status"
                aria-live="polite"
                className="md:col-span-2 text-[13px] font-semibold text-ink-950 min-h-0"
            >
                {status}
            </p>
        </form>
    );
}