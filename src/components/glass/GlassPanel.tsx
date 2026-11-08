import React from "react";

export function GlassPanel({
  children,
  className = "",
  header,
}: {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-neutral-800/80 bg-neutral-950 supports-[backdrop-filter]:bg-neutral-950/80 p-6 supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {header && <div className="mb-4 border-b border-neutral-800/60 pb-3">{header}</div>}

      {children}
    </div>
  );
}
