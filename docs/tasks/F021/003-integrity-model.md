# Task 003: System Integrity Model

## Feature
F021 - Design System Governance Layer

## Description
Implement per-layer integrity validators (token, component, metadata, contract). Each validator accepts a typed snapshot of that layer and returns an `IntegrityReport`.

## Files
- `src/governance/integrityModel.ts` (create)

## Implementation Steps

1. Create `src/governance/integrityModel.ts`:

   ```ts
   import type { IntegrityIssue, IntegrityLayer, IntegrityReport } from "./types"

   export type TokenSnapshot = {
     keys: string[]
   }

   export type ComponentSnapshot = {
     name: string
     tokenKeys: string[]
     contractKeys: string[]
   }

   export type MetadataSnapshot = {
     componentName: string
     propKeys: string[]
   }

   export type ContractSnapshot = {
     componentName: string
     propKeys: string[]
     slotKeys: string[]
   }

   function makeReport(issues: IntegrityIssue[]): IntegrityReport {
     return { valid: issues.length === 0, issues }
   }

   export function validateTokenIntegrity(snapshot: TokenSnapshot): IntegrityReport {
     const issues: IntegrityIssue[] = []
     const seen = new Set<string>()
     for (const key of snapshot.keys) {
       if (seen.has(key)) {
         issues.push({
           layer: "token",
           code: "TOKEN_DUPLICATE",
           severity: "error",
           message: `Duplicate token key: ${key}`,
         })
       }
       seen.add(key)
     }
     return makeReport(issues)
   }

   export function validateComponentIntegrity(
     snapshot: ComponentSnapshot,
     knownTokenKeys: string[]
   ): IntegrityReport {
     const issues: IntegrityIssue[] = []
     const tokenSet = new Set(knownTokenKeys)
     for (const key of snapshot.tokenKeys) {
       if (!tokenSet.has(key)) {
         issues.push({
           layer: "component",
           code: "COMPONENT_UNKNOWN_TOKEN",
           severity: "error",
           message: `Component "${snapshot.name}" references unknown token: ${key}`,
         })
       }
     }
     return makeReport(issues)
   }

   export function validateMetadataIntegrity(
     meta: MetadataSnapshot,
     componentPropKeys: string[]
   ): IntegrityReport {
     const issues: IntegrityIssue[] = []
     const propSet = new Set(componentPropKeys)
     for (const key of meta.propKeys) {
       if (!propSet.has(key)) {
         issues.push({
           layer: "metadata",
           code: "METADATA_UNKNOWN_PROP",
           severity: "warning",
           message: `Metadata for "${meta.componentName}" references unknown prop: ${key}`,
         })
       }
     }
     return makeReport(issues)
   }

   export function validateContractIntegrity(
     contract: ContractSnapshot,
     metaPropKeys: string[]
   ): IntegrityReport {
     const issues: IntegrityIssue[] = []
     const metaSet = new Set(metaPropKeys)
     for (const key of contract.propKeys) {
       if (!metaSet.has(key)) {
         issues.push({
           layer: "contract",
           code: "CONTRACT_PROP_MISMATCH",
           severity: "error",
           message: `Contract for "${contract.componentName}" has prop not in metadata: ${key}`,
         })
       }
     }
     return makeReport(issues)
   }
   ```

## Constraints
- Each validator is a pure function — no side effects
- No imports from outside `src/governance/`
- Snapshot types are local — not shared with other modules

## Acceptance Criteria
- `validateTokenIntegrity` detects duplicate keys
- `validateComponentIntegrity` flags unknown token references
- `validateMetadataIntegrity` flags props not present in component
- `validateContractIntegrity` flags props not present in metadata
- All functions return `IntegrityReport`
- `npm run build` passes

## Test Steps
1. Pass a `TokenSnapshot` with duplicate keys — expect `valid: false`
2. Pass a `ComponentSnapshot` with a token key not in `knownTokenKeys` — expect `valid: false`
3. Pass valid snapshots for all four — expect `valid: true` for each
4. Run `npm run build`
