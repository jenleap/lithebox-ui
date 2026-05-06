# Task 001: Text Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Text` component — the base typography rendering unit. Text applies font size, weight, color, and font family via CSS variables. It is the foundation for Heading and Label.

## Files
- Create: `src/components/Text.tsx`

## Implementation Steps
1. Create the directory `src/components/`
2. Create `src/components/Text.tsx`
3. Define `TextProps`:
   ```ts
   type TextProps = {
     size?: keyof Tokens["typography"]["size"]
     weight?: keyof Tokens["typography"]["weight"]
     color?: keyof Tokens["color"]["text"]
     children: React.ReactNode
   }
   ```
4. Render a `<span>` with a `style` object that maps props to CSS variables:
   - `size` → `fontSize: var(--font-size-{size})`
   - `weight` → `fontWeight: var(--font-weight-{weight})`
   - `color` → `color: var(--color-text-{color})`
   - Always apply `fontFamily: var(--font-family)` and `lineHeight: 1.5`
5. Only include size, weight, and color style keys when the prop is defined
6. Export both the component and its props type

## Constraints
- No hardcoded font sizes, weights, or colors — only CSS variable references
- Must use `keyof Tokens["typography"]["size"]`, `keyof Tokens["typography"]["weight"]`, and `keyof Tokens["color"]["text"]` from `src/tokens/types.ts`
- No Tailwind or external CSS classes
- Functional component only
- No default values for size, weight, or color props

## Acceptance Criteria
- Text renders a `<span>` with correct inline style entries when props are provided
- `size="md"` → `style.fontSize === "var(--font-size-md)"`
- `weight="bold"` → `style.fontWeight === "var(--font-weight-bold)"`
- `color="secondary"` → `style.color === "var(--color-text-secondary)"`
- `fontFamily` and `lineHeight` are always present in the style object
- Omitted props produce no extra style keys

## Test Steps
1. Render `<Text size="md">Hello</Text>` — verify `style.fontSize === "var(--font-size-md)"`
2. Render `<Text weight="bold">Hello</Text>` — verify `style.fontWeight === "var(--font-weight-bold)"`
3. Render `<Text color="secondary">Hello</Text>` — verify `style.color === "var(--color-text-secondary)"`
4. Render `<Text>Hello</Text>` with no optional props — verify no fontSize, fontWeight, or color keys in style
5. Render any Text — verify `style.fontFamily === "var(--font-family)"` and `style.lineHeight === 1.5`

## Notes
Text is the foundation for Heading and Label. CSS variable names follow the pattern from `src/tokens/tokensToCSSVariables.ts`: `--font-size-{key}`, `--font-weight-{key}`, `--color-text-{key}`, `--font-family`.
