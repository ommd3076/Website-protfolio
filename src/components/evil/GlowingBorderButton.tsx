import React, { useRef } from "react";
import { prefersReduced } from "../site/motion";

export function GlowingBorderButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReduced() || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      className={`relative inline-flex items-center justify-center rounded-xl p-[1px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white group ${className}`}
    >
      <span
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.4), transparent 80%)",
        }}
      />
      <span className="relative flex items-center justify-center rounded-[11px] bg-neutral-950 px-5 py-2.5 font-mono text-xs text-neutral-300 border border-neutral-800 transition-colors group-hover:text-white group-hover:bg-neutral-900">
        {children}
      </span>
    </button>
  );
}
