# Task T007: Public API Barrel Export

## Feature
F001-theme-token-system

## Description
Create `src/index.ts` as the single entry point for the library's public API. Exports all types, values, and components that consumers should have access to.

## Files
- `src/index.ts` (create)

## Implementation Steps
1. Create `src/index.ts`
2. Add the following named exports:
   ```ts
   export type { Tokens } from "./tokens/types"
   export { defaultTokens } from "./tokens/defaultTokens"
   export { mergeTokens } from "./tokens/mergeTokens"
   export { tokensToCSSVariables } from "./tokens/tokensToCSSVariables"
   export { ThemeProvider, useTheme } from "./theme/ThemeProvider"
   ```

## Constraints
- This is the only file consumers should import from
- Do not export internal implementation details (e.g., `ThemeContext`)
- Use named exports only (no default export)
- Keep this file as a pure re-export barrel — no logic

## Acceptance Criteria
- `src/index.ts` exists
- All five exports are present: `Tokens` (type), `defaultTokens`, `mergeTokens`, `tokensToCSSVariables`, `ThemeProvider`, `useTheme`
- `npm run lint` passes
- `npm run build` produces `dist/index.es.js` and `dist/index.cjs.js`

## Test Steps
1. Run `npm run lint` — should pass
2. Run `npm run build` — should succeed and produce dist output
3. Verify the dist output contains the exported names

## Notes
This barrel export defines the stable public API surface. Nothing not listed here is part of the public contract.
