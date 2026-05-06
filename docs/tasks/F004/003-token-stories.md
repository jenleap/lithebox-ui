# Task 003: Token Visualization Stories

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Create stories that visualize the design token system at runtime. These stories validate that tokens resolve correctly into CSS variables and render expected visual output.

## Files
- `src/stories/tokens/Colors.stories.tsx`
- `src/stories/tokens/Spacing.stories.tsx`
- `src/stories/tokens/Typography.stories.tsx`
- `src/stories/tokens/Radius.stories.tsx`

## Implementation Steps
1. Create `src/stories/tokens/Colors.stories.tsx`:
   - Import `defaultTokens` from `../../tokens/defaultTokens`
   - Render a swatch grid for each color token using `var(--color-*)` CSS variables
   - Each swatch: a `Box` (from layout primitives) with `style={{ background: 'var(--color-primary)' }}` etc.
   - Label each swatch with the token name using `Label`
   - Story title: `'Tokens/Colors'`

2. Create `src/stories/tokens/Spacing.stories.tsx`:
   - Render a visual spacing scale using horizontal bars
   - Each bar's width is set to the spacing token CSS variable: `var(--spacing-xs)`, `var(--spacing-sm)`, etc.
   - Label each bar with its token name and resolved pixel value
   - Story title: `'Tokens/Spacing'`

3. Create `src/stories/tokens/Typography.stories.tsx`:
   - Render each font size token as a sample text string ("The quick brown fox...")
   - Use `Text` and `Heading` components, styled via their size/variant props that map to tokens
   - Story title: `'Tokens/Typography'`

4. Create `src/stories/tokens/Radius.stories.tsx`:
   - Render squares with each radius token applied via `var(--radius-*)` CSS variable
   - Label each shape with its token name
   - Story title: `'Tokens/Radius'`

## Constraints
- All stories must use layout primitives (`Box`, `Stack`) for layout — no raw `div` with inline style layout
- Colors must come from CSS variables, not hardcoded hex values
- Do not import raw token values to inline styles — reference CSS variables only
- No story may bypass the token system

## Acceptance Criteria
- All four story files render without errors in Storybook
- Color swatches visually reflect the `defaultTokens` color palette
- Spacing bars scale proportionally per the spacing token scale
- Typography story renders text at distinct visual sizes matching token scale
- Radius story shows visible border-radius differences

## Test Steps
1. Run `npm run storybook`
2. Navigate to `Tokens/Colors` — confirm swatch grid renders with correct colors
3. Navigate to `Tokens/Spacing` — confirm bars scale correctly
4. Navigate to `Tokens/Typography` — confirm text size scale is visible
5. Navigate to `Tokens/Radius` — confirm radius variations are visible

## Notes
These stories are validation tools, not documentation. Keep them functional and clear, not decorative.
