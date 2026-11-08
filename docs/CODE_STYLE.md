# Code Style & TypeScript Standards

**Subject**: Development Standards, Type Safety, and Composition  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08  
**Repository**: `portfolio-site`

---

## 1. Strict TypeScript Standards

1. **Zero `any` Policy**:
   - `any` is strictly prohibited across the entire codebase.
   - Use explicit interfaces, generic parameters, or `unknown` with runtime type guards (via Zod or `typeof`/`instanceof`).
2. **Strict Property Types**:
   - Handle optional properties cleanly. When interacting with libraries utilizing strict optional property types (e.g. React Aria), ensure props are typed as `T | undefined` or explicitly omit unset keys.
3. **Type Colocation**:
   - Component prop interfaces must be defined directly above the component in the same file and named `${ComponentName}Props`.
   - Shared data contracts (Projects, Notes, Telemetry) belong in `src/data/` or `src/types/`.

---

## 2. Naming Conventions

- **React Components**: PascalCase (`ProjectCard.tsx`, `TelemetryOrb.tsx`).
- **Hooks**: camelCase starting with `use` (`usePrefersReducedMotion.ts`).
- **Utilities & Helpers**: kebab-case or camelCase (`cx.ts`, `format-date.ts`).
- **CSS Classes**: Tailwind utility classes only. Custom semantic utility classes must be mapped via `@theme inline`.
- **Constants**: UPPER_SNAKE_CASE (`ANIMATION_DURATION`, `BREAKPOINTS`).

---

## 3. Component Composition Patterns

1. **Single Responsibility**:
   - Decouple data retrieval and presentation. Presentational components must accept pure props and emit pure callbacks.
2. **Deterministic State Props**:
   - Components participating in the global state machine must receive their active state via props or a typed selector from the state store, avoiding isolated local state duplication.
3. **Class Merging**:
   - Always merge Tailwind classes using `cn()` / `cx()` (`clsx` + `tailwind-merge`) to allow external overrides without specificity wars:
   ```typescript
   import { cx } from "@/utils/cx";

   export function Badge({ className, children }: BadgeProps) {
     return (
       <span className={cx("inline-flex items-center text-xs font-mono", className)}>
         {children}
       </span>
     );
   }
   ```

---

## 4. Animation & Lifecycle Teardown Standards

1. **Guaranteed Cleanup**:
   - Every animation listener, RAF handle, GSAP context, or intersection observer created in a component MUST be cleaned up on unmount.
2. **Prevent Layout Thrashing**:
   - Never query layout properties (`offsetWidth`, `clientHeight`) repeatedly inside animation frames. Read values once in `useLayoutEffect` or cache them.
3. **No Zombie Callbacks**:
   - Ensure timeouts or async fetch promises verify component mount state before invoking state setters.
