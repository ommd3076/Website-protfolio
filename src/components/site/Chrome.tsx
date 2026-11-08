export function Footer() {
  return (
    <footer className="mt-16 px-4 pb-6 md:px-6 md:pb-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 rounded-xl border border-neutral-800/80 bg-neutral-950/80 px-6 py-8 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <strong className="block font-medium text-white">Om M. Doddamani</strong>
          <span className="mt-0.5 block text-neutral-500 font-mono text-[11px]">
            Engineer · Researcher · Founder (Cerenetics)
          </span>
        </div>

        <nav
          aria-label="Footer in-page navigation"
          className="flex flex-wrap gap-4 text-xs font-mono"
        >
          <a href="#top" className="text-neutral-400 transition-colors hover:text-white">
            #top
          </a>
          <a href="#work" className="text-neutral-400 transition-colors hover:text-white">
            #work
          </a>
          <a href="#about" className="text-neutral-400 transition-colors hover:text-white">
            #about
          </a>
          <a href="#contact" className="text-neutral-400 transition-colors hover:text-white">
            #contact
          </a>
        </nav>

        <div className="flex items-center gap-5 font-mono text-xs">
          <a
            href="https://github.com/ommd3076"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/om-m-doddamani/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-300 transition-colors hover:text-white"
          >
            LinkedIn ↗
          </a>
          <span className="text-neutral-600">© {new Date().getFullYear()}</span>
        </div>
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
