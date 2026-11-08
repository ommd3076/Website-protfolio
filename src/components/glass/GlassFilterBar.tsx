import React from "react";

export function GlassFilterBar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`sticky top-20 z-30 mx-auto flex max-w-fit items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-4 py-2 shadow-xl backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
