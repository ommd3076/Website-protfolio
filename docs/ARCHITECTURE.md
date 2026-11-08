# System Architecture & Technical Specifications

**Subject**: Architecture, Routing, URL-Pinned State, and Defensive Layout Boundaries  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08 (Post Gemini 1–4 & Grok 1–5 Consultations)  
**Repository**: `portfolio-site`

---

## 1. High-Level System Architecture & Stack Decisions

The application strictly maintains its existing foundation: **TanStack Start** with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Nitro Server Engine**.

> [!IMPORTANT]
> **Stack Preservation (Rejection of Grok 1 Deviation)**: Early advice from Grok 1 suggested replacing the stack with alternative frameworks (e.g. Astro/Next.js) and stripping interactive cross-module links. **These deviations are rejected.** The existing TanStack Start + Nitro SSR pipeline is maintained, along with the connected list/diagram/telemetry explorer architecture confirmed in Grok 2.

```mermaid
flowchart TD
    subgraph BrowserClient [Client Browser Runtime]
        DOM[Hydrated React 19 Tree]
        URLState[URL Search Params ?project=...&node=...]
        Reducer[Deterministic State Reducer]
        Compositor[GPU Compositor Engine: GSAP / CSS]

        URLState <-->|Deep Link / Popstate| Reducer
        Reducer -->|Pinned State & Selection| DOM
        DOM -->|Action Dispatch: PIN / SELECT / HOVER| Reducer
        DOM -->|Compositor Tweens| Compositor
    end

    subgraph ServerRuntime [SSR & Nitro Engine]
        Nitro[Nitro Server Engine]
        SSR[TanStack Start SSR Route Tree]
        PublicDTO[Public DTO Projection Filter]

        PublicDTO -->|Sanitized Public Data Only| SSR
        Nitro --> SSR
    end

    SSR -->|Initial SSR HTML with Preserved Layout Slots| DOM
```

---

## 2. Directory Topology

```
portfolio-site/
├── .agents/                    # Agent-specific skill bindings (boardui, reui, rare-ui, ui-skills-root)
├── .mcp.json                   # Local MCP server bindings (reui, boardui, ui-skills, shadcn)
├── docs/                       # Single source of truth specifications
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── CODE_STYLE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── TESTING.md
│   ├── STATE_MACHINE.md
│   ├── COMPONENT_REGISTRY.md
│   └── ANTI_SLOP.md
├── mockup/                     # Reference static HTML/CSS implementations
├── public/                     # Static public assets (favicons, robots.txt)
├── src/
│   ├── assets/                 # SVGs, verified diagrams, artwork
│   ├── components/
│   │   ├── base/               # Low-level primitives (buttons, inputs)
│   │   ├── brand/              # Brand SVG lockups (Screenshot 2026-08-03 141135.svg)
│   │   ├── site/               # Structural chrome (HeaderBar, Chrome, Nav, GlobalCursor)
│   │   └── ui/                 # Installed UI primitives (shadcn, ReUI, Radix)
│   ├── data/                   # Typed static data & content schemas (Public DTOs)
│   ├── hooks/                  # Custom React hooks (usePrefersReducedMotion, useURLState)
│   ├── lib/                    # Core utilities & helpers (cx, public-dto-filter)
│   ├── routes/                 # TanStack file-based routing
│   │   ├── __root.tsx          # Root shell layout (<Outlet />, scroll restoration)
│   │   ├── index.tsx           # Home entrypoint & Connected Explorer
│   │   ├── work.tsx            # Selected work & verified deep dives
│   │   ├── about.tsx           # Engineering philosophy & now
│   │   └── contact.tsx         # Quiet, functional contact route
│   ├── styles/                 # Theme tokens, globals, typography
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── typography.css
│   ├── routeTree.gen.ts        # Auto-generated TanStack router tree (DO NOT EDIT MANUALLY)
│   ├── router.tsx              # Router instantiation & React Query wiring
│   ├── server.ts               # SSR entrypoint & CSP headers
│   ├── start.ts                # Server middleware & CSRF guards
│   └── styles.css              # Main Tailwind v4 stylesheet with @theme configuration
├── AGENTS.md                   # Runtime rules, Lovable bindings, and agent contracts
├── logger.md                   # Chronological immutable engineering ledger
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite 8 configuration with TanStack Start plugin
```

---

## 3. URL-Pinned State Architecture (Gemini 1 & 2 Synthesis)

Rather than maintaining disconnected ephemeral state, the interlinked explorer links URL search parameters with a centralized reducer:

1. **URL as Ground Truth for Pinned Elements**:
   - The query string (`?project=<slug>&node=<nodeId>`) represents the canonical pinned selection.
   - Deep linking is supported: visitors landing with query params immediately hydrate into the pinned view.
   - Browser back/forward navigation (`popstate`) restores pinned state predictably without page reloads.
2. **Transient vs. Pinned State**:
   - `hoveredId` is strictly transient, unpinned, and debounced (40ms). It does **not** update URL parameters.
   - `focusedId` / `pinnedId` requires an explicit user action (click or keyboard Enter/Space), updating the URL and pinning the connected modules.
   - Pinned state has strict priority over transient hover state.

---

## 4. Defensive Layout Bounding & Motion Isolation

> [!NOTE]
> **Withdrawal of Unsupported "Guaranteed Zero CLS" Claims**:
> Per Gemini 2 corrections, claiming a "guaranteed 0.00 CLS" as a magic fact is withdrawn. Layout stability is not achieved by fiat; it requires **defensive layout bounding**:
>
> - Reserving explicit aspect ratios (`aspect-video`, `aspect-[1.55]`) or min-heights on image/diagram containers before assets load.
> - Using stable CSS Grid layouts where columns and rows do not shift dimensions when content expands or switches states.
> - Preventing text clipping: containers must not use aggressive `overflow: hidden` that truncates dynamic text at varied font zoom levels.

### Motion Rules & Animation Engine Arbitration (Gemini 5 Conflict Prevention)

> [!NOTE]
> **Attribution Correction**: Gemini 5 did **not** recommend introducing Framer Motion (which was pre-installed in `package.json` ^12.43.0). Gemini 5's advice strictly addressed **preventing conflicting writes** between animation engines. The primary motion engine remains GSAP for timelines and SVG transforms, with CSS transitions for micro-interactions.

1. **Compositor-Only Animations**: Only animate `transform`, `opacity`, and GPU-composited SVG properties. Avoid animating layout-triggering properties (`width`, `height`, `margin`, `top`, `left`).
2. **Prevent Conflicting Writes**: Never attach both a GSAP tween and a CSS transition or other animation runner to the exact same DOM property on a single node.
   - **GSAP**: Primary authority for multi-step timelines, load sequences, and SVG coordinate transformations.
   - **CSS Transitions**: Primary authority for low-overhead interactive micro-interactions (hover, focus color shift, button active states).
3. **Pure Factual SVGs**: All architectural diagrams (e.g. PRISM system shape) must be authored as factual SVGs matching typed graph contracts, with real text nodes rather than outlined path vectors.
4. **Lifecycle Cleanup**: Every GSAP context or animation subscription must revert cleanly on unmount (`ctx.revert()`).
5. **Reduced-Motion Fallback**: When `prefers-reduced-motion: reduce` is detected, animations bypass timeline execution and resolve immediately to final rest states.

---

## 5. Performance Targets & Budgets

| Metric                              | Target Budget       | Enforcement Mechanism                                                   |
| ----------------------------------- | ------------------- | ----------------------------------------------------------------------- |
| **First Contentful Paint (FCP)**    | `< 0.9s`            | Pure semantic SSR HTML output via Nitro                                 |
| **Largest Contentful Paint (LCP)**  | `< 1.4s`            | Prioritize text content over heavy imagery; lazy-load secondary visuals |
| **Cumulative Layout Shift (CLS)**   | `< 0.05`            | Defensive CSS Grid and container size reservations                      |
| **Interaction to Next Paint (INP)** | `< 50ms`            | Zero synchronous heavy computation on main thread                       |
| **Frame Stability**                 | Smooth 60fps/120fps | Compositor-driven transforms, zero layout thrashing                     |

---

## 6. Zero Band-Aid Engineering Guardrails

1. **No Stacking Hacks**: Never use `!important`, arbitrary `z-[9999]`, or indiscriminate `overflow-hidden` to mask layout collisions.
2. **Preserve Readable Content**: Never allow motion or decorative frames to clip or hide primary readable text.
