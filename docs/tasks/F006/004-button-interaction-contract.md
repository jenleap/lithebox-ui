# Task 004: Button Interaction Contract & Component Update

## Feature
F006 — Interaction & State Model System

## Description
Create the `ButtonInteractionContract` and update the `Button` component to use `useInteractionState`. The Button becomes the reference implementation of the F006 interaction model.

## Files
- `src/contracts/ButtonInteractionContract.ts` (create)
- `src/components/Button.tsx` (update)
- `src/components/Button.test.tsx` (update)

## Implementation Steps
1. Create `src/contracts/ButtonInteractionContract.ts`:
   ```ts
   export const ButtonInteractionContract: InteractionContract = {
     states: ["idle", "hover", "active", "focus", "disabled", "loading"],
     interactions: {
       click: "allowed",
       hover: "system-managed",
       focus: "system-managed",
     },
     transitions: {
       disabled: "terminal",
       loading: "interruptible",
     },
   } as const
   ```
2. Update `src/components/Button.tsx`:
   - Add `state?: InteractionState` prop (optional, defaults to hook-managed)
   - Add `disabled?: boolean` prop
   - Add `loading?: boolean` prop
   - Call `useInteractionState({ disabled, loading, contract: ButtonInteractionContract })`
   - Merge `stateStyles` into the existing `style` object: `{ ...style, ...stateStyles }`
   - Spread `interactionProps` onto the `<button>` element
   - When `loading` is true, render a `"Loading..."` label or pass through children — do not add a spinner component
   - When `disabled` is true, add `disabled` attribute to `<button>`
   - Update `onClick` handler: no-op when `disabled` or `loading`
3. Update `Button.test.tsx`:
   - Add test: disabled button does not call onClick
   - Add test: disabled button has `disabled` attribute
   - Add test: loading button renders children unchanged
   - Add test: stateStyles are applied when disabled (opacity 0.5 present in style)

## Constraints
- Do not change the existing variant or size prop API
- Do not add a spinner/icon component — loading is visual state only via opacity/cursor
- Merge `stateStyles` last so interaction overrides win over base styles
- Import `InteractionState` from `src/interactions`, not redefined locally
- Keep existing contract validation (validateVariant calls) unchanged

## Acceptance Criteria
- `<Button disabled>` is visually dimmed (opacity 0.5) and cursor is not-allowed
- `<Button loading>` has opacity 0.7 and cursor progress
- `<Button>` without props behaves identically to current implementation
- onClick is never called when disabled or loading
- All existing Button tests still pass
- 4 new tests pass

## Test Steps
1. Run `npm test -- Button` — all tests pass
2. In Storybook, render Button with `disabled` and `loading` — verify visual output
3. Run `npm run build` — no type errors

## Notes
The `state` prop is intentionally optional and not yet wired to external control — it exists for future use and Storybook simulation (task 006). For now the hook is always the source of truth for runtime state.
