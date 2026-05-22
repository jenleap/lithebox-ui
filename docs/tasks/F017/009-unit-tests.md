# Task 009: Unit Tests

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Write unit tests covering the core logic of the F017 theme mode system. Tests must cover: `resolveThemeTokens`, `useSystemTheme`, `useThemePersistence`, and `useThemeMode`.

## Files
- `src/theme/resolveTheme.test.ts` (create)
- `src/theme/useSystemTheme.test.ts` (create)
- `src/theme/useThemePersistence.test.ts` (create)
- `src/theme/useThemeMode.test.ts` (create)

## Implementation Steps

1. Create `src/theme/resolveTheme.test.ts`:

   ```ts
   import { resolveThemeTokens } from "./resolveTheme"
   import { lightTokens } from "./lightTokens"
   import { darkTokens } from "./darkTokens"

   describe("resolveThemeTokens", () => {
     it("returns light tokens when mode is light", () => {
       const result = resolveThemeTokens("light")
       expect(result.color.background).toBe(lightTokens.color.background)
     })

     it("returns dark tokens when mode is dark", () => {
       const result = resolveThemeTokens("dark")
       expect(result.color.background).toBe(darkTokens.color.background)
     })

     it("merges custom tokens over base tokens", () => {
       const result = resolveThemeTokens("light", { color: { primary: "#FF0000" } })
       expect(result.color.primary).toBe("#FF0000")
       expect(result.color.background).toBe(lightTokens.color.background)
     })

     it("dark and light background values are different", () => {
       const light = resolveThemeTokens("light")
       const dark = resolveThemeTokens("dark")
       expect(light.color.background).not.toBe(dark.color.background)
     })
   })
   ```

2. Create `src/theme/useSystemTheme.test.ts`:

   ```ts
   import { renderHook, act } from "@testing-library/react"
   import { useSystemTheme } from "./useSystemTheme"

   describe("useSystemTheme", () => {
     function mockMediaQuery(matches: boolean) {
       const listeners: ((e: MediaQueryListEvent) => void)[] = []
       const mq = {
         matches,
         addEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => {
           listeners.push(fn)
         },
         removeEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => {
           const idx = listeners.indexOf(fn)
           if (idx >= 0) listeners.splice(idx, 1)
         },
         trigger: (nextMatches: boolean) => {
           listeners.forEach(fn => fn({ matches: nextMatches } as MediaQueryListEvent))
         },
       }
       vi.spyOn(window, "matchMedia").mockReturnValue(mq as unknown as MediaQueryList)
       return mq
     }

     it("returns light when system is light", () => {
       mockMediaQuery(false)
       const { result } = renderHook(() => useSystemTheme())
       expect(result.current).toBe("light")
     })

     it("returns dark when system is dark", () => {
       mockMediaQuery(true)
       const { result } = renderHook(() => useSystemTheme())
       expect(result.current).toBe("dark")
     })

     it("updates when system preference changes", () => {
       const mq = mockMediaQuery(false)
       const { result } = renderHook(() => useSystemTheme())
       expect(result.current).toBe("light")
       act(() => mq.trigger(true))
       expect(result.current).toBe("dark")
     })
   })
   ```

3. Create `src/theme/useThemePersistence.test.ts`:

   ```ts
   import { renderHook, act } from "@testing-library/react"
   import { useThemePersistence } from "./useThemePersistence"

   describe("useThemePersistence", () => {
     beforeEach(() => localStorage.clear())

     it("returns null when no preference is stored", () => {
       const { result } = renderHook(() => useThemePersistence())
       expect(result.current[0]).toBeNull()
     })

     it("persists mode to localStorage", () => {
       const { result } = renderHook(() => useThemePersistence())
       act(() => result.current[1]("dark"))
       expect(localStorage.getItem("lithebox_theme_mode")).toBe("dark")
       expect(result.current[0]).toBe("dark")
     })

     it("restores stored mode on mount", () => {
       localStorage.setItem("lithebox_theme_mode", "dark")
       const { result } = renderHook(() => useThemePersistence())
       expect(result.current[0]).toBe("dark")
     })

     it("ignores invalid stored values", () => {
       localStorage.setItem("lithebox_theme_mode", "system")
       const { result } = renderHook(() => useThemePersistence())
       expect(result.current[0]).toBeNull()
     })
   })
   ```

4. Create `src/theme/useThemeMode.test.ts`:

   ```ts
   import { renderHook, act } from "@testing-library/react"
   import React from "react"
   import { ThemeModeContext } from "./ThemeModeContext"
   import { useThemeMode } from "./ThemeModeContext"
   import type { ThemeModeContextValue } from "./types"

   describe("useThemeMode", () => {
     it("returns default light mode outside provider", () => {
       const { result } = renderHook(() => useThemeMode())
       expect(result.current.mode).toBe("light")
     })

     it("returns mode from context", () => {
       const value: ThemeModeContextValue = {
         mode: "dark",
         setMode: vi.fn(),
         toggleMode: vi.fn(),
       }
       const wrapper = ({ children }: { children: React.ReactNode }) =>
         React.createElement(ThemeModeContext.Provider, { value }, children)

       const { result } = renderHook(() => useThemeMode(), { wrapper })
       expect(result.current.mode).toBe("dark")
     })

     it("calling setMode from context updates mode", () => {
       const setMode = vi.fn()
       const value: ThemeModeContextValue = {
         mode: "light",
         setMode,
         toggleMode: vi.fn(),
       }
       const wrapper = ({ children }: { children: React.ReactNode }) =>
         React.createElement(ThemeModeContext.Provider, { value }, children)

       const { result } = renderHook(() => useThemeMode(), { wrapper })
       act(() => result.current.setMode("dark"))
       expect(setMode).toHaveBeenCalledWith("dark")
     })
   })
   ```

## Constraints
- Use `vitest` (`describe`, `it`, `expect`, `vi`) — the project uses Vitest
- Use `@testing-library/react` for hook rendering
- Do not test React internals — test observable behavior only
- Mock `window.matchMedia` and `localStorage` — do not rely on real browser APIs in unit tests

## Acceptance Criteria
- All tests pass with `npm run test`
- `resolveTheme`, `useSystemTheme`, `useThemePersistence`, and `useThemeMode` are each covered
- No tests access real `localStorage` or `window.matchMedia` without mocking

## Test Steps
1. Run `npm run test` — all tests pass, no failures

## Notes
The test for `useSystemTheme` uses `vi.spyOn(window, "matchMedia")` — ensure the test environment has jsdom configured (already set up from F016 tests).
