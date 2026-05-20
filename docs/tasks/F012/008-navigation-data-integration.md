# Task 008: Navigation and Data Display Integration

## Feature
F012 - Accessibility Architecture

## Description
Update Sidebar and Dropdown components with their ARIA contracts. Sidebar must expose the navigation landmark role and indicate active route semantically. Dropdown must expose menu role and use the keyboard navigation hook for arrow-key navigation within items.

## Files
- `src/components/Sidebar.tsx` (modify)
- `src/components/Dropdown.tsx` (modify)

## Implementation Steps

### Sidebar (`src/components/Sidebar.tsx`)

1. Read the existing Sidebar implementation first.
2. Import `SidebarA11yContract` from `../a11y/ariaContracts`
3. Add `role={SidebarA11yContract.role}` (`"navigation"`) and `aria-label="Main navigation"` to the root nav/aside element
4. For each navigation item that can be "active":
   - If the component exposes an `active` or `current` prop per item, add `aria-current="page"` to the active item's element
   - If the component uses a different active indicator, check the current implementation and apply `aria-current="page"` to the correct element

### Dropdown (`src/components/Dropdown.tsx`)

1. Read the existing Dropdown implementation first.
2. Import `DropdownA11yContract` from `../a11y/ariaContracts`
3. Import `useKeyboardNavigation` from `../a11y/useKeyboardNavigation`

4. Add to the trigger button:
   - `aria-haspopup="true"`
   - `aria-expanded={open}`

5. Add to the dropdown menu container:
   - `role={DropdownA11yContract.role}` (`"menu"`)

6. Apply `useKeyboardNavigation` to the dropdown items:
   - `itemCount`: number of items
   - `onSelect(index)`: select the item at that index and close dropdown
   - `onEscape`: close dropdown
   - `loop: true`

7. Apply `getItemProps(index)` to each dropdown item element:
   - Spread the returned `tabIndex`, `aria-selected`, and `onKeyDown` props

8. Add `role="menuitem"` to each item element

## Constraints
- Do not change existing prop APIs or visual behavior
- Do not restructure the Dropdown item list — apply keyboard navigation additively
- `aria-current="page"` must only be applied when the item is active, not all items
- Do not hardcode item count — derive it from the items array length

## Acceptance Criteria
- Sidebar root element has `role="navigation"` and `aria-label="Main navigation"`
- Active sidebar item has `aria-current="page"`
- Dropdown trigger has `aria-haspopup="true"` and `aria-expanded` reflecting open state
- Dropdown menu container has `role="menu"`
- Each dropdown item has `role="menuitem"` and correct `tabIndex`
- Arrow keys navigate dropdown items
- Escape closes dropdown
- Enter/Space selects item
- Existing tests still pass

## Test Steps
1. Render Sidebar — verify `role="navigation"` in DOM
2. Render Sidebar with active item — verify `aria-current="page"` on that item only
3. Render Dropdown open — verify `role="menu"` on menu, `aria-expanded="true"` on trigger
4. Simulate ArrowDown in Dropdown — verify activeIndex advances
5. Simulate Escape in Dropdown — verify dropdown closes
6. Run existing tests

## Notes
Read both components fully before modifying. The Dropdown may already have some open/close keyboard handling — preserve it and extend rather than replace. The Sidebar active state indicator pattern depends on the existing implementation.
