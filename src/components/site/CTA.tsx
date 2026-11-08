import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMagnetic, prefersReduced } from "./motion";
import { spring } from "./motion";

/**
 * Premium CTA with magnetic pull, refined hover/press states, and iOS-level polish.
 * Uses Apple-inspired spring animations for fluid, interruptible interactions.
 */
export function MagneticLink({
  to,
  children,
  variant = "solid",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);
  useMagnetic(ref, 0.28);

  const { contextSafe } = useGSAP({ scope: ref });

  useEffect(() => {
    const el = ref.current;
    const fillEl = fill.current;
    const labelEl = label.current;
    const arrowEl = arrow.current;
    if (!el || prefersReduced()) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const enter = contextSafe((e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        gsap.to(labelEl, { y: -3, ...spring.snappy });
        gsap.to(arrowEl, { x: 4, ...spring.snappy });
        gsap.to(fillEl, { scaleY: 1, ...spring.snappy });
      }
    });

    const leave = contextSafe((e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        gsap.to(labelEl, { y: 0, ...spring.default });
        gsap.to(arrowEl, { x: 0, ...spring.default });
        gsap.to(fillEl, { scaleY: 0, ...spring.default });
      }
    });

    const press = contextSafe(() => {
      gsap.to(el, { scale: 0.97, ...spring.snappy });
    });

    const release = contextSafe(() => {
      gsap.to(el, { scale: 1, ...spring.bounce });
    });

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", press);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointercancel", release);

    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerdown", press);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointercancel", release);
      gsap.killTweensOf(el);
    };
  }, [contextSafe]);

  const solid = variant === "solid";

  return (
    <Link
      ref={ref}
      to={to}
      data-magnetic
      data-cursor="cta"
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.85rem] tracking-[-0.01em] font-medium ${
        solid
          ? "bg-foreground text-background"
          : "border border-current/20 text-foreground bg-background/50 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/50 hover:bg-accent-soft hover:text-accent-deep"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2`}
    >
      <span
        ref={fill}
        aria-hidden
        className={`absolute inset-0 ${solid ? "bg-accent-deep" : "bg-foreground/[0.055]"} transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        style={{ transform: "translateY(100%)" }}
      />
      <span
        ref={label}
        className="relative inline-block transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {children}
      </span>
      <span
        ref={arrow}
        aria-hidden
        className="relative inline-block text-[0.7rem] transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        →
      </span>
      {/* Subtle shine sweep on hover */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
        aria-hidden="true"
      />
    </Link>
  );
}
