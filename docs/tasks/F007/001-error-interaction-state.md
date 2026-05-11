# Task 001: Extend Interaction State with Error

## Feature
F007 — Form & Input System

## Description
Add `error` to the `InteractionState` union type and update the default state token map to handle it. The `error` state is required by the input system to visually signal validation failures.

## Files
- `src/interactions/types.ts` (modify)
- `src/interactions/stateTokenMap.ts` (modify)

## Implementation Steps
1. In `src/interactions/types.ts`, add `"error"` to the `InteractionState` union:
   ```ts
   export type InteractionState = "idle" | "hover" | "active" | "focus" | "disabled" | "loading" | "error"
   ```
2. In `src/interactions/stateTokenMap.ts`, add `error` to `DEFAULT_STATE_TOKEN_MAP`:
   ```ts
   error: { cursor: "default" }
   ```
   The error state visual treatment (border color, text color) is handled at the contract layer, not via the state token override map. The cursor override here is minimal.
3. No changes needed to `InteractionContract`, `InteractionTransition`, or `StateTokenOverride` — these are already generic.

## Constraints
- Do not change the `InteractionContract` interface structure
- Do not touch Button or Card contracts — they do not use `error`
- The `error` override in DEFAULT_STATE_TOKEN_MAP must be minimal; visual styling belongs in component contracts

## Acceptance Criteria
- `InteractionState` type includes `"error"` as a valid literal
- `DEFAULT_STATE_TOKEN_MAP` has an entry for `"error"`
- TypeScript compiles with no errors
- Existing Button and Card tests still pass

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — existing interaction tests still pass
3. Verify TypeScript accepts `"error"` as an `InteractionState` value in a scratch type check

## Notes
This is the only task that touches the shared interaction system. All other F007 tasks depend on this being completed first.
