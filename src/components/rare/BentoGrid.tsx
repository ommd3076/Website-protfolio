import React from "react";

export function BentoGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>{children}</div>;
}

export function BentoCard({
  tag,
  title,
  subtitle,
  children,
  colSpan = 1,
  className = "",
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  className?: string;
}) {
  const spanClass =
    colSpan === 2 ? "sm:col-span-2" : colSpan === 3 ? "sm:col-span-2 lg:col-span-3" : "col-span-1";

  return (
    <article
      className={`rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 md:p-7 flex flex-col justify-between transition-colors hover:border-neutral-700 ${spanClass} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3 mb-4">
          {tag && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
              {tag}
            </span>
          )}
          {subtitle && <span className="font-mono text-[11px] text-neutral-400">{subtitle}</span>}
        </div>

        <h3 className="font-serif text-lg md:text-xl font-normal text-white tracking-tight">
          {title}
        </h3>

        <div className="mt-3 font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
          {children}
        </div>
      </div>
    </article>
  );
}
