# Task 007: Settings Screen

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the Settings page, which validates complex forms, theme switching (light/dark), toggles, field validation, and sectioned layout composition. Theme switching here is the primary validation of runtime token propagation across the entire application.

## Files
- `apps/playground/src/pages/SettingsPage.tsx` (create)

## Implementation Steps
1. **Page structure**:
   - Page heading: "Settings" via Lithebox Heading.
   - Sectioned layout: each section is a Lithebox Card/Surface with a section title and divider above content.
   - Sections:
     a. Appearance
     b. Account
     c. Notifications
     d. Danger Zone

2. **Appearance section**:
   - Theme toggle: "Light" / "Dark" segmented control or two Buttons that call the ThemeProvider's theme switching function.
   - On toggle: all CSS variables update instantly across the entire app — validate this updates the sidebar, header, and all surfaces simultaneously.
   - Export a `useTheme` hook or use the ThemeProvider's context — check the public API for the correct mechanism.

3. **Account section**:
   - Fields: Display Name (Input, required, min 2 chars), Email (Input, required, email format), Bio (Textarea, max 200 chars, show char count).
   - "Save Changes" Button (primary). On valid submit: show success toast, simulate 800ms delay.
   - On invalid: show inline field errors.

4. **Notifications section**:
   - Three toggle rows using Lithebox Checkbox or Toggle component:
     - "Email notifications"
     - "Push notifications"
     - "Weekly digest"
   - Persist state in local component state (no backend).

5. **Danger Zone section**:
   - "Delete Account" Button (destructive variant).
   - On click: open a Lithebox Modal confirmation dialog with "Are you sure?" and Cancel / Confirm Delete buttons.
   - Cancel closes the modal. Confirm shows an error toast ("This is a demo — no action taken").

## Constraints
- Theme switching must use only the public ThemeProvider API (no internal runtime manipulation)
- All validation via Lithebox Field system
- Modal must use Lithebox Modal component
- No CSS overrides

## Acceptance Criteria
- All four sections render with correct content
- Theme toggle switches the entire app between light and dark mode instantly
- Account form validates and shows errors on invalid submit
- Success toast shows after valid account save (with loading state)
- Notification toggles change state when clicked
- Delete Account opens modal; Cancel closes it; Confirm shows error toast
- Responsive: sections stack vertically on mobile

## Test Steps
1. Visit `/settings` — all sections render
2. Click "Dark" — entire app (including sidebar/header) switches to dark mode
3. Click "Light" — app reverts to light mode
4. Submit empty Account form — errors appear on Name and Email fields
5. Fill valid Account form, click Save — loading state, then success toast
6. Click "Delete Account" — modal appears; click Cancel — modal closes
7. Click "Delete Account" again — click Confirm — error toast shown

## Notes
Theme switching in this screen is the primary validation of the runtime token propagation system across the full provider tree.
