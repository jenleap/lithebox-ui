# Task 005: Accessibility State Model

## Feature
F012 - Accessibility Architecture

## Description
Implement a resolver that maps the component accessibility state (disabled, loading, error, readOnly) to the corresponding ARIA attributes and tab index values. This centralizes ARIA state logic so components never compute it ad hoc.

## Files
- `src/a11y/resolveA11yState.ts` (create)

## Implementation Steps

1. Create `src/a11y/resolveA11yState.ts` exporting `resolveA11yState`:

   Signature:
   ```ts
   resolveA11yState(state: A11yStateMap): ResolvedAriaProps
   ```

   Import `A11yStateMap` and `ResolvedAriaProps` from `./types`.

2. Resolution rules:
   - `disabled: true` →
     - `"aria-disabled": true`
     - `tabIndex: -1`
   - `loading: true` →
     - `"aria-busy": true`
     - `tabIndex: -1`
   - `error: true` →
     - `"aria-invalid": true`
   - `readOnly: true` →
     - `"aria-readonly": true`
   - `role` is not set by this function — it comes from the ARIA contract
   - All resolved props not applicable to the state must be omitted (not set to `false` or `undefined`)

3. The function is a pure function — no side effects, no React.

4. Export: `export function resolveA11yState(state: A11yStateMap): ResolvedAriaProps`

## Constraints
- Pure function — no React, no side effects
- Only include props that apply — do not set `"aria-disabled": false` when `disabled` is falsy
- `tabIndex: -1` is set when `disabled` OR `loading` is true (either makes element non-interactive)
- No `any` types

## Acceptance Criteria
- `resolveA11yState({ disabled: true })` returns `{ "aria-disabled": true, tabIndex: -1 }`
- `resolveA11yState({ loading: true })` returns `{ "aria-busy": true, tabIndex: -1 }`
- `resolveA11yState({ error: true })` returns `{ "aria-invalid": true }`
- `resolveA11yState({ readOnly: true })` returns `{ "aria-readonly": true }`
- `resolveA11yState({})` returns `{}`
- Combined states merge correctly
- TypeScript compiles with no errors

## Test Steps
1. Call with each individual state flag and verify output
2. Call with multiple flags simultaneously and verify all are included
3. Call with empty object — verify empty output
4. Import from `./types` resolves without errors

## Notes
This resolver is intentionally decoupled from ARIA contracts (which define roles). The two are composed at the component level.
