import React from "react";

export interface ResearchNoteProps {
  id: string;
  tag: string;
  timestamp: string;
  title: string;
  children: React.ReactNode;
  marginalia?: string;
  className?: string;
}

export function ResearchNoteCard({
  tag,
  timestamp,
  title,
  children,
  marginalia,
  className = "",
}: ResearchNoteProps) {
  return (
    <article
      className={`relative grid gap-4 border-l-2 border-neutral-700 bg-neutral-950/40 p-5 pl-6 md:grid-cols-[1fr_160px] md:gap-6 md:p-6 ${className}`}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
          <span className="uppercase tracking-wider text-neutral-300 font-medium">[{tag}]</span>
          <span>·</span>
          <time dateTime={timestamp}>{timestamp}</time>
        </div>

        <h3 className="font-serif text-lg font-normal text-white tracking-tight">{title}</h3>

        <div className="font-serif text-[13.5px] leading-[1.7] text-neutral-300 space-y-2">
          {children}
        </div>
      </div>

      {marginalia && (
        <aside className="border-t border-neutral-800/80 pt-3 md:border-t-0 md:border-l md:pl-4 font-mono text-[11px] leading-relaxed text-neutral-400">
          <span className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1 font-semibold">
            Margin Note
          </span>
          {marginalia}
        </aside>
      )}
    </article>
  );
}
