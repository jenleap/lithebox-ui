# Task T008: Unit Tests

## Feature
F001-theme-token-system

## Description
Write unit tests for the three core utilities: `mergeTokens`, `tokensToCSSVariables`, and `ThemeProvider`/`useTheme`. Tests verify deterministic behavior and correctness of the token system.

## Files
- `src/tokens/mergeTokens.test.ts` (create)
- `src/tokens/tokensToCSSVariables.test.ts` (create)
- `src/theme/ThemeProvider.test.tsx` (create)

## Implementation Steps

### mergeTokens.test.ts
1. Import `mergeTokens` and `defaultTokens`
2. Test: `mergeTokens(defaultTokens, undefined)` returns the base object unchanged
3. Test: partial color override — only the overridden key changes, all others equal defaultTokens
4. Test: nested override `color.text.primary` — only that key changes
5. Test: full override of a top-level group (e.g. `radius`) — all three keys replaced

### tokensToCSSVariables.test.ts
1. Import `tokensToCSSVariables` and `defaultTokens`
2. Test: output contains exactly 25 keys
3. Test: `--color-primary` maps to `defaultTokens.color.primary`
4. Test: `--font-weight-bold` is a string `"700"` (not number)
5. Test: `--color-text-primary` maps to `defaultTokens.color.text.primary`
6. Test: pass a mutated token set — verify output reflects the mutation

### ThemeProvider.test.tsx
1. Import `ThemeProvider`, `useTheme`, `defaultTokens` from the public API
2. Test: renders children without crashing
3. Test: wrapper div has inline style with `--color-primary` when using defaultTokens
4. Test: `useTheme()` inside provider returns resolved tokens
5. Test: partial override prop changes `color.primary` as seen by `useTheme()`
6. Test: `useTheme()` outside any provider returns `defaultTokens`

## Constraints
- Use Vitest as the test runner
- Use `@testing-library/react` for component tests
- Do not mock any of the token utilities — test against real implementations
- Test files live alongside the source files they test

## Acceptance Criteria
- All three test files exist
- All tests pass: `npm run test`
- Coverage includes the key behaviors listed above

## Test Steps
1. Run `npm run test` — all tests should pass with no failures

## Notes
Tests verify the deterministic guarantees of the token system. Use `describe` blocks to group related cases.
