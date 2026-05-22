# Task 004: Migration Engine

## Feature
F020 - Versioning & Migration System

## Description
Implement the migration engine that detects version mismatches, collects the migration chain, applies migrations sequentially, and validates the output. This is the core execution pipeline for migrations.

## Files
- `src/versioning/migrationEngine.ts` (create)

## Implementation Steps

1. Create `src/versioning/migrationEngine.ts`:

   ```ts
   import type { MigrationResult, VersioningMode } from "./types"
   import { resolveMigrationChain } from "./migrationRegistry"

   export type MigrationEngineOptions = {
     mode?: VersioningMode
   }

   export function detectVersionMismatch(
     currentVersion: string,
     targetVersion: string
   ): boolean {
     return currentVersion !== targetVersion
   }

   export function applyMigrations(
     input: unknown,
     fromVersion: string,
     toVersion: string,
     options: MigrationEngineOptions = {}
   ): MigrationResult {
     if (!detectVersionMismatch(fromVersion, toVersion)) {
       return { success: true, output: input, migrationsApplied: [] }
     }

     const chain = resolveMigrationChain(fromVersion, toVersion)

     if (chain.length === 0) {
       return {
         success: false,
         output: input,
         migrationsApplied: [],
         error: `No migration path found from ${fromVersion} to ${toVersion}`,
       }
     }

     const migrationsApplied: string[] = []
     let current = input

     for (const migration of chain) {
       try {
         const transformed = migration.apply(current)

         if (migration.validate && !migration.validate(transformed)) {
           return {
             success: false,
             output: current,
             migrationsApplied,
             error: `Migration validation failed: ${migration.fromVersion} → ${migration.toVersion}`,
           }
         }

         current = transformed
         migrationsApplied.push(`${migration.fromVersion} → ${migration.toVersion}`)
       } catch (err) {
         return {
           success: false,
           output: current,
           migrationsApplied,
           error: `Migration threw during ${migration.fromVersion} → ${migration.toVersion}: ${String(err)}`,
         }
       }
     }

     return { success: true, output: current, migrationsApplied }
   }
   ```

## Constraints
- Migrations must be applied in chain order (deterministic)
- Partial migrations are not allowed — a failed migration must abort and return the pre-failure output
- Migrations must not mutate original inputs (caller responsibility per Migration contract)
- In production mode, diagnostics are suppressed — `error` messages are still returned but no console output
- Engine must never throw — all failures surface in `MigrationResult.error`

## Acceptance Criteria
- Returns `{ success: true, migrationsApplied: [] }` when versions match
- Returns `{ success: false, error: ... }` when no migration path exists
- Applies the full chain sequentially when path exists
- Aborts on first failing migration — does not continue
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
The engine does not emit console warnings or runtime diagnostics. Callers (runtime integration layer, task 009) are responsible for surfacing results to the developer.
