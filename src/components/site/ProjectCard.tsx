"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReduced } from "./motion";

interface ProjectCardProps {
  title: string;
  index: string;
  year: string;
  sector: string;
  images: string[];
  outcome?: string | undefined;
  discipline: string;
  href: string;
}

export function ProjectCard({
  title,
  index,
  year,
  sector,
  images,
  outcome,
  discipline,
  href,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slideshow
  useEffect(() => {
    if (prefersReduced() || images.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // Slide transition animation
  useEffect(() => {
    if (prefersReduced()) return;
    const card = cardRef.current;
    if (!card) return;

    const img = card.querySelector(`[data-slide="${currentSlide}"]`) as HTMLElement;
    if (!img) return;

    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
    );
  }, [currentSlide]);

  // Hover animation
  useEffect(() => {
    if (prefersReduced()) return;
    const card = cardRef.current;
    if (!card) return;

    const handleEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 24px 64px -24px rgba(20,22,26,0.35)",
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 24px -12px rgba(20,22,26,0.25)",
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/30"
      style={{
        boxShadow: "0 4px 24px -12px rgba(20,22,26,0.25)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="pointer"
    >
      <a href={href} className="absolute inset-0 z-10" aria-label={`View ${title} project`} />

      {/* Image carousel */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: "var(--muted)" }}
      >
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`${title} - view ${i + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              filter: i === currentSlide ? "none" : "brightness(0.95)",
            }}
            data-slide={i}
          />
        ))}

        {/* Slide indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === currentSlide
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Index badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-foreground/90 px-3 py-1 text-[0.7rem] font-medium tracking-[0.08em] text-background backdrop-blur-sm">
            {index}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-baseline gap-3 text-[0.75rem] mb-4">
          <span className="text-accent font-medium">{year}</span>
          <span className="text-muted-foreground">{sector}</span>
        </div>
        <h3 className="text-[1.375rem] leading-[1.15] tracking-[-0.025em] md:text-[1.625rem]">
          {title}
        </h3>
        {outcome && (
          <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">
            {outcome}
          </p>
        )}
        <p className="mt-5 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
          {discipline}
        </p>
      </div>
    </article>
  );
}
