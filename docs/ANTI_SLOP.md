# Anti-Slop Guidelines & Anti-False-Positive Checklist

**Subject**: Standards for Genuine Quality, Banned AI Tropes, Reference Observation Integrity, and Verification Audits  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08 (Post Gemini 1–4 & Grok 1–5 Consultations)  
**Repository**: `portfolio-site`

---

## 1. The Core Problem: AI Slop & Confirmation Bias

LLM coding agents frequently suffer from two severe failure modes when building frontend interfaces:

1. **Visual Slop**: Defaulting to derivative, cliché "AI company" aesthetics—oversaturated purple/cyan glows, generic floating glass cards, meaningless particle nets, and hype copy.
2. **Confirmation Bias (False Positives)**: Declaring a feature "completed" because a build succeeded or a component rendered, while the actual viewport exhibits layout shifts, clipped text, broken hover states, or unhandled mobile breakpoints.

---

## 2. Reference Observation Integrity & Advisor Contradictions

To maintain rigorous engineering honesty, the following discrepancies must be explicitly tracked:

### 2.1 Datacurve Reference Conflation Correction

- **Discrepancy**: Prior notes attributed the abstract topographic line field (`line-field.svg`) directly to `https://datacurve.ai/` as an observed asset.
- **Correction**: `line-field.svg` is an **internal, local mockup SVG** (`mockup/assets/line-field.svg`) created as an original artistic interpretation. The live `datacurve.ai` website features dark editorial styling and thesis copy on data infrastructure for frontier AI, but does **not** host that specific local file.
- **Binding Rule**: **Never present unverified local interpretations as directly observed external source assets.**

### 2.2 Rejection of Grok 1 Deviations

- **Discrepancy**: Grok 1 recommended abandoning the current TanStack Start + Nitro stack in favor of simpler static options and dropping interlinked module coordination.
- **Resolution**: **Rejected.** The project contract mandates TanStack Start and a connected list/diagram/telemetry explorer. Grok 2 subsequently aligned with this architecture.

### 2.3 ARIA Architecture Integrity (Grok 4 Synthesis)

- **Discrepancy**: Common AI code places `aria-selected` on generic `<div>` or `<button>` elements, or nests interactive `<a href="...">` links directly inside listbox options.
- **Resolution**: **Strictly Banned.** The Explorer must implement WAI-ARIA single-select listbox semantics cleanly (`role="listbox"`, `role="option"`). Action links (GitHub, papers) must live outside the listbox options.

---

## 3. Explicit Blacklist of Banned AI Tropes

### 3.1 Banned Visual & Design Tropes

- ❌ **Neon AI Glows**: No purple/cyan gradient borders, pulsating radial neon backdrops, or "cyberpunk" aesthetics.
- ❌ **Blob & Particle Clichés**: No arbitrary floating colored blur spheres or canvas particle swarms that serve no informational purpose.
- ❌ **Over-Sized Megatext**: No gratuitous 120px+ bold display typography that displaces real content.
- ❌ **Fake Dashboards & Metrics**: No dummy charts, mock progress rings, or fabricated CPU activity graphs.
- ❌ **Pill Card Clichés**: No rounded pill silhouettes applied indiscriminately to large content containers.

### 3.2 Banned Copy & Content Tropes

- ❌ **Unsubstantiated Hype**: Words like _"revolutionizing"_, _"supercharging"_, _"paradigm-shifting"_, _"game-changing"_, _"visionary"_, or _"cutting-edge"_.
- ❌ **Empty Placeholders**: `// TODO`, `Lorem Ipsum`, `Coming Soon`, `Placeholder`, or `Draft`.
- ❌ **Dead Links**: Anchors pointing to `href="#"` or unlinked cards.
- ❌ **Inflated Claims**: Upgrading a student project or hackathon attempt into an "enterprise production deployment."

### 3.3 Banned Code & Architectural Hacks

- ❌ **Band-Aid CSS**: Using `!important`, `z-index: 9999`, or negative margins to patch overlapping layouts.
- ❌ **Arbitrary Timeouts**: Using `setTimeout(..., 500)` to work around race conditions or animation sequence failures.
- ❌ **Layout Thrashing**: Querying layout properties inside high-frequency animation loops without caching.
- ❌ **Unconditional Opacity Hiding**: Adding CSS that hides content completely when JS fails or loads slowly.
- ❌ **Unsupported "Zero CLS" Claims**: Claiming zero CLS by decree rather than implementing defensive aspect ratios and CSS Grid slots.

---

## 4. Strict Anti-False-Positive Checklist

Before any implementation slice is marked "verified" or logged as complete in `logger.md`, the Execution Agent must verify every item:

| #      | Inspection Item             | Verification Method              | Pass Criteria                                                                             |
| ------ | --------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| **1**  | **Type Strictness**         | `npx.cmd tsc --noEmit`           | Exit code 0. Zero warnings, zero `any`.                                                   |
| **2**  | **Production Build**        | `npm.cmd run build`              | Nitro & Vite build completes cleanly without asset warnings.                              |
| **3**  | **Zero Horizontal Scroll**  | Viewport width check             | `document.documentElement.scrollWidth === window.innerWidth` across all viewports.        |
| **4**  | **No Text Clipping**        | Visual & DOM inspection          | No text truncated or clipped by `overflow: hidden` on cards or headers.                   |
| **5**  | **Z-Index Layering**        | Click testing                    | All buttons, links, and details tags are directly clickable without overlay blocking.     |
| **6**  | **200% Zoom Stress**        | Browser text zoom test           | At 200% zoom, text wraps cleanly without overlap or container clipping.                   |
| **7**  | **Full Keyboard Traversal** | Tab / Arrow / Escape             | Single-select listbox operates via Arrow keys; Escape unpins; visible focus rings.        |
| **8**  | **Asset Failure Fallback**  | Block image / SVG requests       | Layout geometry does not collapse; semantic text fallback remains readable.               |
| **9**  | **Animation Cleanup**       | Unmount test                     | Zero orphaned RAF handles or lingering GSAP timelines after route changes.                |
| **10** | **Rapid Click Stress**      | Rapid toggle test                | Rapidly clicking interactive elements (<100ms) produces zero state errors or stuck UI.    |
| **11** | **Reduced Motion**          | Emulate `prefers-reduced-motion` | Page transitions, accordion reveals, and hero elements render instantly with zero motion. |
| **12** | **Primary Source Audit**    | Fact check against brief         | Every project description, citation, and role statement matches approved public evidence. |
