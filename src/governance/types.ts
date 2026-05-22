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
