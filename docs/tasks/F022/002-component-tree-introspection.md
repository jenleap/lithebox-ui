# Task 002: Component Tree Introspection

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the component tree snapshot builder. This module captures the rendered component tree structure including props and parent-child relationships.

## Files
- `src/diagnostics/componentTree.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/componentTree.ts`:

   ```ts
   import type { ComponentTreeSnapshot } from "./types"

   export type ComponentTreeInput = {
     id: string
     type: string
     props: Record<string, unknown>
     children?: ComponentTreeInput[]
   }

   export function buildComponentTreeSnapshot(input: ComponentTreeInput): ComponentTreeSnapshot {
     return {
       id: input.id,
       type: input.type,
       props: Object.freeze({ ...input.props }),
       children: input.children?.map(buildComponentTreeSnapshot),
     }
   }

   export function flattenComponentTree(snapshot: ComponentTreeSnapshot): ComponentTreeSnapshot[] {
     const result: ComponentTreeSnapshot[] = [snapshot]
     if (snapshot.children) {
       for (const child of snapshot.children) {
         result.push(...flattenComponentTree(child))
       }
     }
     return result
   }

   export function findComponentById(
     snapshot: ComponentTreeSnapshot,
     id: string
   ): ComponentTreeSnapshot | undefined {
     if (snapshot.id === id) return snapshot
     if (snapshot.children) {
       for (const child of snapshot.children) {
         const found = findComponentById(child, id)
         if (found) return found
       }
     }
     return undefined
   }
   ```

## Constraints
- Snapshots must be immutable — freeze all props objects
- No inferred nodes: only serialize what is explicitly provided as input
- No React imports — this is a pure data transformation module
- Must not trigger re-renders or side effects

## Acceptance Criteria
- `buildComponentTreeSnapshot` returns a correctly structured `ComponentTreeSnapshot` with frozen props
- `flattenComponentTree` returns all nodes in depth-first order
- `findComponentById` returns the matching node or `undefined`
- `npm run build` passes

## Test Steps
1. Build a tree with 3 levels — call `buildComponentTreeSnapshot` — verify structure matches input
2. Call `flattenComponentTree` — verify all nodes are present
3. Call `findComponentById` with a known id — expect correct node returned
4. Call `findComponentById` with an unknown id — expect `undefined`
5. Verify props on returned snapshot are frozen (Object.isFrozen)
6. Run `npm run build`
