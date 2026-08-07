import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { Hero } from "../components/site/Hero";
import { MediaRibbon } from "../components/site/MediaRibbon";
import { useReveal } from "../components/site/motion";
import { concepts } from "../data/concepts";
const title = "Cerenetics — AI-native company";
const description =
  "Cerenetics builds AI-native digital systems and launch infrastructure — moving toward deeptech, healthcare and medtech.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const capabilities = [
  {
    no: "01",
    title: "Product thinking",
    body: "Framing the problem, scope and decision path before surface work begins.",
  },
  {
    no: "02",
    title: "Structure & narrative",
    body: "Information architecture and narrative that make complicated businesses legible.",
  },
  {
    no: "03",
    title: "AI-native delivery",
    body: "Research, content sequencing and QA accelerated without thinning out judgement.",
  },
  {
    no: "04",
    title: "Launch structure",
    body: "The release, first real visitors and measured second week planned as one system.",
  },
];

const ribbon = concepts.map((c) => ({
  label: c.title,
  caption: c.year,
  tone: c.slugTone,
  ...(c.shot ? { image: c.shot } : {}),
}));

function Index() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);

  return (
    <div ref={scope}>
      <Hero />

      {/* Media ribbon */}
      <div className="relative border-y border-border bg-mineral py-16 md:py-20">
        <div className="mb-8 flex items-center gap-3 px-6 md:px-12">
          <p className="eyebrow">Work</p>
          <span data-draw-line className="ml-2 h-px flex-1 bg-border" />
        </div>
        <MediaRibbon items={ribbon} />
        <div className="px-6 pt-8 md:px-12">
          <Link
            to="/work"
            className="text-[0.8rem] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            All work →
          </Link>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-3">
            <p className="eyebrow reveal">Capabilities</p>
            <Link
              to="/approach"
              className="reveal mt-6 inline-block text-sm underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              How we work
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-10 md:col-span-8 md:col-start-5 md:grid-cols-2">
            {capabilities.map((capability) => (
              <article key={capability.no} className="reveal border-t border-border pt-5">
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="text-[1.2rem]">{capability.title}</h2>
                  <span className="text-[0.68rem] tabular-nums text-accent">{capability.no}</span>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {capability.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Future — darker moment */}
      <section className="px-3 md:px-5">
        <div
          className="mx-auto max-w-[1360px] rounded-lg bg-inverse px-8 py-24 text-inverse-foreground md:px-16 md:py-32"
          data-reveal-group
        >
          <h2 className="reveal max-w-[18ch] text-[2rem] leading-[1.1] tracking-[-0.035em] md:text-[3.4rem]">
            Toward deeptech, healthcare and medtech.
          </h2>
          <p
            className="reveal mt-8 max-w-[46ch] text-[0.95rem] leading-[1.7]"
            style={{ color: "rgba(245,245,244,0.6)" }}
          >
            Where clarity carries consequence, the interface is part of the science.
            <Link
              to="/future"
              className="ml-2 underline underline-offset-4"
              style={{ color: "#f5f5f4" }}
            >
              Read on
            </Link>
          </p>
        </div>
      </section>

      {/* Contact */}
      <Section>
        <div className="mx-auto max-w-[900px] text-center" data-reveal-group>
          <h2 className="reveal text-[2.1rem] leading-[1.06] tracking-[-0.04em] md:text-[3.6rem]">
            Have something that deserves to be built properly?
          </h2>
          <div className="reveal mt-11 flex justify-center">
            <MagneticLink to="/contact">Start a conversation</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
