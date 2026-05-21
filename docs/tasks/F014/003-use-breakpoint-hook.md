# Task 003: useBreakpoint Hook

## Feature
F014 - Responsive System

## Description
Create a `useBreakpoint` hook that reads from `ResponsiveContext` and provides a convenient API for components to check the current breakpoint and compare against named breakpoints.

## Files
- `src/responsive/useBreakpoint.ts` (create)

## Implementation Steps

1. Create `src/responsive/useBreakpoint.ts` with:
   ```ts
   export interface UseBreakpointResult {
     breakpoint: Breakpoint
     isMobile: boolean
     isTablet: boolean
     isDesktop: boolean
     isAtLeast: (bp: Breakpoint) => boolean
     isAtMost: (bp: Breakpoint) => boolean
   }

   export function useBreakpoint(): UseBreakpointResult
   ```

2. Implement the hook:
   - Read `breakpoint`, `isMobile`, `isTablet`, `isDesktop` from `useContext(ResponsiveContext)`
   - Define a static breakpoint order array: `["sm", "md", "lg", "xl", "xxl"]`
   - Implement `isAtLeast(bp)`: returns `true` if the current breakpoint's index >= `bp`'s index
   - Implement `isAtMost(bp)`: returns `true` if the current breakpoint's index <= `bp`'s index
   - Return all values in a single object

## Constraints
- No `any` types
- Must use `useContext(ResponsiveContext)` — do not re-implement breakpoint detection
- `isAtLeast` and `isAtMost` must be stable functions (use `useCallback` with breakpoint as dependency)

## Acceptance Criteria
- `useBreakpoint` exported from `useBreakpoint.ts`
- `useBreakpoint().isAtLeast("md")` returns `false` when breakpoint is `"sm"`
- `useBreakpoint().isAtMost("lg")` returns `true` when breakpoint is `"md"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. In a unit test, wrap with `ResponsiveProvider` and call `useBreakpoint()` — verify `isAtLeast("sm")` is always `true`

## Notes
Components must use this hook — they must not read `ResponsiveContext` directly.
