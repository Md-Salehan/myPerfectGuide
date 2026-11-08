// ============================================================
// src/pages/home/HomePage.tsx
// Home page orchestrator.
//
// Reads ?course=<id> from the URL (via useSearchParams), falls
// back to the first course when absent or unknown. Re-renders
// the whole page when the URL changes — matching the source's
// "?course=" query-param navigation.
//
// Owns two pieces of cross-section state:
//   - currentCourse     — derived from the URL
//   - enquiryCourseId   — set by the catalog's "Enquire"
//                         buttons; feeds the lead form's
//                         course select
//
// Sections are rendered in the same order as the source.
// The header/footer are page-specific (not from MainLayout)
// to preserve the source's TAXPRO ACADEMY shell.
// ============================================================


import { HomeCatalog } from "./sections/HomeCatalog";
import { HomeEnroll } from "./sections/HomeEnroll";

import { HomeHero } from "./sections/HomeHero";
import { HomeOutcomes } from "./sections/HomeOutcomes";
import { HomeProcess } from "./sections/HomeProcess";
import { HomeStats } from "./sections/HomeStats";
import { HomeTestimonials } from "./sections/HomeTestimonials";
import { HomeTrustStrip } from "./sections/HomeTrustStrip";

export function HomePage() {



    /* ---------- Render ---------- */

    return (
        <div>
            {/* <HomeHeader /> */}

            <main id="home-root">
                <HomeHero  />

                <HomeTrustStrip  />

                <HomeCatalog
                    
                />

                <HomeOutcomes  />

                <HomeStats  />

                <HomeTestimonials />

                <HomeProcess  />

                <HomeEnroll
                   
                />
            </main>

            {/* <HomeFooter /> */}
        </div>
    );
}