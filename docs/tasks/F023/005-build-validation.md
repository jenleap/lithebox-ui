# Task T005: Validate Build Output

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Run the full library build and validate that all required dist/ artifacts are generated correctly. Verify ESM output, CJS output, TypeScript declarations, sourcemaps, and that React is not bundled into the output.

## Files
- `dist/` — generated artifacts to inspect (do not modify)
- No source files modified in this task

## Implementation Steps
1. Run `npm run build` and confirm it exits with code 0
2. Verify the following files exist in `dist/`:
   - `dist/index.js` (ESM output)
   - `dist/index.cjs` (CommonJS output)
   - `dist/index.d.ts` (TypeScript declarations)
   - `dist/index.js.map` (ESM sourcemap)
   - `dist/index.cjs.map` (CJS sourcemap)
3. Check that React is NOT bundled:
   - Run: `grep -l "useState" dist/index.js` — should find the reference as an import, not inline code
   - Open `dist/index.js` and verify it contains `import { ... } from "react"` (not inlined React source)
4. Check that `dist/index.d.ts` exports the main public types:
   - Should contain `ThemeProvider`, `Button`, `Box`, `Stack`, `Text`, `useTheme`, etc.
5. Verify CJS output uses `require` syntax (not ESM):
   - Open `dist/index.cjs` — should contain `exports.` assignments
6. Check file sizes are reasonable (index.js should not be excessively large due to React bundling):
   - Run `npm run build` — tsup reports output sizes; React-bundled output would be 100KB+
   - Expected size without React: well under 100KB
7. Run `npm run test` — all tests must still pass after build changes

## Constraints
- Do not modify any source files in this task
- If build fails, log the error and stop — do not attempt workarounds without updating the task
- React must appear as an external import in dist/index.js, not inlined

## Acceptance Criteria
- `dist/index.js` exists and is valid ESM
- `dist/index.cjs` exists and uses CommonJS
- `dist/index.d.ts` exists with correct type exports
- Sourcemaps present for both formats
- React is not bundled (import statement only)
- `npm run test` passes
- Build output size is under 100KB (excluding sourcemaps)

## Test Steps
1. `npm run build` — exits 0
2. `ls dist/` — all 5 files present
3. `head -5 dist/index.js` — starts with ESM imports
4. `head -5 dist/index.cjs` — starts with CJS requires/exports
5. `npm run test` — all tests pass

## Notes
If tsup reports any errors about missing types or circular imports, those must be resolved before proceeding to task 006. This task is purely validation — any fixes required go back to tasks 001–004.
