import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function FlipText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !containerRef.current) return;

      const chars = containerRef.current.querySelectorAll(".flip-char");
      gsap.fromTo(
        chars,
        { rotateX: -90, opacity: 0 },
        { rotateX: 0, opacity: 1, duration: 0.45, stagger: 0.02, ease: "power2.out" },
      );
    },
    { scope: containerRef, dependencies: [text] },
  );

  return (
    <span ref={containerRef} className={`inline-flex font-mono perspective-500 ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {text.split("").map((ch, i) => (
          <span key={i} className="flip-char inline-block will-change-transform origin-bottom">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
