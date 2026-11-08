// src/features/auth/useEmailLink.ts
import { useCallback } from "react";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  type ActionCodeSettings,
} from "firebase/auth";
import { getFirebaseAuthClient } from "../../config/firebase";

const EMAIL_FOR_SIGN_IN_KEY = "checkout:emailForSignIn";

/**
 * Build ActionCodeSettings for the checkout email-link flow.
 *
 * ASSUMPTION: your frontend origin is registered in
 * Firebase Console → Authentication → Settings → Authorized domains.
 * The `url` below must be on that list or Firebase will refuse to send.
 *
 * `handleCodeInApp: true` is required for sign-in links — they must
 * complete in the app (unlike password reset / verification links). [citation:2]
 */
function buildActionCodeSettings(): ActionCodeSettings {
  const continueUrl = new URL("/auth/email-link", window.location.origin);
  // Preserve the checkout context so the user lands back on the same order.
  const checkoutParams = new URLSearchParams(window.location.search);
  continueUrl.search = checkoutParams.toString();

  return {
    url: continueUrl.toString(),
    handleCodeInApp: true,
  };
}

export function useEmailLink() {
  const sendLink = useCallback(async (email: string) => {
    const auth = getFirebaseAuthClient();
    await sendSignInLinkToEmail(auth, email, buildActionCodeSettings());
    // Persist for the same-device return path. Firebase docs explicitly
    // recommend localStorage over passing the email in the URL (session
    // injection risk). [citation:2]
    window.localStorage.setItem(EMAIL_FOR_SIGN_IN_KEY, email);
  }, []);

  const completeSignIn = useCallback(async (href: string) => {
    const auth = getFirebaseAuthClient();
    if (!isSignInWithEmailLink(auth, href)) {
      throw new Error("This is not a valid email sign-in link.");
    }

    let email = window.localStorage.getItem(EMAIL_FOR_SIGN_IN_KEY);
    if (!email) {
      // User opened the link on a different device — Firebase requires
      // the email to complete the flow. Prompt them. [citation:2][citation:9]
      email = window.prompt("Please confirm the email you used to sign in:");
    }
    if (!email) throw new Error("Email is required to complete sign-in.");

    await signInWithEmailLink(auth, email, href);
    window.localStorage.removeItem(EMAIL_FOR_SIGN_IN_KEY);
    return email;
  }, []);

  return { sendLink, completeSignIn };
}