// src/components/common/Badge.tsx


import type { ReactNode } from "react";

type BadgeVariant = "bestseller" | "cohort" | "new" | "pill";

interface BadgeProps {
  /** Visual + semantic variant. */
  variant: BadgeVariant;
  /** Extra classes appended after the variant classes. */
  className?: string;
  /** Badge text or inline content. */
  children: ReactNode;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  bestseller: "badge badge-bestseller",
  cohort: "badge badge-cohort",
  new: "badge-new",
  pill: "badge-pill",
};

export function Badge({ variant, className = "", children }: BadgeProps) {
  const classes = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}