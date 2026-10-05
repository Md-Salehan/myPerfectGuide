// ============================================================
// src/pages/checkout/modals/PayErrorModal.tsx
// Pay-flow error modal. Replaces the source's alert() call.
//
// Owns no state, calls no APIs. The parent supplies the
// message and decides when to close. No retry button — the
// user closes this and retries from the pay button.
// ============================================================

import { Modal } from "../../../components/common/Modal";

interface PayErrorModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Human-readable error message to display. */
  message: string;
  /** Called when the user dismisses the modal. */
  onClose: () => void;
}

export function PayErrorModal({
  open,
  message,
  onClose,
}: PayErrorModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Something went wrong"
      description="Your order wasn't created. No payment has been taken."
      maxWidthClass="max-w-md"
    >
      <div className="space-y-5">
        {/* Warning icon + message */}
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-rose-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </span>
          <p className="text-slate-700 text-[14.5px] leading-relaxed pt-2">
            {message}
          </p>
        </div>

        {/* Dismiss */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[15px] font-medium transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}