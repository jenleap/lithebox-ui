# Task 003: Label Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Label` component — small UI label text used for form fields and metadata. Label renders `Text` internally with a default size of `sm` and weight of `medium`.

## Files
- Create: `src/components/Label.tsx`

## Implementation Steps
1. Create `src/components/Label.tsx`
2. Import `Text` from `./Text`
3. Define `LabelProps`:
   ```ts
   type LabelProps = {
     children: React.ReactNode
   }
   ```
4. Render `<Text size="sm" weight="medium">{children}</Text>`
5. Export both the component and its props type

## Constraints
- Must use `Text` internally — no direct CSS variable references
- No layout logic
- No structural meaning — renders only text content
- Functional component only

## Acceptance Criteria
- Label renders as a `<span>` (inherited from Text)
- `style.fontSize === "var(--font-size-sm)"` (from Text with size="sm")
- `style.fontWeight === "var(--font-weight-medium)"` (from Text with weight="medium")
- No additional styling beyond what Text provides

## Test Steps
1. Render `<Label>Field Name</Label>` — verify it renders a `<span>`
2. Verify `style.fontSize === "var(--font-size-sm)"`
3. Verify `style.fontWeight === "var(--font-weight-medium)"`

## Notes
Label is intentionally minimal. Form binding (`htmlFor`) is out of scope for this MVP layer and will be added when the form system is introduced.
