# Task 005: Runtime Validator

## Feature
F005 — Component Token Contract System

## Description
Implement a dev-only runtime validation layer that warns when contract violations occur. Integrate it into Button, Text, and Card.

## Files
- `src/contracts/validateContract.ts` (create)
- `src/components/Button.tsx` (modify)
- `src/components/Text.tsx` (modify)
- `src/components/Card.tsx` (modify)

## Implementation Steps
1. Create `src/contracts/validateContract.ts`:
   - Export `validateVariant<T extends object>(contract: T, dimension: keyof T, value: string | undefined, componentName: string): void`
   - In dev mode (`process.env.NODE_ENV !== "production"`), check that `value` is a key of `contract[dimension]`
   - If not, log a `console.warn` like: `[Lithebox] Invalid "${value}" for "${String(dimension)}" in ${componentName}. Allowed: sm, md, lg`
   - If `value` is `undefined`, do nothing (optional props are valid)
   - No-op in production (the entire function body is guarded by the env check)
   - Export `STRICT_MODE` flag: if `true`, throw an `Error` instead of warning. Default `false`.

2. Modify `src/components/Button.tsx`:
   - Call `validateVariant(ButtonContract.variant, "variant", variant, "Button")` — wait, the signature should check that `variant` is a key of `ButtonContract.variant`
   - Call `validateVariant` for `variant` and `size` props at the top of the component function body

3. Modify `src/components/Text.tsx`:
   - Call `validateVariant` for `size`, `weight`, and `color` props

4. Modify `src/components/Card.tsx`:
   - Call `validateVariant` for `padding` prop

## Constraints
- Zero production overhead — all validation code must be inside `process.env.NODE_ENV !== "production"` guards
- No `any` types
- Do not change component rendering output
- Validation only warns; it must never break rendering

## Acceptance Criteria
- `validateContract.ts` exists and exports `validateVariant`
- Passing an invalid variant to Button/Text/Card logs a `console.warn` in development
- No warnings appear when valid props are used
- `npm run build` passes
- `npm test` passes

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — all existing tests pass
3. In Storybook, temporarily pass `variant="invalid"` to Button and confirm a warning appears in the browser console
4. Remove the invalid prop after testing
