# Task 004: useReducedMotion Hook

## Feature
F013 - Motion & Animation Layer

## Description
Implement the `useReducedMotion` hook that detects the user's `prefers-reduced-motion` media query preference. This hook is the system-level override mechanism — all motion consumers must check this value and disable or simplify animations when it returns `true`.

## Files
- `src/motion/useReducedMotion.ts` (create)

## Implementation Steps

1. Create `src/motion/useReducedMotion.ts` exporting `useReducedMotion`:

   ```ts
   export function useReducedMotion(): boolean
   ```

2. Implementation:
   - Use `window.matchMedia("(prefers-reduced-motion: reduce)")` to read the media query
   - Initialize state from `matchMedia().matches` on mount
   - Subscribe to `MediaQueryList` `change` events using `addEventListener("change", handler)`
   - Remove listener on cleanup
   - Return `true` if reduced motion is preferred, `false` otherwise

3. SSR safety: wrap `window.matchMedia` access in a check (`typeof window !== "undefined"`). Return `false` as the default when `window` is unavailable.

4. The hook is a pure React hook — no parameters, returns a single boolean.

## Constraints
- No `any` types
- No external dependencies — only React hooks (`useState`, `useEffect`)
- Must handle SSR safely (no `window` crash on server)
- Must clean up event listener in `useEffect` return
- Do not import from component files

## Acceptance Criteria
- `useReducedMotion()` returns `false` by default when no preference is set
- `useReducedMotion()` returns `true` when `prefers-reduced-motion: reduce` is active
- Subscribes to media query changes reactively
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Mock `window.matchMedia` in test environment and verify hook returns correct value
3. Verify listener is cleaned up on unmount

## Notes
This hook is the single accessibility gate for all motion. It must not be bypassed at the component level.
