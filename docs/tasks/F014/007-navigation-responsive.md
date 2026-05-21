# Task 007: Navigation Responsive Integration

## Feature
F014 - Responsive System

## Description
Make the navigation system adapt across breakpoints. On desktop the sidebar is persistent. On tablet it collapses to an icon rail. On mobile it becomes a drawer-based overlay. This task implements the sidebar component's three rendering modes and the mobile drawer trigger.

## Files
- `src/layers/AppNav.tsx` (modify, or whichever component renders the sidebar navigation)
- `src/components/Drawer.tsx` (modify — add a nav-drawer trigger for mobile)

## Implementation Steps

1. Identify the component that renders the sidebar navigation (likely in `src/layers/` or `src/components/`). Run a search if the exact filename is unclear.

2. Import `useBreakpoint` from `src/responsive/useBreakpoint.ts`.

3. In the sidebar/navigation component, read `isMobile`, `isTablet`, `isDesktop` from `useBreakpoint()`.

4. Implement three rendering modes:

   **Desktop (isDesktop):**
   - Render the full navigation list with labels and icons
   - No changes from current behavior

   **Tablet (isTablet):**
   - Render only icons (no text labels)
   - Reduce sidebar container width to the icon rail width defined in Task 006 (`~60px`)
   - If a `sidebarMode` prop is available from AppShell, use `"icon-rail"` to trigger this mode

   **Mobile (isMobile):**
   - Do not render the sidebar in the normal layout position
   - Render a hamburger/menu trigger button in a fixed or header position
   - On trigger click, open a `<Drawer>` that contains the full navigation list
   - The Drawer must use the existing `Drawer` component from F008

5. Manage the drawer open/close state with a `useState` boolean local to this component.

## Constraints
- No raw CSS media queries
- The Drawer used for mobile nav must be the existing Drawer component — do not create a new overlay
- Icon-rail mode must not show text labels — hiding them must be done via conditional rendering, not CSS visibility
- Do not modify the Drawer component's core behavior

## Acceptance Criteria
- On desktop, full sidebar with labels and icons renders
- On tablet, icon-rail sidebar (icons only, no labels) renders
- On mobile, sidebar is replaced by a menu button; clicking opens a Drawer with full nav
- Drawer closes when navigating (if items have an `onClick`, it must also close the drawer)
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render navigation inside `<ResponsiveProvider>` at different simulated breakpoints
3. Verify three distinct rendering modes

## Notes
If the navigation component does not yet have icon-only mode support, add the minimum needed to support `showLabels: boolean` internally — no new public prop required unless it is already in the API.
