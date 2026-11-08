import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReduced } from "./motion";
import { StatusDot } from "../boardui/StatusDot";
import { Kbd } from "../boardui/Kbd";
import { CommandPalette } from "../command/CommandPalette";

const inPageNav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

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
            <a
              href="#top"
              aria-label="Om M. Doddamani home"
              className="flex items-center gap-3 px-1"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-[0.68rem] font-medium tracking-[-0.04em] text-white"
              >
                OM
              </span>
              <span className="text-[0.9rem] font-medium tracking-[-0.025em] text-white">
                Om M. Doddamani
              </span>
            </a>
            <StatusDot status="active" showLabel={false} className="hidden sm:inline-flex" />
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1.5 sm:flex md:gap-2.5"
          >
            {inPageNav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-[0.85rem] tracking-[-0.01em] font-mono text-neutral-400 transition-colors duration-200 hover:text-white hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              >
                {n.label}
              </a>
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

            <a
              href="#contact"
              className="ml-2 rounded-full bg-white px-5 py-2 text-[0.85rem] tracking-[-0.01em] font-medium text-black transition-colors duration-200 hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Get in touch
            </a>
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
              {inPageNav.map((item, idx) => (
                <a
                  ref={idx === 0 ? firstMobileLink : undefined}
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-mono text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
