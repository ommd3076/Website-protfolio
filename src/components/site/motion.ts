import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Apple-inspired spring configuration
export const SPRING_CONFIG = {
  // Critically damped (no overshoot) - default for UI
  default: { type: "spring", bounce: 0, duration: 0.4 },
  // Slight bounce for momentum interactions
  bounce: { type: "spring", bounce: 0.2, duration: 0.4 },
  // Snappy for quick interactions
  snappy: { type: "spring", bounce: 0, duration: 0.3 },
} as const;

// Apple-inspired easing (for non-spring transitions)
export const EASE = "power3.out";
export const EASE_CINEMA = "expo.out";

// Spring helpers for GSAP
export const spring = {
  // Critically damped spring (no overshoot) - Apple's default
  default: { ease: "power3.out", duration: 0.4 },
  critical: { ease: "power3.out", duration: 0.4 },
  // Slight bounce for momentum interactions
  bounce: { ease: "power3.out", duration: 0.4 },
  // Quick response for UI feedback
  snappy: { ease: "power2.out", duration: 0.25 },
} as const;

let registered = false;
let refreshFrame = 0;
export function ensureGsap() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function requestScrollRefresh() {
  if (typeof window === "undefined" || refreshFrame) return;
  refreshFrame = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    refreshFrame = 0;
  });
}

export function prefersReduced() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Stronger route-opening choreography, kept separate from ordinary section reveals. */
export function usePageIntro(scopeRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;
      const targets = Array.from(scope.querySelectorAll<HTMLElement>("[data-page-intro]"));
      if (!targets.length || prefersReduced()) return;
      ensureGsap();
      gsap.fromTo(
        targets,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.86,
          stagger: 0.09,
          ease: EASE_CINEMA,
          clearProps: "transform",
          delay: 0.08,
        },
      );
    },
    { scope: scopeRef, dependencies: [scopeRef] },
  );
}

/** Scroll-triggered section reveals, grouped and staggered. */
export function useReveal(scopeRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;
      document.documentElement.classList.add("motion-ready");
      if (prefersReduced()) {
        scope.querySelectorAll<HTMLElement>(".reveal, [data-reveal]").forEach((el) => {
          el.style.opacity = "1";
        });
        return;
      }
      ensureGsap();
      const groups = new Map<Element, HTMLElement[]>();
      scope.querySelectorAll<HTMLElement>(".reveal, [data-reveal]").forEach((el) => {
        const parent = el.closest("[data-reveal-group], section") ?? el.parentElement ?? scope;
        const list = groups.get(parent) ?? [];
        list.push(el);
        groups.set(parent, list);
      });
      groups.forEach((els, parent) => {
        gsap.fromTo(
          els,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: EASE,
            stagger: 0.06,
            clearProps: "transform",
            scrollTrigger: { trigger: parent, start: "top 88%", once: true },
          },
        );
      });

      // Reserve parallax for a page's single signature composition.
      scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset["parallax"] ?? 90);
        gsap.fromTo(
          el,
          { y: amount * -0.5 },
          {
            y: amount * 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: (el.closest("section, div[data-reveal-group]") ?? el) as HTMLElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
            },
          },
        );
      });

      // Layered depth is available for rare media compositions only.
      scope.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 6, scale: 0.985 },
          {
            yPercent: -6,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      // Thin lines / dividers draw themselves in.
      scope.querySelectorAll<HTMLElement>("[data-draw-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: EASE_CINEMA,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // Tiny markers fade in without bounce.
      scope.querySelectorAll<HTMLElement>("[data-marker]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.42,
            delay: i * 0.05,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });
    },
    { scope: scopeRef, dependencies: [scopeRef] },
  );
}

/** Splits an element's text into per-word spans wrapped in an overflow mask. */
function splitWords(el: HTMLElement) {
  if (el.dataset["split"] === "done") {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
  }
  const text = el.textContent ?? "";
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  // Store original text for cleanup
  el.dataset["originalText"] = text;
  el.textContent = "";
  const out: HTMLElement[] = [];
  words.forEach((w, i) => {
    const mask = document.createElement("span");
    mask.style.display = "inline-block";
    mask.style.overflow = "hidden";
    mask.style.verticalAlign = "top";
    mask.style.whiteSpace = "nowrap";
    const inner = document.createElement("span");
    inner.dataset["word"] = "true";
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = i < words.length - 1 ? `${w}\u00A0` : w;
    mask.appendChild(inner);
    el.appendChild(mask);
    out.push(inner);
  });
  el.dataset["split"] = "done";
  return out;
}

/** Cinematic first-paint sequence for the top of a page. */
export function useLoadSequence(scopeRef: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;
      document.documentElement.classList.add("motion-ready");
      const targets = scope.querySelectorAll<HTMLElement>("[data-load]");
      if (!targets.length) return;
      if (prefersReduced()) {
        targets.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        return;
      }
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (context) => {
        const desktop = Boolean(context.conditions?.["desktop"]);

        // 1. Eyebrow / label — restrained, letter-spacing settles inward.
        const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.08 });

        tl.fromTo(
          scope.querySelectorAll("[data-load='veil']"),
          { scaleY: 1 },
          { scaleY: 0, transformOrigin: "top", duration: 1.1 },
          0,
        ).fromTo(
          scope.querySelectorAll("[data-load='eyebrow']"),
          { opacity: 0, y: 10, letterSpacing: "0.3em" },
          { opacity: 1, y: 0, letterSpacing: "0.2em", duration: 0.62 },
          0.1,
        );

        // 2. Headline — line-by-line reveal using CSS masking (no DOM manipulation)
        const lines = Array.from(scope.querySelectorAll<HTMLElement>("[data-load='line']"));
        lines.forEach((line, lineIndex) => {
          // Wrap line content in a mask if not already done
          if (!line.dataset["wrapped"]) {
            const text = line.textContent ?? "";
            line.innerHTML = `<span class="line-mask"><span class="line-inner">${text}</span></span>`;
            line.dataset["wrapped"] = "true";
          }
          const inner = line.querySelector<HTMLElement>(".line-inner");
          if (inner) {
            tl.fromTo(
              inner,
              { yPercent: 106, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: desktop ? 0.78 : 0.68,
                ease: EASE,
              },
              0.2 + lineIndex * 0.1,
            );
          }
        });

        // 3. Supporting copy, then CTAs, then ambient accents.
        tl.fromTo(
          scope.querySelectorAll("[data-load='fade']"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, clearProps: "transform" },
          "-=0.3",
        )
          .fromTo(
            scope.querySelectorAll("[data-load='cta']"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, clearProps: "transform" },
            "-=0.32",
          )
          .fromTo(
            scope.querySelectorAll("[data-load='draw']"),
            { opacity: 0, scaleX: 0.72, yPercent: 8 },
            {
              opacity: 1,
              scaleX: 1,
              yPercent: 0,
              duration: 1.05,
              transformOrigin: "center",
            },
            0.35,
          )
          .fromTo(
            scope.querySelectorAll("[data-load='ambient']"),
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: EASE },
            "-=0.35",
          );

        return () => {
          tl.kill();
          // Restore original text content
          lines.forEach((line) => {
            const inner = line.querySelector(".line-inner");
            if (inner && line.dataset["originalText"]) {
              inner.textContent = line.dataset["originalText"];
              line.innerHTML = inner.textContent;
              delete line.dataset["wrapped"];
              delete line.dataset["originalText"];
            }
          });
        };
      });
      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [scopeRef] },
  );
}

/** Magnetic pull on primary CTAs using @gsap/react useGSAP and contextSafe. */
export function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.3) {
  const { contextSafe } = useGSAP({ scope: ref });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;
    if (prefersReduced()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE });

    const move = contextSafe((e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });

    const enter = contextSafe(() => {
      gsap.to(el, { scale: 1.03, duration: 0.4, ease: EASE });
    });

    const reset = contextSafe(() => {
      xTo(0);
      yTo(0);
      gsap.to(el, { scale: 1, duration: 0.5, ease: EASE });
    });

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      gsap.killTweensOf(el);
    };
  }, [ref, strength, contextSafe]);
}
