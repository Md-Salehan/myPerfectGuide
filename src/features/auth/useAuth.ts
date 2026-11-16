// src/features/auth/useAuth.ts
import { useCallback, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFirebaseAuthClient } from "../../config/firebase";
import {
  useMeQuery,
  useLogoutMutation,
} from "../../services/authApi";
import {
  setLoading,
  setPrincipal,
  setUnauthenticated,
  setAuthError,
} from "./authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);

  // /me — only runs when Firebase reports a signed-in user.
  // `skip` prevents a 401 storm on logged-out pages.
  const { data:result, isError, error } = useMeQuery(undefined, {
    skip: !getFirebaseAuthClient().currentUser,
  });

  const [logoutMutation] = useLogoutMutation();

  // Hydrate Redux from /me whenever it resolves.
  useEffect(() => {
    if (result?.data?.user) dispatch(setPrincipal(result.data.user));
  }, [result, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(
        setAuthError(
          (error as { data?: { error?: { message?: string } } })?.data
            ?.error?.message ?? "Failed to load session",
        ),
      );
    }
  }, [isError, error, dispatch]);

  // Keep Redux in sync with Firebase's own session.
  useEffect(() => {
    dispatch(setLoading());
    const unsub = onAuthStateChanged(getFirebaseAuthClient(), (user) => {
      if (!user) dispatch(setUnauthenticated());
      // If user exists, /me already handles hydration above.
    });
    return unsub;
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap(); // revoke refresh tokens server-side
    } catch {
      // Server revocation failing must not block client signOut —
      // otherwise the user is stuck logged in.
    } finally {
      await signOut(getFirebaseAuthClient());
      dispatch(setUnauthenticated());
    }
  }, [logoutMutation, dispatch]);

  return { ...auth, logout };
}