# Task 003: Public API Export

## Feature
P001 — Tooltip & ContextMenu Components

## Description
Export the new Tooltip and ContextMenu components and their types from the public API entry point. Also export the new aria contracts and motion contract.

## Files
- `src/index.ts` (modify)

## Implementation Steps

1. Add Tooltip exports to `src/index.ts` in the Navigation System section (F008 block, after Dropdown):
```ts
export { Tooltip } from "./components/Tooltip"
export type { TooltipProps, TooltipPlacement } from "./components/Tooltip"
```

2. Add ContextMenu exports in the same section:
```ts
export { ContextMenu } from "./components/ContextMenu"
export type { ContextMenuProps, ContextMenuItem } from "./components/ContextMenu"
```

3. Run `pnpm run build` to confirm the new exports are included in `dist/index.d.ts`.

4. Grep `dist/index.d.ts` to confirm `Tooltip`, `TooltipProps`, `ContextMenu`, `ContextMenuProps`, `ContextMenuItem` are all present.

## Constraints
- Export location: F008 navigation/overlay block, after `Dropdown`
- Do not export internal contracts or aria contracts (they are already internal)
- Do not change any other exports

## Acceptance Criteria
- `import { Tooltip, ContextMenu } from 'lithebox-ui'` resolves without error
- `import type { TooltipProps, TooltipPlacement, ContextMenuProps, ContextMenuItem } from 'lithebox-ui'` resolves without error
- `pnpm run build` succeeds
- Both names appear in `dist/index.d.ts`

## Test Steps
1. `pnpm run build` — succeeds
2. `grep "Tooltip" dist/index.d.ts` — finds Tooltip, TooltipProps, TooltipPlacement
3. `grep "ContextMenu" dist/index.d.ts` — finds ContextMenu, ContextMenuProps, ContextMenuItem
4. `pnpm --filter @lithebox/playground exec tsc --noEmit` — zero errors
