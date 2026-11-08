# Design System & Token Specifications

**Subject**: Design Tokens, Typography, Observed Motion Curves, and Reference Evidence  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08  
**Repository**: `portfolio-site`

---

## 1. Aesthetic Vision: "Credible Engineering"

The aesthetic direction unites the high-density technical clarity of **Paco Coursey (`paco.me`)** and **Lee Robinson (`leerob.com`)** with the systems storytelling of **`contentarchitecture.dev`**, the quiet topographic texture of **`datacurve.ai`**, and the organic literary warmth of **`ellipsus.com`**.

### Core Tenets

- **Compact Hero & Intimate Proportions**: Directly calibrated to the confirmed primary homepage visual reference (`codex-clipboard-8bc00f75-f36a-4cea-8da9-85e4159a597a.png` / `image-1.png`). Pure black background (`#000000`), narrow centered text column (~480px–540px), modest italic serif display name (_"Om M Doddamani"_), compact serif body copy (13px–14px, tight line-height 1.6), and generous, confident whitespace. Completely avoids oversized 40px–64px generic landing page hero banners, decorative blobs, or unearned card containers.
- **Restrained Typography**: 13px–14px compact serif body text with tight leading (1.6), small section headers (14px–18px), and 10px–11px monospace telemetry.
- **Editorial Contrast**: Instrument Serif ("Intel Serif") italic display cut for name and essay headers, juxtaposed against crisp neo-grotesque sans-serif and tabular monospace metadata.
- **Tactile, Localized Motion**: Motion is progressive enhancement and instrument-like (tactile toggle states, subtle hover scale, quiet staggered reveals). Zero decorative scroll-jacking or floating neon blobs.

---

## 2. Primary Visual References: Observed vs. Inferred Evidence

To eliminate confirmation bias and unsupported claims, external references are documented with clear separation between **directly observed evidence** and **inferred design patterns**:

| Reference                                  | Directly Observed Evidence                                                                                                                                                                                                          | Inferred Design Pattern                                                                                                                                                                           |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`https://leerob.com/`**                  | Centered single-column spine (~640px max width); plainspoken sans-serif body; high-contrast monochrome palette; immediate SSR render; zero decorative scroll animations.                                                            | Extreme restraint; content and writing are prioritized over decorative theatre; zero layout shift.                                                                                                |
| **`https://paco.me/`**                     | Narrow centered spine; compact type hierarchy (13px–15px body, 10px–12px metadata); modular sections (_Building_, _Projects_, _Writing_, _Now_, _Connect_); localized micro-interactions on discrete widgets (cmdk, audio players). | Motion is tactile, localized, and physics-driven on components rather than page-scale scroll hijacks. _(Exact motion curves on live site require headless DevTools measurement before claiming)._ |
| **`https://www.contentarchitecture.dev/`** | High-density modular cards; monospace badges; step-by-step engineering timelines (_"Day 01... Day 02..."_); concrete architectural contrast over abstract marketing.                                                                | Direct, credible systems-engineering narrative that demonstrates mastery by showing real technical decisions and boundaries.                                                                      |
| **`https://datacurve.ai/`**                | Dark contemplative tone; subtle abstract topographic line-field background texture; editorial copy exploring instruments, models, and intelligence.                                                                                 | Ambient background texture that conveys depth without visual clutter or GPU overhead.                                                                                                             |
| **`https://ellipsus.com/`**                | Expressive serif typography; literary essay voice; thoughtful spacing; emphasis on craft and human perspective.                                                                                                                     | Used specifically for the workbench essay / calculus instrument section to provide warmth and intellectual depth.                                                                                 |

---

## 3. Typography Hierarchy & Scales

Calibrated strictly to `image-1.png` and restrained engineering portfolio standards:

| Level                      | Font Family                        | Size (Desktop / Mobile)    | Line Height  | Tracking  | Weight / Style           | Notes / Source Evidence                                                        |
| -------------------------- | ---------------------------------- | -------------------------- | ------------ | --------- | ------------------------ | ------------------------------------------------------------------------------ |
| **Hero Name Display**      | Instrument Serif / Editorial Serif | `clamp(22px, 2.5vw, 28px)` | `1.15 – 1.2` | `-0.02em` | Italic / Regular         | **Compact screenshot scale** (`image-1.png`). Replaces oversized 40–64px hero. |
| **Section Headings (H2)**  | SF Pro / Inter Sans                | `clamp(16px, 2vw, 20px)`   | `1.2`        | `-0.03em` | Medium (500)             | Restrained section anchors (_Building_, _Notes_, _Now_).                       |
| **Project / Sub Headings** | SF Pro / Inter Sans                | `14px – 16px`              | `1.3`        | `-0.02em` | Medium (500)             | Compact card titles and project labels.                                        |
| **Body Copy**              | SF Pro / Inter Sans                | `12px – 14px`              | `1.6 – 1.7`  | `-0.01em` | Regular (400)            | Tight, high-density bio and descriptive copy.                                  |
| **Essay Prose**            | Georgia / Iowan Old Style Serif    | `13px – 15px`              | `1.75 – 1.8` | `0`       | Regular (400)            | Used in the calculus/instrument idea section.                                  |
| **Eyebrows & Metadata**    | SF Mono / Consolas                 | `10px – 11px`              | `1.5`        | `+0.08em` | Regular (400), Uppercase | Section kickers, project tags, and timestamps.                                 |
| **Telemetry / Counts**     | SF Mono / Consolas                 | `10px – 11px`              | `1.0`        | `0`       | Tabular-nums, Regular    | Metrics, node IDs, and status codes.                                           |

---

## 4. Color Token Architecture (OKLCH)

Managed semantically via CSS custom properties and Tailwind v4 `@theme inline`:

### 4.1 Dark Palette (Primary Interface / Screenshot Alignment)

```css
:root.dark,
.dark {
  --bg: #171716; /* Dark base background (or #000000 per image-1.png) */
  --panel: #20201f; /* Card & panel surface */
  --ink: #f0eee9; /* Primary text (high contrast white/cream) */
  --muted: #a4a19b; /* Secondary copy & captions */
  --dim: #6d6a65; /* Tertiary metadata & inactive links */
  --rule: #383735; /* Subtle borders & separators */
  --rust: #c18b64; /* Primary brand accent / telemetry highlight */
  --accent-soft: rgba(193, 139, 100, 0.12);
}
```

### 4.2 Warm Paper Palette (Light Mode / Fieldnotes Reference)

```css
:root {
  --paper: #fbfaf8; /* Warm paper background */
  --surface: #f4f1eb; /* Panel surface */
  --ink: #20201e; /* Near-black ink */
  --muted: #74736e; /* Muted text */
  --rule: #e6e3de; /* Thin dividers */
  --accent: #8f6044; /* Warm earth accent */
  --accent-deep: #5e3c27;
}
```

---

## 5. Spacing Grid & Layout Proportions

- **Base Rhythm**: 4px atomic step (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`).
- **Hero & Bio Spine**: `width: min(100% - 32px, 580px); margin: 0 auto;` (Matches compact layout in `image-1.png`).
- **Standard Reading Spine**: `width: min(100% - 48px, 720px); margin: 0 auto;` (Case studies and notes).
- **Expanded Shell**: `width: min(100% - 48px, 920px); margin: 0 auto;` (Topbar navigation and multi-column telemetry).
- **Border Radii**:
  - Panels / Cards: `rounded-md` (6px) or `rounded-lg` (8px). Zero bulbous pill cards.
  - Badges / Status: `rounded-full` (restrained small pill badges).

---

## 6. Animation Physics & Transition Timings

### 6.1 Directly Measured Local Mockup Timings (Verified from Source Files)

The following transition values are extracted directly from verified local codebase files:

| Target Element              | Selector / File                                 | Duration        | Timing Function                                                           | CSS / JS Source                                                          |
| --------------------------- | ----------------------------------------------- | --------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Work Image Hover**        | `.work-image img`<br>(`mockup/styles.css:8`)    | `550ms` (0.55s) | `cubic-bezier(0.2, 0.7, 0.2, 1)` (transform)<br>`ease-out` (filter 350ms) | Scale `1.025` and brightness `1.08` on hover.                            |
| **Section Entrance Reveal** | `.reveal.is-visible`<br>(`mockup/styles.css:2`) | `550ms` (0.55s) | **`ease-out`** _(corrected: NOT cubic-bezier)_                            | Fades from `opacity: 0, translateY(8px)` to `opacity: 1, translateY(0)`. |
| **Reveal Stagger Delay**    | `[data-reveal]`<br>(`mockup/script.js:15`)      | `0ms – 180ms`   | Stagger step                                                              | `Math.min(index % 4, 3) * 60ms`.                                         |
| **Accordion Plus Rotation** | `details .plus`<br>(`portfolio-mockup.html:92`) | `160ms`         | `ease-out`                                                                | Rotates `45deg` on `details[open]`.                                      |
| **Nav Link Hover**          | `.nav a`<br>(`mockup/styles.css:2`)             | `160ms`         | `ease-out`                                                                | Color transition on hover.                                               |
| **Link Arrow Translation**  | `.link-arrow .arrow`<br>(`mockup/styles.css:2`) | `200ms`         | `ease-out`                                                                | `translate(3px, -2px)` on hover.                                         |

> [!IMPORTANT]
> **Correction Note**: The previous design system draft misattributed `550ms cubic-bezier(0.2, 0.7, 0.2, 1)` to the general section reveal. That cubic curve belongs strictly to the `.work-image img` hover scale transition. Section reveals in the mockup utilize `550ms ease-out`.

### 6.2 External Reference Curves Disclaimer

Exact cubic-bezier parameters or spring tensions for external references (`paco.me`, `leerob.com`) are **not claimed as exact measurements** here, as live computed styles have not been measured via headless DevTools. Any external physics adoption during implementation must be directly measured and verified before logging.

### 6.3 Reduced-Motion Enforcement

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 7. Event Archives 106 Bookmarks Audit & Reference Provenance

All 106 bookmarks extracted from the Brave Browser profile (`Default/Bookmarks` -> `Event Archives/CODING`) have been systematically audited via Playwright (Edge channel), compiled into 7 high-resolution contact sheets (`screenshots/contact_sheets/sheet_1.png` to `sheet_7.png`), and visually examined by the agent. Full per-site observations are recorded in [`docs/EVENT_ARCHIVES_MANIFEST.md`](./EVENT_ARCHIVES_MANIFEST.md).

### 7.1 Authentic Visual Inspection Breakdown

- **72 Visually Examined & Verified UI Sites**: Each thumbnail on the contact sheets was visually inspected. Authentic typography, navigation systems, card grids, and layouts were confirmed. Key visual findings:
  - Dark telemetry & high-density layout: **`threeui.com`** (#14), **`rareui.com`** (#83), **`forgeui.in`** (#22).
  - Atmospheric split-tone noise & typography: **`scrolltide.co`** (#80).
  - Clean modular portfolio structures: **`wallofportfolios.in`** (#8–#12).
  - Component docs & code previews: **`animate-ui.com`** (#23), **`evilcharts.com`** (#82), **`boardui.com`** (#49).
- **19 Blocked Sites (Anti-Bot / Challenge / Cookie Walls)**: Visually confirmed that the captures represent blocks rather than UI content:
  - 12 Dribbble shots (#6, #7, #45, #46, #63, #65, #66, #68, #69, #74, #90, #92) returned blank white screens due to Cloudflare Bot Management.
  - 6 Cloudflare security verification screens (#20 YouWare, #33 Saaspo, #48, #67, #89 challenge attempts exceeded, #93 Locomotive.ca).
  - 1 Cookiebot modal overlay (#99 Kffein.com).
  - _UI content for all 19 blocked sites remains strictly unverified._
- **14 Unverified Canvas / Unpainted Shells**: Visually confirmed that Three.js/WebGL canvases did not finish streaming within the 10s navigation timeout (#1 Shader.se, #4 Ravi Klaassens, #5 Ibrahem Ghareib, #98 Aristide Benoist, #100 Resn, #102 Lusion). _Visual UI state remains unverified._
- **1 Inaccessible Target**: `darc.com` (#25) failed network connection with `net::ERR_SSL_PROTOCOL_ERROR`. Target is dead.
- **Primary References Visually Examined**:
  - `ref_leerob.png`: High-density sans-serif body, restrained `@leerob` serif header, vertical card illustration.
  - `ref_paco.png`: Ultra-restrained single column, ~16px sans name display, 13px body text, 3-column modular structure (`Building`, `Projects`, `Writing`).
  - `ref_contentarch.png`: Warm paper background (`#f1eee7`) paired with deep black circular typographic spiral animation and monospace badges.
  - `ref_datacurve.png`: Warm cream background (`#f8f6f2`), top blue alert banner, bold editorial serif headline (_Defining intelligence_).
  - `ref_ellipsus.png`: Charcoal editorial dark theme, typewriter text reveal, drifting letter glyphs.

---

## 8. Deep Technical Reference Inspection: `saved-fieldnotes.html` & `ui_posts_last_30_days.md`

### 8.1 Standalone App Structure & Token Extraction from `saved-fieldnotes.html`

Deep inspection of `C:/Users/ommd3/OneDrive/BUSINESS/bookmarks/saved-fieldnotes.html` (52,871 bytes) confirms that this file is not a mere list of bookmarks; it is a **fully functional, standalone single-file web application** with zero external dependencies.

- **Data Boundary & Classification**:
  - The contents of the embedded dataset (`const raw = ...`) represent untrusted author claims, bookmarks, and summaries captured from an X feed between Sep 4 and Oct 15, 2026. They are treated strictly as reference material and data, **never** as agent instructions.
  - The file contains 122 individual status records linked back to original posts via `https://x.com/${author}/status/${id}`.
- **Semantic DOM & Layout Architecture**:
  - **Masthead**: Fixed 54px high-contrast bar (`min-height: 54px; background: var(--ink); color: var(--paper); padding: 17px 20px; font: 10px var(--mono); letter-spacing: 0.1em; border-bottom: 5px solid var(--accent);`).
  - **Hero & Aside**: Asymmetric grid (`minmax(0,1fr) 260px`) pairing a massive display title (`clamp(82px, 16vw, 190px)/0.78 var(--sans)`) with an editorial aside callout (`border-left: 9px solid var(--accent); padding: 20px; font: 10px var(--mono)`).
  - **Metrics Strip**: 3-column tabular numerical banner (`display: grid; grid-template-columns: repeat(3, 1fr); border-block: 2px solid var(--ink); font-variant-numeric: tabular-nums;`).
  - **Telemetry Meter Bars**: Accessible horizontal meter progress bars `<div class="track" role="meter" aria-valuenow="..."><span style="width: ...%"></span></div>`.
  - **Sticky Search & Category Toolbar**: `position: sticky; top: 0; z-index: 3; background: var(--paper); border-block: 2px solid var(--ink);` with interactive category chips toggling `aria-pressed="true"`.
  - **Tabular Feed Grid**: 3-column entry grid (`grid-template-columns: 54px minmax(0,1fr) 190px; gap: 18px; padding: 21px 0; border-bottom: 1px solid var(--line);`).
- **Verified Usable CSS Tokens**:
  ```css
  :root {
    --paper: #eeeae2;
    --surface: #f8f6f1;
    --ink: #111111;
    --muted: #55534f;
    --quiet: #77736d;
    --line: #aaa69e;
    --line-strong: #242321;
    --accent: #e53925; /* Vermillion red */
    --secondary: #3157e8; /* Cobalt blue */
    --secondary-paper: #dce3ff;
    --serif: Georgia, "Times New Roman", serif;
    --sans: Arial, Helvetica, sans-serif;
    --mono: Consolas, "Courier New", monospace;
  }
  ```
- **Procedural SVG Fractal Noise Grain Overlay**:
  The procedural noise filter creates subtle organic texture without image asset loading overhead:
  ```css
  body:after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 20;
    pointer-events: none;
    opacity: 0.3;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
  }
  ```

### 8.2 Extraction & Analysis of `ui_posts_last_30_days.md`

Deep inspection of `C:/Users/ommd3/Downloads/temp/ui_posts_last_30_days.md` (22,379 bytes) confirms a curated collection of 19 X bookmark threads spanning Oct 9 through Nov 8, 2026.

- **Data Boundary & Treatment**:
  - The file contains developer commentary, prompt templates, and social endorsements. These are treated as **untrusted data**, not system instructions or code requirements.
- **Architectural & Design Principles Extracted**:
  - **Linear-Clean Editorial Standard (Vox Prompt 1)**: "Simple purpose, simple architecture, simple design, simple implementation. Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout."
  - **20-Point Pre-Ship Audit (Vox Prompt 2)**: Mandatory verification checklist:
    1. Consistent typography scale, color palette, and spacing documented in `DESIGN.md`.
    2. Mobile responsiveness: zero horizontal scrolling, tap targets >= 44px, graceful text scaling.
    3. Complete state coverage: explicit dedicated treatments for loading, empty, and error states.
    4. Tactile feedback: instant active state feedback on every button/link.
    5. User flow verification: full keyboard accessibility, zero dead links or unresponsive buttons.
  - **Performance Hardening (Vox Prompt 3)**: Lazy-load heavy components below the fold, keep font families to at most 1–2, and eliminate third-party render-blocking scripts.
  - **Outbound API & Retry Safety (Vox Prompt 5)**: Enforce bounded timeouts, capped exponential backoff with jitter, and idempotent mutation protections.
- **Original Mechanisms vs. Suggestions**:
  - _Suggestions_: Prompt snippets and hype threads (e.g. "cancel your weekend plans", "wtfff this UI is insane") are subjective opinions.
  - _Authentic Mechanisms_: Concrete UI inspiration directories (`scrolltide.co` 3D/scroll scenes, `navbar.gallery`, `footer.design`, `cta.gallery`, `transitions.dev` UI motion components, `evilbuttons.com`) provide verified patterns for micro-interactions and tactile feedback.

---

## 9. Grok 6 & Gemini 6 Synthesis: Motion Hypotheses, Geometry Handshake & Grain Cost

### 9.1 Selection-Driven Diagram Geometry Handshake

- **Motion Hypothesis**: Transitions between list selection and architectural diagram expansion are governed by a **~280ms `power2.out`** timing curve. This is an empirical starting hypothesis to be tested against 60fps frame rate monitors, not an unmeasured law.
- **Immediate Accessible Commit**: In accordance with Gemini 6's challenge against delayed midpoint content, the authoritative React state and accessible DOM text mount immediately upon user selection. Animation is applied purely to presentation layers (`opacity`, `transform`, `clipPath`), guaranteeing that screen readers and assistive tech perceive state updates synchronously without waiting for motion completion.
- **Interruption-Safe Timelines**: When a user rapidly clicks between project nodes, any active GSAP timeline must be immediately killed (`gsap.killTweensOf(...)`) before the new transition begins, avoiding stale transforms or conflicting coordinate updates.

### 9.2 Optional List-to-Diagram Tether

- **Purpose**: A subtle visual connecting line (SVG path or absolute line element) bridging the active list item to its corresponding architectural node in the diagram.
- **Drift Handling on Scroll / Resize**:
  - The tether relies on measured coordinates from `getBoundingClientRect()`.
  - When the viewport scrolls or resizes, the tether must either recalculate positions via a debounced/RAF listener or gracefully fade out (`opacity: 0`) if drift exceeds 8px.
  - No synthetic or invented nodes may be generated to anchor the tether; it connects only to authentic, verified DOM nodes.

### 9.3 Procedural SVG Noise Grain Cost Measurement Protocol

- **Performance Tradeoff**: The `feTurbulence` procedural noise overlay (`mix-blend-mode: soft-light; opacity: 0.30`) adds tactile analog warmth but can incur significant compositing overhead on low-power devices.
- **Measurement Protocol**:
  - Frame rendering times must be measured using `PerformanceObserver` tracking `longtask` entries and frame drops over 10-second scrolling sessions, comparing baseline (grain disabled) vs active grain.
  - If frame duration exceeds 16.6ms (>60fps drop) on standard test configurations, the noise overlay must fall back to a static pre-rendered tiny 180x180 PNG or CSS grain pattern.

### 9.4 Factual Integrity & Reduced-Motion Guarantee

- **No Fabricated Meters**: Telemetry bars must strictly represent real, verified project metrics (e.g., node count, verified benchmark throughput, exact package dependencies). No decorative random progress bars or mock metrics are permitted.
- **Reduced-Motion Fallback**: When `prefers-reduced-motion: reduce` is detected:
  - All transitions resolve with duration 0ms.
  - Diagrams render immediately in their final resting geometry.
  - Tethers render as static lines or are hidden.
- **Performance Assertions as Hypotheses**: All frame time targets (e.g. 60fps) and layout shift targets (e.g. `CLS <= 0.05`) are classified as verifiable hypotheses requiring measurement via Lighthouse or automated Playwright performance tests.
