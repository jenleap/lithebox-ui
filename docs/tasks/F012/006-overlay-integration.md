# Task 006: Overlay System Integration

## Feature
F012 - Accessibility Architecture

## Description
Update Modal and Drawer to use the ARIA contract system, focus trap hook, and focus manager. This brings both overlay components into full accessibility compliance: proper roles, focus containment, and focus restoration.

## Files
- `src/components/Modal.tsx` (modify)
- `src/components/Drawer.tsx` (modify)

## Implementation Steps

### Modal (`src/components/Modal.tsx`)

1. Import `useFocusTrap` from `../a11y/useFocusTrap`
2. Import `focusManager` from `../a11y/focusManager`
3. Import `ModalA11yContract` from `../a11y/ariaContracts`

4. On open (`open` transitions to `true`):
   - Call `focusManager.push(surfaceRef.current)` — this saves current focus and moves focus into the modal surface
   - Activate `useFocusTrap(surfaceRef, open)`

5. On close (`open` transitions to `false` or component unmounts):
   - Call `focusManager.pop()` — restores previous focus
   - Deactivate trap (handled by `useFocusTrap` via the `active` flag)

6. Add ARIA attributes to the backdrop/surface elements:
   - Backdrop `<div>`: no role
   - Surface `<div>`: add `role={ModalA11yContract.role}` (`"dialog"`), `aria-modal="true"`, `aria-label` or `aria-labelledby` if a label prop exists

7. Remove the existing manual `surfaceRef.current?.focus()` useEffect — focus is now handled by `focusManager.push`

8. Keep existing Escape key handler (it calls `onClose` which triggers `focusManager.pop` via the open → false transition)

9. The `tabIndex={-1}` on the surface div is still needed for `focusManager.push` to work programmatically.

### Drawer (`src/components/Drawer.tsx`)

Read the existing Drawer implementation first, then apply the same pattern:
1. Add `surfaceRef` if not already present
2. Import and apply `useFocusTrap(surfaceRef, open)`
3. Call `focusManager.push` on open, `focusManager.pop` on close
4. Add `role={DrawerA11yContract.role}` and `aria-modal="true"` to the surface element
5. Keep existing Escape key handler

## Constraints
- Do not change the visual behavior of Modal or Drawer
- Do not change existing prop APIs
- The `focusManager.push` call must happen AFTER the element is rendered (inside a useEffect, when `open` is true)
- Do not call `focusManager.pop` in the same effect that calls `push` — use the cleanup function of the effect or a separate effect watching `open`

## Acceptance Criteria
- Modal renders with `role="dialog"` and `aria-modal="true"`
- Drawer renders with `role="dialog"` and `aria-modal="true"`
- Tab key cannot leave the modal/drawer when open
- When modal/drawer closes, focus returns to the element that triggered it
- Escape still closes modal/drawer
- Existing tests still pass

## Test Steps
1. Open modal — verify `role="dialog"` and `aria-modal="true"` in DOM
2. Tab through all focusable elements — confirm wrap-around
3. Shift+Tab from first element — confirm wrap to last
4. Close modal — confirm focus returns to trigger element
5. Run existing Modal and Drawer tests

## Notes
Drawer may not have a `surfaceRef` yet — add one if missing. The focus restoration relies on `focusManager` having a valid element to restore to, which requires that focus was on a valid element before opening.
