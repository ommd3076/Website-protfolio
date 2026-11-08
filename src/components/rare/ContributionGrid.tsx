import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export interface ActivityDay {
  date: string;
  count: number;
  label?: string;
}

export function ContributionGrid({
  data,
  title = "Research & Build Cadence",
  className = "",
}: {
  data: readonly ActivityDay[];
  title?: string;
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState<ActivityDay | null>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !gridRef.current) return;

      const cells = gridRef.current.querySelectorAll(".activity-cell");
      gsap.fromTo(
        cells,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.005, duration: 0.4, ease: "power2.out" },
      );
    },
    { scope: gridRef },
  );

  return (
    <div
      ref={gridRef}
      className={`rounded-xl border border-neutral-800 bg-neutral-950 p-5 font-mono text-xs max-w-full overflow-hidden ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 border-b border-neutral-800/80 pb-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
            Activity Log
          </span>
          <h4 className="font-serif text-base text-white font-normal mt-0.5">{title}</h4>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-sm bg-neutral-900 border border-neutral-800" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950/60 border border-emerald-900/40" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800/80" />
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[420px]">
          {data.map((d, i) => {
            const intensity =
              d.count === 0
                ? "bg-neutral-900/90 border border-neutral-800/60"
                : d.count === 1
                  ? "bg-emerald-950 border border-emerald-800/60"
                  : d.count === 2
                    ? "bg-emerald-800 border border-emerald-700"
                    : "bg-emerald-400";

            return (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setActiveDay(d)}
                onMouseLeave={() => setActiveDay(null)}
                aria-label={`${d.date}: ${d.count} verified commits/notes`}
                className={`activity-cell w-3 h-3 rounded-[2px] transition-transform hover:scale-125 focus:scale-125 outline-none ${intensity}`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-900">
        <div>
          {activeDay ? (
            <span className="text-neutral-200">
              {activeDay.date}: <strong>{activeDay.count}</strong> contributions{" "}
              {activeDay.label && `(${activeDay.label})`}
            </span>
          ) : (
            <span>Hover or focus cell to inspect log</span>
          )}
        </div>
        <div className="text-[9px] text-neutral-400">
          Pattern adapted from{" "}
          <a
            href="https://rareui.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Rare UI
          </a>
        </div>
      </div>
    </div>
  );
}
