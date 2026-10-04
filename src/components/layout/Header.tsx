// ============================================================
// src/components/layout/Header.tsx
// Sticky top navbar + slide-down mobile menu.
//
// Ported 1:1 from the <header> block in index.html and
// about_us.html, including:
//   - desktop nav variants (primary / highlight / plain)
//   - chevron indicators on "Courses" and "Resources"
//   - "NEW" badge on "AI Course"
//   - mobile hamburger + slide-down panel
//
// Behaviour added on top of the source markup:
//   - Escape closes the menu and returns focus to the toggle
//   - Clicking outside the header closes the menu
//   - Tapping any nav item inside the panel closes the menu
//   - The hamburger icon swaps to an X when the menu is open
//   - Focus returns to the toggle button whenever the menu
//     is dismissed via Escape or click-outside
//   - The "Request Callback" entry (desktop and mobile) opens
//     the callback modal instead of navigating
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Logo } from "../common/Logo";

import { useAppDispatch } from "../../app/hooks";
import { openCallback } from "../../features/callback/callbackSlice";
import { MOBILE_NAV_LINKS, NAV_LINKS } from "../../constants/navigation";
import type { NavLink } from "../../types/common";

/**
 * Nav entries with this exact label open the callback modal
 * instead of navigating. Kept as a single string constant so
 * the desktop and mobile paths stay in sync.
 */
const CALLBACK_LABEL = "Request Callback";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Ref to the <header> element — used by the click-outside
  // handler to check whether a pointer event landed inside the
  // header (button, panel, logo, etc.).
  const headerRef = useRef<HTMLElement | null>(null);

  // Ref to the hamburger button — used to return focus when the
  // menu is dismissed via Escape or click-outside.
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMobileMenu = (returnFocus = false) => {
    setMobileMenuOpen(false);
    if (returnFocus) {
      toggleButtonRef.current?.focus();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => !open);
  };

  // Attach global listeners only while the menu is open.
  // Cleanup restores the previous DOM state on every close and
  // on unmount.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeMobileMenu(true);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      // If the pointer landed inside the header (which contains
      // both the toggle and the panel), leave it alone — the
      // toggle's own onClick will handle toggling.
      if (headerRef.current && target && headerRef.current.contains(target)) {
        return;
      }
      closeMobileMenu(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b border-slate-200"
    >
      <div className="shell flex items-center justify-between h-[76px]">
        {/* ---------- Logo ---------- */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <Logo variant="header" />
        </a>

        {/* ---------- Desktop nav ---------- */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
          {NAV_LINKS.map((link) => (
            <DesktopNavItem key={link.label} link={link} dispatch={dispatch} />
          ))}

          <Button
            href="#"
            variant="primary"
            className="text-sm px-5 py-2.5 ml-1"
          >
            Log In
          </Button>
        </nav>

        {/* ---------- Mobile hamburger / close toggle ---------- */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-slate-800"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobileMenu"
        >
          {mobileMenuOpen ? (
            /* X icon while open */
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            /* Hamburger icon while closed */
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ---------- Mobile menu panel ---------- */}
      <div
        id="mobileMenu"
        className={`lg:hidden border-t border-slate-200 bg-white ${
          mobileMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="shell py-4 flex flex-col gap-1">
          {MOBILE_NAV_LINKS.map((link) => (
            <MobileNavItem
              key={link.label}
              link={link}
              dispatch={dispatch}
              onNavigate={() => closeMobileMenu(false)}
            />
          ))}

          <Button
            href="#"
            variant="primary"
            className="text-sm px-5 py-3 mt-2 justify-center"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   Internal: desktop nav item
   Renders a <button> for the "Request Callback" entry (opens
   the callback modal) and an <a> for everything else.
   ------------------------------------------------------------ */

function DesktopNavItem({
  link,
  dispatch,
}: {
  link: NavLink;
  dispatch: ReturnType<typeof useAppDispatch>;
}) {
  const { label, href, variant = "plain", hasDropdown, badge } = link;

  const baseClass = "flex items-center gap-1.5 transition";

  const variantClass =
    variant === "primary"
      ? "bg-slate-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-800"
      : variant === "highlight"
        ? "relative nav-link px-3 py-2 bg-slate-100 rounded-lg"
        : "nav-link px-3 py-2";

  // Inner content is the same for both element types.
  const content = (
    <>
      {label}

      {hasDropdown && (
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      )}

      {badge && (
        <Badge
          variant="new"
          className={
            variant === "highlight" ? "absolute -top-2 -right-2" : ""
          }
        >
          {badge}
        </Badge>
      )}
    </>
  );

  // Request Callback opens the modal instead of navigating.
  if (label === CALLBACK_LABEL) {
    return (
      <button
        type="button"
        onClick={() => dispatch(openCallback())}
        className={`${baseClass} ${variantClass}`}
      >
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={`${baseClass} ${variantClass}`}>
      {content}
    </a>
  );
}

/* ------------------------------------------------------------
   Internal: mobile nav item
   Also handles the "Request Callback" entry: closes the mobile
   panel first, then opens the callback modal.
   ------------------------------------------------------------ */

function MobileNavItem({
  link,
  dispatch,
  onNavigate,
}: {
  link: NavLink;
  dispatch: ReturnType<typeof useAppDispatch>;
  onNavigate: () => void;
}) {
  const { label, href, variant = "plain", badge } = link;

  const variantClass =
    variant === "highlight"
      ? "px-3 py-2.5 rounded-lg font-semibold text-slate-900 bg-slate-100"
      : "px-3 py-2.5 rounded-lg font-medium text-slate-700 flex items-center gap-2";

  // Request Callback: close the mobile panel, then open the modal.
  if (label === CALLBACK_LABEL) {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate();
          dispatch(openCallback());
        }}
        className={`${variantClass} text-left`}
      >
        {label}
        {badge && <Badge variant="new">{badge}</Badge>}
      </button>
    );
  }

  return (
    <a href={href} className={variantClass} onClick={onNavigate}>
      {label}
      {badge && <Badge variant="new">{badge}</Badge>}
    </a>
  );
}