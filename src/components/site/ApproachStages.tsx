"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReduced } from "./motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StageCardProps {
  number: string;
  title: string;
  description: string;
  detail: string;
}

const stages = [
  {
    number: "01",
    title: "Discovery & Framing",
    description: "We define the problem, the audience, and the single claim the work must land.",
    detail:
      "Before a pixel is placed, we map the decision landscape — who decides, what they believe, and what must shift. AI accelerates research synthesis; human judgment frames the argument.",
  },
  {
    number: "02",
    title: "Structure & Sequence",
    description:
      "Information architecture and narrative hierarchy that make complex businesses legible.",
    detail:
      "We build the skeleton first: content models, user flows, and the narrative thread that connects every page. Nothing becomes a page until it earns its place in the structure.",
  },
  {
    number: "03",
    title: "Surface System",
    description: "Type, space, motion, and interaction resolved as one coherent design system.",
    detail:
      "A single type scale, one motion language, and a restrained palette. Components are built to extend, not to impress. AI assists QA and token validation across breakpoints.",
  },
  {
    number: "04",
    title: "Launch Engineering",
    description: "The release is a system — staged, measured, and designed to compound after ship.",
    detail:
      "Launch week is not the finish line. We ship with observability built in, then run a structured observation period: real users, real signals, measured iteration.",
  },
  {
    number: "05",
    title: "Measured Evolution",
    description: "A short observation period is part of the engagement, not an upsell.",
    detail:
      "Two weeks post-launch we review: what shipped, what the data shows, what the team needs next. The loop closes, and the system evolves with intent.",
  },
];

export function ApproachStages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (prefersReduced()) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-stage-card]"));

      // Set initial state
      gsap.set(cards, { opacity: 0, y: 60 });

      // Create scroll-triggered animation for each card
      cards.forEach((card, index) => {
        const numberEl = card.querySelector("[data-stage-number]");
        const titleEl = card.querySelector("[data-stage-title]");
        const descEl = card.querySelector("[data-stage-description]");
        const detailEl = card.querySelector("[data-stage-detail]");
        const lineEl = card.querySelector("[data-stage-line]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.6,
            toggleActions: "play none none reverse",
          },
        });

        if (numberEl)
          tl.fromTo(
            numberEl,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            0,
          );
        if (titleEl)
          tl.fromTo(
            titleEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.1,
          );
        if (descEl)
          tl.fromTo(
            descEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.2,
          );
        if (detailEl)
          tl.fromTo(
            detailEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.3,
          );
        if (lineEl)
          tl.fromTo(
            lineEl,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1, ease: "power3.out" },
            0.15,
          );
      });

      // Connecting line animation
      const connectingLine = container.querySelector("[data-connecting-line]");
      if (connectingLine) {
        gsap.fromTo(
          connectingLine,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 0.8,
            },
          },
        );
      }

      return () => ctx.revert();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical connecting line */}
      <div
        data-connecting-line
        className="absolute left-[1.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent md:left-[2rem]"
        aria-hidden="true"
      />

      <div className="space-y-16 md:space-y-20" role="list">
        {stages.map((stage, index) => (
          <article
            key={stage.number}
            data-stage-card
            className="relative pl-8 md:pl-12"
            role="listitem"
          >
            {/* Number marker */}
            <div
              className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent-deep font-mono text-[0.75rem] font-medium md:h-12 md:w-12 md:text-[0.875rem]"
              data-stage-number
            >
              {stage.number}
            </div>

            {/* Content */}
            <div className="ml-2">
              <h3
                className="text-[1.25rem] leading-tight tracking-[-0.025em] md:text-[1.5rem]"
                data-stage-title
              >
                {stage.title}
              </h3>
              <p
                className="mt-3 text-base leading-relaxed text-muted-foreground"
                data-stage-description
              >
                {stage.description}
              </p>
              <p
                className="mt-5 max-w-[48ch] text-sm leading-relaxed text-muted-foreground/80"
                data-stage-detail
              >
                {stage.detail}
              </p>
            </div>

            {/* Horizontal connecting line to next stage */}
            {index < stages.length - 1 && (
              <div
                data-stage-line
                className="absolute left-[0.75rem] top-[1.5rem] h-px w-8 bg-gradient-to-r from-accent/30 to-transparent md:left-[1.25rem]"
                aria-hidden="true"
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

interface PrincipleCardProps {
  title: string;
  description: string;
}

const principles = [
  {
    title: "Two or three people",
    description:
      "The people who framed the work are the people who ship it. No handoffs, no dilution.",
  },
  {
    title: "Fixed windows",
    description:
      "Six to ten weeks, scoped to a decision rather than a backlog. Timeboxes force clarity.",
  },
  {
    title: "Systems, not pages",
    description:
      "Everything we ship is extendable by the team that inherits it. Components, tokens, and patterns — not static comps.",
  },
  {
    title: "Measured after",
    description:
      "A short observation period is part of the engagement, not an upsell. We close the loop.",
  },
];

export function ApproachPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-principle-card]"));

      gsap.set(cards, { opacity: 0, y: 40 });

      cards.forEach((card, index) => {
        const iconEl = card.querySelector("[data-principle-icon]");
        const titleEl = card.querySelector("[data-principle-title]");
        const descEl = card.querySelector("[data-principle-description]");

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (iconEl) {
          gsap.fromTo(
            iconEl,
            { opacity: 0, scale: 0.8, rotate: -10 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      return () => ctx.revert();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid gap-8 md:grid-cols-2" data-reveal-group>
      {principles.map((principle, index) => (
        <article
          key={principle.title}
          data-principle-card
          className="reveal rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_-24px_rgba(20,22,26,0.25)]"
        >
          <div className="flex items-center gap-3" data-principle-icon>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[1.125rem] leading-tight tracking-[-0.02em]" data-principle-title>
              {principle.title}
            </h3>
          </div>
          <p
            className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground"
            data-principle-description
          >
            {principle.description}
          </p>
        </article>
      ))}
    </div>
  );
}
