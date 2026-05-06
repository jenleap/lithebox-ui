# Task 006: Composition Stories

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Create composition stories that combine layout primitives and core components into realistic UI patterns. These are the critical validation layer — they prove the system composes correctly under real-world usage conditions.

## Files
- `src/stories/composition/CardSection.stories.tsx`
- `src/stories/composition/ActionGroup.stories.tsx`
- `src/stories/composition/ContentLayout.stories.tsx`

## Implementation Steps
1. Create `src/stories/composition/CardSection.stories.tsx`:
   - Story title: `'Composition/CardSection'`
   - Stories:
     - `Default`: a `Card` containing `Stack` with `Heading` + `Text` + `Button`
     - `WithDivider`: a `Card` with two content sections separated by a `Divider`
     - `Nested`: a `Stack` of two `Card` components each with heading and text

2. Create `src/stories/composition/ActionGroup.stories.tsx`:
   - Story title: `'Composition/ActionGroup'`
   - Stories:
     - `Default`: a `Row` with `gap="sm"` containing a primary and secondary `Button`
     - `WithLabel`: a `Stack` containing a `Label`, a `Text`, and a `Row` of buttons
     - `InCard`: the `Default` action group rendered inside a `Card`

3. Create `src/stories/composition/ContentLayout.stories.tsx`:
   - Story title: `'Composition/ContentLayout'`
   - Stories:
     - `Default`: a `Container` wrapping a `Stack` with:
       - `Heading`
       - `Text`
       - `Divider`
       - `Row` of `Card` components (2–3 cards side by side)
     - `SingleColumn`: same content in a single-column `Stack` layout

## Constraints
- Every element must use a Lithebox component — no raw HTML tags as story content
- No custom styles on composition wrappers — rely entirely on component and primitive APIs
- Stories must represent patterns that could appear in a real application (no toy demos)
- All spacing must come from token-bound prop values

## Acceptance Criteria
- All 3 story files render without errors
- `ContentLayout/Default` shows a complete page-section layout with working card grid
- `ActionGroup/InCard` shows button group correctly positioned inside card
- `CardSection/WithDivider` shows visually distinct content sections
- No story deviates from the token system

## Test Steps
1. Run `npm run storybook`
2. Navigate to each `Composition/*` story — all must render
3. `ContentLayout/Default`: verify heading, text, divider, and card row all render correctly in sequence
4. `ActionGroup/InCard`: verify buttons are contained within card boundaries with correct spacing
5. Resize viewport — layout should remain stable (no overflow breakage)

## Notes
These stories are the primary evidence that the Lithebox system composes correctly as a whole. If a composition story breaks, it indicates a gap in either the component API or the layout primitive system.
