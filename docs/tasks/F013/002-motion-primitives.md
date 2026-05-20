# Task 002: Motion Primitives

## Feature
F013 - Motion & Animation Layer

## Description
Define reusable motion primitive objects for enter, exit, and layout transitions. These are system-level animation patterns that motion contracts are built from. All values reference tokens by key, not raw values.

## Files
- `src/motion/primitives.ts` (create)

## Implementation Steps

1. Add the following types to `src/motion/types.ts` (extend the file from Task 001):
   - `MotionPhase` — `"enter" | "exit" | "layout"`
   - `TransformOrigin` — `"center" | "top" | "bottom" | "left" | "right"`
   - `MotionPrimitive` — shape:
     ```ts
     {
       opacity: { from: number; to: number }
       transform: { from: string; to: string }
       duration: keyof DurationTokens
       easing: keyof EasingTokens
     }
     ```

2. Create `src/motion/primitives.ts` exporting:
   - `EnterPrimitive: MotionPrimitive` —
     - `opacity: { from: 0, to: 1 }`
     - `transform: { from: "scale(0.97) translateY(4px)", to: "scale(1) translateY(0)" }`
     - `duration: "normal"`
     - `easing: "enter"`
   - `ExitPrimitive: MotionPrimitive` —
     - `opacity: { from: 1, to: 0 }`
     - `transform: { from: "scale(1) translateY(0)", to: "scale(0.97) translateY(4px)" }`
     - `duration: "fast"`
     - `easing: "exit"`
   - `SlideInLeftPrimitive: MotionPrimitive` —
     - `opacity: { from: 0, to: 1 }`
     - `transform: { from: "translateX(-100%)", to: "translateX(0)" }`
     - `duration: "normal"`
     - `easing: "enter"`
   - `SlideOutLeftPrimitive: MotionPrimitive` —
     - `opacity: { from: 1, to: 0 }`
     - `transform: { from: "translateX(0)", to: "translateX(-100%)" }`
     - `duration: "fast"`
     - `easing: "exit"`
   - `SlideInRightPrimitive: MotionPrimitive` —
     - `opacity: { from: 0, to: 1 }`
     - `transform: { from: "translateX(100%)", to: "translateX(0)" }`
     - `duration: "normal"`
     - `easing: "enter"`
   - `SlideOutRightPrimitive: MotionPrimitive` —
     - `opacity: { from: 1, to: 0 }`
     - `transform: { from: "translateX(0)", to: "translateX(100%)" }`
     - `duration: "fast"`
     - `easing: "exit"`
   - `FadeInPrimitive: MotionPrimitive` —
     - `opacity: { from: 0, to: 1 }`
     - `transform: { from: "none", to: "none" }`
     - `duration: "fast"`
     - `easing: "enter"`
   - `FadeOutPrimitive: MotionPrimitive` —
     - `opacity: { from: 1, to: 0 }`
     - `transform: { from: "none", to: "none" }`
     - `duration: "fast"`
     - `easing: "exit"`
   - `LayoutPrimitive: MotionPrimitive` —
     - `opacity: { from: 1, to: 1 }`
     - `transform: { from: "none", to: "none" }`
     - `duration: "normal"`
     - `easing: "standard"`

3. All exports use `as const`.

## Constraints
- No hardcoded timing strings — `duration` and `easing` fields must be keys, not values
- Only `opacity` and `transform` properties — no height/width animation in MVP
- No React, no side effects
- Import `MotionPrimitive`, `DurationTokens`, `EasingTokens` from `./types`

## Acceptance Criteria
- All primitives exported from `src/motion/primitives.ts`
- Each primitive satisfies `MotionPrimitive` type
- `EnterPrimitive.duration` is `"normal"` (a key, not `"200ms"`)
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `EnterPrimitive` and verify `duration` is `"normal"`, not `"200ms"`

## Notes
Primitives describe intent using token keys. A separate resolver maps keys to actual CSS values at runtime.
