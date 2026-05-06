# Task 005: Component Stories

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Create stories for all core components from F003: `Text`, `Heading`, `Label`, `Card`, `Surface`, `Divider`, `Button`, and `Icon`. Each component must demonstrate its default state, variant range, and composition readiness.

## Files
- `src/stories/components/Text.stories.tsx`
- `src/stories/components/Heading.stories.tsx`
- `src/stories/components/Label.stories.tsx`
- `src/stories/components/Card.stories.tsx`
- `src/stories/components/Surface.stories.tsx`
- `src/stories/components/Divider.stories.tsx`
- `src/stories/components/Button.stories.tsx`
- `src/stories/components/Icon.stories.tsx`

## Implementation Steps
1. `Text.stories.tsx` — title: `'Components/Text'`
   - `Default`: body text, default props
   - `Sizes`: stack of Text at each supported size prop
   - `Muted`: muted color variant (if supported)

2. `Heading.stories.tsx` — title: `'Components/Heading'`
   - `Default`: h1 equivalent
   - `AllLevels`: Stack of h1–h4 equivalents

3. `Label.stories.tsx` — title: `'Components/Label'`
   - `Default`: standard label
   - `Uppercase`: uppercase variant (if supported)

4. `Card.stories.tsx` — title: `'Components/Card'`
   - `Default`: card with a `Stack` of `Heading` + `Text` inside
   - `WithPadding`: explicit padding variant
   - `WithDivider`: card containing a `Divider` between sections

5. `Surface.stories.tsx` — title: `'Components/Surface'`
   - `Default`: surface with a `Text` child
   - `Elevated`: elevated variant (if supported)

6. `Divider.stories.tsx` — title: `'Components/Divider'`
   - `Default`: horizontal divider between two `Text` elements
   - `WithinCard`: divider inside a `Card`

7. `Button.stories.tsx` — title: `'Components/Button'`
   - `Default`: primary button
   - `Variants`: Stack of all supported variants (primary, secondary, ghost, etc.)
   - `Sizes`: Stack of all supported size props
   - `Disabled`: disabled state

8. `Icon.stories.tsx` — title: `'Components/Icon'`
   - `Default`: icon with a placeholder/test icon
   - `Sizes`: icon at different size props

## Constraints
- Every story must use only the component's public API — no internal prop access
- Variant stories must only use prop values defined in the component's TypeScript types
- No `style` prop overrides that bypass token system
- All layout in stories (wrapping stacks, rows) must use layout primitives

## Acceptance Criteria
- All 8 story files render without TypeScript errors
- Each component's full prop surface (variants, sizes) is exercised across stories
- No story imports from internal component files (only from `src/index.ts`)
- Stories reflect real usage patterns (not stress-test edge cases)

## Test Steps
1. Run `npm run storybook`
2. Navigate to each `Components/*` story — all must render
3. Open `Button/Variants` — all variant options must be visually distinct
4. Open `Card/WithDivider` — verify `Divider` renders correctly inside `Card`
5. Run `npm run lint` — no TypeScript errors

## Notes
Import all components from `../../index` (the public API), not from individual component files. This validates that the public API exports are correct.
