import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { usePageIntro, useReveal } from "../components/site/motion";

const title = "Research Horizons — Om M Doddamani";
const description =
  "Research directions in resource-constrained offline AI, reinforcement learning policy optimization, and hybrid architectures.";

export const Route = createFileRoute("/future")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: FuturePage,
});

const researchTheses = [
  {
    title: "Resource-Constrained & Offline Intelligence",
    problem:
      "Modern AI systems are heavily tethered to multi-tenant cloud clusters, presenting severe privacy, latency, and operational vulnerabilities.",
    direction:
      "Investigating private on-device execution (as explored in PRISM) where models operate within strict memory budgets without external data egress.",
  },
  {
    title: "Policy Optimization in Complex State Spaces",
    problem:
      "Reinforcement learning algorithms frequently suffer from sample inefficiency and unstable convergence when state spaces become high-dimensional.",
    direction:
      "Studying policy gradient dynamics and reward formulation in complex simulated environments (as presented at IEEE AIEI).",
  },
  {
    title: "Hybrid Architectures: Neural Meets Symbolic",
    problem:
      "Pure neural networks excel at perceptual synthesis but fail at formal verification, deterministic boundaries, and arithmetic precision.",
    direction:
      "Combining neural pattern recognition with classical mathematical optimization and deterministic state harnesses to ensure reliable software behavior.",
  },
  {
    title: "Quantum Machine Learning Exploration",
    problem:
      "Classical compute faces exponential scaling walls in certain combinatorial optimization and high-dimensional physics simulations.",
    direction:
      "Investigating how quantum algorithmic principles, state superpositions, and variational circuits can provide novel optimization formulations.",
  },
];

function FuturePage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-12 pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              Research Horizons
            </p>
            <h1
              data-page-intro
              className="mt-6 max-w-[18ch] text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-[4rem]"
            >
              Emerging directions in AI systems & optimization.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-4"
          >
            Areas of active inquiry: resource-constrained offline execution, reinforcement learning
            policy optimization, hybrid reasoning architectures, and quantum computing paradigms.
          </p>
        </div>
      </Section>

      {/* Theses Grid */}
      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl" data-reveal-group>
          <p className="eyebrow reveal">Active Inquiries</p>
          <h2 className="reveal mt-4 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.2rem]">
            Four architectural horizons
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {researchTheses.map((t) => (
              <article
                key={t.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-4"
              >
                <h3 className="text-lg font-medium text-foreground tracking-tight">{t.title}</h3>
                <div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground/80">
                    The Challenge
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/70">
                    Inquiry Direction
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/90">{t.direction}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/10 py-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-center" data-reveal-group>
          <div className="md:col-span-8">
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              Interested in discussing research?
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Open to academic exchanges, paper preprints, and systems engineering collaboration.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <MagneticLink to="/contact">Reach Out</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
