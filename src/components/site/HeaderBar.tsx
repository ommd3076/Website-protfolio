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
    <header ref={wrap} className="sticky top-0 z-[90] px-4 pt-4 md:px-6 md:pt-5">
      <div
        ref={bar}
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
        data-header-bar
        className="relative mx-auto flex max-w-[1360px] items-center justify-between rounded-2xl border border-border bg-background/95 px-5 py-3 text-foreground shadow-[0_8px_32px_-24px_rgba(20,22,26,0.45)] backdrop-blur-xl md:px-8 md:py-3.5"
        style={
          {
            "--brand-mark-accent": "var(--accent-deep)",
          } as React.CSSProperties
        }
      >
        <BrandMarkSlot compact />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1.5 sm:flex md:gap-2.5"
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              data-cursor="pointer"
              activeProps={{ "data-active": "true" }}
              className="group relative rounded-full px-5 py-2 text-[0.85rem] tracking-[-0.01em] font-medium opacity-70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-100 hover:bg-accent-soft hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 data-[active=true]:opacity-100 data-[active=true]:bg-accent-soft data-[active=true]:text-accent-deep"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-cursor="cta"
            activeProps={{ "data-active": "true" }}
            className="ml-2 rounded-full bg-foreground px-5 py-2 text-[0.85rem] tracking-[-0.01em] font-medium text-background transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent hover:text-accent-foreground hover:shadow-[0_4px_20px_-8px_rgba(220,160,60,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
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
          className="flex h-10 items-center rounded-full border border-current/20 px-4 text-[0.82rem] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-soft hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-[calc(100%+8px)] grid rounded-2xl border border-border bg-background/95 p-3 text-foreground shadow-[0_16px_48px_-32px_rgba(20,22,26,0.55)] backdrop-blur-xl sm:hidden"
          >
            {[...nav, { to: "/contact", label: "Contact" }].map((item) => (
              <Link
                ref={item.to === "/work" ? firstMobileLink : undefined}
                key={item.to}
                to={item.to}
                data-cursor="pointer"
                activeProps={{ "data-active": "true" }}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-medium opacity-70 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-100 hover:bg-accent-soft hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 data-[active=true]:opacity-100 data-[active=true]:bg-accent-soft data-[active=true]:text-accent-deep"
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
