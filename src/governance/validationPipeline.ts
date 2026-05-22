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
