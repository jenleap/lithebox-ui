# Task 008: Validation Pipeline, Modes & Extensibility

## Feature
F019 - Validation & Constraint Engine

## Description
Implement the validation pipeline that assembles all validators into a deterministic ordered execution chain, adds dev/prod mode support, and provides a validator registry for external extensions.

## Files
- `src/validation/pipeline.ts` (create)
- `src/validation/registry.ts` (create)

## Implementation Steps

1. Create `src/validation/registry.ts`:

   ```ts
   import type { Validator } from "./types"

   const _registry: Validator[] = []

   export function registerValidator(validator: Validator): void {
     _registry.push(validator)
   }

   export function getRegisteredValidators(): readonly Validator[] {
     return _registry
   }

   export function clearValidatorRegistry(): void {
     _registry.length = 0
   }
   ```

2. Create `src/validation/pipeline.ts`:

   ```ts
   import type { ValidationResult, ValidationIssue, ValidationMode } from "./types"
   import { getRegisteredValidators } from "./registry"

   export type PipelineStage = {
     name: string
     run: () => ValidationResult
     productionOnly?: false   // if true, skipped in production mode
     developmentOnly?: boolean // if true, only runs in development mode
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
       // Skip development-only stages in production
       if (stage.developmentOnly && mode === "production") continue

       const result = stage.run()
       results.push(result)

       // In production mode, stop pipeline on first error for performance
       if (mode === "production" && !result.valid) break
     }

     // Run external validators (development mode only)
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
   ```

## Constraints
- `runValidationPipeline` must execute stages in the declared order (deterministic)
- External registered validators run in development mode only (per spec: production is lightweight)
- Pipeline must not mutate stage inputs
- `clearValidatorRegistry` is provided for test isolation only — not for production use

## Acceptance Criteria
- Stages execute in declared order
- `developmentOnly` stages are skipped in production mode
- Production mode stops on first failing stage (lightweight execution)
- External validators from the registry run in development mode
- Merged `ValidationResult` aggregates all errors and warnings
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
The pipeline is stage-based rather than function-composition-based so each stage can carry metadata (name, mode flags) for diagnostics. `createValidationResult` is a utility for building results inside inline stages without needing to import all validator modules.
