// ============================================================
// src/layouts/MainLayout.tsx
// Shared page shell for every route.
//
// Structure mirrors the original HTML exactly:
//   <header> ... </header>
//   <main>   ... </main>   <-- route-specific via <Outlet />
//   <footer> ... </footer>
//   <floating WhatsApp anchor>
//
// This layout is mounted once by the router (see AppRoutes.tsx);
// individual pages only supply what goes inside <main>.
// ============================================================

import { Outlet } from "react-router-dom";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { WhatsAppButton } from "../components/layout/WhatsAppButton";
import { RequestCallbackModal } from "../components/callback/RequestCallbackModal";

export function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
      <RequestCallbackModal />
    </>
  );
}