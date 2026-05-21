# Task 008: Unit Tests

## Feature
F016 - Application Runtime Integration Layer

## Description
Write unit tests for all F016 runtime modules. Tests cover environment detection, token hydration, runtime context defaults, and `LitheboxProvider` rendering behavior.

## Files
- `src/runtime/__tests__/detectEnvironment.test.ts` (create)
- `src/runtime/__tests__/injectTokens.test.ts` (create)
- `src/runtime/__tests__/RuntimeContext.test.tsx` (create)
- `src/runtime/__tests__/LitheboxProvider.test.tsx` (create)

## Implementation Steps

### detectEnvironment tests

1. Create `src/runtime/__tests__/detectEnvironment.test.ts`.

2. Write tests:
   - When `window` is defined (default in jsdom): `isBrowser` is `true`
   - When `window` is deleted/undefined: all fields are `false` and no error is thrown
   - Return type matches `RuntimeEnvironment` shape

   ```ts
   import { detectEnvironment } from "../detectEnvironment"

   describe("detectEnvironment", () => {
     it("returns isBrowser: true in jsdom", () => {
       const env = detectEnvironment()
       expect(env.isBrowser).toBe(true)
     })

     it("returns all false when window is undefined", () => {
       const original = global.window
       // @ts-expect-error intentional deletion for test
       delete global.window
       const env = detectEnvironment()
       expect(env.isBrowser).toBe(false)
       expect(env.supportsReducedMotion).toBe(false)
       expect(env.supportsHover).toBe(false)
       expect(env.supportsPointer).toBe(false)
       global.window = original
     })
   })
   ```

### injectTokens tests

3. Create `src/runtime/__tests__/injectTokens.test.ts`.

4. Write tests using jsdom (already configured in the test environment):
   - Calling `injectTokens(defaultTokens)` sets `--color-primary` on `document.documentElement`
   - Calling the returned cleanup function removes `--color-primary`
   - Calling `injectTokens` when `document` is undefined returns a no-op and does not throw

   ```ts
   import { injectTokens } from "../injectTokens"
   import { defaultTokens } from "../../tokens/defaultTokens"

   describe("injectTokens", () => {
     afterEach(() => {
       document.documentElement.style.cssText = ""
     })

     it("injects CSS variables on document.documentElement", () => {
       injectTokens(defaultTokens)
       expect(
         document.documentElement.style.getPropertyValue("--color-primary")
       ).toBeTruthy()
     })

     it("cleanup removes injected CSS variables", () => {
       const cleanup = injectTokens(defaultTokens)
       cleanup()
       expect(
         document.documentElement.style.getPropertyValue("--color-primary")
       ).toBe("")
     })
   })
   ```

### RuntimeContext tests

5. Create `src/runtime/__tests__/RuntimeContext.test.tsx`.

6. Write tests:
   - `useRuntime()` outside a provider returns safe defaults (no throw)
   - `useRuntime()` inside a `RuntimeContext.Provider` returns the provided value

   ```tsx
   import React from "react"
   import { renderHook } from "@testing-library/react"
   import { RuntimeContext, useRuntime } from "../RuntimeContext"
   import type { RuntimeContextValue } from "../types"

   describe("useRuntime", () => {
     it("returns default context value outside provider", () => {
       const { result } = renderHook(() => useRuntime())
       expect(result.current.environment.isBrowser).toBe(false)
       expect(result.current.config).toEqual({})
     })

     it("returns provided value inside RuntimeContext.Provider", () => {
       const mockValue: RuntimeContextValue = {
         config: { motion: { reducedMotion: true } },
         environment: {
           isBrowser: true,
           supportsReducedMotion: true,
           supportsHover: false,
           supportsPointer: false,
         },
       }
       const wrapper = ({ children }: { children: React.ReactNode }) => (
         <RuntimeContext.Provider value={mockValue}>{children}</RuntimeContext.Provider>
       )
       const { result } = renderHook(() => useRuntime(), { wrapper })
       expect(result.current.config.motion?.reducedMotion).toBe(true)
       expect(result.current.environment.isBrowser).toBe(true)
     })
   })
   ```

### LitheboxProvider tests

7. Create `src/runtime/__tests__/LitheboxProvider.test.tsx`.

8. Write tests:
   - Renders children without error (no props)
   - Injects CSS variables on `document.documentElement` after mount
   - `useRuntime()` inside children returns the provided `config`
   - Accepts custom `config` and passes `portalRootId` to overlay system

   ```tsx
   import React from "react"
   import { render, renderHook } from "@testing-library/react"
   import { LitheboxProvider } from "../LitheboxProvider"
   import { useRuntime } from "../RuntimeContext"

   describe("LitheboxProvider", () => {
     afterEach(() => {
       document.documentElement.style.cssText = ""
       document.querySelectorAll("[id$='-root']").forEach(el => el.remove())
     })

     it("renders children without error", () => {
       const { getByText } = render(
         <LitheboxProvider>
           <span>hello</span>
         </LitheboxProvider>
       )
       expect(getByText("hello")).toBeInTheDocument()
     })

     it("injects CSS variables on document.documentElement", () => {
       render(<LitheboxProvider><div /></LitheboxProvider>)
       expect(
         document.documentElement.style.getPropertyValue("--color-primary")
       ).toBeTruthy()
     })

     it("exposes config via useRuntime()", () => {
       const config = { motion: { reducedMotion: true } }
       const wrapper = ({ children }: { children: React.ReactNode }) => (
         <LitheboxProvider config={config}>{children}</LitheboxProvider>
       )
       const { result } = renderHook(() => useRuntime(), { wrapper })
       expect(result.current.config.motion?.reducedMotion).toBe(true)
     })
   })
   ```

## Constraints
- Use `@testing-library/react` for component tests (already a project dependency)
- Do not mock internal runtime modules — test against real implementations
- `afterEach` cleanup is required for tests that modify `document.documentElement` or the DOM

## Acceptance Criteria
- All test files exist and all tests pass
- `npm run test` exits with no failures
- No TypeScript errors in test files

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
