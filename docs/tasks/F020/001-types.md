# Task 001: Versioning Types

## Feature
F020 - Versioning & Migration System

## Description
Define all TypeScript types that form the shared contract for every F020 module. These types must exist before any implementation begins.

## Files
- `src/versioning/types.ts` (create)

## Implementation Steps

1. Create `src/versioning/types.ts`:

   ```ts
   export type SystemVersion = {
     core: string
     tokens: string
     metadata: string
     contracts: string
   }

   export type ChangeType = "breaking" | "additive" | "non-functional"

   export type Migration = {
     fromVersion: string
     toVersion: string
     description: string
     changeType: ChangeType
     apply: (input: unknown) => unknown
     validate?: (input: unknown) => boolean
   }

   export type MigrationChain = Migration[]

   export type MigrationResult = {
     success: boolean
     output: unknown
     migrationsApplied: string[]
     error?: string
   }

   export type DeprecationStatus = "active" | "deprecated" | "scheduled-removal" | "removed"

   export type DeprecationNotice = {
     feature: string
     deprecatedIn: string
     removedIn?: string
     replacement?: string
     message: string
     status: DeprecationStatus
   }

   export type CompatibilityReport = {
     compatible: boolean
     issues: CompatibilityIssue[]
   }

   export type CompatibilityIssue = {
     code: string
     severity: "error" | "warning"
     message: string
     layer: "tokens" | "metadata" | "contracts" | "core"
   }

   export type VersioningMode = "development" | "production"
   ```

## Constraints
- No runtime code — types only
- No imports from other project files — leaf-level module
- All types must be `export`ed

## Acceptance Criteria
- `src/versioning/types.ts` exports: `SystemVersion`, `ChangeType`, `Migration`, `MigrationChain`, `MigrationResult`, `DeprecationStatus`, `DeprecationNotice`, `CompatibilityReport`, `CompatibilityIssue`, `VersioningMode`
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
`ChangeType` is used throughout to classify whether a change requires a major, minor, or patch version increment. `CompatibilityIssue.layer` identifies which subsystem the issue originates from for diagnostic purposes.
