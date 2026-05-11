# Task 002: Input Token Contract

## Feature
F007 — Form & Input System

## Description
Define the `InputContract` — the token contract that governs all input primitives (Input, Textarea, Select). This contract maps semantic slots for base appearance and all interaction states.

## Files
- `src/contracts/InputContract.ts` (create)
- `src/contracts/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/contracts/InputContract.ts`:
   ```ts
   export const InputContract = {
     base: {
       background: "color.surface",
       border: "color.border",
       text: "color.text.primary",
       placeholderText: "color.text.secondary",
     },
     states: {
       focus: {
         border: "color.primary",
         shadow: "none",
       },
       error: {
         border: "color.error",
         text: "color.error",
       },
       disabled: {
         background: "color.surface",
         text: "color.text.secondary",
         opacity: "0.5",
       },
     },
     spacing: {
       padding: "spacing.sm",
       gap: "spacing.xs",
     },
     radius: {
       default: "radius.md",
     },
     typography: {
       fontSize: "typography.size.md",
       fontFamily: "typography.fontFamily",
     },
   } as const
   ```
2. In `src/contracts/index.ts`, add:
   ```ts
   export { InputContract } from "./InputContract"
   ```

## Constraints
- All slot values must reference valid token paths from `src/tokens/types.ts`
- Use `as const` for the contract object
- No runtime logic — this file is a static contract definition only
- Do not add slots not listed in the spec above

## Acceptance Criteria
- `InputContract` is exported from `src/contracts/index.ts`
- All referenced token paths (e.g. `color.error`, `color.primary`) exist in `defaultTokens`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify `color.error` exists in `src/tokens/defaultTokens.ts` (check before implementing — if missing, add it to defaultTokens as part of this task)

## Notes
If `color.error` does not exist in `defaultTokens`, add it to the `color` section of `src/tokens/defaultTokens.ts` and the corresponding `Tokens` type in `src/tokens/types.ts`. Check those files before writing this contract.
