# Task 002: Global Theme Decorator

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Create a global Storybook decorator that wraps every story in `ThemeProvider` with `defaultTokens`. This ensures all stories render inside the real token system, identical to production behavior.

## Files
- `.storybook/preview.ts` — add global `decorators` array with the ThemeProvider decorator
- `.storybook/ThemeDecorator.tsx` — the decorator component itself

## Implementation Steps
1. Create `.storybook/ThemeDecorator.tsx`:
   - Import `ThemeProvider` from `../src/theme/ThemeProvider`
   - Import `defaultTokens` from `../src/tokens/defaultTokens`
   - Export a Storybook decorator function that wraps `Story` in `<ThemeProvider tokens={defaultTokens}>`
2. Update `.storybook/preview.ts`:
   - Import `ThemeDecorator` from `./ThemeDecorator`
   - Add it to the `decorators` array so it applies to every story globally
3. Add `parameters.backgrounds` to preview to use a neutral background matching the token system's surface token intent (do not hardcode a hex — use a descriptive label only; actual color comes from ThemeProvider)

## Constraints
- The decorator must import from `src/` — no duplicate token definitions in `.storybook/`
- Do not pass any partial overrides here; this decorator always applies full `defaultTokens`
- Token overrides are handled in Task 007 — do not pre-wire them here

## Acceptance Criteria
- Every story is automatically wrapped in `ThemeProvider` without per-story boilerplate
- CSS variables from `defaultTokens` are present on the DOM when any story renders
- Removing the decorator from `preview.ts` breaks story styling (validates it is actually active)

## Test Steps
1. Run `npm run storybook`
2. Open browser DevTools on any story
3. Inspect the root element — confirm `--color-primary` (or equivalent CSS var) is present
4. Confirm `ThemeProvider` appears in the React component tree in DevTools

## Notes
Storybook decorators receive `(Story, context)` — the decorator should render `<Story />` inside the ThemeProvider, not replace it.
