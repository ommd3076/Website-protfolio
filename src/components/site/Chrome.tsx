import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto flex max-w-[1560px] flex-col gap-6 rounded-lg border border-border bg-mineral px-6 py-9 text-[0.78rem] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <strong className="block font-medium text-foreground">Om M. Doddamani</strong>
          <span className="mt-1 block">Engineer · Researcher · Founder</span>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-xs font-mono">
          <Link
            to="/work"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            /work
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            /about
          </Link>
          <Link
            to="/approach"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            /approach
          </Link>
          <Link
            to="/future"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            /future
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            /contact
          </Link>
        </nav>

        <div className="flex gap-5">
          <a
            href="https://github.com/ommd3076"
            target="_blank"
            rel="noreferrer"
            className="text-foreground transition-colors duration-200 hover:text-accent-deep"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/om-m-doddamani/"
            target="_blank"
            rel="noreferrer"
            className="text-foreground transition-colors duration-200 hover:text-accent-deep"
          >
            LinkedIn ↗
          </a>
        </div>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-24 md:px-12 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1360px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow reveal mb-8">{children}</p>;
}
