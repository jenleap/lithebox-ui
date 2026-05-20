# Task 010: Unit Tests

## Feature
F013 - Motion & Animation Layer

## Description
Write unit tests for the motion system. Focus on the pure logic (token resolution, contract shapes, reducer hook behavior) and the `useMotionTransition` hook output. Do not test animation visuals — test the logic that drives them.

## Files
- `src/motion/motionTokens.test.ts` (create)
- `src/motion/useReducedMotion.test.ts` (create)
- `src/motion/useMotionTransition.test.ts` (create)

## Implementation Steps

### motionTokens.test.ts

1. Test that `motionTokens` has the correct shape:
   - `motionTokens.duration.fast === "120ms"`
   - `motionTokens.duration.normal === "200ms"`
   - `motionTokens.duration.slow === "320ms"`
   - `motionTokens.easing.enter` starts with `"cubic-bezier"`
   - `motionTokens.scale.none === 0`
   - `motionTokens.scale.standard === 2`

2. Test that all motion contracts have an `enter` and `exit` with `duration` and `easing` keys:
   - Import `ModalMotionContract`, `ToastMotionContract`, `DrawerLeftMotionContract`
   - Verify `.enter.duration` is a key of `DurationTokens` (i.e., one of `"fast" | "normal" | "slow"`)
   - Verify `.exit.easing` is a key of `EasingTokens`

### useReducedMotion.test.ts

1. Mock `window.matchMedia` before each test:
   ```ts
   const mockMatchMedia = (matches: boolean) => {
     Object.defineProperty(window, "matchMedia", {
       writable: true,
       value: jest.fn((query: string) => ({
         matches,
         addEventListener: jest.fn(),
         removeEventListener: jest.fn(),
       })),
     })
   }
   ```

2. Test: `useReducedMotion()` returns `false` when `matches` is `false`.
3. Test: `useReducedMotion()` returns `true` when `matches` is `true`.
4. Use `renderHook` from `@testing-library/react`.

### useMotionTransition.test.ts

1. Mock `useReducedMotion` to return `false` for all standard tests.
2. Test with `ModalMotionContract, active: true`:
   - `opacity` is `1`
   - `transform` includes `"scale(1)"`
   - `transition` contains `"200ms"` (the resolved `normal` duration)
3. Test with `ModalMotionContract, active: false`:
   - `opacity` is `0`
   - `transform` includes `"scale(0.97)"`
4. Test with reduced motion mocked to `true`:
   - `transition` is `"none"`
   - `transform` is not present (or is `"none"`)
5. Test with `FadeInPrimitive`/`FadeOutPrimitive` contract (no transform):
   - `transition` string only includes `"opacity"`, not `"transform"`

## Constraints
- Use `renderHook` for hook tests
- Mock `window.matchMedia` — do not rely on jsdom's implementation
- Do not test animation visuals or CSS rendering
- No `any` types in test files

## Acceptance Criteria
- All tests pass with `npm run test`
- At minimum 12 test cases across the three files
- TypeScript compiles with no errors in test files

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors

## Notes
Follow existing test patterns in `src/a11y/` — use `describe`/`it` blocks, `renderHook` for hooks.
