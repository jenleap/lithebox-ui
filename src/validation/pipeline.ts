import type { ValidationResult, ValidationIssue, ValidationMode } from "./types"
import { getRegisteredValidators } from "./registry"

export type PipelineStage = {
  name: string
  run: () => ValidationResult
  developmentOnly?: boolean
}

export type PipelineOptions = {
  mode?: ValidationMode
}

function mergeResults(results: ValidationResult[]): ValidationResult {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  for (const result of results) {
    errors.push(...result.errors)
    warnings.push(...result.warnings)
  }
  return { valid: errors.length === 0, errors, warnings }
}

export function runValidationPipeline(
  stages: PipelineStage[],
  options: PipelineOptions = {}
): ValidationResult {
  const mode = options.mode ?? "development"
  const results: ValidationResult[] = []

  for (const stage of stages) {
    if (stage.developmentOnly && mode === "production") continue

    const result = stage.run()
    results.push(result)

    if (mode === "production" && !result.valid) break
  }

  if (mode === "development") {
    for (const validator of getRegisteredValidators()) {
      results.push(validator(undefined))
    }
  }

  return mergeResults(results)
}

export function createValidationResult(
  errors: ValidationIssue[],
  warnings: ValidationIssue[] = []
): ValidationResult {
  return { valid: errors.length === 0, errors, warnings }
}
