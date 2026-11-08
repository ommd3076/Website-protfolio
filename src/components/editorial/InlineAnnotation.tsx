import React, { useState } from "react";

export function InlineAnnotation({
  term,
  definition,
  children,
}: {
  term: string;
  definition: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        aria-expanded={open}
        className="underline decoration-dotted decoration-neutral-500 underline-offset-4 text-neutral-200 hover:text-white transition-colors cursor-help"
        aria-label={`${term}: ${definition}`}
      >
        {children ?? term}
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-sans text-neutral-200 shadow-xl pointer-events-none"
        >
          <strong className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
            {term}
          </strong>
          {definition}
        </span>
      )}
    </span>
  );
}
