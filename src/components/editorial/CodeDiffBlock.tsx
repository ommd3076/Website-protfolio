import { useState } from "react";

export interface DiffLine {
  type: "add" | "remove" | "unchanged";
  code: string;
}

export function CodeDiffBlock({
  title,
  subtitle,
  lines,
  className = "",
}: {
  title: string;
  subtitle?: string;
  lines: readonly DiffLine[];
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    const raw = lines
      .map((l) => (l.type === "add" ? "+ " : l.type === "remove" ? "- " : "  ") + l.code)
      .join("\n");
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/40 px-4 py-2.5">
        <div>
          <span className="font-semibold text-neutral-300">{title}</span>
          {subtitle && <span className="ml-2 text-[11px] text-neutral-400">({subtitle})</span>}
        </div>
        <button
          type="button"
          onClick={copyText}
          className="text-[10px] text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
        >
          {copied ? "Copied ✓" : "Copy diff"}
        </button>
      </div>

      <div className="overflow-x-auto p-4 leading-relaxed font-mono text-[11.5px]">
        {lines.map((l, i) => {
          const prefix = l.type === "add" ? "+" : l.type === "remove" ? "-" : " ";
          const colorClass =
            l.type === "add"
              ? "bg-emerald-950/30 text-emerald-300"
              : l.type === "remove"
                ? "bg-rose-950/30 text-rose-300 line-through opacity-70"
                : "text-neutral-400";

          return (
            <div key={i} className={`flex px-2 py-0.5 rounded ${colorClass}`}>
              <span className="w-4 select-none opacity-50">{prefix}</span>
              <span className="flex-1">{l.code}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
