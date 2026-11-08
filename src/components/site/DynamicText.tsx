"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReduced } from "./motion";

const WORDS = [
  "digital systems",
  "launch infrastructure",
  "AI workflows",
  "product clarity",
  "deeptech interfaces",
  "health platforms",
];

export function DynamicText({
  staticPrefix = "",
  staticSuffix = "",
  duration = 0.4,
  interval = 2500,
}: {
  staticPrefix?: string;
  staticSuffix?: string;
  duration?: number;
  interval?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayWord, setDisplayWord] = useState(WORDS[0]);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced()) return;

    const animate = async () => {
      if (isAnimating) return;
      setIsAnimating(true);

      const nextIndex = (currentIndex + 1) % WORDS.length;
      const nextWord = WORDS[nextIndex];

      const el = ref.current;
      if (!el) return;

      // Animate out current word - use spring for interruptible animation
      await new Promise<void>((resolve) => {
        gsap.to(el, {
          y: -30,
          opacity: 0,
          filter: "blur(8px)",
          duration,
          ease: "power3.in",
          onComplete: resolve,
        });
      });

      // Swap word
      setDisplayWord(nextWord);
      setCurrentIndex(nextIndex);

      // Animate in new word - use spring for natural feel
      gsap.set(el, { y: 30, opacity: 0, filter: "blur(8px)" });
      await new Promise<void>((resolve) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          ease: "power3.out",
          onComplete: resolve,
        });
      });

      setIsAnimating(false);
    };

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, duration, interval, isAnimating]);

  return (
    <span className="inline-block relative">
      {staticPrefix && <span className="text-foreground">{staticPrefix}</span>}
      <span
        ref={ref}
        className="inline-block overflow-hidden relative"
        style={{ minWidth: "18ch" }}
        aria-live="polite"
      >
        <span className="block select-none">{displayWord}</span>
      </span>
      {staticSuffix && <span className="text-foreground">{staticSuffix}</span>}
    </span>
  );
}
