import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { useMagnetic, prefersReduced } from "./motion";

/**
 * Primary / secondary CTA with magnetic pull, a fill sweep and
 * choreographed label + arrow motion. No scale-bounce.
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
  useMagnetic(ref, 0.34);

  useEffect(() => {
    const el = ref.current;
    const fillEl = fill.current;
    const labelEl = label.current;
    const arrowEl = arrow.current;
    if (!el || prefersReduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const enter = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const fromBottom = e.clientY > r.top + r.height / 2;
      gsap.fromTo(
        fillEl,
        { yPercent: fromBottom ? 100 : -100 },
        { yPercent: 0, duration: 0.55, ease: "power3.out", overwrite: "auto" },
      );
      gsap.to(labelEl, { x: -3, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      gsap.fromTo(
        arrowEl,
        { x: 0, opacity: 1 },
        { x: 5, duration: 0.55, ease: "power3.out", overwrite: "auto" },
      );
    };

    const leave = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const toBottom = e.clientY > r.top + r.height / 2;
      gsap.to(fillEl, {
        yPercent: toBottom ? 100 : -100,
        duration: 0.45,
        ease: "power3.in",
        overwrite: "auto",
      });
      gsap.to([labelEl, arrowEl], {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([fillEl, labelEl, arrowEl]);
    };
  }, []);

  const solid = variant === "solid";

  return (
    <Link
      ref={ref}
      to={to}
      data-magnetic
      data-cursor="cta"
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[0.82rem] tracking-[-0.005em] ${
        solid
          ? "bg-foreground text-background"
          : "border border-border text-foreground transition-colors duration-300 hover:border-foreground/45"
      }`}
    >
      <span
        ref={fill}
        aria-hidden
        className={`absolute inset-0 ${solid ? "bg-accent-deep" : "bg-foreground/[0.055]"}`}
        style={{ transform: "translateY(100%)" }}
      />
      <span ref={label} className="relative inline-block">
        {children}
      </span>
      <span ref={arrow} aria-hidden className="relative inline-block text-[0.7rem]">
        →
      </span>
    </Link>
  );
}
