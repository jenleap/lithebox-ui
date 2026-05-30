# Task 005: Unit Tests

## Feature
P001 — Tooltip & ContextMenu Components

## Description
Write unit tests for Tooltip and ContextMenu covering rendering, aria attributes, keyboard interaction, and item behavior.

## Files
- `src/components/Tooltip.test.tsx` (create)
- `src/components/ContextMenu.test.tsx` (create)

## Implementation Steps

### Tooltip.test.tsx

Setup: wrap renders in `<LitheboxProvider>` (needed for overlay portal root).

Tests:
1. **renders without tooltip initially** — render `<Tooltip content="tip"><button>Trigger</button></Tooltip>`, confirm tooltip text not in DOM
2. **shows tooltip on hover** — `fireEvent.mouseEnter(trigger)`, confirm tooltip content visible in DOM
3. **hides tooltip on mouse leave** — show then `fireEvent.mouseLeave(trigger)`, confirm tooltip removed (allow for animation delay with `waitFor`)
4. **shows tooltip on focus** — `fireEvent.focus(trigger)`, confirm tooltip visible
5. **hides tooltip on blur** — show then `fireEvent.blur(trigger)`, confirm tooltip removed
6. **trigger has aria-describedby** — render and hover, check `trigger.getAttribute('aria-describedby')` matches tooltip's `id`
7. **tooltip has role="tooltip"** — show tooltip, find element with `role="tooltip"`
8. **renders all placement values without error** — render each of top/right/bottom/left, confirm no throw

### ContextMenu.test.tsx

Setup: wrap renders in `<LitheboxProvider>`.

Tests:
1. **renders children without menu** — render `<ContextMenu items={[...]}><div>Area</div></ContextMenu>`, confirm no `role="menu"` in DOM
2. **opens on right-click** — `fireEvent.contextMenu(area)`, confirm element with `role="menu"` appears
3. **closes on Escape** — open menu, `fireEvent.keyDown(document, { key: 'Escape' })`, confirm menu removed
4. **calls item onClick and closes** — open menu, click first item, confirm handler called, menu removed
5. **disabled item not clickable** — open menu, click disabled item, confirm its handler not called
6. **arrow key navigation** — open menu, `fireEvent.keyDown(document, { key: 'ArrowDown' })`, check second item focused
7. **skips disabled items on arrow key** — open menu with disabled middle item, ArrowDown twice skips disabled, lands on third item
8. **destructive item has error color** — open menu, find destructive item, check computed style or data attribute

## Constraints
- All tests must use `@testing-library/react`
- Wrap in `LitheboxProvider` for overlay portal
- Use `waitFor` where animation delays may apply
- Do not test pixel-level positioning (not deterministic in jsdom)

## Acceptance Criteria
- All tests pass with `pnpm run test --run`
- No existing tests broken

## Test Steps
1. `pnpm run test --run` — all tests pass including new ones
