# Task 004: Card Contract

## Feature
F005 — Component Token Contract System

## Description
Define the CardContract and migrate `Card.tsx` to resolve all styles through the contract. Card currently delegates its styling to `Box` via props — the contract must describe the allowed token slots for Card's visual intent without bypassing the Box primitive.

## Files
- `src/contracts/CardContract.ts` (create)
- `src/components/Card.tsx` (modify)

## Implementation Steps
1. Create `src/contracts/CardContract.ts`:
   - Export `CardContract` as a `const` object
   - `base`: `{ background: "color.surface", radius: "radius.md", border: true }` — describes the fixed visual defaults
   - `padding`: `{ xs: "spacing.xs", sm: "spacing.sm", md: "spacing.md", lg: "spacing.lg", xl: "spacing.xl" }` — allowed padding slots
   - Add `as const`

2. Modify `src/components/Card.tsx`:
   - Import `CardContract`
   - Update the `CardProps` type: replace `padding?: keyof Tokens["spacing"]` with `padding?: keyof typeof CardContract.padding`
   - Remove the `import type { Tokens }` — components must not reference raw token types
   - The Box props passed in Card must reference `CardContract.base` values symbolically (as string literals that map to the Box prop API, e.g. `background="surface"`, `radius="md"`, `border`) — Card delegates rendering to Box, which is a primitive and already contract-aware at the primitive level
   - Add a JSDoc comment on the component linking it to `CardContract`

## Constraints
- Do not change the rendered output or visual behavior
- No `any` types
- Remove `import type { Tokens }` from `Card.tsx`
- Do not change the Box primitive

## Acceptance Criteria
- `CardContract` is defined in `src/contracts/CardContract.ts`
- `Card.tsx` no longer imports from `../tokens/types`
- `CardProps.padding` is typed from `CardContract` not from `Tokens`
- `npm run build` passes
- `npm test` passes (existing Card tests must still pass)

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — all existing Card tests pass
3. Open Storybook and confirm Card renders correctly
