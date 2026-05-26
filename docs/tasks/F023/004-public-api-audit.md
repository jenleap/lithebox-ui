# Task T004: Audit and Finalize Public API Surface

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Audit `src/index.ts` to ensure only production-safe, public APIs are exported. Verify that dev-only systems (diagnostics, introspection from F022) are not exposed in the public entry point. Add any missing exports from completed features. Document what is intentionally excluded.

## Files
- `src/index.ts` — review and update as needed
- `src/diagnostics/index.ts` (or equivalent) — verify it is NOT re-exported from src/index.ts

## Implementation Steps
1. Open `src/index.ts` and review every export group
2. Check for any export of the diagnostics/introspection system (F022):
   - Search for `diagnostics`, `introspection`, `IntrospectionAPI`, `SystemHealthSnapshot`
   - If found, remove these exports from `src/index.ts`
   - The diagnostics system is dev-only and must not be in the public API
3. Verify the following systems ARE exported (they are production-safe):
   - Token system (`tokens/`)
   - Theme system (`theme/`)
   - Layout primitives (`primitives/`)
   - Core components (`components/`)
   - Form system (Input, Select, Checkbox, etc.)
   - Navigation (AppShell, Sidebar, TopBar)
   - Data display (List, Table, etc.)
   - Feedback (Toast, Banner, etc.)
   - Motion system (`motion/`)
   - Responsive system (`responsive/`)
   - Metadata system (`metadata/`)
   - Runtime (`runtime/`)
   - Validation system (`validation/`)
4. Check for any exports of internal utility files (e.g., `test-setup.ts`, test helpers, internal-only types)
   - Remove any that are not part of the public API
5. Add a comment block at the top of `src/index.ts` grouping exports by system for clarity
6. Confirm no wildcard exports (`export *`) accidentally pull in dev-only or internal modules

## Constraints
- Do not remove any existing production-safe exports
- Do not add exports not already implemented
- Diagnostics/introspection (F022) must NOT appear in the public API
- Keep `export * from "./validation"` only if validation is production-safe

## Acceptance Criteria
- `src/index.ts` contains no diagnostics or introspection exports
- All production systems (token, theme, components, forms, etc.) are exported
- No test helpers or internal-only types are exported
- `npm run lint` passes with no type errors

## Test Steps
1. Run `npm run lint` — must pass
2. Run `npm run build` — must produce dist/ without errors
3. Grep dist/index.d.ts for "introspect" or "diagnostic" — should return no results
4. Verify `dist/index.d.ts` contains `ThemeProvider`, `Button`, `Box`, etc.

## Notes
The diagnostics system (F022) has environment gating built in, but gating alone is not sufficient for a clean public API. It should be omitted from the entry point entirely. If consumers need diagnostics in development, they can be documented as a separate import path in a future feature.
