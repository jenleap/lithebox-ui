# Task 003: Navigation Structure Token Contracts

## Feature
F008 — Navigation & Overlay System

## Description
Define token contracts for the four application structure components: `AppShell`, `Sidebar`, `TopBar`, and `ContentArea`. These contracts map component visual slots to semantic tokens, keeping all styling decisions in the contract layer.

## Files
- `src/contracts/AppShellContract.ts` (create)
- `src/contracts/SidebarContract.ts` (create)
- `src/contracts/TopBarContract.ts` (create)
- `src/contracts/ContentAreaContract.ts` (create)
- `src/contracts/index.ts` (modify — add new exports)

## Implementation Steps
1. Create `src/contracts/AppShellContract.ts`:
   ```ts
   export const AppShellContract = {
     layout: {
       background: "color.background",
       height: "100vh",
       display: "flex",
     },
   } as const
   ```

2. Create `src/contracts/SidebarContract.ts`:
   ```ts
   export const SidebarContract = {
     base: {
       background: "color.surface",
       border: "color.border",
       width: "spacing.sidebar",
     },
     spacing: {
       padding: "spacing.md",
       gap: "spacing.sm",
     },
   } as const
   ```

3. Create `src/contracts/TopBarContract.ts`:
   ```ts
   export const TopBarContract = {
     base: {
       background: "color.surface",
       border: "color.border",
       height: "spacing.topbar",
     },
     spacing: {
       paddingX: "spacing.lg",
       paddingY: "spacing.sm",
     },
   } as const
   ```

4. Create `src/contracts/ContentAreaContract.ts`:
   ```ts
   export const ContentAreaContract = {
     base: {
       background: "color.background",
     },
     spacing: {
       padding: "spacing.lg",
     },
   } as const
   ```

5. Update `src/contracts/index.ts` — add:
   ```ts
   export { AppShellContract } from "./AppShellContract"
   export { SidebarContract } from "./SidebarContract"
   export { TopBarContract } from "./TopBarContract"
   export { ContentAreaContract } from "./ContentAreaContract"
   ```

## Constraints
- All slot values must be semantic token paths (strings) or literal CSS values where no token applies (e.g., `"100vh"`, `"flex"`)
- Do not resolve tokens here — contracts are static maps, resolution happens in components via `resolveSlot`
- `spacing.sidebar` and `spacing.topbar` are dimension tokens — use them as-is; if they don't exist in `defaultTokens`, that is fine for now (components will fall back gracefully)
- Do not add interaction states to navigation structure contracts — these are structural, not interactive

## Acceptance Criteria
- All four contract files created with correct structure
- All four contracts exported from `src/contracts/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify all four contracts are importable from `"../contracts"` in a component file

## Notes
`spacing.sidebar` and `spacing.topbar` may not yet exist in `defaultTokens`. Components should treat unresolved tokens as undefined and fall back to a safe default width/height (e.g., `240px` for sidebar, `56px` for topbar) rather than crashing.
