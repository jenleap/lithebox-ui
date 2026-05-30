# Task 002: Token Editor Panel Shell

## Feature
F025 — Token Editor Playground

## Description
Create the fixed right-side panel component with a header (title, close button, reset button) and tab switcher (JSON / Visual). Does not implement tab content yet — just renders placeholder divs.

## Files
- `apps/playground/src/token-editor/TokenEditorPanel.tsx` (create)

## Implementation Steps

1. Create `TokenEditorPanel` component:
   - Read `isOpen`, `setIsOpen`, `setTokens` from `useTokenEditor()`
   - Render nothing when `!isOpen`
   - When open: render a `position: fixed` panel on the right side:
     - `top: 0, right: 0, bottom: 0`
     - `width: 360px`
     - `background: var(--color-surface)`
     - `borderLeft: 1px solid var(--color-border)`
     - `boxShadow: var(--shadow-md)`
     - `zIndex: 500` (above all overlays)
     - `display: flex, flexDirection: column`
     - `overflow: hidden`

2. Panel structure:
   ```
   ┌─ Header ──────────────────────────────────┐
   │  Token Editor          [Reset] [✕]        │
   ├─ Tab bar ─────────────────────────────────┤
   │  [JSON]  [Visual]                         │
   ├─ Tab content (flex: 1, overflow: auto) ───┤
   │  {placeholder — implemented in 003 / 004} │
   └───────────────────────────────────────────┘
   ```

3. Header:
   - `display: flex, alignItems: center, justifyContent: space-between`
   - `padding: var(--spacing-md)`
   - `borderBottom: 1px solid var(--color-border)`
   - Title: `<span>` with bold font
   - Right side: Reset button + close (✕) button side by side
   - Reset button: calls `setTokens({})`, styled as a small secondary-like button
   - Close button: calls `setIsOpen(false)`, styled as a plain icon button

4. Tab bar:
   - Local `useState<'json' | 'visual'>('json')` for active tab
   - Two tab buttons, active tab has bottom border highlight using `var(--color-primary)`
   - `padding: var(--spacing-sm) var(--spacing-md)`
   - `borderBottom: 1px solid var(--color-border)` on the tab bar container

5. Tab content area:
   - `flex: 1, overflowY: auto, padding: var(--spacing-md)`
   - For now render `<div>JSON tab</div>` or `<div>Visual tab</div>` based on active tab

## Constraints
- No lithebox-ui components — use native elements styled with CSS variables
- Do not use library Drawer (panel is its own fixed div)
- `zIndex: 500` to float above all library overlays

## Acceptance Criteria
- Panel opens/closes via `isOpen` from context
- Tab switcher toggles between two views
- Reset button calls `setTokens({})`
- Close button calls `setIsOpen(false)`

## Test Steps
1. Temporarily set `isOpen` to true in context default to verify panel renders
2. Verify panel overlaps content but does not shift layout
