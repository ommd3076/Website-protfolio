# Technical Decision Matrix - Cerenetics Website

## Decision Framework

| Technology                          | Use When                                                                                                                                                                                            | Avoid When                                                                                           |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **CSS Transitions/Animations**      | Simple state changes (hover, focus, active), color/opacity/border changes, simple transforms, staggered delays via CSS custom properties                                                            | Complex choreography, scroll-linked animation, cross-element coordination, physics-based motion      |
| **Framer Motion / Spring Patterns** | Layout-aware transitions (tabs, accordions, modals), shared layout animations, button press states, panel resizing, drag interactions, presence animations                                          | Complex multi-step choreography, scroll-linked animation, cursor followers, canvas/WebGL integration |
| **GSAP**                            | Complex choreographed sequences, scroll-linked animations (ScrollTrigger), precise timeline orchestration, cursor followers, magnetic effects, morphing, line drawing, scroll-driven state machines | Simple hover states, layout transitions where Framer Motion excels, when CSS suffices                |
| **Canvas 2D**                       | Lightweight procedural particles, simple geometric patterns, custom drawing where CSS is insufficient, pixel manipulation                                                                           | 3D, complex shaders, when CSS gradients/backgrounds suffice, simple particle systems                 |
| **WebGL/Shaders**                   | Brand-defining visual moments impossible with CSS/Canvas, complex fluid simulations, custom lighting, post-processing                                                                               | Anything achievable with CSS/Canvas, decorative-only effects, when fallback is complex               |
| **Remotion**                        | Pre-rendered video assets (hero loops, logo films, project reels, social assets), deterministic frame-perfect compositions                                                                          | Live interactive UI, hover states, cursor, scroll, tabs, navigation, live website animation engine   |

---

## Technology Decision Matrix

| #                            | Requirement / Effect                                                                   | Current Tech                       | Recommended Tech                                      | Rationale                                                                                      | Priority               |
| ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
| **Intro/Loader**             |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 1                            | Opening Experience (dark screen → particles → blob → logo → light sweep → mask → hero) | GSAP Timeline                      | **GSAP Timeline**                                     | Complex choreography, precise timing, ScrollTrigger not needed, timeline callbacks for handoff | Must build now         |
| 2                            | Opening Experience failsafe                                                            | setTimeout                         | **GSAP onComplete + setTimeout fallback**             | Timeline onComplete is primary, setTimeout is safety net                                       | Must build now         |
| 3                            | Reduced-motion intro                                                                   | Early return                       | **Early return + setIsComplete(true) + onComplete()** | Must set isComplete before calling onComplete                                                  | Must build now         |
| **Hero**                     |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 4                            | Hero load sequence (veil, eyebrow, headline words, copy, CTA, arc, ambient)            | GSAP Timeline + matchMedia         | **GSAP Timeline**                                     | Complex choreography, word-mask staggering, precise timing                                     | Must build now         |
| 5                            | Hero word-by-word reveal                                                               | GSAP word splitting                | **GSAP + CSS masking**                                | Word splitting DOM manipulation is fragile; use CSS overflow masking instead                   | Must build now (fix)   |
| 6                            | Hero dynamic word rotation                                                             | Missing (DynamicText)              | **CSS keyframes + JS state**                          | Simple rotation doesn't need GSAP; CSS keyframes + state machine                               | Must build now (fix)   |
| 7                            | Hero Arc draw                                                                          | GSAP                               | **GSAP**                                              | Path drawing requires GSAP's strokeDashoffset control                                          | Keep                   |
| 8                            | Hero AmbientGradient                                                                   | GSAP repeating                     | **CSS @keyframes + GSAP**                             | Blob movement can be CSS @keyframes; GSAP only for intensity control                           | Nice to have           |
| **Navbar**                   |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 9                            | Navbar entrance (slide down)                                                           | GSAP                               | **GSAP**                                              | Simple but choreographed with page load; GSAP timeline                                         | Keep                   |
| 10                           | Nav item hover underline                                                               | CSS transition                     | **CSS transition**                                    | Simple transform scaleX; CSS is sufficient                                                     | Keep                   |
| 11                           | Nav contact button hover                                                               | CSS transition                     | **CSS transition**                                    | Color/background/shadow changes; CSS sufficient                                                | Keep                   |
| 12                           | Mobile menu slide                                                                      | CSS                                | **CSS**                                               | Simple slide; CSS transition sufficient                                                        | Keep                   |
| **Cursor**                   |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 13                           | Cursor follower (Cuberto mouse-follower)                                               | mouse-follower lib + GSAP          | **mouse-follower + GSAP quickTo**                     | Library handles core; GSAP quickTo for smoothing                                               | Keep                   |
| 14                           | Cursor states (pointer, CTA, media, hidden)                                            | CSS + library states               | **CSS + library**                                     | Library manages states; CSS for visual                                                         | Keep                   |
| 14b                          | Cursor logo boundary hiding                                                            | Custom pointerenter/leave          | **Custom + library -hidden state**                    | Library supports -hidden state; use pointerenter/leave                                         | Keep                   |
| **CTA (MagneticLink)**       |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 15                           | Magnetic pull                                                                          | GSAP quickTo                       | **GSAP quickTo**                                      | Requires frame-accurate pointer following                                                      | Keep                   |
| 15b                          | Fill sweep (scaleY)                                                                    | GSAP to                            | **GSAP to**                                           | Choreographed with label/arrow; GSAP timeline                                                  | Keep                   |
| 15b                          | Label/arrow choreography                                                               | GSAP to                            | **GSAP to**                                           | Choreographed multi-property; GSAP timeline                                                    | Keep                   |
| 15c                          | Press/release scale                                                                    | GSAP to                            | **GSAP to**                                           | Elastic release needs GSAP easing                                                              | Keep                   |
| **Scroll-Triggered Reveals** |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 16                           | useReveal (section fades)                                                              | GSAP ScrollTrigger                 | **GSAP ScrollTrigger**                                | Scroll-linked, grouped, staggered; ScrollTrigger purpose-built                                 | Keep                   |
| 17                           | usePageIntro (page entrance)                                                           | GSAP Timeline                      | **GSAP Timeline**                                     | Choreographed entrance; GSAP timeline                                                          | Keep                   |
| **Work Page**                |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 18                           | Work showcase (clipPath, scale, stagger)                                               | GSAP ScrollTrigger                 | **GSAP ScrollTrigger**                                | Scroll-linked clipPath/scale; scrub not used but toggleActions                                 | Keep                   |
| 19                           | Counters (number tween + entrance)                                                     | GSAP + ScrollTrigger               | **GSAP + ScrollTrigger**                              | Number tween + entrance; ScrollTrigger for trigger                                             | Keep                   |
| 20                           | ProjectCard slideshow                                                                  | CSS transition + GSAP              | **CSS transition + GSAP**                             | Slideshow is CSS opacity; hover lift is GSAP                                                   | Keep                   |
| 21                           | ProjectCard hover lift                                                                 | GSAP                               | **GSAP**                                              | Box-shadow + y transform; GSAP for elastic feel                                                | Keep                   |
| **Approach**                 |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 21                           | ApproachStages (cards + lines)                                                         | GSAP ScrollTrigger + scrub         | **GSAP ScrollTrigger + scrub**                        | Scrubbed line drawing + card entrances; ScrollTrigger purpose                                  | Keep                   |
| 22                           | ApproachPrinciples (cards + icons)                                                     | GSAP ScrollTrigger                 | **GSAP ScrollTrigger**                                | Staggered card + icon elastic entrance                                                         | Keep                   |
| **About Page**               |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 22                           | Tab switching                                                                          | CSS transition + useState          | **CSS + Framer Motion**                               | Layout-aware panel transitions; Framer Motion auto-height                                      | Nice to have (upgrade) |
| 23                           | Tab indicator                                                                          | CSS transition                     | **CSS transition**                                    | Simple width/position; CSS sufficient                                                          | Keep                   |
| 23                           | Tab panel fade                                                                         | CSS animate-in                     | **CSS @keyframes**                                    | Simple fade; CSS sufficient                                                                    | Keep                   |
| **Work Page**                |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 24                           | MediaRibbon horizontal scroll                                                          | GSAP ScrollTrigger + scrub         | **GSAP ScrollTrigger + scrub**                        | Scrubbed horizontal scroll; ScrollTrigger purpose                                              | Keep                   |
| 25                           | ProjectCard hover                                                                      | GSAP                               | **GSAP**                                              | Lift + shadow; GSAP for elastic feel                                                           | Keep                   |
| 25b                          | ProjectCard slideshow                                                                  | CSS opacity + GSAP                 | **CSS + GSAP**                                        | Slideshow CSS; transition GSAP                                                                 | Keep                   |
| **Future Page**              |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 26                           | Thesis cards SVG draw                                                                  | GSAP ScrollTrigger                 | **GSAP ScrollTrigger**                                | Path strokeDashoffset; ScrollTrigger purpose                                                   | Keep                   |
| 27                           | AmbientGradient                                                                        | GSAP repeating                     | **CSS @keyframes + GSAP**                             | Blob movement CSS; GSAP for intensity                                                          | Nice to have           |
| **Contact**                  |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 27                           | Form interactions                                                                      | CSS                                | **CSS**                                               | Standard form; CSS sufficient                                                                  | Keep                   |
| **Footer**                   |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 28                           | Footer entrance                                                                        | useReveal                          | **GSAP ScrollTrigger**                                | Same as useReveal                                                                              | Keep                   |
| **Global**                   |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 29                           | Page transitions                                                                       | None                               | **None (SSR)**                                        | TanStack Start SSR; no client-side page transitions needed                                     | Defer                  |
| 30                           | Image lazy loading                                                                     | Native loading="lazy"              | **Native**                                            | Browser native; no JS needed                                                                   | Keep                   |
| 31                           | Reduced-motion global                                                                  | prefers-reduced-motion media query | **CSS media query + JS guard**                        | CSS for CSS animations; JS guard for GSAP                                                      | Must build now         |
| 32                           | Focus visible states                                                                   | CSS :focus-visible                 | **CSS**                                               | Native browser support                                                                         | Keep                   |
| **Missing/Broken**           |                                                                                        |                                    |                                                       |                                                                                                |                        |
| 33                           | DynamicText (missing)                                                                  | Missing                            | **CSS keyframes + useState**                          | Implement simple rotator; no GSAP needed                                                       | Must build now         |
| 34                           | OpeningExperience failsafe                                                             | setTimeout                         | **GSAP onComplete + setTimeout**                      | Primary onComplete + 7s timeout                                                                | Must build now         |
| 35                           | useLoadSequence word splitting                                                         | DOM manipulation                   | **CSS overflow masking**                              | Replace DOM splitting with CSS overflow:hidden + transform                                     | Must build now         |
| 36                           | OpeningExperience reduced-motion gap                                                   | Early return without setIsComplete | **setIsComplete(true) before onComplete()**           | Must build now                                                                                 |

---

## Technology Summary by Category

### CSS Transitions/Animations (Use First)

- Nav item hover underline
- Nav contact button hover
- Mobile menu slide
- Tab indicator
- Tab panel fade
- Focus visible states
- Image lazy loading (native)
- Focus visible states

### Framer Motion / Spring Patterns (Use for Layout Transitions)

- About page tab panels (auto-height, layout-aware)
- Modal/dialog presence (future)
- Accordion/collapse (future)
- Shared layout transitions (future)

### GSAP (Use for Choreography & Scroll-Linked)

- Opening Experience (full timeline)
- Hero load sequence (full timeline)
- Hero Arc draw
- CareneticsLogo reveal/reactive
- Navbar entrance
- CTA MagneticLink (all sub-animations)
- useReveal / usePageIntro
- Work showcase (clipPath, scale)
- Counters
- ApproachStages (scrub)
- ApproachPrinciples
- MediaRibbon (scrub)
- TechDiagram
- Future thesis SVG draw
- ProjectCard hover lift
- useMagnetic (quickTo)

### CSS @keyframes / GSAP Hybrid

- Hero AmbientGradient blobs (CSS keyframes for movement, GSAP for intensity)
- Future page AmbientGradient (CSS keyframes)
- ProjectCard slideshow (CSS opacity transitions)

### Canvas 2D

- None currently needed (AmbientGradient uses CSS gradients)

### WebGL/Shaders

- **None recommended** - No brand-defining moment requiring WebGL

### Remotion

- **Not needed for live site** - Only if pre-rendered assets needed (hero loop, logo film, project reels for social)

---

## Anti-Patterns to Avoid

| Anti-Pattern                                    | Current Instance                      | Fix                                         |
| ----------------------------------------------- | ------------------------------------- | ------------------------------------------- |
| DOM word splitting for text animation           | `useLoadSequence` → `splitWords`      | Use CSS overflow masking + transform        |
| Missing component reference                     | `Hero.tsx` imports `DynamicText`      | Implement `DynamicText` or remove           |
| setTimeout chains instead of timeline callbacks | OpeningExperience failsafe            | Use `onComplete` + setTimeout fallback      |
| Reduced-motion early return without state sync  | OpeningExperience reduced-motion      | Set `isComplete=true` before `onComplete()` |
| DOM manipulation in render path                 | `splitWords` creates spans            | Use CSS-only masking                        |
| No cleanup for GSAP contexts                    | Some useEffect missing `ctx.revert()` | Ensure all GSAP contexts have cleanup       |
| Mixing animation engines on same element        | None currently                        | Enforce ownership rule                      |

---

## Performance Budget

| Metric                 | Target          | Current Risk                   |
| ---------------------- | --------------- | ------------------------------ |
| LCP                    | < 2.5s          | Medium (intro blocks)          |
| INP                    | < 200ms         | Low                            |
| CLS                    | < 0.1           | Low (transform-only)           |
| JS Bundle              | < 200KB gzipped | Medium (GSAP + mouse-follower) |
| Animation frame budget | 16.67ms (60fps) | Low (transform/opacity only)   |

---

## Accessibility Compliance

| Requirement                  | Status  | Action                                      |
| ---------------------------- | ------- | ------------------------------------------- |
| prefers-reduced-motion       | Partial | Fix OpeningExperience gap; add global guard |
| prefers-reduced-motion (CSS) | Done    | CSS media query covers CSS animations       |
| Keyboard navigation          | Partial | Verify all interactive elements             |
| Focus visible                | Done    | `:focus-visible` in CSS                     |
| Motion intensity reduction   | Partial | Reduce-motion guards in GSAP effects        |
| Pause/stop moving media      | N/A     | No auto-playing video                       |
| Contrast                     | Done    | Tailwind colors meet WCAG                   |
| Touch-safe                   | Done    | Pointer media queries in cursor             |
| No cursor dependency         | Partial | Cursor is enhancement only                  |

---

## Mobile Simplification Plan

| Effect                          | Desktop                 | Mobile                     |
| ------------------------------- | ----------------------- | -------------------------- |
| OpeningExperience               | Full                    | Same (no breakpoint)       |
| Hero word stagger               | Full                    | Reduced duration           |
| AmbientGradient blobs           | 3-4 blobs               | 1 blob (compact mode)      |
| MediaRibbon                     | Horizontal scroll       | Hidden (max-width: 767px)  |
| ApproachStages                  | Horizontal line + cards | Vertical stack             |
| MediaRibbon                     | Scrubbed scroll         | Hidden                     |
| ProjectCard grid                | 3 cols                  | 1 col                      |
| Cursor follower                 | Enabled                 | Disabled (pointer: coarse) |
| Magnetic pull                   | Enabled                 | Disabled (pointer: coarse) |
| MagneticLink hover choreography | Enabled                 | Disabled (pointer: coarse) |
