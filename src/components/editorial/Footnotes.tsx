export interface Footnote {
  index: number;
  text: string;
  source?: string;
  url?: string;
}

export function FootnoteItem({ footnote }: { footnote: Footnote }) {
  return (
    <li id={`fn-${footnote.index}`} className="flex items-start gap-2 text-neutral-400">
      <span className="font-mono text-neutral-300 font-semibold select-none">
        [{footnote.index}]
      </span>
      <div className="flex-1">
        <span>{footnote.text} </span>
        {footnote.source && <span className="italic text-neutral-400">({footnote.source})</span>}
        {footnote.url && (
          <a
            href={footnote.url}
            target="_blank"
            rel="noreferrer"
            className="ml-1.5 text-neutral-400 underline underline-offset-2 hover:text-white transition-colors"
          >
            source ↗
          </a>
        )}
      </div>
    </li>
  );
}

export function FootnoteGroup({
  footnotes,
  className = "",
}: {
  footnotes: readonly Footnote[];
  className?: string;
}) {
  if (footnotes.length === 0) return null;

  return (
    <section
      aria-label="Footnotes and historical references"
      className={`mt-12 border-t border-neutral-800/80 pt-6 font-mono text-[11px] leading-relaxed ${className}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-3 font-semibold">
        References & Notes
      </p>
      <ol className="space-y-2">
        {footnotes.map((fn) => (
          <FootnoteItem key={fn.index} footnote={fn} />
        ))}
      </ol>
    </section>
  );
}
