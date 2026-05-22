import type { ValidationResult, ValidationIssue } from "../validation/types"
import type { ValidationSnapshot, ValidationSnapshotIssue } from "./types"

function toSnapshotIssue(
  issue: ValidationIssue,
  component: string
): ValidationSnapshotIssue {
  return {
    component: issue.component ?? component,
    code: issue.code,
    severity: issue.severity,
    message: issue.message,
  }
}

export function buildValidationSnapshot(
  result: ValidationResult,
  defaultComponent = "unknown"
): ValidationSnapshot {
  const issues: ValidationSnapshotIssue[] = [
    ...result.errors.map((e) => toSnapshotIssue(e, defaultComponent)),
    ...result.warnings.map((w) => toSnapshotIssue(w, defaultComponent)),
  ]
  return {
    valid: result.valid,
    issues,
  }
}

export function filterSnapshotByComponent(
  snapshot: ValidationSnapshot,
  component: string
): ValidationSnapshotIssue[] {
  return snapshot.issues.filter((issue) => issue.component === component)
}

export function filterSnapshotBySeverity(
  snapshot: ValidationSnapshot,
  severity: "error" | "warning"
): ValidationSnapshotIssue[] {
  return snapshot.issues.filter((issue) => issue.severity === severity)
}
