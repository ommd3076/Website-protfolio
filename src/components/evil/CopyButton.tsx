import { useState } from "react";

export function CopyButton({
  textToCopy,
  label = "Copy",
  copiedLabel = "Copied ✓",
  className = "",
}: {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${textToCopy}`}
      className={`inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 font-mono text-[11px] text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white select-none ${className}`}
    >
      <span className="text-[10px] opacity-70">📋</span>
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
