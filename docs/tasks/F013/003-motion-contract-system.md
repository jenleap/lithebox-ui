# Task 003: Motion Contract System

## Feature
F013 - Motion & Animation Layer

## Description
Define the motion contract type and create all system-level motion contracts for overlays, feedback, and page transitions. Motion contracts map component lifecycle phases (enter/exit) to specific motion primitives.

## Files
- `src/motion/types.ts` (modify — add MotionContract type)
- `src/motion/contracts.ts` (create)

## Implementation Steps

1. Add `MotionContract` type to `src/motion/types.ts`:
   ```ts
   export type MotionContract = {
     enter: MotionPrimitive
     exit: MotionPrimitive
   }
   ```

2. Create `src/motion/contracts.ts` importing from `./primitives` and `./types`. Export one contract per component system:

   - `ModalMotionContract: MotionContract` —
     - `enter`: `EnterPrimitive`
     - `exit`: `ExitPrimitive`

   - `DrawerLeftMotionContract: MotionContract` —
     - `enter`: `SlideInLeftPrimitive`
     - `exit`: `SlideOutLeftPrimitive`

   - `DrawerRightMotionContract: MotionContract` —
     - `enter`: `SlideInRightPrimitive`
     - `exit`: `SlideOutRightPrimitive`

   - `DropdownMotionContract: MotionContract` —
     - `enter`: `FadeInPrimitive`
     - `exit`: `FadeOutPrimitive`

   - `ToastMotionContract: MotionContract` —
     - `enter`: — opacity `{ from: 0, to: 1 }`, transform `{ from: "translateY(8px)", to: "translateY(0)" }`, duration `"normal"`, easing `"enter"` (inline, not a named primitive)
     - `exit`: — opacity `{ from: 1, to: 0 }`, transform `{ from: "translateY(0)", to: "translateY(-8px)" }`, duration `"fast"`, easing `"exit"` (inline)

   - `BannerMotionContract: MotionContract` —
     - `enter`: `FadeInPrimitive`
     - `exit`: `FadeOutPrimitive`

   - `PageMotionContract: MotionContract` —
     - `enter`: `FadeInPrimitive`
     - `exit`: `FadeOutPrimitive`

3. Each contract is exported as a `const` with the `MotionContract` type annotation.

## Constraints
- No `any` types
- All contracts explicitly typed as `MotionContract`
- No hardcoded timing values — all `duration` and `easing` fields are token keys
- Do not import from component files

## Acceptance Criteria
- `src/motion/contracts.ts` exports all 7 contracts
- Each satisfies the `MotionContract` type
- `ModalMotionContract.enter.duration` is `"normal"`
- `DrawerLeftMotionContract.exit.transform.to` is `"translateX(-100%)"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `ModalMotionContract` and verify enter/exit shape

## Notes
Contracts bind component identity to specific motion behavior. Components do not select their own animation — they are assigned a contract from this file.
