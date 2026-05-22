# Task 006: Metadata Introspection

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the metadata introspection snapshot builder. This module reads component metadata from the existing metadata registry and exposes it as a structured `MetadataSnapshot` for the diagnostics layer.

## Files
- `src/diagnostics/metadataIntrospection.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/metadataIntrospection.ts`:

   ```ts
   import type { ComponentMetadata } from "../metadata/types"
   import type { MetadataSnapshot } from "./types"

   export function buildMetadataSnapshot(
     registry: Record<string, ComponentMetadata>
   ): MetadataSnapshot {
     const components: Record<string, unknown> = {}
     for (const [name, meta] of Object.entries(registry)) {
       components[name] = {
         name: meta.name,
         category: meta.category,
         description: meta.description,
         version: meta.version,
         propKeys: Object.keys(meta.props),
         slotKeys: meta.slots ? Object.keys(meta.slots) : [],
         states: meta.states ?? [],
         compositionRules: meta.composition,
       }
     }
     return { components: Object.freeze(components) }
   }

   export function getComponentMetadataEntry(
     snapshot: MetadataSnapshot,
     componentName: string
   ): unknown | undefined {
     return snapshot.components[componentName]
   }

   export function listRegisteredComponents(snapshot: MetadataSnapshot): string[] {
     return Object.keys(snapshot.components)
   }
   ```

## Constraints
- Must not mutate the registry — read-only consumer of `ComponentMetadata`
- The `components` map in the returned snapshot must be frozen
- Only import from `../metadata/types` and `./types`
- Expose a normalized view only — do not expose raw `ComponentMetadata` directly

## Acceptance Criteria
- `buildMetadataSnapshot` produces a `MetadataSnapshot` with an entry for each registry component
- Each entry includes `name`, `category`, `description`, `version`, `propKeys`, `slotKeys`, `states`, and `compositionRules`
- `getComponentMetadataEntry` returns the entry for a known component or `undefined` for unknown
- `listRegisteredComponents` returns all registered component names
- `snapshot.components` is frozen
- `npm run build` passes

## Test Steps
1. Build registry with 2 components — call `buildMetadataSnapshot` — verify both are present
2. Call `getComponentMetadataEntry` with a known name — expect correct entry
3. Call `getComponentMetadataEntry` with unknown name — expect `undefined`
4. Call `listRegisteredComponents` — expect array of all component names
5. Verify `snapshot.components` is frozen
6. Run `npm run build`
