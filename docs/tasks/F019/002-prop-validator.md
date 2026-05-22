# Task 002: Prop Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement the `validateProps` function that validates a component's props against its metadata schema. Covers required prop enforcement, type checking, enum/variant validation, and unknown prop warnings.

## Files
- `src/validation/validateProps.ts` (create)

## Implementation Steps

1. Create `src/validation/validateProps.ts`:

   ```ts
   import type { ValidationResult, ValidationIssue } from "./types"
   import {
     LBX_PROP_REQUIRED,
     LBX_INVALID_VARIANT,
     LBX_INVALID_PROP_TYPE,
     LBX_UNKNOWN_PROP,
   } from "./errorCodes"

   export type PropSchema = {
     required?: boolean
     type?: "string" | "number" | "boolean" | "object" | "array"
     allowedValues?: readonly unknown[]
   }

   export type ComponentPropSchema = {
     componentName: string
     props: Record<string, PropSchema>
   }

   export function validateProps(
     schema: ComponentPropSchema,
     props: Record<string, unknown>
   ): ValidationResult {
     const errors: ValidationIssue[] = []
     const warnings: ValidationIssue[] = []

     // Required prop enforcement
     for (const [key, def] of Object.entries(schema.props)) {
       if (def.required && (props[key] === undefined || props[key] === null)) {
         errors.push({
           code: LBX_PROP_REQUIRED,
           severity: "error",
           message: `Prop "${key}" is required on ${schema.componentName}`,
           path: key,
           component: schema.componentName,
         })
       }
     }

     for (const [key, value] of Object.entries(props)) {
       const def = schema.props[key]

       // Unknown prop warning
       if (!def) {
         warnings.push({
           code: LBX_UNKNOWN_PROP,
           severity: "warning",
           message: `Unknown prop "${key}" on ${schema.componentName}`,
           path: key,
           component: schema.componentName,
         })
         continue
       }

       // Type validation
       if (def.type !== undefined && value !== undefined && value !== null) {
         const actual = Array.isArray(value) ? "array" : typeof value
         if (actual !== def.type) {
           errors.push({
             code: LBX_INVALID_PROP_TYPE,
             severity: "error",
             message: `Prop "${key}" on ${schema.componentName} must be of type "${def.type}", got "${actual}"`,
             path: key,
             component: schema.componentName,
           })
         }
       }

       // Enum / variant validation
       if (def.allowedValues !== undefined && value !== undefined && value !== null) {
         if (!def.allowedValues.includes(value)) {
           errors.push({
             code: LBX_INVALID_VARIANT,
             severity: "error",
             message: `Prop "${key}" on ${schema.componentName} has invalid value "${String(value)}". Allowed: ${def.allowedValues.map(String).join(", ")}`,
             path: key,
             component: schema.componentName,
           })
         }
       }
     }

     return { valid: errors.length === 0, errors, warnings }
   }
   ```

## Constraints
- Pure function — no side effects, no React dependencies
- Must not mutate input props or schema
- Type detection uses `typeof` + Array check — no complex runtime reflection
- Unknown props produce warnings (not errors) per spec

## Acceptance Criteria
- `validateProps` correctly flags missing required props with `LBX_PROP_REQUIRED`
- `validateProps` correctly flags wrong types with `LBX_INVALID_PROP_TYPE`
- `validateProps` correctly flags invalid enum values with `LBX_INVALID_VARIANT`
- Unknown props produce `LBX_UNKNOWN_PROP` warnings (not errors)
- `ValidationResult.valid` is `false` when errors exist, `true` when only warnings
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests will be added in task 010-unit-tests

## Notes
`allowedValues` handles both variant strings and boolean flags. The type check is skipped for `undefined`/`null` values to avoid conflating missing prop with wrong type — required enforcement covers the missing case separately.
