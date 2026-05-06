# Task 002: Heading Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Heading` component — semantic heading levels 1–4. Heading follows the same CSS variable pattern as Text, maps a numeric level to a font size scale, and renders the appropriate HTML heading element.

## Files
- Create: `src/components/Heading.tsx`

## Implementation Steps
1. Create `src/components/Heading.tsx`
2. Define `HeadingProps`:
   ```ts
   type HeadingProps = {
     level?: 1 | 2 | 3 | 4
     children: React.ReactNode
   }
   ```
3. Define an internal level-to-size mapping:
   ```ts
   const sizeMap: Record<1 | 2 | 3 | 4, string> = {
     1: "var(--font-size-xl)",
     2: "var(--font-size-lg)",
     3: "var(--font-size-md)",
     4: "var(--font-size-sm)",
   }
   ```
4. Default `level` to `2` when not provided
5. Render the matching HTML element (`h1`–`h4`) based on `level`
6. Apply inline `style`:
   - `fontSize: sizeMap[level]`
   - `fontWeight: var(--font-weight-bold)`
   - `fontFamily: var(--font-family)`
   - `lineHeight: 1.25`
   - `color: var(--color-text-primary)`
   - `margin: 0`
7. Export both the component and its props type

## Constraints
- Must render the correct semantic HTML element (`h1`, `h2`, `h3`, or `h4`) based on level
- No hardcoded font sizes or weights
- No external CSS classes
- Functional component only

## Acceptance Criteria
- `<Heading level={1}>` renders an `<h1>` element
- `<Heading level={3}>` renders an `<h3>` element
- `<Heading>` with no level defaults to `<h2>`
- Font size maps correctly: level 1 → `var(--font-size-xl)`, level 4 → `var(--font-size-sm)`
- `fontWeight` is always `var(--font-weight-bold)`
- `margin` is always `0`

## Test Steps
1. Render `<Heading level={1}>Title</Heading>` — verify element is `h1` and `style.fontSize === "var(--font-size-xl)"`
2. Render `<Heading level={2}>Title</Heading>` — verify element is `h2` and `style.fontSize === "var(--font-size-lg)"`
3. Render `<Heading level={3}>Title</Heading>` — verify element is `h3` and `style.fontSize === "var(--font-size-md)"`
4. Render `<Heading level={4}>Title</Heading>` — verify element is `h4` and `style.fontSize === "var(--font-size-sm)"`
5. Render `<Heading>Title</Heading>` — verify element defaults to `h2`
6. Verify `style.fontWeight === "var(--font-weight-bold)"` in all cases

## Notes
Heading renders native heading HTML elements for correct document semantics. It does not wrap Text — it follows the same CSS variable pattern directly.
