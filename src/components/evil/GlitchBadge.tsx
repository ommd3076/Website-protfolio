import React from "react";

export function GlitchBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border border-neutral-700 bg-neutral-900/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-300 transition-transform hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </span>
  );
}
