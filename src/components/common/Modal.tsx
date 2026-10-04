// ============================================================
// src/components/common/Modal.tsx
// Generic, reusable modal primitive.
//
// Controlled: fully driven by `open` and `onClose`. Owns no
// open/close state of its own.
//
// Handles:
//   - backdrop + click-outside to close
//   - Escape key to close
//   - focus management (move into panel on open,
//     return to trigger on close)
//   - focus trap while open (Tab / Shift+Tab cycle)
//   - body scroll lock while open
//   - ARIA: role="dialog", aria-modal, aria-labelledby
//   - responsive panel: bottom-sheet style on mobile,
//     centered card on sm+
//
// Renders arbitrary children. Knows nothing about callbacks,
// forms, or any specific use case.
// ============================================================

import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  /** Whether the modal is currently open. */
  open: boolean;
  /** Called when the user requests to close (X, backdrop, Escape). */
  onClose: () => void;
  /** Accessible title rendered in the header and used for aria-labelledby. */
  title: string;
  /** Optional subtitle or supporting line under the title. */
  description?: string;
  /** Modal body content. */
  children: ReactNode;
  /** Optional footer slot (typically action buttons). */
  footer?: ReactNode;
  /** Optional max-width override for the panel. Defaults to "max-w-lg". */
  maxWidthClass?: string;
  /**
   * When true (default), clicking the backdrop calls onClose.
   * Set false for modals that must be explicitly dismissed.
   */
  closeOnBackdrop?: boolean;
  /**
   * When true (default), pressing Escape calls onClose.
   */
  closeOnEscape?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidthClass = "max-w-lg",
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  // Stable, SSR-safe id used to link the dialog to its title.
  const titleId = useId();

  // The panel element — used for the focus trap and initial focus.
  const panelRef = useRef<HTMLDivElement | null>(null);

  // The element that had focus when the modal opened. Focus
  // returns here on close.
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // --- Effects that run while the modal is open ----------------

  useEffect(() => {
    if (!open) return;

    // Remember the previously-focused element so we can restore
    // focus on close.
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Lock body scroll. Save any previous value so we can
    // restore it exactly (in case something else also manages it).
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move initial focus to the first focusable element inside
    // the panel, or the panel itself if there's nothing focusable.
    // Deferred to the next tick so the panel is in the DOM first.
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? panel).focus();
    }, 0);

    // Escape-to-close.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      // Return focus to the element that opened the modal.
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onClose, closeOnEscape]);

  // --- Focus trap (Tab / Shift+Tab cycling) --------------------

  const handlePanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // --- Render --------------------------------------------------

  if (!open) return null;

  return (
    <div
      // The outermost element is the backdrop + layout wrapper.
      // Clicking it (but not the panel inside) closes the modal.
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
        className={[
          "relative w-full bg-white shadow-pop outline-none",
          // Mobile: bottom sheet
          "rounded-t-2xl",
          // Desktop: centered card with rounded corners all around
          "sm:rounded-2xl",
          // Width constraints
          maxWidthClass,
          
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight"
            >
              {title}
            </h2>
            {description && (
              <p className="text-slate-500 text-[13.5px] leading-relaxed mt-1">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="shrink-0 -mt-1 -mr-1 w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer (optional) */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}