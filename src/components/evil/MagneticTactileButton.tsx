import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function MagneticTactileButton({
  children,
  onClick,
  className = "",
  strength = 0.25,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: btnRef });

  const onPointerMove = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReduced() || !btnRef.current) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;
    const r = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;

    gsap.to(btnRef.current, { x, y, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  });

  const onPointerLeave = contextSafe(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const onPointerDown = contextSafe(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { scale: 0.96, duration: 0.15, ease: "power2.out", overwrite: "auto" });
  });

  const onPointerUp = contextSafe(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
  });

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={`inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 font-mono text-xs font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white select-none ${className}`}
    >
      {children}
    </button>
  );
}
