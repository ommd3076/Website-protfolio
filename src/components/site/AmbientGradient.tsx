"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "./motion";

type Tone = "cool" | "bright";

const TONES: Record<Tone, string[]> = {
  cool: [
    "oklch(0.80 0.090 248)",
    "oklch(0.86 0.070 225)",
    "oklch(0.84 0.060 268)",
    "oklch(0.90 0.045 205)",
  ],
  bright: ["oklch(0.80 0.15 220)", "oklch(0.86 0.13 165)", "oklch(0.80 0.14 285)"],
};

const PATHS = [
  { x: 12, y: 8, duration: 22 },
  { x: -10, y: 7, duration: 27 },
  { x: 8, y: -9, duration: 31 },
];

/**
 * A restrained ambient field for the Future page's single radiant moment.
 * Uses CSS @keyframes for animation instead of GSAP.
 */
export function AmbientGradient({
  tone = "cool",
  className = "",
  intensity = 1,
}: {
  tone?: Tone;
  className?: string;
  intensity?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
  }, []);

  const colors = TONES[tone].slice(0, 3);

  return (
    <div
      ref={scope}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <style jsx>{`
        @keyframes ambient-drift-1 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(12%, 8%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes ambient-drift-2 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10%, 7%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes ambient-drift-3 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(8%, -9%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
      {colors.map((c, i) => (
        <span
          key={c}
          data-blob
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${c} 0%, transparent 68%)`,
            width: `${52 + i * 9}%`,
            height: `${58 + i * 7}%`,
            left: `${[-8, 42, 18, 62][i]}%`,
            top: `${[-14, -22, 34, 20][i]}%`,
            opacity: (0.9 - i * 0.09) * intensity,
            filter: "blur(56px)",
            willChange: "transform",
            animation: `ambient-drift-${i + 1} ${PATHS[i].duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
