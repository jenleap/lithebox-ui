# Task 006: Dashboard Screen

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the Dashboard page, which validates layout primitives, page composition, data display components, and responsive grid behavior. All data is static/mock — no real API calls.

## Files
- `apps/playground/src/pages/DashboardPage.tsx` (create)
- `apps/playground/src/pages/dashboard/KpiCard.tsx` (create)
- `apps/playground/src/pages/dashboard/ActivityFeed.tsx` (create)

## Implementation Steps
1. **DashboardPage.tsx** — top-level page layout:
   - Page title: "Dashboard" using Lithebox Heading component.
   - KPI row: 4 `KpiCard` components in a responsive grid (2-col mobile, 4-col desktop).
   - Below KPI row: two-column layout on desktop (Table left, ActivityFeed right); single column on mobile.
   - A toolbar row above the table: "Data Management" label + "Add Item" Button (navigates to `/data`).

2. **KpiCard.tsx**:
   - Props: `label: string`, `value: string | number`, `trend?: 'up' | 'down' | 'neutral'`
   - Uses Lithebox Card/Surface with a label (Text) and value (Heading).
   - Trend indicator: small colored Text component ("↑" green / "↓" red / "—" neutral) using token-driven color.

3. **Table section** (inline in DashboardPage):
   - Use Lithebox Table component with mock data: 5 rows of `{ id, name, status, date }`.
   - Columns: Name, Status (with Lithebox Badge/Status component), Date.
   - Table must render scrollably on mobile (horizontal scroll container via Lithebox Box).

4. **ActivityFeed.tsx**:
   - Mock list of 5 activity items: `{ user, action, time }`.
   - Uses Lithebox List or Stack with Divider between items.
   - Each item: user name (Text bold), action (Text muted), time (Text small muted).

5. Mock KPI data:
   ```ts
   const kpis = [
     { label: 'Total Users', value: '12,400', trend: 'up' },
     { label: 'Active Sessions', value: '843', trend: 'up' },
     { label: 'Error Rate', value: '0.3%', trend: 'down' },
     { label: 'Avg Response', value: '142ms', trend: 'neutral' },
   ]
   ```

## Constraints
- All data is static mock data (no fetching)
- Responsive grid using Lithebox layout primitives only
- Table must use the Lithebox Table component from the public API
- No external charting libraries (charts are out of scope per spec)

## Acceptance Criteria
- Dashboard renders with 4 KPI cards, table, and activity feed
- KPI grid is 4 columns on desktop, 2 columns on mobile
- Table renders 5 rows with correct columns
- Table is horizontally scrollable on mobile
- Activity feed shows 5 items with dividers
- No console errors

## Test Steps
1. Visit `/dashboard` — all sections render
2. Resize to 375px — KPI grid becomes 2 columns, table scrolls horizontally
3. Resize to 1280px — 4-column KPI grid, two-column layout below
4. No console errors on render

## Notes
Dashboard is the primary validation of layout primitives and data display components under realistic application composition.
