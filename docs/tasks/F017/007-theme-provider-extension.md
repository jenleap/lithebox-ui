# Task 007: ThemeProvider Extension

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Extend the existing `src/theme/ThemeProvider.tsx` to support theme modes. The provider must: accept an optional `mode` prop, track mode state with system-preference fallback and localStorage persistence, resolve tokens per mode, set a `data-theme` attribute on the wrapper div, and provide `ThemeModeContext` to descendants.

## Files
- `src/theme/ThemeProvider.tsx` (modify)

## Implementation Steps

1. Open `src/theme/ThemeProvider.tsx`. It currently accepts `tokens?: Partial<Tokens>` and renders a div with CSS variables.

2. Replace the full file content with the extended version:

   ```tsx
   import React, { createContext, useContext, useMemo, useState, useCallback } from "react"
   import { defaultTokens } from "../tokens/defaultTokens"
   import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
   import { resolveThemeTokens } from "./resolveTheme"
   import { useSystemTheme } from "./useSystemTheme"
   import { useThemePersistence } from "./useThemePersistence"
   import { ThemeModeContext } from "./ThemeModeContext"
   import type { Tokens } from "../tokens/types"
   import type { ThemeMode } from "./types"

   const ThemeContext = createContext<Tokens>(defaultTokens)

   export type ThemeProviderProps = {
     mode?: ThemeMode
     tokens?: Partial<Tokens>
     children: React.ReactNode
   }

   export function ThemeProvider({ mode: modeProp, tokens, children }: ThemeProviderProps) {
     const systemMode = useSystemTheme()
     const [storedMode, persistMode] = useThemePersistence()

     const initialMode: ThemeMode = storedMode ?? systemMode
     const [activeMode, setActiveMode] = useState<ThemeMode>(modeProp ?? initialMode)

     const setMode = useCallback((next: ThemeMode) => {
       setActiveMode(next)
       persistMode(next)
     }, [persistMode])

     const toggleMode = useCallback(() => {
       setMode(activeMode === "light" ? "dark" : "light")
     }, [activeMode, setMode])

     const resolvedTokens = useMemo(
       () => resolveThemeTokens(activeMode, tokens),
       [activeMode, tokens]
     )

     const cssVariables = useMemo(
       () => tokensToCSSVariables(resolvedTokens),
       [resolvedTokens]
     )

     const modeContextValue = useMemo(
       () => ({ mode: activeMode, setMode, toggleMode }),
       [activeMode, setMode, toggleMode]
     )

     return (
       <ThemeModeContext.Provider value={modeContextValue}>
         <ThemeContext.Provider value={resolvedTokens}>
           <div data-theme={activeMode} style={cssVariables as React.CSSProperties}>
             {children}
           </div>
         </ThemeContext.Provider>
       </ThemeModeContext.Provider>
     )
   }

   export function useTheme(): Tokens {
     return useContext(ThemeContext)
   }
   ```

## Constraints
- `modeProp` (external `mode` prop) is used as the initial controlled value if provided; after that, state is internal
- Do not break the existing `useTheme()` export — it must still return resolved `Tokens`
- `data-theme` attribute must be set on the wrapper `<div>` (not on `<html>`)
- Persistence and system detection are always wired — mode prop is the initializer, not a controlled override each render
- CSS variables are injected inline on the wrapper div (existing pattern preserved)

## Acceptance Criteria
- `<ThemeProvider mode="dark">` renders with `data-theme="dark"` on the wrapper div
- `<ThemeProvider>` defaults to system preference, then `"light"` if unavailable
- Toggling mode via `useThemeMode().toggleMode()` switches the active mode
- Mode persists across page reloads via localStorage
- `useTheme()` returns tokens resolved for the current mode
- TypeScript compiles with no errors
- Existing Storybook stories still render without errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `<ThemeProvider mode="dark">` — verify wrapper div has `data-theme="dark"`
3. Call `toggleMode()` — verify mode switches and `data-theme` updates
4. Reload page — verify persisted mode is restored
5. Run existing unit tests — no regressions

## Notes
The `mode` prop is treated as the initial value, not a live-controlled prop. If the consumer needs full external control, they should update `mode` prop on re-renders (which will not override internal state in this impl — that's acceptable for MVP). This matches how `defaultValue` works in React.
