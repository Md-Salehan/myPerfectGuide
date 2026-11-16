// ============================================================
// src/components/layout/Header.tsx
// Sticky top navbar + slide-down mobile menu.
// ============================================================

import { useEffect, useRef, useState } from "react";

import { Badge } from "../common/Badge";
import { Button } from "../common/Button";

import { useAppDispatch } from "../../app/hooks";
import { openCallback } from "../../features/callback/callbackSlice";
import { ROUTES } from "../../routes/paths";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useAuth } from "../../features/auth/useAuth";


interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}
interface NavLink {
  /** Visible label of the link. */
  label: string | React.ReactNode;
  /** Target href (or route path). */
  href?: string;
  onClick?: () => void;
  /** Optional variant controlling the visual style. */
  variant?: "primary" | "highlight" | "plain";
  /** Whether to render a chevron-down indicator after the label. */
  hasDropdown?: boolean;
  /** Optional short badge text, e.g. "NEW". */
  badge?: string;
  /** Optional dropdown items, used when hasDropdown is true. */
  dropdownItems?: DropdownItem[];
}

/**
 * Nav entries with this exact label open the callback modal
 * instead of navigating. Kept as a single string constant so
 * the desktop and mobile paths stay in sync.
 */

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const authState = useAuth();


  const NAV_LINKS: readonly NavLink[] = [
    {
      label: "All Courses",
      // href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES,
      variant: "primary",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Banking & SSC",
          href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES + "/banking-ssc",
        },
        {
          label: "UPSC / State PSC",
          href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES + "/upsc",
        },
        {
          label: "Teaching Exams",
          href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES + "/teaching",
        },
        {
          label: "Defence Exams",
          href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES + "/defence",
        },
        {
          label: "Engineering & Medical",
          href: import.meta.env.BASE_URL + ROUTES.ALL_COURSES + "/engineering-medical",
        },
      ],
    },
    {
      label: "About Us",
      href: import.meta.env.BASE_URL + ROUTES.ABOUT,
      variant: "plain",
    },
    {
      label: "Request Callback",
      onClick: () => {
        dispatch(openCallback());
      },
      variant: "plain",
    },
    // {
    //   label: <CircleUserRound />,
    //   variant: "primary",
    //   hasDropdown: true,
    //   dropdownItems: [
    //     {
    //       label: "Dashboard",
    //       href: import.meta.env.BASE_URL + ROUTES.DASHBOARD,
    //     },
    //     {
    //       label: "Log Out",
    //       onClick: () => {
    //         // Handle log out logic
    //       }
    //     }
    //   ]
    // }
  ] as const;


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
        <a href={import.meta.env.BASE_URL} className="flex items-center gap-2 shrink-0">
          <img
            src={import.meta.env.BASE_URL + "images/brand-logo-light.png"}
            alt="My Perfect Guide"
            className="h-8 w-auto"
          />
        </a>




        <div className="flex items-center gap-2">
          {/* ---------- Desktop nav ---------- */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {NAV_LINKS.map((link) => (
              <DesktopNavItem key={link.label + ""} link={link} />
            ))}



          </nav>

          <DesktopNavItem link={{
            label: <CircleUserRound />,
            variant: "primary",
            hasDropdown: true,
            dropdownItems: [
              {
                label: "Dashboard",
                href: import.meta.env.BASE_URL + ROUTES.DASHBOARD,
              },
              {
                label: "Log Out",
                onClick: () => {
                  // Handle log out logic
                }
              }
            ]
          }} />









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
      </div>

      {/* ---------- Mobile menu panel ---------- */}
      <div
        id="mobileMenu"
        className={`lg:hidden border-t border-slate-200 bg-white ${mobileMenuOpen ? "" : "hidden"
          }`}
      >
        <div className="shell py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <MobileNavItem
              key={link.label + ""}
              link={link}
              onActionDone={() => closeMobileMenu(false)}
            />
          ))}

          <Button
            href={import.meta.env.BASE_URL + ROUTES.DASHBOARD}
            variant="primary"
            className="text-sm px-5 py-3 mt-2 justify-center"
          >
            Dashboard
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
   When `hasDropdown` is set, renders a hover/click dropdown
   panel anchored below the trigger.
   ------------------------------------------------------------ */

function DesktopNavItem({
  link,
}: {
  link: NavLink;
}) {
  const { label, href = "", variant = "plain", hasDropdown, badge, dropdownItems } = link;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Close the dropdown on outside click / Escape while it is open.
  useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (wrapperRef.current && target && !wrapperRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

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
          className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
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


  if (link?.onClick) {
    return (<Button
      onClick={link.onClick}
      variant="warning"
      className="text-sm px-5 py-2.5 ml-1"
    >
      {content}
    </Button>)
  }

  // Dropdown trigger: hover opens on pointer devices, click toggles
  // (needed for touch/keyboard). The outer Link still navigates.
  if (hasDropdown && dropdownItems && dropdownItems.length > 0) {
    return (
      <div
        ref={wrapperRef}
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}

      >
        <div className="flex items-center"
        >
          <Link to={href} className={`${baseClass} ${variantClass}`}>
            {content}
          </Link>
          <button
            type="button"
            className="p-1 ml-0.5 text-current"
            aria-label={`Toggle ${label} submenu`}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {/* Chevron already rendered inside `content`; this button
                exists purely for keyboard/touch accessibility. */}
            <span className="sr-only">Toggle submenu</span>
          </button>
        </div>

        {dropdownOpen && (
          <div
            role="menu"
            className="absolute left-0 top-full pt-2 min-w-[240px] z-50"
          >
            <div className="rounded-xl border border-slate-200 bg-white shadow-lg py-2">
            {dropdownItems.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.href) {
                    navigate(item.href);
                  }
                }}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </button>
            ))} 
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to={href} className={`${baseClass} ${variantClass}`}>
      {content}
    </Link>
  );
}

/* ------------------------------------------------------------
   Internal: mobile nav item
   Also handles the "Request Callback" entry: closes the mobile
   panel first, then opens the callback modal. When `hasDropdown`
   is set, renders an expandable submenu.
   ------------------------------------------------------------ */

function MobileNavItem({
  link,
  onActionDone,
}: {
  link: NavLink;
  onActionDone: () => void;
}) {
  const { label, href, variant = "plain", badge, hasDropdown, dropdownItems } = link;

  const [submenuOpen, setSubmenuOpen] = useState(false);

  const variantClass =
    variant === "highlight"
      ? "px-3 py-2.5 rounded-lg font-semibold text-slate-900 bg-slate-100"
      : "px-3 py-2.5 rounded-lg font-medium text-slate-700 flex items-center gap-2";

  const content = (
    <>
      {label}


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

  // Request Callback: close the mobile panel, then open the modal.
  if (link?.onClick) {
    return (<Button
      onClick={link.onClick}
      variant="warning"
      className="text-sm px-5 py-2.5 ml-1"
    >
      {content}
    </Button>)
  }

  if (hasDropdown && dropdownItems && dropdownItems.length > 0) {
    return (
      <div>
        <div className="flex items-stretch">
          <a
            href={href}
            className={`${variantClass} flex-1`}
            onClick={onActionDone}
          >
            {content}
          </a>
          <button
            type="button"
            className="px-3 text-slate-700"
            aria-label={`Toggle ${label} submenu`}
            aria-haspopup="true"
            aria-expanded={submenuOpen}
            onClick={() => setSubmenuOpen((open) => !open)}
          >
            <svg
              className={`w-4 h-4 transition-transform ${submenuOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {submenuOpen && (
          <div className="mt-1 ml-3 pl-3 border-l border-slate-200 flex flex-col">
            {dropdownItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSubmenuOpen(false);
                  if (item.onClick) {
                    item.onClick();
                    onActionDone();
                  } else if (item.href) {
                    // Use anchor navigation so the mobile panel closes
                    // after the route change (full reload avoids
                    // stale menu state on some embedded browsers).
                    window.location.href = item.href;
                  }
                }}
                className="text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a href={href} className={variantClass} onClick={onActionDone}>
      {content}
    </a>
  );
}


