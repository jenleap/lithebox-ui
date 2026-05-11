# Task 003: Input Interaction Contract

## Feature
F007 — Form & Input System

## Description
Define the `InputInteractionContract` — specifies which interaction states inputs support and how they behave. Inputs differ from Button/Card: they support the `error` state and their primary interaction is `focus`, not `click`.

## Files
- `src/contracts/InputInteractionContract.ts` (create)
- `src/contracts/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/contracts/InputInteractionContract.ts`:
   ```ts
   import type { InteractionContract } from "../interactions"

   export const InputInteractionContract: InteractionContract = {
     states: ["idle", "focus", "disabled", "error"],
     interactions: {
       focus: "system-managed",
       blur: "system-managed",
       change: "allowed",
     },
     transitions: {
       disabled: "terminal",
       error: "interruptible",
     },
   } as const
   ```
2. In `src/contracts/index.ts`, add:
   ```ts
   export { InputInteractionContract } from "./InputInteractionContract"
   ```

## Constraints
- Must import `InteractionContract` from `"../interactions"` (not from types directly)
- `error` must be in the `states` array — this is a valid state after task 001
- Do not add hover/active states — inputs do not use them
- Use `as const`

## Acceptance Criteria
- `InputInteractionContract` satisfies the `InteractionContract` interface
- `error` is listed in `states`
- `disabled` is `"terminal"` — no interactions while disabled
- Exported from `src/contracts/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify `InputInteractionContract.states` includes `"error"` and `"focus"` but not `"hover"` or `"active"`
