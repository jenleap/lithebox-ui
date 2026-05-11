# Task 006: Storybook Interaction State Stories

## Feature
F006 — Interaction & State Model System

## Description
Add Storybook stories that simulate all interaction states for Button and Card. Stories must provide a state toggler control, live state preview, and display which token overrides are active for the selected state.

## Files
- `src/stories/interactions/InteractionStates.stories.tsx` (create)
- `src/stories/components/Button.stories.tsx` (update — add interaction state stories)

## Implementation Steps
1. Create `src/stories/interactions/InteractionStates.stories.tsx`:
   - Story: `ButtonAllStates` — renders all 6 Button states side by side (idle, hover, active, focus, disabled, loading) using a static `style` prop approach for snapshot-like rendering
   - Story: `LiveStateSimulator` — renders a single Button with an `argType` control for `state` (select from the 6 options). The story passes the selected state as a forced override by setting the `disabled` or `loading` props accordingly:
     - state "disabled" → `disabled={true}`
     - state "loading" → `loading={true}`
     - state "idle" / "hover" / "active" / "focus" → render normally (user interacts to see)
   - Story: `StateTokenOverrideTable` — renders a plain HTML table listing each state and its corresponding `StateTokenOverride` values from `DEFAULT_STATE_TOKEN_MAP`
   - Story: `InteractiveCard` — renders a Card with `interactive` prop and a description showing hover/active states

2. Update `src/stories/components/Button.stories.tsx`:
   - Add story: `Disabled` — `<Button disabled>Disabled</Button>`
   - Add story: `Loading` — `<Button loading>Saving...</Button>`
   - Add story: `AllVariantsDisabled` — renders primary, secondary, ghost all with `disabled`

## Constraints
- Do not introduce new Storybook addons or packages
- Use existing `argTypes` pattern from other stories in the project
- The `StateTokenOverrideTable` must read from `DEFAULT_STATE_TOKEN_MAP` directly — no hardcoded values in the story
- Do not duplicate stories already defined in other files

## Acceptance Criteria
- `ButtonAllStates` story renders 6 buttons, one per state, visually distinct
- `Disabled` story shows button with opacity 0.5 and not-allowed cursor in Storybook
- `Loading` story shows button with opacity 0.7 and progress cursor
- `StateTokenOverrideTable` renders correctly with data from `DEFAULT_STATE_TOKEN_MAP`
- `InteractiveCard` story shows card with pointer cursor and hover effect
- `npm run storybook` starts without errors

## Test Steps
1. Run `npm run storybook` and navigate to Interactions/
2. Verify `ButtonAllStates` renders all 6 states
3. Verify `Disabled` story shows correct visual treatment
4. Verify `StateTokenOverrideTable` shows correct data
5. Verify `InteractiveCard` responds to hover

## Notes
For the `ButtonAllStates` story, use a flex row layout with labels. The hover/active/focus states are shown by forcing the visual style (applying `resolveStateStyles` directly to a wrapper or using the `style` prop) — since these states are normally triggered by user interaction, static simulation ensures they display in Storybook without requiring user action.
