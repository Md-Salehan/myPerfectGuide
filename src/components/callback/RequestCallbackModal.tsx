// ============================================================
// src/components/callback/RequestCallbackModal.tsx
// Composition of <Modal> + <RequestCallback>, connected to
// the callback slice.
//
// Rendered once at the layout level (see MainLayout.tsx).
// Any component can open it by dispatching openCallback().
//
// Kept as a separate file (rather than inlining Modal +
// RequestCallback at the layout) so that:
//   - Modal stays a generic primitive
//   - RequestCallback stays a pure form
//   - the wiring between them is visible in one place
// ============================================================

import { Modal } from "../common/Modal";
import { RequestCallback } from "./RequestCallback";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeCallback,
  selectCallbackOpen,
} from "../../features/callback/callbackSlice";

export function RequestCallbackModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCallbackOpen);

  const handleClose = () => {
    dispatch(closeCallback());
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Request a Callback"
      description="Tell us your number and we'll call you back — usually within a few hours during advisor hours."
    >
      {/*
        The RequestCallback form is fully self-contained: it
        manages its own input state, validation, and submit
        lifecycle. The modal only provides the shell.

        `showSlotTime` is set to true here because the callback
        modal is the primary place a user chooses a time. If a
        future use case needs the form without the slot field,
        render <RequestCallback showSlotTime={false} /> elsewhere
        — no change to this file is required.
      */}
      <RequestCallback showSlotTime={true} />

      {/*
        Note: the RequestCallback renders its own submit button
        inside its form. The Modal's `footer` slot is intentionally
        not used here — the submit button must be part of the
        <form> element to trigger its submit handler, and the
        modal body wraps children in a scrollable div, not a form.
      */}
    </Modal>
  );
}