// ============================================================
// src/pages/home/renderRich.tsx
// Parses the source's rich-text markup into React nodes.
//
// Markers:
//   [[teal text]]  → <span class="text-teal-deep">{text}</span>
//   {{pink text}}  → <span class="text-brand-600">{text}</span>
//
// Matches the source's two-pass replace order:
//   1. [[...]]  -> teal   (outermost)
//   2. {{...}}  -> pink   (inside teal or standalone)
//
// So `[[a {{b}} c]]` renders as:
//   <span class="text-teal-deep">a <span class="text-brand-600">b</span> c</span>
//
// No HTML injection: React renders children as text nodes by
// default, so we never need `dangerouslySetInnerHTML`.
//
// Consumed by:
//   - pages/home/sections/HomeHero.tsx
//   - pages/home/sections/HomeCatalog.tsx
//   - pages/home/sections/HomeOutcomes.tsx
//   - pages/home/sections/HomeTestimonials.tsx
//   - pages/home/sections/HomeProcess.tsx
//   (anywhere a heading supports rich markup)
// ============================================================

import { Fragment, type ReactNode } from "react";

/**
 * Parses a string with [[teal]] and {{pink}} markers into an
 * array of React nodes.
 *
 * The parse happens in two passes, matching the source's
 * `.replace()` order:
 *   - First pass: split on [[...]].
 *   - Second pass: inside each segment, split on {{...}}.
 *
 * Non-marker text becomes plain text nodes. The returned array
 * is suitable to render directly as children of a heading
 * element — no wrapper needed.
 */
export function renderRich(input: string | undefined | null): ReactNode {
  if (!input) return null;

  // First pass: split on [[...]]. Capture groups give us the
  // teal-wrapped substring; non-matches are plain text.
  const tealPattern = /\[\[(.+?)\]\]/g;
  const segments: Array<{ kind: "text" | "teal"; value: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tealPattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        kind: "text",
        value: input.slice(lastIndex, match.index),
      });
    }
    segments.push({ kind: "teal", value: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < input.length) {
    segments.push({ kind: "text", value: input.slice(lastIndex) });
  }

  // Second pass: within each segment, parse {{pink}}. Teal
  // segments also recurse, so nested markers work:
  //   [[a {{b}} c]] -> teal containing text + pink
  const result: ReactNode[] = segments.map((segment, index) => {
    if (segment.kind === "teal") {
      return (
        <span key={`teal-${index}`} className="text-teal-deep">
          {renderPink(segment.value, `teal-${index}`)}
        </span>
      );
    }
    return (
      <Fragment key={`text-${index}`}>
        {renderPink(segment.value, `text-${index}`)}
      </Fragment>
    );
  });

  return <>{result}</>;
}

/* ------------------------------------------------------------
   Internal: parse {{...}} within a string.
   Returns a ReactNode (string or fragment of nodes).
   ------------------------------------------------------------ */

function renderPink(value: string, keyPrefix: string): ReactNode {
  const pinkPattern = /\{\{(.+?)\}\}/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pinkPattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push(value.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={`${keyPrefix}-pink-${i++}`} className="text-brand-600">
        {match[1]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  // If there were no pink markers at all, return the string
  // directly — avoids a Fragment wrapper for the common case.
  if (parts.length === 1 && typeof parts[0] === "string") {
    return parts[0];
  }

  return <>{parts}</>;
}