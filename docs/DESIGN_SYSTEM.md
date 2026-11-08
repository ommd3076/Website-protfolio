# Design System & Typographic Specification

**Status:** Active Design System Specification
**Updated:** 2026-11-08
**Project:** `portfolio-site` (`https://github.com/ommd3076/Website-protfolio.git`)

---

## 1. Visual Reference Anchor

The primary visual ground truth for the portfolio is the user-supplied reference screenshot (`image-1.png`):

- **Canvas**: Pure black background (`#000000`).
- **Reading Spine**: Narrow centered reading column (max width ~540px) on the homepage.
- **Header Display**: Modest, elegant italic serif display name (_"Om M Doddamani"_), sized at 24px–28px, tracking tight.
- **Body Typography**: High-contrast, compact serif body text (13.5px–14px, ~1.7 line height) delivering a serene, literary atmosphere.
- **Whitespace**: Generous vertical rhythm and quiet negative space.
- **No AI Slop**: Absolutely no decorative gradients, floating purple blobs, bouncing cards, pseudo-telemetry bars, or simulated percentage meters.

The curated bookmark catalogs (`saved-fieldnotes.html` and `ui_posts_last_30_days.md`) serve strictly as source link indexes for evaluating component patterns; their page-level styling (e.g. ink/paper, red accents) is NOT the visual reference.

---

## 2. Typography & Role Assignments

The typography system uses standard semantic tokens and clean CSS variables:

| Role                     | Font Family                               | Size / Leading        | Target Elements & Context                                     |
| ------------------------ | ----------------------------------------- | --------------------- | ------------------------------------------------------------- |
| **Display Name**         | Serif Italic (`font-serif italic`)        | 24px–28px / 1.2       | Homepage name header (_"Om M Doddamani"_).                    |
| **Section Headings**     | Serif Regular (`font-serif`)              | 28px–48px / 1.1       | Route headers on `/work`, `/about`, `/approach`, `/future`.   |
| **Subheadings & Titles** | Serif Medium (`font-serif font-medium`)   | 16px–20px / 1.3       | Project titles, card headers, tab titles.                     |
| **Primary Body**         | Serif (`font-serif`) / Sans (`font-sans`) | 13.5px–15px / 1.6–1.7 | Biographical paragraphs, project descriptions, notes.         |
| **Metadata & Labels**    | Monospace (`font-mono`)                   | 10px–11px / 1.4       | Numbers (`01`), status labels, breadcrumbs, tags, timestamps. |
| **UI Controls**          | Sans (`font-sans`) / Mono (`font-mono`)   | 12px–13px / 1.2       | Buttons, filter chips, navigation pills, external links.      |

---

## 3. Color Palette & Surface Tokens

All surfaces and text values use high-contrast, accessible neutral tones:

- **Background Canvas**: `bg-black` (`#000000`).
- **Surface Elevation 1**: `bg-neutral-950/80` with `backdrop-blur-sm` and `border border-neutral-800`.
- **Surface Elevation 2**: `bg-neutral-900` with `border border-neutral-700` (for active/selected states).
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
   - Selection transitions (project change): 200ms–280ms.
   - Route reveals: 300ms–450ms.
3. **No Layout Property Animations**:
   - Only GPU-accelerated transforms (`opacity`, `transform: translate3d`) are animated.
   - Never animate `width`, `height`, `margin`, `padding`, or `top/left`, which trigger browser reflow.
4. **Lifecycle & Interruption Safety via `@gsap/react` (`useGSAP`, `contextSafe`)**:
   - All component animations across the portfolio and shared motion utilities (`usePageIntro`, `useReveal`, `useLoadSequence`, `useMagnetic`, `CTA`, `ProjectExplorer`, `AboutPage`) use the official `@gsap/react` package with `useGSAP` and `contextSafe`.
   - Native listeners in `useEffect` (such as pointer events in `useMagnetic` and `MagneticLink`) are kept strictly for DOM event binding and dispatch tweens exclusively through `contextSafe`.
   - `useGSAP` provides automatic SSR-safe cleanup (falling back cleanly during server rendering and scoping to refs on the client).
   - `revertOnUpdate: false` ensures teardown-only context reversion; mid-selection dependency updates do NOT trigger context reversion, preventing mid-flight snaps to CSS initial state.
   - Interactive events (click, keyboard selection) are wrapped in `contextSafe(...)` for execution safety.
   - For rapid selection retargeting (60ms cycling), `gsap.killTweensOf(targets)` halts active tweens while **preserving current transforms/opacity**, animating smoothly to the new target.
5. **Select-Only SVG Tether Specification**:
   - Presentation-only curve linking active listbox selection to detail nodes.
   - **Narrow widths (<768px)**: Hidden (`opacity: 0` / CSS `hidden md:block`).
   - **During active scroll**: Hidden immediately (`opacity: 0`). Re-evaluates and smoothly fades in (120ms debounce) once scrolling settles.
   - **On window resize**: Recalculated via throttled RAF.
6. **Reduced Motion Compliance**:
   - All animations query `prefersReduced()` (evaluating `@media (prefers-reduced-motion: reduce)`).
   - Under reduced motion, state updates and DOM presentations occur instantly (duration: 0, zero transforms, tether hidden).

---

## 5. Expanded Component Library Categories & Roles

The design system incorporates 97 distinct component patterns organized into 8 categories. In accordance with Grok consultations 9–11 and Argon #5 audits, **all 9 dashboard/metric patterns (`DataGrid`, `StatCard`, `Meter`, `BentoGrid`, `FloatingDock`, `ResourceBudgetChart`, `TimelineStepTracker`, `ContributionGrid`, `MetricCounter`) are 100% unmounted** from shipped routes to maintain editorial calm and eliminate fake telemetry:

1. **Editorial & Research Primitives (`src/components/editorial/`)**:
   - `ReadingProgress` `[Mounted: __root.tsx]`: Non-layout-shifting top hairline scroll indicator with RAF and GSAP `scaleX`.
   - `TableOfContents` `[Mounted: /approach]`: Lateral document outline observing heading intersection with `aria-current="location"`.
   - `ArchivalMetadataRow` `[Mounted: /work]`: Neutral revision timestamp, reading estimate, and optional verification tier badge.
   - `CitationCallout` `[Mounted: /about]`: Formal academic citation with 1-click clipboard copy (zero fabricated DOI/BibTeX).
   - `ResearchNoteCard` `[Library-Only]`: Asymmetric editorial card with ink margin and marginalia notation slot.
   - `HypothesisCard` `[Mounted: /approach]`: 4-stage empirical methodology card (Observation, Hypothesis, Empirical Test, Verified Outcome).
   - `RetrospectiveDisclosure` `[Mounted: /about]`: Candid failure analysis and scope post-mortem (Initial Assumption, Operational Reality, Architectural Lesson).
   - `Footnotes` (`FootnoteGroup`, `FootnoteItem`) `[Mounted: /approach]`: Journal-style bracketed citation notes with primary source links.
   - `CodeDiffBlock` `[Library-Only]`: Monospace split/unified diff block. Unmounted from shipped routes.
   - `InlineAnnotation` `[Library-Only]`: Dotted underline terminology trigger with accessible definition popover.

2. **BoardUI Data & Dashboard Primitives (`src/components/boardui/`)**:
   - `StatCard` & `StatGrid` `[Library-Only]`: High-density KPI metric cards. Unmounted from shipped routes.
   - `StatusDot` `[Mounted: /contact, HeaderBar]`: Multi-state status pill with critically damped GSAP halo.
   - `Kbd` `[Library-Only]`: Tactile mono keyboard shortcut chip (`⌘K`, `Esc`).
   - `SegmentedControl` `[Library-Only]`: Pill-style radio toggle with sliding active highlight.
   - `AnnouncementBanner` `[Mounted: /future]`: Dismissable editorial banner for milestone announcements.
   - `NotificationCallout` `[Library-Only]`: Inline alert card with verification tiers.
   - `DataGrid` `[Library-Only]`: Tabular multi-column display. Unmounted from shipped routes.
   - `TreeView` `[Library-Only]`: Hierarchical system architecture explorer.
   - `Meter` `[Library-Only]`: Bounded value display. Unmounted from shipped routes.
   - `AccordionCard` `[Library-Only]`: Expandable deep-dive card for project specifications.

3. **Rare UI & ObsidianUI Minimal Motion Primitives (`src/components/rare/`)**:
   - `ContributionGrid` `[Library-Only]`: Native GSAP quarterly research activity matrix. Unmounted per Grok 9 audit to eliminate external calls and synthetic metrics.
   - `TerminalBlock` `[Library-Only]`: Minimal dark console with command prompt. Unmounted from shipped routes.
   - `HoverCardPreview` `[Library-Only]`: Floating popover displaying architecture preview on hover/focus.
   - `DraggableMarquee` `[Library-Only]`: Infinite smooth marquee of verified technology stacks using GSAP RAF ticker. Unmounted per Argon 7 audit to eliminate continuous RAF animation and visual noise; replaced on `/future` with an accessible static research toolchain strip.
   - `TextStream` `[Library-Only]`: Character reveal for prompts or abstracts.
   - `FlipText` `[Library-Only]`: Rolling digit/character transition.
   - `BentoGrid` & `BentoCard` `[Library-Only]`: Asymmetric bento grid. Unmounted in favor of semantic `<article>` cards.
   - `FloatingDock` `[Library-Only]`: Floating quick-action dock. Unmounted from shipped routes.

4. **EvilButtons Interactive Tactile Primitives (`src/components/evil/`)**:
   - `MagneticTactileButton` `[Mounted: /approach, /future]`: Magnetic physics pull with haptic press depression and spring reset.
   - `GlowingBorderButton` `[Library-Only]`: Subtle radial ambient glow following pointer position along border perimeter.
   - `CopyButton` `[Mounted: /, /about, /contact]`: 1-click clipboard copy button with checkmark icon transition.
   - `OutlineGhostButton` `[Mounted: /contact]`: Transparent hairline border button with fill-up hover effect.
   - `GlitchBadge` `[Library-Only]`: Monospace technical badge with micro-stutter hover state.

5. **Factual Architecture & Metric Visualizers (`src/components/visualizers/`)**:
   - `ResourceBudgetChart` `[Library-Only]`: Clean SVG comparative bar visualizer. Unmounted from shipped routes.
   - `TimelineStepTracker` `[Library-Only]`: Chronological milestone tracker. Unmounted from shipped routes.
   - `MetricCounter` `[Library-Only]`: Numerical count-up component. Unmounted from shipped routes.

6. **Glass UI & Editorial Surfaces (`src/components/glass/`)**:
   - `GlassPanel` `[Mounted: /contact]`: Translucent dark card (`bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl`) with inner hairline highlight.
   - `GlassFilterBar` `[Library-Only]`: Sticky floating filter strip with frosted glass backdrop.

7. **Command Palette & Global Chrome (`src/components/command/` & `src/components/site/`)**:
   - `CommandPalette` `[Mounted: __root.tsx]`: Accessible `⌘K` modal dialog for instant navigation across all routes and projects.
   - `HeaderBar` `[Mounted: __root.tsx]`: Fixed top chrome with route links, live status dot, and `⌘K` shortcut trigger.
   - `Chrome` (`Footer`, `Section`, `Eyebrow`) `[Mounted: across all routes]`: Shared structural containers.
   - `ProjectExplorer` `[Mounted: /work]`: Interactive system topology explorer with select-only SVG tether and 60ms interruption-safe retargeting.
   - `EditorialControls` (`FilterGroup`, `StatusLabel`) `[Mounted: /work]`: Category filters and status chips.

8. **Installed Accessible Base Primitives (`src/components/ui/` & `src/components/base/`)**:
   - 52 base primitives covering Dialog, Tabs, Accordion, Tooltip, Select, DropdownMenu, ContextMenu, Form, Input, Skeleton, ScrollArea, Popover, Badge, Button, etc.

---

## 6. Honest Data States & Telemetry Defense

In accordance with strict portfolio integrity guidelines and consensus across reviews:

1. **Zero Hallucinated Metrics**: No fake CPU/memory numbers, synthetic benchmark curves, or fictional percentages (e.g. theoretical quantization compression presented as live system measurements).
2. **Zero Synthetic GitHub Telemetry / Faux Charts**: Recharts or SVG plots are omitted where no primary empirical dataset exists.
3. **First-Viewport Work Topology Layout**: The `/work` interactive workspace begins immediately below the compact header at $Y = 250\text{px}$ and terminates at $Y = 680\text{px}$ (height $429\text{px}$), fitting completely within the standard $1280 \times 800$ first viewport (`FitsFirstViewport = true`).
4. **Quiet Visual Anchor on Home**: The `/` homepage strictly preserves the reference anchor (`image-1.png`): pure black `#000000`, 540px centered column (`#home-column`), small italic serif display name (*"Om M Doddamani"*), compact serif biography, clean public profile links, and zero dashboard/explorer elements.
5. **Traceability to PRD**: Every claim regarding projects (PRISM, Deep Reinforcement Learning, Cerenetics, EVA) traces directly to approved documentation in `docs/PRD.md`.
6. **Publication Protocols & Disclosures**:
   - Conference-accepted research (PRISM) clearly states that full citations, proceedings venue, author ordering, and code benchmarks are withheld pending formal conference proceedings release.
   - Peer-reviewed conference presentations (IEEE AIEI) and experimental records are clearly indexed.
   - Hackathon exploratory projects (EVA) are candidly presented with retrospective analysis of failure modes and engineering boundaries.
7. **Architecture Schemas Over Synthetic Gauges**: Where system structure is communicated, use clear, labeled SVG/DOM topologies rather than quantitative charts lacking a primary dataset.
8. **Model Review Attribution**: Grok and Gemini evaluations were conducted strictly in text-only mode and did not view rendered screenshots; visual review was performed locally by Antigravity via headless Chromium CDP screenshots and DOM layout geometry verification.
