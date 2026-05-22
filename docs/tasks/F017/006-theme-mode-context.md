# Task 006: Theme Mode Context

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Create `ThemeModeContext` — a React context that holds the current `ThemeMode` and the `setMode`/`toggleMode` API. This context is separate from `ThemeContext` (which holds resolved `Tokens`). Also export the raw context object for advanced use.

## Files
- `src/theme/ThemeModeContext.ts` (create)

## Implementation Steps

1. Create `src/theme/ThemeModeContext.ts`:

   ```ts
   import { createContext, useContext } from "react"
   import type { ThemeModeContextValue, ThemeMode } from "./types"

   const defaultContextValue: ThemeModeContextValue = {
     mode: "light",
     setMode: () => undefined,
     toggleMode: () => undefined,
   }

   export const ThemeModeContext = createContext<ThemeModeContextValue>(defaultContextValue)

   export function useThemeMode(): ThemeModeContextValue {
     return useContext(ThemeModeContext)
   }
   ```

## Constraints
- Must not import React directly — use named imports from `"react"`
- Default context value must use `"light"` as default mode
- `setMode` and `toggleMode` defaults must be no-ops (not throw)
- This file must NOT contain Provider implementation — that belongs in `ThemeProvider.tsx`

## Acceptance Criteria
- `ThemeModeContext` is exported and usable with `useContext`
- `useThemeMode()` returns the current `ThemeModeContextValue`
- Outside a provider, `useThemeMode().mode` returns `"light"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call `useThemeMode()` outside a provider — verify `mode` is `"light"` with no errors
3. Verify `setMode` and `toggleMode` are callable no-ops outside a provider

## Notes
Separating context creation from the Provider component keeps `ThemeProvider.tsx` focused on wiring logic. Advanced consumers can import `ThemeModeContext` directly to create their own provider wrapper.
