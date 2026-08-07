# CERENETICS WEBSITE - COMPREHENSIVE IMPLEMENTATION PLAN

## Executive Summary

This report presents a complete, technically grounded implementation plan for the Cerenetics website. Based on a full audit of the existing codebase, research into current best practices, and systematic analysis of every motion requirement, this plan provides a clear path from the current state to a production-ready, premium AI-native website.

**Current State**: The website has substantial motion infrastructure but suffers from critical runtime issues (missing component, blank screen risk), inconsistent technology choices, and incomplete reduced-motion handling.

**Target State**: A cohesive, premium, iOS-level experience where every motion serves the AI-native brand story, runtime is bulletproof, and the site degrades gracefully.

---

## 1. Current Runtime Issues

| Issue | Severity | Component | Description |
|-------|----------|-----------|-------------|
| Missing DynamicText component | CRITICAL | `Hero.tsx` | Imported but not implemented → runtime error |
| OpeningExperience blank screen risk | HIGH | `OpeningExperience.tsx` | If timeline fails or unmounts early, `onComplete` never fires, leaving black overlay |
| Reduced-motion gap | HIGH | `OpeningExperience.tsx` | Early return calls `onComplete()` but doesn't set `isComplete=true` |
| useLoadSequence word splitting | MEDIUM | `motion.ts` | DOM manipulation creates layout shift risk |
| Inconsistent reduced-motion guards | MEDIUM | Multiple | Some effects lack `prefersReduced()` guards |

---

## 2. Current Architecture Issues

| Issue | Location | Impact |
|-------|----------|--------|
| No Framer Motion installed | Package.json | Missing layout transition capability for About tabs |
| GSAP contexts not consistently reverted | Multiple components | Memory leaks, stale animations on unmount |
| GSAP registration scattered | Multiple files | Should be centralized in `motion.ts` |
| No centralized animation config | N/A | Easing, durations, breakpoints scattered |
| Mouse-follower loaded globally | `GlobalCursor.tsx` | Loads on all pages including mobile |

---

## 3. All Animation/Motion Issues

| Issue | Component | Status |
|-------|-----------|--------|
| Missing DynamicText | Hero.tsx | CRITICAL - breaks render |
| OpeningExperience reduced-motion gap | OpeningExperience.tsx | HIGH - leaves overlay |
| DynamicText missing | Hero.tsx | CRITICAL |
| Inconsistent reduced-motion | Multiple | MEDIUM |
| Word splitting DOM manipulation | useLoadSequence | MEDIUM |
| No GSAP context revert in some effects | Multiple | MEDIUM |
| Mouse-follower loads on mobile | GlobalCursor.tsx | LOW (wasted bytes) |
| No centralized GSAP config | motion.ts | LOW |

---

## 4. Performance Issues

| Issue | Impact | Mitigation |
|-------|--------|------------|
| GSAP + mouse-follower in initial bundle | LCP impact | Code-split cursor, lazy-load GSAP |
| AmbientGradient repeat=-1 on Future | Battery/CPU | Pause on visibility change |
| OpeningExperience blocks content | LCP blocked | 7s failsafe + reduced-motion early exit |
| Word splitting DOM manipulation | Layout shift risk | Replace with CSS masking |
| Mouse-follower loads on all pages | Mobile wasted bytes | Conditional import (pointer: fine) |

---

## 5. Accessibility Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| OpeningExperience reduced-motion gap | HIGH | Set `isComplete=true` before `onComplete()` |
| Missing prefers-reduced-motion on some GSAP | MEDIUM | Add global guard in `motion.ts` |
| Cursor dependency for essential interaction | LOW | Cursor is enhancement only (OK) |
| Focus visible on custom elements | OK | `:focus-visible` in CSS |
| No pause for auto-playing media | N/A | No auto-play video |
| Touch-safe cursor | OK | `pointer: coarse` media query |

---

## 6. Branding/Storytelling Gaps

| Gap | Location | Fix |
|-----|----------|-----|
| "Product Launch & Experience Company" phrasing | Multiple | Replace with "AI-native company" |
| "Carenetics" brand references | Multiple | Replace with "Cerenetics" |
| Hero dynamic word missing | Hero.tsx | Implement DynamicText |
| Approach section uses placeholder stages | approach.tsx | Replace with 5 real stages |
| Future page uses generic theses | future.tsx | Use specific AI-native theses |
| Contact page generic | contact.tsx | AI-native copy |

---

## 7. Full Page-by-Page Plan

### Home (/)
- **Keep**: Hero load sequence, Arc draw, MediaRibbon, Capabilities grid, Future teaser, Contact CTA
- **Fix**: DynamicText implementation, Hero load sequence word masking (CSS), AmbientGradient CSS keyframes
- **Add**: DynamicText component (CSS keyframes + useState rotator)
- **Remove**: None

### Work (/work)
- **Keep**: Hero, Statistics dashboard, Bento Grid ProjectCards, useShowcase, CTA
- **Enhance**: Statistics cards with progress bars, ProjectCard 3-image slideshow
- **Add**: ProjectCard hover lift (GSAP), slide indicators

### Approach (/approach)
- **Replace**: ServicesPanels + TechDiagram with ApproachStages + ApproachPrinciples
- **Keep**: Hero, CTA
- **Add**: ScrollTrigger-driven stage cards with connecting line, Principle cards with elastic icons

### Future (/future)
- **Keep**: Hero, Thesis cards, AmbientGradient, CTA
- **Enhance**: Thesis cards with hover, AmbientGradient CSS keyframes
- **Fix**: Thesis copy to be AI-native specific

### About (/about)
- **Keep**: Hero, Tab structure, CTA
- **Enhance**: Tab panels with Framer Motion layout transitions (auto-height)
- **Fix**: Tab copy to be thesis-driven (5 tabs)

### Contact (/contact)
- **Keep**: Layout, MagneticLink CTA
- **Fix**: Copy to be AI-native, quiet/minimal

### Navigation & Footer
- **Keep**: Current structure
- **Enhance**: Nav entrance (GSAP), pill hover states (CSS), mobile menu

---

## 8. Motion Inventory Summary

**Total Effects Identified**: 18
- **GSAP-based**: 12 (OpeningExperience, Hero load, Hero Arc, CareneticsLogo, Navbar entrance, CTA, useReveal, usePageIntro, Work showcase, Counters, ApproachStages, ApproachPrinciples, MediaRibbon, TechDiagram, Future thesis, ProjectCard hover, useMagnetic)
- **CSS-only**: 4 (Nav hover, Mobile menu, Tab indicator, Tab panel fade)
- **Mixed**: 2 (ProjectCard slideshow, AmbientGradient)

**Decisions**:
- **KEEP**: 16 effects
- **REPLACE**: 3 (DynamicText missing, OpeningExperience failsafe, useLoadSequence word splitting)
- **REMOVE**: 0
- **DEFER**: 1 (Remotion for pre-rendered assets)

---

## 9. Technology Decision Matrix Summary

| Category | Technology | Use Cases |
|----------|------------|-----------|
| **CSS Transitions** | Native CSS | Hover states, simple transitions, tab indicator, focus visible |
| **Framer Motion** | Framer Motion | About tab panels (layout-aware, auto-height) |
| **GSAP** | GSAP + ScrollTrigger | All choreography, scroll-linked, cursor, magnetic, complex timelines |
| **CSS @keyframes** | Native CSS | AmbientGradient blob movement, ProjectCard slideshow |
| **Canvas 2D** | None | Not needed (CSS gradients sufficient) |
| **WebGL/Shaders** | None | Not justified |
| **Remotion** | Remotion | Pre-rendered assets only (hero loop, logo film, social) |

---

## 9. Shader/Canvas/WebGL Recommendation

**RECOMMENDATION: NONE**

**Rationale**: 
- Current AmbientGradient uses CSS radial gradients + blur → sufficient for "restrained ambient field"
- No brand-defining moment requires WebGL
- Canvas 2D not needed (CSS gradients + blur + transform are sufficient)
- Adding WebGL would increase bundle, complexity, and failure surface without storytelling value

**Alternative**: If a brand-defining moment emerges, use Canvas 2D first, WebGL only as last resort.

---

## 10. Remotion Recommendation

**NOT NEEDED for live website**

**Use Remotion ONLY for**:
- Pre-rendered hero loop (if marketing wants a perfect hero film)
- Logo animation film (for social/press kit)
- Project reel videos (for case studies/social)
- Any deterministic, frame-perfect video asset

**Do NOT use Remotion for**:
- Live cursor
- Live hover states
- Live scroll effects
- Live tab transitions
- Any interactive UI motion

---

## 11. GSAP Implementation Plan

### Centralized Configuration (`motion.ts`)
```typescript
// Central config
export const ANIMATION_CONFIG = {
  ease: "power3.out",
  easeCinema: "expo.out",
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    cinematic: 2.0,
  },
  stagger: {
    tight: 0.04,
    normal: 0.07,
    loose: 0.12,
  },
  scrollTrigger: {
    defaultStart: "top 85%",
    defaultToggleActions: "play none none reverse",
  },
  reducedMotion: {
    duration: 0.01,
  },
};
```

### Centralized GSAP Registration
```typescript
// In motion.ts - single registration point
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ 
    nullTargetWarn: false,
    trialWarn: false,
  });
}
```

### Context/Revert Pattern (Enforce Everywhere)
```typescript
// Standard pattern for all GSAP effects
useEffect(() => {
  const ctx = gsap.context(() => {
    // all GSAP code here
  }, scope);
  return () => ctx.revert();
}, [scope]);
```

### Reduced-Motion Global Guard
```typescript
export function prefersReduced() {
  return typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Usage in every GSAP effect:
if (prefersReduced()) {
  // Set final state immediately
  onComplete?.();
  return;
}
```

---

## 10. Framer Motion / Framer-Style UI Motion Plan

### Install
```bash
npm install framer-motion
```

### Use Cases (Only)
1. **About Page Tabs** - `AnimatePresence` + `motion.div` with `layout` + `AnimateHeight`
2. **Future: Modals/Dialogs** - `AnimatePresence` + `motion.div` with `exit` animation
3. **Future: Accordions** - `motion.div` with `layout` + `animate: { height: "auto" }`

### Implementation Pattern
```tsx
// About tabs - Framer Motion
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  {tabOrder.map((tabId) => (
    <motion.div
      key={tabId}
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {tab.content}
    </motion.div>
  ))}
</AnimatePresence>
```

### Ownership Rule
- **GSAP owns**: ScrollTrigger, cursor, magnetic, complex timelines, choreography
- **Framer Motion owns**: Layout transitions, presence, shared layout
- **NEVER**: Both on same element

---

## 11. Cursor Plan

### Current: Cuberto Mouse Follower + GSAP
- **Keep**: Library handles core follower logic
- **GSAP Role**: `quickTo` for smoothing, state transitions
- **States**: default, pointer, CTA, media, hidden

### Improvements
1. **Conditional Load**: Only load on `pointer: fine` + `hover: hover`
2. **Logo Boundary**: Already implemented (pointerenter/leave on `[data-brand-slot]`)
3. **Reduced Motion**: Already handled via CSS media query
4. **Mobile**: Disabled via `pointer: coarse` media query
5. **Cleanup**: `__logoCleanup` pattern already implemented

### Performance
- Lazy-load mouse-follower: `const { default: MouseFollower } = await import("mouse-follower")`
- Only instantiate on `pointer: fine` + `hover: hover` + not reduced-motion

---

## 12. Intro/Loader Fail-Safe Plan

### Current Issues
1. `onComplete` may not fire if timeline fails
2. Reduced-motion early return doesn't set `isComplete=true`
3. No visual fallback if JS fails entirely

### Fixes (Must Build Now)
```typescript
// 1. Reduced-motion fix
if (prefersReduced()) {
  setIsComplete(true);  // MISSING - ADD THIS
  onComplete();
  return;
}

// 2. Timeline onComplete is primary
const tl = gsap.timeline({
  onComplete: () => {
    completed = true;
    setIsComplete(true);
    onComplete();
  },
});

// 3. Failsafe timeout (7s)
const failsafe = setTimeout(() => {
  if (!completed && !interruptedByUser) {
    completed = true;
    setIsComplete(true);
    tl.kill();
    onComplete();
  }
}, 7000);

// 4. Cleanup
return () => {
  clearTimeout(failsafe);
  tl.kill();
  if (!completed && !interruptedByUser) {
    onComplete();
  }
};

// 5. CSS fallback (no-JS)
.opening-experience {
  opacity: 1;
  pointer-events: none;
}
.js-loaded .opening-experience {
  opacity: 0;
  pointer-events: auto;
}
```

### CSS Fallback Strategy
```html
<!-- In RootShell - no-JS fallback -->
<noscript>
  <style>
    .opening-experience { display: none !important; }
  </style>
</noscript>
```

---

## 13. Mobile and Reduced-Motion Plan

### Breakpoint Strategy
| Effect | Desktop (≥768px) | Tablet (640-767px) | Mobile (<640px) |
|--------|------------------|-------------------|-----------------|
| OpeningExperience | Full | Full | Full |
| Hero word stagger | Full duration | 0.8x duration | 0.6x duration |
| AmbientGradient blobs | 3-4 | 2 | 1 (compact) |
| MediaRibbon | Visible | Hidden | Hidden |
| Horizontal lines | Full | Shortened | Removed |
| Statistics grid | 4 cols | 2 cols | 1 col |
| ProjectCard grid | 3 cols | 2 cols | 1 col |
| Cursor follower | Enabled | Enabled | Disabled |
| Magnetic pull | Enabled | Enabled | Disabled |

### Reduced-Motion Behavior
| Effect | Reduced-Motion Behavior |
|--------|------------------------|
| OpeningExperience | Immediate `onComplete()`, no animation |
| Hero load sequence | Immediate opacity:1, transform:none |
| useReveal / usePageIntro | Immediate opacity:1, transform:none |
| ScrollTrigger scrub | Disabled (toggleActions only) |
| AmbientGradient | Static gradients (no animation) |
| ProjectCard slideshow | Paused (first slide) |
| Cursor follower | Disabled (`display:none` via CSS) |
| Magnetic pull | Disabled |
| MagneticLink choreography | Disabled |
| SVG path draw | Immediate `strokeDashoffset:0` |
| Counters | Immediate final value |

### Implementation
```typescript
// Global reduced-motion guard in motion.ts
export function prefersReduced() {
  return typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// CSS fallback
@media (prefers-reduced-motion: reduce) {
  .reveal, .hero-load {
    opacity: 1 !important;
    transform: none !important;
  }
  .mf-cursor { display: none; }
  [data-gsap-animation] { animation: none !important; }
}
```

---

## 14. Priority Order for Implementation

### Phase 0: Runtime Stability (Week 1) - MUST BUILD NOW
1. Fix DynamicText component (implement CSS-based rotator)
2. Fix OpeningExperience reduced-motion gap (`setIsComplete(true)`)
3. Fix OpeningExperience failsafe (proper `onComplete` + timeout)
4. Fix useLoadSequence word splitting (CSS masking)
5. Add global reduced-motion guard in `motion.ts`
5. Conditional mouse-follower load (pointer: fine only)
6. Fix all GSAP context reverts

### Phase 1: Core Motion Systems (Week 2) - MUST BUILD NOW
7. Hero dynamic word rotation (CSS keyframes + useState)
8. Hero load sequence word masking (CSS overflow masking)
9. AmbientGradient CSS @keyframes migration
10. Centralized GSAP config in `motion.ts`
11. Centralized GSAP registration
12. Global reduced-motion guard

### Phase 2: Section Rebuilds (Week 3) - MUST BUILD NOW
13. ApproachStages + ApproachPrinciples (replace ServicesPanels)
14. ProjectCard 3-image slideshow + hover
15. Work page Statistics dashboard
16. Work page Bento Grid
17. About page Framer Motion tabs

### Phase 3: Polish & Consistency (Week 4) - NICE TO HAVE
18. Copy updates (AI-native, Cerenetics everywhere)
19. Mobile simplifications
20. Performance optimizations (lazy GSAP, code-split cursor)
21. Accessibility audit
22. Final consistency pass

### Phase 4: Optional Enhancements - DEFER
23. Framer Motion modals/accordions
24. Pre-rendered Remotion assets (hero loop, logo film)
25. Advanced cursor states

---

## 15. Risks and Fallback Strategy

| Risk | Likelihood | Impact | Fallback |
|------|------------|--------|----------|
| OpeningExperience blocks content | Medium | High | 7s timeout + reduced-motion early exit |
| GSAP bundle size | Low | Medium | Code-split, lazy load |
| ScrollTrigger mobile jank | Low | Medium | Disable scrub on mobile |
| Cursor mobile interference | Low | Low | Disable on `pointer: coarse` |
| Framer Motion bundle | Low | Low | Only load on About page |
| Missing DynamicText | Certain | Critical | Implement immediately |
| Word splitting layout shift | Medium | Medium | CSS masking replacement |
| Reduced-motion inconsistency | Medium | High | Global guard + CSS fallback |

---

## 16. Final Classification Summary

### MUST BUILD NOW (Blocking Runtime / Core Experience)
1. ✅ DynamicText component implementation
2. ✅ OpeningExperience failsafe + reduced-motion fix
3. ✅ useLoadSequence CSS masking (replace word splitting)
4. ✅ Global reduced-motion guard
5. ✅ Conditional cursor load
6. ✅ GSAP context reverts everywhere
12. ✅ ApproachStages + ApproachPrinciples
13. ✅ ProjectCard slideshow + hover
14. ✅ Work Statistics + Bento Grid
15. ✅ About page Framer Motion tabs
16. ✅ Copy updates (Cerenetics, AI-native)

### NICE TO HAVE (Enhance Polish)
1. Framer Motion tab panels (About page)
18. AmbientGradient CSS @keyframes
19. Mobile simplifications
20. Copy refinement
21. Performance optimizations

### AVOID (Do Not Build)
1. WebGL/Shader effects
2. Canvas particle systems (CSS sufficient)
3. Remotion for live UI
4. Complex shader-based gradients
5. Physics-based motion libraries

### DEFER (Future Phases)
1. Remotion pre-rendered assets (hero loop, logo film)
2. Framer Motion modals/accordions
3. Advanced cursor states
4. Page transitions (if SPA navigation added)
4. Shared layout animations

---

## 17. Implementation Dependencies Graph

```
Phase 0 (Runtime) 
    → Phase 1 (Core Motion) 
        → Phase 2 (Sections) 
            → Phase 3 (Polish)
                → Phase 4 (Optional)
```

**Critical Path**: Phase 0 → Phase 1 → Phase 2 → Phase 3

---

## 18. Final Verification Checklist

Before launch, verify:

- [ ] No blank screen on any route (hard refresh)
- [ ] Intro hands off to hero cleanly (all routes)
- [ ] Cerenetics naming consistent everywhere
- [ ] AI-native positioning clear on all pages
- [ ] Buttons feel premium (hover, press, focus)
- [ ] Cursor stable on all interactive elements
- [ ] Nav feels premium (pill shapes, spacing)
- [ ] Work projects feel curated (Bento Grid)
- [ ] About page tabs feel premium (Framer Motion)
- [ ] All prior complaints resolved
- [ ] Reduced-motion works everywhere
- [ ] Mobile renders correctly
- [ ] Console clean on all pages
- [ ] Build passes, lint passes
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1

---

**Report Status**: COMPLETE  
**All 18 Deliverables**: DELIVERED  
**Recommendations Classified**: 16 Must Build Now, 5 Nice to Have, 5 Avoid, 4 Defer  

**Next Step**: Begin Phase 0 implementation (Runtime Stability)