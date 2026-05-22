# Task 009: Integration With Other Systems

## Feature
F021 - Design System Governance Layer

## Description
Implement the integration bridge between the governance layer and the existing validation engine, versioning system, metadata system, and token system. This module provides adapters that translate existing system state into governance pipeline inputs.

## Files
- `src/governance/integration.ts` (create)

## Implementation Steps

1. Create `src/governance/integration.ts`:

   ```ts
   import type { DriftScanInput } from "./driftDetection"
   import type { GovernancePipelineInput } from "./validationPipeline"
   import type { SystemChange } from "./types"
   import { getSystemVersion } from "../versioning/versionRegistry"
   import { getGovernanceRules } from "./rulesEngine"

   export type GovernanceSystemSnapshot = {
     tokenKeys: string[]
     componentTokenRefs: Record<string, string[]>
     componentPropKeys: Record<string, string[]>
     metadataPropKeys: Record<string, string[]>
     contractPropKeys: Record<string, string[]>
   }

   export function buildDriftInput(snapshot: GovernanceSystemSnapshot): DriftScanInput {
     return {
       tokenKeys: snapshot.tokenKeys,
       componentTokenRefs: snapshot.componentTokenRefs,
       metadataPropKeys: snapshot.metadataPropKeys,
       componentPropKeys: snapshot.componentPropKeys,
       contractPropKeys: snapshot.contractPropKeys,
     }
   }

   export function buildAlignmentInput(snapshot: GovernanceSystemSnapshot): {
     tokenKeys: string[]
     componentTokenRefs: Record<string, string[]>
     componentPropKeys: Record<string, string[]>
     metadataPropKeys: Record<string, string[]>
     contractPropKeys: Record<string, string[]>
   } {
     return {
       tokenKeys: snapshot.tokenKeys,
       componentTokenRefs: snapshot.componentTokenRefs,
       componentPropKeys: snapshot.componentPropKeys,
       metadataPropKeys: snapshot.metadataPropKeys,
       contractPropKeys: snapshot.contractPropKeys,
     }
   }

   export function buildPipelineInput(
     change: SystemChange,
     snapshot: GovernanceSystemSnapshot
   ): GovernancePipelineInput {
     return {
       change,
       driftInput: buildDriftInput(snapshot),
       alignmentInput: buildAlignmentInput(snapshot),
     }
   }

   export function getVersioningContext(): { core: string; tokens: string; metadata: string; contracts: string } {
     return getSystemVersion()
   }

   export function getActiveRuleCount(): number {
     return getGovernanceRules().length
   }
   ```

## Constraints
- This module is the only place that imports from outside `src/governance/`
- Only import from `../versioning/versionRegistry` — do not import from validation or metadata internals
- Adapters must not mutate inputs

## Acceptance Criteria
- `buildPipelineInput` constructs a valid `GovernancePipelineInput` from a snapshot and change
- `buildDriftInput` and `buildAlignmentInput` correctly map snapshot fields
- `getVersioningContext` returns the current system version from the versioning registry
- `getActiveRuleCount` returns the number of registered governance rules
- `npm run build` passes

## Test Steps
1. Build a snapshot with known fields — call `buildPipelineInput` — verify all fields are mapped correctly
2. Call `getVersioningContext` — expect a valid `SystemVersion` object
3. Register a rule then call `getActiveRuleCount` — expect count to reflect registered rules
4. Run `npm run build`
