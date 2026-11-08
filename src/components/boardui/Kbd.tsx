import React from "react";

export function Kbd({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={`inline-flex items-center justify-center rounded border border-neutral-700 bg-neutral-900/90 px-1.5 py-0.5 font-mono text-[10px] font-medium text-neutral-300 shadow-[0_1px_0_1px_rgba(0,0,0,0.6)] select-none ${className}`}
    >
      {children}
    </kbd>
  );
}
