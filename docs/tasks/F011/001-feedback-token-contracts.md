# Task 001: Feedback Token Contracts

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Define token contracts for the Toast and Banner systems. These are static mapping objects that resolve visual slots to semantic token paths — one contract per feedback component type.

## Files
- `src/contracts/ToastContract.ts` (create)
- `src/contracts/BannerContract.ts` (create)
- `src/contracts/index.ts` (modify — add new exports)

## Implementation Steps

1. Create `src/contracts/ToastContract.ts`:
   ```ts
   export const ToastContract = {
     success: {
       background: "color.success",
       text: "color.text.inverse",
     },
     error: {
       background: "color.error",
       text: "color.text.inverse",
     },
     info: {
       background: "color.primary",
       text: "color.text.inverse",
     },
     warning: {
       background: "color.warning",
       text: "color.text.primary",
     },
     spacing: {
       padding: "spacing.md",
     },
     radius: {
       default: "radius.md",
     },
   } as const
   ```

2. Create `src/contracts/BannerContract.ts`:
   ```ts
   export const BannerContract = {
     success: {
       background: "color.success",
       text: "color.text.inverse",
       border: "color.success",
     },
     error: {
       background: "color.error",
       text: "color.text.inverse",
       border: "color.error",
     },
     info: {
       background: "color.primary",
       text: "color.text.inverse",
       border: "color.primary",
     },
     warning: {
       background: "color.warning",
       text: "color.text.primary",
       border: "color.warning",
     },
     spacing: {
       padding: "spacing.md",
     },
   } as const
   ```

3. Update `src/contracts/index.ts` — append:
   ```ts
   export { ToastContract } from "./ToastContract"
   export { BannerContract } from "./BannerContract"
   ```

## Constraints
- Static mapping objects only — no runtime logic
- Token paths must follow existing `color.*`, `spacing.*`, `radius.*` naming conventions
- Both contracts must have the same four variant keys: `success`, `error`, `info`, `warning`

## Acceptance Criteria
- Both contract files exist with correct structure
- Both exported from `src/contracts/index.ts`
- TypeScript compiles with no errors (`npm run build`)

## Test Steps
1. Run `npm run build` — no type errors
2. Verify both contracts can be imported from `"../contracts"`

## Notes
Toast and Banner contracts follow the exact same model as existing contracts (e.g. `BadgeContract`). Keep them strictly declarative.
