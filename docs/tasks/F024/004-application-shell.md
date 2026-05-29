# Task 004: Application Shell

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the application shell: the persistent layout wrapping all authenticated screens. The shell includes a sidebar (desktop), a mobile navigation header with hamburger menu, a main content area, and an overlay layer. All styling must use Lithebox layout primitives and tokens — no custom CSS.

## Files
- `apps/playground/src/shell/AppShell.tsx` (create)
- `apps/playground/src/shell/Sidebar.tsx` (create)
- `apps/playground/src/shell/MobileNav.tsx` (create)
- `apps/playground/src/shell/Header.tsx` (create)
- `apps/playground/src/routes/index.tsx` (update — wrap authenticated routes in AppShell)

## Implementation Steps
1. Create `AppShell.tsx`:
   - Use Lithebox layout primitives (`Box`, `Stack`, `Row`, or equivalent from public API).
   - Desktop layout: fixed sidebar on left, main content area fills remaining width.
   - Mobile layout: top header + slide-in nav drawer (use Lithebox Drawer component for mobile menu).
   - Exposes a content slot via `{children}`.
   - Uses a breakpoint from Lithebox tokens to toggle between layouts.
2. Create `Sidebar.tsx`:
   - Nav links: Dashboard, Data, Settings, Overlays (using Lithebox navigation components or styled Box/Stack).
   - Active route highlighted using `useMatch` from react-router-dom.
   - Lithebox-UI branding/title at top.
3. Create `Header.tsx`:
   - Mobile only: hamburger button (opens drawer), app title.
   - Desktop: hidden or shows breadcrumb.
4. Create `MobileNav.tsx`:
   - Renders nav links inside a Lithebox Drawer component.
   - Controlled by open/close state from Header hamburger button.
5. Update `routes/index.tsx`:
   - Wrap `/dashboard`, `/settings`, `/data`, `/overlays` routes in `<AppShell>`.
   - Auth routes (`/auth/*`) render outside the shell (no sidebar).
6. Verify keyboard navigation: Tab through sidebar links, Enter activates them.

## Constraints
- No custom CSS or inline style objects — use Lithebox layout and token primitives only
- Sidebar must be responsive: visible on desktop (≥768px), hidden on mobile
- Mobile nav must use Lithebox Drawer component
- All nav links must be keyboard accessible

## Acceptance Criteria
- Desktop: sidebar renders on left, content area fills right
- Mobile (<768px): sidebar hidden, header with hamburger shown
- Hamburger opens Drawer with nav links
- Active route link is visually highlighted
- Tab navigation through sidebar links works correctly
- Page content renders inside the shell for all authenticated routes
- Auth routes render without the shell

## Test Steps
1. Visit `/dashboard` — shell renders with sidebar on desktop
2. Resize browser to 375px wide — sidebar collapses, header appears
3. Click hamburger — mobile nav drawer opens
4. Click each nav link — navigates to correct route, drawer closes
5. Tab through sidebar links — focus is visible and links activate with Enter
6. Visit `/auth/login` — no sidebar/shell rendered

## Notes
Use Lithebox overlay/drawer system for mobile nav. This validates the overlay system under real application conditions.
