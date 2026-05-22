# Task 001: Governance Types

## Feature
F021 - Design System Governance Layer

## Description
Define all TypeScript types that form the shared contract for every F021 module. These types must exist before any implementation begins.

## Files
- `src/governance/types.ts` (create)

## Implementation Steps

1. Create `src/governance/types.ts`:

   ```ts
   export type GovernanceScope = "token" | "component" | "metadata" | "contract" | "system"

   export type GovernanceSeverity = "error" | "warning"

   export type GovernanceRule = {
     id: string
     scope: GovernanceScope
     severity: GovernanceSeverity
     description: string
     validate: (input: unknown) => boolean
   }

   export type GovernancePolicy = {
     name: string
     appliesTo: string
     rules: GovernanceRule[]
   }

   export type PolicyCategory = "structural" | "semantic" | "evolution"

   export type ChangeClassification = "safe" | "sensitive" | "breaking"

   export type SystemChange = {
     id: string
     description: string
     scope: GovernanceScope
     classification?: ChangeClassification
   }

   export type DriftType = "token" | "component" | "metadata" | "contract"

   export type DriftIssue = {
     type: DriftType
     code: string
     severity: GovernanceSeverity
     message: string
   }

   export type DriftReport = {
     hasDrift: boolean
     issues: DriftIssue[]
   }

   export type AlignmentLayer = "token-component" | "component-metadata" | "metadata-contract"

   export type AlignmentIssue = {
     layer: AlignmentLayer
     code: string
     severity: GovernanceSeverity
     message: string
   }

   export type AlignmentReport = {
     aligned: boolean
     issues: AlignmentIssue[]
   }

   export type GovernanceViolation = {
     ruleId: string
     scope: GovernanceScope
     severity: GovernanceSeverity
     message: string
   }

   export type GovernanceResult = {
     approved: boolean
     classification: ChangeClassification
     violations: GovernanceViolation[]
     driftReport: DriftReport
     alignmentReport: AlignmentReport
   }

   export type IntegrityLayer = "token" | "component" | "metadata" | "contract"

   export type IntegrityIssue = {
     layer: IntegrityLayer
     code: string
     severity: GovernanceSeverity
     message: string
   }

   export type IntegrityReport = {
     valid: boolean
     issues: IntegrityIssue[]
   }
   ```

## Constraints
- No runtime code — types only
- No imports from other project files — leaf-level module
- All types must be `export`ed

## Acceptance Criteria
- `src/governance/types.ts` exports: `GovernanceScope`, `GovernanceSeverity`, `GovernanceRule`, `GovernancePolicy`, `PolicyCategory`, `ChangeClassification`, `SystemChange`, `DriftType`, `DriftIssue`, `DriftReport`, `AlignmentLayer`, `AlignmentIssue`, `AlignmentReport`, `GovernanceViolation`, `GovernanceResult`, `IntegrityLayer`, `IntegrityIssue`, `IntegrityReport`
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
`GovernanceRule.validate` is a pure function — no side effects. `GovernanceResult` is the final output of the governance validation pipeline, aggregating classification, violations, drift, and alignment.
