# Storytelling Architecture - Cerenetics Website

## Brand Narrative Foundation

**Core Positioning**: Cerenetics is an AI-native company that builds digital systems and launch infrastructure.

**Brand Voice**: Sharp, calm, intelligent, premium, direct, modern

**Visual Language**: Warm monochromatic restraint (Paper/Ink/Amber), organic radii, premium pill controls, quiet confidence

---

## Page-by-Page Storytelling Architecture

---

### 1. HOME (/) - The Thesis Statement

**Primary Purpose**: Establish Cerenetics as AI-native; communicate the thesis in 3 seconds

**Audience Question**: "What is Cerenetics and why should I care?"

**Main Narrative Message**: 
> "We build the systems companies launch themselves with."
> AI-native digital systems and launch infrastructure — moving toward deeptech, healthcare, medtech.

**Visual Anchor**: 
- Hero: Dynamic word rotation ("systems" → "launch infrastructure" → "AI workflows" → "product clarity" → "deeptech interfaces" → "health platforms")
- Animated gradient background (restrained amber blobs)
- Arc drawing beneath headline

**Primary CTA**: "See the work" → `/work` (MagneticLink)

**Supporting Interactions**:
1. Hero load sequence (veil → eyebrow → headline words → copy → CTA → arc → ambient)
2. Dynamic word rotation (iOS picker-wheel style, 2.5s interval)
3. Capabilities grid (4 cards, hover border accent)
3. MediaRibbon (horizontal scroll, project thumbnails)
4. Future teaser (dark section, "Toward deeptech...")
5. Contact CTA

**What User Should Feel**: Confidence, clarity, premium intent, "these people understand the problem"

**Motion Supports Story**:
- Load sequence establishes premium choreography
- Word rotation shows breadth without clutter
- Gradient blobs = AI-native substrate (always moving, never chaotic)

**Static Elements**: Headline, copy, capabilities cards, media ribbon images

**Mobile Simplification**:
- Word stagger duration reduced
- Gradient blobs: 1 blob (compact mode)
- MediaRibbon: hidden (max-width: 767px)
- Capabilities: 1 column

---

### 2. WORK (/work) - The Evidence

**Primary Purpose**: Prove the thesis with shipped systems

**Audience Question**: "Show me what you've actually shipped."

**Main Narrative Message**: 
> "Evidence, not adjectives. Systems that shipped, launches that landed, and the delivery model behind them."

**Visual Anchor**: 
- Hero: "Evidence, not adjectives." headline
- Statistics dashboard (4 metric cards with progress bars)
- Bento Grid of ProjectCards (3 per row desktop)

**Primary CTA**: "Start a conversation" → `/contact` (MagneticLink)

**Supporting Interactions**:
1. Statistics cards with animated progress bars (85%, 75%, 90%, 94%)
2. Bento Grid of ProjectCards (3-image auto-slideshow, hover lift)
3. Each ProjectCard: index badge, 3-image carousel, outcome, discipline
3. Clicking ProjectCard → project detail (future: `/work/[slug]`)
4. Final CTA section

**What User Should Feel**: Proof-driven confidence, "these are real systems"

**Motion Supports Story**:
- Statistics cards animate in with progress bars
- ProjectCards stagger in on scroll
- ProjectCard hover = tactile depth
- Auto-slideshow = live, active systems

**Static Elements**: Statistics numbers, project titles, outcomes, disciplines

**Mobile Simplification**:
- Statistics: 1 column
- ProjectCard grid: 1 column
- Statistics progress bars: simplified

---

### 3. APPROACH (/approach) - The Operating System

**Primary Purpose**: Explain HOW we work (the operating system, not service menu)

**Audience Question**: "How do you actually work? What's different?"

**Main Narrative Message**:
> "An operating system, not a service menu. Five stages, one team, AI inside the delivery rather than around it."

**Visual Anchor**:
- Hero: "An operating system, not a service menu."
- ApproachStages: 5 vertical cards with connecting line (scroll-triggered)
- ApproachPrinciples: 4 principle cards (grid)

**Primary CTA**: "Start a conversation" → `/contact`

**Supporting Interactions**:
1. ApproachStages: 5 cards with number, title, description, detail
   - Scroll-triggered: number → title → description → detail → horizontal line
   - Vertical connecting line draws with scroll (scrub: 0.8)
2. ApproachPrinciples: 4 cards with icon elastic entrance
   - Scroll-triggered stagger

**What User Should Feel**: Clarity on process, "this is rigorous, not ad-hoc"

**Motion Supports Story**:
- Scroll-triggered reveals = progressive disclosure (like the process itself)
- Connecting line = the thread connecting all stages
- Icon elastic entrance = precision, not decoration

**Static Elements**: Stage titles, descriptions, details, principle titles/descriptions

**Mobile Simplification**:
- Vertical stack (no horizontal line)
- Principles: 1 column

---

### 4. FUTURE (/future) - The Direction

**Primary Purpose**: Show where Cerenetics is heading (deeptech, healthcare, medtech)

**Audience Question**: "Where is this going? What's next?"

**Main Narrative Message**:
> "Toward deeptech, healthcare and medtech. Cerenetics starts where we are strongest — AI-native digital systems and launch infrastructure — and moves deliberately toward the sectors where being understood has consequences."

**Visual Anchor**:
- Hero: "Toward deeptech, healthcare and medtech." + animated SVG field lines
- Thesis cards (4 cards, hover border)
- Final CTA section

**Primary CTA**: "Start a conversation" → `/contact`

**Supporting Interactions**:
1. Hero: Animated SVG field lines (path strokeDashoffset draw on scroll)
2. Thesis cards: 4 cards with hover border accent
3. AmbientGradient (subtle animated blobs)
3. Final CTA: "Ambitious, on purpose. Overclaimed, never."

**What User Should Feel**: Ambition with restraint, "they know where they're going"

**Motion Supports Story**:
- SVG field lines = trajectory, direction, field theory
- AmbientGradient = subtle energy, not chaos
- Hover on theses = engagement

**Static Elements**: Thesis titles, descriptions, final CTA copy

**Mobile Simplification**:
- Thesis cards: 1 column
- SVG field lines: simplified

---

### 5. ABOUT (/about) - The Thesis

**Primary Purpose**: Deepen trust through the Cerenetics thesis

**Audience Question**: "Who are you really? What do you believe?"

**Main Narrative Message**:
> "A new model for building digital systems. AI-native delivery. Fixed windows. No handoffs. Measured after."

**Visual Anchor**:
- Hero: "A new model for building digital systems."
- 5 Tabs: Who We Are → How We Think → How We Build → What We Believe → What Makes Us Different

**Primary CTA**: "Start a conversation" → `/contact`

**Supporting Interactions**:
1. Premium tab system (animated indicator, fade-in panels)
2. Tab 1 (Who We Are): AI-native thesis
3. Tab 2 (How We Think): Structure before surface
4. Tab 3 (How We Build): Models in the loop
5. Tab 4 (What We Believe): Clarity carries consequence
5. Tab 5 (What Makes Us Different): 4 principle cards

**What User Should Feel**: Intellectual depth, "these people think differently"

**Motion Supports Story**:
- Tab indicator smooth transition = precision
- Panel fade-in = clean transitions
- Tab content = progressive disclosure of thesis

**Static Elements**: All tab content, principle cards

**Mobile Simplification**:
- Tab list: scrollable horizontal
- Tab panels: 1 column
- Principle cards: 1 column

---

### 5. CONTACT (/contact) - The Handshake

**Primary Purpose**: Convert interest into conversation

**Audience Question**: "How do I start?"

**Main Narrative Message**:
> "Tell us what you are trying to make understood. A paragraph is enough to start."

**Visual Anchor**:
- Left: Headline + email + hours
- Right: "Write to the studio" CTA (MagneticLink)

**Primary CTA**: "Write to the studio" → mailto: (MagneticLink)

**Supporting Interactions**:
1. Email link hover (color transition)
2. MagneticLink hover/press choreography
3. Minimal, quiet, direct

**What User Should Feel**: Easy, direct, "they'll actually reply"

**Motion Supports Story**: Minimal - only CTA choreography

**Static Elements**: Headline, copy, email, hours

**Mobile Simplification**:
- Stacked layout
- CTA full width

---

### 6. NAVIGATION & FOOTER - The Chrome

**Navigation Purpose**: Orient, navigate, brand

**Footer Purpose**: Close, brand, legal

**Visual Anchor**:
- Nav: Logo + 3 pills (Work, Approach, Future) + Contact pill
- Footer: Logo + "AI-native company" + email + copyright

**Supporting Interactions**:
1. Nav entrance (slide down)
2. Nav item hover (underline scaleX)
3. Contact pill hover (background + shadow)
4. Mobile menu (slide down)
5. Logo hover (opacity)

**What User Should Feel**: Oriented, premium, stable

**Mobile Simplification**:
- Hamburger menu
- Contact in mobile menu

---

## Cross-Page Motion Consistency

| Motion Pattern | Pages | Consistency Rule |
|----------------|-------|------------------|
| Section reveal (useReveal) | All pages | Same stagger, timing, trigger |
| Page intro (usePageIntro) | All pages | Same choreography |
| MagneticLink | All CTAs | Same choreography |
| ScrollTrigger defaults | All | start: "top 85%", toggleActions: "play none none reverse" |
| Reduced-motion | All | Immediate opacity:1, transform:none |
| Easing | All GSAP | `power3.out` (EASE), `expo.out` (EASE_CINEMA) |

---

## Visual Anchor Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| 1 | Hero headline | Primary message |
| 2 | Visual anchor (gradient, arc, SVG) | Emotional tone |
| 3 | Supporting copy | Context |
| 4 | Primary CTA | Action |
| 5 | Supporting sections | Evidence/depth |
| 6 | Footer CTA | Final action |

---

## Mobile Simplification Rules

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Grid columns | 3-4 | 2 | 1 |
| Gradient blobs | 3-4 | 2 | 1 (compact) |
| MediaRibbon | Visible | Hidden | Hidden |
| Horizontal lines | Full | Shortened | Removed |
| Tab list | Full | Scrollable | Scrollable |
| Statistics | 4 cols | 2 cols | 1 col |
| ProjectCards | 3 cols | 2 cols | 1 col |
| Cursor | Enabled | Enabled | Disabled |
| Magnetic pull | Enabled | Enabled | Disabled |

---

## Reduced-Motion Behavior

| Effect | Reduced-Motion Behavior |
|--------|------------------------|
| OpeningExperience | Immediate `onComplete()`, no animation |
| Hero load sequence | Immediate opacity:1, transform:none |
| useReveal / usePageIntro | Immediate opacity:1, transform:none |
| ScrollTrigger scrub | Disabled (toggleActions only) |
| AmbientGradient | No animation (static gradients) |
| ProjectCard slideshow | Paused (first slide only) |
| Cursor follower | Disabled (display:none via CSS) |
| Magnetic pull | Disabled |
| MagneticLink choreography | Disabled |
| SVG path draw | Immediate strokeDashoffset:0 |
| Counters | Immediate final value |