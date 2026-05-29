# Task 003: Provider and Routing Setup

## Feature
F024 — Playground Application & Integration Validation System

## Description
Wire up Lithebox runtime providers (ThemeProvider, overlay, feedback) and React Router at the playground app root. This establishes the runtime environment all screens will operate within.

## Files
- `apps/playground/package.json` (add react-router-dom dependency)
- `apps/playground/src/main.tsx` (update)
- `apps/playground/src/App.tsx` (update — add router and providers)
- `apps/playground/src/routes/index.tsx` (create — route definitions)

## Implementation Steps
1. Add `react-router-dom` to `apps/playground/package.json` dependencies.
2. Run `pnpm install` to resolve the new dependency.
3. Update `apps/playground/src/App.tsx`:
   - Wrap the app in `ThemeProvider` from lithebox-ui (default theme, light mode).
   - Wrap in any required runtime providers exported by lithebox-ui (OverlayProvider, FeedbackProvider/NotificationProvider, etc.). Check the public API for correct provider names.
   - Wrap in `BrowserRouter` from react-router-dom.
   - Render `<AppRoutes />` inside the provider tree.
4. Create `apps/playground/src/routes/index.tsx`:
   - Define routes using `<Routes>` and `<Route>`:
     - `/` → redirect to `/dashboard`
     - `/auth/login` → `<LoginPage />`
     - `/auth/signup` → `<SignupPage />`
     - `/auth/reset` → `<ResetPage />`
     - `/dashboard` → `<DashboardPage />`
     - `/settings` → `<SettingsPage />`
     - `/data` → `<DataPage />`
     - `/overlays` → `<OverlaysPage />`
   - All page components are stubs (return `<div>PageName</div>`) at this stage — actual screens are built in later tasks.
5. Create stub page files for each route under `apps/playground/src/pages/`.
6. Verify the app still starts and navigating to `/dashboard` renders the stub.

## Constraints
- Use React Router v6 (`react-router-dom` v6+)
- Provider order: ThemeProvider → runtime providers → BrowserRouter → Routes
- All page stubs must be TypeScript `.tsx` files
- Do not implement page content in this task

## Acceptance Criteria
- App starts and renders without provider errors
- Navigating to each route path renders the correct stub page (no 404s)
- ThemeProvider is active (verify Lithebox CSS variables appear in DevTools)
- All runtime providers from lithebox-ui public API are mounted

## Test Steps
1. `pnpm --filter @lithebox/playground dev` — app starts
2. Visit localhost:5173 — redirects to `/dashboard`
3. Visit `/auth/login` — renders "LoginPage" stub
4. Open DevTools Elements — confirm Lithebox CSS variables (`--lb-*`) exist on root element
5. No console errors on any route

## Notes
Check the lithebox-ui public API exports (`src/index.ts`) to identify the correct provider component names before implementation.
