# Task 003: Table System

## Feature
F009 — Data Display System

## Description
Implement the `Table`, `TableHeader`, `TableBody`, `TableRow`, and `TableCell` components. The table system is a deterministic structured layout — not a data grid. It supports two density modes: `comfortable` and `compact`.

## Files
- `src/components/Table.tsx` (create)
- `src/index.ts` (modify — add exports)

## Implementation Steps

1. Create `src/components/Table.tsx` containing all five table sub-components:

   **Types:**
   ```ts
   export type TableDensity = "comfortable" | "compact"

   export type TableProps = {
     density?: TableDensity
     children?: React.ReactNode
   }

   export type TableHeaderProps = {
     children?: React.ReactNode
   }

   export type TableBodyProps = {
     children?: React.ReactNode
   }

   export type TableRowProps = {
     children?: React.ReactNode
   }

   export type TableCellProps = {
     children?: React.ReactNode
     header?: boolean
   }
   ```

   **Density context:**
   - Create a React context `TableDensityContext` with type `TableDensity` and default `"comfortable"`
   - `Table` provides the context so all descendant cells can read the density

   **`Table` implementation:**
   - Import `TableContract` from `"../contracts/TableContract"`
   - Provide `TableDensityContext` with the `density` prop (default `"comfortable"`)
   - Render as `<table>` with `borderCollapse: "collapse"`, `width: "100%"`

   **`TableHeader` implementation:**
   - Render as `<thead>`
   - Apply background from `TableContract.header.background` resolved via `resolveSlot`

   **`TableBody` implementation:**
   - Render as `<tbody>`

   **`TableRow` implementation:**
   - Render as `<tr>`
   - Apply `borderBottom` using `TableContract.row.border` resolved via `resolveSlot`

   **`TableCell` implementation:**
   - Consume `TableDensityContext` to get current density
   - If `header` prop is true, render as `<th>`, otherwise `<td>`
   - Apply padding from `TableContract.density[density].padding` resolved via `resolveSlot`
   - Apply `color` from `TableContract.cell.text` if not a header cell
   - Apply `color` from `TableContract.header.text` if a header cell
   - Header cell: apply `fontWeight: 600`, `textAlign: "left"`
   - Non-header cell: `textAlign: "left"`

2. Update `src/index.ts` — add:
   ```ts
   export { Table, TableHeader, TableBody, TableRow, TableCell } from "./components/Table"
   export type { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableCellProps, TableDensity } from "./components/Table"
   ```

## Constraints
- All padding/color values must resolve through `TableContract` and `resolveSlot`
- No hardcoded pixel values for spacing
- The density context is the only internal state — `Table` has no other state
- No sorting, filtering, or pagination (MVP boundary)
- No row selection interaction state (future)
- Do not use `useInteractionState` on rows at this stage

## Acceptance Criteria
- `Table` renders as semantic `<table>` element
- `TableHeader` cells render as `<th>`, body cells as `<td>`
- `density="comfortable"` applies `spacing.md` padding to cells
- `density="compact"` applies `spacing.sm` padding to cells
- Header row has distinct text color from body rows
- Row border applies correctly
- All components exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify in Storybook (task 008): comfortable and compact density modes visually differ; header row is visually distinct

## Notes
The density context pattern keeps cell padding synchronized without passing density as a prop through every intermediate component. This is the only context the table system introduces.
