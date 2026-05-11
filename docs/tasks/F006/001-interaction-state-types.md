# Task 001: Interaction State Types

## Feature
F006 — Interaction & State Model System

## Description
Define the core TypeScript types for the global interaction state model. This is the type foundation that all other F006 tasks depend on.

## Files
- `src/interactions/types.ts` (create)
- `src/interactions/index.ts` (create)

## Implementation Steps
1. Create directory `src/interactions/`
2. Create `src/interactions/types.ts` with:
   - `InteractionState` union type: `"idle" | "hover" | "active" | "focus" | "disabled" | "loading"`
   - `InteractionTransition` type representing valid state-to-state transitions
   - `InteractionContract` interface: `{ states: InteractionState[], interactions: Record<string, "allowed" | "system-managed" | "blocked">, transitions: Partial<Record<InteractionState, "terminal" | "interruptible">> }`
   - `StateTokenOverride` interface: `{ opacity?: string, cursor?: string, transform?: string, filter?: string }`
   - `StateTokenMap` type: `Partial<Record<InteractionState, StateTokenOverride>>`
3. Create `src/interactions/index.ts` exporting everything from `types.ts`

## Constraints
- No runtime logic — this file is types only
- No `any` types
- All exports must be named (no default exports)
- Do not import from other project files

## Acceptance Criteria
- `InteractionState` is a strict union of the 6 system states: idle, hover, active, focus, disabled, loading
- `InteractionContract` type is defined and enforces required fields
- `StateTokenMap` type maps states to style overrides
- All types are exported from `src/interactions/index.ts`

## Test Steps
1. Import types in a test file and verify TypeScript accepts valid values
2. Verify `InteractionState` rejects values outside the 6 allowed states
3. Run `npm run build` with no type errors

## Notes
These types are the contract that all F006 runtime code must conform to. Do not add optional utility types beyond what is needed by the implementation tasks.
