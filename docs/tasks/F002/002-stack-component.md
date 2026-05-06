# Task 002: Stack Component

## Feature
F002 — Core Layout Primitives System

## Description
Create the `Stack` component — a vertical layout primitive that arranges children top-to-bottom with token-driven gap spacing. Stack is the canonical replacement for vertical margin hacks. No child component is ever responsible for spacing between siblings.

## Files
- Create: `src/primitives/Stack.tsx`

## Implementation Steps
1. Create `src/primitives/Stack.tsx`
2. Define `StackProps`:
   ```ts
   type StackProps = {
     gap?: keyof Tokens["spacing"]
     align?: "start" | "center" | "end" | "stretch"
     children?: React.ReactNode
   }
   ```
3. Render a `div` with a base style of:
   - `display: "flex"`
   - `flexDirection: "column"`
4. Map props to inline styles:
   - `gap` → `var(--spacing-{gap})`
   - `align` → map to `alignItems`:
     - `"start"` → `"flex-start"`
     - `"center"` → `"center"`
     - `"end"` → `"flex-end"`
     - `"stretch"` → `"stretch"`
5. Only include optional style keys (`gap`, `alignItems`) when those props are defined
6. Pass `children` through

## Constraints
- No hardcoded spacing values — gap must reference CSS variables only
- No default `gap` or `align` — absence means no gap and default browser flex alignment
- Functional component only
- No implicit margins between children — gap handles all child spacing

## Acceptance Criteria
- Stack renders a div with `display: flex` and `flexDirection: column` always
- `gap="md"` produces `style.gap === "var(--spacing-md)"`
- `align="center"` produces `style.alignItems === "center"`
- `align="start"` produces `style.alignItems === "flex-start"`
- `align="end"` produces `style.alignItems === "flex-end"`
- Rendering with no props applies only the required flex styles

## Test Steps
1. Render `<Stack />` — verify `style.display === "flex"` and `style.flexDirection === "column"`
2. Render `<Stack gap="lg" />` — verify `style.gap === "var(--spacing-lg)"`
3. Render `<Stack align="start" />` — verify `style.alignItems === "flex-start"`
4. Render `<Stack align="end" />` — verify `style.alignItems === "flex-end"`
5. Render `<Stack align="center" />` — verify `style.alignItems === "center"`
6. Render `<Stack align="stretch" />` — verify `style.alignItems === "stretch"`

## Notes
Stack does not accept padding, margin, background, or radius props. Those concerns belong to Box. If a Stack needs a surface, wrap it in a Box.
