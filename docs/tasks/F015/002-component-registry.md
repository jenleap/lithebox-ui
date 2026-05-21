# Task 002: Component Registry

## Feature
F015 - Component Metadata System

## Description
Implement the central component registry — a static, versioned store of all `ComponentMetadata` objects keyed by component name. Includes registry read utilities and a JSON export function. The registry must be mutation-safe and serializable.

## Files
- `src/metadata/registry.ts` (create)

## Implementation Steps

1. Create `src/metadata/registry.ts`:

   ```ts
   import type { ComponentMetadata } from "./types"

   const _registry: Record<string, ComponentMetadata> = {}

   export function registerComponent(metadata: ComponentMetadata): void {
     _registry[metadata.name] = metadata
   }

   export function getComponent(name: string): ComponentMetadata | undefined {
     return _registry[name]
   }

   export function getAllComponents(): Readonly<Record<string, ComponentMetadata>> {
     return _registry
   }

   export function exportRegistryAsJSON(): string {
     return JSON.stringify(_registry, null, 2)
   }
   ```

2. The registry map `_registry` must be module-private (prefixed `_`, not exported directly).

3. `getAllComponents()` returns a `Readonly` view — callers cannot mutate the registry.

4. `exportRegistryAsJSON()` must produce valid, pretty-printed JSON with no circular references.

5. `registerComponent` replaces any existing entry for the same `name` (last-write wins for dev flexibility).

## Constraints
- No `any` types
- Do not export `_registry` directly
- No React imports
- Registry must be JSON-serializable at all times — metadata entries must not contain functions or class instances

## Acceptance Criteria
- `registerComponent`, `getComponent`, `getAllComponents`, `exportRegistryAsJSON` are all exported
- Calling `registerComponent({ name: "Box", ... })` then `getComponent("Box")` returns the correct object
- `getAllComponents()` return type is `Readonly<Record<string, ComponentMetadata>>`
- `exportRegistryAsJSON()` returns a valid JSON string
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call `registerComponent` with a minimal valid metadata object, then `getComponent` with the same name — verify match
3. Call `exportRegistryAsJSON` — verify output is parseable JSON

## Notes
This is the single source of truth for runtime-queryable metadata. All component metadata files (Tasks 003–008) call `registerComponent` as their side-effect.
