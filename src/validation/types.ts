export type ValidationSeverity = "error" | "warning"

export type ValidationIssue = {
  code: string
  severity: ValidationSeverity
  message: string
  path?: string
  component?: string
}

export type ValidationResult = {
  valid: boolean
  errors: ValidationIssue[]
  warnings: ValidationIssue[]
}

export type Validator = (input: unknown) => ValidationResult

export type ValidationMode = "development" | "production"
