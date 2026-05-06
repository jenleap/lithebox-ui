# Task 003: Row Component

## Feature
F002 — Core Layout Primitives System

## Description
Create the `Row` component — a horizontal layout primitive that arranges children left-to-right with token-driven gap spacing. Row is the canonical primitive for all horizontal composition. Justify and align are explicit — no implicit layout behavior.

## Files
- Create: `src/primitives/Row.tsx`

## Implementation Steps
1. Create `src/primitives/Row.tsx`
2. Define `RowProps`:
   ```ts
   type RowProps = {
     gap?: keyof Tokens["spacing"]
     justify?: "start" | "center" | "end" | "between"
     align?: "start" | "center" | "end" | "stretch"
     children?: React.ReactNode
   }
   ```
3. Render a `div` with a base style of:
   - `display: "flex"`
   - `flexDirection: "row"`
4. Map props to inline styles:
   - `gap` → `var(--spacing-{gap})`
   - `justify` → map to `justifyContent`:
     - `"start"` → `"flex-start"`
     - `"center"` → `"center"`
     - `"end"` → `"flex-end"`
     - `"between"` → `"space-between"`
   - `align` → map to `alignItems`:
     - `"start"` → `"flex-start"`
     - `"center"` → `"center"`
     - `"end"` → `"flex-end"`
     - `"stretch"` → `"stretch"`
5. Only include optional style keys when those props are defined
6. Pass `children` through

## Constraints
- No hardcoded spacing values — gap must reference CSS variables only
- No default `gap`, `justify`, or `align` values
- Functional component only
- `flexDirection` must always be `"row"` (not relying on the browser default)

## Acceptance Criteria
- Row renders a div with `display: flex` and `flexDirection: row` always
- `gap="sm"` produces `style.gap === "var(--spacing-sm)"`
- `justify="between"` produces `style.justifyContent === "space-between"`
- `justify="start"` produces `style.justifyContent === "flex-start"`
- `align="center"` produces `style.alignItems === "center"`
- Rendering with no props applies only the required flex styles

## Test Steps
1. Render `<Row />` — verify `style.display === "flex"` and `style.flexDirection === "row"`
2. Render `<Row gap="xs" />` — verify `style.gap === "var(--spacing-xs)"`
3. Render `<Row justify="between" />` — verify `style.justifyContent === "space-between"`
4. Render `<Row justify="start" />` — verify `style.justifyContent === "flex-start"`
5. Render `<Row justify="end" />` — verify `style.justifyContent === "flex-end"`
6. Render `<Row justify="center" />` — verify `style.justifyContent === "center"`
7. Render `<Row align="start" />` — verify `style.alignItems === "flex-start"`
8. Render `<Row align="stretch" />` — verify `style.alignItems === "stretch"`

## Notes
Row does not accept padding, margin, background, or radius props. Those concerns belong to Box. If a Row needs a surface, wrap it in a Box.
