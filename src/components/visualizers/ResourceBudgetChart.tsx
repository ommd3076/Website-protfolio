import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export interface ResourceLevel {
  format: string;
  bitWidth: number;
  relativeSizePercent: number;
  theoreticalFootprint: string;
  notes: string;
}

export function ResourceBudgetChart({
  items = [],
  title = "Resource Footprint Comparator",
  className = "",
}: {
  items?: readonly ResourceLevel[];
  title?: string;
  className?: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !chartRef.current || items.length === 0) return;

      const bars = chartRef.current.querySelectorAll(".budget-bar");
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", transformOrigin: "left" },
      );
    },
    { scope: chartRef, dependencies: [items] },
  );

  if (items.length === 0) {
    return (
      <div
        className={`rounded-xl border border-neutral-800 bg-neutral-950 p-6 font-mono text-xs text-neutral-400 ${className}`}
      >
        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
          {title}
        </span>
        <p className="text-xs text-neutral-400 font-sans">
          No comparative architecture dataset loaded.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={chartRef}
      className={`rounded-xl border border-neutral-800 bg-neutral-950 p-6 font-mono text-xs ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-800/80 pb-4 mb-5">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Comparative Architecture Reference
          </span>
          <h4 className="font-serif text-base text-white font-normal mt-0.5">{title}</h4>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.format} className="space-y-1.5">
            <div className="flex items-center justify-between text-neutral-300">
              <span className="font-semibold text-white">{item.format}</span>
              <span className="text-[11px] text-neutral-400">
                {item.theoreticalFootprint} ({item.relativeSizePercent}%)
              </span>
            </div>

            <div className="h-3 w-full rounded bg-neutral-900 border border-neutral-800 overflow-hidden">
              <div
                className="budget-bar h-full rounded-sm bg-neutral-300 transition-all"
                style={{ width: `${item.relativeSizePercent}%` }}
              />
            </div>

            <p className="text-[11px] text-neutral-400 font-sans">{item.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
