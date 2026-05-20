# Task 003: Focus Trap Hook

## Feature
F012 - Accessibility Architecture

## Description
Implement a `useFocusTrap` hook that constrains keyboard focus within a container element. Used by Modal and Drawer to prevent focus from escaping the overlay while it is open.

## Files
- `src/a11y/useFocusTrap.ts` (create)

## Implementation Steps

1. Create `src/a11y/useFocusTrap.ts` exporting `useFocusTrap`:
   - Signature: `useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean): void`
   - When `active` is `true`:
     - Add a `keydown` event listener to `document`
     - On `Tab` key: collect all focusable elements within `containerRef.current`
     - If shift+Tab and focus is on first focusable element → wrap to last
     - If Tab and focus is on last focusable element → wrap to first
     - Prevent default on wrap
   - When `active` is `false`: remove the event listener
   - Clean up listener on unmount

2. Focusable element selector to use:
   ```
   'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
   ```

3. Use `useEffect` with `[active]` dependency to attach/detach listener.

## Constraints
- No external dependencies
- Must handle empty focusable list gracefully (do nothing if no focusable elements found)
- Only call `e.preventDefault()` when wrapping — do not block normal tab navigation within the container
- Do not move initial focus — that is the responsibility of the component using this hook

## Acceptance Criteria
- When `active=true`, Tab cycles only within container
- When `active=true`, Shift+Tab cycles only within container
- When `active=false`, no listener is attached
- Cleanup is performed on unmount and when `active` changes from `true` to `false`
- TypeScript compiles with no errors

## Test Steps
1. Render a container with 3 focusable elements, activate the trap
2. Simulate Tab from last element — first element receives focus
3. Simulate Shift+Tab from first element — last element receives focus
4. Deactivate trap — Tab behaves normally

## Notes
This hook is used by Modal (task 006) and Drawer (task 006). It does not handle focus restoration — that is the responsibility of the focus manager (task 002).
