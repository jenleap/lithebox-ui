# Task 011: Storybook Stories

## Feature
F013 - Motion & Animation Layer

## Description
Create Storybook stories that demonstrate the motion system in action. Stories cover the token inspector, enter/exit primitives, and all integrated component animations (overlays, feedback, page transitions).

## Files
- `src/stories/motion/MotionTokens.stories.tsx` (create)
- `src/stories/motion/MotionPrimitives.stories.tsx` (create)
- `src/stories/motion/PageTransition.stories.tsx` (create)

## Implementation Steps

### MotionTokens.stories.tsx

1. Create a story titled `"Motion / Tokens"`.
2. Display a table of all duration tokens (fast, normal, slow) and easing tokens as labeled rows.
3. For each duration token, render an animated box that uses `useMotionTransition` with a toggle to trigger the animation.
4. Include a "Reduced Motion" section that shows what the system produces when reduced motion is active (use a manual override prop for demonstration).

### MotionPrimitives.stories.tsx

1. Create a story titled `"Motion / Primitives"`.
2. Include the following stories:
   - `EnterAndExit` — a box that can be toggled open/closed using `EnterPrimitive`/`ExitPrimitive`, controlled by a `useState` toggle button
   - `SlideInLeft` — demonstrates `SlideInLeftPrimitive` / `SlideOutLeftPrimitive`
   - `FadeOnly` — demonstrates `FadeInPrimitive` / `FadeOutPrimitive`
3. Each story has a "Toggle" button that switches `active` state.
4. Apply the styles from `useMotionTransition` onto the animated element.
5. Show the resolved CSS `transition` string in a code block below the animated element.

### PageTransition.stories.tsx

1. Create a story titled `"Motion / Page Transition"`.
2. Include:
   - `Default` — renders `<PageTransition active={true}>` wrapping a sample content block
   - `Inactive` — renders `<PageTransition active={false}>` — content is faded out
   - `Toggle` — a controlled story with a toggle button that switches between `active` and `inactive` states, demonstrating the actual transition animation

## Constraints
- Stories must compile and render in Storybook without errors
- Do not create stories for overlay motion (the existing Modal, Drawer, Dropdown stories already cover this — they will naturally show motion after Task 006)
- No hardcoded timing values in stories
- Stories should be self-contained with minimal boilerplate

## Acceptance Criteria
- 3 new story files created
- Each file compiles without TypeScript errors
- Stories are visible and functional in Storybook
- Toggle animations are visible and respect the motion tokens
- No hardcoded timing values in story files

## Test Steps
1. Run `npm run storybook` and verify all 3 new story groups appear
2. Toggle the `EnterAndExit` story — verify animation plays
3. Verify "Reduced Motion" section in `MotionTokens` story shows `transition: "none"`

## Notes
Stories in other feature groups (Overlays, Feedback) will automatically demonstrate motion after Tasks 006 and 007 are complete — no changes to those story files are needed.
