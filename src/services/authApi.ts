// src/services/authApi.ts
import { baseApi } from "./baseApi";
import type { AuthPrincipal } from "../features/auth/authSlice";

/* ------------------------------------------------------------
   Shared response shapes (mirror the backend DTOs)
   ------------------------------------------------------------ */

export interface AuthResponse {
  user: AuthPrincipal;
}

/**
 * Optional enrichment accepted by both /register and /login.
 * Identity fields (email/phone/verification flags) are NEVER
 * taken from here — the backend reads those from the Firebase
 * token. Only enrichment fields (name, DOB, address, …) are
 * consumed from the body.
 */
export interface StudentProfileInput {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerStudent: build.mutation<AuthResponse, StudentProfileInput | void>({
      query: (body) => ({
        url: "/auth/register/student",
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: ["Auth"],
    }),
    loginStudent: build.mutation<AuthResponse, StudentProfileInput | void>({
      query: (body) => ({
        url: "/auth/login/student",
        method: "POST",
        body: body ?? {},
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<AuthResponse, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useLoginStudentMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;