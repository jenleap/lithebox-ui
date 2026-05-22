# Task 002: Version Registry

## Feature
F020 - Versioning & Migration System

## Description
Implement the version registry that tracks the current version of each subsystem (core, tokens, metadata, contracts). This is the authoritative source of truth for the running system version.

## Files
- `src/versioning/versionRegistry.ts` (create)

## Implementation Steps

1. Create `src/versioning/versionRegistry.ts`:

   ```ts
   import type { SystemVersion } from "./types"

   const _version: SystemVersion = {
     core: "1.0.0",
     tokens: "1.0.0",
     metadata: "1.0.0",
     contracts: "1.0.0",
   }

   export function getSystemVersion(): Readonly<SystemVersion> {
     return { ..._version }
   }

   export function setSubsystemVersion(
     layer: keyof SystemVersion,
     version: string
   ): void {
     _version[layer] = version
   }

   export function getSubsystemVersion(layer: keyof SystemVersion): string {
     return _version[layer]
   }

   export function resetVersionRegistry(): void {
     _version.core = "1.0.0"
     _version.tokens = "1.0.0"
     _version.metadata = "1.0.0"
     _version.contracts = "1.0.0"
   }
   ```

## Constraints
- Registry is module-level singleton (not class-based)
- `getSystemVersion` must return a copy — callers cannot mutate internal state
- `resetVersionRegistry` is for test isolation only — not for production use
- Version strings must follow semver format (enforcement is caller responsibility at this layer)

## Acceptance Criteria
- `getSystemVersion` returns all four subsystem versions
- `setSubsystemVersion` updates only the specified layer
- `getSubsystemVersion` returns the version for a given layer
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
The registry is intentionally simple. Version enforcement (semver parsing, increment validation) lives in the migration engine, not here.
