# Task 008: Storybook Stories

## Feature
F009 — Data Display System

## Description
Create Storybook stories for all F009 components. Stories must demonstrate real-world application data scenarios: populated tables, empty states, loading states, badge usage inside table cells, and status indicator usage.

## Files
- `src/stories/data-display/List.stories.tsx` (create)
- `src/stories/data-display/Table.stories.tsx` (create)
- `src/stories/data-display/Badge.stories.tsx` (create)
- `src/stories/data-display/StatusIndicator.stories.tsx` (create)
- `src/stories/data-display/ContentStates.stories.tsx` (create)
- `src/stories/data-display/DataDisplayComposition.stories.tsx` (create)

## Implementation Steps

1. Create `src/stories/data-display/List.stories.tsx`:
   - Default story: a `List` with 4 `ListItem` entries, `spacing="md"`
   - Spacing variants story: show `sm`, `md`, `lg` side by side
   - Description list story: a `DescriptionList` with 4 `DescriptionListItem` entries (e.g. Name/Alice, Role/Engineer, Status/Active, Joined/2024)

2. Create `src/stories/data-display/Table.stories.tsx`:
   - Comfortable density story: a `Table` with `TableHeader` (columns: Name, Status, Role) and 3 `TableBody` rows using `Badge` in the Status column
   - Compact density story: same data, `density="compact"`

3. Create `src/stories/data-display/Badge.stories.tsx`:
   - All variants story: render all five `Badge` variants in a `Row` with labels
   - Inline usage story: show badges inside a simple `Stack` of list items (name + badge)

4. Create `src/stories/data-display/StatusIndicator.stories.tsx`:
   - All variants story: render all five `StatusIndicator` variants with labels
   - Without labels story: render just the dots

5. Create `src/stories/data-display/ContentStates.stories.tsx`:
   - `EmptyState` story: title "No results found", description "Try adjusting your search.", action slot with a `Button`
   - `LoadingState` story: with label "Fetching data..."
   - `ErrorState` story: default title, description "Check your connection and try again.", action slot with a `Button` labeled "Retry"

6. Create `src/stories/data-display/DataDisplayComposition.stories.tsx`:
   - "Server Status Dashboard" story:
     - A `Stack` containing:
       - A `Heading` "Infrastructure Status"
       - A `Table` (comfortable) with columns: Service, Status, Uptime
       - 4 rows with `StatusIndicator` in Status column and `Badge` in Uptime column
   - "Empty Table" story:
     - A `Stack` containing a `Table` header and an `EmptyState` below it (showing the empty data case)
   - "Loading Table" story:
     - A `Stack` with a `Table` header and `LoadingState` below it

## Constraints
- All stories wrapped in `ThemeProvider` via Storybook decorator (already configured in `.storybook/preview.tsx`)
- Use only existing components — no new primitives or utilities
- No mock data fetching — static props only
- Story titles follow the pattern: `"Data Display/ComponentName"`

## Acceptance Criteria
- All 6 story files created
- Storybook runs without console errors for all stories
- Composition story demonstrates `Badge` and `StatusIndicator` used inside a `Table`
- Empty/Loading/Error state stories are visually distinct
- All density variants of `Table` are visually distinguishable

## Test Steps
1. Run `npm run storybook` — no console errors
2. Navigate to each story and visually verify correct rendering
3. Verify comfortable vs compact table density visually differ
4. Verify all badge variants have distinct colors

## Notes
The composition story is the primary validation scenario for this feature — it demonstrates that the data display system can support a real, dense application interface using only token-driven components.
