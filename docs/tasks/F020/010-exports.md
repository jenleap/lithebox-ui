# Task 010: Public Exports

## Feature
F020 - Versioning & Migration System

## Description
Create the public API surface for the versioning module. Exports all types and functions needed by application code and external tooling (e.g., Proto). This is the only file external consumers should import from.

## Files
- `src/versioning/index.ts` (create)

## Implementation Steps

1. Create `src/versioning/index.ts`:

   ```ts
   // Types
   export type {
     SystemVersion,
     ChangeType,
     Migration,
     MigrationChain,
     MigrationResult,
     DeprecationStatus,
     DeprecationNotice,
     CompatibilityReport,
     CompatibilityIssue,
     VersioningMode,
   } from "./types"

   // Version registry
   export {
     getSystemVersion,
     setSubsystemVersion,
     getSubsystemVersion,
     resetVersionRegistry,
   } from "./versionRegistry"

   // Migration registry
   export {
     registerMigration,
     getMigrations,
     resolveMigrationChain,
     clearMigrationRegistry,
   } from "./migrationRegistry"

   // Migration engine
   export {
     detectVersionMismatch,
     applyMigrations,
   } from "./migrationEngine"

   // Deprecation system
   export {
     registerDeprecation,
     getDeprecationNotice,
     getAllDeprecations,
     warnIfDeprecated,
     clearDeprecationRegistry,
   } from "./deprecationSystem"

   // Compatibility validators
   export { validateTokenCompatibility } from "./tokenCompatibility"
   export type { TokenRenameMap, TokenCompatibilityOptions } from "./tokenCompatibility"

   export { validateMetadataCompatibility } from "./metadataCompatibility"
   export type { MetadataFieldRenameMap, MetadataCompatibilityOptions } from "./metadataCompatibility"

   export { validateContractCompatibility } from "./contractCompatibility"
   export type { PropSnapshot, ContractSnapshot } from "./contractCompatibility"

   // Runtime integration
   export {
     checkRuntimeVersions,
     runCompatibilityGuard,
   } from "./runtimeVersioning"
   export type { RuntimeVersionCheckResult } from "./runtimeVersioning"
   ```

## Constraints
- No implementation logic in this file — re-exports only
- All public types must be exported with `export type`
- All internal test-isolation helpers (`clear*`, `reset*`) are exported — they are part of the public API for consumer test suites
- Do not export `MigrationEngineOptions` — it is an implementation detail

## Acceptance Criteria
- All types from `types.ts` are exported
- All public functions from all subsystem modules are exported
- `npm run build` passes with no TypeScript errors
- No new implementation code introduced in this file

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify imports resolve: `import { applyMigrations, registerMigration } from "src/versioning"` (or relative path)

## Notes
External tooling (e.g., Proto) should only ever import from this index. Internal modules may import from each other using relative paths. This boundary keeps the public API stable even when internal structure evolves.
