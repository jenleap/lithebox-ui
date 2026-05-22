export type SystemVersion = {
  core: string
  tokens: string
  metadata: string
  contracts: string
}

export type ChangeType = "breaking" | "additive" | "non-functional"

export type Migration = {
  fromVersion: string
  toVersion: string
  description: string
  changeType: ChangeType
  apply: (input: unknown) => unknown
  validate?: (input: unknown) => boolean
}

export type MigrationChain = Migration[]

export type MigrationResult = {
  success: boolean
  output: unknown
  migrationsApplied: string[]
  error?: string
}

export type DeprecationStatus = "active" | "deprecated" | "scheduled-removal" | "removed"

export type DeprecationNotice = {
  feature: string
  deprecatedIn: string
  removedIn?: string
  replacement?: string
  message: string
  status: DeprecationStatus
}

export type CompatibilityReport = {
  compatible: boolean
  issues: CompatibilityIssue[]
}

export type CompatibilityIssue = {
  code: string
  severity: "error" | "warning"
  message: string
  layer: "tokens" | "metadata" | "contracts" | "core"
}

export type VersioningMode = "development" | "production"
