# Task 008: Theme Module Exports

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Create `src/theme/index.ts` to export all theme module public APIs, then update `src/index.ts` to re-export the new theme mode APIs. This makes all F017 exports available from the library root.

## Files
- `src/theme/index.ts` (create)
- `src/index.ts` (modify)

## Implementation Steps

1. Create `src/theme/index.ts`:

   ```ts
   export { ThemeProvider, useTheme } from "./ThemeProvider"
   export type { ThemeProviderProps } from "./ThemeProvider"
   export { ThemeModeContext, useThemeMode } from "./ThemeModeContext"
   export { resolveThemeTokens } from "./resolveTheme"
   export { useSystemTheme } from "./useSystemTheme"
   export { useThemePersistence } from "./useThemePersistence"
   export { lightTokens } from "./lightTokens"
   export { darkTokens } from "./darkTokens"
   export type { ThemeMode, ThemeModeContextValue, ThemeWithMode } from "./types"
   ```

2. In `src/index.ts`, find the existing ThemeProvider export:

   ```ts
   export { ThemeProvider, useTheme } from "./theme/ThemeProvider"
   ```

   Replace with a block that re-exports everything from the new theme index:

   ```ts
   export { ThemeProvider, useTheme } from "./theme/ThemeProvider"
   export { ThemeModeContext, useThemeMode } from "./theme/ThemeModeContext"
   export { resolveThemeTokens } from "./theme/resolveTheme"
   export { useSystemTheme } from "./theme/useSystemTheme"
   export { useThemePersistence } from "./theme/useThemePersistence"
   export { lightTokens, darkTokens } from "./theme"
   export type { ThemeMode, ThemeModeContextValue, ThemeWithMode, ThemeProviderProps } from "./theme"
   ```

## Constraints
- Do not remove existing exports from `src/index.ts`
- Do not use barrel re-exports (`export * from`) — be explicit
- All new exports must be named (no default exports)

## Acceptance Criteria
- `import { useThemeMode, darkTokens, ThemeMode } from "lithebox-ui"` resolves without errors
- `import { ThemeProvider, useTheme } from "lithebox-ui"` still works (no regression)
- TypeScript compiles with no errors
- `npm run build` succeeds

## Test Steps
1. Run `npm run build` — no TypeScript errors or missing exports
2. Verify `useThemeMode`, `darkTokens`, `lightTokens`, `resolveThemeTokens`, `ThemeMode` are all importable from the package root

## Notes
`src/theme/index.ts` is the canonical theme module barrel — internal consumers should prefer this over deep imports.
