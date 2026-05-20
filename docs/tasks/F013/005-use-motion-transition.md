# Task 005: useMotionTransition Hook

## Feature
F013 - Motion & Animation Layer

## Description
Implement `useMotionTransition` — the core runtime hook that resolves a `MotionContract` into `React.CSSProperties` for a given lifecycle phase (`"enter"` or `"exit"`). This hook reads motion tokens, checks reduced motion preference, and produces the correct inline styles for applying a transition.

## Files
- `src/motion/useMotionTransition.ts` (create)

## Implementation Steps

1. Add a resolver helper (unexported) in the same file:

   ```ts
   function resolvePrimitive(
     primitive: MotionPrimitive,
     phase: "from" | "to",
     reducedMotion: boolean
   ): React.CSSProperties
   ```

   Resolution rules:
   - If `reducedMotion` is `true`:
     - `opacity` is always the `"to"` value (no opacity animation)
     - `transform` is always `"none"` (disabled)
     - `transition` is `"none"`
   - If `reducedMotion` is `false`:
     - `opacity` comes from `primitive.opacity[phase]`
     - `transform` comes from `primitive.transform[phase]` (if `"none"`, omit `transform`)
     - `transition` is built from motion tokens: `"opacity ${duration[primitive.duration]} ${easing[primitive.easing]}, transform ${duration[primitive.duration]} ${easing[primitive.easing]}"`
     - If `primitive.transform.from === "none"`, only animate `opacity` (omit `transform` from transition string)

2. Export `useMotionTransition`:

   ```ts
   export function useMotionTransition(
     contract: MotionContract,
     active: boolean
   ): React.CSSProperties
   ```

   - Calls `useReducedMotion()` internally
   - `active: true` → resolve with `"to"` phase of `enter` primitive
   - `active: false` → resolve with `"from"` phase of `exit` primitive (with exit easing/duration)
   - The returned styles are ready to spread directly onto a `style` prop

3. Import `MotionContract`, `MotionPrimitive` from `./types`, `motionTokens` from `./motionTokens`, `useReducedMotion` from `./useReducedMotion`.

## Constraints
- No `any` types
- Must not hardcode timing values — all values come from `motionTokens`
- `reducedMotion: true` disables all transform and uses `"none"` for transition
- Returns `React.CSSProperties` — valid inline style object only

## Acceptance Criteria
- `useMotionTransition(ModalMotionContract, true)` returns styles with `opacity: 1`, `transform: "scale(1) translateY(0)"`, and a valid `transition` string
- `useMotionTransition(ModalMotionContract, false)` returns styles with `opacity: 0`, `transform: "scale(0.97) translateY(4px)"`
- When reduced motion is active, `transition` is `"none"` and `transform` is omitted
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call with `ModalMotionContract` and `active: true` — verify `opacity` is `1`
3. Mock `useReducedMotion` to return `true` — verify `transition` is `"none"`

## Notes
This hook is the only place where `MotionPrimitive` token keys are resolved to actual CSS values. No component may build transition strings manually.
