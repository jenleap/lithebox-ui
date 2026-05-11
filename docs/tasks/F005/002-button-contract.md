# Task 002: Button Contract

## Feature
F005 — Component Token Contract System

## Description
Define the ButtonContract and migrate `Button.tsx` to resolve all styles through the contract rather than directly referencing CSS variables.

## Files
- `src/contracts/ButtonContract.ts` (create)
- `src/contracts/resolveContract.ts` (create)
- `src/components/Button.tsx` (modify)

## Implementation Steps
1. Create `src/contracts/ButtonContract.ts`:
   - Export `ButtonContract` as a `const` object with `variant`, `size`, and `radius` dimensions
   - `variant.primary`: `{ background: "color.primary", color: "color.text.primary", border: "transparent" }`
   - `variant.secondary`: `{ background: "color.surface", color: "color.text.primary", border: "color.border" }`
   - `variant.ghost`: `{ background: "transparent", color: "color.text.primary", border: "transparent" }`
   - `size.sm`: `{ padding: "spacing.xs spacing.sm", fontSize: "typography.size.sm" }`
   - `size.md`: `{ padding: "spacing.sm spacing.md", fontSize: "typography.size.md" }`
   - `size.lg`: `{ padding: "spacing.md spacing.lg", fontSize: "typography.size.lg" }`
   - `radius.default`: `"radius.md"`
   - Add `as const` to make it fully readonly and narrowly typed

2. Create `src/contracts/resolveContract.ts`:
   - Export `resolveSlot(slot: string): string` — converts a semantic slot path like `"color.primary"` to its CSS variable `"var(--color-primary)"`. Handles `"transparent"` and `"none"` as literal pass-throughs.
   - The conversion rule: split on `.`, join with `-`, wrap in `var(--)`. E.g. `color.text.primary` → `var(--color-text-primary)`, `spacing.md` → `var(--spacing-md)`, `typography.size.md` → `var(--font-size-md)` (note: typography.size maps to `--font-size-`, typography.weight maps to `--font-weight-`)

3. Modify `src/components/Button.tsx`:
   - Import `ButtonContract` and `resolveSlot`
   - Replace inline `variantStyles`, `paddingMap`, and `fontSizeMap` objects with lookups against `ButtonContract`
   - All style values must go through `resolveSlot()` — no direct `var(--)` strings in the component
   - The public `ButtonProps` interface must remain unchanged

## Constraints
- Do not change the `ButtonProps` type or component API
- No `any` types
- `Button.tsx` must contain zero direct `var(--)` strings after migration
- `ButtonContract` must be `as const` and fully typed

## Acceptance Criteria
- `ButtonContract` is defined in `src/contracts/ButtonContract.ts`
- `resolveContract.ts` exports `resolveSlot` and correctly maps all token paths to CSS variables
- `Button.tsx` contains no direct CSS variable strings — all values resolve through `resolveSlot`
- `npm run build` passes
- `npm test` passes (existing Button tests must still pass)

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — all existing Button tests pass
3. Open Storybook and confirm Button renders correctly for all variants and sizes
