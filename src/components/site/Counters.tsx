import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap, prefersReduced, requestScrollRefresh } from "./motion";

export type Counter = { value: number; suffix?: string; label: string };

export function Counters({ items }: { items: Counter[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReduced();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node, i) => {
        const target = Number(node.dataset["count"]);
        if (reduced) {
          node.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        node.textContent = "0";
        gsap.to(obj, {
          v: target,
          duration: 1.9,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.v));
          },
        });
        gsap.from(node.parentElement, {
          yPercent: 30,
          opacity: 0,
          duration: 1,
          delay: i * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
        });
      });
      requestScrollRefresh();
    }, el);
    return () => ctx.revert();
  }, [items.length]);

  return (
    <div
      ref={scope}
      className="grid grid-cols-2 gap-x-8 gap-y-12 border-y border-border py-14 md:grid-cols-5 md:py-16"
    >
      {items.map((c) => (
        <div key={c.label} className="px-1">
          <div className="flex items-baseline text-[2.6rem] leading-none tracking-[-0.045em] md:text-[3.6rem]">
            <span data-count={c.value} className="tabular-nums">
              {c.value}
            </span>
            {c.suffix ? <span className="text-accent">{c.suffix}</span> : null}
          </div>
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
            {c.label}
          </p>
        </div>
      ))}
    </div>
  );
}
