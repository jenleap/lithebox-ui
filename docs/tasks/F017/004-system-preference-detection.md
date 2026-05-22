# Task 004: System Preference Detection

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Implement a `useSystemTheme` hook that reads the OS-level `prefers-color-scheme` media query and listens for dynamic changes. Returns the current system `ThemeMode` and updates reactively when the OS preference changes.

## Files
- `src/theme/useSystemTheme.ts` (create)

## Implementation Steps

1. Create `src/theme/useSystemTheme.ts`:

   ```ts
   import { useState, useEffect } from "react"
   import type { ThemeMode } from "./types"

   function getSystemMode(): ThemeMode {
     if (typeof window === "undefined") return "light"
     return window.matchMedia("(prefers-color-scheme: dark)").matches
       ? "dark"
       : "light"
   }

   export function useSystemTheme(): ThemeMode {
     const [systemMode, setSystemMode] = useState<ThemeMode>(getSystemMode)

     useEffect(() => {
       if (typeof window === "undefined") return

       const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

       function handleChange(e: MediaQueryListEvent) {
         setSystemMode(e.matches ? "dark" : "light")
       }

       mediaQuery.addEventListener("change", handleChange)
       return () => mediaQuery.removeEventListener("change", handleChange)
     }, [])

     return systemMode
   }
   ```

## Constraints
- Must guard all `window` access for SSR safety
- Must use `addEventListener`/`removeEventListener` (not deprecated `addListener`)
- Must clean up listener on unmount via the `useEffect` return
- No external dependencies

## Acceptance Criteria
- `useSystemTheme()` returns `"light"` or `"dark"` based on OS preference
- Hook updates reactively when OS preference changes
- No SSR errors — `window` is guarded
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. In a browser, toggle system dark mode and verify the hook returns the updated value

## Notes
This hook is consumed by `ThemeProvider` when no explicit `mode` prop is provided. It must never throw in SSR environments.
