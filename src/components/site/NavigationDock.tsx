import { Link, useRouterState } from "@tanstack/react-router";

// Restrained geometric engineering glyphs tied to the portfolio's identity
function GlyphHome() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="9" height="9" rx="1.5" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
    </svg>
  );
}

function GlyphWork() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <line x1="2.5" y1="5" x2="13.5" y2="5" />
      <line x1="2.5" y1="8" x2="10.5" y2="8" />
      <line x1="2.5" y1="11" x2="13.5" y2="11" />
      <line x1="13.5" y1="5" x2="13.5" y2="11" />
    </svg>
  );
}

function GlyphAbout() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="4.5" />
      <line x1="8" y1="2" x2="8" y2="4" />
      <line x1="8" y1="12" x2="8" y2="14" />
      <line x1="2" y1="8" x2="4" y2="8" />
      <line x1="12" y1="8" x2="14" y2="8" />
    </svg>
  );
}

function GlyphNotes() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path d="M4 3h5.5a2.5 2.5 0 0 1 2.5 2.5v7.5H4V3z" />
      <line x1="6.5" y1="6" x2="9.5" y2="6" />
      <line x1="6.5" y1="8.5" x2="9.5" y2="8.5" />
    </svg>
  );
}

function GlyphContact() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <rect x="2.5" y="4" width="11" height="8" rx="1.5" />
      <polyline points="3.5,5.5 8,8.5 12.5,5.5" />
    </svg>
  );
}

const DOCK_ROUTES = [
  { to: "/", label: "Home", glyph: GlyphHome },
  { to: "/work", label: "Work & Repositories", glyph: GlyphWork },
  { to: "/about", label: "About", glyph: GlyphAbout },
  { to: "/notes", label: "Notes", glyph: GlyphNotes },
  { to: "/contact", label: "Contact", glyph: GlyphContact },
] as const;

export function NavigationDock() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <>
      {/* 
        DESKTOP FAR-LEFT ICON-ONLY RAIL
        Fixed at left edge, vertically centered, quiet, calm, independent of Premotio.
        Thin active hairline marker replaces glowing tiles; zero hover scale bounce.
      */}
      <nav
        aria-label="Navigation rail"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col gap-1 rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-1.5 shadow-2xl backdrop-blur-md"
      >
        {DOCK_ROUTES.map((item) => {
          const Glyph = item.glyph;
          const isActive = item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              title={item.label}
              className={`relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 ${
                isActive ? "text-white" : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {/* Thin active hairline marker on the left edge */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-3 bottom-3 w-[2px] rounded-full bg-white"
                />
              )}
              <Glyph />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 
        MOBILE COMPACT BOTTOM STRIP
        Fixed at bottom center, quiet, thumb-accessible hit targets (min 44px).
        Thin active hairline marker at bottom edge; zero hover scale bounce.
      */}
      <nav
        aria-label="Mobile navigation bar"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex sm:hidden items-center gap-1 rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-1.5 shadow-2xl backdrop-blur-md"
      >
        {DOCK_ROUTES.map((item) => {
          const Glyph = item.glyph;
          const isActive = item.to === "/" ? currentPath === "/" : currentPath.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              title={item.label}
              className={`relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 ${
                isActive ? "text-white" : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {/* Thin active hairline marker at bottom edge */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-white"
                />
              )}
              <Glyph />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
