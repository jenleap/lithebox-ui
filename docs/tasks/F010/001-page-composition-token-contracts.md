# Task 001: Page Composition Token Contracts

## Feature
F010 — Page Composition System

## Description
Define token contracts for the Page system and Section system. These are static mapping objects that resolve visual slots to semantic token paths. Two contracts: `PageContract` (covers all page regions) and `SectionContract` (covers section structure).

## Files
- `src/contracts/PageContract.ts` (create)
- `src/contracts/SectionContract.ts` (create)
- `src/contracts/index.ts` (modify — add new exports)

## Implementation Steps

1. Create `src/contracts/PageContract.ts`:
   ```ts
   export const PageContract = {
     root: {
       background: "color.background",
       minHeight: "100vh",
     },
     header: {
       background: "color.surface",
       border: "color.border",
       padding: "spacing.md",
     },
     sidebar: {
       background: "color.surface",
       border: "color.border",
       width: "spacing.3xl",
     },
     content: {
       padding: "spacing.lg",
       gap: "spacing.lg",
     },
     footer: {
       background: "color.surface",
       border: "color.border",
       padding: "spacing.md",
     },
   } as const
   ```

2. Create `src/contracts/SectionContract.ts`:
   ```ts
   export const SectionContract = {
     root: {
       gap: "spacing.md",
     },
     header: {
       border: "color.border",
       padding: "spacing.sm",
       title: {
         text: "color.text.primary",
       },
     },
     content: {
       gap: "spacing.md",
     },
   } as const
   ```

3. Update `src/contracts/index.ts` — add:
   ```ts
   export { PageContract } from "./PageContract"
   export { SectionContract } from "./SectionContract"
   ```

## Constraints
- Static mapping objects only — no runtime token resolution
- Token paths must follow existing `color.*`, `spacing.*`, `radius.*` naming
- `spacing.3xl` may not exist in `defaultTokens`; if absent, the sidebar component will use a hardcoded fallback at render time — the contract still maps to the semantic path

## Acceptance Criteria
- Both contract files created with correct structure
- Both exported from `src/contracts/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify both contracts are importable from `"../contracts"` in a component file

## Notes
The sidebar width token `spacing.3xl` may need a hardcoded fallback (e.g., `"240px"`) at render time if the token is absent from `defaultTokens`. This is a render concern, not a contract concern.
