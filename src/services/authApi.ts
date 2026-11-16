import { baseApi } from "./baseApi";
import type { AuthPrincipal } from "../features/auth/authSlice";

/**
 * Optional enrichment. Identity fields (email/phone/verification) are
 * read by the backend from the Firebase token — never from this body.
 */
export interface StudentProfileInput {
  firstName?: string;
  lastName?: string;
//   dateOfBirth?: string;
//   gender?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   postalCode?: string;
//   country?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: AuthPrincipal;
  };
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Idempotent: registers on first call, logs in on subsequent.
    loginRegStudent: build.mutation<AuthResponse, StudentProfileInput | void>({
      query: (body) => ({
        url: "/auth/loginReg/student",
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
  useLoginRegStudentMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;