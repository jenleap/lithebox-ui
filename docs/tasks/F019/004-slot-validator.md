# Task 004: Slot Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement `validateSlots` which validates that component slot assignments are structurally correct: required slots are filled, only allowed components are placed in each slot, and slot cardinality rules are respected.

## Files
- `src/validation/validateSlots.ts` (create)

## Implementation Steps

1. Create `src/validation/validateSlots.ts`:

   ```ts
   import type { ValidationResult, ValidationIssue } from "./types"
   import {
     LBX_SLOT_REQUIRED,
     LBX_INVALID_SLOT_CHILD,
     LBX_SLOT_CARDINALITY,
   } from "./errorCodes"

   export type SlotDefinition = {
     name: string
     required?: boolean
     allowedComponents?: string[]   // if set, only these components are valid
     maxItems?: number              // max number of children in this slot
     minItems?: number              // min number of children (defaults to required ? 1 : 0)
   }

   export type SlotAssignment = {
     slotName: string
     children: string[]            // component names placed in this slot
   }

   export type SlotValidationInput = {
     componentName: string
     slotDefinitions: SlotDefinition[]
     assignments: SlotAssignment[]
   }

   export function validateSlots(input: SlotValidationInput): ValidationResult {
     const errors: ValidationIssue[] = []
     const warnings: ValidationIssue[] = []

     const assignmentMap = new Map(
       input.assignments.map((a) => [a.slotName, a.children])
     )

     for (const def of input.slotDefinitions) {
       const children = assignmentMap.get(def.name) ?? []

       // Required slot enforcement
       if (def.required && children.length === 0) {
         errors.push({
           code: LBX_SLOT_REQUIRED,
           severity: "error",
           message: `Slot "${def.name}" on "${input.componentName}" is required but has no children`,
           path: def.name,
           component: input.componentName,
         })
         continue
       }

       // Min items enforcement
       const minItems = def.minItems ?? (def.required ? 1 : 0)
       if (children.length < minItems) {
         errors.push({
           code: LBX_SLOT_CARDINALITY,
           severity: "error",
           message: `Slot "${def.name}" on "${input.componentName}" requires at least ${minItems} child(ren), got ${children.length}`,
           path: def.name,
           component: input.componentName,
         })
       }

       // Max items enforcement
       if (def.maxItems !== undefined && children.length > def.maxItems) {
         errors.push({
           code: LBX_SLOT_CARDINALITY,
           severity: "error",
           message: `Slot "${def.name}" on "${input.componentName}" allows at most ${def.maxItems} child(ren), got ${children.length}`,
           path: def.name,
           component: input.componentName,
         })
       }

       // Allowed component enforcement
       if (def.allowedComponents) {
         for (const child of children) {
           if (!def.allowedComponents.includes(child)) {
             errors.push({
               code: LBX_INVALID_SLOT_CHILD,
               severity: "error",
               message: `"${child}" is not allowed in slot "${def.name}" on "${input.componentName}". Allowed: ${def.allowedComponents.join(", ")}`,
               path: `${def.name}.${child}`,
               component: input.componentName,
             })
           }
         }
       }
     }

     return { valid: errors.length === 0, errors, warnings }
   }
   ```

## Constraints
- Pure function — no side effects, no React dependency
- Slot validation runs after composition validation (per pipeline order in spec)
- Missing optional slots produce no error
- Must not mutate inputs

## Acceptance Criteria
- Missing required slots produce `LBX_SLOT_REQUIRED` errors
- Out-of-range cardinality produces `LBX_SLOT_CARDINALITY` errors
- Disallowed slot children produce `LBX_INVALID_SLOT_CHILD` errors
- Optional empty slots produce no errors or warnings
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
`minItems` defaults to 1 when `required: true`, 0 otherwise, making `required` a convenience alias for `minItems: 1`. Slot validation only checks structural names — it does not re-validate prop contracts for slotted children (that is prop-validator's responsibility).
