# Task 006: Divider Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Divider` component — a purely visual separator between content blocks. Divider is a thin line using the border color token. It has no spacing logic of its own.

## Files
- Create: `src/components/Divider.tsx`

## Implementation Steps
1. Create `src/components/Divider.tsx`
2. Define `DividerProps`:
   ```ts
   type DividerProps = {
     orientation?: "horizontal" | "vertical"
   }
   ```
3. Default `orientation` to `"horizontal"` when not provided
4. For `"horizontal"`: render a `<hr>` element with:
   ```ts
   style = {
     border: "none",
     borderTop: "1px solid var(--color-border)",
     margin: 0,
     width: "100%",
   }
   ```
5. For `"vertical"`: render a `<div>` element with:
   ```ts
   style = {
     border: "none",
     borderLeft: "1px solid var(--color-border)",
     margin: 0,
     height: "100%",
     alignSelf: "stretch",
   }
   ```
6. Export both the component and its props type

## Constraints
- No hardcoded color values — only `var(--color-border)`
- No spacing props — spacing is handled by the parent Stack/Row
- No layout logic
- Functional component only

## Acceptance Criteria
- `<Divider>` renders an `<hr>` with `borderTop: "1px solid var(--color-border)"`
- `<Divider orientation="horizontal">` renders an `<hr>`
- `<Divider orientation="vertical">` renders a `<div>` with `borderLeft: "1px solid var(--color-border)"`
- No margin or padding set beyond `margin: 0`

## Test Steps
1. Render `<Divider>` — verify element is `hr` and `style.borderTop === "1px solid var(--color-border)"`
2. Render `<Divider orientation="horizontal">` — verify same as above
3. Render `<Divider orientation="vertical">` — verify element is `div` and `style.borderLeft === "1px solid var(--color-border)"`
4. Verify `style.margin === 0` in both cases

## Notes
`<hr>` carries default browser styling. The `border: "none"` reset is necessary to remove browser-default hr border before applying the custom borderTop.
