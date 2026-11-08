// src/features/auth/usePhoneVerification.ts
//
// Firebase Phone Auth adapter.
//
// Returns plain Promises — Firebase phone sign-in has no
// cancellation token, so exposing `.abort()` would be a no-op lie.
import { useCallback, useEffect, useRef } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { getFirebaseAuthClient } from "../../config/firebase";

export interface PhoneSendResult {
  /** Kept for UI symmetry; Firebase never returns a dev code. */
  devCode?: string;
}

export interface PhoneVerifyResult {
  verified: boolean;
  reason?: string;
}

export function usePhoneVerification(
  recaptchaContainerId = "recaptcha-container",
) {
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuthClient();
    const el = document.getElementById(recaptchaContainerId);
    if (!el) {
      // eslint-disable-next-line no-console
      console.error(
        `[phone-auth] #${recaptchaContainerId} not found in DOM. ` +
          `Make sure <div id="${recaptchaContainerId}" /> is rendered.`,
      );
      return;
    }

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerId, {
        size: "invisible",
      });
    }

    return () => {
      verifierRef.current?.clear();
      verifierRef.current = null;
      confirmationRef.current = null;
    };
  }, [recaptchaContainerId]);

  const sendOtp = useCallback(async (identity: string): Promise<PhoneSendResult> => {
    const auth = getFirebaseAuthClient();
    const verifier = verifierRef.current;
    if (!verifier) {
      throw new Error(
        "reCAPTCHA verifier is not ready. Ensure #recaptcha-container is mounted.",
      );
    }

    const confirmation = await signInWithPhoneNumber(auth, `+91${identity}`, verifier);
    confirmationRef.current = confirmation;
    return {};
  }, []);

  const verifyOtp = useCallback(async (otp: string): Promise<PhoneVerifyResult> => {
    const confirmation = confirmationRef.current;
    if (!confirmation) {
      return { verified: false, reason: "No OTP in flight. Please resend." };
    }
    try {
      await confirmation.confirm(otp);
      confirmationRef.current = null;
      return { verified: true };
    } catch (e: unknown) {
      return {
        verified: false,
        reason: e instanceof Error ? e.message : "Invalid code",
      };
    }
  }, []);

  return { sendOtp, verifyOtp };
}