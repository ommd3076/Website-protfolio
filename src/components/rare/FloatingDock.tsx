import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export interface DockItem {
  to: string;
  label: string;
  iconText: string;
}

export function FloatingDock({
  items,
  className = "",
}: {
  items: readonly DockItem[];
  className?: string;
}) {
  const dockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !dockRef.current) return;
      if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

      const dock = dockRef.current;
      const icons = dock.querySelectorAll<HTMLElement>(".dock-item");

      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;

        icons.forEach((icon) => {
          const rect = icon.getBoundingClientRect();
          const iconCenter = rect.left + rect.width / 2;
          const dist = Math.abs(mouseX - iconCenter);
          const maxDist = 120;

          if (dist < maxDist) {
            const scale = 1 + (1 - dist / maxDist) * 0.25;
            gsap.to(icon, { scale, duration: 0.2, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
          }
        });
      };

      const handleMouseLeave = () => {
        icons.forEach((icon) => {
          gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        });
      };

      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", handleMouseLeave);
        icons.forEach((icon) => gsap.killTweensOf(icon));
      };
    },
    { scope: dockRef },
  );

  return (
    <nav
      ref={dockRef}
      aria-label="Quick dock navigation"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-4 py-2 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          title={item.label}
          className="dock-item relative grid h-10 w-10 place-items-center rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
        >
          <span className="font-mono text-xs font-semibold">{item.iconText}</span>
          <span className="sr-only">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
