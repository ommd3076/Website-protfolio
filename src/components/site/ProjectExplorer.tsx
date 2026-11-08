"use client";

import { useEffect, useRef, useState, useId, useCallback } from "react";
import gsap from "gsap";
import { prefersReduced } from "./motion";

export type ProjectId = "prism" | "drl" | "cerenetics" | "eva";

export interface ProjectNode {
  id: string;
  label: string;
  subtext: string;
}

export interface ProjectEdge {
  from: string;
  to: string;
}

export interface FactualProject {
  id: ProjectId;
  title: string;
  context: string;
  status: string;
  summary: string;
  detail: string;
  telemetry: string;
  evidence: string;
  href: string;
  nodes: ProjectNode[];
  edges: ProjectEdge[];
}

export const FACTUAL_PROJECTS: FactualProject[] = [
  {
    id: "prism",
    title: "PRISM",
    context: "Research · Offline AI",
    status: "Accepted for conference presentation",
    summary: "Exploring private, offline AI systems on resource-constrained hardware.",
    detail:
      "Investigates private, offline AI execution on resource-constrained devices. Formally accepted for conference presentation. In accordance with publication protocols, complete formal citation, proceedings venue, author ordering, and repository benchmarks are withheld pending scheduled release.",
    telemetry: "Offline AI research · Formal conference acceptance · Proceedings release pending",
    evidence:
      "Conference acceptance confirmed; citation details published upon formal proceedings release.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "focus", label: "Research Focus", subtext: "Offline device execution" },
      { id: "peer-review", label: "Peer Review", subtext: "Conference acceptance" },
      { id: "proceedings", label: "Proceedings Schedule", subtext: "Formal publication pending" },
      { id: "artifacts", label: "Code & Citation", subtext: "Release upon presentation" },
    ],
    edges: [
      { from: "focus", to: "peer-review" },
      { from: "peer-review", to: "proceedings" },
      { from: "proceedings", to: "artifacts" },
    ],
  },
  {
    id: "drl",
    title: "Deep Reinforcement Learning",
    context: "Research · Game Systems",
    status: "Presented at IEEE AIEI",
    summary:
      "Investigating policy optimization and learning dynamics in complex game environments.",
    detail:
      "Applied reinforcement learning and policy optimization to complex game environments. Formally presented at the IEEE AIEI conference. Experimental records, proceedings indexing, and code references are maintained for verification.",
    telemetry: "IEEE AIEI Conference · Policy optimization research · Formal proceedings",
    evidence: "Formally presented at IEEE AIEI conference; experimental documentation archived.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "problem", label: "State Exploration", subtext: "Complex game environments" },
      { id: "optimization", label: "Policy Optimization", subtext: "Reinforcement learning" },
      { id: "conference", label: "IEEE AIEI Conference", subtext: "Research presentation" },
      { id: "archive", label: "Proceedings Index", subtext: "Citation & verification" },
    ],
    edges: [
      { from: "problem", to: "optimization" },
      { from: "optimization", to: "conference" },
      { from: "conference", to: "archive" },
    ],
  },
  {
    id: "cerenetics",
    title: "Cerenetics",
    context: "Founder · Applied AI",
    status: "Founder work in progress",
    summary:
      "Building and testing intelligent, practical software systems for real-world problems.",
    detail:
      "Founder engineering work focused on designing software systems where AI models integrate with practical operational workflows. Personal contribution centers on systems framing, architecture design, and deterministic execution logic.",
    telemetry: "Early-stage founder engineering · System architecture & model integration",
    evidence:
      "Active startup development; personal contributions focused on system framing, core architecture, and delivery logic.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "problem", label: "Problem Framing", subtext: "First-principles requirements" },
      { id: "architecture", label: "System Architecture", subtext: "Deterministic state logic" },
      { id: "implementation", label: "Implementation", subtext: "Tested in code" },
      { id: "evaluation", label: "Real Constraints", subtext: "Operational validation" },
    ],
    edges: [
      { from: "problem", to: "architecture" },
      { from: "architecture", to: "implementation" },
      { from: "implementation", to: "evaluation" },
    ],
  },
  {
    id: "eva",
    title: "EVA",
    context: "First hackathon · Office automation",
    status: "Honest retrospective learning",
    summary: "An early hackathon attempt to automate office workflows through software.",
    detail:
      "A first hackathon project exploring office document automation. The initial prototype did not function as intended due to mismatched assumptions and unrealistic scope during a rapid event. Retained openly in the portfolio as an essential lesson on engineering boundaries and responsible scoping.",
    telemetry: "Hackathon learning attempt · Retrospective case note · Scope lessons",
    evidence:
      "First hackathon attempt; kept as an honest record of engineering boundaries and practical lessons learned.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "concept", label: "Initial Concept", subtext: "Workflow automation idea" },
      { id: "constraint", label: "Real Constraints", subtext: "Complex document formats" },
      { id: "mismatch", label: "Failure Mode", subtext: "Scope and heuristic limits" },
      { id: "takeaway", label: "Core Takeaway", subtext: "First-principles scoping" },
    ],
    edges: [
      { from: "concept", to: "constraint" },
      { from: "constraint", to: "mismatch" },
      { from: "mismatch", to: "takeaway" },
    ],
  },
];

interface ProjectExplorerProps {
  selectedId: ProjectId;
  activeNodeId?: string;
  onSelectProject: (id: ProjectId) => void;
  onSelectNode: (nodeId: string) => void;
}

export function ProjectExplorer({
  selectedId,
  activeNodeId,
  onSelectProject,
  onSelectNode,
}: ProjectExplorerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const tetherPathRef = useRef<SVGPathElement>(null);
  const listboxId = useId();

  const currentProject = FACTUAL_PROJECTS.find((p) => p.id === selectedId) ?? FACTUAL_PROJECTS[0]!;

  const currentNode =
    currentProject.nodes.find((n) => n.id === activeNodeId) ?? currentProject.nodes[0]!;

  // Synchronous tether update with drift handling
  const updateTether = useCallback(() => {
    if (prefersReduced()) return;
    const pathEl = tetherPathRef.current;
    if (!pathEl) return;

    const activeOption = listboxRef.current?.querySelector(
      `[data-project-id="${selectedId}"]`,
    ) as HTMLElement | null;
    const activeNodeEl = diagramRef.current?.querySelector(
      `[data-node-id="${currentNode.id}"]`,
    ) as HTMLElement | null;

    if (!activeOption || !activeNodeEl || !containerRef.current) {
      pathEl.style.opacity = "0";
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const optRect = activeOption.getBoundingClientRect();
    const nodeRect = activeNodeEl.getBoundingClientRect();

    // Calculate relative coordinates
    const startX = optRect.right - containerRect.left;
    const startY = optRect.top + optRect.height / 2 - containerRect.top;
    const endX = nodeRect.left - containerRect.left;
    const endY = nodeRect.top + nodeRect.height / 2 - containerRect.top;

    // Check drift or wrap
    if (endX <= startX + 16 || Math.abs(endY - startY) > 400) {
      // Elements are stacked (mobile) or excessively drifted: dismiss gracefully
      pathEl.style.opacity = "0";
      return;
    }

    const midX = (startX + endX) / 2;
    const d = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    pathEl.setAttribute("d", d);
    pathEl.style.opacity = "0.45";
  }, [selectedId, currentNode.id]);

  // Interruption-safe GSAP presentation transition
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || prefersReduced()) {
      updateTether();
      return;
    }

    // Kill any in-flight transitions on diagram
    gsap.killTweensOf(diagram);

    // Presentation-only tween: immediate authoritative DOM commit, animate visual presentation
    gsap.fromTo(
      diagram,
      { opacity: 0.7, scale: 0.995 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: "power2.out",
        onUpdate: updateTether,
        onComplete: updateTether,
      },
    );

    // Scroll & resize drift listener
    let rafId: number | null = null;
    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTether);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      gsap.killTweensOf(diagram);
    };
  }, [selectedId, currentNode.id, updateTether]);

  // Keyboard navigation within listbox (WAI-ARIA Single-Select Listbox)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = FACTUAL_PROJECTS.findIndex((p) => p.id === selectedId);
    let nextIndex = currentIndex;

    if (e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % FACTUAL_PROJECTS.length;
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + FACTUAL_PROJECTS.length) % FACTUAL_PROJECTS.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = FACTUAL_PROJECTS.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      const nextProject = FACTUAL_PROJECTS[nextIndex]!;
      onSelectProject(nextProject.id);
      onSelectNode(nextProject.nodes[0]!.id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative grid gap-8 md:grid-cols-[260px_1fr] items-start"
      style={{ contain: "layout style" }}
    >
      {/* SVG Tether Canvas (presentation only, hidden from assistive tech) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-10 hidden md:block"
      >
        <path
          ref={tetherPathRef}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className="transition-opacity duration-200"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Accessible Listbox Column */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-3">
          Projects ({FACTUAL_PROJECTS.length})
        </div>

        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label="Selected Engineering Systems"
          aria-activedescendant={`option-${selectedId}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="space-y-1.5 outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg"
        >
          {FACTUAL_PROJECTS.map((project, idx) => {
            const isSelected = project.id === selectedId;
            return (
              <div
                key={project.id}
                id={`option-${project.id}`}
                role="option"
                aria-selected={isSelected}
                data-project-id={project.id}
                onClick={() => {
                  onSelectProject(project.id);
                  onSelectNode(project.nodes[0]!.id);
                }}
                className={`group relative flex cursor-pointer items-start justify-between rounded-md p-3 transition-colors ${
                  isSelected
                    ? "bg-neutral-900 border border-neutral-700 text-white"
                    : "border border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-950"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-[14px] font-medium tracking-tight">
                      {project.title}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-mono text-neutral-500 truncate">
                    {project.context}
                  </p>
                </div>
                {isSelected && (
                  <span className="shrink-0 text-white font-mono text-xs pt-0.5">●</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Architecture & Telemetry Surface */}
      <div
        ref={diagramRef}
        className="rounded-lg border border-neutral-800 bg-neutral-950/80 p-5 md:p-6 backdrop-blur-sm space-y-6"
      >
        {/* Project Header & Metadata */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                {currentProject.context}
              </span>
              <h3 className="font-serif text-lg md:text-xl text-white font-medium mt-0.5">
                {currentProject.title}
              </h3>
            </div>
            <span className="inline-flex items-center rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
              {currentProject.status}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-neutral-400">{currentProject.summary}</p>
        </div>

        {/* Factual Architecture Graph (Pure SVG/DOM) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              Architecture Pipeline (Verified Nodes)
            </span>
            <span className="text-[10px] font-mono text-neutral-500">
              Active: {currentNode.label}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
            {currentProject.nodes.map((node, i) => {
              const isActive = node.id === currentNode.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  data-node-id={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`group relative flex flex-col justify-between rounded border p-2.5 text-left transition-all ${
                    isActive
                      ? "border-neutral-500 bg-neutral-900 shadow-sm"
                      : "border-neutral-800/80 bg-black/60 hover:border-neutral-700 hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[9px] font-mono text-neutral-500 tabular-nums">
                      N0{i + 1}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-white" : "bg-neutral-700"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-serif font-medium text-white group-hover:text-neutral-100">
                      {node.label}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                      {node.subtext}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Context & Contribution Notes */}
        <div className="border-t border-neutral-800/80 pt-4 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            Verified Details & Contribution
          </div>
          <p className="text-xs leading-relaxed text-neutral-300 font-serif">
            {currentProject.detail}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono">
            <span className="text-neutral-400">
              <strong className="text-neutral-500">Telemetry:</strong> {currentProject.telemetry}
            </span>
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-white transition-colors"
            >
              Verified Codebase ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
