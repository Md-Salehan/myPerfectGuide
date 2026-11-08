// ============================================================
// src/pages/home/sections/HomeCatalog.tsx
// Course catalog section, restyled in a Scaler + Meta look.
//
// Heading block (pill eyebrow + rich-text heading + optional CTA
// pill) followed by a 3-column grid of HomeCourseCard. Data flow
// is unchanged: copy from HOME_CONTENT.catalog, one card per
// course from getAllCourses(), current course highlighted.
// ============================================================

import { CourseCard } from "../../../components/common/CourseCard";
import { getAllCourses } from "../../../data/courses";
import { renderRich } from "../renderRich";



export function HomeCatalog() {
    const courses = getAllCourses();
    if (courses.length === 0) return null;


    return (
        <section
            id="courses"
            aria-labelledby="catalog-heading"
            className="bg-white font-['Manrope',ui-sans-serif,system-ui,sans-serif] text-[#1C2B33]"
        >
            <div className="mx-auto max-w-[1288px] px-5 py-[52px] sm:px-10 md:py-[72px] lg:px-[100px]">
                {/* ---------- Heading row ---------- */}
                <div className="mb-[48px] flex flex-wrap items-end justify-between gap-5 lg:mb-[64px]">
                    <div>
                        <span className="inline-flex items-center rounded-full bg-[#E7F3FF] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#0866FF]">
                            Featured courses
                        </span>
                        <h2
                            id="catalog-heading"
                            className="mt-[18px] max-w-[760px] text-[32px] font-medium leading-[1.08] tracking-[-0.035em] text-[#0b0b0f] sm:text-[44px] lg:text-[52px]"
                        >
                            {renderRich("Pick the course that fits [[your goals]]")}
                        </h2>
                    </div>

                    
                        <a
                            href={import.meta.env.VITE_API_BASE_URL+"/courses"}
                            className="inline-flex items-center justify-center rounded-md bg-[#0866FF] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#0A5CE6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0866FF]"
                        >
                            MORE COURSES ↗
                        </a>
                 
                </div>

                {/* ---------- Card grid ---------- */}
                <div className="grid grid-cols-1 gap-[21px] md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={course.courseId}
                            course={course}
                            index={index}
                           
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}