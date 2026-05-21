# Task 006: Page Composition Responsive Integration

## Feature
F014 - Responsive System

## Description
Integrate responsive behavior into the page composition system. The AppShell must adapt its region layout across breakpoints: full multi-region layout on desktop, reduced sidebar width on tablet, stacked layout on mobile. The sidebar drawer behavior is handled in Task 007 (Navigation Responsive Integration).

## Files
- `src/components/AppShell.tsx` (modify)

## Implementation Steps

1. Import `useBreakpoint` from `src/responsive/useBreakpoint.ts`.

2. Read `breakpoint`, `isMobile`, `isTablet` from `useBreakpoint()` inside `AppShell`.

3. Apply layout adaptation rules based on breakpoint:
   - **Desktop (`lg`, `xl`, `xxl`)**: full multi-region layout — sidebar fully visible with standard width
   - **Tablet (`md`)**: sidebar collapses to a reduced width (icon rail width, e.g., `60px`)
   - **Mobile (`sm`)**: sidebar is hidden from the main layout flow (will be overlaid as a drawer in Task 007); main content takes full width

4. Implement this via inline style or className logic on the AppShell's region containers — do not add raw CSS media queries.

5. Pass a `sidebarMode` derived value down to the sidebar slot:
   ```ts
   type SidebarMode = "full" | "icon-rail" | "hidden"
   ```
   - `"full"` for desktop
   - `"icon-rail"` for tablet
   - `"hidden"` for mobile

6. If AppShell accepts children or slots for the sidebar, pass `sidebarMode` as a prop to the sidebar child. This task does not require the sidebar component to handle this prop yet — only the AppShell-level layout switch is in scope.

## Constraints
- Do not add raw CSS media queries
- Do not modify page composition types or contracts beyond what is needed
- The sidebar drawer overlay is out of scope for this task (Task 007 handles it)
- Keep changes minimal and surgical

## Acceptance Criteria
- At `sm` breakpoint, the AppShell hides the sidebar region from layout flow
- At `md` breakpoint, the sidebar region reduces to icon rail width
- At `lg`+, the sidebar region shows at full width
- `sidebarMode` is derived and available to be passed to sidebar children
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `<AppShell>` inside `<ResponsiveProvider>` and verify layout changes when simulating breakpoints

## Notes
The actual sidebar component's rendering modes (full nav vs icon rail vs hidden) are handled in Task 007. This task only manages the structural shell region visibility and sizing.
