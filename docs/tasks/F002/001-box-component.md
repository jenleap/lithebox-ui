# Task 001: Box Component

## Feature
F002 — Core Layout Primitives System

## Description
Create the `Box` component — the base structural unit from which all layout is composed. Box applies token-driven spacing, color, and radius via CSS variables set by the ThemeProvider. It renders a single `div` and has no implicit layout behavior.

## Files
- Create: `src/primitives/Box.tsx`

## Implementation Steps
1. Create the directory `src/primitives/`
2. Create `src/primitives/Box.tsx`
3. Define `BoxProps`:
   ```ts
   type BoxProps = {
     padding?: keyof Tokens["spacing"]
     margin?: keyof Tokens["spacing"]
     background?: "primary" | "secondary" | "background" | "surface"
     border?: boolean
     radius?: keyof Tokens["radius"]
     children?: React.ReactNode
   }
   ```
4. Render a `div` with a `style` object that maps props to CSS variables:
   - `padding` → `var(--spacing-{padding})`
   - `margin` → `var(--spacing-{margin})`
   - `background` → `var(--color-{background})`
   - `border` → `1px solid var(--color-border)` when true, otherwise `undefined`
   - `radius` (as `borderRadius`) → `var(--radius-{radius})`
5. Only include style keys when the prop is defined (avoid setting empty CSS values)
6. Pass `children` through to the div
7. Do not apply any default styling — no implicit margins, padding, or layout

## Constraints
- No hardcoded spacing, color, or radius values — only CSS variable references
- Must use `keyof Tokens["spacing"]` and `keyof Tokens["radius"]` from `src/tokens/types.ts`
- No Tailwind or external CSS classes
- No default prop values that add visual styling
- Functional component only

## Acceptance Criteria
- Box renders a `div` with correct inline style entries when props are provided
- Box renders with no style entries when no styling props are provided
- CSS variables are used exclusively (e.g. `var(--spacing-md)`, not `"16px"`)
- Border applies `1px solid var(--color-border)` when `border={true}`
- All prop combinations are valid and composable

## Test Steps
1. Render `<Box padding="md" />` — verify `style.padding === "var(--spacing-md)"`
2. Render `<Box radius="sm" />` — verify `style.borderRadius === "var(--radius-sm)"`
3. Render `<Box background="surface" />` — verify `style.background === "var(--color-surface)"`
4. Render `<Box border />` — verify `style.border === "1px solid var(--color-border)"`
5. Render `<Box />` with no props — verify no style keys are set

## Notes
Box is the foundation for all other primitives. Stack, Row, and Container do NOT wrap Box — they are independent components using the same CSS variable pattern. Box itself has no flex or grid layout; it is purely a spacing and surface container.
