# Task 007: Data Display Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all data display components: `List`, `ListItem`, `Table`, `TableRow`, `TableCell`, `Badge`, `StatusIndicator`, `EmptyState`, and `LoadingState`. Data display components require precise composition rules because AI systems must understand valid nesting hierarchies (e.g., `TableCell` only inside `TableRow`).

## Files
- `src/metadata/components/dataDisplayMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/dataDisplayMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. **List** — category: `"data"`:
   - description: `"Vertical list of homogeneous items with token-driven spacing and optional dividers."`
   - props: `variant` (enum: `"default" | "bordered" | "divided"`), `density` (enum: `"compact" | "comfortable"`), `selectable`
   - slots: `items` (required, allowedComponents: `["ListItem"]`)
   - composition: `allowedParents: ["Box", "Stack", "Card", "ContentArea"]`, `allowedChildren: ["ListItem"]`, `disallowedChildren: ["Table", "Card", "Heading"]`
   - responsive: density collapses to `"compact"` at `sm`
   - accessibility: `role: "list"`, `keyboardInteractions: ["Arrow keys to navigate when selectable"]`
   - states: `["default"]`

4. **ListItem** — category: `"data"`:
   - description: `"Single item within a List. Supports leading icon, content, and trailing action."`
   - props: `selected`, `disabled`, `interactive`
   - slots: `leading`, `content`, `trailing`
   - composition: `allowedParents: ["List"]`, `allowedChildren: ["Text", "Icon", "Button", "Badge"]`, `disallowedChildren: ["List", "Table", "Card"]`
   - accessibility: `role: "listitem"`, `keyboardInteractions: ["Enter to select if interactive"]`
   - states: `["default", "selected", "hover", "disabled", "focus"]`

5. **Table** — category: `"data"`:
   - description: `"Structured tabular data display with header rows and typed cells."`
   - props: `striped`, `bordered`, `density` (enum: `"compact" | "comfortable"`), `stickyHeader`, `selectable`
   - slots: `header` (allowedComponents: `["TableRow"]`), `body` (allowedComponents: `["TableRow"]`)
   - composition: `allowedParents: ["Box", "Stack", "ContentArea", "Card"]`, `allowedChildren: ["TableRow"]`, `disallowedChildren: ["List", "Card", "Modal"]`
   - responsive: collapses to card/list view at `sm` via transform behavior
   - accessibility: `role: "table"`, `aria: { label: "Data table" }`, `keyboardInteractions: ["Arrow keys to navigate cells", "Tab to focus rows"]`
   - states: `["default", "loading", "empty"]`

6. **TableRow** — category: `"data"`:
   - description: `"A single row within a Table body or header."`
   - props: `selected`, `disabled`
   - composition: `allowedParents: ["Table"]`, `allowedChildren: ["TableCell"]`, `disallowedChildren: ["TableRow", "List", "Card"]`
   - accessibility: `role: "row"`, `keyboardInteractions: ["Enter to select if selectable"]`
   - states: `["default", "selected", "hover", "disabled"]`

7. **TableCell** — category: `"data"`:
   - description: `"A single cell within a TableRow. Can be a header cell (th) or data cell (td)."`
   - props: `align` (enum: `"left" | "center" | "right"`), `isHeader`, `truncate`, `width`
   - composition: `allowedParents: ["TableRow"]`, `allowedChildren: ["Text", "Badge", "Button", "Icon", "StatusIndicator"]`, `disallowedChildren: ["Table", "List", "Card", "Heading"]`, `maxDepth: 1`
   - accessibility: `role: "cell"` (or `"columnheader"` when `isHeader: true`)
   - states: `["default"]`

8. **Badge** — category: `"display"`:
   - description: `"Short status or count label. Applies semantic color from tokens."`
   - props: `variant` (enum: `"default" | "success" | "warning" | "error" | "info"`), `size` (enum: `"sm" | "md"`), `count`, `label`
   - composition: `allowedParents: ["Box", "Row", "TableCell", "ListItem", "Button", "Card"]`, `allowedChildren: []`, `maxDepth: 0`
   - accessibility: `role: "status"`, `aria: { label: "Badge" }`
   - states: `["default"]`

9. **StatusIndicator** — category: `"display"`:
   - description: `"Visual indicator dot or icon representing a live status value."`
   - props: `status` (enum: `"active" | "inactive" | "pending" | "error" | "warning"`), `label`, `showLabel`
   - composition: `allowedParents: ["Box", "Row", "TableCell", "ListItem", "Card"]`, `allowedChildren: []`, `maxDepth: 0`
   - accessibility: `role: "img"`, `aria: { label: "Status: active" }`
   - states: `["active", "inactive", "pending", "error", "warning"]`

10. **EmptyState** — category: `"display"`:
    - description: `"Placeholder displayed when a data collection has no items."`
    - props: `title`, `description`, `icon`, `action`
    - slots: `icon`, `action`
    - composition: `allowedParents: ["Box", "Stack", "ContentArea", "Card"]`, `allowedChildren: ["Heading", "Text", "Button", "Icon"]`, `disallowedChildren: ["Table", "List", "Card"]`
    - accessibility: `role: "status"`, `screenReaderDescription: "No content available"`
    - states: `["default"]`
    - usage: recommended to replace empty Table or List; discouraged for use inside Table body

11. **LoadingState** — category: `"display"`:
    - description: `"Placeholder displayed while data is being fetched or processed."`
    - props: `lines`, `showSpinner`, `label`
    - composition: `allowedParents: ["Box", "Stack", "ContentArea", "Card", "Table"]`, `allowedChildren: []`, `maxDepth: 0`
    - accessibility: `role: "status"`, `aria: { live: "polite", busy: "true" }`, `screenReaderDescription: "Loading content"`
    - states: `["loading"]`

12. Each `registerComponent(metadata)` call is a module-level side effect. Version all at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- `TableCell` must have `allowedParents: ["TableRow"]` only — this is a strict hierarchy
- `ListItem` must have `allowedParents: ["List"]` only
- Leaf-level components (`Badge`, `StatusIndicator`, `LoadingState`) must have `maxDepth: 0`

## Acceptance Criteria
- All 11 components registered: `List`, `ListItem`, `Table`, `TableRow`, `TableCell`, `Badge`, `StatusIndicator`, `EmptyState`, `LoadingState`
- `getComponent("TableCell")` has `composition.allowedParents: ["TableRow"]`
- `getComponent("Badge")` has `composition.maxDepth: 0`
- `getComponent("Table")` has `states` including `"loading"` and `"empty"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import the file, call `getComponent("TableCell")` — verify `allowedParents` is `["TableRow"]`
3. Call `getComponent("List")` — verify `allowedChildren` is `["ListItem"]`
4. Call `getComponent("StatusIndicator")` — verify `composition.maxDepth` is `0`
