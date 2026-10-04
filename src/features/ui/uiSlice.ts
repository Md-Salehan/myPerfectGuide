// ============================================================
// src/features/ui/uiSlice.ts
// Minimal placeholder slice for genuinely global UI state.
//
// Nothing in the current app actually needs global UI state:
//   - mobile menu open/close  -> local to Header
//   - FAQ accordion           -> local to FaqSection
//   - sidebar plan toggle     -> local to SidebarEnrollCard
//
// This slice exists so that:
//   1. store.ts has a registered `ui` reducer (as declared).
//   2. The convention for future slices (typed actions,
//      named + default export, typed selectors) is established.
//
// Add fields here only when a piece of UI state genuinely
// needs to be read or mutated from more than one component.
// ============================================================

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


/**
 * Shape of the `ui` slice state.
 *
 * `mobileMenuOpen` is kept here as a documented example of the
 * pattern, but is intentionally NOT consumed by Header (which
 * manages its own local state). If the app later needs to open
 * or close the mobile menu from outside Header — e.g. from a
 * route change — this is where that state would live.
 */
export interface UiState {
  mobileMenuOpen: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    /** Open the mobile menu. */
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
    },

    /** Close the mobile menu. */
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },

    /** Set the mobile menu open state explicitly. */
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
  },
});

/* ------------------------------------------------------------
   Actions
   ------------------------------------------------------------ */

export const { openMobileMenu, closeMobileMenu, setMobileMenuOpen } =
  uiSlice.actions;

/* ------------------------------------------------------------
   Selectors
   ------------------------------------------------------------ */

export const selectMobileMenuOpen = (state: { ui: UiState }): boolean =>
  state.ui.mobileMenuOpen;

/* ------------------------------------------------------------
   Reducer
   ------------------------------------------------------------ */

export default uiSlice.reducer;