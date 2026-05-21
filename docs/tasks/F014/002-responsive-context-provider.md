# Task 002: Responsive Context Provider

## Feature
F014 - Responsive System

## Description
Create a React context and provider that tracks the current breakpoint by listening to window resize events. The provider resolves the active breakpoint from the token values and makes it available to the entire component tree.

## Files
- `src/responsive/ResponsiveContext.ts` (create)
- `src/responsive/ResponsiveProvider.tsx` (create)

## Implementation Steps

1. Create `src/responsive/ResponsiveContext.ts`:
   ```ts
   export interface ResponsiveContextValue {
     breakpoint: Breakpoint
     isMobile: boolean   // breakpoint === "sm"
     isTablet: boolean   // breakpoint === "md"
     isDesktop: boolean  // breakpoint === "lg" || "xl" || "xxl"
   }

   export const ResponsiveContext = React.createContext<ResponsiveContextValue>({
     breakpoint: "lg",
     isMobile: false,
     isTablet: false,
     isDesktop: true,
   })
   ```

2. Create `src/responsive/ResponsiveProvider.tsx`:
   - Use `window.matchMedia` to listen for breakpoint changes
   - Resolve the current breakpoint by checking against `breakpoints` token values in order from largest to smallest (xxl → sm), returning the first match
   - Provide a helper `resolveBreakpoint(width: number): Breakpoint` that computes the breakpoint from a pixel width
   - On mount, compute the initial breakpoint from `window.innerWidth`
   - Add a `resize` event listener on `window` to update breakpoint on change
   - Clean up event listener on unmount
   - Derive `isMobile`, `isTablet`, `isDesktop` from the current breakpoint
   - Render `<ResponsiveContext.Provider value={...}>{children}</ResponsiveContext.Provider>`

3. Export `ResponsiveProvider` as a named export from `ResponsiveProvider.tsx`.

## Constraints
- No `any` types
- Use `useEffect` for the event listener — clean up on unmount
- Use `useState` for the current breakpoint value
- Do not use third-party resize libraries
- SSR-safe: guard `window` access with `typeof window !== "undefined"`, defaulting to `"lg"` breakpoint

## Acceptance Criteria
- `ResponsiveContext` exported from `ResponsiveContext.ts`
- `ResponsiveProvider` exported from `ResponsiveProvider.tsx`
- Provider updates the context value on window resize
- Default breakpoint is `"lg"` when window is unavailable
- TypeScript compiles with no errors

## Test Steps
1. Wrap a test component with `<ResponsiveProvider>` and read `ResponsiveContext` — verify `breakpoint` is populated
2. Run `npm run build` — no TypeScript errors

## Notes
The `resolveBreakpoint` helper will be reused by the `useBreakpoint` hook in Task 003.
