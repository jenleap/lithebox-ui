# Task 011: Storybook Stories

## Feature
F014 - Responsive System

## Description
Create Storybook stories demonstrating the responsive system. Stories cover the breakpoint inspector, responsive layout primitives, and the navigation/data display adaptations. All stories use a `<ResponsiveProvider>` wrapper.

## Files
- `src/stories/responsive/BreakpointInspector.stories.tsx` (create)
- `src/stories/responsive/ResponsiveLayout.stories.tsx` (create)
- `src/stories/responsive/ResponsiveDataDisplay.stories.tsx` (create)

## Implementation Steps

### BreakpointInspector.stories.tsx

1. Create a story titled `"Responsive / Breakpoint Inspector"`.
2. Render a panel that displays the current breakpoint name and the `isMobile`, `isTablet`, `isDesktop` flags using `useBreakpoint()`.
3. Render a table of all breakpoint token values (sm, md, lg, xl, xxl) with their pixel widths.
4. Include instructions: "Resize the browser window to see the breakpoint update in real time."
5. All output must be wrapped in `<ResponsiveProvider>`.

### ResponsiveLayout.stories.tsx

1. Create a story titled `"Responsive / Layout Primitives"`.
2. Include the following stories:
   - `ResponsiveStack` — a `<Stack>` with `direction={{ sm: "column", lg: "row" }}` containing 3 colored boxes; shows vertical stacking at mobile and horizontal at desktop
   - `ResponsiveBox` — a `<Box>` with `padding={{ sm: "4px", md: "12px", lg: "24px" }}`; shows spacing change per breakpoint
   - `ResponsiveRow` — a `<Row>` with `gap={{ sm: "4px", lg: "16px" }}`
3. Each story includes the current breakpoint name displayed below the demo component.
4. All stories wrapped in `<ResponsiveProvider>`.

### ResponsiveDataDisplay.stories.tsx

1. Create a story titled `"Responsive / Data Display"`.
2. Include the following stories:
   - `ResponsiveTable` — a `<Table>` with 3 columns and 4 rows; shows full table on desktop and stacked card layout on mobile
   - `ResponsiveList` — a `<List>` showing compact vs comfortable density across breakpoints
3. Add a note in each story: "Resize the browser to see the responsive transformation."
4. All stories wrapped in `<ResponsiveProvider>`.

## Constraints
- Stories must compile and render in Storybook without errors
- No hardcoded pixel values in stories — use token references or descriptive labels
- Stories must be self-contained with minimal boilerplate
- Do not create stories for navigation responsive behavior (the complexity of the mobile drawer requires a live resize to demonstrate)

## Acceptance Criteria
- 3 new story files created
- Each file compiles without TypeScript errors
- Stories visible and functional in Storybook
- Breakpoint inspector updates in real time on resize
- Responsive stack and box stories correctly reflect layout changes

## Test Steps
1. Run `npm run storybook` — verify all 3 new story groups appear under "Responsive"
2. Open `BreakpointInspector` and resize browser — verify breakpoint name updates
3. Open `ResponsiveTable` at narrow viewport — verify stacked card layout

## Notes
The navigation responsive stories are omitted from MVP to keep scope manageable — the three component-level stories are sufficient to validate the responsive system.
