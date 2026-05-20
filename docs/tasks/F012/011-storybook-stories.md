# Task 011: Storybook Stories

## Feature
F012 - Accessibility Architecture

## Description
Create Storybook stories that demonstrate the accessibility architecture in action. Stories should showcase focus trapping in overlays, keyboard navigation in Dropdown, and ARIA state model output. These serve as both documentation and manual verification.

## Files
- `src/stories/a11y/FocusTrap.stories.tsx` (create)
- `src/stories/a11y/KeyboardNavigation.stories.tsx` (create)
- `src/stories/a11y/AriaContracts.stories.tsx` (create)
- `src/stories/a11y/A11yStateModel.stories.tsx` (create)

## Implementation Steps

### `FocusTrap.stories.tsx`

1. Story: `ModalFocusTrap`
   - Renders a button that opens a Modal
   - Modal contains 3 focusable elements: an input, a button (primary), and a close button
   - Description: "Tab key is contained within the modal. Shift+Tab wraps from first to last."

2. Story: `DrawerFocusTrap`
   - Same pattern with Drawer

### `KeyboardNavigation.stories.tsx`

1. Story: `DropdownKeyboardNav`
   - Renders a Dropdown with 4 items
   - Description: "ArrowDown/Up navigate items. Enter selects. Escape closes."

2. Story: `StandaloneKeyboardNav`
   - Uses `useKeyboardNavigation` directly on a list of 5 items rendered as `<div role="menuitem">` elements
   - Shows activeIndex visually (highlight active item)
   - Description: "Demonstrates useKeyboardNavigation hook in isolation."

### `AriaContracts.stories.tsx`

1. Story: `ContractTable`
   - Renders a table of all ARIA contracts with columns: Component, Role, Key Attributes
   - Data sourced by importing all contracts from `src/a11y/ariaContracts`
   - Purely informational — no interactive elements

### `A11yStateModel.stories.tsx`

1. Story: `StateResolution`
   - Renders 4 Input instances: one normal, one disabled, one in error state, one loading
   - Each shows the resolved ARIA props output beneath it (via `JSON.stringify(resolveA11yState(...))`)
   - Description: "Shows how accessibility state maps to ARIA attributes."

## Constraints
- Use existing component imports from `src/components`
- Use existing story patterns (check nearby story files for metadata format)
- Stories are for manual visual/keyboard testing — keep them simple and focused
- Do not create wrapper components in story files — use inline composition

## Acceptance Criteria
- All 4 story files render without errors in Storybook
- `FocusTrap` stories demonstrate focus containment (manually verified)
- `KeyboardNavigation` stories allow arrow-key navigation (manually verified)
- `AriaContracts` story renders a table of all 14 contracts
- `A11yStateModel` story shows all 4 input states with their resolved ARIA props

## Test Steps
1. Run `npm run storybook`
2. Navigate to each new story group
3. Verify no console errors
4. Manually test focus trap with keyboard in FocusTrap stories
5. Manually test arrow keys in KeyboardNavigation stories

## Notes
Check an existing story file (e.g., `src/stories/components/Button.stories.tsx`) to match the metadata format (title, component, args, etc.). Use the same CSF3 format.
