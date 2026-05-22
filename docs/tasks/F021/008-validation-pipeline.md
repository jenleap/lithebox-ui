# Task 008: Governance Validation Pipeline

## Feature
F021 - Design System Governance Layer

## Description
Implement the governance validation pipeline: the single orchestration point that classifies a change, validates it against registered policies and rules, checks for system drift, and emits a final `GovernanceResult`.

## Files
- `src/governance/validationPipeline.ts` (create)

## Implementation Steps

1. Create `src/governance/validationPipeline.ts`:

   ```ts
   import type { GovernanceResult, GovernanceViolation, SystemChange } from "./types"
   import { classifyChange } from "./changeClassification"
   import { runGovernanceRules } from "./rulesEngine"
   import { scanForDrift } from "./driftDetection"
   import { validateCrossSystemAlignment } from "./alignmentRules"
   import type { DriftScanInput } from "./driftDetection"

   export type GovernancePipelineInput = {
     change: SystemChange
     driftInput: DriftScanInput
     alignmentInput: {
       tokenKeys: string[]
       componentTokenRefs: Record<string, string[]>
       componentPropKeys: Record<string, string[]>
       metadataPropKeys: Record<string, string[]>
       contractPropKeys: Record<string, string[]>
     }
   }

   export function runGovernancePipeline(
     input: GovernancePipelineInput
   ): GovernanceResult {
     const classification = classifyChange(input.change)

     const violations: GovernanceViolation[] = runGovernanceRules(
       input.change.scope,
       input.change
     )

     const driftReport = scanForDrift(input.driftInput)

     const alignmentReport = validateCrossSystemAlignment(input.alignmentInput)

     const driftViolations: GovernanceViolation[] = driftReport.issues.map(issue => ({
       ruleId: `drift:${issue.code}`,
       scope: "system",
       severity: issue.severity,
       message: issue.message,
     }))

     const alignmentViolations: GovernanceViolation[] = alignmentReport.issues.map(issue => ({
       ruleId: `alignment:${issue.code}`,
       scope: "system",
       severity: issue.severity,
       message: issue.message,
     }))

     const allViolations = [...violations, ...driftViolations, ...alignmentViolations]
     const hasErrors = allViolations.some(v => v.severity === "error")

     return {
       approved: !hasErrors,
       classification,
       violations: allViolations,
       driftReport,
       alignmentReport,
     }
   }
   ```

## Constraints
- `runGovernancePipeline` is the single entry point — no silent acceptance
- `approved` is `false` when any violation has `severity: "error"`
- No imports from outside `src/governance/`

## Acceptance Criteria
- Pipeline runs classification → rule validation → drift detection → alignment check in sequence
- `approved: false` when any error-severity violation, drift issue, or alignment issue exists
- `approved: true` when all checks pass
- `GovernanceResult` contains fully populated `driftReport` and `alignmentReport`
- `npm run build` passes

## Test Steps
1. Run the pipeline with a clean system state and no registered rules — expect `approved: true`
2. Register a governance rule that always fails for the change scope — expect `approved: false`
3. Pass drift input with duplicate tokens — expect `approved: false` and `hasDrift: true`
4. Pass alignment input with a missing token reference — expect `approved: false` and `aligned: false`
5. Run `npm run build`
