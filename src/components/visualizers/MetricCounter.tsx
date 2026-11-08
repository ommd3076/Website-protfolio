import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function MetricCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.2,
  className = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(prefersReduced() ? target : 0);

  useGSAP(
    () => {
      if (prefersReduced()) {
        setValue(target);
        return;
      }

      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setValue(decimals === 0 ? Math.round(obj.val) : Number(obj.val.toFixed(decimals)));
        },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [target, duration, decimals] },
  );

  return (
    <span
      ref={containerRef}
      className={`tabular-nums font-mono ${className}`}
      aria-label={`${prefix}${target}${suffix}`}
    >
      {prefix}
      {decimals === 0 ? value : value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
