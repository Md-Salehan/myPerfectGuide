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
//   - iOS OTP autofill spreads a full code across boxes
//
// Accessibility:
//   - group has an aria-label
//   - each box has its own aria-label ("Digit N of M")
//   - aria-invalid is forwarded for error states
// ============================================================

import {
  useEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

interface OtpInputProps {
  /**
   * Current value — array of single-character strings, length
   * equal to `length`. Missing / empty slots are "".
   */
  value: string[];
  /** Called whenever any digit changes. */
  onChange: (next: string[]) => void;
  /** Number of digit boxes. Defaults to 6. */
  length?: number;
  /** Disable all inputs (e.g. while verifying). */
  disabled?: boolean;
  /** Focus the first box on mount. Default true. */
  autoFocus?: boolean;
  /** Label for the group — read by screen readers. */
  label?: string;
  /** When true, adds the error focus ring and sets aria-invalid. */
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
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Focus the first box after mount. Deferred to the next tick
  // so it plays nicely with the modal's own initial-focus effect.
  useEffect(() => {
    if (!autoFocus) return;
    const first = inputsRef.current[0];
    if (!first) return;
    const id = window.setTimeout(() => first.focus(), 0);
    return () => window.clearTimeout(id);
  }, [autoFocus]);

  const focusBox = (index: number) => {
    const el = inputsRef.current[index];
    if (!el) return;
    el.focus();
    const len = el.value.length;
    el.setSelectionRange?.(len, len);
  };

  /**
   * Fill boxes starting at `startIndex` with the digits in
   * `digits`. Existing digits beyond the filled range are kept.
   * Returns the next index to focus (the first still-empty box,
   * or the last box if all are filled).
   */
  const fillFrom = (startIndex: number, digits: string) => {
    const next = [...value];
    for (let i = 0; i < digits.length && startIndex + i < length; i++) {
      next[startIndex + i] = digits[i];
    }
    onChange(next);
    const nextEmpty = next.findIndex((d) => d === "");
    return nextEmpty === -1 ? length - 1 : nextEmpty;
  };

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = event.target.value;

    // FIX: iOS (and some Android) OTP autofill delivers the
    // full code into the first box via a single change event.
    // When that happens, spread it across all boxes — same
    // behaviour as paste.
    const allDigits = raw.replace(/\D/g, "");
    if (allDigits.length > 1) {
      const nextFocus = fillFrom(index, allDigits.slice(0, length));
      focusBox(nextFocus);
      return;
    }

    // Single-character change (typing or deleting).
    const digit = allDigits.slice(-1);

    // FIX: if the user pasted non-digit text into an empty box,
    // `digit` is "" but the box was already "". Do nothing,
    // rather than firing an onChange that clears the box.
    // A real deletion (user pressed Backspace) arrives via
    // onKeyDown, not this handler, so we don't need to clear
    // here for that case.
    if (digit === "" && value[index] === "") return;

    const next = [...value];
    next[index] = digit;
    onChange(next);

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
        const next = [...value];
        next[index] = "";
        onChange(next);
      } else if (index > 0) {
        // Move back and clear the previous box.
        const next = [...value];
        next[index - 1] = "";
        onChange(next);
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

    // FIX: on an empty box, ArrowUp should go to "0" and
    // ArrowDown to "9". The previous version set "1" for
    // ArrowUp because it started from 0 and added 1.
    if (key === "ArrowUp") {
      const current = value[index];
      const nextDigit =
        current === "" ? "0" : String((Number(current) + 1) % 10);
      const next = [...value];
      next[index] = nextDigit;
      onChange(next);
      event.preventDefault();
      return;
    }

    if (key === "ArrowDown") {
      const current = value[index];
      const nextDigit =
        current === "" ? "9" : String((Number(current) + 9) % 10);
      const next = [...value];
      next[index] = nextDigit;
      onChange(next);
      event.preventDefault();
      return;
    }

    // Allow numeric keys through so onChange fires normally.
    if (/^[0-9]$/.test(key)) return;

    // Reject other character keys (letters, symbols, space) but
    // let modifier combos (Ctrl+V, Cmd+R) and control keys
    // (Tab, Escape) pass through.
    if (
      key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
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
    const nextFocus = fillFrom(index, digits);
    focusBox(nextFocus);
    // No auto-submit — the parent's Verify button handles it.
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={["flex gap-2 justify-center", className]
        .filter(Boolean)
        .join(" ")}
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
            // FIX: removed maxLength={1}. It blocks multi-char
            // paste in some browsers (Safari, Firefox) and
            // interferes with iOS autofill. The change handler
            // already enforces single-digit-per-box semantics.
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
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
              "w-10 h-12 sm:w-11 sm:h-14 text-center text-lg font-semibold",
              "rounded-md border bg-white text-slate-900",
              "focus:outline-none focus:ring-2",
              "disabled:opacity-60 disabled:cursor-not-allowed",
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