# Task 008: Icon Component

## Feature
F003 — Core Primitive Component Library

## Description
Create the `Icon` component — a wrapper for consistent icon rendering. Icon enforces a fixed square size using spacing tokens and centers its children. It has no visual styling and does not know what icon it is rendering.

## Files
- Create: `src/components/Icon.tsx`

## Implementation Steps
1. Create `src/components/Icon.tsx`
2. Define `IconProps`:
   ```ts
   type IconProps = {
     size?: keyof Tokens["spacing"]
     children: React.ReactNode
   }
   ```
3. Default `size` to `"md"` when not provided
4. Render a `<span>` element with inline styles:
   - `display: inline-flex`
   - `alignItems: center`
   - `justifyContent: center`
   - `width: var(--spacing-{size})`
   - `height: var(--spacing-{size})`
   - `flexShrink: 0`
5. Render `children` inside the span
6. Export both the component and its props type

## Constraints
- No visual styling — does not define icon color, stroke, or fill
- Uses spacing tokens for size (not font-size tokens)
- Functional component only

## Acceptance Criteria
- Icon renders a `<span>`
- `size="sm"` → `style.width === "var(--spacing-sm)"` and `style.height === "var(--spacing-sm)"`
- `size="lg"` → `style.width === "var(--spacing-lg)"` and `style.height === "var(--spacing-lg)"`
- No size prop → defaults to `"md"` → `style.width === "var(--spacing-md)"`
- Children are rendered inside the span

## Test Steps
1. Render `<Icon><svg /></Icon>` — verify element is `span`
2. Render `<Icon size="sm">` — verify `style.width === "var(--spacing-sm)"` and `style.height === "var(--spacing-sm)"`
3. Render `<Icon size="lg">` — verify `style.width === "var(--spacing-lg)"`
4. Render `<Icon>` with no size — verify `style.width === "var(--spacing-md)"`
5. Verify children are rendered

## Notes
Icon is intentionally thin. The consumer is responsible for providing an SVG or icon element. Color and styling of the icon itself is left to the icon element or parent context.
