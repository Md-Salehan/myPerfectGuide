// ============================================================
// src/components/common/OtpInput.tsx
// Generic N-digit OTP input.
//
// Controlled: owns no digit state, just renders N single-char
// boxes and reports their values via onChange. The parent
// decides when to submit — this component never auto-submits.
//
// Behaviours:
//   - numeric only (non-digit keystrokes ignored)
//   - auto-advance on digit entry
//   - backspace on empty box clears the previous digit and
//     moves focus back
//   - arrow keys navigate between boxes
//   - up/down increment / decrement the digit
//   - paste a full code fills all boxes (no auto-submit)
//
// Accessibility:
//   - group has an aria-label
//   - each box has its own aria-label ("Digit N of M")
//   - aria-invalid is forwarded for error states
//
// Reusable: no dependency on any specific feature. The
// checkout OTP modals pass `length={OTP_LENGTH}` explicitly.
// ============================================================

import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react";

interface OtpInputProps {
  /**
   * Current value — array of single-character strings, length
   * equal to `length`. Missing / empty slots are "".
   */
  value: string[];
  /** Called whenever any digit changes. */
  onChange: (next: string[]) => void;
  /**
   * Number of digit boxes. Defaults to 6.
   */
  length?: number;
  /** Disable all inputs (e.g. while verifying). */
  disabled?: boolean;
  /** Focus the first box on mount. Default true. */
  autoFocus?: boolean;
  /**
   * Label for the group — read by screen readers before the
   * individual box labels. Defaults to "Verification code".
   */
  label?: string;
  /**
   * When true, adds the error focus ring and sets aria-invalid
   * on every box. Does not render any error text; the parent
   * owns that.
   */
  invalid?: boolean;
  /** Optional className passthrough on the wrapper. */
  className?: string;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  autoFocus = true,
  label = "Verification code",
  invalid = false,
  className = "",
}: OtpInputProps) {
  // One ref per box so we can move focus imperatively.
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Focus the first box on mount when autoFocus is set. Using
  // a small timeout (0ms) so the focus happens after the modal's
  // own initial-focus effect, which fires on the same tick.
  useEffect(() => {
    if (!autoFocus) return;
    const first = inputsRef.current[0];
    if (first) {
      const id = window.setTimeout(() => first.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [autoFocus]);

  const focusBox = (index: number) => {
    const el = inputsRef.current[index];
    if (el) {
      el.focus();
      // Place the caret at the end so typing appends visibly.
      const len = el.value.length;
      el.setSelectionRange?.(len, len);
    }
  };

  const setDigitAt = (index: number, digit: string) => {
    const next = [...value];
    next[index] = digit;
    onChange(next);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = event.target.value;
    // Keep only the last digit typed (handles the case where
    // the browser inserts a character before the existing one).
    const digit = raw.replace(/\D/g, "").slice(-1);

    setDigitAt(index, digit);

    if (digit && index < length - 1) {
      focusBox(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = event;

    if (key === "Backspace") {
      if (value[index]) {
        // Clear the current box.
        setDigitAt(index, "");
      } else if (index > 0) {
        // Move back and clear that box.
        setDigitAt(index - 1, "");
        focusBox(index - 1);
      }
      event.preventDefault();
      return;
    }

    if (key === "ArrowLeft") {
      if (index > 0) focusBox(index - 1);
      event.preventDefault();
      return;
    }

    if (key === "ArrowRight") {
      if (index < length - 1) focusBox(index + 1);
      event.preventDefault();
      return;
    }

    if (key === "ArrowUp") {
      const current = value[index];
      const n = current === "" ? 0 : Number(current);
      const next = (n + 1) % 10;
      setDigitAt(index, String(next));
      event.preventDefault();
      return;
    }

    if (key === "ArrowDown") {
      const current = value[index];
      const n = current === "" ? 0 : Number(current);
      const next = (n + 9) % 10; // -1 mod 10
      setDigitAt(index, String(next));
      event.preventDefault();
      return;
    }

    // Numeric keys — allow the browser to handle them so
    // onChange fires normally.
    if (/^[0-9]$/.test(key)) return;

    // Anything else that would insert text (letters, symbols)
    // is rejected. Modifier-only keys pass through so Tab,
    // Shift+Tab, Ctrl+V etc. keep working.
    if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
    }
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    const text = event.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, length);
    if (!digits) return;

    event.preventDefault();

    // Fill starting from the current box. When pasting a full
    // code, this typically fills the entire input.
    const next = [...value];
    for (let i = 0; i < digits.length && index + i < length; i++) {
      next[index + i] = digits[i];
    }
    onChange(next);

    // Focus the next empty box, or the last box if all filled.
    const nextEmpty = next.findIndex((d) => d === "");
    const target = nextEmpty === -1 ? length - 1 : nextEmpty;
    focusBox(target);
    // Note: no auto-submit. The parent's Verify button handles
    // submission once all digits are present.
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={["flex gap-2 justify-center", className].filter(Boolean).join(" ")}
    >
      {Array.from({ length }).map((_, index) => {
        const digit = value[index] ?? "";
        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={invalid || undefined}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => {
              // Place caret at end so typing appends.
              const el = e.currentTarget;
              const len = el.value.length;
              el.setSelectionRange?.(len, len);
            }}
            className={[
              // Size: matches the source's input language scaled
              // up slightly so digits are legible.
              "w-10 h-12 sm:w-11 sm:h-14 text-center text-lg font-semibold",
              // Shape and typography
              "rounded-md border bg-white text-slate-900",
              // Focus ring (matches the app's other inputs)
              "focus:outline-none focus:ring-2",
              // Disabled
              "disabled:opacity-60 disabled:cursor-not-allowed",
              // Invalid vs default border/focus colour
              invalid
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}