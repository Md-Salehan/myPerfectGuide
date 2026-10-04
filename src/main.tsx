// ============================================================
// src/main.tsx
// React DOM entry point.
//
// Loaded by Vite via the <script type="module" src="/src/main.tsx">
// tag in index.html. Its only job is to mount <App /> into the
// #root element and load the global stylesheet.
//
// All application wiring (Redux store, router, layout) lives
// downstream in App.tsx, AppRoutes.tsx, and store.ts.
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  // Fail loudly if index.html is missing #root — this is a
  // build/markup error, not a runtime condition to recover from.
  throw new Error(
    'Root element with id "root" not found. Check index.html.',
  );
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);