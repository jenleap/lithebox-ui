# Task 004: Token Hydration

## Feature
F016 - Application Runtime Integration Layer

## Description
Implement `injectTokens()`, a utility that injects resolved design tokens as CSS custom properties onto `document.documentElement` (the `:root`). This enables global CSS variable availability across the entire document rather than a scoped `<div>`. Must be SSR-safe (no-op on server). Returns a cleanup function that removes the injected properties.

## Files
- `src/runtime/injectTokens.ts` (create)

## Implementation Steps

1. Create `src/runtime/injectTokens.ts`.

2. Import `tokensToCSSVariables` from `../tokens/tokensToCSSVariables`.

3. Import `Tokens` type from `../tokens/types`.

4. Implement `injectTokens()`:

   ```ts
   import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
   import type { Tokens } from "../tokens/types"

   export function injectTokens(tokens: Tokens): () => void {
     if (typeof document === "undefined") return () => {}

     const cssVars = tokensToCSSVariables(tokens)
     const root = document.documentElement

     for (const [key, value] of Object.entries(cssVars)) {
       root.style.setProperty(key, value)
     }

     return () => {
       for (const key of Object.keys(cssVars)) {
         root.style.removeProperty(key)
       }
     }
   }
   ```

5. The function returns a cleanup callback that removes all injected properties. This callback is used as the return value of `useIsomorphicLayoutEffect` in `LitheboxProvider`.

## Constraints
- Must not access `document` without guard — return a no-op cleanup `() => {}` when on the server
- Do not call at module level — only called inside a `useIsomorphicLayoutEffect`
- No React imports — pure utility
- `tokensToCSSVariables` returns keys that are already valid CSS custom property names (e.g. `"--color-primary"`)

## Acceptance Criteria
- `src/runtime/injectTokens.ts` exports `injectTokens`
- When `document` is undefined, calling `injectTokens` returns a no-op function without throwing
- When `document` is defined, CSS variables are set on `document.documentElement.style`
- Calling the returned cleanup function removes all injected variables
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. In a test (jsdom), call `injectTokens(defaultTokens)` and assert `document.documentElement.style.getPropertyValue("--color-primary")` is non-empty
3. Call the cleanup function and assert the property is removed
