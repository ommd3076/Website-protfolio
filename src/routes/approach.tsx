import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { useReveal } from "../components/site/motion";
import { ServicesPanels } from "../components/site/ServicesPanels";
import { TechDiagram } from "../components/site/TechDiagram";

const title = "Approach — Carenetics";
const description =
  "How Carenetics operates: structure first, AI workflows inside delivery, and launch treated as engineering rather than announcement.";

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
    no: "01",
    title: "Orientation",
    body: "We learn the business before the brief hardens: what it sells, who decides, and where the current system loses people.",
    meta: "Week 1",
  },
  {
    no: "02",
    title: "Structure",
    body: "The argument is sequenced before any surface work. Hierarchy, routes, and what should never be a page at all.",
    meta: "Week 1–2",
  },
  {
    no: "03",
    title: "AI workflows",
    body: "Research synthesis, content sequencing, variant generation and QA run through our own tooling. It compresses the middle of the project, not the judgement.",
    meta: "Continuous",
  },
  {
    no: "04",
    title: "Build",
    body: "Fast, accessible, and honest about its own weight. Motion is added last and only where it clarifies a relationship.",
    meta: "Week 3–6",
  },
  {
    no: "05",
    title: "Launch & measurement",
    body: "Sequencing, messaging, the first fortnight of data, and a short list of what changes once real people arrive.",
    meta: "Week 6+",
  },
];

const model = [
  ["Two or three people", "The people who framed the work are the people who ship it."],
  ["Fixed windows", "Six to ten weeks, scoped to a decision rather than a backlog."],
  ["Systems, not pages", "Everything we ship is extendable by the team that inherits it."],
  ["Measured after", "A short observation period is part of the engagement, not an upsell."],
];

function ApproachPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);

  return (
    <div ref={scope}>
      <Section className="pb-10">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p className="eyebrow reveal">Approach</p>
            <h1 className="reveal mt-8 max-w-[18ch] text-[2.6rem] leading-[1.02] tracking-[-0.035em] md:text-[4.2rem]">
              An operating system, not a service menu.
            </h1>
          </div>
          <p className="reveal self-end text-sm leading-relaxed text-muted-foreground md:col-span-3 md:col-start-10">
            Five stages, one team, AI inside the delivery rather than around it.
          </p>
        </div>
      </Section>

      <div className="pb-24 pt-4 md:pb-32">
        <ServicesPanels eyebrow="The sequence" panels={stages} />
      </div>

      <Section className="border-y border-border bg-mineral">
        <div className="grid gap-14 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-4">
            <h2 className="reveal max-w-[16ch] text-[1.8rem] leading-[1.12] tracking-[-0.03em] md:text-[2.5rem]">
              How the parts connect.
            </h2>
            <p className="reveal mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Structure, content, interface and launch move as one loop. AI accelerates the loop; it
              does not decide what belongs in it.
            </p>
          </div>
          <div className="reveal md:col-span-7 md:col-start-6">
            <TechDiagram />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2" data-reveal-group>
          {model.map(([t, d]) => (
            <div key={t} className="reveal border-t border-border pt-7">
              <h3 className="text-[1.3rem] tracking-[-0.02em]">{t}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
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
