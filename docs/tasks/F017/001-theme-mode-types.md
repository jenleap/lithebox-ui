# Task 001: Theme Mode Types

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Define all TypeScript types that form the foundation of the F017 theme mode system. Includes `ThemeMode`, `ThemeModeContextValue`, and `ThemeWithMode`. These types are the contract for the entire theme mode layer.

## Files
- `src/theme/types.ts` (create)

## Implementation Steps

1. Create `src/theme/types.ts` and define the following types exactly:

   ```ts
   import type { Tokens } from "../tokens/types"

   export type ThemeMode = "light" | "dark"

   export type ThemeModeContextValue = {
     mode: ThemeMode
     setMode: (mode: ThemeMode) => void
     toggleMode: () => void
   }

   export type ThemeWithMode = {
     mode: ThemeMode
     tokens: Tokens
   }
   ```

## Constraints
- No `any` types
- All types must be named exports (no `export default`)
- No React imports — this file is pure TypeScript
- Do not import from component files

## Acceptance Criteria
- `src/theme/types.ts` exists and exports exactly: `ThemeMode`, `ThemeModeContextValue`, `ThemeWithMode`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `ThemeMode` in a consuming file and confirm it is `"light" | "dark"`

## Notes
These types are the schema contract for the theme mode system. All downstream theme mode tasks import from this file.
