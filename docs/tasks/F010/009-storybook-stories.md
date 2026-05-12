# Task 009: Storybook Stories

## Feature
F010 — Page Composition System

## Description
Create Storybook stories for the F010 Page Composition System. Stories must demonstrate all four layout presets, all four page states, section composition, and realistic full-page templates showing the system working end-to-end with data display components from F009.

## Files
- `src/stories/page-composition/Page.stories.tsx` (create)
- `src/stories/page-composition/Section.stories.tsx` (create)
- `src/stories/page-composition/PageTemplates.stories.tsx` (create)

## Implementation Steps

1. Create `src/stories/page-composition/Page.stories.tsx`:
   - Story: `StandardLayout` — `Page` with `layout="standard"`, a `PageHeader` with a `Heading`, and `PageContent` with a single `Section` containing placeholder `Text`
   - Story: `DashboardLayout` — `Page` with `layout="dashboard"`, a `PageHeader`, a `PageSidebar` with nav links (simple `Text` items), and `PageContent` with two `Section` components
   - Story: `DetailLayout` — `Page` with `layout="detail"`, a `PageHeader`, `PageContent` with a `Section`, and a `PageSidebar` on the right with contextual info
   - Story: `FormLayout` — `Page` with `layout="form"`, a `PageHeader` with a title, and `PageContent` with a `Section` containing a `Stack` of `Field` components
   - Story: `WithFooter` — `Page` with `layout="standard"`, a `PageHeader`, `PageContent`, and a `PageFooter` with pagination placeholder text

2. Create `src/stories/page-composition/Page.stories.tsx` — page state stories:
   - Story: `StateLoading` — `Page` with `state="loading"` and a `PageHeader` showing the title still renders
   - Story: `StateError` — `Page` with `state="error"` and a `PageHeader`
   - Story: `StateEmpty` — `Page` with `state="empty"` and a `PageHeader`
   - Story: `StateReady` — `Page` with `state="ready"` (default) with children content visible

   > Note: Add these as additional stories to the same `Page.stories.tsx` file.

3. Create `src/stories/page-composition/Section.stories.tsx`:
   - Story: `WithTitle` — a `Section` with `title="Overview"` and a `Stack` of `Text` items, rendered inside a `Page > PageContent`
   - Story: `WithoutTitle` — a `Section` with no title, just content
   - Story: `NestedSections` — two `Section` components inside `PageContent`, demonstrating vertical stacking

4. Create `src/stories/page-composition/PageTemplates.stories.tsx`:
   - Story: `DashboardTemplate`:
     - Full `Page` with `layout="dashboard"`
     - `PageHeader`: `Heading` "Infrastructure Dashboard" + a `Button` "Add Server"
     - `PageSidebar`: a simple nav with `Text` items (Dashboard, Servers, Settings)
     - `PageContent`: two `Section` components:
       1. `Section title="Server Status"` containing a `Table` (columns: Name, Status, Region) with 3 rows using `StatusIndicator` and `Badge`
       2. `Section title="Recent Activity"` containing a `List` with 4 `ListItem` entries
   - Story: `FormTemplate`:
     - Full `Page` with `layout="form"`
     - `PageHeader`: `Heading` "Create Account"
     - `PageContent`: one `Section` containing a `Stack` with `Field` components (Name, Email, Role `Select`) and a `Button` "Submit"
   - Story: `DetailTemplate`:
     - Full `Page` with `layout="detail"`
     - `PageHeader`: `Heading` "User Detail" + a `Button` "Edit"
     - `PageContent` (main): a `Section title="Profile"` with a `DescriptionList` (4 items: Name, Email, Role, Joined)
     - `PageSidebar` (right): a `Section title="Actions"` with a `Stack` of `Button` components

## Constraints
- All stories wrapped in `ThemeProvider` via Storybook decorator (already configured in `.storybook/preview.tsx`)
- Use only existing components — no new primitives or utilities
- Story titles follow pattern: `"Page Composition/ComponentName"` and `"Page Composition/Templates"`
- For layout stories, the `Page` root must have a fixed height so the story renders correctly in the Storybook canvas: add `style={{ height: "100vh" }}` to Page or set story decorator to `height: 100vh`
- No mock data fetching — static props only

## Acceptance Criteria
- All 3 story files created
- Storybook runs without console errors for all stories
- All four layout presets are visually distinguishable
- All four page states are visually distinct
- `DashboardTemplate` demonstrates integration of F009 data display components inside the F010 page system
- `FormTemplate` demonstrates integration of form components inside the page system

## Test Steps
1. Run `npm run storybook` — no console errors
2. Navigate to each story and verify correct structural rendering
3. Verify `DashboardTemplate` shows sidebar, header, table, and list correctly positioned
4. Verify `FormTemplate` shows centered content with max-width constraint

## Notes
The `PageTemplates` stories are the primary validation scenario for this feature — they demonstrate that the Page Composition System successfully unifies all prior layers (tokens, primitives, components, forms, data display) into coherent, production-quality application screens.
