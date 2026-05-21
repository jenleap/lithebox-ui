# Task 010: Unit Tests

## Feature
F014 - Responsive System

## Description
Write unit tests for the responsive system's core logic: breakpoint resolution, contract resolver, and the `useBreakpoint` hook. Tests must cover both normal paths and edge cases.

## Files
- `src/responsive/__tests__/breakpointTokens.test.ts` (create)
- `src/responsive/__tests__/responsiveContract.test.ts` (create)
- `src/responsive/__tests__/useBreakpoint.test.tsx` (create)

## Implementation Steps

### breakpointTokens.test.ts

1. Verify `breakpoints` has correct values for all 5 keys: `sm=640`, `md=768`, `lg=1024`, `xl=1280`, `xxl=1536`.
2. Verify `responsiveDensity` maps `sm` to `"compact"` and `md`/`lg` to `"comfortable"`.

### responsiveContract.test.ts

1. Test `resolveResponsiveValue` with an exact match: `resolveResponsiveValue({ md: "bar" }, "md")` → `"bar"`.
2. Test fallback: `resolveResponsiveValue({ md: "bar" }, "lg")` → `"bar"` (falls back to `md`).
3. Test no match: `resolveResponsiveValue({ lg: "baz" }, "sm")` → `undefined`.
4. Test full contract: `resolveResponsiveValue({ sm: "a", lg: "b" }, "md")` → `"a"` (falls back to `sm`).
5. Test empty contract: `resolveResponsiveValue({}, "md")` → `undefined`.

### useBreakpoint.test.tsx

1. Create a helper `renderWithBreakpoint(bp: Breakpoint)` that wraps a component in a mocked `ResponsiveContext.Provider` set to the given breakpoint.
2. Test `isAtLeast`:
   - `isAtLeast("sm")` is always `true` for any breakpoint
   - `isAtLeast("lg")` is `false` when current breakpoint is `"sm"`
   - `isAtLeast("lg")` is `true` when current breakpoint is `"lg"`
   - `isAtLeast("lg")` is `true` when current breakpoint is `"xl"`
3. Test `isAtMost`:
   - `isAtMost("xxl")` is always `true` for any breakpoint
   - `isAtMost("sm")` is `false` when current breakpoint is `"lg"`
4. Test derived flags: at `"sm"`, `isMobile` is `true`, `isTablet` is `false`, `isDesktop` is `false`.

## Constraints
- Use the existing test framework (Jest + React Testing Library) matching the project's existing test setup
- Do not test internal provider implementation details — test observable behavior only
- No snapshot tests

## Acceptance Criteria
- All tests pass with `npm run test`
- Coverage includes: token values, contract resolver (5 cases), hook flags and comparison methods
- No TypeScript errors in test files

## Test Steps
1. Run `npm run test` — all responsive tests pass

## Notes
Mock `ResponsiveContext.Provider` directly for hook tests rather than rendering a full `ResponsiveProvider` with real resize events, to keep tests deterministic.
