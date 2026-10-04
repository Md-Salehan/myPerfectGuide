

import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "../services/baseApi";
import uiReducer from "../features/ui/uiSlice";
import callbackReducer from "../features/callback/callbackSlice";

export const store = configureStore({
  reducer: {
    // RTK Query reducer — one key, holds cache for all endpoints.
    [baseApi.reducerPath]: baseApi.reducer,

    // App slices.
    ui: uiReducer,
    callback: callbackReducer,
  },

  middleware: (getDefaultMiddleware) =>
    // RTK Query middleware handles cache lifetimes, polling,
    // invalidation, and subscription bookkeeping.
    getDefaultMiddleware().concat(baseApi.middleware),
});

// ------------------------------------------------------------------
// Inferred types — used by the typed hooks in src/app/hooks.ts.
// ------------------------------------------------------------------

// RootState represents the entire Redux state
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch represents the dispatch function
export type AppDispatch = typeof store.dispatch;