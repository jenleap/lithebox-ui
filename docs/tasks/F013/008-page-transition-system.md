# Task 008: Page Transition System

## Feature
F013 - Motion & Animation Layer

## Description
Implement a basic page transition system providing a `usePageTransition` hook and a `PageTransition` wrapper component. This supports optional fade transitions between pages while respecting reduced motion. This is intentionally minimal — no routing integration, no animation engine.

## Files
- `src/motion/usePageTransition.ts` (create)
- `src/motion/PageTransition.tsx` (create)

## Implementation Steps

1. Create `src/motion/usePageTransition.ts` exporting `usePageTransition`:

   ```ts
   export function usePageTransition(active: boolean): React.CSSProperties
   ```

   - Calls `useMotionTransition(PageMotionContract, active)` internally
   - Returns the resolved `React.CSSProperties`
   - No additional logic — this is a thin alias over `useMotionTransition` specialized to `PageMotionContract`

2. Create `src/motion/PageTransition.tsx` exporting `PageTransition`:

   ```ts
   export type PageTransitionProps = {
     active: boolean
     children: React.ReactNode
   }

   export function PageTransition({ active, children }: PageTransitionProps)
   ```

   - Calls `usePageTransition(active)` for styles
   - Renders a `<div>` with the resolved motion styles spread onto its `style` prop
   - No additional markup — just the wrapper `<div>`

3. Import `useMotionTransition` from `./useMotionTransition`, `PageMotionContract` from `./contracts`, `usePageTransition` from `./usePageTransition`.

## Constraints
- No routing library dependencies
- No animation engine dependencies
- Only opacity-based transitions for pages (no transform) — `PageMotionContract` uses `FadeInPrimitive`/`FadeOutPrimitive`
- Reduced motion compliance is handled by `useMotionTransition` — no duplicate logic
- No `any` types

## Acceptance Criteria
- `usePageTransition(true)` returns `{ opacity: 1, transition: "opacity 120ms cubic-bezier(0, 0, 0.2, 1)" }` (approximately)
- `usePageTransition(false)` returns `{ opacity: 0 }`
- `<PageTransition active={false}>` renders content wrapped in a faded `<div>`
- When reduced motion is active, `transition` is `"none"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `PageTransition` and render with `active={false}` — verify opacity is `0`
3. Verify reduced motion case produces `transition: "none"`

## Notes
Page transitions are opt-in — they are not applied automatically. Consumers wrap content in `<PageTransition active={...}>` when they want this behavior.
