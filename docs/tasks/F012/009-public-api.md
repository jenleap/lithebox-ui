# Task 009: Public API

## Feature
F012 - Accessibility Architecture

## Description
Create the public API entry point for the a11y system. Export all utilities, contracts, types, and hooks from a single `src/a11y/index.ts` file so consumers can import from one location.

## Files
- `src/a11y/index.ts` (create)

## Implementation Steps

1. Create `src/a11y/index.ts` with the following exports:

   **Types:**
   ```ts
   export type { AriaRole, AriaAttributeMap, AriaContract, A11yStateMap, ResolvedAriaProps } from "./types"
   ```

   **ARIA Contracts:**
   ```ts
   export {
     ButtonA11yContract,
     ModalA11yContract,
     DrawerA11yContract,
     DropdownA11yContract,
     InputA11yContract,
     CheckboxA11yContract,
     RadioA11yContract,
     SelectA11yContract,
     SidebarA11yContract,
     ListA11yContract,
     TableA11yContract,
     BannerA11yContract,
     ToastA11yContract,
     PageA11yContract,
   } from "./ariaContracts"
   ```

   **Focus System:**
   ```ts
   export { focusManager } from "./focusManager"
   export { useFocusManager } from "./useFocusManager"
   export { useFocusTrap } from "./useFocusTrap"
   ```

   **Keyboard Navigation:**
   ```ts
   export { useKeyboardNavigation } from "./useKeyboardNavigation"
   ```

   **State Resolver:**
   ```ts
   export { resolveA11yState } from "./resolveA11yState"
   ```

2. Verify all imported modules exist before writing the index (all should be created by tasks 001–005).

## Constraints
- No logic in the index file — exports only
- Use named exports only (no default export)
- All type exports must use `export type` syntax

## Acceptance Criteria
- `import { useFocusTrap, resolveA11yState, ButtonA11yContract } from "../a11y"` works
- All items listed above are accessible from the index
- TypeScript compiles with no errors
- No circular imports

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify each exported name resolves to the correct module

## Notes
This index file is the single import point for the entire a11y system. Keep it flat — do not create sub-namespaces.
