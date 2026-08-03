import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { Counters } from "../components/site/Counters";
import {
  ensureGsap,
  prefersReduced,
  requestScrollRefresh,
  useReveal,
} from "../components/site/motion";
import { concepts } from "../data/concepts";

const title = "Work — Carenetics";
const description =
  "Proof from Carenetics: launched websites, digital systems and AI-assisted delivery across healthcare, finance, consumer design and deeptech.";

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

      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-[1360px]">
          <Counters items={counters} />
        </div>
      </div>

      <Section className="py-20 md:py-28">
        <p
          className="reveal max-w-[38ch] text-[1.4rem] leading-[1.4] tracking-[-0.03em] md:text-[2.1rem]"
          data-reveal-group
        >
          Each of these was built with AI inside the process — research, structure, content
          sequencing — and none of them announce it on the page.
        </p>
      </Section>

      <div ref={showcase} className="px-6 pb-8 md:px-12">
        <div className="mx-auto max-w-[1360px]">
          {concepts
            .filter((concept) => concept.shot)
            .map((c) => (
              <article
                key={c.index}
                data-project
                className="grid gap-10 border-t border-border py-20 md:grid-cols-12 md:py-28"
              >
                <div data-project-copy className="md:col-span-4">
                  <div className="flex items-baseline gap-4 text-[0.72rem]">
                    <span className="text-accent">{c.index}</span>
                    <span className="text-muted-foreground">{c.year}</span>
                    <span className="text-muted-foreground">{c.sector}</span>
                  </div>
                  <h2 className="mt-5 text-[2rem] leading-[1.06] tracking-[-0.03em] md:text-[2.6rem]">
                    {c.title}
                  </h2>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {c.intent}
                  </p>
                  {c.outcome && (
                    <p className="mt-6 border-l border-accent pl-4 text-sm leading-relaxed">
                      {c.outcome}
                    </p>
                  )}
                  <p className="mt-6 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {c.discipline}
                  </p>
                </div>

                <div
                  data-project-frame
                  className="overflow-hidden rounded-lg border border-border md:col-span-7 md:col-start-6"
                  style={{ background: c.slugTone }}
                >
                  <img
                    data-project-img
                    src={c.shot}
                    alt={`${c.title} website snapshot`}
                    loading="lazy"
                    width={1400}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
              </article>
            ))}
        </div>
      </div>

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
