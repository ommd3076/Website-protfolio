import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReduced() || !containerRef.current || !indicatorRef.current) return;

      const activeBtn = containerRef.current.querySelector<HTMLButtonElement>(
        `[data-val="${value}"]`,
      );
      if (!activeBtn) return;

      const cRect = containerRef.current.getBoundingClientRect();
      const bRect = activeBtn.getBoundingClientRect();

      gsap.to(indicatorRef.current, {
        x: bRect.left - cRect.left,
        width: bRect.width,
        duration: 0.25,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [value] },
  );

  const handleSelect = contextSafe((val: T) => {
    onChange(val);
  });

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      className={`relative inline-flex items-center rounded-lg border border-neutral-800 bg-neutral-950 p-1 font-mono text-xs ${className}`}
    >
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 left-0 rounded-md bg-neutral-800/90 pointer-events-none"
        style={{ width: 0 }}
      />
      {options.map((opt) => {
        const isSelected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            data-val={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`relative z-10 px-3 py-1.5 transition-colors duration-150 rounded-md ${
              isSelected ? "text-white font-medium" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
