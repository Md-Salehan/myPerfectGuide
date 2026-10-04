// ============================================================
// src/features/callback/callbackSlice.ts
// Global open/close state for the Request Callback modal.
//
// Why this lives in Redux:
//   - The trigger buttons live in Header, on multiple pages,
//     and in every FinalCta section.
//   - The modal is rendered once at the layout level.
//   - Without global state, opening the modal from a page CTA
//     would require prop drilling across the layout boundary.
//
// Only the open/close boolean lives here. The form's own state
// (phone, slot, submit status) stays local to RequestCallback.
// ============================================================

import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";

interface CallbackState {
  isOpen: boolean;
}

const initialState: CallbackState = {
  isOpen: false,
};

const callbackSlice = createSlice({
  name: "callback",
  initialState,
  reducers: {
    openCallback(state) {
      state.isOpen = true;
    },
    closeCallback(state) {
      state.isOpen = false;
    },
  },
});

export const { openCallback, closeCallback } = callbackSlice.actions;

export const selectCallbackOpen = (state: RootState): boolean =>
  state.callback.isOpen;

export default callbackSlice.reducer;