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
import { CheckoutPage } from "../pages/checkout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
      <Route element={<MainLayout />}>

        <Route index element={<Navigate to={ROUTES.COURSE_1} replace />} />

        {/* Course 1 — Complete Taxation & Compliance */}
        <Route path={ROUTES.COURSE_1} element={<CourseTaxationCompliancePage />} />
        <Route path={ROUTES.COURSE_2} element={<CourseDigitalMarketingPage />} />

        <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to={ROUTES.COURSE_1} replace />} />
      </Route>
    </Routes>
  );
}