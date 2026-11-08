import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useReveal, usePageIntro } from "../components/site/motion";
import { VERIFIED_PUBLIC_REPOS, PublicRepo } from "../data/repos";

const title = "Engineering Systems & Repositories — Om M. Doddamani";
const description =
  "Verified repositories and technical narratives across distributed robotics, computer vision, logistics dispatch, and algorithmic systems from Om M. Doddamani.";

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

const FEATURED_STORIES_LOOKUP: Record<string, { anchorId: string }> = {
  "silver-computing-machine": { anchorId: "story-01" },
  "fluffy-couscous": { anchorId: "story-02" },
  "SIH-123": { anchorId: "story-03" },
  "atlas-journey-trip-planner": { anchorId: "story-04" },
};

const CATEGORIES = [
  "All",
  "Algorithms & Data Structures",
  "Web & Full-Stack",
  "Systems & Architecture",
  "AI & Machine Learning",
  "Automation & CI/CD",
] as const;

function WorkPage() {
  const scope = useRef<HTMLDivElement>(null);
  const [highlightedRepo, setHighlightedRepo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useReveal(scope);
  usePageIntro(scope);

  // Reversible hand-off: Scroll to repository card in the index
  const handOffToIndex = (repoName: string) => {
    setHighlightedRepo(repoName);
    setSelectedCategory("All");
    setSearchQuery("");
    setTimeout(() => {
      const targetElement = document.getElementById(`repo-${repoName}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 40);
  };

  // Reversible hand-off: Scroll back to the featured story
  const handOffToStory = (anchorId: string) => {
    const storySection = document.getElementById(anchorId);
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter 27 verified public repos
  const filteredRepos = VERIFIED_PUBLIC_REPOS.filter((repo: PublicRepo) => {
    const matchesCategory = selectedCategory === "All" || repo.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      repo.name.toLowerCase().includes(q) ||
      repo.description.toLowerCase().includes(q) ||
      repo.language.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      ref={scope}
      className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white pb-32"
    >
      {/* 
        ACT 1: CONCISE EDITORIAL BREADTH FRAMING (HERO)
        Informed directly by ellipsus.com & datacurve.ai restraint:
        - Narrow centered column (max-w-[720px]) with considered negative space
        - Quiet architectural metadata eyebrow
        - Restrained editorial serif headline with high craft
        - Factual scope framing
      */}
      <section className="px-6 pt-32 pb-20 md:pt-44 md:pb-28 border-b border-neutral-900/80">
        <div className="mx-auto max-w-[720px] text-center space-y-6">
          <div data-page-intro className="space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 block">
              [ Public Archive // 27 Repositories ]
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.12]">
              Engineering Systems & Repositories
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-neutral-400 leading-relaxed max-w-[620px] mx-auto">
              A curated collection of verified codebases spanning autonomous robotics coordination,
              client-side computer vision, combinatorial logistics dispatch, and algorithmic
              systems.
            </p>
          </div>

          {/* Quick Jump Index Hairline */}
          <div
            data-page-intro
            className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-neutral-500 border-t border-neutral-900/60 max-w-[580px] mx-auto"
          >
            <a
              href="#story-01"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              01. Logistics
            </a>
            <span className="text-neutral-800">·</span>
            <a
              href="#story-02"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              02. Vision & AR
            </a>
            <span className="text-neutral-800">·</span>
            <a
              href="#story-03"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              03. Multi-Agent Fleet
            </a>
            <span className="text-neutral-800">·</span>
            <a
              href="#story-04"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              04. Algorithms
            </a>
            <span className="text-neutral-800">·</span>
            <a
              href="#catalog"
              className="text-neutral-300 hover:text-white transition-colors underline-offset-4 underline"
            >
              All 27 Repos ↓
            </a>
          </div>
        </div>
      </section>

      {/* 
        ACT 2: FOUR EVIDENCE-LED REPOSITORY STORIES
        Each story features an individually authored layout with intentional narrow/wide column rhythm,
        integrating evidence into the page structure rather than repeating generic demo panels.
      */}
      <section id="featured-stories" className="px-6 py-20 md:py-32 space-y-28 md:space-y-40">
        {/* =========================================================================
            STORY 01: Combinatorial Logistics Dispatch (silver-computing-machine)
            Layout: Wide architectural header + integrated problem formulation ledger
        ========================================================================= */}
        <article
          id="story-01"
          data-story-card
          className="mx-auto max-w-[960px] scroll-mt-24 space-y-8"
        >
          {/* Chapter Eyebrow & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300 font-semibold">
                01
              </span>
              <span className="uppercase tracking-widest text-neutral-500 text-[10px]">
                Combinatorial Logistics
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ommd3076/silver-computing-machine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white underline underline-offset-4"
              >
                silver-computing-machine
              </a>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">Python</span>
            </div>
          </div>

          {/* Editorial Title & Summary */}
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
                Fleet Dispatch & Assignment Evaluation
              </h2>
              <p className="font-serif text-base text-neutral-300 leading-relaxed">
                A research prototype developed for the Quant-A-Maze 3.0 challenge. Evaluates fleet
                dispatch and stop sequencing under operational constraints using decision-focused
                variational quantum circuits (VQC) alongside classical optimization warm-starts.
              </p>

              <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handOffToIndex("silver-computing-machine")}
                  className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                >
                  Inspect in 27-repo catalog ↓
                </button>
                <a
                  href="https://github.com/ommd3076/silver-computing-machine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Repository ↗
                </a>
              </div>
            </div>

            {/* Integrated Evidence Formulation Box (Page-specific content) */}
            <div className="lg:col-span-5 rounded-xl border border-neutral-850 bg-neutral-950/70 p-5 font-mono text-xs space-y-3 shadow-inner">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 border-b border-neutral-900 pb-2">
                Problem Formulation & Evaluation
              </div>
              <ul className="space-y-2 text-neutral-400 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-600">▪</span>
                  <span>
                    <strong className="text-neutral-200">Challenge Scope:</strong> Quant-A-Maze 3.0
                    combinatorial logistics assignment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-600">▪</span>
                  <span>
                    <strong className="text-neutral-200">Solver Method:</strong> Decision-focused
                    VQC coupled with classical warm-start heuristic.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-600">▪</span>
                  <span>
                    <strong className="text-neutral-200">Evaluation:</strong> Validates vehicle
                    capacity limits and multi-stop delivery schedules.
                  </span>
                </li>
              </ul>
              <div className="pt-2 border-t border-neutral-900 text-[10px] text-neutral-600 truncate">
                Source: github.com/ommd3076/silver-computing-machine
              </div>
            </div>
          </div>
        </article>

        {/* =========================================================================
            STORY 02: In-Browser Computer Vision & AR (fluffy-couscous)
            Layout: Asymmetric narrative with horizontal pipeline execution trace
        ========================================================================= */}
        <article
          id="story-02"
          data-story-card
          className="mx-auto max-w-[960px] scroll-mt-24 space-y-8"
        >
          {/* Chapter Eyebrow & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300 font-semibold">
                02
              </span>
              <span className="uppercase tracking-widest text-neutral-500 text-[10px]">
                Computer Vision & Graphics
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ommd3076/fluffy-couscous"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline underline-offset-4"
              >
                fluffy-couscous
              </a>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">JavaScript / WebGL</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="max-w-[760px] space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
                In-Browser Computer Vision & Augmented Reality
              </h2>
              <p className="font-serif text-base text-neutral-300 leading-relaxed">
                Single-camera in-browser Augmented Reality application integrating real-time hand
                tracking with a Three.js 3D WebGL rendering pipeline. Operates client-side directly
                on modern browser runtimes without external vision servers.
              </p>
            </div>

            {/* Pipeline Execution Diagram (Integrated content) */}
            <div className="rounded-xl border border-neutral-850 bg-neutral-950/80 p-5 font-mono text-xs space-y-4">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                Client-Side Processing Pipeline
              </div>
              <div className="grid gap-3 sm:grid-cols-3 text-center">
                <div className="rounded-lg border border-neutral-900 bg-neutral-900/40 p-3 space-y-1">
                  <div className="text-neutral-500 text-[10px]">Stage 01</div>
                  <div className="text-white font-medium">Video Capture</div>
                  <div className="text-neutral-400 text-[11px]">Single Web Camera Feed</div>
                </div>
                <div className="rounded-lg border border-neutral-900 bg-neutral-900/40 p-3 space-y-1">
                  <div className="text-neutral-500 text-[10px]">Stage 02</div>
                  <div className="text-white font-medium">MediaPipe Tasks Vision</div>
                  <div className="text-neutral-400 text-[11px]">Real-Time Landmark Extraction</div>
                </div>
                <div className="rounded-lg border border-neutral-900 bg-neutral-900/40 p-3 space-y-1">
                  <div className="text-neutral-500 text-[10px]">Stage 03</div>
                  <div className="text-white font-medium">Three.js WebGL</div>
                  <div className="text-neutral-400 text-[11px]">Spatial Mesh & Interaction</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs pt-1">
              <button
                type="button"
                onClick={() => handOffToIndex("fluffy-couscous")}
                className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
              >
                Inspect in 27-repo catalog ↓
              </button>
              <a
                href="https://github.com/ommd3076/fluffy-couscous"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Repository ↗
              </a>
            </div>
          </div>
        </article>

        {/* =========================================================================
            STORY 03: Distributed Multi-Agent Fleet Coordination (SIH-123)
            Layout: Decentralized systems architecture grid
        ========================================================================= */}
        <article
          id="story-03"
          data-story-card
          className="mx-auto max-w-[960px] scroll-mt-24 space-y-8"
        >
          {/* Chapter Eyebrow & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300 font-semibold">
                03
              </span>
              <span className="uppercase tracking-widest text-neutral-500 text-[10px]">
                Distributed Systems & Robotics
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ommd3076/SIH-123"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline underline-offset-4"
              >
                SIH-123
              </a>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">Python</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
                Distributed Multi-Agent Fleet Coordination
              </h2>
              <p className="font-serif text-base text-neutral-300 leading-relaxed">
                Smart India Hackathon (SIH26123) simulation of ten autonomous mobile robots (AMRs)
                coordinating navigation trajectories in warehouse environments. Agents share
                trajectory intent over a Zenoh message plane without any central traffic controller.
              </p>

              <div className="pt-2 flex items-center gap-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handOffToIndex("SIH-123")}
                  className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                >
                  Inspect in 27-repo catalog ↓
                </button>
                <a
                  href="https://github.com/ommd3076/SIH-123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  Repository ↗
                </a>
              </div>
            </div>

            {/* Architecture Ledger */}
            <div className="lg:col-span-6 rounded-xl border border-neutral-850 bg-neutral-950/70 p-5 font-mono text-xs space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 border-b border-neutral-900 pb-2">
                Decentralized Topology Attributes
              </div>
              <div className="space-y-3 text-[11px] text-neutral-400">
                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">Coordination Model</span>
                  <span className="text-neutral-200">Decentralized Peer-to-Peer</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">Communication Fabric</span>
                  <span className="text-neutral-200">Zenoh Message Bus</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-900">
                  <span className="text-neutral-500">Fleet Scale</span>
                  <span className="text-neutral-200">10 Autonomous Mobile Robots</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500">Conflict Arbitration</span>
                  <span className="text-neutral-200">Local Junction Coordinators</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* =========================================================================
            STORY 04: Algorithmic Route & Budget Optimization (atlas-journey-trip-planner)
            Layout: Algorithmic Triad (3 distinct computational strategies)
        ========================================================================= */}
        <article
          id="story-04"
          data-story-card
          className="mx-auto max-w-[960px] scroll-mt-24 space-y-8"
        >
          {/* Chapter Eyebrow & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-900 pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300 font-semibold">
                04
              </span>
              <span className="uppercase tracking-widest text-neutral-500 text-[10px]">
                Algorithms & Optimization
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ommd3076/atlas-journey-trip-planner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline underline-offset-4"
              >
                atlas-journey-trip-planner
              </a>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">JavaScript</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="max-w-[760px] space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
                Algorithmic Route & Budget Optimization
              </h2>
              <p className="font-serif text-base text-neutral-300 leading-relaxed">
                Full-stack collaborative planning application implementing classic graph traversal,
                0-1 knapsack, and heap sorting algorithms through route optimization, budget-aware
                itinerary generation, and attraction ranking.
              </p>
            </div>

            {/* Triad of Algorithmic Implementation */}
            <div className="grid gap-4 sm:grid-cols-3 font-mono text-xs">
              <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-4 space-y-2">
                <span className="text-[10px] text-neutral-500 block uppercase">
                  Graph Traversal
                </span>
                <h3 className="text-white font-medium">Dijkstra&apos;s Algorithm</h3>
                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">
                  Shortest path route computation across multi-stop destination road networks.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-4 space-y-2">
                <span className="text-[10px] text-neutral-500 block uppercase">
                  Combinatorial DP
                </span>
                <h3 className="text-white font-medium">0-1 Knapsack</h3>
                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">
                  Optimal attraction selection maximizing trip value under explicit budget
                  constraints.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-4 space-y-2">
                <span className="text-[10px] text-neutral-500 block uppercase">
                  Data Structures
                </span>
                <h3 className="text-white font-medium">Heap Sort</h3>
                <p className="text-neutral-400 text-[11px] leading-relaxed font-sans">
                  Logarithmic attraction priority ranking and sorted destination dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs pt-1">
              <button
                type="button"
                onClick={() => handOffToIndex("atlas-journey-trip-planner")}
                className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
              >
                Inspect in 27-repo catalog ↓
              </button>
              <a
                href="https://github.com/ommd3076/atlas-journey-trip-planner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Repository ↗
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* 
        ACT 3: COMPLETE 27-REPOSITORY PUBLIC ARCHIVE
        Premotio-derived scale shift: Transition from deep stories into complete public ledger.
        Preserves all 27 public repos with search, category filtering, and reciprocal story links.
      */}
      <section
        id="catalog"
        className="px-6 py-24 md:py-36 border-t border-neutral-900 scroll-mt-12 bg-neutral-950/30"
      >
        <div className="mx-auto max-w-[960px] space-y-10">
          <div data-reveal className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block">
              Complete Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
              All 27 Public Repositories
            </h2>
            <p className="font-serif text-sm text-neutral-400 max-w-[680px] leading-relaxed">
              Every public repository published under{" "}
              <a
                href="https://github.com/ommd3076"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white underline underline-offset-2"
              >
                github.com/ommd3076
              </a>
              . Filter by category, search in real time, or link back to the stories above.
            </p>
          </div>

          {/* Search Bar & Architectural Category Filter Strip */}
          <div data-reveal className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 27 repositories by name, description, or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-xs text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3 font-mono text-xs text-neutral-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-3 py-1 font-mono text-[11px] transition-colors ${
                    selectedCategory === cat
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "border border-neutral-800/80 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-900">
              <span>
                Showing {filteredRepos.length} of {VERIFIED_PUBLIC_REPOS.length} verified
                repositories
              </span>
              <span>Host: github.com/ommd3076</span>
            </div>
          </div>

          {/* 27-Repository Architectural Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRepos.map((repo) => {
              const matchedStory = FEATURED_STORIES_LOOKUP[repo.name];
              const isHighlighted = highlightedRepo === repo.name;

              return (
                <article
                  key={repo.name}
                  id={`repo-${repo.name}`}
                  data-reveal
                  className={`group flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 ${
                    isHighlighted
                      ? "border-white bg-neutral-900 shadow-xl ring-1 ring-white/50"
                      : "border-neutral-800/80 bg-neutral-950/70 hover:border-neutral-700 hover:bg-neutral-900/50"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-850 pb-2.5">
                      <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                        {repo.category}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-400 rounded bg-neutral-900 px-2 py-0.5">
                        {repo.language}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-mono text-sm font-semibold text-white tracking-tight group-hover:text-neutral-100">
                        {repo.name}
                      </h3>
                      <p className="mt-2 font-sans text-xs text-neutral-400 leading-relaxed line-clamp-3">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-850 flex items-center justify-between font-mono text-xs">
                    {/* REVERSIBLE HAND-OFF LINK: Links back to featured domain story if matched */}
                    {matchedStory ? (
                      <button
                        type="button"
                        onClick={() => handOffToStory(matchedStory.anchorId)}
                        className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        ↑ Return to story
                      </button>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">
                        ★ {repo.stars} {repo.stars === 1 ? "star" : "stars"}
                      </span>
                    )}

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                    >
                      Repository ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
