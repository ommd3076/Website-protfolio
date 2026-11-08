import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function ReadingProgress({ className = "" }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      if (typeof window === "undefined" || prefersReduced()) return;

      const bar = barRef.current;
      if (!bar) return;

      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
            const clamped = Math.min(100, Math.max(0, scrolled));

            gsap.to(bar, {
              scaleX: clamped / 100,
              duration: 0.1,
              ease: "none",
              overwrite: "auto",
            });
            setPercent(Math.round(clamped));
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        gsap.killTweensOf(bar);
      };
    },
    { scope: barRef },
  );

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed top-0 left-0 right-0 z-[100] h-[2px] bg-neutral-900/40 pointer-events-none ${className}`}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-neutral-500 via-neutral-300 to-white"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
