"use client";

import { useEffect, useRef, useId, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ensureGsap, prefersReduced } from "./motion";
import { StatusLabel } from "./EditorialControls";

export type ProjectId = "prism" | "drl" | "cerenetics" | "eva";

export interface ProjectNode {
  id: string;
  label: string;
  subtext: string;
}

export interface FactualProject {
  id: ProjectId;
  title: string;
  context: string;
  status: string;
  summary: string;
  detail: string;
  href: string;
  nodes: ProjectNode[];
}

export const FACTUAL_PROJECTS: FactualProject[] = [
  {
    id: "prism",
    title: "PRISM",
    context: "Research · Offline AI",
    status: "Active research study",
    summary: "Exploring local-first model inference on resource-constrained hardware.",
    detail:
      "Explores local-first inference architectures on consumer hardware. Investigates memory bounds, execution efficiency, and standalone system design without external cloud dependencies.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "focus", label: "Research Focus", subtext: "Offline execution" },
      { id: "methods", label: "Core Methods", subtext: "Resource constraints" },
      { id: "evaluation", label: "Evaluation", subtext: "Local benchmarking" },
      { id: "artifacts", label: "Code & Analysis", subtext: "Technical artifacts" },
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
      "Investigates policy optimization and learning dynamics in complex game environments. Presented at the IEEE AIEI conference.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "problem", label: "State Exploration", subtext: "Complex game environments" },
      { id: "optimization", label: "Policy Optimization", subtext: "Reinforcement learning" },
      { id: "conference", label: "IEEE AIEI Conference", subtext: "Research presentation" },
      { id: "next-questions", label: "Further Questions", subtext: "Research directions" },
    ],
  },
  {
    id: "cerenetics",
    title: "Cerenetics",
    context: "Founder · Applied AI",
    status: "Early-stage development",
    summary:
      "Building and testing intelligent, practical software systems for real-world problems.",
    detail:
      "Founder engineering work focused on designing software systems where models interface with operational workflows through clear boundaries and deterministic state handling.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "problem", label: "Problem Framing", subtext: "Workflow requirements" },
      { id: "architecture", label: "System Architecture", subtext: "Deterministic state logic" },
      { id: "implementation", label: "Implementation", subtext: "Hands-on engineering" },
      { id: "evaluation", label: "Practical Constraints", subtext: "Operational boundaries" },
    ],
  },
  {
    id: "eva",
    title: "EVA",
    context: "First hackathon · Retrospective",
    status: "Completed retrospective",
    summary: "An early hackathon attempt to automate office workflows through software.",
    detail:
      "A first hackathon project exploring office document automation. The initial prototype faced real-world scoping and latency limitations, retained openly as an essential case study in engineering trade-offs.",
    href: "https://github.com/ommd3076",
    nodes: [
      { id: "concept", label: "Initial Concept", subtext: "Workflow automation idea" },
      { id: "constraint", label: "Real Constraints", subtext: "Document format complexity" },
      { id: "mismatch", label: "Failure Mode", subtext: "Scope and heuristic limits" },
      { id: "takeaway", label: "Core Takeaway", subtext: "First-principles scoping" },
    ],
  },
];

interface ProjectExplorerProps {
  projects?: readonly FactualProject[];
  selectedId: ProjectId;
  activeNodeId?: string;
  onSelectProject: (id: ProjectId) => void;
  onSelectNode: (nodeId: string) => void;
}

export function ProjectExplorer({
  projects = FACTUAL_PROJECTS,
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
  const scrollTimeoutRef = useRef<number | null>(null);

  const currentProject = projects.find((p) => p.id === selectedId) ?? projects[0]!;

  const currentNode =
    currentProject.nodes.find((n) => n.id === activeNodeId) ?? currentProject.nodes[0]!;

  // Select-only tether measurement & update
  // Hidden at narrow widths (<768px or stacked elements)
  const updateTether = useCallback(() => {
    if (prefersReduced()) return;
    const pathEl = tetherPathRef.current;
    if (!pathEl) return;

    // Hide if viewport is narrow
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      pathEl.style.opacity = "0";
      return;
    }

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

    // Check drift, stacking, or narrow wrapping
    if (endX <= startX + 16 || Math.abs(endY - startY) > 400) {
      pathEl.style.opacity = "0";
      return;
    }

    const midX = (startX + endX) / 2;
    const d = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    pathEl.setAttribute("d", d);
    pathEl.style.opacity = "0.45";
  }, [selectedId, currentNode.id]);

  // Lifecycle-scoped GSAP context using official @gsap/react useGSAP
  const { contextSafe } = useGSAP({
    scope: containerRef,
    revertOnUpdate: false, // Preserves teardown-only reversion contract, preventing mid-flight snaps
  });

  // Event-safe retargeting tween using @gsap/react contextSafe
  const animateRetarget = contextSafe(() => {
    const diagram = diagramRef.current;
    if (!diagram || prefersReduced()) {
      updateTether();
      return;
    }

    ensureGsap();
    const nodes = diagram.querySelectorAll<HTMLElement>("[data-node-id]");

    // Rapid retargeting: kill active target tweens while preserving current transforms
    // Eliminates mid-selection snapping to CSS initial state
    gsap.killTweensOf(diagram);
    gsap.killTweensOf(nodes);

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .to(diagram, { opacity: 1, y: 0, duration: 0.22 }, 0)
      .fromTo(
        nodes,
        { opacity: 0.65, y: 3 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, clearProps: "transform" },
        0.02,
      );

    updateTether();
  });

  // Re-run retargeting animation whenever selected project or active node changes
  useGSAP(
    () => {
      animateRetarget();
    },
    {
      scope: containerRef,
      dependencies: [selectedId, currentNode.id],
      revertOnUpdate: false,
    },
  );

  const handleProjectSelect = contextSafe((id: ProjectId) => {
    if (id === selectedId) return;
    onSelectProject(id);
  });

  const handleNodeSelect = contextSafe((nodeId: string) => {
    onSelectNode(nodeId);
  });

  // Scroll and resize listener:
  // - Tether is hidden immediately during active scroll
  // - Re-measures and re-displays tether 120ms after scrolling stops
  // - Re-measures on window resize via RAF
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      // Immediately hide tether while scrolling is active
      if (tetherPathRef.current) {
        tetherPathRef.current.style.opacity = "0";
      }
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      // Re-measure and show tether once scrolling has settled
      scrollTimeoutRef.current = window.setTimeout(() => {
        updateTether();
      }, 120);
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTether);
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onResize);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateTether]);

  // Keyboard navigation within listbox (WAI-ARIA Single-Select Listbox)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = projects.findIndex((p) => p.id === selectedId);
    let nextIndex = currentIndex;

    if (e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % projects.length;
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + projects.length) % projects.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = projects.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      const nextProject = projects[nextIndex]!;
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
          Projects ({projects.length})
        </div>

        <div
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-label="Selected projects"
          aria-activedescendant={`option-${selectedId}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="space-y-1.5 outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg"
        >
          {projects.map((project, idx) => {
            const isSelected = project.id === selectedId;
            return (
              <div
                key={project.id}
                id={`option-${project.id}`}
                role="option"
                aria-selected={isSelected}
                data-project-id={project.id}
                onClick={() => handleProjectSelect(project.id)}
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

      {/* Selection driven project notes */}
      <div
        ref={diagramRef}
        data-project-detail-id={currentProject.id}
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
            <StatusLabel>{currentProject.status}</StatusLabel>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-neutral-400">{currentProject.summary}</p>
        </div>

        {/* Factual Architecture Graph (Pure SVG/DOM) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              Research and delivery context
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
                  onClick={() => handleNodeSelect(node.id)}
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

        {/* Project notes */}
        <div className="border-t border-neutral-800/80 pt-4 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            Project notes
          </div>
          <p className="text-xs leading-relaxed text-neutral-300 font-serif">
            {currentProject.detail}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono">
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-300 underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-white transition-colors"
            >
              GitHub profile ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
