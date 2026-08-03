import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap, prefersReduced, requestScrollRefresh } from "./motion";

export type ServicePanel = {
  no: string;
  title: string;
  body: string;
  meta: string;
};

export function ServicesPanels({
  panels,
  eyebrow = "Capabilities",
}: {
  panels: ServicePanel[];
  eyebrow?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const locked = useRef(false);

  // Scroll drives the active panel unless the pointer takes over.
  useEffect(() => {
    const scope_ = scope.current;
    if (!scope_ || prefersReduced()) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-panel]");
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 68%",
          end: "bottom 45%",
          onEnter: () => !locked.current && setActive(i),
          onEnterBack: () => !locked.current && setActive(i),
        });
      });
    }, scope_);
    return () => ctx.revert();
  }, [panels.length]);

  // Animate panel state changes.
  useEffect(() => {
    const scope_ = scope.current;
    if (!scope_) return;
    const reduced = prefersReduced();
    const items = Array.from(scope_.querySelectorAll<HTMLElement>("[data-panel]"));
    items.forEach((el, i) => {
      const on = i === active;
      const body = el.querySelector("[data-panel-body]");
      gsap.to(el, {
        backgroundColor: on ? "var(--inverse)" : "rgba(255,255,255,0.55)",
        color: on ? "var(--inverse-foreground)" : "var(--foreground)",
        borderColor: on ? "var(--inverse-border)" : "var(--border)",
        duration: reduced ? 0 : 0.42,
        ease: "power3.out",
        overwrite: "auto",
      });
      if (body) {
        gsap.to(body, {
          height: on ? "auto" : 0,
          opacity: on ? 1 : 0,
          y: on ? 0 : 6,
          marginTop: on ? 18 : 0,
          duration: reduced ? 0 : 0.38,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: requestScrollRefresh,
        });
      }
    });
    return () => {
      items.forEach((el) => {
        gsap.killTweensOf([el, el.querySelector("[data-panel-body]")]);
      });
    };
  }, [active]);

  return (
    <div ref={scope} className="mx-auto max-w-[1360px] px-6 md:px-12">
      <p className="eyebrow mb-8">{eyebrow}</p>
      <div className="flex flex-col gap-2">
        {panels.map((p, i) => (
          <article
            key={p.no}
            data-panel
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") {
                locked.current = true;
                setActive(i);
              }
            }}
            onPointerLeave={() => {
              locked.current = false;
            }}
            className="w-full rounded-md border px-6 py-[26px] text-left md:px-10"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          >
            <h3>
              <button
                type="button"
                data-cursor="pointer"
                aria-expanded={active === i}
                aria-controls={`approach-panel-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex w-full items-baseline justify-between gap-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
              >
                <span className="text-[1.45rem] font-medium tracking-[-0.03em] md:text-[2.15rem]">
                  {p.title}
                </span>
                <span className="shrink-0 text-[0.72rem] tabular-nums opacity-45">{p.no}</span>
              </button>
            </h3>
            <div
              id={`approach-panel-${i}`}
              role="region"
              aria-hidden={active !== i}
              data-panel-body
              style={{
                height: active === i ? "auto" : 0,
                opacity: active === i ? 1 : 0,
                marginTop: active === i ? 18 : 0,
                overflow: "hidden",
              }}
            >
              <div className="grid gap-5 md:grid-cols-12">
                <p className="max-w-2xl text-[0.9rem] leading-[1.7] opacity-75 md:col-span-7">
                  {p.body}
                </p>
                <p className="text-[0.78rem] opacity-50 md:col-span-4 md:col-start-9 md:text-right">
                  {p.meta}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
