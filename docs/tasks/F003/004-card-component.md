# Task 004: Card Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Card` component — a structured content surface for grouping related UI elements. Card uses `Box` internally and always applies a surface background and medium radius. It has no layout responsibilities.

## Files
- Create: `src/components/Card.tsx`

## Implementation Steps
1. Create `src/components/Card.tsx`
2. Import `Box` from `../primitives/Box`
3. Define `CardProps`:
   ```ts
   type CardProps = {
     padding?: keyof Tokens["spacing"]
     children?: React.ReactNode
   }
   ```
4. Render using `Box` with fixed surface styling plus the optional padding prop:
   ```tsx
   <Box
     background="surface"
     radius="md"
     border
     padding={padding}
   >
     {children}
   </Box>
   ```
5. Export both the component and its props type

## Constraints
- Must use `Box` for the surface structure — no raw `div` or inline styles
- `background`, `radius`, and `border` are always fixed — not exposed as props
- Only `padding` and `children` are configurable
- Functional component only

## Acceptance Criteria
- Card renders a `div` (via Box)
- `style.background === "var(--color-surface)"`
- `style.borderRadius === "var(--radius-md)"`
- `style.border === "1px solid var(--color-border)"`
- `padding="lg"` → `style.padding === "var(--spacing-lg)"`
- No padding when `padding` prop is omitted

## Test Steps
1. Render `<Card>content</Card>` — verify `style.background === "var(--color-surface)"`
2. Verify `style.borderRadius === "var(--radius-md)"`
3. Verify `style.border === "1px solid var(--color-border)"`
4. Render `<Card padding="md">content</Card>` — verify `style.padding === "var(--spacing-md)"`
5. Render `<Card>` with no padding — verify `style.padding` is undefined

## Notes
Card does not handle shadow in this MVP. Shadow variants will be introduced in a future patch if needed.
