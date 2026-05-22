# Task 007: System Health Snapshot

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the system health snapshot builder. This module derives health signals from the governance layer's drift report, contract violations, and metadata warnings. It is strictly a read-only consumer of existing system state.

## Files
- `src/diagnostics/systemHealth.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/systemHealth.ts`:

   ```ts
   import type { DriftReport } from "../governance/types"
   import type { SystemHealthSnapshot } from "./types"

   export type SystemHealthInput = {
     driftReport: DriftReport
     contractViolationCount: number
     metadataWarningCount: number
   }

   export function buildSystemHealthSnapshot(input: SystemHealthInput): SystemHealthSnapshot {
     return {
       driftDetected: input.driftReport.hasDrift,
       contractViolations: input.contractViolationCount,
       metadataWarnings: input.metadataWarningCount,
     }
   }

   export function isSystemHealthy(snapshot: SystemHealthSnapshot): boolean {
     return (
       !snapshot.driftDetected &&
       snapshot.contractViolations === 0 &&
       snapshot.metadataWarnings === 0
     )
   }

   export function getSystemHealthSummary(snapshot: SystemHealthSnapshot): {
     status: "healthy" | "degraded" | "critical"
     reasons: string[]
   } {
     const reasons: string[] = []

     if (snapshot.driftDetected) reasons.push("drift detected")
     if (snapshot.contractViolations > 0)
       reasons.push(`${snapshot.contractViolations} contract violation(s)`)
     if (snapshot.metadataWarnings > 0)
       reasons.push(`${snapshot.metadataWarnings} metadata warning(s)`)

     const status =
       snapshot.contractViolations > 0 || snapshot.driftDetected
         ? "critical"
         : snapshot.metadataWarnings > 0
         ? "degraded"
         : "healthy"

     return { status, reasons }
   }
   ```

## Constraints
- Signals must be derived from provided input — no self-healing or auto-fix logic
- No mutation of input data
- Only import from `../governance/types` and `./types`
- `contractViolationCount` and `metadataWarningCount` must never be negative — callers are responsible for valid inputs

## Acceptance Criteria
- `buildSystemHealthSnapshot` maps `driftReport.hasDrift` to `driftDetected`
- `isSystemHealthy` returns `true` only when all three signals are clean
- `getSystemHealthSummary` returns `"critical"` when drift or contract violations are present
- `getSystemHealthSummary` returns `"degraded"` when only metadata warnings are present
- `getSystemHealthSummary` returns `"healthy"` when no issues exist
- `npm run build` passes

## Test Steps
1. Build with `hasDrift: false`, `contractViolationCount: 0`, `metadataWarningCount: 0` — expect `isSystemHealthy: true` and status `"healthy"`
2. Build with `hasDrift: true` — expect status `"critical"` and `driftDetected: true`
3. Build with `contractViolationCount: 2` — expect status `"critical"` and 1 reason in array
4. Build with only `metadataWarningCount: 3` — expect status `"degraded"`
5. Run `npm run build`
