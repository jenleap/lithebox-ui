# Task 009: Public API

## Feature
F013 - Motion & Animation Layer

## Description
Create the `src/motion/index.ts` barrel file that exports all public motion system APIs. Update `src/index.ts` to re-export from the motion module so consumers can import from `"lithebox-ui"`.

## Files
- `src/motion/index.ts` (create)
- `src/index.ts` (modify — add motion exports)

## Implementation Steps

1. Create `src/motion/index.ts` with the following exports:

   **Tokens:**
   ```ts
   export { duration, easing, motionScale, motionTokens } from "./motionTokens"
   ```

   **Types:**
   ```ts
   export type {
     DurationTokens,
     EasingTokens,
     MotionScaleTokens,
     MotionTokens,
     MotionPrimitive,
     MotionContract,
     MotionPhase,
   } from "./types"
   ```

   **Primitives:**
   ```ts
   export {
     EnterPrimitive,
     ExitPrimitive,
     SlideInLeftPrimitive,
     SlideOutLeftPrimitive,
     SlideInRightPrimitive,
     SlideOutRightPrimitive,
     FadeInPrimitive,
     FadeOutPrimitive,
     LayoutPrimitive,
   } from "./primitives"
   ```

   **Contracts:**
   ```ts
   export {
     ModalMotionContract,
     DrawerLeftMotionContract,
     DrawerRightMotionContract,
     DropdownMotionContract,
     ToastMotionContract,
     BannerMotionContract,
     PageMotionContract,
   } from "./contracts"
   ```

   **Hooks:**
   ```ts
   export { useReducedMotion } from "./useReducedMotion"
   export { useMotionTransition } from "./useMotionTransition"
   export { usePageTransition } from "./usePageTransition"
   ```

   **Components:**
   ```ts
   export { PageTransition } from "./PageTransition"
   export type { PageTransitionProps } from "./PageTransition"
   ```

2. In `src/index.ts`, add:
   ```ts
   export * from "./motion"
   ```
   Place this export after the existing `a11y` export block, following the same pattern as other module exports in that file.

## Constraints
- Only export items that are intended for external consumers
- Internal helpers (e.g., `resolvePrimitive` in `useMotionTransition.ts`) must not be exported
- All type exports must use `export type` syntax
- No new runtime logic in this file

## Acceptance Criteria
- All listed items are importable from `"lithebox-ui"` in consuming code
- `import { useReducedMotion, ModalMotionContract, motionTokens } from "lithebox-ui"` compiles without errors
- No duplicate exports between `src/motion/index.ts` and `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify `motionTokens`, `useMotionTransition`, `PageTransition` are importable from the package root

## Notes
Follow the same pattern as `src/a11y/index.ts` and the corresponding export in `src/index.ts`.
