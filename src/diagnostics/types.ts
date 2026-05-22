export type ComponentTreeSnapshot = {
  id: string
  type: string
  props: Record<string, unknown>
  children?: ComponentTreeSnapshot[]
}

export type TokenResolutionEntry = {
  value: string
  source: "default" | "override" | "theme" | "mode"
  path: string[]
}

export type TokenResolutionSnapshot = {
  tokens: Record<string, TokenResolutionEntry>
}

export type ThemeSnapshot = {
  mode: "light" | "dark"
  systemPreference: "light" | "dark" | null
  overridden: boolean
}

export type ValidationSnapshotIssue = {
  component: string
  code: string
  severity: "error" | "warning"
  message: string
}

export type ValidationSnapshot = {
  valid: boolean
  issues: ValidationSnapshotIssue[]
}

export type MetadataSnapshot = {
  components: Record<string, unknown>
}

export type SystemHealthSnapshot = {
  driftDetected: boolean
  contractViolations: number
  metadataWarnings: number
}

export type IntrospectionSnapshot = {
  components: ComponentTreeSnapshot
  tokens: TokenResolutionSnapshot
  theme: ThemeSnapshot
  validation: ValidationSnapshot
  metadata: MetadataSnapshot
  system: SystemHealthSnapshot
}
