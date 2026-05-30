# Task 004: Playground Integration

## Feature
P001 — Tooltip & ContextMenu Components

## Description
Update the overlays validation page in the playground to demo Tooltip and ContextMenu, replacing the "Not Yet Implemented" card with live demonstrations of both components.

## Files
- `apps/playground/src/pages/OverlaysPage.tsx` (modify)

## Implementation Steps

1. Import `Tooltip` and `ContextMenu` from `'lithebox-ui'` at the top of OverlaysPage.tsx.

2. Replace the existing "Not Yet Implemented" Card with two new `DemoCard` sections:

**Tooltip Demo section**:
- Title: "Tooltip"
- Description: "Validates hover/focus triggered positioning, placement variants, and aria-describedby wiring."
- Four buttons, each wrapped in a `Tooltip` with a different placement:
  - `<Tooltip content="Top tooltip" placement="top"><Button>Top</Button></Tooltip>`
  - `<Tooltip content="Right tooltip" placement="right"><Button variant="secondary">Right</Button></Tooltip>`
  - `<Tooltip content="Bottom tooltip" placement="bottom"><Button variant="secondary">Bottom</Button></Tooltip>`
  - `<Tooltip content="Left tooltip" placement="left"><Button variant="secondary">Left</Button></Tooltip>`

**ContextMenu Demo section**:
- Title: "Context Menu"
- Description: "Validates right-click triggered menus at cursor position, keyboard navigation, disabled and destructive items."
- A styled trigger area (dashed border Box/div) with instructional text: "Right-click anywhere in this area"
- Wrap the trigger area in `<ContextMenu>` with items:
  ```ts
  [
    { label: 'Open', onClick: () => toast.info('Open clicked') },
    { label: 'Copy Link', onClick: () => toast.info('Copy Link clicked') },
    { label: 'Rename', onClick: () => toast.info('Rename clicked'), disabled: true },
    { label: 'Delete', onClick: () => toast.error('Delete clicked'), destructive: true },
  ]
  ```

3. Remove the "Not Yet Implemented" card entirely.

4. Run `pnpm --filter @lithebox/playground exec tsc --noEmit` — must pass.

## Constraints
- Only modify `OverlaysPage.tsx` — no other playground files
- Use only public API imports from `'lithebox-ui'`
- Keep all existing demo sections (Modal, Drawer, Dropdown, Stacking) unchanged

## Acceptance Criteria
- "Not Yet Implemented" card removed
- Tooltip section shows 4 placement variants, each triggering on hover/focus
- ContextMenu trigger area right-click opens menu with 4 items
- TypeScript compiles without errors

## Test Steps
1. Visit `/overlays` — Tooltip and ContextMenu sections visible
2. Hover each tooltip button — tooltip appears in correct position
3. Focus tooltip button with Tab — tooltip appears
4. Right-click the context menu area — menu appears at cursor
5. Click each item — toast fires, menu closes
6. "Rename" item appears dimmed and is not clickable
7. "Delete" item appears in red
