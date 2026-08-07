import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { Counters } from "../components/site/Counters";
import { ProjectCard } from "../components/site/ProjectCard";
import {
  ensureGsap,
  prefersReduced,
  requestScrollRefresh,
  useReveal,
} from "../components/site/motion";
import { concepts } from "../data/concepts";

const title = "Work — Cerenetics";
const description =
  "Proof from Cerenetics: AI-native digital systems and launch infrastructure across healthcare, finance, consumer design and deeptech.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WorkPage,
});

const counters = [
  { value: 34, label: "Projects" },
  { value: 21, label: "Live systems" },
  { value: 12, label: "AI workflows" },
  { value: 6, label: "Sectors" },
  { value: 9, label: "Systems shipped" },
];

function useShowcase(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReduced()) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((row) => {
        const frame = row.querySelector("[data-project-frame]");
        const img = row.querySelector("[data-project-img]");
        const copy = row.querySelectorAll("[data-project-copy] > *");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%", once: true },
        });
        if (frame) {
          tl.fromTo(
            frame,
            { clipPath: "inset(0% 0% 100% 0%)", y: 60 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.25, ease: "expo.out" },
          );
        }
        if (img) {
          tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        }
        tl.fromTo(
          copy,
          { yPercent: 55, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" },
          0.18,
        );
      });
      requestScrollRefresh();
    }, el);
    return () => ctx.revert();
  }, [scope]);
}

function WorkPage() {
  const scope = useRef<HTMLDivElement>(null);
  const showcase = useRef<HTMLDivElement>(null);
  useReveal(scope);
  useShowcase(showcase);

  return (
    <div ref={scope}>
      <section className="relative overflow-hidden border-b border-border px-6 pb-20 pt-28 md:px-12 md:pb-24 md:pt-36">
        <div className="relative mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Work</p>
          <h1 className="reveal mt-8 max-w-[16ch] text-[2.8rem] leading-[0.98] tracking-[-0.04em] md:text-[5rem]">
            Evidence, not adjectives.
          </h1>
          <p className="reveal mt-9 max-w-[46ch] text-[0.95rem] leading-[1.7] text-muted-foreground">
            Systems that shipped, launches that landed, and the delivery model behind them.
          </p>
        </div>
      </section>

      {/* Statistics - AI Dashboard Style */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Metrics</p>
          <h2 className="reveal mt-5 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]">
            Delivery measured in outcomes
          </h2>
          <div className="reveal mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_-24px_rgba(20,22,26,0.25)]">
              <div className="flex items-baseline gap-2">
                <span className="stat-value text-[3.5rem] md:text-[4.5rem]">34</span>
                <span className="text-accent font-medium">+</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Projects delivered
              </p>
              <div className="mt-6 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[85%] rounded-full bg-accent/60 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </div>
            </article>
            <article className="rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_-24px_rgba(20,22,26,0.25)]">
              <div className="flex items-baseline gap-2">
                <span className="stat-value text-[3.5rem] md:text-[4.5rem]">21</span>
                <span className="text-accent font-medium">+</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">Live systems</p>
              <div className="mt-6 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[75%] rounded-full bg-accent/60 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </div>
            </article>
            <article className="rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_-24px_rgba(20,22,26,0.25)]">
              <div className="flex items-baseline gap-2">
                <span className="stat-value text-[3.5rem] md:text-[4.5rem]">12</span>
                <span className="text-accent font-medium">+</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">AI workflows</p>
              <div className="mt-6 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[90%] rounded-full bg-accent/60 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </div>
            </article>
            <article className="rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_-24px_rgba(20,22,26,0.25)]">
              <div className="flex items-baseline gap-2">
                <span className="stat-value text-[3.5rem] md:text-[4.5rem]">94%</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Client retention
              </p>
              <div className="mt-6 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[94%] rounded-full bg-accent/60 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <Section className="py-20 md:py-28">
        <p
          className="reveal max-w-[38ch] text-[1.4rem] leading-[1.4] tracking-[-0.03em] md:text-[2.1rem]"
          data-reveal-group
        >
          Each of these was built with AI inside the process — research, structure, content
          sequencing — and none of them announce it on the page.
        </p>
      </Section>

      {/* Project showcase - Bento Grid */}
      <Section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Selected Work</p>
          <h2 className="reveal mt-5 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]">
            Systems that shipped
          </h2>
          <div className="reveal mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {concepts
              .filter((concept) => concept.shot)
              .map((c) => (
                <ProjectCard
                  key={c.index}
                  title={c.title}
                  index={c.index}
                  year={c.year}
                  sector={c.sector}
                  images={[c.shot!]}
                  outcome={c.outcome}
                  discipline={c.discipline}
                  href={`/work/${c.index.toLowerCase()}`}
                />
              ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-mineral">
        <div className="grid gap-8 md:grid-cols-12 md:items-end" data-reveal-group>
          <h2 className="reveal text-[1.9rem] leading-[1.15] tracking-[-0.03em] md:col-span-7 md:text-[2.9rem]">
            The next system could be yours.
          </h2>
          <div className="reveal md:col-span-4 md:col-start-9">
            <MagneticLink to="/contact">Start a conversation</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
