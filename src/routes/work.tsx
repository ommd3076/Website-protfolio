import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Section } from "../components/site/Chrome";
import { ProjectExplorer, ProjectId } from "../components/site/ProjectExplorer";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Projects & Research — Om M Doddamani";
const description =
  "Verified engineering systems, research presented at IEEE AIEI, conference-accepted offline AI, and honest retrospectives.";

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

function WorkPage() {
  const scope = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectId>("prism");
  const [activeNodeId, setActiveNodeId] = useState<string>("focus");

  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-12 pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              Projects & Research
            </p>
            <h1
              data-page-intro
              className="mt-6 max-w-[18ch] text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-[4rem]"
            >
              Systems built, research presented, and honest retrospectives.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-4"
          >
            A factual record of engineering implementations, peer-reviewed research, and early
            hackathon learning attempts. No inflated claims or unverified metrics.
          </p>
        </div>
      </Section>

      {/* Interactive Project Explorer */}
      <Section className="py-12 md:py-20">
        <div data-reveal-group>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="text-[0.7rem] uppercase tracking-wider text-muted-foreground font-mono">
              Verified Project Topology
            </span>
            <span className="text-[0.7rem] text-muted-foreground/60 font-mono">
              Fail-closed verification active
            </span>
          </div>

          <ProjectExplorer
            selectedId={selectedProject}
            activeNodeId={activeNodeId}
            onSelectProject={(id) => {
              setSelectedProject(id);
              setActiveNodeId("focus");
            }}
            onSelectNode={setActiveNodeId}
          />
        </div>
      </Section>

      {/* Fail-closed verification statement */}
      <Section className="py-12 border-t border-white/10">
        <div className="max-w-2xl text-xs leading-relaxed text-muted-foreground space-y-3">
          <p className="font-mono uppercase tracking-wider text-white/50 text-[0.68rem]">
            Disclosure & Publication Protocols
          </p>
          <p>
            Research papers accepted for conference presentation (including PRISM) are withheld from
            full text distribution until formal conference proceedings release. Peer-reviewed
            presentations (including IEEE AIEI) and experimental repositories are documented for
            verification.
          </p>
          <p>
            Early exploratory projects that failed to meet their initial specifications (including
            EVA) are retained openly to reflect realistic engineering trade-offs and retrospective
            lessons.
          </p>
        </div>
      </Section>
    </div>
  );
}
