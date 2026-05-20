# Task 010: Unit Tests

## Feature
F012 - Accessibility Architecture

## Description
Write unit tests for the core a11y utilities: ARIA contracts, focus manager, accessibility state resolver, and keyboard navigation hook. Tests must cover the behavior guarantees defined in the feature spec.

## Files
- `src/a11y/ariaContracts.test.ts` (create)
- `src/a11y/focusManager.test.ts` (create)
- `src/a11y/resolveA11yState.test.ts` (create)
- `src/a11y/useKeyboardNavigation.test.ts` (create)
- `src/a11y/useFocusTrap.test.ts` (create)

## Implementation Steps

### `ariaContracts.test.ts`
1. Test that each exported contract has a `role` property
2. Test that `ButtonA11yContract.role === "button"`
3. Test that `ModalA11yContract.role === "dialog"` and `ModalA11yContract.attributes["aria-modal"] === "true"`
4. Test that `SidebarA11yContract.role === "navigation"`
5. Test that `ToastA11yContract.attributes["aria-live"] === "polite"`

### `focusManager.test.ts`
1. Mock `document.activeElement` and element `.focus()` method
2. Test `push`: after push, `getCurrent()` returns the pushed element
3. Test `pop`: after push then pop, `getCurrent()` returns null
4. Test multiple pushes: `getCurrent()` returns the most recently pushed element
5. Test `pop` on empty stack: does not throw

### `resolveA11yState.test.ts`
1. `resolveA11yState({})` returns `{}`
2. `resolveA11yState({ disabled: true })` returns `{ "aria-disabled": true, tabIndex: -1 }`
3. `resolveA11yState({ loading: true })` returns `{ "aria-busy": true, tabIndex: -1 }`
4. `resolveA11yState({ error: true })` returns `{ "aria-invalid": true }`
5. `resolveA11yState({ readOnly: true })` returns `{ "aria-readonly": true }`
6. `resolveA11yState({ disabled: true, error: true })` returns combined result

### `useKeyboardNavigation.test.ts`
Use `renderHook` from `@testing-library/react`:
1. Initial `activeIndex` is 0
2. ArrowDown event on item at index 0 → `activeIndex` becomes 1
3. ArrowUp at index 0 with `loop=false` → stays at 0
4. ArrowUp at index 0 with `loop=true` → wraps to `itemCount - 1`
5. Enter calls `onSelect` with current activeIndex
6. Escape calls `onEscape`
7. `getItemProps(0)` returns `tabIndex: 0` when activeIndex is 0
8. `getItemProps(1)` returns `tabIndex: -1` when activeIndex is 0

### `useFocusTrap.test.ts`
Use `renderHook` + DOM manipulation:
1. When `active=false`, no keydown listener is added
2. When `active=true`, Tab on last focusable element wraps to first
3. When `active=true`, Shift+Tab on first focusable element wraps to last
4. When `active` transitions from `true` to `false`, listener is removed

## Constraints
- Use Vitest and `@testing-library/react` (existing test setup)
- Do not test implementation details — test behavior
- Mock DOM methods where needed (`jsdom` is available via test setup)
- Each test file tests exactly one module

## Acceptance Criteria
- All tests pass: `npm run test`
- Test coverage includes all major behaviors listed above
- No test imports implementation details (no testing internal variables)

## Test Steps
1. Run `npm run test -- src/a11y` to execute only a11y tests
2. All tests green
3. No TypeScript errors in test files

## Notes
Check `src/test-setup.ts` for existing test configuration. Look at existing test files (e.g., `src/feedback/notificationManager.test.ts`) to match the existing test patterns.
