# Task 010: Exports

## Feature
F021 - Design System Governance Layer

## Description
Create the barrel export file for the governance module. All public types and functions must be re-exported from `src/governance/index.ts`.

## Files
- `src/governance/index.ts` (create)

## Implementation Steps

1. Create `src/governance/index.ts`:

   ```ts
   export type {
     GovernanceScope,
     GovernanceSeverity,
     GovernanceRule,
     GovernancePolicy,
     PolicyCategory,
     ChangeClassification,
     SystemChange,
     DriftType,
     DriftIssue,
     DriftReport,
     AlignmentLayer,
     AlignmentIssue,
     AlignmentReport,
     GovernanceViolation,
     GovernanceResult,
     IntegrityLayer,
     IntegrityIssue,
     IntegrityReport,
   } from "./types"

   export {
     registerGovernanceRule,
     getGovernanceRules,
     getRulesByScope,
     runGovernanceRules,
     clearGovernanceRules,
   } from "./rulesEngine"

   export {
     validateTokenIntegrity,
     validateComponentIntegrity,
     validateMetadataIntegrity,
     validateContractIntegrity,
   } from "./integrityModel"
   export type {
     TokenSnapshot,
     ComponentSnapshot,
     MetadataSnapshot,
     ContractSnapshot,
   } from "./integrityModel"

   export {
     detectTokenDrift,
     detectComponentDrift,
     detectMetadataDrift,
     detectContractDrift,
     scanForDrift,
   } from "./driftDetection"
   export type { DriftScanInput } from "./driftDetection"

   export {
     validateTokenComponentAlignment,
     validateComponentMetadataAlignment,
     validateMetadataContractAlignment,
     validateCrossSystemAlignment,
   } from "./alignmentRules"

   export {
     registerGovernancePolicy,
     getPoliciesByCategory,
     getAllPolicies,
     evaluatePolicy,
     evaluatePoliciesByCategory,
     clearPolicyRegistry,
   } from "./policySystem"
   export type { RegisteredPolicy } from "./policySystem"

   export {
     registerClassificationRule,
     getClassificationRules,
     classifyChange,
     classifyChanges,
     clearClassificationRules,
     registerDefaultClassificationRules,
   } from "./changeClassification"
   export type { ClassificationRule } from "./changeClassification"

   export { runGovernancePipeline } from "./validationPipeline"
   export type { GovernancePipelineInput } from "./validationPipeline"

   export {
     buildDriftInput,
     buildAlignmentInput,
     buildPipelineInput,
     getVersioningContext,
     getActiveRuleCount,
   } from "./integration"
   export type { GovernanceSystemSnapshot } from "./integration"
   ```

## Constraints
- Re-export only — no logic in `index.ts`
- All public symbols from all governance modules must be accessible from this file
- Maintain `export type` for type-only exports

## Acceptance Criteria
- All types and functions from tasks 001–009 are accessible via `src/governance/index.ts`
- `npm run build` passes with no TypeScript errors
- No duplicate exports

## Test Steps
1. Import a type and a function from `src/governance/index.ts` in a test file — verify no error
2. Run `npm run build` — no errors
