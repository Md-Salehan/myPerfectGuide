import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthPrincipal {
  id: string;
  kind: "student" | "staff";
  firebaseUid: string;
  email: string | null;
  phone: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  kycStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  status: "idle" | "loading" | "authenticated" | "unauthenticated" | "error";
  principal: AuthPrincipal | null;
  error: string | null;
}

const initialState: AuthState = {
  status: "idle",
  principal: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state) { state.status = "loading"; state.error = null; },
    setPrincipal(state, action: PayloadAction<AuthPrincipal>) {
      state.status = "authenticated";
      state.principal = action.payload;
      state.error = null;
    },
    setUnauthenticated(state) { state.status = "unauthenticated"; state.principal = null; },
    setAuthError(state, action: PayloadAction<string>) { state.status = "error"; state.error = action.payload; },
  },
});

export const { setLoading, setPrincipal, setUnauthenticated, setAuthError } = authSlice.actions;
export default authSlice.reducer;