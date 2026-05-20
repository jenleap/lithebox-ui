# Task 004: Keyboard Navigation Hook

## Feature
F012 - Accessibility Architecture

## Description
Implement a `useKeyboardNavigation` hook that provides arrow-key navigation for structured components such as lists, menus, and dropdowns. Standardizes Enter/Space activation and Escape dismissal.

## Files
- `src/a11y/useKeyboardNavigation.ts` (create)

## Implementation Steps

1. Create `src/a11y/useKeyboardNavigation.ts` exporting `useKeyboardNavigation`:

   Signature:
   ```ts
   useKeyboardNavigation(options: {
     itemCount: number
     onSelect: (index: number) => void
     onEscape?: () => void
     loop?: boolean
   }): {
     activeIndex: number
     setActiveIndex: (index: number) => void
     getItemProps: (index: number) => {
       tabIndex: number
       "aria-selected": boolean
       onKeyDown: (e: React.KeyboardEvent) => void
     }
   }
   ```

2. Internal state:
   - `activeIndex: number` (useState, starts at 0)

3. Key handling in `getItemProps(index).onKeyDown`:
   - `ArrowDown`: increment activeIndex (with loop if `loop=true`, else clamp)
   - `ArrowUp`: decrement activeIndex (with loop if `loop=true`, else clamp)
   - `Enter` or `Space`: call `onSelect(activeIndex)`, `e.preventDefault()`
   - `Escape`: call `onEscape?.()`, `e.preventDefault()`

4. `getItemProps` returns:
   - `tabIndex`: `0` if index === activeIndex, `-1` otherwise (roving tabindex pattern)
   - `"aria-selected"`: `index === activeIndex`
   - `onKeyDown`: the handler above

5. Loop behavior: when `loop=true` and at last item pressing ArrowDown wraps to 0; at first item pressing ArrowUp wraps to last item. When `loop=false`, clamp to `[0, itemCount - 1]`.

## Constraints
- No external dependencies
- `activeIndex` must always be in range `[0, itemCount - 1]`
- Do not auto-move DOM focus — callers use the `activeIndex` to focus items (via refs)
- Use `React.useState` and `React.useCallback` properly

## Acceptance Criteria
- ArrowDown/Up navigate within bounds
- Loop wraps correctly when `loop=true`
- Enter/Space call `onSelect` with correct index
- Escape calls `onEscape`
- `getItemProps` returns correct `tabIndex` and `aria-selected` per index
- TypeScript compiles with no errors

## Test Steps
1. Initialize with `itemCount=3`, activeIndex starts at 0
2. ArrowDown twice → activeIndex is 2
3. ArrowDown again with `loop=true` → activeIndex is 0
4. ArrowDown again with `loop=false` → activeIndex stays at 2
5. Enter → onSelect called with current activeIndex
6. Escape → onEscape called

## Notes
This hook is used by Dropdown (and future Menu/Select components) for arrow-key navigation within the item list.
