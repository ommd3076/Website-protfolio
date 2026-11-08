# Component & Tool Registry

**Subject**: Inventory of Installed Primitives, Candidate Library Audit, and License/Compatibility Verification  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08 (Post Gemini 1–5 & Grok 1–5 Consultations)  
**Repository**: `portfolio-site`

---

## 1. Local-First Component Strategy (Grok 3 & Gemini 5 Synthesis)

> [!IMPORTANT]
> **Evaluate Existing Primitives First**:
> Both Grok 3 and Gemini 5 recommend maximizing existing installed primitives before adding new packages. All advisor claims regarding package bundle sizes, API semantics, and live visual baselines are treated as proposed hypotheses requiring independent verification, not established facts.

### 1.1 Installed Primitives & Independent License/Version Audit

| Library                                 | Installed Version | License                        | Source / Repository       | React 19 / SSR Compatibility                                     | Architectural Role                                                                  |
| --------------------------------------- | ----------------- | ------------------------------ | ------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **`react-aria-components`**             | `^1.17.0`         | Apache 2.0                     | `@adobe/react-aria` (npm) | Compatible (resolve `exactOptionalPropertyTypes` in `input.tsx`) | WAI-ARIA accessible single-select listbox, keyboard focus, screen-reader semantics. |
| **`@radix-ui/react-*`**                 | `^1.1.x – ^2.2.x` | MIT                            | Radix Primitives (npm)    | Compatible with React 19                                         | Headless accessible UI primitives (Dialog, Popover, Tabs, Separator, Tooltip).      |
| **`gsap`**                              | `^3.15.0`         | GreenSock Standard (No-charge) | GreenSock (npm)           | Client-side only (requires `useEffect` / `gsap.context`)         | Targeted GPU-compositor animations and SVG timeline coordination.                   |
| **`framer-motion`**                     | `^12.43.0`        | MIT                            | Motion Division (npm)     | Compatible with React 19                                         | Component presence/exit transitions and layout morphing.                            |
| **`lenis`**                             | `^1.3.25`         | MIT                            | Studio Freight (npm)      | Client-side only                                                 | Smooth scroll progressive enhancement.                                              |
| **`recharts`**                          | `^2.15.4`         | MIT                            | Recharts (npm)            | Compatible                                                       | SVG charting primitives for verified telemetry data.                                |
| **`boardui`**                           | `^0.5.9`          | MIT                            | BoardUI (npm & MCP)       | Compatible with Tailwind v4                                      | High-density dashboard cards, telemetry blocks, and tabular data displays.          |
| **`lucide-react` / `@remixicon/react`** | Current           | ISC / Apache 2.0               | Lucide / Remix (npm)      | Compatible                                                       | Crisp, minimal SVG icons.                                                           |

---

## 2. Animation Engine Arbitration: Preventing Conflicting Writes (Gemini 5 Advice)

> [!NOTE]
> **Attribution Correction**: Gemini 5 did **not** recommend introducing Framer Motion (which was pre-installed in `package.json`). Gemini 5's advice addressed **preventing conflicting writes** between animation engines. The primary motion engine remains GSAP for coordinate timelines, with CSS transitions for micro-interactions.

When multiple animation tools coexist (`gsap`, CSS transitions, pre-installed `framer-motion`), conflicting simultaneous writes to the same DOM properties cause frame drops, jitter, and layout thrashing.

### Binding Arbitration Rules

1. **Single Engine Authority per Element**:
   - Never attach both a GSAP tween and a CSS transition (or other animation runner) to the same property (`transform`, `opacity`) on the same DOM node.
2. **Engine Division of Labor**:
   - **GSAP**: Owns complex multi-step timelines, fine-pointer canvas/SVG orbit coordinates, and load sequences.
   - **CSS Transitions**: Owns low-overhead micro-interactions (hover color shift, button active state).

---

## 3. Candidate UI Libraries Independent Audit & Disambiguation

The prompt and bookmarks referenced several candidate UI tools. Each has been independently audited from primary upstream sources:

> [!WARNING]
> **Component Disambiguation Guardrails**:
>
> - **Raylight ≠ Ray UI**: `https://www.raylight.app/community/templates` is a community video/motion template platform, **not** a UI library called "Ray UI". Ray UI remains unverified and uninstalled.
> - **Originkit ≠ Origin UI**: `https://www.originkit.dev/` is a distinct free animated component library, **not** Origin UI (`originui.com`). Origin UI is not in the bookmarks and remains unverified and uninstalled.

| Candidate Tool       | Verified Upstream URL / Model                                             | License | Dependencies / Requirements                                     | Provenance & Audit Finding                                                                                                             |
| -------------------- | ------------------------------------------------------------------------- | ------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **EvilCharts**       | `https://evilcharts.com/docs/echarts/area-chart/blocks` (shadcn registry) | MIT     | Wraps Recharts / ECharts (`recharts` ^2.15.4 already installed) | **No package install needed.** Primitives can be rendered directly using existing Recharts and semantic Tailwind tokens.               |
| **Animate UI**       | `https://animate-ui.com/docs/components/buttons/liquid` (shadcn registry) | MIT     | Motion + Tailwind (`@animate-ui/...`)                           | Verified liquid button physics (0.3s delay, spring press `stiffness: 550, damping: 30`). Discrete component addition only if verified. |
| **BoardUI**          | `https://www.boardui.com/` (npm `boardui@0.5.9`)                          | MIT     | React v19.2, Tailwind v4, React Aria v1.17                      | Already configured in `.mcp.json` and local `.agents/skills/boardui`. Approved for telemetry and tabular data displays.                |
| **KokonutUI**        | `https://kokonutui.com/` (shadcn registry)                                | MIT     | Tailwind + Motion + Lucide                                      | Single-file component registry. Inspected live from bookmarks. No package install needed.                                              |
| **Aceternity UI**    | `https://ui.aceternity.com/` (shadcn registry)                            | MIT     | Tailwind + Motion                                               | Copy-paste landing page components. Evaluated from bookmarks; uninstalled.                                                             |
| **React Bits**       | `https://reactbits.dev/` (shadcn / copy-paste)                            | MIT     | Plain CSS / Tailwind / Canvas                                   | Animated backgrounds & strands. Evaluated from bookmarks; uninstalled.                                                                 |
| **Rare UI**          | `https://www.rareui.com/components` (Local Agent Skill)                   | N/A     | React + Tailwind                                                | Already present locally in `portfolio-site/.agents/skills/rare-ui`.                                                                    |
| **Cult UI / Bot UI** | Copy-paste registry (Not on npm)                                          | MIT     | Framer Motion + Tailwind                                        | Existing Radix and Tailwind components cover required states; uninstalled.                                                             |
| **Ray UI**           | Unverified candidate (Not Raylight)                                       | Unknown | Unknown                                                         | **Unverified & uninstalled.** (Do not conflate with Raylight template platform).                                                       |
| **Origin UI**        | Independent library (`originui.com`, Not Originkit)                       | MIT     | Radix + Tailwind                                                | **Unverified & uninstalled.** (Do not conflate with Originkit).                                                                        |
| **Magic UI**         | `https://magicui.design/` (shadcn registry)                               | MIT     | Framer Motion + Tailwind                                        | Evaluated candidate; uninstalled.                                                                                                      |

---

## 4. MCP Server Inventory & Capabilities

| MCP Server Name         | Configuration / Endpoint        | Status in Workspace       | Capabilities & Tools                                                                                                                                           |
| ----------------------- | ------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ui-skills**           | `https://www.ui-skills.com/mcp` | Connected & Active        | `list_skills`, `get_skill`. 712 UI skills available in registry (e.g. `ibelick-baseline-ui`, `mengto-animation-systems`, `mengto-gsap`, `mengto-tailwindcss`). |
| **boardui**             | `npx -y boardui@latest mcp`     | Registered in `.mcp.json` | Dashboard, chart card, AI chat, form, and table primitives.                                                                                                    |
| **reui**                | `https://mcp.reui.io/api/mcp`   | Registered in `.mcp.json` | ReUI component primitives built on shadcn/ui.                                                                                                                  |
| **shadcn**              | `npx -y shadcn@latest mcp`      | Registered in `.mcp.json` | Official shadcn/ui CLI & component scaffolding.                                                                                                                |
| **StitchMCP / stitch**  | Local MCP                       | Connected                 | Screen generation, design MD upload, design system creation.                                                                                                   |
| **sequential-thinking** | Local MCP                       | Connected                 | Structured multi-step reasoning.                                                                                                                               |

---

## 5. Pure Factual SVGs & Asset Integrity (Gemini 5)

All diagrammatic assets (e.g. PRISM architecture diagram, system pipeline flows) must be **pure factual SVGs** derived directly from verified system structures:

- No speculative, decorative faux-architecture diagrams.
- Node coordinates and edge paths must match the typed graph definitions in `docs/DATABASE.md`.
- Vector artwork must render semantic text elements rather than outlined path vectors to maintain accessibility and screen-reader legibility.

---

## 6. Audited & Verified Skills Registry

Following the advisor synthesis and explicit project requirements, the requested skills were verified against the `ui-skills` registry and local capabilities:

| Skill                         | Source / Registry                                                                               | License                   | Local Installation Path                                                                                   | Operational & Tooling Status                                                                                                                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`impeccable`**              | `ui-skills: pbakaus/impeccable` (Paul Bakaus)                                                   | Apache 2.0                | `.agents/skills/impeccable/SKILL.md`<br>`portfolio-site/.agents/skills/impeccable/SKILL.md`               | **Verified & Installed** (12,720 bytes). Authentic upstream text. Operates directly on `docs/PRD.md` and `docs/DESIGN_SYSTEM.md`.                                                                                     |
| **`no-ai-design-slop`**       | `ui-skills: mengto/no-ai-design-slop` (Meng To)                                                 | Author / MIT              | `.agents/skills/no-ai-design-slop/SKILL.md`<br>`portfolio-site/.agents/skills/no-ai-design-slop/SKILL.md` | **Verified & Installed** (4,778 bytes). Passive quality gate for visual restraint and anti-slop enforcement.                                                                                                          |
| **`boardui`**                 | npm `boardui@0.5.9` / `npx boardui`                                                             | MIT                       | `.agents/skills/boardui/`<br>`portfolio-site/.agents/skills/boardui/`                                     | **Verified & Installed** (v2026.11.1). Complete with `references/components.md`, `motion.md`, `patterns.md`, `theming.md`. MCP registered.                                                                            |
| **`rare-ui`**                 | GitHub `@rare-ui` (`swamimalode07/rare-ui`)                                                     | MIT                       | `portfolio-site/.agents/skills/rare-ui/SKILL.md`                                                          | **Verified & Configured** in `components.json`. Component registry for animated shadcn React components.                                                                                                              |
| **`reui`**                    | ReUI System (`https://mcp.reui.io`)                                                             | Proprietary / Free blocks | `portfolio-site/.agents/skills/reui/SKILL.md`                                                             | **Verified & Installed** (v`68f0e6fa91`). Complete with 13 rule docs in `rules/` and `agents/openai.yaml`. MCP registered in `.mcp.json`.                                                                             |
| **`ui-skills-root`**          | `npx ui-skills` (author: `ibelick`)                                                             | MIT                       | `.agents/skills/ui-skills-root/SKILL.md`                                                                  | **Verified & Installed** (v1.0.0). Routing layer for the 712-skill design engineering registry.                                                                                                                       |
| **Font & Textural Animation** | Evaluated: `jakubkrehel/better-typography`, `greensock/gsap-core`, `arla6ka/kinetic-typography` | Varied                    | Pre-installed `gsap@^3.15.0`                                                                              | **Verified**. Advisor consensus (Gemini 2 & 5, Grok 3): Do NOT install duplicate animation packages. Rely on pre-installed GSAP + CSS transforms for micro-interactions without font-weight layout shift or CLS.      |
| **Image / GIF Generation**    | Evaluated: `image-generator` subagent (Gemini API), `mengto/html-demo`, `ezgif.com`             | Official Plugin / MIT     | Active in environment (`image-generator` subagent)                                                        | **Verified**. Advisor consensus: Prefer lightweight native SVG + CSS mockups over heavy GIF/MP4 videos to ensure instant loading; utilize `image-generator` subagent for high-fidelity visual generation when needed. |

---

## 7. `@gsap/react` Documentation Verification & Dynamic Component Primitives

### 7.1 Verified `@gsap/react` Architecture & Teardown Protocol

- **`useGSAP` Lifecycle Semantics**:
  - In `@gsap/react`, passing dependencies (`dependencies: [selectedId]`) **does not** automatically revert active timelines upon dependency updates unless `revertOnUpdate: true` is explicitly configured in the options object:
    ```typescript
    useGSAP(
      () => {
        // Animation logic
      },
      { scope: containerRef, dependencies: [selectedNode], revertOnUpdate: true },
    );
    ```
  - When utilizing core `gsap.context()` inside standard React `useEffect`:
    ```typescript
    useEffect(() => {
      const ctx = gsap.context(() => {
        // Timeline execution
      }, containerRef);
      return () => ctx.revert(); // Full scoped teardown
    }, [selectedNode]);
    ```
- **Limitations of `contextSafe`**:
  - `contextSafe` attaches asynchronous or event-driven tweens to the parent `gsap.context()` so they can be cleaned up on unmount.
  - **Critical Boundary**: `contextSafe` **does not** clean up native DOM listeners (`window.removeEventListener`) or cancel active `requestAnimationFrame` handles. All native listeners, resize observers, and RAF callbacks must be explicitly detached in the effect cleanup return function.

### 7.2 Dynamic Component Primitives for Connected Project Explorer

1. **Selection Geometry Handshake (`SelectionHandshake`)**:
   - Manages coordinates between project list items and diagram nodes.
   - Starting motion hypothesis: ~280ms `power2.out`.
   - Mounts authoritative React state and accessible text synchronously; tweens presentation layers (`opacity`, `transform`, `clipPath`).
2. **List-to-Diagram Tether (`ListDiagramTether`)**:
   - Renders a delicate SVG connecting line between the selected list item and active diagram node.
   - Monitors drift on viewport resize or scroll: if drift exceeds 8px, re-measures coordinates via RAF or gracefully dismisses (`opacity: 0`).
   - Connects only to authentic, verified DOM elements.
3. **Factual Architecture Node (`FactualDiagramNode`)**:
   - Pure SVG/DOM card rendering verified system components (PRISM, Cerenetics, QpiAI Opt / QCloud).
   - Pre-allocated bounding boxes for layout shift prevention (`contain: layout style`).
