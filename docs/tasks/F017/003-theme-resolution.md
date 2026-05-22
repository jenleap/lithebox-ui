# Task 003: Theme Resolution Engine

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Implement the `resolveThemeTokens` function that takes a `ThemeMode` and optional custom token overrides and returns a fully resolved `Tokens` object. This is the deterministic resolution step: `base tokens + mode overrides → resolved tokens`.

## Files
- `src/theme/resolveTheme.ts` (create)

## Implementation Steps

1. Create `src/theme/resolveTheme.ts`:

   ```ts
   import { mergeTokens } from "../tokens/mergeTokens"
   import { lightTokens } from "./lightTokens"
   import { darkTokens } from "./darkTokens"
   import type { Tokens } from "../tokens/types"
   import type { ThemeMode } from "./types"

   export function resolveThemeTokens(
     mode: ThemeMode,
     customTokens?: Partial<Tokens>
   ): Tokens {
     const base = mode === "dark" ? darkTokens : lightTokens
     return mergeTokens(base, customTokens)
   }
   ```

## Constraints
- Must use the existing `mergeTokens` utility — do not reimplement merging
- Must import `ThemeMode` from `./types` — do not redefine it
- No React imports
- Function must be pure (no side effects)

## Acceptance Criteria
- `resolveThemeTokens("light")` returns light mode tokens
- `resolveThemeTokens("dark")` returns dark mode tokens
- `resolveThemeTokens("light", { color: { primary: "#FF0000" } })` merges the override into light tokens
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call `resolveThemeTokens("dark")` and verify `background` is `#0B0F19`
3. Call `resolveThemeTokens("light", { color: { primary: "#FF0000" } })` and verify `primary` is overridden

## Notes
This function is the single point of resolution — all ThemeProvider logic calls this to get the final token set.
