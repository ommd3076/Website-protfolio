import { useState } from "react";

export function TerminalBlock({
  command,
  output,
  cwd = "~/research",
  className = "",
}: {
  command: string;
  output?: string;
  cwd?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs max-w-full overflow-hidden break-words ${className}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/60 px-4 py-2 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="ml-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
            bash — {cwd}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="text-[10px] text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
        >
          {copied ? "Copied ✓" : "Copy command"}
        </button>
      </div>

      <div className="p-4 space-y-2 text-[11.5px] leading-relaxed">
        <div className="flex items-baseline gap-2 text-neutral-300">
          <span className="text-emerald-400 select-none">om@vvce:{cwd}$</span>
          <span className="text-white font-medium">{command}</span>
        </div>

        {output && (
          <div className="text-neutral-400 pl-4 border-l border-neutral-800 whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
