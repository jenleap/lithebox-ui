# Task 005: Surface Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Surface` component — a generic background container abstraction for layering UI. Surface uses `Box` internally and maps a variant to a token-driven background and optional shadow.

## Files
- Create: `src/components/Surface.tsx`

## Implementation Steps
1. Create `src/components/Surface.tsx`
2. Import `Box` and `BoxProps` from `../primitives/Box`
3. Define `SurfaceProps`:
   ```ts
   type SurfaceProps = {
     variant?: "base" | "raised" | "sunken"
     children?: React.ReactNode
   }
   ```
4. Define a variant-to-background mapping:
   - `"base"` → `background="background"`
   - `"raised"` → `background="surface"`
   - `"sunken"` → `background="background"` (with border applied)
5. Default `variant` to `"base"` when not provided
6. For `"raised"` variant: render `Box` with `background="surface"` — no border
7. For `"base"` variant: render `Box` with `background="background"` — no border
8. For `"sunken"` variant: render `Box` with `background="background"` and `border`
9. Export both the component and its props type

## Constraints
- Must use `Box` — no raw divs or inline styles outside Box props
- No hardcoded color values
- Functional component only

## Acceptance Criteria
- `<Surface>` (no variant) renders with `background="background"` (base default)
- `<Surface variant="raised">` renders with `background="surface"`, no border
- `<Surface variant="sunken">` renders with `background="background"` and border
- `<Surface variant="base">` renders with `background="background"`, no border

## Test Steps
1. Render `<Surface>content</Surface>` — verify `style.background === "var(--color-background)"`
2. Render `<Surface variant="raised">content</Surface>` — verify `style.background === "var(--color-surface)"`
3. Render `<Surface variant="sunken">content</Surface>` — verify `style.border === "1px solid var(--color-border)"`
4. Render `<Surface variant="base">content</Surface>` — verify `style.background === "var(--color-background)"` and no border

## Notes
Surface has no content semantics — it is purely a background/layering abstraction. No radius is applied by default.
