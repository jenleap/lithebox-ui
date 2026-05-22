# Task 005: Validation Introspection

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the validation introspection snapshot builder. This module translates `ValidationResult` output from the existing validation engine into a structured `ValidationSnapshot` for the diagnostics layer.

## Files
- `src/diagnostics/validationIntrospection.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/validationIntrospection.ts`:

   ```ts
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
   ```

## Constraints
- Must not modify or re-run the validation engine — read-only consumer of `ValidationResult`
- `component` field on `ValidationIssue` is optional — use `defaultComponent` fallback when absent
- No circular imports — only import from `../validation/types` and `./types`

## Acceptance Criteria
- `buildValidationSnapshot` merges errors and warnings into a single `issues` array
- `buildValidationSnapshot` sets `valid` directly from `result.valid`
- `filterSnapshotByComponent` returns only issues for the specified component
- `filterSnapshotBySeverity` returns only issues of the specified severity
- `npm run build` passes

## Test Steps
1. Build a `ValidationResult` with 2 errors and 1 warning — call `buildValidationSnapshot` — expect `valid: false` and 3 issues
2. Build a `ValidationResult` with no errors and 1 warning — expect `valid: true` and 1 issue
3. Call `filterSnapshotByComponent` — expect only matching component issues
4. Call `filterSnapshotBySeverity("error")` — expect only error-severity issues
5. Verify a `ValidationIssue` without a `component` field uses the `defaultComponent` fallback
6. Run `npm run build`
