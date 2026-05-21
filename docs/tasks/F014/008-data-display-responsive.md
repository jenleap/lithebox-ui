# Task 008: Data Display Responsive Integration

## Feature
F014 - Responsive System

## Description
Make the data display components adapt across breakpoints. Tables must degrade to stacked row cards on mobile (no horizontal overflow). Lists must reduce spacing on smaller breakpoints. All transformations must be deterministic — driven by the responsive system, not ad hoc CSS.

## Files
- `src/components/Table.tsx` (modify, or equivalent table component path)
- `src/components/List.tsx` (modify, or equivalent list component path)

## Implementation Steps

### Table.tsx

1. Import `useBreakpoint` from `src/responsive/useBreakpoint.ts`.
2. Read `isMobile` from `useBreakpoint()`.
3. When `isMobile` is `true`, switch from table layout to **stacked card layout**:
   - Instead of rendering a `<table>` with `<tr>`/`<td>`, render each row as a `<div>` card
   - Each cell is rendered as a labeled row: column header on the left, cell value on the right
   - Use column `header`/`key` metadata already present in the table's column definition to derive labels
4. When `isMobile` is `false`, render the standard table layout unchanged.
5. The stacked card layout must use tokens for spacing (do not hardcode padding values).

### List.tsx

1. Import `useBreakpoint` from `src/responsive/useBreakpoint.ts` and `responsiveDensity` from `src/responsive/breakpointTokens.ts`.
2. Read `breakpoint` from `useBreakpoint()`.
3. Resolve the density for the current breakpoint:
   - `sm` → `"compact"` (reduce item padding/gap)
   - `md`+ → `"comfortable"` (standard spacing)
4. Apply the resolved density to the list item spacing — use the token system to map density to actual spacing values.
5. If the list currently has a fixed `density` prop, make it accept `ResponsiveValue<"compact" | "comfortable">` as well, keeping the existing plain string form working.

## Constraints
- No horizontal overflow on mobile tables — the stacked card layout is the only mobile mode
- No raw CSS media queries
- Do not introduce new third-party dependencies
- List metadata (secondary text) collapsing is out of scope for MVP — only spacing density is required

## Acceptance Criteria
- At `sm`, `<Table>` renders stacked cards with column labels + values instead of a table
- At `md`+, `<Table>` renders the standard table layout
- At `sm`, `<List>` renders with compact spacing
- At `md`+, `<List>` renders with comfortable spacing
- TypeScript compiles with no errors
- No horizontal scroll visible on mobile table rendering

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `<Table columns={...} data={...} />` inside `<ResponsiveProvider>` at `sm` breakpoint — verify stacked card layout
3. Render `<List>` at `sm` — verify compact density applied

## Notes
The stacked card layout transforms each row into a definition-list style card. Keep it simple — label/value pairs stacked vertically with consistent token-based spacing.
