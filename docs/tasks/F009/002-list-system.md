# Task 002: List System

## Feature
F009 — Data Display System

## Description
Implement the `List`, `ListItem`, and `DescriptionList` components. These provide deterministic rendering for ordered/unordered collections and label/value pairs.

## Files
- `src/components/List.tsx` (create)
- `src/components/DescriptionList.tsx` (create)
- `src/index.ts` (modify — add exports)

## Implementation Steps

1. Create `src/components/List.tsx` containing `List`, `ListItem`, and `DescriptionListItem`:

   **Types:**
   ```ts
   export type ListProps = {
     children: React.ReactNode
     spacing?: "sm" | "md" | "lg"
   }

   export type ListItemProps = {
     children: React.ReactNode
   }
   ```

   **`List` implementation:**
   - Import `ListContract` from `"../contracts/ListContract"`
   - Map `spacing` prop to `ListContract.spacing[spacing ?? "md"]` and resolve to a CSS variable via `resolveSlot`
   - Render as `<ul>` with `listStyle: "none"`, `padding: 0`, `margin: 0`, and `display: "flex"`, `flexDirection: "column"`, `gap` set to the resolved spacing value
   - Apply `borderBottom` on each child separator via gap (no extra wrappers)

   **`ListItem` implementation:**
   - Render as `<li>` with `padding: "spacing.sm"` resolved from the token system
   - Apply `borderBottom` using `ListContract.item.border` resolved value
   - Last child `borderBottom: "none"` via inline style is not required — use gap on the parent instead

2. Create `src/components/DescriptionList.tsx`:

   **Types:**
   ```ts
   export type DescriptionListProps = {
     children: React.ReactNode
   }

   export type DescriptionListItemProps = {
     label: string
     value: React.ReactNode
   }
   ```

   **`DescriptionList` implementation:**
   - Render as `<dl>` with `margin: 0`, `padding: 0`, `display: "flex"`, `flexDirection: "column"`, `gap: "spacing.sm"` resolved

   **`DescriptionListItem` implementation:**
   - Render as `<div>` with `display: "grid"`, `gridTemplateColumns: "1fr 2fr"`, `gap: "spacing.sm"` resolved
   - Render `label` in a `<dt>` using `Text` component with `color` resolved from `ContentStateContract.description.text` (secondary text)
   - Render `value` in a `<dd>` with `margin: 0` using `Text` component with `color` resolved from `ContentStateContract.title.text` (primary text)

3. Update `src/index.ts` — add:
   ```ts
   export { List, ListItem } from "./components/List"
   export type { ListProps, ListItemProps } from "./components/List"
   export { DescriptionList, DescriptionListItem } from "./components/DescriptionList"
   export type { DescriptionListProps, DescriptionListItemProps } from "./components/DescriptionList"
   ```

## Constraints
- Use `resolveSlot` from `"../contracts/resolveContract"` for all token-to-CSS-variable resolution
- No arbitrary spacing or color values — all styling through `ListContract`
- `List` renders as semantic `<ul>`, `DescriptionList` as `<dl>`
- No interaction states on `List` or `DescriptionList` (static display only)
- `ListItem` does not support nested lists (MVP)

## Acceptance Criteria
- `List` renders children with correct gap spacing for each spacing variant
- `ListItem` renders as `<li>` with token-driven padding
- `DescriptionList` renders label/value pairs in a two-column grid
- All components exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify in Storybook (task 008): list renders items with consistent spacing; description list renders label/value pairs aligned

## Notes
`resolveSlot` accepts a token path string and returns a CSS variable string (e.g. `"spacing.sm"` → `"var(--spacing-sm)"`). If a token path does not resolve, it returns the path as-is — component remains functional, just unstyled.
