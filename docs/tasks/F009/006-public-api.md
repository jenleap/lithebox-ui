# Task 006: Public API

## Feature
F009 — Data Display System

## Description
Audit `src/index.ts` to confirm all F009 components and types are exported correctly. Tasks 002–005 each append to `src/index.ts` incrementally; this task verifies the final state is clean, complete, and compilable.

## Files
- `src/index.ts` (modify — verify and complete exports)

## Implementation Steps

1. Open `src/index.ts` and confirm the following exports are present (add any that are missing):

   **List system:**
   ```ts
   export { List, ListItem } from "./components/List"
   export type { ListProps, ListItemProps } from "./components/List"
   export { DescriptionList, DescriptionListItem } from "./components/DescriptionList"
   export type { DescriptionListProps, DescriptionListItemProps } from "./components/DescriptionList"
   ```

   **Table system:**
   ```ts
   export { Table, TableHeader, TableBody, TableRow, TableCell } from "./components/Table"
   export type { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableCellProps, TableDensity } from "./components/Table"
   ```

   **Content state components:**
   ```ts
   export { EmptyState } from "./components/EmptyState"
   export type { EmptyStateProps } from "./components/EmptyState"
   export { LoadingState } from "./components/LoadingState"
   export type { LoadingStateProps } from "./components/LoadingState"
   export { ErrorState } from "./components/ErrorState"
   export type { ErrorStateProps } from "./components/ErrorState"
   ```

   **Status components:**
   ```ts
   export { Badge } from "./components/Badge"
   export type { BadgeProps, BadgeVariant } from "./components/Badge"
   export { StatusIndicator } from "./components/StatusIndicator"
   export type { StatusIndicatorProps, StatusIndicatorVariant } from "./components/StatusIndicator"
   ```

   **Contracts:**
   Confirm `src/contracts/index.ts` exports all five F009 contracts:
   ```ts
   export { ListContract } from "./ListContract"
   export { TableContract } from "./TableContract"
   export { BadgeContract } from "./BadgeContract"
   export { StatusIndicatorContract } from "./StatusIndicatorContract"
   export { ContentStateContract } from "./ContentStateContract"
   ```

2. Run `npm run build` and fix any TypeScript errors found.

## Constraints
- Do not remove or rename existing exports
- Do not add exports for components not yet implemented
- Only fix errors introduced by missing or incorrect F009 exports

## Acceptance Criteria
- `npm run build` completes with no errors
- All F009 components and types are importable from the package root
- No duplicate exports

## Test Steps
1. Run `npm run build` — zero errors
2. Run `npm run test` — existing tests pass

## Notes
This is a verification and cleanup task. If all prior tasks correctly updated `src/index.ts`, this task may only require running the build to confirm.
