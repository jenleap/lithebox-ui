# Task 005: Authentication Screens

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the Login, Signup, and Password Reset screens using Lithebox form components. These screens validate the form system, validation engine, responsive layout, and feedback states in an end-to-end scenario. No real authentication logic — state is simulated.

## Files
- `apps/playground/src/pages/auth/LoginPage.tsx` (create)
- `apps/playground/src/pages/auth/SignupPage.tsx` (create)
- `apps/playground/src/pages/auth/ResetPage.tsx` (create)

## Implementation Steps
1. **LoginPage.tsx**:
   - Centered card layout using Lithebox Card/Surface primitive.
   - Fields: Email (Input, required, email validation), Password (Input, type=password, required, min 8 chars).
   - Submit button: "Sign In" (Lithebox Button, loading state on submit).
   - On submit: simulate 1s async delay, then show success toast and redirect to `/dashboard`.
   - On error simulation (wrong credentials flag): show inline field error via Lithebox Field error state.
   - Link to `/auth/signup` and `/auth/reset`.
   - Fully responsive: full-width on mobile, max-width card centered on desktop.

2. **SignupPage.tsx**:
   - Fields: Name (Input, required), Email (Input, required, email), Password (Input, password, min 8), Confirm Password (Input, must match password).
   - Submit button: "Create Account" with loading state.
   - Validate all fields on submit; show inline errors via Lithebox Field components.
   - On success: show success toast, redirect to `/dashboard`.
   - Link back to `/auth/login`.

3. **ResetPage.tsx**:
   - Fields: Email (Input, required, email).
   - Submit button: "Send Reset Link" with loading state.
   - On success: show a banner/alert message "Check your email" using Lithebox feedback component.
   - Link back to `/auth/login`.

4. Each screen uses:
   - Lithebox form primitives: `Field`, `Input`, `Button`
   - Lithebox feedback: `useToast` or equivalent for success messages
   - Lithebox layout: `Box`, `Stack`, `Card` or equivalent

## Constraints
- All validation logic is client-side only (no backend)
- No third-party form libraries — use Lithebox Field system with React state
- All styling via Lithebox tokens
- Simulate async with `setTimeout`

## Acceptance Criteria
- Login, Signup, Reset pages render without errors
- Form validation shows inline errors on invalid submit
- Submit button shows loading state during simulated async
- Success toast appears on successful form submission
- Responsive: usable on 375px mobile and 1280px desktop
- Keyboard accessible: Tab through fields, Enter submits

## Test Steps
1. Visit `/auth/login` — form renders correctly
2. Click "Sign In" with empty fields — validation errors appear
3. Fill valid fields, click "Sign In" — loading state shows, then success toast
4. Visit `/auth/signup` — fill mismatched passwords — confirm password error shows
5. Visit `/auth/reset` — submit email — success banner shows
6. On mobile (375px) — all forms usable, no overflow

## Notes
These screens are the primary validation of the Lithebox form system under realistic composition conditions.
