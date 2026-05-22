# Task 003: Migration Registry

## Feature
F020 - Versioning & Migration System

## Description
Implement the migration registry that stores registered migrations and resolves the ordered migration chain needed to move between two versions.

## Files
- `src/versioning/migrationRegistry.ts` (create)

## Implementation Steps

1. Create `src/versioning/migrationRegistry.ts`:

   ```ts
   import type { Migration, MigrationChain } from "./types"

   const _migrations: Migration[] = []

   export function registerMigration(migration: Migration): void {
     _migrations.push(migration)
   }

   export function getMigrations(): readonly Migration[] {
     return _migrations
   }

   export function resolveMigrationChain(
     fromVersion: string,
     toVersion: string
   ): MigrationChain {
     if (fromVersion === toVersion) return []

     const chain: Migration[] = []
     let current = fromVersion

     while (current !== toVersion) {
       const next = _migrations.find((m) => m.fromVersion === current)
       if (!next) break
       chain.push(next)
       current = next.toVersion
       if (current === toVersion) break
     }

     return chain
   }

   export function clearMigrationRegistry(): void {
     _migrations.length = 0
   }
   ```

## Constraints
- Migrations must be traversed in insertion order (no sorting)
- `resolveMigrationChain` must not throw — an empty array signals no path found
- `clearMigrationRegistry` is for test isolation only
- Mutations to the returned `readonly Migration[]` must not affect the registry

## Acceptance Criteria
- `registerMigration` appends a migration to the registry
- `resolveMigrationChain` returns an ordered chain from `fromVersion` to `toVersion`
- `resolveMigrationChain` returns `[]` when `fromVersion === toVersion`
- `resolveMigrationChain` returns a partial chain when no full path exists (rather than throwing)
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
The chain resolution is a simple linear walk — it does not implement graph traversal. Migrations must be registered in the correct sequential order for the chain to resolve correctly.
