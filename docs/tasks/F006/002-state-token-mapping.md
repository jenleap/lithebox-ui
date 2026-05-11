# Task 002: State → Token Mapping System

## Feature
F006 — Interaction & State Model System

## Description
Implement the system that maps each interaction state to a set of CSS style overrides. This is the bridge between interaction state and visual output, keeping all styling token-driven and declarative.

## Files
- `src/interactions/stateTokenMap.ts` (create)
- `src/interactions/index.ts` (update)

## Implementation Steps
1. Create `src/interactions/stateTokenMap.ts`
2. Define `DEFAULT_STATE_TOKEN_MAP` as the base `StateTokenMap` (imported from `types.ts`):
   ```ts
   idle:     {} // no overrides
   hover:    { filter: "brightness(1.08)" }
   active:   { transform: "scale(0.98)", filter: "brightness(0.95)" }
   focus:    {} // handled via CSS outline; no token overrides
   disabled: { opacity: "0.5", cursor: "not-allowed", filter: "none" }
   loading:  { opacity: "0.7", cursor: "progress" }
   ```
3. Implement `resolveStateStyles(state: InteractionState, overrides?: StateTokenMap): React.CSSProperties`:
   - Merges `DEFAULT_STATE_TOKEN_MAP[state]` with any component-level overrides
   - Returns a `React.CSSProperties` object ready for inline style application
4. Export `DEFAULT_STATE_TOKEN_MAP` and `resolveStateStyles` from `src/interactions/index.ts`

## Constraints
- No direct CSS-in-JS or styled-components — return plain `React.CSSProperties`
- No hardcoded color values — only structural overrides (opacity, cursor, transform, filter)
- Color-based state styling belongs in individual component token contracts, not here
- Keep the function pure (no side effects)

## Acceptance Criteria
- `resolveStateStyles("disabled")` returns `{ opacity: "0.5", cursor: "not-allowed", filter: "none" }`
- `resolveStateStyles("loading")` returns `{ opacity: "0.7", cursor: "progress" }`
- `resolveStateStyles("idle")` returns `{}`
- Component-level overrides merge correctly on top of defaults
- All exports available via `src/interactions/index.ts`

## Test Steps
1. Import `resolveStateStyles` and call it for each of the 6 states
2. Verify disabled and loading return expected CSS properties
3. Verify component-level overrides win when both define the same property
4. Run `npm run build` with no errors

## Notes
This function will be called inside `useInteractionState` (task 003) and directly by components that apply state styles. Keep it simple — it is not a token resolver, it produces final style values only.
