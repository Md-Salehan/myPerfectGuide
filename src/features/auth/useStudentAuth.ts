import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  useLoginStudentMutation,
  type StudentProfileInput,
} from "../../services/authApi";
import { setAuthError, setLoading, setPrincipal } from "./authSlice";

/**
 * The only auth operation the app needs for students.
 *
 *   await login();           // registers on first call, logs in after
 *   await login({ firstName: "A" });
 *
 * Must be called with a signed-in Firebase user whose latest ID token
 * includes the verified claim (email_verified / phone_number). The
 * caller is responsible for `await user.getIdToken(true)` first.
 */
export function useStudentAuth() {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginStudentMutation();

  const login = useCallback(
    async (input?: StudentProfileInput) => {
      dispatch(setLoading());
      try {
        const result = await loginMutation(input ?? {}).unwrap();
        dispatch(setPrincipal(result.user));
        return result.user;
      } catch (e) {
        const msg =
          (e as { data?: { error?: { message?: string } } })?.data?.error
            ?.message ?? "Login failed";
        dispatch(setAuthError(msg));
        throw e;
      }
    },
    [loginMutation, dispatch],
  );

  return { login };
}