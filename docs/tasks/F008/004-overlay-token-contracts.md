# Task 004: Overlay Token Contracts

## Feature
F008 — Navigation & Overlay System

## Description
Define token contracts for the three overlay components: `Modal`, `Drawer`, and `Dropdown`. These contracts follow the same pattern as `InputContract` — mapping visual slots to semantic token paths.

## Files
- `src/contracts/ModalContract.ts` (create)
- `src/contracts/DrawerContract.ts` (create)
- `src/contracts/DropdownContract.ts` (create)
- `src/contracts/index.ts` (modify — add new exports)

## Implementation Steps
1. Create `src/contracts/ModalContract.ts`:
   ```ts
   export const ModalContract = {
     backdrop: {
       background: "color.overlay",
     },
     surface: {
       background: "color.surface",
       radius: "radius.lg",
       shadow: "shadow.md",
     },
     spacing: {
       padding: "spacing.lg",
     },
   } as const
   ```

2. Create `src/contracts/DrawerContract.ts`:
   ```ts
   export const DrawerContract = {
     backdrop: {
       background: "color.overlay",
     },
     surface: {
       background: "color.surface",
       shadow: "shadow.lg",
       width: "spacing.drawer",
     },
     spacing: {
       padding: "spacing.lg",
     },
   } as const
   ```

3. Create `src/contracts/DropdownContract.ts`:
   ```ts
   export const DropdownContract = {
     surface: {
       background: "color.surface",
       border: "color.border",
       radius: "radius.md",
       shadow: "shadow.sm",
     },
     spacing: {
       padding: "spacing.xs",
     },
   } as const
   ```

4. Update `src/contracts/index.ts` — add:
   ```ts
   export { ModalContract } from "./ModalContract"
   export { DrawerContract } from "./DrawerContract"
   export { DropdownContract } from "./DropdownContract"
   ```

## Constraints
- `color.overlay` is a semantic token for semi-transparent backdrop backgrounds — use it as-is
- `shadow.md`, `shadow.lg`, `shadow.sm` follow the existing shadow token convention
- `spacing.drawer` may not yet exist in `defaultTokens`; components fall back to `320px` if unresolved
- No interaction states needed on overlay contracts — overlays are open or closed, not hover/focus targets at the container level
- Do not resolve tokens here — static maps only

## Acceptance Criteria
- `ModalContract`, `DrawerContract`, `DropdownContract` created with correct structure
- All three exported from `src/contracts/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify all three contracts are importable from `"../contracts"` in a component file

## Notes
`color.overlay` must exist in `defaultTokens` for the backdrop to render correctly. Verify the token exists; if not, it will be addressed when implementing the component (task 006/007 can fall back to `"rgba(0,0,0,0.5)"`).
