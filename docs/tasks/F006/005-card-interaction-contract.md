# Task 005: Card Interaction Contract & Component Update

## Feature
F006 — Interaction & State Model System

## Description
Add an interaction contract for the Card component to support optional clickable behavior. Card is the only other core component that meaningfully benefits from hover/active states. Text and other display-only components do not need interaction contracts.

## Files
- `src/contracts/CardInteractionContract.ts` (create)
- `src/components/Card.tsx` (update)
- `src/components/Card.test.tsx` (update)

## Implementation Steps
1. Create `src/contracts/CardInteractionContract.ts`:
   ```ts
   export const CardInteractionContract: InteractionContract = {
     states: ["idle", "hover", "active"],
     interactions: {
       click: "allowed",
       hover: "system-managed",
     },
     transitions: {},
   } as const
   ```
2. Read `src/components/Card.tsx` to understand the current implementation before editing
3. Update `src/components/Card.tsx`:
   - Add optional `onClick?: () => void` prop
   - Add optional `interactive?: boolean` prop (defaults to `false`)
   - When `interactive` is true OR `onClick` is provided:
     - Call `useInteractionState({ contract: CardInteractionContract })`
     - Spread `interactionProps` onto the root element
     - Merge `stateStyles` into the existing style object
     - Set `cursor: "pointer"` in the base style when interactive
   - When not interactive: render exactly as today (no hook, no state, no overhead)
4. Update `Card.test.tsx`:
   - Add test: non-interactive Card renders without interaction props
   - Add test: interactive Card applies stateStyles on hover
   - Add test: onClick fires when Card is interactive and clicked

## Constraints
- Do not make Card interactive by default — this is opt-in via `interactive` or `onClick`
- Do not use `useInteractionState` when the card is not interactive (avoid unnecessary renders)
- Do not change the existing Card variant, padding, or layout props
- The hook must not be called conditionally — use a wrapper approach: call the hook always but only apply props conditionally, OR extract the interactive behavior into the `interactive === true` branch using a sub-component pattern

## Acceptance Criteria
- Default `<Card>` (no onClick, no interactive) renders identically to today
- `<Card interactive onClick={handler}>` shows hover state on mouse enter
- `<Card interactive>` has pointer cursor
- All existing Card tests pass
- 3 new tests pass

## Test Steps
1. Run `npm test -- Card` — all tests pass
2. In Storybook, render Card with `interactive` — verify hover lift effect
3. Run `npm run build` — no type errors

## Notes
The hook-conditional issue: React rules prohibit conditional hook calls. Solve this by always calling the hook but only spreading `interactionProps` and merging `stateStyles` when interactive. This is a valid pattern — the hook is always called, its output is just conditionally applied.
