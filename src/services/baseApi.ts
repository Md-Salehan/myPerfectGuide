import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFirebaseAuthClient } from "../config/firebase";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";


export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // Future: attach auth headers here, e.g.
    prepareHeaders: async (headers) => {
      const user = getFirebaseAuthClient().currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // No endpoints yet — feature APIs will extend this instance:
  //   export const checkoutApi = baseApi.injectEndpoints({
  //     endpoints: (build) => ({ ... }),
  //   });
  endpoints: () => ({}),

  /**
   * Cache tags. Empty for now; add only when an endpoint needs
   * to invalidate another endpoint's cache. Common candidates
   * for this app once a backend exists:
   *   "Course", "Order", "Lead", "User"
   */
  tagTypes: ['Auth'],
});

/**
 * Extracted for use in `prepareHeaders` above once auth is
 * wired in — kept typed separately so store.ts can import
 * RootState without creating a circular reference.
 */
// import type { RootState } from "../app/store";