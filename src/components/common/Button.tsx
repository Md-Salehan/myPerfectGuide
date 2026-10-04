// ============================================================
// src/components/common/Button.tsx
// Thin wrapper around the three .btn-* global classes defined
// in src/index.css. Provides one visual API while allowing the
// caller to choose between <button> and <a>.
//
// The base .btn class (flex, gap, weight, radius, transition)
// plus the variant class (.btn-primary / .btn-dark / .btn-outline)
// is applied identically to what the original markup used.
// ============================================================

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "outline";

/** Shared props for both the <button> and <a> render paths. */
interface BaseProps {
  /** Visual treatment. Maps to .btn-primary / .btn-dark / .btn-outline. */
  variant?: ButtonVariant;
  /** Extra classes appended after the base ones, for size / width overrides. */
  className?: string;
  /** Button content (label, icons, etc). */
  children: ReactNode;
}

/**
 * When `href` is provided, the component renders an <a>; otherwise
 * a <button>. This mirrors the original markup, which uses both
 * element types with the same .btn-* classes.
 */
type ButtonAsButtonProps = BaseProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonAsAnchorProps = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

/**
 * Maps a variant to the corresponding global class from index.css.
 * The base `.btn` class is always applied first.
 */
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  dark: "btn btn-dark",
  outline: "btn btn-outline",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children, ...rest } = props;

  const classes = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");

  // Render an <a> when href is supplied — matches the original
  // usage of the same visual styles on anchor elements.
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchorProps;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonAsButtonProps)}>
      {children}
    </button>
  );
}