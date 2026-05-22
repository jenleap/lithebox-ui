# Task 005: Theme Persistence Layer

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Implement a `useThemePersistence` hook that reads and writes the user's theme mode preference to `localStorage`. Key is `lithebox_theme_mode`. Returns the stored preference (or `null` if none) and a setter. Must not block first render.

## Files
- `src/theme/useThemePersistence.ts` (create)

## Implementation Steps

1. Create `src/theme/useThemePersistence.ts`:

   ```ts
   import { useState, useCallback } from "react"
   import type { ThemeMode } from "./types"

   const STORAGE_KEY = "lithebox_theme_mode"

   function readStoredMode(): ThemeMode | null {
     if (typeof window === "undefined") return null
     try {
       const stored = localStorage.getItem(STORAGE_KEY)
       if (stored === "light" || stored === "dark") return stored
       return null
     } catch {
       return null
     }
   }

   export function useThemePersistence(): [ThemeMode | null, (mode: ThemeMode) => void] {
     const [storedMode, setStoredMode] = useState<ThemeMode | null>(readStoredMode)

     const persist = useCallback((mode: ThemeMode) => {
       try {
         localStorage.setItem(STORAGE_KEY, mode)
       } catch {
         // localStorage unavailable — silently skip
       }
       setStoredMode(mode)
     }, [])

     return [storedMode, persist]
   }
   ```

## Constraints
- Storage key must be exactly `lithebox_theme_mode`
- Must guard all `localStorage` access — wrap in try/catch and check `typeof window`
- Must not block first render — `useState` initializer runs synchronously but is safe here
- Must accept only `"light"` or `"dark"` as valid stored values; ignore any other stored string

## Acceptance Criteria
- `useThemePersistence()` returns `[null, setter]` when no preference is stored
- After calling the setter with `"dark"`, `localStorage.getItem("lithebox_theme_mode")` returns `"dark"`
- Stored mode is restored across page reloads
- No SSR errors
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call setter with `"dark"` — verify localStorage is updated
3. Reload — verify stored mode is read back correctly
4. Set `localStorage` to an invalid value (`"system"`) — verify hook returns `null`

## Notes
This hook is consumed by `ThemeProvider`. Persistence is optional MVP — if localStorage is unavailable the system falls back to system preference without error.
