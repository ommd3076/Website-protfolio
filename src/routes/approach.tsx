import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { usePageIntro, useReveal } from "../components/site/motion";

const title = "Approach — Om M Doddamani";
const description =
  "Engineering methodology: first-principles framing, minimal instrumentation, deterministic architecture, and honest retrospectives.";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ApproachPage,
});

const stages = [
  {
    number: "01",
    title: "First-Principles Problem Framing",
    summary: "Isolating core constraints, mathematical bounds, and operational realities.",
    detail:
      "Before writing code or choosing libraries, identify the fundamental constraints: hardware memory limits (as in offline AI), state space complexity (as in reinforcement learning), or business workflow boundaries. Avoid cargo-cult abstractions.",
  },
  {
    number: "02",
    title: "Minimal Working Instrumentation",
    summary: "Authoring minimal test harnesses and benchmarks to measure reality.",
    detail:
      "Hypotheses must be measured, not assumed. Build lightweight instrumentation to test performance, measure frame times, verify layout stability, and inspect data boundaries directly in code.",
  },
  {
    number: "03",
    title: "Deterministic Architecture & Boundary Defense",
    summary: "Strict fail-closed contracts, predictable state machines, and zero leakage.",
    detail:
      "Design systems with explicit schemas (Zod DTOs), fail-closed defaults, synchronous accessible state commit, and interruption-safe execution lifecycles. Prevent client data leakage by design.",
  },
  {
    number: "04",
    title: "Empirical Evaluation & Honest Retrospectives",
    summary: "Documenting failure modes and scope lessons with the same rigor as successes.",
    detail:
      "Engineering maturity means recognizing when an initial prototype misses the mark. Retaining honest retrospectives (such as the EVA hackathon lessons) sharpens future architecture and prevents repeated mistakes.",
  },
];

const principles = [
  {
    title: "Clarity Before Abstraction",
    description:
      "Understand the problem in concrete, simple terms before generalizing into frameworks. If a design needs complex excuses to make sense, simplify the core model.",
  },
  {
    title: "Measure, Don't Hypothesize",
    description:
      "Treat performance assertions (frame rates, layout shifts, memory footprints) as testable hypotheses. Measure with automated browser suites and profilers.",
  },
  {
    title: "Honest Failure Retrospectives",
    description:
      "Acknowledge what didn't work with open documentation. Recognizing scope limits and mismatched assumptions is essential to engineering integrity.",
  },
  {
    title: "Instruments that Compound",
    description:
      "Build instruments that outlast the initial problem. As Newton and Leibniz showed with calculus, the right tool expands what others are capable of solving.",
  },
];

function ApproachPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-12 pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              Approach
            </p>
            <h1
              data-page-intro
              className="mt-6 max-w-[18ch] text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-[4rem]"
            >
              How I approach engineering problems.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-4"
          >
            A disciplined methodology centered on first-principles modeling, minimal
            instrumentation, deterministic system boundaries, and honest retrospectives.
          </p>
        </div>
      </Section>

      {/* Methodological Stages */}
      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl" data-reveal-group>
          <p className="eyebrow reveal">The Cycle of Building</p>
          <h2 className="reveal mt-4 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.2rem]">
            Four stages from problem to verified system
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {stages.map((stage) => (
              <article
                key={stage.number}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 transition-colors hover:border-white/20"
              >
                <span className="font-mono text-xs text-muted-foreground">{stage.number}</span>
                <h3 className="mt-3 text-lg font-medium tracking-tight text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/80 font-medium">{stage.summary}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Operating Principles */}
      <Section className="border-t border-white/10 py-12 md:py-20 bg-white/[0.01]">
        <div className="mx-auto max-w-4xl" data-reveal-group>
          <p className="eyebrow reveal">Operating Principles</p>
          <h2 className="reveal mt-4 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.2rem]">
            Constraints that enforce engineering rigor
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-white/10 p-6 md:p-8 space-y-3"
              >
                <h3 className="text-base font-medium text-foreground tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/10 py-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-center" data-reveal-group>
          <div className="md:col-span-8">
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              Interested in thoughtful engineering?
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Open to technical collaboration, systems discussions, and research inquiries.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <MagneticLink to="/contact">Get in Touch</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
