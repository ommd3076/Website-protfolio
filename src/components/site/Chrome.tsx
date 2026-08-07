import logoAsset from "../../../Screenshot 2026-08-03 141135.svg";

export function Footer() {
  return (
    <footer className="mt-8 px-3 pb-3 md:px-5 md:pb-5">
      <div className="mx-auto flex max-w-[1560px] flex-col gap-4 rounded-lg border border-border bg-mineral px-6 py-9 text-[0.78rem] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-start gap-3">
          <img
            src={logoAsset}
            alt=""
            aria-hidden="true"
            width={24}
            height={19}
            className="mt-0.5 h-auto w-6"
          />
          <span>
            <strong className="block font-medium text-foreground">Cerenetics</strong>
            <span className="mt-1 block">AI-native company</span>
          </span>
        </div>
        <a
          href="mailto:studio@cerenetics.com"
          className="text-foreground transition-colors duration-200 hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          studio@cerenetics.com
        </a>
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
