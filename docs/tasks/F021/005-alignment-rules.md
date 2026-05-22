# Task 005: Cross-System Alignment Rules

## Feature
F021 - Design System Governance Layer

## Description
Implement cross-system alignment validators that enforce the three alignment axes: token↔component, component↔metadata, and metadata↔contract. Each returns an `AlignmentReport`.

## Files
- `src/governance/alignmentRules.ts` (create)

## Implementation Steps

1. Create `src/governance/alignmentRules.ts`:

   ```ts
   import type { AlignmentIssue, AlignmentReport } from "./types"

   function makeReport(issues: AlignmentIssue[]): AlignmentReport {
     return { aligned: issues.length === 0, issues }
   }

   export function validateTokenComponentAlignment(
     tokenKeys: string[],
     componentTokenRefs: Record<string, string[]>
   ): AlignmentReport {
     const issues: AlignmentIssue[] = []
     const tokenSet = new Set(tokenKeys)
     for (const [component, refs] of Object.entries(componentTokenRefs)) {
       for (const ref of refs) {
         if (!tokenSet.has(ref)) {
           issues.push({
             layer: "token-component",
             code: "ALIGN_TOKEN_COMPONENT_MISSING",
             severity: "error",
             message: `Component "${component}" uses token "${ref}" that does not exist`,
           })
         }
       }
     }
     return makeReport(issues)
   }

   export function validateComponentMetadataAlignment(
     componentPropKeys: Record<string, string[]>,
     metadataPropKeys: Record<string, string[]>
   ): AlignmentReport {
     const issues: AlignmentIssue[] = []
     for (const [component, implProps] of Object.entries(componentPropKeys)) {
       const metaProps = new Set(metadataPropKeys[component] ?? [])
       for (const prop of implProps) {
         if (!metaProps.has(prop)) {
           issues.push({
             layer: "component-metadata",
             code: "ALIGN_COMPONENT_METADATA_MISSING",
             severity: "warning",
             message: `Component "${component}" has prop "${prop}" not documented in metadata`,
           })
         }
       }
     }
     return makeReport(issues)
   }

   export function validateMetadataContractAlignment(
     metadataPropKeys: Record<string, string[]>,
     contractPropKeys: Record<string, string[]>
   ): AlignmentReport {
     const issues: AlignmentIssue[] = []
     for (const [component, metaProps] of Object.entries(metadataPropKeys)) {
       const contractProps = new Set(contractPropKeys[component] ?? [])
       for (const prop of metaProps) {
         if (!contractProps.has(prop)) {
           issues.push({
             layer: "metadata-contract",
             code: "ALIGN_METADATA_CONTRACT_MISSING",
             severity: "error",
             message: `Metadata prop "${prop}" for "${component}" has no corresponding contract definition`,
           })
         }
       }
     }
     return makeReport(issues)
   }

   export function validateCrossSystemAlignment(input: {
     tokenKeys: string[]
     componentTokenRefs: Record<string, string[]>
     componentPropKeys: Record<string, string[]>
     metadataPropKeys: Record<string, string[]>
     contractPropKeys: Record<string, string[]>
   }): AlignmentReport {
     const issues: AlignmentIssue[] = [
       ...validateTokenComponentAlignment(input.tokenKeys, input.componentTokenRefs).issues,
       ...validateComponentMetadataAlignment(input.componentPropKeys, input.metadataPropKeys).issues,
       ...validateMetadataContractAlignment(input.metadataPropKeys, input.contractPropKeys).issues,
     ]
     return makeReport(issues)
   }
   ```

## Constraints
- All validators are pure functions — no side effects
- `validateCrossSystemAlignment` is the single entry point for full alignment validation
- No imports from outside `src/governance/`

## Acceptance Criteria
- `validateTokenComponentAlignment` detects components using undefined tokens
- `validateComponentMetadataAlignment` detects undocumented component props
- `validateMetadataContractAlignment` detects metadata props without contract definitions
- `validateCrossSystemAlignment` aggregates all three into a single `AlignmentReport`
- `npm run build` passes

## Test Steps
1. Call `validateCrossSystemAlignment` with a fully aligned system — expect `aligned: true`
2. Introduce a component referencing a missing token — expect `ALIGN_TOKEN_COMPONENT_MISSING`
3. Introduce a component prop not in metadata — expect `ALIGN_COMPONENT_METADATA_MISSING`
4. Introduce a metadata prop not in contract — expect `ALIGN_METADATA_CONTRACT_MISSING`
5. Run `npm run build`
