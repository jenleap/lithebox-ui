# Patch P001: Tooltip & ContextMenu Components

## Affected Features
F024 — Playground (overlay validation screen)
F008 — Navigation System (overlay layer)

## Scope
Add two missing overlay components to the library and expose them through the public API.

## Background
During F024 playground validation, Tooltip and ContextMenu were identified as gaps in the public API. Both are needed to complete the overlay validation screen and represent common UI patterns that should be part of the library.

## Components

### Tooltip
A non-interactive overlay that appears on hover or keyboard focus to provide contextual information about a trigger element.

- Trigger: hover or focus on the wrapped child element
- Placement: top (default), right, bottom, left
- Dismissal: mouse-out or blur
- Accessibility: `role="tooltip"`, `aria-describedby` wired between trigger and tooltip
- Motion: fade in/out (same as Dropdown)
- Layer: `dropdown` z-index (100)
- No focus trapping (informational only)

### ContextMenu
A menu that appears at the cursor position on right-click (contextmenu event) over a defined trigger area.

- Trigger: `contextmenu` event on the wrapped area
- Items: array of `{ label, onClick, disabled?, destructive? }`
- Dismissal: Escape key, click outside, item selection
- Keyboard: Arrow keys navigate items, Enter selects, Escape closes
- Accessibility: `role="menu"` / `role="menuitem"`, keyboard-navigable
- Motion: fade in/out (same as Dropdown)
- Layer: `dropdown` z-index (100)

## Acceptance Criteria
- `Tooltip` wraps any child element and shows content on hover/focus
- Tooltip placement (top/right/bottom/left) positions correctly relative to trigger
- Tooltip has `role="tooltip"` and trigger has `aria-describedby` pointing to it
- `ContextMenu` shows on right-click at cursor position
- ContextMenu arrow-key navigation works (ArrowDown/Up, Home/End)
- ContextMenu closes on Escape, click-outside, and item selection
- Both components exported from `lithebox-ui` public API
- Overlays page in playground updated to demonstrate both
- Unit tests cover rendering, keyboard interaction, and accessibility attributes

## Files to Modify
- `src/a11y/ariaContracts.ts` — add aria contracts for both
- `src/motion/contracts.ts` — add motion contracts for both
- `src/components/Tooltip.tsx` — new file
- `src/components/ContextMenu.tsx` — new file
- `src/index.ts` — export both
- `apps/playground/src/pages/OverlaysPage.tsx` — add demos
- Test files for both components

## Constraints
- Follow existing overlay patterns (Dropdown, Modal)
- Use the existing `useOverlay` hook and `dropdown` layer
- No new dependencies
- No changes to unrelated components
