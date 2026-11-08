import { useState } from "react";

export interface CitationProps {
  id: string;
  authors: string;
  title: string;
  venue: string;
  year: number;
  doi?: string;
  bibtex?: string;
}

export function CitationCallout({
  citation,
  className = "",
}: {
  citation: CitationProps;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyBibtex = () => {
    if (!citation.bibtex) return;
    navigator.clipboard.writeText(citation.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={citation.id}
      className={`rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 font-mono text-xs max-w-full overflow-hidden break-words ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
          Citation · {citation.venue} ({citation.year})
        </span>
        {citation.bibtex && (
          <button
            type="button"
            onClick={copyBibtex}
            className="text-[10px] text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
          >
            {copied ? "Copied BibTeX ✓" : "Copy BibTeX"}
          </button>
        )}
      </div>

      <div className="mt-2.5 font-serif text-[13px] text-neutral-200 leading-snug">
        <span className="font-sans font-medium text-white">{citation.authors}</span>.{" "}
        <span className="italic">"{citation.title}."</span> {citation.venue}, {citation.year}.
      </div>

      {citation.doi && (
        <div className="mt-2 text-[11px] text-neutral-400">
          <span>DOI: </span>
          <a
            href={`https://doi.org/${citation.doi}`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-neutral-200 transition-colors"
          >
            {citation.doi} ↗
          </a>
        </div>
      )}
    </div>
  );
}
