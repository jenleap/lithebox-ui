# Task 008: Data Management Screen

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the Data Management page, which validates the table system, pagination, search/filter UI, loading states, empty states, and toolbar composition. All data is static mock data.

## Files
- `apps/playground/src/pages/DataPage.tsx` (create)
- `apps/playground/src/pages/data/mockData.ts` (create)

## Implementation Steps
1. **mockData.ts**:
   - Export 50 mock records: `{ id: string, name: string, email: string, role: string, status: 'active' | 'inactive' | 'pending', createdAt: string }`.
   - Generate with `Array.from({ length: 50 }, ...)` — predictable, no randomness.

2. **DataPage.tsx** — structure:
   - Page heading: "Data Management" via Lithebox Heading.
   - Toolbar row (using Lithebox Row or Stack horizontal):
     - Search Input (left-aligned, placeholder "Search by name or email").
     - Role filter select (options: All, Admin, Editor, Viewer).
     - Status filter select (options: All, Active, Inactive, Pending).
     - "Add Item" Button (primary, right-aligned) — opens an "Add Item" Drawer (see step 5).
   - Table with columns: Name, Email, Role, Status (Badge), Created, Actions (Edit button).
   - Pagination: page size 10, show page X of Y, Prev/Next buttons.
   - Empty state: when search/filters match zero records, show Lithebox empty state component (icon + "No results found" message + "Clear filters" button).
   - Loading state: on initial render simulate 500ms load with Lithebox skeleton/spinner, then display data.

3. **Search**: filter `mockData` client-side by name or email substring (case-insensitive). Debounce 300ms.

4. **Filters**: filter by `role` and `status` from select values. Combine with search filter.

5. **Add Item Drawer**:
   - Lithebox Drawer component, opens from the right.
   - Form fields: Name (Input, required), Email (Input, required, email), Role (Select: Admin/Editor/Viewer), Status (Select: active/inactive/pending).
   - "Save" Button (primary) — validates, simulates 600ms async, closes drawer, shows success toast.
   - "Cancel" Button (secondary) — closes drawer.

6. **Edit button** (per row): opens same Drawer pre-filled with the row's data.

## Constraints
- All filtering and pagination is client-side on mock data
- Use Lithebox Table, pagination components from public API
- Use Lithebox Drawer for Add/Edit panel
- No external libraries for filtering or pagination

## Acceptance Criteria
- Page loads with 500ms simulated loading state, then shows first page (10 rows)
- Search filters rows in real time (300ms debounce)
- Role and status filters work and combine with search
- Pagination: 5 pages of 10 rows each; Prev/Next navigate correctly
- Empty state renders when all filters match zero results
- "Add Item" Drawer opens, form validates, saves successfully
- Edit button opens Drawer with pre-filled data
- Responsive: table scrolls horizontally on mobile, toolbar stacks vertically

## Test Steps
1. Visit `/data` — loading state shows, then 10 rows appear
2. Type "admin" in search — table filters to matching rows
3. Change role filter — rows filter further
4. Navigate to page 2 — next 10 rows appear
5. Clear all results via filters — empty state with "Clear filters" shown
6. Click "Clear filters" — all data returns
7. Click "Add Item" — Drawer opens; submit empty form — errors appear
8. Fill valid form — Drawer closes, success toast shown
9. Click Edit on a row — Drawer opens pre-filled

## Notes
Validates the table system, overlay/drawer system, and form system all operating together in a realistic data management context.
