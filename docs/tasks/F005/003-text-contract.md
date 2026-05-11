# Task 003: Text Contract

## Feature
F005 — Component Token Contract System

## Description
Define the TextContract and migrate `Text.tsx` to resolve all styles through the contract.

## Files
- `src/contracts/TextContract.ts` (create)
- `src/components/Text.tsx` (modify)

## Implementation Steps
1. Create `src/contracts/TextContract.ts`:
   - Export `TextContract` as a `const` object with `size`, `weight`, and `color` dimensions
   - `size`: `{ sm: "typography.size.sm", md: "typography.size.md", lg: "typography.size.lg", xl: "typography.size.xl" }`
   - `weight`: `{ regular: "typography.weight.regular", medium: "typography.weight.medium", bold: "typography.weight.bold" }`
   - `color`: `{ primary: "color.text.primary", secondary: "color.text.secondary" }`
   - `base`: `{ fontFamily: "typography.fontFamily", lineHeight: 1.5 }` (lineHeight is a literal, not a token slot)
   - Add `as const`

2. Modify `src/components/Text.tsx`:
   - Import `TextContract` and `resolveSlot` from `../contracts/resolveContract`
   - Replace inline `var(--)` strings with lookups against `TextContract` passed through `resolveSlot()`
   - `fontFamily` must resolve from `TextContract.base.fontFamily`
   - `fontSize`, `fontWeight`, `color` props must resolve from their respective contract dimensions
   - The `TextProps` type: replace raw `keyof Tokens[...]` prop types with keys of the contract dimensions (e.g. `size?: keyof typeof TextContract.size`)
   - Remove the `Tokens` import since components must not reference raw token types directly

## Constraints
- Do not change the rendered output or visual behavior
- No `any` types
- `Text.tsx` must contain zero direct `var(--)` strings after migration
- Remove the `import type { Tokens }` from `Text.tsx` — components must not depend on raw token types

## Acceptance Criteria
- `TextContract` is defined in `src/contracts/TextContract.ts`
- `Text.tsx` contains no direct CSS variable strings
- `Text.tsx` no longer imports from `../tokens/types`
- `npm run build` passes
- `npm test` passes (existing Text tests must still pass)

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — all existing Text tests pass
3. Open Storybook and confirm Text renders correctly for all size/weight/color combinations
