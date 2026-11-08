// ============================================================
// src/pages/CoursesPage/sections/CourseSearch.tsx
// Prominent, accessible search bar. Fully controlled: the value
// lives in useCourseFilters (searchInput); the debounce happens
// there too, so this component stays presentational.
// ============================================================

import { useId, useRef, type ChangeEvent, type FormEvent } from "react";

import { SEARCH_PLACEHOLDER } from "../data/constants";

interface CourseSearchProps {
  /** Current text in the box. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CourseSearch({
  value,
  onChange,
  placeholder = SEARCH_PLACEHOLDER,
}: CourseSearchProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  // Results update as you type, so Enter should not reload the page.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className=" mb-8 max-w-4xl">
      <form
        role="search"
        aria-label="Search courses"
        onSubmit={handleSubmit}
        className="w-full"
      >
        <label htmlFor={inputId} className="sr-only">
          Search courses by title, category or topic
        </label>

        <div className="group relative">
          {/* Search icon */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            ref={inputRef}
            id={inputId}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={handleChange}
            onKeyDown={(event) => {
              // Escape clears the box (native type="search" does this in
              // some browsers only, so we make it consistent).
              if (event.key === "Escape" && value) {
                event.preventDefault();
                onChange("");
              }
            }}
            placeholder={placeholder}
            // text-base (16px) stops iOS Safari from zooming on focus.
            className={[
              "h-14 w-full rounded-full border border-slate-200 bg-white pl-13 pr-14",
              "text-base text-slate-900 placeholder:text-slate-400",
              " transition",
              "hover:border-slate-300",
              "focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15",
              // Hide the browser's built-in clear "x"; we render our own.
              "[&::-webkit-search-cancel-button]:appearance-none",
              "[&::-webkit-search-decoration]:appearance-none",
            ].join(" ")}
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}