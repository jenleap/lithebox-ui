# Task 001: Validation Types & Error Codes

## Feature
F019 - Validation & Constraint Engine

## Description
Define all TypeScript types and error code constants for the validation engine. These form the shared contract for all F019 modules and must exist before any validator is implemented.

## Files
- `src/validation/types.ts` (create)
- `src/validation/errorCodes.ts` (create)

## Implementation Steps

1. Create `src/validation/types.ts`:

   ```ts
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
   ```

2. Create `src/validation/errorCodes.ts`:

   ```ts
   // Prop validation
   export const LBX_PROP_REQUIRED = "LBX_PROP_REQUIRED"
   export const LBX_INVALID_VARIANT = "LBX_INVALID_VARIANT"
   export const LBX_INVALID_PROP_TYPE = "LBX_INVALID_PROP_TYPE"
   export const LBX_UNKNOWN_PROP = "LBX_UNKNOWN_PROP"

   // Composition validation
   export const LBX_INVALID_CHILD = "LBX_INVALID_CHILD"
   export const LBX_INVALID_PARENT = "LBX_INVALID_PARENT"
   export const LBX_MAX_DEPTH_EXCEEDED = "LBX_MAX_DEPTH_EXCEEDED"
   export const LBX_FORBIDDEN_COMBINATION = "LBX_FORBIDDEN_COMBINATION"

   // Slot validation
   export const LBX_SLOT_REQUIRED = "LBX_SLOT_REQUIRED"
   export const LBX_INVALID_SLOT_CHILD = "LBX_INVALID_SLOT_CHILD"
   export const LBX_SLOT_CARDINALITY = "LBX_SLOT_CARDINALITY"

   // Accessibility validation
   export const LBX_ACCESSIBILITY_MISSING_ARIA = "LBX_ACCESSIBILITY_MISSING_ARIA"
   export const LBX_ACCESSIBILITY_FOCUS_REQUIRED = "LBX_ACCESSIBILITY_FOCUS_REQUIRED"
   export const LBX_ACCESSIBILITY_KEYBOARD_REQUIRED = "LBX_ACCESSIBILITY_KEYBOARD_REQUIRED"
   export const LBX_ACCESSIBILITY_ROLE_INVALID = "LBX_ACCESSIBILITY_ROLE_INVALID"

   // Responsive validation
   export const LBX_RESPONSIVE_RULE_MISSING = "LBX_RESPONSIVE_RULE_MISSING"
   export const LBX_RESPONSIVE_CONTRACT_INCOMPLETE = "LBX_RESPONSIVE_CONTRACT_INCOMPLETE"

   // Metadata validation
   export const LBX_METADATA_SCHEMA_INVALID = "LBX_METADATA_SCHEMA_INVALID"
   export const LBX_METADATA_INCOMPLETE = "LBX_METADATA_INCOMPLETE"
   export const LBX_METADATA_CONTRACT_MISMATCH = "LBX_METADATA_CONTRACT_MISMATCH"
   ```

## Constraints
- No runtime code — types and constants only
- No imports from other project files — leaf-level module (no circular deps)
- Error codes must use `LBX_` prefix and remain stable across versions
- `ValidationResult.valid` must be `true` only when `errors` array is empty

## Acceptance Criteria
- `src/validation/types.ts` exports: `ValidationSeverity`, `ValidationIssue`, `ValidationResult`, `Validator`, `ValidationMode`
- `src/validation/errorCodes.ts` exports all 18 error code constants
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
`valid: boolean` is derived — it is `true` only when `errors.length === 0`. Warnings do not affect validity. Error codes are string constants (not an enum) so they can be tree-shaken and remain serializable.
