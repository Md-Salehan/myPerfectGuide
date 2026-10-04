// ============================================================
// src/routes/AppRoutes.tsx
// Top-level route tree.
//
// Every route renders inside <MainLayout>, which supplies the
// shared Header, Footer, and floating WhatsApp button.
//
// Only the routes whose pages actually exist are declared.
// Future routes (Home, courses 2–5, Checkout, Thank You,
// Contact, legal pages) are added here as their pages are
// built — see paths.ts for the naming convention.
// ============================================================

import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";

import { AboutUsPage } from "../pages/about/AboutUsPage";
import { CourseTaxationCompliancePage } from "../pages/product-details/course-taxation-compliance/CourseTaxationCompliancePage";

import { ROUTES } from "./paths";
import { ContactUsPage } from "../pages/contact/ContactUsPage";
import { CourseDigitalMarketingPage } from "../pages/product-details/course-digital-marketing";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/*
          Temporary root redirect.
          There is no landing page yet, so "/" forwards to the
          one fully-built product page. When the landing page is
          built, replace this <Route> with a real <HomePage />.
        */}
        <Route index element={<Navigate to={ROUTES.COURSE_1} replace />} />

        {/* Course 1 — Complete Taxation & Compliance */}
        <Route path={ROUTES.COURSE_1} element={<CourseTaxationCompliancePage />} />
        <Route path={ROUTES.COURSE_2} element={<CourseDigitalMarketingPage />} />

        {/* About Us */}
        <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />

        {/*
          Not-found fallback. Kept minimal on purpose: no custom
          404 page yet — anything unmatched just redirects home.
          When a proper NotFound page is built, this becomes a
          real <Route path="*" element={<NotFoundPage />} />.
        */}
        <Route path={ROUTES.CONTACT} element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.COURSE_1} replace />} />
      </Route>
    </Routes>
  );
}