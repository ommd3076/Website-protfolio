# Motion Inventory - Cerenetics Website

## Current Implemented Effects

### 1. Opening Experience (Intro/Loader)

- **Component**: `OpeningExperience.tsx`
- **Purpose**: Cinematic brand introduction on first visit
- **Trigger**: Page load (mounted in RootComponent)
- **Technology**: GSAP Timeline + ScrollTrigger
- **Properties**:
  - Dark screen background
  - Ambient particles (CSS radial gradients)
  - Animated gradient blob (3 radial gradients with blur)
  - Logo reveal (CareneticsLogo component with GSAP)
  - Light ray sweep (linear gradient with blur)
  - Particle parallax
  - Mask reveal (clipPath inset animation)
  - Container fade out
- **Duration**: ~3.5s total (forced duration 5.2s on timeline)
- **Easing**: power2.out, power3.out, expo.out, expo.inOut, power2.in
- **Desktop**: Full experience
- **Mobile**: Same (no breakpoint differentiation)
- **Reduced-motion**: Early return calls `onComplete()` immediately
- **Fallback**: 7-second failsafe timeout calls `onComplete()` regardless
- **Performance Cost**: Moderate (multiple GSAP tweens, CSS gradients with blur)
- **Cleanup**: Timeline kill, event listener removal, timeout clear
- **Risk Level**: High (blank screen risk if fails)
- **Decision**: KEEP with improvements (add proper fallback rendering)

### 2. Hero Load Sequence (useLoadSequence)

- **Component**: `motion.ts` - `useLoadSequence`
- **Purpose**: Cinematic hero entrance on Home page
- **Trigger**: Page load (Hero component mounts)
- **Technology**: GSAP Timeline + matchMedia
- **Properties**:
  - Veil scaleY reveal
  - Eyebrow letter-spacing + fade
  - Headline word-by-word mask reveal (staggered)
  - Supporting copy fade + slide
  - CTA fade + slide
  - Arc draw (scaleX)
  - Ambient gradient scale + fade
- **Duration**: ~2.5s total
- **Easing**: power3.out (EASE), expo.out (EASE_CINEMA)
- **Desktop**: Full word-mask staggering
- **Mobile**: Reduced durations
- **Reduced-motion**: Immediate opacity:1, transform:none
- **Fallback**: None explicit (relies on reduced-motion)
- **Performance Cost**: High (word splitting, multiple timelines)
- **Cleanup**: Context revert, timeline kill, text restoration
- **Risk Level**: Medium (word splitting DOM manipulation)
- **Decision**: KEEP with reduced-motion guard

### 3. Hero Dynamic Word Rotation

- **Component**: `Hero.tsx` uses `DynamicText` (not found in codebase - appears missing)
- **Status**: MISSING - Hero references `DynamicText` but component not found
- **Purpose**: Rotating word in headline
- **Risk**: HIGH - Missing component will cause runtime error

### 4. Ambient Gradient (Future Page)

- **Component**: `AmbientGradient.tsx`
- **Purpose**: Ambient animated gradient blobs on Future page
- **Trigger**: Component mount
- **Technology**: GSAP (repeating tweens)
- **Properties**: 3-4 gradient blobs with repeating x/y transforms
- **Duration**: 22-31s (repeating)
- **Easing**: sine.inOut
- **Desktop**: 3-4 blobs animating
- **Mobile**: Only 1 blob (compact mode)
- **Reduced-motion**: Early return, no animation
- **Fallback**: Static gradients
- **Performance Cost**: Low-Medium (transform-only, repeat=-1)
- **Cleanup**: Tween kill on unmount
- **Risk Level**: Low
- **Decision**: KEEP

### 4. CareneticsLogo Reveal

- **Component**: `CareneticsLogo.tsx`
- **Purpose**: Logo animation with multiple modes
- **Modes**: static, reveal, reactive
- **Reveal Mode**: GSAP timeline with frame, crescent, inner arc, starburst
- **Reactive Mode**: Pointer enter/leave transforms on elements
- **Technology**: GSAP
- **Reduced-motion**: Early return, clears inline styles
- **Cleanup**: Context revert, timeline kill
- **Risk Level**: Low-Medium
- **Decision**: KEEP

### 5. Navbar Entrance

- **Component**: `HeaderBar.tsx`
- **Purpose**: Navbar slide-down on page load
- **Technology**: GSAP (fromTo y:-18, opacity:0 → 0,1)
- **Duration**: 0.72s
- **Delay**: 0.08s
- **Easing**: power3.out
- **Reduced-motion**: Early return
- **Cleanup**: Timeline kill
- **Risk Level**: Low
- **Decision**: KEEP

### 5. Nav Item Hover

- **Component**: `HeaderBar.tsx`
- **Purpose**: Nav item underline animation
- **Technology**: CSS transitions (transform scaleX)
- **Properties**: scaleX 0→1 on hover, scaleX 1 for active
- **Duration**: 500ms
- **Easing**: ease-out
- **Technology**: CSS only
- **Decision**: KEEP (CSS preferred)

### 6. Nav Contact Button

- **Component**: `HeaderBar.tsx`
- **Purpose**: CTA-style contact button in nav
- **Technology**: CSS transitions (background, color, box-shadow)
- **Decision**: KEEP

### 7. Mobile Menu

- **Component**: `HeaderBar.tsx`
- **Purpose**: Slide-down mobile navigation
- **Technology**: CSS only (absolute positioning)
- **Decision**: KEEP

### 8. BrandMarkSlot

- **Component**: `BrandMarkSlot.tsx`
- **Purpose**: Logo + wordmark in navbar/footer
- **Technology**: CSS transitions (opacity)
- **Decision**: KEEP

### 9. CTA (MagneticLink)

- **Component**: `CTA.tsx` (MagneticLink)
- **Purpose**: Primary CTA with magnetic pull, fill sweep, label/arrow choreography
- **Technology**: GSAP (useMagnetic + custom enter/leave/press)
- **Properties**:
  - Magnetic pull (quickTo x/y)
  - Fill sweep (scaleY 0→1)
  - Label y-offset (-3→0)
  - Arrow x-offset (0→4)
  - Press scale (1→0.97)
  - Release elastic.out
- **Technology**: GSAP (quickTo, to)
- **Reduced-motion**: Early return
- **Pointer-fine only**: matchMedia check
- **Cleanup**: Event listener removal
- **Decision**: KEEP

### 9. useReveal (Section Reveals)

- **Component**: `motion.ts` - `useReveal`
- **Purpose**: Scroll-triggered section reveals
- **Technology**: GSAP ScrollTrigger
- **Properties**:
  - Grouped by `data-reveal-group`
  - Staggered y:60→0, opacity:0→1
  - Start: "top 85%"
  - ToggleActions: "play none none reverse"
- **Technology**: GSAP ScrollTrigger
- **Reduced-motion**: Immediate opacity:1, transform:none
- **Decision**: KEEP

### 10. usePageIntro

- **Component**: `motion.ts` - `usePageIntro`
- **Purpose**: Page-level entrance choreography
- **Technology**: GSAP Timeline
- **Properties**: y:-30→0, opacity:0→1, stagger:0.07
- **Duration**: 0.72s
- **Easing**: power3.out
- **Reduced-motion**: Immediate
- **Decision**: KEEP

### 11. Work Page Showcase (useShowcase)

- **Component**: `work.tsx` - `useShowcase`
- **Purpose**: Project grid scroll animations
- **Technology**: GSAP ScrollTrigger
- **Properties**:
  - Frame clipPath inset + y
  - Image scale 1.18→1
  - Copy stagger yPercent:55→0
- **Trigger**: "top 82%"
- **Scrub**: None (toggleActions)
- **Decision**: KEEP

### 12. Work Page Counters

- **Component**: `Counters.tsx`
- **Purpose**: Animated number counters
- **Technology**: GSAP + ScrollTrigger
- **Properties**:
  - Number tween (0→value)
  - Parent yPercent:30→0, opacity:0→1
- **Trigger**: "top 88%", "top 90%"
- **Decision**: KEEP

### 12. ServicesPanels (Approach)

- **Component**: `ServicesPanels.tsx`
- **Purpose**: Horizontal scroll-driven panel switching
- **Technology**: GSAP ScrollTrigger + scrub
- **Properties**: x transform with scrub:1
- **Pointer override**: hover takes over
- **Decision**: KEEP (functional scroll interaction)

### 13. TechDiagram (Approach)

- **Component**: `TechDiagram.tsx`
- **Purpose**: Interactive node diagram
- **Technology**: GSAP + ScrollTrigger
- **Properties**:
  - Path draw (strokeDashoffset)
  - Node scale/opacity
  - Hover/focus state changes
- **Trigger**: "top 78%"
- **Decision**: KEEP (functional)

### 13. ProjectCard Slideshow

- **Component**: `ProjectCard.tsx`
- **Purpose**: Auto-advancing image slideshow (3 images)
- **Technology**: CSS transitions (opacity) + GSAP (slide transition)
- **Properties**:
  - Auto-advance every 1.8s (paused on hover)
  - Slide fade (opacity + scale)
  - Indicators
- **Reduced-motion**: Early return
- **Hover**: Card lift + shadow (GSAP)
- **Decision**: KEEP

### 14. ApproachStages

- **Component**: `ApproachStages.tsx`
- **Purpose**: Scroll-triggered stage cards with connecting line
- **Technology**: GSAP ScrollTrigger + scrub
- **Properties**:
  - Card entrance (opacity, y)
  - Number, title, description, detail stagger
  - Horizontal line scaleX
  - Vertical connecting line scaleY (scrub:0.8)
- **Decision**: KEEP

### 15. ApproachPrinciples

- **Component**: `ApproachPrinciples.tsx` (in ApproachStages.tsx)
- **Purpose**: Principle cards with icon animation
- **Technology**: GSAP ScrollTrigger
- **Properties**: Card opacity/y, icon elastic entrance
- **Decision**: KEEP

### 15. About Page Tabs

- **Component**: `about.tsx` - Tabs component
- **Purpose**: Tabbed content with animated indicator
- **Technology**: CSS transitions + useState
- **Properties**:
  - Indicator width/position transition
  - Panel fade-in (CSS animate-in)
- **Decision**: KEEP (CSS-based)

### 16. MediaRibbon

- **Component**: `MediaRibbon.tsx`
- **Purpose**: Horizontal scrolling project ribbon
- **Technology**: GSAP ScrollTrigger + scrub
- **Properties**: x transform with scrub:0.8
- **Hover**: Scale 1.025 (CSS)
- **Decision**: KEEP

### 17. Magnetic Pull (useMagnetic)

- **Component**: `motion.ts` - `useMagnetic`
- **Purpose**: Magnetic pull on CTA elements
- **Technology**: GSAP quickTo
- **Strength**: 0.28-0.34
- **Decision**: KEEP

### 17. Future Page Theses

- **Component**: `FuturePage.tsx`
- **Purpose**: Thesis cards with SVG path draw
- **Technology**: GSAP ScrollTrigger
- **Properties**: Path strokeDashoffset draw
- **Trigger**: "top 84%"
- **Decision**: KEEP

### 18. Future Page AmbientGradient

- **Component**: `FuturePage.tsx` uses `AmbientGradient`
- **Decision**: See AmbientGradient above

### 18. Arc Draw (Hero)

- **Component**: `Hero.tsx` uses `Arc`
- **Purpose**: Arc path draw animation
- **Technology**: GSAP (useLoadSequence)
- **Properties**: scaleX:0.72→1, yPercent:8→0
- **Decision**: KEEP

---

## Missing / Broken Effects

### ❌ Missing: DynamicText Component

- **Referenced in**: `Hero.tsx` (imported but not found)
- **Impact**: Runtime error on Hero render
- **Severity**: CRITICAL

### ❌ Potential Issue: OpeningExperience Blank Screen Risk

- **Component**: `OpeningExperience.tsx`
- **Issue**: If timeline fails or component unmounts early, `onComplete` may not fire, leaving black overlay
- **Mitigation**: 7s failsafe exists but could be more robust

### ⚠️ Potential Issue: useLoadSequence Word Splitting

- **Component**: `motion.ts` - `useLoadSequence`
- **Issue**: `splitWords` creates DOM nodes, could cause layout shift
- **Mitigation**: Restores text on cleanup

### ⚠️ Potential Issue: OpeningExperience Reduced-Motion

- **Component**: `OpeningExperience.tsx`
- **Issue**: Calls `onComplete()` immediately but doesn't set `isComplete=true` before return
- **Fix**: Should set `setIsComplete(true)` before `onComplete()`

---

## Summary Statistics

| Category                 | Count                                  |
| ------------------------ | -------------------------------------- |
| Total Effects Identified | 18                                     |
| GSAP-based               | 12                                     |
| CSS-only                 | 4                                      |
| Mixed (CSS+GSAP)         | 2                                      |
| Critical Issues          | 1 (Missing DynamicText)                |
| High Risk                | 1 (OpeningExperience blank screen)     |
| Medium Risk              | 2 (Word splitting, reduced-motion gap) |
| Low Risk                 | 14                                     |

---

## Decisions Summary

| Effect                         | Decision                                |
| ------------------------------ | --------------------------------------- |
| OpeningExperience              | KEEP (with failsafe improvements)       |
| Hero Load Sequence             | KEEP                                    |
| DynamicText                    | REPLACE (missing - implement or remove) |
| Ambient Gradient               | KEEP                                    |
| CareneticsLogo                 | KEEP                                    |
| Navbar Entrance                | KEEP                                    |
| Nav Hover                      | KEEP (CSS)                              |
| CTA MagneticLink               | KEEP                                    |
| useReveal                      | KEEP                                    |
| usePageIntro                   | KEEP                                    |
| Work Showcase                  | KEEP                                    |
| Counters                       | KEEP                                    |
| ServicesPanels                 | KEEP                                    |
| TechDiagram                    | KEEP                                    |
| ProjectCard Slideshow          | KEEP                                    |
| ApproachStages                 | KEEP                                    |
| ApproachPrinciples             | KEEP                                    |
| About Tabs                     | KEEP (CSS)                              |
| MediaRibbon                    | KEEP                                    |
| useMagnetic                    | KEEP                                    |
| Future Theses                  | KEEP                                    |
| Arc Draw                       | KEEP                                    |
| DynamicText (missing)          | REPLACE (implement or remove reference) |
| OpeningExperience failsafe     | REPLACE (improve)                       |
| useLoadSequence word splitting | REPLACE (simplify)                      |
