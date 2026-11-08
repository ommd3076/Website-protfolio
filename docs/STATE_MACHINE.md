# State Machine Specification

> [!IMPORTANT]
> **Five-Route Architecture & Page-Local Reference Boundaries**:
> The portfolio is strictly structured across **exactly five distinct public routes** (`/`, `/work`, `/about`, `/notes`, `/contact`).
> Antigravity is the sole code author and implementer. Codex does not write or modify application code.
> **Page-Local Reference Allocations**:
>
> - **`Premotio`**: Staged narrative mechanism strictly on `/work` (breadth framing $\rightarrow$ active tile untwists and docks $\rightarrow$ reversible hand-off to 27-repo catalog). Premotio must **never** influence Home, dock, global chrome, About, Notes, or Contact.
> - **`contentarchitecture.dev`**: Informs `/work` information architecture and taxonomy.
> - **`datacurve.ai`**: Informs technical typography and specification presentation.
> - **`ellipsus.com`**: Informs `/notes` exclusively (warm literary serif typography, dark canvas, quiet reading cadence).
> - **`Screenshot 1 & Ethiack cue`**: Informs `/about` exclusively (bounded scanner frame with crosshairs, deterministic pixel particle lattice, factual bio).
> - **`Screenshot 2`**: Informs `/contact` exclusively (centered light/ceramic card on dark canvas, monogram fallback, direct email action).

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

## 2. Route & Section State Models (Five Routes)

### A. Homepage (`/`) — Ultra-Minimal Centered Identity Anchor

- **Visual Role**: Pure minimalist typographic anchor. Centered narrow italic-serif name (_"Om M. Doddamani"_), compact verified bio, and quiet independent navigation dock. Zero marketing clutter, zero project lists, zero Premotio motion.
- **State Model**: Zero redundant state. Pure semantic SSR HTML rendering.
- **Navigation Dock**: Custom geometric engineering SVG glyphs (`GlyphHome`, `GlyphWork`, `GlyphAbout`, `GlyphNotes`, `GlyphContact`), thin hairline active marker, 44px hit targets, accessible tooltips. Far-left rail on desktop, compact bottom strip on mobile.

### B. Work (`/work`) — Staged Narrative Mechanism & 27-Repo Public Catalog

- **Visual Role**: Grounded in `Premotio` (spatial narrative mechanism), `contentarchitecture.dev` (taxonomy & IA), and `datacurve.ai` (technical specs).
- **Staged Experience**:
  1. **Breadth Framing**: Architectural taxonomy dividing Om's work into 4 authentic domains (Quantum ML Logistics, On-Device Multimodal AI, Autonomous Robotics / Multi-Agent Systems, Software Systems & Algorithmic Foundations).
  2. **Featured Domain Stories with Interactive Docking**: Active domain tile untwists and docks alongside its verified technical narrative.
     - Hand-off CTA: _"Inspect in 27-Repo Index ↓"_ smoothly scrolls to and highlights `#repo-<name>` in the public catalog.
  3. **Complete 27-Public-Repo Searchable Index**:
     - Real-time search query filtering and domain category chips (`all`, `qml`, `vision-ai`, `robotics`, `systems`).
     - Live count badge (`Showing X of 27 verified public repositories`).
     - Each card includes direct link to GitHub (`https://github.com/ommd3076/<name>`), verified language, and primary-source README excerpt.
     - Reverse Hand-Off CTA: _"↑ View Domain Story"_ smoothly scrolls back to `#featured-stories` and selects the corresponding domain story.
- **State Model**:
  ```typescript
  interface WorkState {
    activeDomainIdx: number; // 0..3 (Quantum ML, Vision AI, Robotics, Systems)
    activeCategory: RepoCategory | "all";
    searchQuery: string;
    highlightedRepo: string | null; // Flashed on hand-off jump
  }
  ```

### C. About (`/about`) — Bounded Scanner Frame & Authored Pixel Lattice

- **Visual Role**: Ethiack cue and Screenshot 1 (`image-1.png`). Bounded dark scanner frame (`#0a0a0c`) with hairline `+` crosshairs and subtle scan texture.
- **Visual Center**: Authored 3-plane isometric layered systems lattice (`DeterministicPixelParticles`):
  - Slate-indigo base coordinates, violet state plane, cyan/titanium top struts.
  - Single stable mutable target `perturbTarget.current` with `overwrite: "auto"`.
  - No-idle-loop contract: canvas stops drawing once particles settle.
  - Reduced-motion static settled render.
  - Canvas dimension zeroing on unmount to release backing GPU memory.
- **Content**: Concise verified biographical timeline and academic foundation (3rd year CSE @ VVCE Mysuru, founder @ Cerenetics). Zero unverified metrics, zero founder puffery.

### D. Notes (`/notes`) — Ellipsus Literary Essay

- **Visual Role**: Grounded strictly in `ellipsus.com` (warm literary editorial serif typography on dark `#000000` canvas, quiet margins, distraction-free reading cadence).
- **State Model**: Zero interactive overhead. Pristine long-form reading typography on Newton, fluxions, calculus, instruments, and human capability.

### E. Contact (`/contact`) — Centered Light Ceramic Card

- **Visual Role**: Grounded strictly in Screenshot 2 (`image-2.png`). Centered light/ceramic card (`bg-[#fbfbfa] text-neutral-900`) floating on dark canvas.
- **Components**:
  - Restrained monogram fallback portrait slot (`OM`).
  - Verified identity: Om M. Doddamani, Computer Science student & founder @ Cerenetics.
  - Location metadata: Mysuru, India (IST · UTC+5:30).
  - Single primary action: `ommd3076@gmail.com` with tactile copy button.
  - Verified outbound link: GitHub profile (`https://github.com/ommd3076`).
  - Zero synthetic availability toggles or fake forms.

---

## 3. GSAP Presentation Handshake & Lifecycle Safety

1. **Context Scoping & Teardown-Only Reversion via `@gsap/react` (`useGSAP`, `contextSafe`)**:
   - The animation lifecycle is managed directly by `@gsap/react`'s official `useGSAP` hook, providing automatic SSR-safe cleanup without manual isomorphic layout effects.
   - **Teardown-Only Reversion**: Configured with `{ revertOnUpdate: false }`. Reversion occurs **strictly on component teardown (unmount)**. Mid-selection dependency updates do NOT trigger context reversion.
   - **Event Safety via `contextSafe`**: Interactive selection handlers and retargeting tweens are wrapped with `contextSafe` to guarantee that all spawned animations belong to the scoped context.
2. **Stable Mutable Interaction Targets**:
   - Particle interaction targets (e.g. `perturbTarget.current`) use a single stable mutable object with `overwrite: "auto"` to eliminate orphaned GSAP tweens during rapid pointer movements.
   - Memory hygiene: canvas backing store is released on unmount by explicitly zeroing dimensions (`width = 0; height = 0;`).
3. **Reduced Motion**:
   - When `prefers-reduced-motion: reduce` is detected, animations bypass tweening duration (`0.01ms`), canvases render static settled structures without RAF loops, and interfaces remain 100% accessible.
