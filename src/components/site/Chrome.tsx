import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="mt-20 px-4 pb-8 md:px-6 md:pb-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/80 px-6 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <strong className="block font-medium text-white text-sm">Om M. Doddamani</strong>
          <span className="mt-1 block text-neutral-500 font-mono text-[11px]">
            Computer Science @ VVCE · Founder at Cerenetics
          </span>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-5 text-xs font-mono"
        >
          <Link to="/" className="text-neutral-400 transition-colors hover:text-white">
            Home
          </Link>
          <Link to="/work" className="text-neutral-400 transition-colors hover:text-white">
            Work
          </Link>
          <Link to="/about" className="text-neutral-400 transition-colors hover:text-white">
            About
          </Link>
          <Link to="/notes" className="text-neutral-400 transition-colors hover:text-white">
            Notes
          </Link>
          <Link to="/contact" className="text-neutral-400 transition-colors hover:text-white">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5 font-mono text-xs">
          <a
            href="mailto:ommd3076@gmail.com"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            ommd3076@gmail.com
          </a>
          <span className="text-neutral-600">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`px-6 py-20 md:px-12 md:py-28 ${className}`}>
      <div className="mx-auto max-w-[1120px]">{children}</div>
    </section>
  );
}
