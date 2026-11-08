"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReduced } from "./motion";
import { CereneticsLogo, type CareneticsLogoRef } from "../brand/CareneticsLogo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OpeningExperience({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<CareneticsLogoRef>(null);
  const lightRayRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setIsComplete(true);
      onComplete();
      return;
    }

    const container = containerRef.current;
    const particles = particlesRef.current;
    const blob = blobRef.current;
    const logoEl = logoRef.current?.svgElement;
    const lightRay = lightRayRef.current;
    const mask = maskRef.current;

    if (!container || !particles || !blob || !logoEl || !lightRay || !mask) {
      onComplete();
      return;
    }

    let interruptedByUser = false;
    let completed = false;

    const handleInterrupt = () => {
      interruptedByUser = true;
      setInterrupted(true);
    };

    window.addEventListener("pointerdown", handleInterrupt, { once: true });
    window.addEventListener("wheel", handleInterrupt, { once: true, passive: true });
    window.addEventListener("keydown", handleInterrupt, { once: true });

    const tl = gsap.timeline({
      onComplete: () => {
        completed = true;
        setIsComplete(true);
        onComplete();
      },
    });

    // 1. Dark opening screen - already black by default
    tl.set(container, { backgroundColor: "#141414" });

    // 2. Subtle ambient particles
    tl.fromTo(particles, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0);

    // 3. Restrained animated gradient blob
    tl.fromTo(
      blob,
      { opacity: 0, scale: 0.5, rotation: -15 },
      { opacity: 0.6, scale: 1, rotation: 0, duration: 2.2, ease: "power3.out" },
      0.3,
    );

    // 4. Logo reveal from blur/haze
    tl.fromTo(
      logoEl,
      { opacity: 0, filter: "blur(12px)", scale: 0.92, y: 20 },
      { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, duration: 1.6, ease: "expo.out" },
      0.8,
    );

    // 5. Subtle light-ray / glow sweep
    tl.fromTo(
      lightRay,
      { opacity: 0, xPercent: -150, rotation: 15 },
      { opacity: 0.4, xPercent: 150, rotation: 15, duration: 2.8, ease: "power2.out" },
      1.2,
    );

    // 6. Gentle depth/parallax on particles
    tl.to(particles, { yPercent: -15, duration: 3, ease: "none" }, 1);

    // 7. Mask reveal into hero (transition to content) - starts earlier, overlaps with logo end
    tl.to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, 2.0);

    // 8. Fade out the opening screen
    tl.to(container, { opacity: 0, duration: 0.5, ease: "power2.in" }, 3.0);

    // Failsafe: force reveal after 7 seconds regardless
    const failsafe = setTimeout(() => {
      if (!completed && !interruptedByUser) {
        completed = true;
        setIsComplete(true);
        tl.kill();
        onComplete();
      }
    }, 7000);

    return () => {
      window.removeEventListener("pointerdown", handleInterrupt);
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("keydown", handleInterrupt);
      clearTimeout(failsafe);
      tl.kill();

      if (!completed && !interruptedByUser) {
        onComplete();
      }
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#141414" }}
      aria-hidden="true"
    >
      {/* Ambient particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 1px, transparent 1px),
            radial-gradient(circle at 90% 20%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 10% 60%, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "200px 200px, 300px 300px, 250px 250px, 180px 180px, 220px 220px",
          opacity: 0,
        }}
      />

      {/* Animated gradient blob */}
      <div
        ref={blobRef}
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `
            radial-gradient(ellipse at 30% 30%, oklch(0.58 0.08 25 / 0.35) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 70%, oklch(0.62 0.1 30 / 0.25) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, oklch(0.55 0.06 20 / 0.2) 0%, transparent 70%)
          `,
          filter: "blur(80px)",
          transformOrigin: "center",
          opacity: 0,
        }}
      />

      {/* Logo reveal */}
      <div className="relative z-10 flex flex-col items-center gap-6" style={{ filter: "none" }}>
        <CereneticsLogo
          ref={logoRef}
          mode="reveal"
          size={160}
          color="oklch(0.985 0.002 85)"
          accentColor="oklch(0.58 0.08 25)"
          autoPlay={false}
        />
      </div>

      {/* Light ray / glow sweep */}
      <div
        ref={lightRayRef}
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "800px",
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              oklch(0.985 0.002 85 / 0.08) 50%,
              transparent 100%
            )
          `,
          filter: "blur(60px)",
          transformOrigin: "center",
          opacity: 0,
        }}
      />

      {/* Mask reveal - covers everything then reveals */}
      <div
        ref={maskRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "#141414",
          clipPath: "inset(0% 0% 100% 0%)",
          zIndex: 50,
        }}
      />
    </div>
  );
}
