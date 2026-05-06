# Task 010: Unit Tests

## Feature
F003 — Core Primitive Component Library

## Description
Write unit tests for all 8 F003 components. Each component gets its own test file following the same pattern used by the F002 primitives tests.

## Files
- Create: `src/components/Text.test.tsx`
- Create: `src/components/Heading.test.tsx`
- Create: `src/components/Label.test.tsx`
- Create: `src/components/Card.test.tsx`
- Create: `src/components/Surface.test.tsx`
- Create: `src/components/Divider.test.tsx`
- Create: `src/components/Button.test.tsx`
- Create: `src/components/Icon.test.tsx`

## Implementation Steps
1. Review `src/primitives/Box.test.tsx` to confirm the test pattern in use
2. For each component, create a test file that:
   - Wraps renders in `ThemeProvider` (import from `../theme/ThemeProvider`)
   - Uses `@testing-library/react` `render` and screen queries
   - Tests all acceptance criteria from the component's task file

### Text.test.tsx
- size, weight, color props produce correct CSS variable references in style
- No optional props → no fontSize/fontWeight/color in style
- fontFamily and lineHeight always present

### Heading.test.tsx
- level 1–4 renders h1–h4 elements
- Font size maps correctly per level
- Defaults to h2 when no level provided
- fontWeight is always bold

### Label.test.tsx
- Renders a span (from Text)
- style.fontSize === "var(--font-size-sm)"
- style.fontWeight === "var(--font-weight-medium)"

### Card.test.tsx
- Renders with surface background, md radius, and border by default
- padding prop produces correct spacing variable
- No padding when omitted

### Surface.test.tsx
- variant="base" (default) → background color-background, no border
- variant="raised" → background color-surface, no border
- variant="sunken" → background color-background, border applied

### Divider.test.tsx
- Default renders hr with borderTop
- orientation="vertical" renders div with borderLeft
- margin is 0 in both cases

### Button.test.tsx
- Renders a button element
- Each variant produces correct background/border styles
- Each size produces correct padding CSS variable
- borderRadius is always var(--radius-md)
- onClick fires on click

### Icon.test.tsx
- Renders a span
- size prop maps to correct spacing CSS variable for width/height
- Defaults to md
- Children are rendered

## Constraints
- All tests must wrap renders in `ThemeProvider`
- Use `@testing-library/react` — no enzyme or other libraries
- Follow the existing test pattern from `src/primitives/Box.test.tsx`
- Do not add tests for behavior not specified in the component task files

## Acceptance Criteria
- All test files exist
- All tests pass: `npm test`
- No new test utilities or helpers introduced

## Test Steps
1. Run `npm test` — verify all tests pass with no failures
2. Verify test output shows 8 new test suites from `src/components/`

## Notes
Check `src/primitives/Box.test.tsx` before writing any test — match its import style, wrapper pattern, and assertion approach exactly.
