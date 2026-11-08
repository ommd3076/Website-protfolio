import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { CopyButton } from "../components/evil/CopyButton";
import { StatusDot } from "../components/boardui/StatusDot";
import { StatusLabel } from "../components/site/EditorialControls";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Om M. Doddamani — Engineer, Researcher, Founder";
const description =
  "Om M Doddamani — Computer Science student at VVCE Mysuru, founder of Cerenetics, researching offline AI and reliable software systems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SinglePagePortfolio,
});

interface FactualProject {
  id: string;
  category: string;
  status: string;
  title: string;
  summary: string;
  detail: string;
  tags: readonly string[];
  href: string;
}

const FACTUAL_PROJECTS: readonly FactualProject[] = [
  {
    id: "prism",
    category: "01 · RESEARCH / LOCAL-FIRST AI",
    status: "Active research study",
    title: "PRISM",
    summary: "Exploring local-first model inference on resource-constrained consumer hardware.",
    detail:
      "Investigates memory bounds, execution efficiency, and standalone system design without external cloud dependencies. Focuses on private, on-device evaluation across constrained execution targets.",
    tags: ["Offline Execution", "Memory Constraints", "Local Benchmarking", "Standalone Systems"],
    href: "https://github.com/ommd3076",
  },
  {
    id: "drl",
    category: "02 · RESEARCH / GAME DYNAMICS",
    status: "Presented at IEEE AIEI",
    title: "Deep Reinforcement Learning",
    summary:
      "Investigating policy optimization and learning dynamics in complex game environments.",
    detail:
      "Research into state exploration and policy convergence in structured multi-agent and game environments. Presented at the IEEE International Conference on Artificial Intelligence and Extended Intelligence (AIEI).",
    tags: ["State Exploration", "Policy Optimization", "IEEE AIEI Conference", "Learning Dynamics"],
    href: "https://github.com/ommd3076",
  },
  {
    id: "cerenetics",
    category: "03 · FOUNDER / APPLIED SYSTEMS",
    status: "Early-stage development",
    title: "Cerenetics",
    summary:
      "Building and testing intelligent, practical software systems for real-world problems.",
    detail:
      "Founder engineering work focused on designing software systems where models interface with operational workflows through clear boundaries, observable data flow, and deterministic state handling.",
    tags: [
      "Operational Boundaries",
      "Deterministic State",
      "System Architecture",
      "Applied Engineering",
    ],
    href: "https://github.com/ommd3076",
  },
  {
    id: "eva",
    category: "04 · RETROSPECTIVE / CASE STUDY",
    status: "Completed retrospective",
    title: "Project EVA",
    summary: "An early hackathon attempt to automate office workflows through software.",
    detail:
      "A first hackathon project exploring office document automation. The initial prototype encountered real-world scoping and document format latency limits, retained openly as an essential case study in engineering trade-offs.",
    tags: [
      "Document Parsing",
      "Latency Limitations",
      "Heuristic Constraints",
      "First-Principles Scoping",
    ],
    href: "https://github.com/ommd3076",
  },
];

function SinglePagePortfolio() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div
      ref={scope}
      className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white"
    >
      {/* 
        ONE FOCUSED PUBLIC ROUTE (/)
        Approved design references: contentarchitecture.dev, datacurve.ai, ellipsus.com.
        - Atmospheric dark editorial canvas (ellipsus.com)
        - Confident serif typography & understated announcement pill (datacurve.ai)
        - Monospace structural metadata & hairline architectural cards (contentarchitecture.dev)
      */}

      {/* Hero Section */}
      <section
        id="top"
        className="px-6 pt-24 pb-20 md:pt-36 md:pb-28 border-b border-neutral-800/60 scroll-mt-28"
      >
        <div className="mx-auto max-w-[960px] space-y-8">
          {/* Datacurve-style announcement pill */}
          <div
            data-page-intro
            className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1.5 text-xs text-neutral-300"
          >
            <StatusDot status="active" showLabel={false} />
            <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wide text-neutral-300">
              Computer Science @ VVCE · Founder at Cerenetics
            </span>
          </div>

          <div data-page-intro className="space-y-6 max-w-[820px]">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-white tracking-tight leading-[1.15]">
              Engineering reliable software systems and local-first AI.
            </h1>

            <p className="font-serif text-base md:text-lg text-neutral-300 leading-relaxed max-w-[700px]">
              I'm Om M Doddamani, a third-year Computer Science student at Vidyavardhaka College of
              Engineering, Mysuru, and founder of Cerenetics. My work focuses on making model
              execution reliable, local, and grounded in deterministic state boundaries rather than
              cloud dependence.
            </p>
          </div>

          {/* Dual Action Group (datacurve.ai pattern) */}
          <div data-page-intro className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-mono font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Selected Work ↓
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/70 px-5 py-2.5 text-xs font-mono text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white"
            >
              Get in touch →
            </a>
            <div className="flex items-center gap-2 pl-1">
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">Direct:</span>
              <a
                href="mailto:ommd3076@gmail.com"
                className="text-xs font-mono text-neutral-300 hover:text-white underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-colors"
              >
                ommd3076@gmail.com
              </a>
              <CopyButton textToCopy="ommd3076@gmail.com" label="Copy" />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section
        id="work"
        className="px-6 py-20 md:py-28 border-b border-neutral-800/60 scroll-mt-28"
      >
        <div className="mx-auto max-w-[960px] space-y-12">
          {/* Section Heading */}
          <div data-reveal className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              01 · Selected Research & Systems
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-tight">
              Projects & Engineering Retrospectives
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-400 max-w-[680px] leading-relaxed">
              Four verified efforts across local-first machine learning, game dynamics, practical
              system design, and early hackathon trade-offs. Strictly factual, verifiable
              primary-source milestones only.
            </p>
          </div>

          {/* Architectural Project Cards (contentarchitecture.dev pattern) */}
          <div className="grid gap-6 md:grid-cols-2">
            {FACTUAL_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-reveal
                data-project-card-id={project.id}
                className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-6 md:p-7 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800/70 pb-3">
                    <span className="font-mono text-[10px] tracking-wider text-neutral-500 whitespace-nowrap">
                      {project.category}
                    </span>
                    <StatusLabel>{project.status}</StatusLabel>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-normal text-white tracking-tight group-hover:text-neutral-100">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-[13px] font-serif leading-relaxed text-neutral-300">
                      {project.summary}
                    </p>
                  </div>

                  <p className="text-xs font-sans leading-relaxed text-neutral-400 pt-1">
                    {project.detail}
                  </p>
                </div>

                <div className="pt-6 space-y-4">
                  {/* Factual Node Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5 text-[10px] font-mono text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-neutral-800/60 pt-3 flex items-center justify-between text-xs font-mono">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      Repository & Artifacts <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Background & Methodology Section */}
      <section
        id="about"
        className="px-6 py-20 md:py-28 border-b border-neutral-800/60 scroll-mt-28"
      >
        <div className="mx-auto max-w-[960px] space-y-12">
          {/* Section Heading */}
          <div data-reveal className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              02 · Background & Methodology
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-tight">
              First principles, academic foundation, and engineering discipline.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Foundation Card */}
            <div
              data-reveal
              className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-6 md:p-8 space-y-5"
            >
              <div className="border-b border-neutral-800/70 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Academic Focus · 2022–2026
                </span>
                <h3 className="font-serif text-lg text-white font-normal mt-1">
                  Computer Science & Engineering
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Vidyavardhaka College of Engineering, Mysuru
                </p>
              </div>

              <div className="space-y-3 text-xs md:text-[13px] font-serif leading-relaxed text-neutral-300">
                <p>
                  Pursuing foundational studies in algorithms, operating systems, and computer
                  architecture. Independent research centers on making machine learning systems
                  operate reliably under resource constraints rather than assuming unlimited scale.
                </p>
                <p>
                  Active research interests include local-first model inference architectures,
                  learning dynamics in reinforcement learning, and emerging hybrid approaches that
                  bridge classical optimization with modern neural pipelines.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Algorithms
                </span>
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Systems Engineering
                </span>
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Optimization
                </span>
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Offline AI
                </span>
              </div>
            </div>

            {/* Engineering Principles Card */}
            <div
              data-reveal
              className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-6 md:p-8 space-y-5"
            >
              <div className="border-b border-neutral-800/70 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  Design Standards
                </span>
                <h3 className="font-serif text-lg text-white font-normal mt-1">
                  Operational Principles
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Disciplined engineering over synthetic claims
                </p>
              </div>

              <div className="space-y-3 text-xs md:text-[13px] font-serif leading-relaxed text-neutral-300">
                <p>
                  <strong className="text-white font-medium">
                    Deterministic state boundaries:
                  </strong>{" "}
                  Software systems should handle errors through explicit reducers, predictable state
                  machines, and fail-closed defaults rather than silent side-effects.
                </p>
                <p>
                  <strong className="text-white font-medium">Verifiable evidence only:</strong>{" "}
                  Engineering documentation reports verified outcomes, primary sources, and real
                  constraints. Theoretical or unverified conference claims are withheld until formal
                  release.
                </p>
                <p>
                  <strong className="text-white font-medium">First-principles scoping:</strong>{" "}
                  Early failure modes (like Project EVA) are documented candidly as learning case
                  studies to inform cleaner architecture.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-400">
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Fail-Closed State
                </span>
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Primary Source Verification
                </span>
                <span className="rounded border border-neutral-800 bg-black/60 px-2 py-0.5">
                  Honest Postmortems
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Section */}
      <section id="contact" className="px-6 py-20 md:py-28 scroll-mt-28">
        <div className="mx-auto max-w-[960px] space-y-8">
          <div data-reveal className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              03 · Direct Contact
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white tracking-tight">
              Let's discuss research, systems, or collaborations.
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-400 max-w-[640px] leading-relaxed">
              Based in Mysuru, India (IST / UTC+5:30). Open to technical dialogue with researchers,
              engineers, and builders working on machine learning systems and reliable software.
            </p>
          </div>

          <div
            data-reveal
            className="rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/70 pb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Direct Email
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <a
                    href="mailto:ommd3076@gmail.com"
                    className="font-serif text-lg md:text-xl text-white hover:text-neutral-200 underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-colors"
                  >
                    ommd3076@gmail.com
                  </a>
                  <CopyButton textToCopy="ommd3076@gmail.com" label="Copy" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusDot status="active" showLabel={false} />
                <span className="text-xs font-mono text-neutral-400">Available for dialogue</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono pt-1">
              <a
                href="https://github.com/ommd3076"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-black/60 px-4 py-2 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
              >
                GitHub: @ommd3076 ↗
              </a>
              <a
                href="https://www.linkedin.com/in/om-m-doddamani/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-black/60 px-4 py-2 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
              >
                LinkedIn: Om M. Doddamani ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
