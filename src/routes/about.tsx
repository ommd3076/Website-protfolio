import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/site/Chrome";
import { useReveal, usePageIntro } from "../components/site/motion";

interface AboutTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const tabs: AboutTab[] = [
  {
    id: "education",
    label: "Education & Studies",
    content: (
      <div className="space-y-6 max-w-2xl text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-medium text-foreground tracking-tight">
          Vidyavardhaka College of Engineering, Mysuru
        </h3>
        <p>
          I am currently in my third year of Computer Science and Engineering at Vidyavardhaka
          College of Engineering, Mysuru. My academic coursework spans algorithms, data structures,
          computer networks, operating systems, and discrete mathematics.
        </p>
        <p>
          Alongside regular coursework, my independent study centers on applied machine learning,
          hardware-aware model quantization, and systems programming in modern languages like
          TypeScript and Python.
        </p>
      </div>
    ),
  },
  {
    id: "founder",
    label: "Founder Work",
    content: (
      <div className="space-y-6 max-w-2xl text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-medium text-foreground tracking-tight">
          Cerenetics — Applied Systems
        </h3>
        <p>
          As founder at Cerenetics, I explore how intelligent software architectures can solve
          practical, operational problems. Rather than treating AI models as black-box chatbots or
          loose wrappers, our focus is on building deterministic execution harnesses that integrate
          predictably with existing business workflows.
        </p>
        <p>
          My personal responsibilities center on systems framing, boundary defense, core
          architectural design, and hands-on implementation in code.
        </p>
      </div>
    ),
  },
  {
    id: "research",
    label: "Research Focus",
    content: (
      <div className="space-y-6 max-w-2xl text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-medium text-foreground tracking-tight">
          Offline AI, Reinforcement Learning & Optimization
        </h3>
        <p>
          My research interests lie at the intersection of machine learning systems, optimization,
          and emerging computing paradigms:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">PRISM (Offline AI)</strong>: Exploring private,
            on-device AI execution under strict hardware resource constraints. Formally accepted for
            conference presentation.
          </li>
          <li>
            <strong className="text-foreground">Deep Reinforcement Learning</strong>: Investigating
            policy optimization and learning dynamics in complex game environments. Presented at the
            IEEE AIEI conference.
          </li>
          <li>
            <strong className="text-foreground">Hybrid Architectures & Quantum ML</strong>:
            Exploring how classical optimization principles and quantum computing paradigms can
            enhance reasoning and sample efficiency.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "philosophy",
    label: "Engineering Perspective",
    content: (
      <div className="space-y-6 max-w-2xl text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-medium text-foreground tracking-tight">
          Instruments, First Principles & Honest Building
        </h3>
        <p>
          I view engineering through the lens of instrument building. Newton's questions about
          motion helped drive his work on fluxions as calculus emerged, while Leibniz independently
          developed the notation we rely upon today. Better instruments expand what humans can
          achieve: a more precise tool gives a surgeon greater control; a better computational
          instrument makes intractable questions solvable.
        </p>
        <p>
          Engineering maturity also requires recognizing and openly documenting failure modes. When
          early prototypes (such as our first hackathon project, EVA) fail to meet expectations,
          analyzing the mismatch between initial assumptions and operational realities provides the
          clearest lessons for future architecture.
        </p>
      </div>
    ),
  },
  {
    id: "profiles",
    label: "Verified Profiles",
    content: (
      <div className="space-y-6 max-w-2xl text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-medium text-foreground tracking-tight">
          Public Records & Connections
        </h3>
        <p>
          All published claims, conference notes, and code repositories are verified against public
          profiles:
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-sm font-mono">
          <a
            href="https://github.com/ommd3076"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-foreground transition-colors hover:border-white hover:text-white"
          >
            GitHub: @ommd3076 ↗
          </a>
          <a
            href="https://www.linkedin.com/in/om-m-doddamani/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-foreground transition-colors hover:border-white hover:text-white"
          >
            LinkedIn: Om M. Doddamani ↗
          </a>
          <a
            href="mailto:ommd3076@gmail.com"
            className="rounded-full border border-white/20 px-4 py-2 text-foreground transition-colors hover:border-white hover:text-white"
          >
            Email: ommd3076@gmail.com ↗
          </a>
        </div>
      </div>
    ),
  },
];

const title = "About — Om M Doddamani";
const description =
  "Third-year CSE student at VVCE Mysuru, founder at Cerenetics, and AI systems researcher.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const scope = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("education");

  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-10 pt-24 md:pt-36">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              About
            </p>
            <h1
              data-page-intro
              className="mt-6 max-w-[18ch] text-[2.5rem] leading-[1.05] tracking-[-0.035em] md:text-[4rem]"
            >
              Engineering foundations, research, and founder work.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-4"
          >
            Third-year Computer Science and Engineering student at Vidyavardhaka College of
            Engineering, Mysuru. Founder at Cerenetics. Exploring hybrid AI architectures, quantum
            machine learning, and optimization.
          </p>
        </div>
      </Section>

      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl" data-reveal-group>
          {/* Tab Navigation */}
          <div
            role="tablist"
            aria-label="About sections"
            className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              {tabs
                .filter((t) => t.id === activeTab)
                .map((tab) => (
                  <motion.div
                    key={tab.id}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.content}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </div>
  );
}
