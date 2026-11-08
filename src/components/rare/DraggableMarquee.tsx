import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function DraggableMarquee({
  items,
  speed = 40,
  className = "",
}: {
  items: readonly string[];
  speed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !trackRef.current) return;

      const track = trackRef.current;
      const width = track.scrollWidth / 2;

      const tween = gsap.to(track, {
        x: -width,
        duration: width / speed,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [speed] },
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative w-full border-y border-neutral-800/80 bg-neutral-950/60 py-3 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex gap-8 whitespace-nowrap will-change-transform font-mono text-xs text-neutral-400 select-none"
      >
        {items.concat(items).map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-white font-medium">{item}</span>
            <span className="text-neutral-700">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
