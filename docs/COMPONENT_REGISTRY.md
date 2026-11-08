# Component Registry & Curated Catalog Audit

**Status:** Active Implementation & Source Audit
**Updated:** 2026-11-08
**Project:** `portfolio-site` (`https://github.com/ommd3076/Website-protfolio.git`)

---

## 1. Architectural Role of Catalogs vs. Visual Target

> [!IMPORTANT]
> **Five-Route Topology & Page-Local Reference Boundaries**: The portfolio is structured across **exactly five distinct public routes** (`/`, `/work`, `/about`, `/notes`, `/contact`).
> Reference boundaries are strictly allocated:
>
> - **`Premotio`**: Informs the staged narrative mechanism strictly on `/work` (breadth framing $\rightarrow$ active tile untwists and docks $\rightarrow$ reversible hand-off to 27-repo catalog). Premotio must never appear on Home, dock, global chrome, About, Notes, or Contact.
> - **`contentarchitecture.dev`**: Informs `/work` information architecture and taxonomy.
> - **`datacurve.ai`**: Informs technical typography and specification presentation.
> - **`ellipsus.com`**: Informs `/notes` exclusively (warm literary serif typography on dark canvas, quiet reading cadence).
> - **`Screenshot 1 & Ethiack cue`**: Informs `/about` exclusively (bounded scanner frame, deterministic pixel particle lattice, factual bio).
> - **`Screenshot 2`**: Informs `/contact` exclusively (centered light/ceramic card on dark canvas, monogram fallback, direct email action).
> - **Home (`/`)**: Ultra-minimal centered identity anchor + quiet independent navigation rail.
>   UI components and skills are implementation craft tools, NOT visual references or volume targets. Codex does not write or modify application code; Antigravity is the sole code author.

### Historical Context (Archival Only)

Prior to the scope reset, two curated bookmark catalogs were audited as component indexes (`saved-fieldnotes.html` and `ui_posts_last_30_days.md`). These catalogs are strictly historical reference archives and must not be used as visual design targets, layout models, or active inputs.

---

## 2. Auditable Inventory of Named Sources Across Both Catalogs

| Source Name         | Exact URL / Repository                                                       | Primary Focus                                                                                        | License Status                                                                                        | Version / Dependencies                  | Evaluation & Integration Status                                                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rare UI**         | `https://www.rareui.com` / `https://github.com/ibelick/rare-ui`              | Specialized motion components (e.g. contribution calendar, spotlight)                                | **VERIFIED**: MIT with Commons Clause + visible-link attribution requirement                          | Mandates `motion/react` (Framer Motion) | **ADAPTED / INTEGRATED**: Re-engineered contribution grid pattern into native GSAP with zero Framer Motion dependencies. Included visible-link attribution.                                                                           |
| **EvilButtons**     | `https://evilbuttons.com` / `https://github.com/evilmartians/evil-buttons`   | Micro-interactive button states & tactile magnetic buttons                                           | **VERIFIED**: Apache-2.0                                                                              | Registry built around Motion            | **ADAPTED / INTEGRATED**: Tactile pull adapted via native GSAP `useMagnetic`, `MagneticTactileButton`, `GlowingBorderButton`, `CopyButton`, and `OutlineGhostButton` with zero layout thrashing.                                      |
| **ObsidianUI**      | `https://obsidianui.dev` / `https://github.com/Atharvsinh-codez/obsidian-ui` | Dark-mode component registry (11 components: hover-image, draggable-marquee, text-stream, flip-text) | **VERIFIED**: Developer portal states repository MIT; individual component dependencies item-specific | Item-specific third-party dependencies  | **ADAPTED / INTEGRATED**: Adapted subtle dark typography, status tags, `DraggableMarquee`, `HoverCardPreview`, `TextStream`, and `FlipText` natively in GSAP.                                                                         |
| **Transitions.dev** | `https://transitions.dev`                                                    | 43+ UI motion transitions & page effects                                                             | **VERIFIED**: Tiered access (Remix/free vs Pro). NOT globally CC0.                                    | Framework-agnostic CSS/JS               | **ADAPTED**: Authored equivalent critically damped GSAP springs (`power2.out`, `power3.out`) without external packages.                                                                                                               |
| **21st.dev**        | `https://21st.dev`                                                           | Community registry of 12,000+ UI components                                                          | **VERIFIED**: Author- and item-specific licensing; NOT a global MIT license                           | Component-specific                      | **ADAPTED**: Clean utility patterns adapted; no conflicting bundle imports.                                                                                                                                                           |
| **BoardUI**         | `https://www.boardui.com` / `.agents/skills/boardui`                         | React + Tailwind CSS v4 design system for dashboards and agent interfaces                            | **VERIFIED**: Commercial / proprietary design system                                                  | React + Tailwind CSS v4                 | **INTEGRATED & ADAPTED**: Integrated `StatCard`, `StatGrid`, `DataGrid`, `StatusDot`, `Kbd`, `SegmentedControl`, `AnnouncementBanner`, `NotificationCallout`, `TreeView`, `Meter`, `AccordionCard`, `FilterGroup`, and `StatusLabel`. |
| **EvilCharts**      | `https://evilcharts.com`                                                     | Recharts-based chart components and metrics displays                                                 | **VERIFIED**: MIT                                                                                     | Recharts / React                        | **ADAPTED**: Built pure SVG factual comparative architecture visualizers (`ResourceBudgetChart`) displaying theoretical quantization bounds without fake metrics or runtime bloat.                                                    |
| **Glass UI**        | `https://glass.samasante.com`                                                | Glassmorphic cards and backdrop blur components                                                      | **NOT VERIFIED**: Unspecified public demo                                                             | CSS backdrop-filter / Tailwind          | **ADAPTED**: Implemented `GlassPanel` and `GlassFilterBar` locally via Tailwind semantic utility tokens (`bg-neutral-950/80 border-neutral-800 backdrop-blur-xl`).                                                                    |

---

## 3. Reusable Shipped Component Library (123+ Modules & Patterns)

The project ships a comprehensive internal component library organized into 8 distinct categories, each directly serving real editorial routes:

### Category 1: Editorial & Research Primitives (`src/components/editorial/`)

1. **`ReadingProgress.tsx`** `[MOUNTED: __root.tsx]`: Minimal top-anchored viewport scroll progress hairline. Uses RAF + GSAP `scaleX` transform without layout thrashing.
2. **`TableOfContents.tsx`** `[UNMOUNTED / SUPERSEDED ROUTE]`: Lateral sticky document outline and section spy observing heading intersections, with `aria-current="location"`.
3. **`ArchivalMetadataRow.tsx`** `[UNMOUNTED / SUPERSEDED ROUTE]`: Neutral publication timestamp, revision hash, reading estimate, and optional verification tier badge.
4. **`CitationCallout.tsx`** `[UNMOUNTED / SUPERSEDED ROUTE]`: Formal academic citation block for IEEE AIEI 2024 presentation with 1-click clipboard copy (zero fabricated DOI or BibTeX).
5. **`ResearchNoteCard.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Asymmetric editorial card with an ink margin, marginalia notation slot, and monospace timestamp.
6. **`HypothesisCard.tsx`** `[UNMOUNTED / SUPERSEDED ROUTE]`: Four-stage scientific engineering framework separating Observation, Testable Hypothesis, Empirical Test, and Verified Outcome.
7. **`RetrospectiveDisclosure.tsx`** `[UNMOUNTED / SUPERSEDED ROUTE]`: Candid post-mortem disclosure separating Initial Assumption, Operational Reality, and Architectural Lesson (Project EVA).
8. **`Footnotes.tsx` (`FootnoteGroup`, `FootnoteItem`)** `[UNMOUNTED / SUPERSEDED ROUTE]`: Journal-style bracketed citation notes with primary source links.
9. **`CodeDiffBlock.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Monospace split/unified diff block displaying model configuration or quantization format differences.
10. **`InlineAnnotation.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Dotted underline terminology trigger with accessible hover popover definition.

### Category 2: BoardUI Data & Dashboard Primitives (`src/components/boardui/`)

> [!NOTE]
> Per Grok consultations 10 & 11 and Argon #5 audits, all dashboard/metric patterns (`DataGrid`, `StatCard`, `Meter`, `BentoGrid`, `FloatingDock`, `ResourceBudgetChart`, `TimelineStepTracker`, `ContributionGrid`, `MetricCounter`) are **100% unmounted** from shipped routes to maintain editorial restraint, eliminate pseudo-telemetry, and preserve visual truth.

11. **`StatCard.tsx` (`StatCard`)** `[UNMOUNTED / LIBRARY-ONLY]`: High-density KPI metric card with label, value, status badge, subtext, and trend indicator.
12. **`StatCard.tsx` (`StatGrid`)** `[UNMOUNTED / LIBRARY-ONLY]`: Responsive 2-up, 3-up, 4-up metric layout container from BoardUI KPI patterns.
13. **`StatusDot.tsx`** `[MOUNTED: HeaderBar, /]`: Multi-state status pill with critically damped GSAP halo for active research items, and stable dots for verified/accepted/completed items.
14. **`Kbd.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Keyboard shortcut chip (`⌘K`, `Esc`, `↑`, `↓`, `↵`) with tactile border and mono typography.
15. **`SegmentedControl.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: BoardUI pill-style radio toggle with sliding active highlight powered by `useGSAP` and `contextSafe`.
16. **`AnnouncementBanner.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Dismissable editorial banner for milestone announcements (local-first computing research direction).
17. **`NotificationCallout.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Inline alert card with verification tiers (`info`, `warning`, `verified`).
18. **`DataGrid.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Tabular multi-column display with responsive scrolling, column headers, and cell formatting.
19. **`TreeView.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Hierarchical document and system architecture explorer for multi-tier pipelines.
20. **`Meter.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Accessible bounded value display with fill bar and textual readout.
21. **`AccordionCard.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Expandable deep-dive card for project specifications.

### Category 3: Rare UI & ObsidianUI Minimal Motion Primitives (`src/components/rare/`)

22. **`ContributionGrid.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Native GSAP quarterly research activity matrix (symmetrically styled, with visible Rare UI license attribution). Unmounted per Grok 9 audit to eliminate external calls, privacy concerns, and synthetic commit metrics.
23. **`TerminalBlock.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Minimal dark console with command prompt (`om@vvce:~$`), syntax styling, and 1-click copy action. Unmounted from shipped routes to eliminate simulated shell logs.
24. **`HoverCardPreview.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Floating popover displaying project architecture preview on pointer hover/focus.
25. **`DraggableMarquee.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Infinite smooth marquee of verified technology stacks using GSAP RAF ticker. Unmounted per Argon #7 audit to eliminate continuous RAF animation and visual noise; the single route `/` uses quiet, accessible static typography without continuous ticker loops.
26. **`TextStream.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Typewriter/streaming character reveal for system prompts or research abstracts.
27. **`FlipText.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Subtly rolling digit/character transition for status badges.
28. **`BentoGrid.tsx` (`BentoGrid`)** `[UNMOUNTED / LIBRARY-ONLY]`: Asymmetric responsive bento grid container. Unmounted in favor of semantic `<article>` cards.
29. **`BentoGrid.tsx` (`BentoCard`)** `[UNMOUNTED / LIBRARY-ONLY]`: Individual bento card with tag, title, subtitle, and column span controls.
30. **`FloatingDock.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Floating bottom quick-action navigation bar with GSAP magnetic proximity scaling.

### Category 4: EvilButtons Interactive Tactile Primitives (`src/components/evil/`)

31. **`MagneticTactileButton.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Magnetic physics pull with haptic press depression (`scale: 0.96`) and critically damped spring reset.
32. **`GlowingBorderButton.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Subtle radial ambient glow following pointer position along border perimeter.
33. **`CopyButton.tsx`** `[MOUNTED: /]`: 1-click clipboard copy button with checkmark icon transition and "Copied ✓" tooltip feedback.
34. **`OutlineGhostButton.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Transparent hairline border button with fill-up hover effect.
35. **`GlitchBadge.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Monospace technical badge with micro-stutter hover state.

### Category 5: Factual Architecture & Metric Visualizers (`src/components/visualizers/`)

36. **`ResourceBudgetChart.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Clean SVG comparative bar visualizer displaying theoretical memory footprints of model quantization formats. Unmounted from shipped routes.
37. **`TimelineStepTracker.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Chronological milestone tracker with verified conference and build dates. Unmounted from shipped routes.
38. **`MetricCounter.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Accessible numerical count-up component using GSAP timeline with `tabular-nums` formatting and reduced-motion instant snap.

### Category 6: Glass UI & Editorial Surfaces (`src/components/glass/`)

39. **`GlassPanel.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Translucent dark card (`bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl`) with inner hairline highlight.
40. **`GlassFilterBar.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Sticky floating filter strip with frosted glass backdrop.

### Category 7: Command Palette & Global Chrome (`src/components/command/` & `src/components/site/`)

41. **`CommandPalette.tsx`** `[MOUNTED: __root.tsx]`: Accessible `⌘K` modal dialog for instant navigation across all routes and projects.
42. **`HeaderBar.tsx`** `[MOUNTED: __root.tsx]`: Fixed top chrome with route links, live status dot, and `⌘K` shortcut trigger.
43. **`Chrome.tsx` (`Footer`, `Section`, `Eyebrow`)** `[MOUNTED: across all routes]`: Shared structural containers.
44. **`ProjectExplorer.tsx`** `[UNMOUNTED / LIBRARY-ONLY]`: Interactive system topology explorer with select-only SVG tether and 60ms interruption-safe retargeting.
45. **`EditorialControls.tsx` (`FilterGroup`, `StatusLabel`)** `[UNMOUNTED / LIBRARY-ONLY]`: Category filters and status chips.
46. **`motion.ts`** `[ACTIVE UTILITIES]`: Centralized GSAP motion library (`usePageIntro`, `useReveal`, `useLoadSequence`, `useMagnetic`, `prefersReduced`).

### Category 8: Installed Accessible Base Primitives (`src/components/ui/` & `src/components/base/`)

47–98. 52 base primitives covering Dialog, Tabs, Accordion, Tooltip, Select, DropdownMenu, ContextMenu, Form, Input, Skeleton, ScrollArea, Popover, Badge, Button, etc.

---

## 4. Single-Route & Section Component Usage Matrix

Under the approved user scope reset, the portfolio is unified on a **single focused public route (`/`)** with in-page navigation anchors (`#top`, `#work`, `#about`, `#contact`). All prior multi-page routes (`/work`, `/about`, `/approach`, `/future`, `/contact`) are superseded historical routes.

| Surface / Section                               | Primary Integrated Components                                                                                             | Visual Character & Viewport Geometry                                                                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`/` (#top — Hero & Bio)**                     | `CopyButton` (`src/components/evil/CopyButton.tsx`), `CareneticsLogo`                                                     | Grounded in `ellipsus.com`, `datacurve.ai`, and `contentarchitecture.dev`: pure black `#000000`, 540px reading column, italic serif display name (_"Om M Doddamani"_), compact serif biography, clean public profile links. |
| **`/` (#work — Selected Work)**                 | Semantic `<article>` cards, verified monospace category headers (`01 · ...`), technical tag chips, primary external links | Clean architectural cards inspired by `contentarchitecture.dev` with hairline rules, project headlines, verified technical tags, and explicit GitHub/demo links.                                                            |
| **`/` (#about — Academic & Founder)**           | Semantic editorial cards, verified education (VVCE Mysuru), founder narrative (Cerenetics), and IEEE presentation notes   | Restrained typographic hierarchy with verified academic citations.                                                                                                                                                          |
| **`/` (#contact — Direct Channels)**            | `CopyButton`, verified public channels (GitHub, LinkedIn, Email)                                                          | Quiet and functional contact channels with 1-click clipboard copy.                                                                                                                                                          |
| **Shared Shell (`__root.tsx`)**                 | `HeaderBar`, `ReadingProgress`, `CommandPalette` (`⌘K`), `Footer`                                                         | Fixed top chrome with in-page anchor links (`#top`, `#work`, `#about`, `#contact`), live status dot, `scroll-mt-28` header clearance, and top hairline scroll progress.                                                     |
| **Historical Routes (`/work`, `/about`, etc.)** | _Permanently removed_                                                                                                     | _Superseded archival structure. All multi-page routes deleted under the single-page / reset._                                                                                                                               |

---

## 5. Licensing & Dependency Verification Rules

1. **No Blanket Licenses**: Never infer MIT from a repository or website existence. Each dependency, license clause, and attribution requirement must be explicitly verified.
2. **Attribution Respect**: Any component incorporating code from repositories with attribution requirements (such as Rare UI's Commons Clause or MIT attribution) must include clear source attribution comments and links.
3. **Single Motion Engine**: Never import competing animation libraries (`motion/react`, `framer-motion`). GSAP (`@gsap/react`, `useGSAP`, `contextSafe`) is the sole motion runtime for the portfolio.
4. **Zero AI Slop / Fake Telemetry**: Never synthesize metrics, pseudo-percentages, or synthetic curves. All visualizers must be grounded in verified mathematical specifications or primary documentation.
