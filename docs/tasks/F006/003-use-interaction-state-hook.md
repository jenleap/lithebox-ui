# Task 003: useInteractionState Hook

## Feature
F006 — Interaction & State Model System

## Description
Implement the `useInteractionState` hook that manages state transitions, enforces the valid state lifecycle, and returns the current state along with event handlers and resolved styles. This is the primary runtime integration point for components.

## Files
- `src/interactions/useInteractionState.ts` (create)
- `src/interactions/index.ts` (update)

## Implementation Steps
1. Create `src/interactions/useInteractionState.ts`
2. Define hook signature:
   ```ts
   type UseInteractionStateOptions = {
     disabled?: boolean
     loading?: boolean
     contract?: InteractionContract
   }
   type UseInteractionStateResult = {
     state: InteractionState
     interactionProps: Pick<React.HTMLAttributes<HTMLElement>, "onMouseEnter" | "onMouseLeave" | "onMouseDown" | "onMouseUp" | "onFocus" | "onBlur">
     stateStyles: React.CSSProperties
   }
   function useInteractionState(options?: UseInteractionStateOptions): UseInteractionStateResult
   ```
3. Implement state logic:
   - Initial state is `"idle"`
   - If `disabled === true`, state is locked to `"disabled"` (terminal — no transitions allowed)
   - If `loading === true`, state is locked to `"loading"` (no other transitions while loading)
   - `onMouseEnter` → transition to `"hover"` (if not disabled/loading)
   - `onMouseLeave` → transition to `"idle"` (if not disabled/loading)
   - `onMouseDown` → transition to `"active"` (if not disabled/loading)
   - `onMouseUp` → transition back to `"hover"` (if not disabled/loading)
   - `onFocus` → transition to `"focus"` (if not disabled/loading)
   - `onBlur` → transition to `"idle"` (if not disabled/loading)
4. Call `resolveStateStyles(state)` from task 002 and return as `stateStyles`
5. In development mode (`process.env.NODE_ENV === "development"`), warn via `console.warn` if a contract is provided and the current state is not listed in `contract.states`
6. Export `useInteractionState` from `src/interactions/index.ts`

## Constraints
- Use `useState` and `useCallback` from React — no external state libraries
- No direct DOM manipulation
- Disabled and loading states must be truly terminal (set from options, not from event handlers)
- Dev-mode warnings only — no runtime throws for invalid states
- Do not import from `src/components` or `src/contracts` — only from `src/interactions`

## Acceptance Criteria
- Passing `disabled: true` locks state to `"disabled"` regardless of mouse events
- Passing `loading: true` locks state to `"loading"` regardless of mouse events
- Mouse enter/leave/down/up correctly transition state for active elements
- `stateStyles` always reflects the current state
- Dev warning fires when current state is not in contract.states
- Hook is exported from `src/interactions/index.ts`

## Test Steps
1. Render a test component using the hook with `disabled: true` — verify state stays `"disabled"` on hover
2. Render a test component with `loading: true` — verify state stays `"loading"`
3. Simulate mouseenter/mouseleave on an idle component — verify state cycles correctly
4. Run `npm test` — all tests pass

## Notes
The hook returns `interactionProps` as a spread-ready object. Components apply it with `{...interactionProps}` on their root element. This avoids tight coupling between the hook and specific HTML elements.
