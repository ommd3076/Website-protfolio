import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { usePageIntro, useReveal } from "../components/site/motion";
import { ApproachStages, ApproachPrinciples } from "../components/site/ApproachStages";

const title = "Approach — Cerenetics";
const description =
  "How Cerenetics operates: structure first, AI workflows inside delivery, and launch treated as engineering rather than announcement.";

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

function ApproachPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-10">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              Approach
            </p>
            <h1
              data-page-intro
              className="mt-8 max-w-[18ch] text-[2.6rem] leading-[1.02] tracking-[-0.035em] md:text-[4.2rem]"
            >
              An operating system, not a service menu.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-base leading-relaxed text-muted-foreground md:col-span-3 md:col-start-10"
          >
            Five stages, one team, AI inside the delivery rather than around it.
          </p>
        </div>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">The sequence</p>
          <h2 className="reveal mt-5 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]">
            How we move from problem to launched system
          </h2>
          <ApproachStages />
        </div>
      </Section>

      <Section className="border-y border-border bg-background/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Operating principles</p>
          <h2 className="reveal mt-5 max-w-[18ch] text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]">
            The constraints that create clarity
          </h2>
          <ApproachPrinciples />
        </div>
      </Section>

      <Section className="border-t border-border bg-mineral">
        <div className="grid gap-8 md:grid-cols-12 md:items-end" data-reveal-group>
          <h2 className="reveal text-[1.9rem] leading-[1.15] tracking-[-0.03em] md:col-span-7 md:text-[2.9rem]">
            Tell us what stage you are at.
          </h2>
          <div className="reveal md:col-span-4 md:col-start-9">
            <MagneticLink to="/contact">Start a conversation</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}
