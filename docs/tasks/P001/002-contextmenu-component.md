# Task 002: ContextMenu Component

## Feature
P001 — Tooltip & ContextMenu Components

## Description
Build the ContextMenu component: a menu that appears at the cursor position on right-click over a defined area. Add the aria contract and component implementation. Follows the Dropdown keyboard and overlay pattern.

## Files
- `src/a11y/ariaContracts.ts` (modify — add ContextMenuA11yContract)
- `src/components/ContextMenu.tsx` (create)

## Implementation Steps

### 1. Add `ContextMenuA11yContract` to `src/a11y/ariaContracts.ts`
```ts
export const ContextMenuA11yContract: AriaContract = {
  role: "menu",
  attributes: {
    "aria-orientation": "vertical",
  },
} as const
```

### 2. Create `src/components/ContextMenu.tsx`

Types:
```ts
export type ContextMenuItem = {
  label: string
  onClick: () => void
  disabled?: boolean
  destructive?: boolean
}

export type ContextMenuProps = {
  items: ContextMenuItem[]
  children: React.ReactNode
}
```

Behavior:
- Wrap `children` in a `<div>` with `onContextMenu` handler
- `onContextMenu` handler: `e.preventDefault()`, record `{ x: e.clientX, y: e.clientY }` as cursor position, set `open = true`
- Render the menu via `ReactDOM.createPortal` into `portalRoot` from `useOverlay({ id: "contextmenu", layer: "dropdown" })`
- Position the menu surface at `{ top: cursor.y + scrollY, left: cursor.x + scrollX }` with `position: "absolute"`
- Use `useLayoutEffect` to clamp position so menu does not overflow viewport edges (check if `left + menuWidth > window.innerWidth`, etc.)
- Keyboard navigation (attach to `document` when open):
  - `Escape` → close
  - `ArrowDown` → focus next `[role="menuitem"]:not([aria-disabled="true"])`
  - `ArrowUp` → focus previous
  - `Home` → focus first
  - `End` → focus last
- Click-outside: `mousedown` on document, close if outside menu surface (same pattern as Dropdown)
- Auto-focus first non-disabled item when menu opens (`useEffect`)
- Menu surface style:
  - `position: "absolute"`, `zIndex: LAYER_Z_INDEX.dropdown`
  - `background: "var(--color-surface)"`, `border: "1px solid var(--color-border)"`
  - `borderRadius: "var(--radius-md)"`, `boxShadow: "var(--shadow-sm)"`
  - `padding: "var(--spacing-xs)"`, `minWidth: 160`
- Each menu item:
  - `role="menuitem"`, `tabIndex={-1}`, `aria-disabled={disabled}`
  - On click: call `item.onClick()` then close
  - Style: `color: destructive ? "var(--color-error)" : "var(--color-text)"`, disabled items get reduced opacity
- Apply `useMotionTransition(DropdownMotionContract, open)` — reuse existing dropdown motion
- Unmount delay pattern same as Dropdown

## Constraints
- Right-click must be the only trigger (no other open mechanism)
- Disabled items must not be clickable and must be skipped by arrow-key navigation
- Reuse `DropdownMotionContract` — no new motion contract needed
- No changes to Dropdown component

## Acceptance Criteria
- Right-click on the wrapped area opens the menu at cursor position
- Menu closes on Escape, click-outside, and item selection
- Arrow keys navigate between enabled items (disabled items skipped)
- Home/End jump to first/last enabled items
- First enabled item receives focus when menu opens
- Destructive items render in error color
- Disabled items have reduced opacity and are not clickable
- Menu does not overflow viewport edges

## Test Steps
1. Right-click the trigger area — menu appears at cursor position
2. Press Escape — menu closes
3. Click outside the menu — menu closes
4. Click an item — item handler called, menu closes
5. Arrow key navigation: ArrowDown/Up cycle through items, skip disabled
6. Home/End jump to first/last enabled items
7. Disabled item: cannot be clicked, skipped by arrow keys
8. Destructive item: renders in red
