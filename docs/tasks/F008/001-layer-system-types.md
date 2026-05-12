# Task 001: Layer System Types & Z-Index Constants

## Feature
F008 — Navigation & Overlay System

## Description
Establish the foundational type definitions and z-index constants for the layer management system. This creates the shared vocabulary all overlay and navigation components will use for deterministic layering.

## Files
- `src/layers/types.ts` (create)
- `src/layers/layerStack.ts` (create)
- `src/layers/index.ts` (create)

## Implementation Steps
1. Create `src/layers/types.ts`:
   ```ts
   export type LayerLevel = "base" | "dropdown" | "drawer" | "modal" | "critical"

   export type VisibilityState = "hidden" | "visible" | "transitioning"

   export type OverlayLifecycleState = "closed" | "opening" | "open" | "closing"

   export type OverlayEntry = {
     id: string
     layer: LayerLevel
   }
   ```

2. Create `src/layers/layerStack.ts`:
   ```ts
   import type { LayerLevel } from "./types"

   export const LAYER_Z_INDEX: Record<LayerLevel, number> = {
     base: 0,
     dropdown: 100,
     drawer: 200,
     modal: 300,
     critical: 400,
   } as const
   ```

3. Create `src/layers/index.ts`:
   ```ts
   export type { LayerLevel, VisibilityState, OverlayLifecycleState, OverlayEntry } from "./types"
   export { LAYER_Z_INDEX } from "./layerStack"
   ```

## Constraints
- No component code in this task — types and constants only
- z-index values must be used exclusively via `LAYER_Z_INDEX` — no hardcoded integers elsewhere
- Do not add `any` types
- `OverlayEntry` is the internal registry shape — not a public API type yet

## Acceptance Criteria
- `LayerLevel`, `VisibilityState`, `OverlayLifecycleState`, `OverlayEntry` types are defined and exported
- `LAYER_Z_INDEX` maps every `LayerLevel` to a numeric z-index
- `src/layers/index.ts` re-exports everything cleanly
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify `LAYER_Z_INDEX.modal > LAYER_Z_INDEX.drawer > LAYER_Z_INDEX.dropdown > LAYER_Z_INDEX.base`

## Notes
This is the only task that defines the layer system primitives. All overlay components in subsequent tasks depend on these types and constants.
