# Task 004: Drift Detection System

## Feature
F021 - Design System Governance Layer

## Description
Implement drift detection: compare system layer snapshots to identify semantic and structural divergence. Emit a `DriftReport` describing all detected drift issues.

## Files
- `src/governance/driftDetection.ts` (create)

## Implementation Steps

1. Create `src/governance/driftDetection.ts`:

   ```ts
   import type { DriftIssue, DriftReport } from "./types"

   export type DriftScanInput = {
     tokenKeys: string[]
     componentTokenRefs: Record<string, string[]>
     metadataPropKeys: Record<string, string[]>
     componentPropKeys: Record<string, string[]>
     contractPropKeys: Record<string, string[]>
   }

   function makeReport(issues: DriftIssue[]): DriftReport {
     return { hasDrift: issues.length > 0, issues }
   }

   export function detectTokenDrift(tokenKeys: string[]): DriftIssue[] {
     const issues: DriftIssue[] = []
     const seen = new Set<string>()
     for (const key of tokenKeys) {
       if (seen.has(key)) {
         issues.push({
           type: "token",
           code: "TOKEN_DRIFT_DUPLICATE",
           severity: "error",
           message: `Duplicate token detected: ${key}`,
         })
       }
       seen.add(key)
     }
     return issues
   }

   export function detectComponentDrift(
     componentTokenRefs: Record<string, string[]>,
     tokenKeys: string[]
   ): DriftIssue[] {
     const issues: DriftIssue[] = []
     const tokenSet = new Set(tokenKeys)
     for (const [component, refs] of Object.entries(componentTokenRefs)) {
       for (const ref of refs) {
         if (!tokenSet.has(ref)) {
           issues.push({
             type: "component",
             code: "COMPONENT_DRIFT_UNKNOWN_TOKEN",
             severity: "error",
             message: `Component "${component}" references unknown token "${ref}"`,
           })
         }
       }
     }
     return issues
   }

   export function detectMetadataDrift(
     metadataPropKeys: Record<string, string[]>,
     componentPropKeys: Record<string, string[]>
   ): DriftIssue[] {
     const issues: DriftIssue[] = []
     for (const [component, metaProps] of Object.entries(metadataPropKeys)) {
       const implProps = new Set(componentPropKeys[component] ?? [])
       for (const prop of metaProps) {
         if (!implProps.has(prop)) {
           issues.push({
             type: "metadata",
             code: "METADATA_DRIFT_PROP_MISMATCH",
             severity: "warning",
             message: `Metadata for "${component}" has prop "${prop}" not found in implementation`,
           })
         }
       }
     }
     return issues
   }

   export function detectContractDrift(
     contractPropKeys: Record<string, string[]>,
     metadataPropKeys: Record<string, string[]>
   ): DriftIssue[] {
     const issues: DriftIssue[] = []
     for (const [component, contractProps] of Object.entries(contractPropKeys)) {
       const metaProps = new Set(metadataPropKeys[component] ?? [])
       for (const prop of contractProps) {
         if (!metaProps.has(prop)) {
           issues.push({
             type: "contract",
             code: "CONTRACT_DRIFT_PROP_MISMATCH",
             severity: "error",
             message: `Contract for "${component}" has prop "${prop}" not in metadata`,
           })
         }
       }
     }
     return issues
   }

   export function scanForDrift(input: DriftScanInput): DriftReport {
     const issues: DriftIssue[] = [
       ...detectTokenDrift(input.tokenKeys),
       ...detectComponentDrift(input.componentTokenRefs, input.tokenKeys),
       ...detectMetadataDrift(input.metadataPropKeys, input.componentPropKeys),
       ...detectContractDrift(input.contractPropKeys, input.metadataPropKeys),
     ]
     return makeReport(issues)
   }
   ```

## Constraints
- All detection functions are pure — no side effects
- `scanForDrift` is the single entry point for full-system drift scanning
- No imports from outside `src/governance/`

## Acceptance Criteria
- `detectTokenDrift` returns issues for duplicate token keys
- `detectComponentDrift` returns issues for components referencing unknown tokens
- `detectMetadataDrift` returns issues for metadata props not in implementation
- `detectContractDrift` returns issues for contract props not in metadata
- `scanForDrift` aggregates all four into a single `DriftReport`
- `npm run build` passes

## Test Steps
1. Call `scanForDrift` with a clean input — expect `hasDrift: false`
2. Introduce a duplicate token key — expect `hasDrift: true` with a `TOKEN_DRIFT_DUPLICATE` issue
3. Introduce a component referencing an unknown token — expect `COMPONENT_DRIFT_UNKNOWN_TOKEN`
4. Run `npm run build`
