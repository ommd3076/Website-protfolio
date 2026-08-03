import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { BrandMarkSlot } from "./BrandMarkSlot";
import { prefersReduced } from "./motion";

const nav = [
  { to: "/work", label: "Work" },
  { to: "/approach", label: "Approach" },
  { to: "/future", label: "Future" },
];

export function HeaderBar() {
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // The chrome arrives once; route content owns subsequent entrances.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (prefersReduced()) return;
    const tl = gsap.fromTo(
      el,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.72, delay: 0.08, ease: "power3.out" },
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <header ref={wrap} className="sticky top-0 z-[90] px-3 pt-3 md:px-5 md:pt-4">
      <div
        ref={bar}
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
        data-header-bar
        className="relative mx-auto flex max-w-[1360px] items-center justify-between rounded-lg border border-border bg-background/92 px-4 py-2.5 text-foreground shadow-[0_14px_40px_-34px_rgba(20,22,26,0.55)] backdrop-blur-xl md:px-6 md:py-3"
        style={
          {
            "--brand-mark-accent": "var(--accent-deep)",
          } as React.CSSProperties
        }
      >
        <BrandMarkSlot compact />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 sm:flex md:gap-2">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              data-cursor="pointer"
              activeProps={{ "data-active": "true" }}
              className="group relative px-3 py-1.5 text-[0.78rem] tracking-[-0.005em] opacity-65 transition-opacity duration-200 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 data-[active=true]:opacity-100"
            >
              {n.label}
              <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-current opacity-50 transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100" />
            </Link>
          ))}
          <Link
            to="/contact"
            data-cursor="pointer"
            activeProps={{ "data-active": "true" }}
            className="ml-2 rounded-full border border-current/25 px-4 py-1.5 text-[0.78rem] tracking-[-0.005em] transition-colors duration-200 hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
          >
            Contact
          </Link>
        </nav>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 items-center rounded-full border border-current/25 px-4 text-[0.76rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[calc(100%+6px)] grid rounded-lg border border-border bg-background p-2 text-foreground shadow-xl sm:hidden"
          >
            {[...nav, { to: "/contact", label: "Contact" }].map((item) => (
              <Link
                ref={item.to === "/work" ? firstMobileLink : undefined}
                key={item.to}
                to={item.to}
                data-cursor="pointer"
                activeProps={{ "data-active": "true" }}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm opacity-70 transition-colors hover:bg-mineral hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
