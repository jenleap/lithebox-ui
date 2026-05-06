# Task 004: Layout Primitive Stories

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Create stories for all four layout primitives: `Box`, `Stack`, `Row`, and `Container`. Each story validates that spacing, alignment, and layout behavior is token-driven and consistent.

## Files
- `src/stories/layout/Box.stories.tsx`
- `src/stories/layout/Stack.stories.tsx`
- `src/stories/layout/Row.stories.tsx`
- `src/stories/layout/Container.stories.tsx`

## Implementation Steps
1. Create `src/stories/layout/Box.stories.tsx`:
   - Story title: `'Layout/Box'`
   - Stories:
     - `Default`: a `Box` with `padding="md"` containing a `Text` child
     - `WithBackground`: a `Box` with background surface token via `Surface` wrapper
     - `NestedBoxes`: `Box` inside `Box` to verify spacing isolation

2. Create `src/stories/layout/Stack.stories.tsx`:
   - Story title: `'Layout/Stack'`
   - Stories:
     - `Default`: a `Stack` with `gap="md"` containing 3 `Text` children
     - `TightGap`: `gap="xs"`
     - `WideGap`: `gap="xl"`
     - `WithComponents`: `Stack` containing `Card` children to show realistic usage

3. Create `src/stories/layout/Row.stories.tsx`:
   - Story title: `'Layout/Row'`
   - Stories:
     - `Default`: a `Row` with `gap="md"` and 3 `Box` children
     - `AlignCenter`: `align="center"` with mixed-height children
     - `JustifyBetween`: `justify="space-between"` with items at edges
     - `WithButtons`: `Row` containing `Button` components

4. Create `src/stories/layout/Container.stories.tsx`:
   - Story title: `'Layout/Container'`
   - Stories:
     - `Default`: `Container` with a `Stack` of content inside
     - `NarrowContent`: a narrower max-width variant (if supported by the component API)

## Constraints
- All children in stories must be real Lithebox components (no raw divs as story content)
- Story args must use token-valid values only (e.g., valid gap/padding prop values)
- Use `Surface` or `Card` for background context — no raw `style={{ background }}` on story wrappers

## Acceptance Criteria
- All four files render without errors
- `Stack` gap stories show clearly different vertical spacing between items
- `Row` alignment stories demonstrate expected flexbox behavior
- `Container` constrains content width as expected
- No story uses hardcoded spacing values

## Test Steps
1. Run `npm run storybook`
2. Navigate to each `Layout/*` story — confirm all render
3. Compare `Stack` gap stories side-by-side — spacing difference must be visually obvious
4. Check `Row/JustifyBetween` — items must be at opposite ends
5. Check `Container` — content must not span full viewport width

## Notes
Stories exist to validate layout behavior, not to be comprehensive demos. Keep each story to its one behavioral point.
