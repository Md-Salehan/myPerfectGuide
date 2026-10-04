// ============================================================
// src/App.tsx
// Top-level application component.
//
// Wraps the route tree in:
//   - <Provider store={store}>  -> Redux + RTK Query context
//   - <BrowserRouter>           -> routing context
//
// Kept deliberately minimal. Page composition lives in
// AppRoutes; store setup lives in app/store.ts; layout chrome
// lives in layouts/MainLayout. This file is only the join.
// ============================================================

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}