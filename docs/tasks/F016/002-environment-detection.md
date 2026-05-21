# Task 002: Environment Detection

## Feature
F016 - Application Runtime Integration Layer

## Description
Implement the `detectEnvironment()` utility that returns a `RuntimeEnvironment` snapshot. This function must be SSR-safe — it must not access `window`, `document`, or `matchMedia` on the server and must gracefully fall back to safe defaults.

## Files
- `src/runtime/detectEnvironment.ts` (create)

## Implementation Steps

1. Create `src/runtime/detectEnvironment.ts`.

2. Import `RuntimeEnvironment` from `./types`.

3. Implement `detectEnvironment()` as follows:

   ```ts
   import type { RuntimeEnvironment } from "./types"

   export function detectEnvironment(): RuntimeEnvironment {
     const isBrowser = typeof window !== "undefined"

     return {
       isBrowser,
       supportsReducedMotion: isBrowser
         ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
         : false,
       supportsHover: isBrowser
         ? window.matchMedia("(hover: hover)").matches
         : false,
       supportsPointer: isBrowser
         ? window.matchMedia("(pointer: fine)").matches
         : false,
     }
   }
   ```

4. Do not call `detectEnvironment()` at module load time — it must only be called at runtime inside a component or hook.

## Constraints
- Must not throw in SSR environments (no `window`, `document`, or `matchMedia` access without guard)
- Must not use `typeof document` to detect browser — use `typeof window` consistently
- No React imports — this is a pure utility function
- No side effects at module level

## Acceptance Criteria
- `src/runtime/detectEnvironment.ts` exports `detectEnvironment`
- Returns `isBrowser: false` and all `supports*: false` when `window` is undefined
- Returns accurate media query results when `window` is defined
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. In a test, mock `window` as undefined and assert all returned fields are `false`
3. In a test with `window` defined, assert `isBrowser: true`
