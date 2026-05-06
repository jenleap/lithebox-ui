# Task 006: Unit Tests

## Feature
F002 — Core Layout Primitives System

## Description
Write unit tests for all four layout primitives (Box, Stack, Row, Container). Tests verify that each component correctly maps props to the expected inline style values. Tests use Vitest and React Testing Library, consistent with F001 test patterns.

## Files
- Create: `src/primitives/Box.test.tsx`
- Create: `src/primitives/Stack.test.tsx`
- Create: `src/primitives/Row.test.tsx`
- Create: `src/primitives/Container.test.tsx`

## Implementation Steps

### Box.test.tsx
1. Import `render` from `@testing-library/react` and `Box` from `./Box`
2. Test: renders a `div` element
3. Test: `padding="md"` sets `style.padding` to `"var(--spacing-md)"`
4. Test: `margin="sm"` sets `style.margin` to `"var(--spacing-sm)"`
5. Test: `background="surface"` sets `style.background` to `"var(--color-surface)"`
6. Test: `radius="lg"` sets `style.borderRadius` to `"var(--radius-lg)"`
7. Test: `border={true}` sets `style.border` to `"1px solid var(--color-border)"`
8. Test: rendering with no style props — `style` object has no padding, margin, background, borderRadius, or border keys

### Stack.test.tsx
1. Import `render` from `@testing-library/react` and `Stack` from `./Stack`
2. Test: always has `style.display === "flex"` and `style.flexDirection === "column"`
3. Test: `gap="lg"` sets `style.gap` to `"var(--spacing-lg)"`
4. Test: `align="start"` sets `style.alignItems` to `"flex-start"`
5. Test: `align="center"` sets `style.alignItems` to `"center"`
6. Test: `align="end"` sets `style.alignItems` to `"flex-end"`
7. Test: `align="stretch"` sets `style.alignItems` to `"stretch"`
8. Test: no `gap` prop — `style.gap` is undefined

### Row.test.tsx
1. Import `render` from `@testing-library/react` and `Row` from `./Row`
2. Test: always has `style.display === "flex"` and `style.flexDirection === "row"`
3. Test: `gap="xs"` sets `style.gap` to `"var(--spacing-xs)"`
4. Test: `justify="start"` sets `style.justifyContent` to `"flex-start"`
5. Test: `justify="center"` sets `style.justifyContent` to `"center"`
6. Test: `justify="end"` sets `style.justifyContent` to `"flex-end"`
7. Test: `justify="between"` sets `style.justifyContent` to `"space-between"`
8. Test: `align="center"` sets `style.alignItems` to `"center"`
9. Test: `align="stretch"` sets `style.alignItems` to `"stretch"`

### Container.test.tsx
1. Import `render` from `@testing-library/react` and `Container` from `./Container`
2. Test: always has `style.width === "100%"`, `style.marginLeft === "auto"`, `style.marginRight === "auto"`
3. Test: `maxWidth="sm"` → `style.maxWidth === "640px"`
4. Test: `maxWidth="md"` → `style.maxWidth === "768px"`
5. Test: `maxWidth="lg"` → `style.maxWidth === "1024px"`
6. Test: `maxWidth="xl"` → `style.maxWidth === "1280px"`
7. Test: `maxWidth="full"` → `style.maxWidth === "100%"`
8. Test: `padding="lg"` → `style.padding === "var(--spacing-lg)"`
9. Test: `background="background"` → `style.background === "var(--color-background)"`
10. Test: no optional props — `style.maxWidth`, `style.padding`, `style.background` are undefined

## Constraints
- Use Vitest (`describe`, `it`, `expect`) and `@testing-library/react`
- Follow the test structure of existing F001 tests (see `src/tokens/mergeTokens.test.ts`)
- Access styles via `element.style.getPropertyValue(...)` or `element.style.<property>` — use whichever works with jsdom
- Do not test visual appearance — only test the presence and value of style properties

## Acceptance Criteria
- All tests pass with `npm run test`
- Each primitive has its own dedicated test file
- Every prop-to-style mapping has at least one test
- Missing/optional props do not produce spurious style values

## Test Steps
1. Run `npm run test` — all tests pass with no failures
2. Confirm test output shows all four primitive test files

## Notes
Vitest is already configured in this project (see `src/tokens/mergeTokens.test.ts` for reference). Use the same import patterns. The `src/test-setup.ts` file contains the testing library setup.
