# Task 001: Motion Token Types and Default Tokens

## Feature
F013 - Motion & Animation Layer

## Description
Define the TypeScript type system for motion tokens and create the default motion token values (duration, easing, motionScale). These are the foundational primitives that all animation in the system derives from.

## Files
- `src/motion/types.ts` (create)
- `src/motion/motionTokens.ts` (create)

## Implementation Steps

1. Create `src/motion/types.ts` with the following types:
   - `DurationTokens` — shape: `{ fast: string; normal: string; slow: string }`
   - `EasingTokens` — shape: `{ standard: string; enter: string; exit: string }`
   - `MotionScaleTokens` — shape: `{ none: 0; subtle: 1; standard: 2; expressive: 3 }`
   - `MotionTokens` — shape: `{ duration: DurationTokens; easing: EasingTokens; scale: MotionScaleTokens }`

2. Create `src/motion/motionTokens.ts` exporting the default token values:
   ```ts
   export const duration: DurationTokens = {
     fast: "120ms",
     normal: "200ms",
     slow: "320ms",
   } as const

   export const easing: EasingTokens = {
     standard: "cubic-bezier(0.2, 0, 0, 1)",
     enter: "cubic-bezier(0, 0, 0.2, 1)",
     exit: "cubic-bezier(0.4, 0, 1, 1)",
   } as const

   export const motionScale: MotionScaleTokens = {
     none: 0,
     subtle: 1,
     standard: 2,
     expressive: 3,
   } as const

   export const motionTokens: MotionTokens = {
     duration,
     easing,
     scale: motionScale,
   } as const
   ```

3. All exports use `as const` for full literal type inference.

## Constraints
- No `any` types
- All values use `as const`
- Do not import from component files
- Duration values must be CSS-compatible strings (e.g., `"120ms"`)
- Easing values must be valid CSS easing functions

## Acceptance Criteria
- `src/motion/types.ts` exports `DurationTokens`, `EasingTokens`, `MotionScaleTokens`, `MotionTokens`
- `src/motion/motionTokens.ts` exports `duration`, `easing`, `motionScale`, `motionTokens`
- TypeScript compiles with no errors
- `motionTokens.duration.fast` resolves to `"120ms"` at type level

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `motionTokens` and verify all fields are present

## Notes
These tokens are the single source of truth for all timing values in the system. No component may use raw timing strings.
