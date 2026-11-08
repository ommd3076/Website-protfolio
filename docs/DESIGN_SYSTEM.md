# Design System & Typographic Specification

**Status:** Active Design System Specification  
**Updated:** 2026-11-08  
**Project:** `portfolio-site` (`https://github.com/ommd3076/Website-protfolio.git`)

---

## 1. Visual Reference Ground Truth & Page-Local Allocations

The portfolio enforces strict page-local reference boundaries across its **exactly five distinct public routes**:

1. **`/` (Home)**: Independent minimal design. Pure black `#000000` canvas, small italic serif display name (_"Om M. Doddamani"_), compact verified serif bio, and a quiet independent navigation rail. Zero marketing clutter, zero Premotio motion.
2. **`/work` (Work)**:
   - **`Premotio`**: Informs the staged narrative mechanism strictly on `/work` (breadth framing $\rightarrow$ active tile untwists and docks beside repo narrative $\rightarrow$ reversible hand-off into complete 27-repo searchable index). Premotio has **no role** on any other route.
   - **`contentarchitecture.dev`**: Informs information architecture, disciplined domain categorization, and taxonomy.
   - **`datacurve.ai`**: Informs technical typography, monospace metadata tags, and specification presentation rows.
3. **`/about` (About)**:
   - **Screenshot 1 (`image-1.png`) & Ethiack cue**: Bounded dark scanner frame (`#0a0a0c`) with hairline `+` crosshair corners, housing an authored 3-plane isometric layered systems lattice (`DeterministicPixelParticles`) as the visual center, paired with a compact factual bio.
4. **`/notes` (Notes)**:
   - **`ellipsus.com`**: Informs `/notes` exclusively (warm literary editorial serif typography on dark `#000000` canvas, wide line height, quiet margins, distraction-free reading cadence).
5. **`/contact` (Contact)**:
   - **Screenshot 2 (`image-2.png`)**: Centered light/ceramic card (`bg-[#fbfbfa] text-neutral-900`) floating on dark canvas, restrained monogram fallback portrait slot (`OM`), verified name, and direct email action (`ommd3076@gmail.com`).

> [!IMPORTANT]
> UI components and skills are implementation craft tools, NOT visual references or volume targets. All 27 verified public repositories on GitHub (`@ommd3076`) are indexed on `/work`. Private repository names and unverified claims are strictly prohibited. Codex does not write or modify application code; Antigravity is the sole code author.

---

## 2. Typography & Role Assignments

The typography system uses standard semantic tokens and clean CSS variables:

| Role                     | Font Family                               | Size / Leading        | Target Elements & Context                                         |
| ------------------------ | ----------------------------------------- | --------------------- | ----------------------------------------------------------------- |
| **Display Name**         | Serif Italic (`font-serif italic`)        | 24px–28px / 1.2       | Homepage name header (_"Om M. Doddamani"_).                       |
| **Section Headings**     | Serif Regular (`font-serif`)              | 28px–48px / 1.1       | Page headers on `/work`, `/about`, `/notes`, `/contact`.          |
| **Subheadings & Titles** | Serif Medium (`font-serif font-medium`)   | 16px–20px / 1.3       | Featured project titles, domain headers, card titles.             |
| **Primary Body**         | Serif (`font-serif`) / Sans (`font-sans`) | 13.5px–15px / 1.6–1.7 | Biographical paragraphs, project descriptions, essay prose.       |
| **Metadata & Labels**    | Monospace (`font-mono`)                   | 10px–11px / 1.4       | Numbers (`01`), taxonomy chips, repository languages, timestamps. |
| **UI Controls**          | Sans (`font-sans`) / Mono (`font-mono`)   | 12px–13px / 1.2       | Buttons, filter chips, navigation dock glyphs, copy trigger.      |

---

## 3. Color Palette & Surface Tokens

All surfaces and text values use high-contrast, accessible neutral tones:

- **Background Canvas**: `bg-black` (`#000000`).
- **Surface Elevation 1**: `bg-neutral-950/80` with `backdrop-blur-sm` and `border border-neutral-800`.
- **Surface Elevation 2**: `bg-neutral-900` with `border border-neutral-700` (for active/selected states).
- **Ceramic Card (Contact)**: `bg-[#fbfbfa]` with `text-neutral-900` and `border border-neutral-200/80`.
- **Scanner Surface (About)**: `bg-[#0a0a0c]` with `border border-neutral-800/80` and hairline crosshairs.
- **Text Primary**: `text-white` (`#ffffff`) for display titles and active selections.
- **Text Secondary**: `text-neutral-300` / `text-neutral-400` for body copy, notes, and descriptions.
- **Text Muted**: `text-neutral-500` for monospace metadata, numbering, and timestamps.
- **Dividers & Rules**: `border-neutral-800` / `border-neutral-900` (subtle hairline rules).
- **Interactive Focus**: `focus-visible:ring-1 focus-visible:ring-white/40` with `outline-none`.

---

## 4. Motion Contract (GSAP Exclusivity)

Animation is governed strictly by the project's single motion engine: **GSAP** (`gsap`, `@gsap/react`). Competing animation libraries (such as `framer-motion` or `motion/react`) are prohibited in the runtime bundle.

### Core Motion Rules:

1. **Critically Damped Easings**:
   - Standard easings: `power2.out`, `power3.out`.
   - **Banned**: Overshoot, bounce, or cartoonish physics (`back.out`, `elastic.out`).
2. **Deterministic Durations**:
   - Micro-interactions (hover, focus): 150ms–200ms.
   - Selection transitions (domain story change): 200ms–280ms.
   - Route reveals: 300ms–450ms.
3. **No Layout Property Animations**:
   - Only GPU-accelerated transforms (`opacity`, `transform: translate3d`) are animated.
   - Never animate `width`, `height`, `margin`, `padding`, or `top/left`, which trigger browser reflow.
4. **Lifecycle & Interruption Safety via `@gsap/react` (`useGSAP`, `contextSafe`)**:
   - All component animations across the portfolio use the official `@gsap/react` package with `useGSAP` and `contextSafe`.
   - `revertOnUpdate: false` ensures teardown-only context reversion; mid-selection updates do not snap mid-flight.
   - Stable mutable interaction target (`perturbTarget.current`) with `overwrite: "auto"` eliminates orphaned tweens.
   - Backing GPU store released on unmount via canvas dimension zeroing.
5. **No-Idle-Loop Contract**:
   - Particle canvases and tweens must cease drawing once particles reach their equilibrium rest coordinates. Continuous RAF render loops are prohibited.
6. **Reduced Motion Compliance**:
   - All animations query `prefersReduced()` (evaluating `@media (prefers-reduced-motion: reduce)`).
   - Under reduced motion, state updates and DOM presentations occur instantly (duration: 0, zero transforms, static settled structures).

---

## 5. Shipped Architecture & Component Roles

The portfolio mounts lightweight, accessible components across its five routes:

1. **Global Chrome (`src/routes/__root.tsx`)**:
   - `NavigationDock`: Quiet, icon-only far-left rail on desktop (`fixed left-5 top-1/2 -translate-y-1/2`), compact bottom strip on mobile (`fixed bottom-5 left-1/2 -translate-x-1/2`).
   - Custom geometric engineering SVG glyphs (`GlyphHome`, `GlyphWork`, `GlyphAbout`, `GlyphNotes`, `GlyphContact`), thin hairline active marker, 44px hit targets, accessible tooltips.
   - Accessible skip link (`#main-content`) and `<Outlet />`.
2. **Home (`src/routes/index.tsx`)**:
   - Centered narrow italic-serif identity lockup and concise verified bio.
3. **Work (`src/routes/work.tsx`)**:
   - Staged narrative mechanism: Breadth framing $\rightarrow$ 4 verified featured domain stories with interactive untwisting and docking $\rightarrow$ reversible hand-off into complete 27-public-repo searchable index with category filters and reverse hand-off.
4. **About (`src/routes/about.tsx`)**:
   - Bounded scanner frame with crosshair corners housing `DeterministicPixelParticles` (3-plane isometric lattice) and concise verified bio.
5. **Notes (`src/routes/notes.tsx`)**:
   - Ellipsus-style editorial essay on instruments, calculus, and engineering capability.
6. **Contact (`src/routes/contact.tsx`)**:
   - Centered light ceramic card with monogram fallback, verified identity, and direct email action (`CopyButton`).

---

## 6. Honest Data States & Primary-Source Evidence

1. **Zero Hallucinated Metrics**: No synthetic benchmarks, fake CGPAs, or unverified performance claims.
2. **Zero Fabricated Projects**: All 27 repositories in `src/data/repos.ts` correspond 1:1 with verified public GitHub repositories of `@ommd3076`.
3. **Featured Stories Directly Backed by Verified Repositories**:
   - Quantum ML Logistics: `silver-computing-machine` (DebugLeaf / Q-VANTIS, Quant-A-Maze 3.0).
   - On-Device Multimodal AI: `fluffy-couscous` (AR Portal, MediaPipe Tasks Vision).
   - Autonomous Robotics / Multi-Agent: `SIH-123` (Distributed Predictive Fleet Graph, 10 AMRs).
   - Software Systems & Algorithmic Foundations: `atlas-journey-trip-planner` (DAA Project: Dijkstra, Knapsack, Heap Sort).
4. **Two-Way Reversible Hand-Off**:
   - From featured story: "Inspect in 27-Repo Index ↓" smooth scrolls to and highlights `#repo-<name>` in the public catalog.
   - From catalog card: "↑ View Domain Story" smooth scrolls back to `#featured-stories` and selects the corresponding domain story.
