# Task 001: Runtime Types

## Feature
F016 - Application Runtime Integration Layer

## Description
Define all TypeScript types that form the foundation of the F016 runtime system. Includes `LitheboxRuntimeConfig`, `RuntimeEnvironment`, and `RuntimeContextValue`. These types are the contract for the entire runtime layer.

## Files
- `src/runtime/types.ts` (create)

## Implementation Steps

1. Create the directory `src/runtime/` if it does not exist.

2. Create `src/runtime/types.ts` and define the following types exactly:

   ```ts
   export type LitheboxRuntimeConfig = {
     motion?: {
       reducedMotion?: boolean
     }
     responsive?: {
       defaultBreakpoint?: string
     }
     accessibility?: {
       focusVisibleMode?: "auto" | "always"
     }
     overlays?: {
       portalRootId?: string
     }
   }

   export type RuntimeEnvironment = {
     isBrowser: boolean
     supportsReducedMotion: boolean
     supportsHover: boolean
     supportsPointer: boolean
   }

   export type RuntimeContextValue = {
     config: LitheboxRuntimeConfig
     environment: RuntimeEnvironment
   }
   ```

## Constraints
- No `any` types
- All types must be named exports (no `export default`)
- No React imports — this file is pure TypeScript
- Do not import from component files

## Acceptance Criteria
- `src/runtime/types.ts` exists and exports exactly: `LitheboxRuntimeConfig`, `RuntimeEnvironment`, `RuntimeContextValue`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `LitheboxRuntimeConfig` in a consuming file and confirm all fields are optional

## Notes
These types are the schema contract for the runtime system. All downstream runtime tasks import from this file.
