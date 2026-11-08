// ============================================================
// src/pages/home/sections/CourseCard.tsx
// One course card inside the catalog grid
// ============================================================

import { TagChipList } from "./Tag";
import type { Course } from "../../types/course";
import { Calendar, Lock } from "lucide-react";

interface CourseCardProps {
    course: Course;
    /** 0-based index. Displayed as 01, 02, 03... */
    index: number;
}

/* Cover backgrounds cycle per index (gold / rust / near-black,
   like the Scaler story thumbnails). */
const COVER_BG = ["bg-[#9a7a34]", "bg-[#8c3f22]", "bg-[#14161a]"] as const;

/** Format a date string/Date into e.g. "12 Mar 2025". */
function formatBatchDate(value?: string | Date | null): string | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function CourseCard({ course, index }: CourseCardProps) {
    const {
        title,
        shortTitle,
        category,
        shortFeatures,
        lectures,
        promoThumbnail,
        batchStartDate,
        enrollmentOpen,
    } = course;

    const lectureCount = lectures + "+ Lectures";
    const ordinal = String(index + 1).padStart(2, "0");
    const courseHref = `/${course.url}`;

    const formattedBatchDate = formatBatchDate(batchStartDate);
    // Treat undefined as open (backwards compatible), false as closed.
    const isEnrollmentClosed = enrollmentOpen === false;

    return (
        <article
            className={[
                "flex flex-col overflow-hidden bg-white border transition-colors",
                "font-['Manrope',ui-sans-serif,system-ui,sans-serif]",
                "border-[#e4e4e7] hover:border-blue-400",
            ].join(" ")}
        >
            {/* ---------- Cover art ---------- */}
            <div
                className={`relative flex aspect-[16/9] flex-col justify-between overflow-hidden p-[22px] ${COVER_BG[index % 3]}`}
            >
                <b
                    className="text-[56px] font-medium leading-none tracking-[-0.03em] text-white/25"
                    aria-hidden="true"
                >
                    {ordinal}
                </b>
                <span className="max-w-[75%] text-[20px] font-extrabold leading-[1.15] text-white">
                    {shortTitle}
                </span>

                {/* Enrollment closed badge */}
                {isEnrollmentClosed && (
                    <span className="absolute right-[12px] top-[12px] rounded-full bg-black/70 px-[10px] py-[4px] text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                        Enrollment Closed
                    </span>
                )}

                {promoThumbnail && (
                    <img
                        src={promoThumbnail.imageUrl}
                        alt={`${course.title} course cover`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => {
                            // Remove image on error, falls back to the coloured cover.
                            e.currentTarget.style.display = "none";
                        }}
                    />
                )}
            </div>

            {/* ---------- Body ---------- */}
            <div className="flex flex-1 flex-col p-[22px]">
                <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#0866FF]">
                    {category}
                </span>

                <h3 className="mb-[10px] mt-[10px] text-[22px] font-normal leading-tight">
                    <a
                        href={courseHref}
                        className="text-[#111] transition-colors hover:text-[#0866FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0866FF]"
                    >
                        {title}
                    </a>
                </h3>

                {course?.summary && (
                    <p className="text-[15px] leading-[1.6] text-[#6b6b73]">
                        {course.summary}
                    </p>
                )}

                {/* Batch start date */}
                {formattedBatchDate && (
                    <p className="mt-[12px] flex items-center gap-[4px] text-[14px] text-[#18181b]">
                        <span aria-hidden="true"><Calendar strokeWidth={1} color="#6b6b73" size={16} /></span>
                        <span>
                            <span className="text-[#6b6b73]">Batch starts: </span>
                            <strong className="font-semibold">{formattedBatchDate}</strong>
                        </span>
                    </p>
                )}

                <TagChipList
                    tags={[
                        course?.duration,
                        lectureCount !== undefined ? `${lectureCount} Modules` : "",
                        "",
                    ]}
                />

                <ul className="mb-[22px] mt-[14px] list-none p-0 text-[14px] text-[#18181b]">
                    {shortFeatures?.map((feature, i) => (
                        <li
                            key={i}
                            className="before:mr-2 before:font-extrabold before:text-[#0866FF] before:content-['✓']"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* CTA / enrollment status */}
                {isEnrollmentClosed ? (
                    <div
                        className="mt-auto flex items-center justify-between border-t border-[#e4e4e7] pt-[18px] text-[18px] text-[#9a9aa3]"
                        aria-disabled="true"
                    >
                        <span>Enrollment Closed</span>
                        <span aria-hidden="true"><Lock strokeWidth={2} color="#9a9aa3" size={18} /></span>
                    </div>
                ) : (
                    <a
                        href={courseHref}
                        className="mt-auto flex items-center justify-between border-t border-[#e4e4e7] pt-[18px] text-[18px] text-[#1a2aa8] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2aa8]"
                    >
                        <span>Show Details</span>
                        <span aria-hidden="true">→</span>
                    </a>
                )}
            </div>
        </article>
    );
}