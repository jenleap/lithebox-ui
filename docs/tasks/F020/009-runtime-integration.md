# Task 009: Runtime Integration

## Feature
F020 - Versioning & Migration System

## Description
Implement runtime-level compatibility detection and versioning surface. The runtime layer detects version mismatches, surfaces compatibility warnings in development mode, and provides the entry point for registering migration pipelines at startup.

## Files
- `src/versioning/runtimeVersioning.ts` (create)

## Implementation Steps

1. Create `src/versioning/runtimeVersioning.ts`:

   ```ts
   import type { SystemVersion, VersioningMode, CompatibilityReport } from "./types"
   import { getSystemVersion } from "./versionRegistry"
   import { detectVersionMismatch, applyMigrations } from "./migrationEngine"

   export type RuntimeVersionCheckResult = {
     mismatches: Partial<Record<keyof SystemVersion, boolean>>
     anyMismatch: boolean
   }

   export function checkRuntimeVersions(
     expected: SystemVersion,
     mode: VersioningMode = "development"
   ): RuntimeVersionCheckResult {
     const current = getSystemVersion()
     const layers = Object.keys(expected) as (keyof SystemVersion)[]
     const mismatches: Partial<Record<keyof SystemVersion, boolean>> = {}
     let anyMismatch = false

     for (const layer of layers) {
       const mismatch = detectVersionMismatch(current[layer], expected[layer])
       if (mismatch) {
         mismatches[layer] = true
         anyMismatch = true

         if (mode === "development") {
           console.warn(
             `[LBX version] Subsystem "${layer}" mismatch: running ${current[layer]}, expected ${expected[layer]}.`
           )
         }
       }
     }

     return { mismatches, anyMismatch }
   }

   export function runCompatibilityGuard(
     report: CompatibilityReport,
     mode: VersioningMode = "development"
   ): void {
     if (report.compatible) return
     if (mode !== "development") return

     for (const issue of report.issues) {
       if (issue.severity === "error") {
         console.error(`[LBX compat] ${issue.code}: ${issue.message}`)
       } else {
         console.warn(`[LBX compat] ${issue.code}: ${issue.message}`)
       }
     }
   }
   ```

## Constraints
- All `console.warn` / `console.error` calls must be guarded by `mode === "development"`
- Runtime must not silently apply breaking migrations (caller must explicitly call `applyMigrations`)
- No imports from `src/runtime` — versioning is a separate subsystem layer
- `checkRuntimeVersions` must not throw — all mismatches surface in the return value

## Acceptance Criteria
- `checkRuntimeVersions` detects and returns mismatches per subsystem layer
- `checkRuntimeVersions` emits `console.warn` in development mode for each mismatch
- `checkRuntimeVersions` is silent in production mode
- `runCompatibilityGuard` logs errors and warnings in development mode for incompatible reports
- `runCompatibilityGuard` is a no-op in production mode or when `compatible: true`
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
The runtime layer deliberately does not auto-apply migrations. Applying migrations silently at runtime for breaking changes would violate the spec principle: "runtime should not silently apply breaking migrations." Callers must detect a mismatch and explicitly invoke the migration engine.
