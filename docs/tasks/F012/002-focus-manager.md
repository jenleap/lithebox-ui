# Task 002: Focus Manager

## Feature
F012 - Accessibility Architecture

## Description
Implement a centralized focus manager that tracks the active focus target, manages focus transitions, and handles focus restoration when overlays close. This is a singleton-based system exposed via a React hook.

## Files
- `src/a11y/focusManager.ts` (create)
- `src/a11y/useFocusManager.ts` (create)

## Implementation Steps

1. Create `src/a11y/focusManager.ts` as a module-level singleton:
   - Maintain a private stack of `HTMLElement | null` entries (`focusStack: (HTMLElement | null)[]`)
   - Export `focusManager` object with:
     - `push(el: HTMLElement | null): void` — push element onto the stack (save current focus owner)
     - `pop(): void` — pop top of stack and restore focus to previous element
     - `getCurrent(): HTMLElement | null` — return top of stack
     - `peek(): HTMLElement | null` — return second-from-top (previous owner)
   - `push` should store `document.activeElement as HTMLElement` before pushing `el`, then call `el?.focus()`
   - `pop` should remove top entry and call `.focus()` on the new top if it exists in the DOM

2. Create `src/a11y/useFocusManager.ts` exporting a `useFocusManager` hook:
   - Returns `{ push, pop, getCurrent }` from the singleton `focusManager`
   - No internal state — purely wraps the singleton

## Constraints
- `focusManager` is a module-level singleton (not React state)
- No React imports in `focusManager.ts`
- `useFocusManager.ts` may import React for the hook wrapper
- Focus only elements that are in the DOM (`document.contains(el)` check before calling `.focus()`)
- Stack must never go below empty

## Acceptance Criteria
- `focusManager.push(el)` saves previous focus and moves focus to `el`
- `focusManager.pop()` restores focus to the element before `push` was called
- `useFocusManager()` returns stable references to push/pop/getCurrent
- TypeScript compiles with no errors

## Test Steps
1. In a test: call `push(el)` verify `getCurrent()` returns `el`
2. Call `pop()` verify `getCurrent()` returns null (empty stack)
3. Stack with multiple pushes and pops resolves correctly

## Notes
The focus manager is designed to work with the overlay system — overlays call `push` on open and `pop` on close.
