# Task 001: Data Display Token Contracts

## Feature
F009 — Data Display System

## Description
Define token contracts for all data display components: `List`, `Table`, `Badge`, `StatusIndicator`, and the content state components (`EmptyState`, `LoadingState`, `ErrorState`). These are static mapping objects that resolve visual slots to semantic token paths.

## Files
- `src/contracts/ListContract.ts` (create)
- `src/contracts/TableContract.ts` (create)
- `src/contracts/BadgeContract.ts` (create)
- `src/contracts/StatusIndicatorContract.ts` (create)
- `src/contracts/ContentStateContract.ts` (create)
- `src/contracts/index.ts` (modify — add new exports)

## Implementation Steps

1. Create `src/contracts/ListContract.ts`:
   ```ts
   export const ListContract = {
     item: {
       text: "color.text.primary",
       border: "color.border",
     },
     spacing: {
       sm: "spacing.xs",
       md: "spacing.sm",
       lg: "spacing.md",
     },
   } as const
   ```

2. Create `src/contracts/TableContract.ts`:
   ```ts
   export const TableContract = {
     header: {
       background: "color.surface",
       text: "color.text.secondary",
       border: "color.border",
     },
     row: {
       border: "color.border",
       hover: {
         background: "color.surface",
       },
     },
     cell: {
       text: "color.text.primary",
     },
     density: {
       comfortable: {
         padding: "spacing.md",
       },
       compact: {
         padding: "spacing.sm",
       },
     },
   } as const
   ```

3. Create `src/contracts/BadgeContract.ts`:
   ```ts
   export const BadgeContract = {
     variants: {
       default: {
         background: "color.surface",
         text: "color.text.secondary",
         border: "color.border",
       },
       success: {
         background: "color.success.surface",
         text: "color.success.text",
         border: "color.success.border",
       },
       warning: {
         background: "color.warning.surface",
         text: "color.warning.text",
         border: "color.warning.border",
       },
       error: {
         background: "color.error.surface",
         text: "color.error.text",
         border: "color.error.border",
       },
       info: {
         background: "color.info.surface",
         text: "color.info.text",
         border: "color.info.border",
       },
     },
     spacing: {
       paddingX: "spacing.sm",
       paddingY: "spacing.xs",
     },
     radius: "radius.full",
   } as const
   ```

4. Create `src/contracts/StatusIndicatorContract.ts`:
   ```ts
   export const StatusIndicatorContract = {
     variants: {
       default: { color: "color.text.secondary" },
       success: { color: "color.success.text" },
       warning: { color: "color.warning.text" },
       error: { color: "color.error.text" },
       info: { color: "color.info.text" },
     },
     size: "spacing.sm",
   } as const
   ```

5. Create `src/contracts/ContentStateContract.ts`:
   ```ts
   export const ContentStateContract = {
     container: {
       padding: "spacing.xl",
       gap: "spacing.md",
     },
     title: {
       text: "color.text.primary",
     },
     description: {
       text: "color.text.secondary",
     },
     icon: {
       color: "color.text.secondary",
     },
   } as const
   ```

6. Update `src/contracts/index.ts` — add:
   ```ts
   export { ListContract } from "./ListContract"
   export { TableContract } from "./TableContract"
   export { BadgeContract } from "./BadgeContract"
   export { StatusIndicatorContract } from "./StatusIndicatorContract"
   export { ContentStateContract } from "./ContentStateContract"
   ```

## Constraints
- Static mapping objects only — no runtime token resolution here
- Variant keys in `BadgeContract` and `StatusIndicatorContract` must match component prop literal types exactly
- Do not introduce new semantic token names that don't follow the existing `color.*`, `spacing.*`, `radius.*` pattern
- `color.success.*`, `color.warning.*`, `color.info.*` may not exist in `defaultTokens`; components will inline fallback values at render time

## Acceptance Criteria
- All five contract files created with correct structure
- All five exported from `src/contracts/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify all contracts are importable from `"../contracts"` in a component file

## Notes
If semantic color tokens for `success`, `warning`, `info` are absent from `defaultTokens`, component implementations in tasks 004 and 005 will use hardcoded fallbacks (e.g. `"#22c55e"` for success). The contracts still map to the semantic paths — the fallbacks are a render concern, not a contract concern.
