# State Machine Specification

**Status:** Active Implementation Specification
**Updated:** 2026-11-08
**Project:** `portfolio-site` (`https://github.com/ommd3076/Website-protfolio.git`)

---

## 1. State Architecture Overview

State management across the portfolio is strictly deterministic, predictable, and decoupled from presentation animation:

```
[User Interaction / URL Param]
              │
              ▼
   [Deterministic Reducer / Route State] ──(Synchronous Commit)──► [DOM & ARIA Update]
              │                                                            │
              ▼                                                            ▼
   [GSAP Presentation Handshake] (200-280ms)                      [Assistive Tech & Screen Readers]
   (power3.out, scoped to context, revertable)
```

1. **State Ownership**: Routes manage their own interactive state without global mutable state stores.
2. **Synchronous React Commit**: ARIA attributes (`aria-selected`, `aria-activedescendant`, `aria-pressed`) and DOM text nodes update synchronously without waiting for motion timelines.
3. **Fail-Closed Validation**: Selection requests for non-existent projects or invalid nodes fallback safely to default valid states.

---

## 2. Route-Level State Machines

### A. Homepage (`/`) — Quiet Editorial Anchor (Zero Interactive State)

- **Visual Role**: Strict visual ground truth matching `image-1.png`.
- **State Model**: Zero runtime state. No URL search parameters, no reducer, no client-side interactive state machines.
- **Rendering**: Pure static SSR HTML delivering a quiet, serene introduction (540px centered column, italic serif name, compact serif biography, verified public profile links with copy interaction).

### B. Work Explorer (`/work`) — URL-Pinned State Machine & Deterministic Reducer

- **State Source**: TanStack Router Search Parameters (`project`, `category`, `node`).
- **Validation**: Schema-validated via Zod:
  ```typescript
  const workSearchSchema = z.object({
    category: z.enum(["all", "research", "systems", "retrospectives"]).optional(),
    project: z.enum(["prism", "drl", "cerenetics", "eva"]).optional(),
    node: z.string().optional(),
  });
  ```
- **State Model**:
  ```typescript
  type FilterCategory = "all" | "research" | "systems" | "retrospectives";

  interface WorkState {
    category: FilterCategory;
    projectId: ProjectId;
    nodeId: string;
  }
  ```
- **Action Set**:
  - `set-category`: Computes filtered subset. If currently selected project remains visible within the category, its selection is preserved; otherwise, switches to the first project of the new category. Synchronizes `category` search param in URL.
  - `select-project`: Validates `projectId` against `FACTUAL_PROJECTS`. Sets active node to the project's primary node. Synchronizes `project` search param in URL.
  - `select-node`: Validates that `nodeId` belongs to the currently active project. Synchronizes `node` search param in URL.
- **Fail-Closed Invariants**:
  - Category filters are exhaustive; each current category maps to at least one valid project.
  - Active node is guaranteed to belong to the active project.
  - Invalid URL parameters fail closed safely to defaults (`project: "prism"`, `category: "all"`).
- **Browser History Integration**:
  - Pushed to browser history stack via TanStack Router `navigate({ search: ... })`; supports standard browser Back and Forward navigation without state desynchronization.
  - Tested and verified isolated deterministic sequence: Initial P1 (`prism`, `search=""`, `histLen=2`) → Click P2 (`drl`, `search="?project=drl"`, `histLen=3`) → Click P3 (`cerenetics`, `search="?project=cerenetics"`, `histLen=4`) → Back P2 (`drl`, `search="?project=drl"`, `histLen=4`) → Back P1 (`prism`, `search=""`, `histLen=4`) → Forward P2 (`drl`, `search="?project=drl"`, `histLen=4`).
  - Explicit changed selections push new history entries; default URL normalization uses replace (`{ replace: true }`); popstate URL synchronization updates local reducer state only and never invokes push/navigate.

### C. About Route (`/about`) — Accessible Tab Machine

- **State Model**: Single active tab identifier (`education`, `founder`, `research`, `philosophy`, `elsewhere`).
- **Keyboard Contract**:
  - `ArrowLeft` / `ArrowRight`: Moves focus and activates adjacent tab with cyclic wrap.
  - `Home` / `End`: Activates first or last tab.
- **Motion Decoupling**: Tab panel reveal uses a lightweight GSAP opacity/translate fade with reduced-motion bypass.

### D. Global Command Palette (`⌘K`) State Machine

- **State Model**: `isOpen: boolean`, `query: string`, `selectedIndex: number`.
- **Trigger**: Global `⌘K` or `Ctrl+K` keydown listener; mobile header icon button.
- **Keyboard Contract**:
  - `Escape`: Closes modal and returns focus to previous active element.
  - `ArrowDown` / `ArrowUp`: Navigates through filtered commands with cyclic modulo index wrapping.
  - `Enter`: Executes selected command handler (`navigate(...)`) and immediately closes modal.
- **Accessibility**: Standard WAI-ARIA modal dialog (`role="dialog"`, `aria-modal="true"`, `aria-label="Command Palette"`), auto-focus on input, background backdrop blur with click-outside dismissal.

---

## 3. Keyboard Navigation Specification (WAI-ARIA Single-Select Listbox)

The `ProjectExplorer` implements standard WAI-ARIA Listbox semantics:

- `role="listbox"` on container with `aria-label="Selected projects"`.
- `aria-activedescendant="option-{selectedId}"` dynamically updated.
- Each item: `role="option"`, `aria-selected={isSelected}`.
- Key bindings:
  - `ArrowDown`: Selects next project in list (wraps around).
  - `ArrowUp`: Selects previous project in list (wraps around).
  - `Home`: Selects first project (`01 PRISM`).
  - `End`: Selects last project (`04 EVA`).

---

## 4. GSAP Presentation Handshake & Lifecycle Safety

1. **Context Scoping & Teardown-Only Reversion via `@gsap/react` (`useGSAP`, `contextSafe`)**:
   - The animation lifecycle is managed directly by `@gsap/react`'s official `useGSAP` hook, providing automatic SSR-safe cleanup without manual isomorphic layout effects.
   - **Teardown-Only Reversion**: Configured with `{ revertOnUpdate: false }`. Reversion occurs **strictly on component teardown (unmount)**. Mid-selection dependency updates do NOT trigger context reversion, preventing mid-flight snaps to CSS initial state.
   - **Event Safety via `contextSafe`**: Interactive selection handlers (`handleProjectSelect`, `handleNodeSelect`, `handleTabSelect`) and retargeting tweens are wrapped with `contextSafe` to guarantee that all spawned animations belong to the scoped context.
2. **Rapid Retargeting & Interruption Safety (60ms Cycling)**:
   - When `selectedId` or `activeNodeId` changes rapidly, the component calls `gsap.killTweensOf([diagram, ...nodes])` to kill only the active target tweens while **preserving current inline transforms and opacity**.
   - The new animation glides smoothly from the preserved mid-flight position to the new target using `timeline.to(diagram, ...)` and a subtle relative node reveal, avoiding visual snapping or transform stacking.
   - Verified via automated 60ms click cycling across `["drl", "cerenetics", "eva", "prism"]`, settling cleanly without transform collisions.
3. **Select-Only SVG Tether Contract**:
   - Connects the actively selected listbox item to the active node in the detail panel.
   - **Hidden at narrow widths**: When viewport width is <768px (or elements stack vertically where `endX <= startX + 16`), the tether is completely hidden (`opacity: 0` in JS and CSS `hidden md:block`).
   - **Hidden during active scroll**: On `scroll` events, tether opacity is immediately set to `0` to prevent visual drift or jitter while the page is in motion.
   - **Settled re-display**: Once scrolling stops and coordinates stabilize (debounced at 120ms), the tether measures container-relative coordinates and smoothly fades back in (`opacity: 0.45`).
   - **Window resize**: Handled via throttled `requestAnimationFrame` recalculating the cubic bezier curve `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`.
   - **Reduced motion**: Completely hidden when `prefersReduced()` is active.
