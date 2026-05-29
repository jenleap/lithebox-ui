# Task 010: Package Boundary & Developer Experience Validation

## Feature
F024 — Playground Application & Integration Validation System

## Description
Audit the completed playground to ensure all Lithebox imports use only public package entry points, TypeScript types resolve correctly from the distributed package, and the developer experience (imports, autocomplete, prop types) matches a real consumer application. Fix any boundary violations found.

## Files
- `apps/playground/src/**/*.tsx` (audit — no new files unless violations require fixing)
- `apps/playground/tsconfig.json` (update if type paths need adjusting)
- `docs/features/F024-playground.md` (note any DX issues found for future improvement)

## Implementation Steps
1. **Import audit** — run a grep across `apps/playground/src/` for any import containing:
   - `../../packages/` or `../../src/` or `lithebox-ui/src/` — these are boundary violations
   - Allowed: `import { ... } from 'lithebox-ui'` only
   - Fix any violations by importing from the top-level package only.

2. **TypeScript type resolution check**:
   - Run `pnpm --filter @lithebox/playground exec tsc --noEmit` — must pass with zero errors.
   - If type errors reference missing exports, check the `lithebox-ui` package's `types` field in `package.json` and the `tsconfig.build.json` declaration output. Fix the root cause in the library if types are missing.

3. **Autocompletion validation**:
   - Open one page file in VS Code; hover a Lithebox component import — confirm IntelliSense shows the correct type signature.
   - Tab autocomplete on a Lithebox component's props — confirm all props appear with correct types and JSDoc (if any).
   - Document any gaps found (props missing, types wrong) in a comment at the top of the relevant task notes.

4. **Tree-shaking check**:
   - Run `pnpm --filter @lithebox/playground build`.
   - Inspect the Vite bundle output — confirm the bundle does not include the entire lithebox-ui library if only a subset of components are imported.
   - This is a visual/size check, not an automated test: note the bundle size.

5. **Minimal boilerplate check**:
   - Review `App.tsx` and the simplest page (e.g., `ResetPage.tsx`).
   - Count provider wrapping lines and import lines — if consuming the library requires >5 imports for a simple form, note it as a DX issue.

6. **Final smoke test**:
   - `pnpm --filter @lithebox/playground dev` — app starts, all routes load, no console errors.
   - `pnpm run test` at root — all library tests still pass.
   - `pnpm run build` at root — library builds successfully.

## Constraints
- Do not change the public API of lithebox-ui in this task (only fix the playground to use it correctly)
- If a missing export is found, note it but do not add the export in this task — create a follow-up note
- TypeScript must pass with zero errors

## Acceptance Criteria
- Zero import violations (no direct source folder imports from playground)
- `tsc --noEmit` passes with zero errors in the playground
- Vite build of playground succeeds
- Root `npm run test` passes
- Root `npm run build` passes
- IntelliSense works for at least one Lithebox component import (manually verified)

## Test Steps
1. Run grep for boundary violations — zero results
2. `pnpm --filter @lithebox/playground exec tsc --noEmit` — zero errors
3. `pnpm --filter @lithebox/playground build` — build succeeds
4. `pnpm run test` at root — all tests pass
5. `pnpm run build` at root — library build succeeds
6. Open a page in VS Code — hover Lithebox import — types shown correctly

## Notes
This is the final validation gate for F024. All acceptance criteria from the feature spec must be met before marking the feature complete.
