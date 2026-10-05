// ============================================================
// src/pages/checkout/sections/GstSection.tsx
// GST accordion — collapsible panel with four fields.
//
// Controlled: the parent owns `open`, `gst`, and `error`. This
// section is purely presentational and reports changes up.
//
// Behaviour mirrors the source:
//   - number field uppercases and strips spaces, max 15 chars
//   - state select uses the same 11 states as the source
//   - title toggles between "Add GST (optional)" and
//     "GST Information" based on the open state
//   - error is displayed inline under the fields, with a red
//     border on every field while an error is present
// ============================================================

import { GST_STATES } from "../constants";
import type { GstDetails } from "../types";

interface GstSectionProps {
  /** Whether the accordion is expanded. */
  open: boolean;
  /** Current values for the four fields. */
  gst: GstDetails;
  /** Inline error message, or "" when no error. */
  error: string;
  /** Called when the header is clicked to toggle `open`. */
  onToggle: () => void;
  /** Called with the full updated GST object on any field change. */
  onChange: (gst: GstDetails) => void;
}

export function GstSection({
  open,
  gst,
  error,
  onToggle,
  onChange,
}: GstSectionProps) {
  const hasError = error.length > 0;

  const updateField = (key: keyof GstDetails, value: string) => {
    onChange({ ...gst, [key]: value });
  };

  return (
    <div className="order-6 mt-[32px] lg:mt-[30px] px-[15px] lg:px-0 w-full lg:max-w-[401px] lg:ml-[185px]">
      <div className="rounded-lg border border-slate-200 bg-white">
        {/* ---------- Header (always visible) ---------- */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="gst-body"
          className="w-full h-[45px] lg:h-[40px] px-3 flex items-center gap-3 text-left"
        >
          {!open && (
            <svg
              className="w-5 h-5 text-slate-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V9h5.5L13 3.5ZM8 13h8v1.5H8V13Zm0 3.5h8V18H8v-1.5Z" />
            </svg>
          )}

          {open ? (
            <span className="flex-1 text-[16px] lg:text-[17px] font-medium">
              GST Information
            </span>
          ) : (
            <span className="flex-1 text-[15px] lg:text-[17px] font-medium">
              Add GST{" "}
              <span className="text-[13px] lg:text-[15px] font-normal">
                (optional)
              </span>
            </span>
          )}

          {/* Plus icon when closed, minus when open */}
          {open ? (
            <svg
              className="w-4 h-4 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 12h16" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 4v16M4 12h16" />
            </svg>
          )}
        </button>

        {/* ---------- Body (open only) ---------- */}
        {open && (
          <div id="gst-body" className="px-3 pb-3">
            <div className="space-y-[13px]">
              {/* GST number */}
              <input
                type="text"
                value={gst.number}
                onChange={(e) =>
                  updateField(
                    "number",
                    e.target.value.toUpperCase().replace(/\s/g, "").slice(0, 15),
                  )
                }
                placeholder="Enter GST number"
                aria-invalid={hasError || undefined}
                className={[
                  "w-full h-[39px] px-[11px] rounded-md border bg-white text-[14px] placeholder:text-slate-500 focus:outline-none focus:ring-2",
                  hasError
                    ? "border-rose-300 focus:ring-rose-100"
                    : "border-slate-200 focus:ring-indigo-200",
                ].join(" ")}
              />

              {/* Registration name */}
              <input
                type="text"
                value={gst.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter GST registration name"
                aria-invalid={hasError || undefined}
                className={[
                  "w-full h-[39px] px-[11px] rounded-md border bg-white text-[14px] placeholder:text-slate-500 focus:outline-none focus:ring-2",
                  hasError
                    ? "border-rose-300 focus:ring-rose-100"
                    : "border-slate-200 focus:ring-indigo-200",
                ].join(" ")}
              />

              {/* Registration address */}
              <input
                type="text"
                value={gst.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Enter GST registration address"
                aria-invalid={hasError || undefined}
                className={[
                  "w-full h-[39px] px-[11px] rounded-md border bg-white text-[14px] placeholder:text-slate-500 focus:outline-none focus:ring-2",
                  hasError
                    ? "border-rose-300 focus:ring-rose-100"
                    : "border-slate-200 focus:ring-indigo-200",
                ].join(" ")}
              />

              {/* State select */}
              <div className="relative">
                <select
                  value={gst.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  aria-invalid={hasError || undefined}
                  className={[
                    "appearance-none w-full h-[39px] px-[11px] rounded-md border bg-white text-[14px] focus:outline-none focus:ring-2",
                    gst.state === "" ? "text-slate-500" : "text-slate-900",
                    hasError
                      ? "border-rose-300 focus:ring-rose-100"
                      : "border-slate-200 focus:ring-indigo-200",
                  ].join(" ")}
                >
                  <option value="">Select GST state</option>
                  {GST_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
                </svg>
              </div>

              {/* Inline error */}
              {hasError && (
                <p role="alert" className="text-[13px] text-rose-500">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}