// src/pages/auth/EmailLinkPage.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFirebaseAuthClient } from "../../config/firebase";
import { useEmailLink } from "../../features/auth/useEmailLink";
import { useAppDispatch } from "../../app/hooks";
import {  setAuthError } from "../../features/auth/authSlice";
import { useStudentAuth } from "../../features/auth/useStudentAuth";


export function EmailLinkPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { completeSignIn } = useEmailLink();
    const [error, setError] = useState<string | null>(null);
    const ranRef = useRef(false);

    const { login } = useStudentAuth();

    useEffect(() => {
        if (ranRef.current) return; // guard against StrictMode double-invoke
        ranRef.current = true;

        (async () => {
            try {
                await completeSignIn(window.location.href);
                const user = getFirebaseAuthClient().currentUser;
                if (!user) throw new Error("No Firebase user after email-link sign-in");
                await user.getIdToken(true);
                await login();   // register-on-first-email-login, login on return
                navigate(`/order?${searchParams.toString()}`, { replace: true });

            } catch (e) {
                const msg = e instanceof Error ? e.message : "Email verification failed.";
                setError(msg);
                dispatch(setAuthError(msg));
            }
        })();
    }, [completeSignIn, dispatch, navigate, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md w-full bg-white rounded-lg border border-slate-200 p-6 text-center">
                {error ? (
                    <>
                        <h1 className="text-lg font-semibold text-slate-900">Verification failed</h1>
                        <p className="mt-2 text-sm text-slate-600">{error}</p>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="mt-4 w-full h-10 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                        >
                            Back to home
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-lg font-semibold text-slate-900">Verifying your email…</h1>
                        <p className="mt-2 text-sm text-slate-600">You'll be redirected back to checkout shortly.</p>
                    </>
                )}
            </div>
        </div>
    );
}