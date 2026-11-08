import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReduced } from "./motion";
import { Kbd } from "../boardui/Kbd";
import { CommandPalette } from "../command/CommandPalette";

const siteRoutes = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/notes", label: "Notes" },
  { to: "/contact", label: "Contact" },
] as const;

export function HeaderBar() {
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    firstMobileLink.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeAtDesktop = () => {
      if (window.matchMedia("(min-width: 640px)").matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", closeAtDesktop);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", closeAtDesktop);
    };
  }, [menuOpen]);

  // Global ⌘K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Chrome entrance animation via @gsap/react useGSAP
  useGSAP(
    () => {
      const el = wrap.current;
      if (!el || prefersReduced()) return;
      const tl = gsap.fromTo(
        el,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72, delay: 0.08, ease: "power3.out" },
      );
      return () => {
        tl.kill();
      };
    },
    { scope: wrap },
  );

  return (
    <>
      <header ref={wrap} className="sticky top-0 z-[90] px-4 pt-4 md:px-6 md:pt-5">
        <div
          ref={bar}
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
          data-header-bar
          className="relative mx-auto flex max-w-[1120px] items-center justify-between rounded-2xl border border-neutral-800/80 bg-neutral-950/85 px-5 py-3 text-white shadow-[0_8px_32px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl md:px-7 md:py-3.5"
        >
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Om M. Doddamani home" className="flex items-center gap-3 px-1">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-[0.68rem] font-medium tracking-[-0.04em] text-white"
              >
                OM
              </span>
              <span className="text-[0.9rem] font-medium tracking-[-0.025em] text-white">
                Om M. Doddamani
              </span>
            </Link>
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1.5 sm:flex md:gap-2.5"
          >
            {siteRoutes.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{
                  className: "text-white bg-neutral-900 border-neutral-700",
                }}
                inactiveProps={{
                  className: "text-neutral-400 hover:text-white hover:bg-neutral-900/60",
                }}
                className="rounded-full border border-transparent px-3.5 py-1.5 text-[0.82rem] tracking-[-0.01em] font-mono transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                {n.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors ml-1"
            >
              <span className="font-mono text-[11px]">Search</span>
              <Kbd>⌘K</Kbd>
            </button>

            <Link
              to="/contact"
              className="ml-2 rounded-full bg-white px-4 py-1.5 text-[0.82rem] tracking-[-0.01em] font-medium text-black transition-colors duration-200 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Get in touch
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="grid h-10 w-10 place-items-center rounded-full border border-neutral-800 bg-neutral-900 text-xs text-neutral-300"
            >
              ⌘
            </button>

            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 items-center rounded-full border border-neutral-800 bg-neutral-900 px-4 text-[0.82rem] font-medium text-neutral-200 transition-colors hover:text-white"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          {menuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-[calc(100%+8px)] grid rounded-2xl border border-neutral-800 bg-neutral-950/95 p-3 text-white shadow-[0_16px_48px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:hidden"
            >
              {siteRoutes.map((item, idx) => (
                <Link
                  ref={idx === 0 ? firstMobileLink : undefined}
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  activeProps={{
                    className: "bg-neutral-900 text-white font-medium",
                  }}
                  inactiveProps={{
                    className: "text-neutral-300 hover:bg-neutral-900/60 hover:text-white",
                  }}
                  className="rounded-xl px-4 py-3 text-sm font-mono transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
