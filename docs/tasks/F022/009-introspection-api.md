# Task 009: Introspection API

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the public introspection API: `getIntrospectionSnapshot()` for imperative use and `useIntrospection()` React hook for component-level access. Both are environment-gated — they return an empty snapshot in production.

## Files
- `src/diagnostics/introspectionApi.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/introspectionApi.ts`:

   ```ts
   import { useRef } from "react"
   import type { IntrospectionSnapshot } from "./types"
   import { detectIntrospectionEnvironment, guardIntrospection } from "./environmentGating"

   export type IntrospectionConfig = {
     snapshot: IntrospectionSnapshot
   }

   const emptySnapshot: IntrospectionSnapshot = {
     components: { id: "", type: "", props: {} },
     tokens: { tokens: {} },
     theme: { mode: "light", systemPreference: null, overridden: false },
     validation: { valid: true, issues: [] },
     metadata: { components: {} },
     system: { driftDetected: false, contractViolations: 0, metadataWarnings: 0 },
   }

   export function getIntrospectionSnapshot(config: IntrospectionConfig): IntrospectionSnapshot {
     const env = detectIntrospectionEnvironment()
     return guardIntrospection(env, () => config.snapshot, emptySnapshot)
   }

   export function useIntrospection(config: IntrospectionConfig): IntrospectionSnapshot {
     const env = detectIntrospectionEnvironment()
     const snapshotRef = useRef<IntrospectionSnapshot>(
       guardIntrospection(env, () => config.snapshot, emptySnapshot)
     )
     return snapshotRef.current
   }
   ```

## Constraints
- `useIntrospection` must not trigger re-renders on internal inspection updates — use `useRef`, not `useState`
- Both functions must be environment-gated via `guardIntrospection`
- `emptySnapshot` is the safe fallback in production — it must be valid and structurally complete
- Do not import from validation, governance, or metadata internals — only `./types` and `./environmentGating`

## Acceptance Criteria
- `getIntrospectionSnapshot` returns the provided snapshot in development
- `getIntrospectionSnapshot` returns `emptySnapshot` in production
- `useIntrospection` returns a snapshot without causing re-renders (uses `useRef`)
- `emptySnapshot` is structurally valid as an `IntrospectionSnapshot`
- `npm run build` passes

## Test Steps
1. Call `getIntrospectionSnapshot` in a mocked development env — expect provided snapshot returned
2. Call `getIntrospectionSnapshot` in a mocked production env — expect `emptySnapshot` returned
3. Render a component using `useIntrospection` — verify it returns the snapshot without re-render
4. Run `npm run build`
