# Task 007: Button Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the primitive `Button` component — the core interactive element for user actions. This is NOT a full design system button. It is a minimal action surface that applies token-driven colors, radius, and spacing.

## Files
- Create: `src/components/Button.tsx`

## Implementation Steps
1. Create `src/components/Button.tsx`
2. Define `ButtonProps`:
   ```ts
   type ButtonProps = {
     variant?: "primary" | "secondary" | "ghost"
     size?: "sm" | "md" | "lg"
     children: React.ReactNode
     onClick?: () => void
   }
   ```
3. Default `variant` to `"primary"` and `size` to `"md"` when not provided
4. Define a variant-to-styles mapping:
   - `"primary"`: `background: var(--color-primary)`, `color: var(--color-text-primary)`, `border: none`
   - `"secondary"`: `background: var(--color-surface)`, `color: var(--color-text-primary)`, `border: 1px solid var(--color-border)`
   - `"ghost"`: `background: transparent`, `color: var(--color-text-primary)`, `border: none`
5. Define a size-to-padding mapping:
   - `"sm"`: `padding: var(--spacing-xs) var(--spacing-sm)`
   - `"md"`: `padding: var(--spacing-sm) var(--spacing-md)`
   - `"lg"`: `padding: var(--spacing-md) var(--spacing-lg)`
6. Define a size-to-font-size mapping:
   - `"sm"`: `fontSize: var(--font-size-sm)`
   - `"md"`: `fontSize: var(--font-size-md)`
   - `"lg"`: `fontSize: var(--font-size-lg)`
7. Render a `<button>` element with combined inline styles:
   - variant styles (background, color, border)
   - padding from size map
   - fontSize from size map
   - `borderRadius: var(--radius-md)`
   - `fontFamily: var(--font-family)`
   - `fontWeight: var(--font-weight-medium)`
   - `cursor: pointer`
   - `display: inline-flex`
   - `alignItems: center`
   - `justifyContent: center`
8. Pass `onClick` to the `<button>` element
9. Export both the component and its props type

## Constraints
- Must render a `<button>` HTML element — not a div
- No hardcoded color, spacing, or font values — only CSS variable references
- No external CSS classes
- Functional component only

## Acceptance Criteria
- Button renders a `<button>` element
- `variant="primary"` → `style.background === "var(--color-primary)"`
- `variant="secondary"` → `style.background === "var(--color-surface)"` and border applied
- `variant="ghost"` → `style.background === "transparent"` and no border
- `size="sm"` → padding uses xs/sm spacing tokens
- `size="lg"` → padding uses md/lg spacing tokens
- `borderRadius` is always `var(--radius-md)`
- `onClick` fires when button is clicked

## Test Steps
1. Render `<Button>Click</Button>` — verify element is `button`
2. Render `<Button variant="primary">` — verify `style.background === "var(--color-primary)"`
3. Render `<Button variant="secondary">` — verify `style.background === "var(--color-surface)"` and `style.border === "1px solid var(--color-border)"`
4. Render `<Button variant="ghost">` — verify `style.background === "transparent"`
5. Render `<Button size="sm">` — verify `style.padding === "var(--spacing-xs) var(--spacing-sm)"`
6. Verify `style.borderRadius === "var(--radius-md)"` in all cases
7. Render with an `onClick` handler — verify it fires on click

## Notes
This is the primitive version only. Do not add hover states, disabled states, loading states, or icon support — those belong to a future design system button layer.
