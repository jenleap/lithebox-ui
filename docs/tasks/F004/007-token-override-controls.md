# Task 007: Token Override Controls

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Add a live token override mechanism to Storybook. This allows partial token overrides to be applied at runtime, with immediate visual updates, validating the token merge system under real rendering conditions.

## Files
- `.storybook/preview.ts` — add global types for token override args
- `.storybook/ThemeDecorator.tsx` — update to read override globals and pass to ThemeProvider
- `src/stories/tokens/TokenOverride.stories.tsx` — a dedicated story that exercises overrides

## Implementation Steps
1. Update `.storybook/preview.ts`:
   - Add `globalTypes` with a `tokenOverrides` entry:
     ```ts
     globalTypes: {
       tokenOverrides: {
         name: 'Token Overrides',
         description: 'Partial token overrides applied to ThemeProvider',
         defaultValue: '{}',
         toolbar: {
           title: 'Token Overrides',
           icon: 'paintbrush',
         },
       },
     }
     ```
   - The value will be a JSON string representing a partial token object

2. Update `.storybook/ThemeDecorator.tsx`:
   - Accept `context` parameter in the decorator function
   - Read `context.globals.tokenOverrides` (parse JSON safely)
   - Call `mergeTokens(defaultTokens, parsedOverrides)` to produce the final token set
   - Pass the merged token set to `ThemeProvider`
   - Import `mergeTokens` from `../../src/tokens/mergeTokens`

3. Create `src/stories/tokens/TokenOverride.stories.tsx`:
   - Story title: `'Tokens/TokenOverride'`
   - A single `Default` story that renders:
     - A `Card` with `Heading` and `Button` — representative components that rely on color and spacing tokens
   - Include story-level `args` for a small set of overridable tokens (e.g., `primaryColor`) using Storybook controls
   - The story's `render` function applies the arg value via `mergeTokens` and renders inside a local `ThemeProvider` so the control is scoped to this story only
   - Add a note in the story description: "Use the global Token Overrides toolbar to apply overrides across all stories"

## Constraints
- JSON parsing of `tokenOverrides` must be wrapped in try/catch — invalid JSON must fall back to `defaultTokens` silently
- `mergeTokens` is the only allowed merging mechanism — do not manually spread token objects
- Do not modify how `ThemeProvider` works internally — only its inputs change
- Override controls must not affect story args or component behavior — only token values

## Acceptance Criteria
- Entering a valid partial token JSON in the toolbar updates all stories in real time
- Invalid JSON in the toolbar field does not crash Storybook — defaults are used instead
- `TokenOverride/Default` story shows a color control that visually updates the rendered card
- `mergeTokens` is used (not manual object spread) in the decorator

## Test Steps
1. Run `npm run storybook`
2. Navigate to any `Components/Button` story
3. In the toolbar, enter a valid partial token JSON (e.g., `{ "color": { "primary": "#FF0000" } }`)
4. Confirm the button color updates without page reload
5. Enter invalid JSON — confirm Storybook does not error
6. Navigate to `Tokens/TokenOverride` — interact with the color control and confirm update

## Notes
The global toolbar approach keeps override state in Storybook's URL, making overridden states shareable via URL. This is a key UX benefit worth preserving in the implementation.
