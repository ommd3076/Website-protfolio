import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function HoverCardPreview({
  label,
  title,
  description,
  tag,
  children,
  className = "",
}: {
  label: string;
  title: string;
  description: string;
  tag?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!open || prefersReduced() || !cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" },
      );
    },
    { scope: cardRef, dependencies: [open] },
  );

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        className="cursor-pointer underline decoration-neutral-700 underline-offset-4 hover:decoration-white hover:text-white transition-colors"
      >
        {children}
      </span>

      {open && (
        <div
          ref={cardRef}
          role="region"
          aria-label={label}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-72 rounded-xl border border-neutral-700 bg-neutral-900/95 p-4 text-xs font-sans text-neutral-200 shadow-2xl backdrop-blur-md pointer-events-none"
        >
          {tag && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">
              {tag}
            </span>
          )}
          <h4 className="font-serif text-sm font-medium text-white">{title}</h4>
          <p className="mt-1 text-[11.5px] leading-relaxed text-neutral-300">{description}</p>
        </div>
      )}
    </span>
  );
}
