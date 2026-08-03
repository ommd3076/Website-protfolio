import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ensureGsap, prefersReduced } from "./motion";

export type RibbonItem = { label: string; caption: string; tone: string; image?: string };

/** Horizontal media ribbon: scrub-driven lateral drift with hover depth. */
export function MediaRibbon({ items }: { items: RibbonItem[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scope.current;
    const rail = track.current;
    if (!el || !rail || prefersReduced() || window.matchMedia("(max-width: 767px)").matches) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      const overflow = () => Math.max(0, rail.scrollWidth - window.innerWidth + 96);
      gsap.fromTo(
        rail,
        { x: 0 },
        {
          x: () => -overflow(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 10%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [items.length]);

  return (
    <div ref={scope} className="overflow-x-auto py-4 [scrollbar-width:none] md:overflow-hidden">
      <div ref={track} className="flex w-max snap-x snap-mandatory gap-4 pl-6 pr-16 md:pl-12">
        {items.map((it) => (
          <Link
            key={it.label}
            to="/work"
            data-ribbon-card
            data-cursor="media"
            data-cursor-label="SEE WORK"
            data-cursor-tone="dark"
            className="group relative h-[240px] w-[300px] shrink-0 snap-start overflow-hidden rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[340px] md:w-[440px]"
          >
            <div
              data-ribbon-inner
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              style={{ background: it.tone }}
            >
              {it.image && (
                <img src={it.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-5">
              <span className="text-[0.85rem] tracking-[-0.01em] text-white">{it.label}</span>
              <span className="text-[0.7rem] text-white/65">{it.caption}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
