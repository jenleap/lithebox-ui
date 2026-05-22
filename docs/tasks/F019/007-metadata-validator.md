# Task 007: Metadata Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement `validateMetadata` which validates that a component's metadata definition is internally consistent: required fields are present, prop schemas are complete, slot definitions are coherent, and composition rules do not reference non-existent components.

## Files
- `src/validation/validateMetadata.ts` (create)

## Implementation Steps

1. Create `src/validation/validateMetadata.ts`:

   ```ts
   import type { ValidationResult, ValidationIssue } from "./types"
   import {
     LBX_METADATA_SCHEMA_INVALID,
     LBX_METADATA_INCOMPLETE,
     LBX_METADATA_CONTRACT_MISMATCH,
   } from "./errorCodes"

   export type MetadataPropDefinition = {
     type?: string
     required?: boolean
     allowedValues?: readonly unknown[]
   }

   export type MetadataSlotDefinition = {
     name: string
     required?: boolean
     allowedComponents?: string[]
   }

   export type ComponentMetadataSchema = {
     name: string
     version?: string
     props?: Record<string, MetadataPropDefinition>
     slots?: MetadataSlotDefinition[]
     allowedChildren?: string[]
     allowedParents?: string[]
   }

   export type MetadataValidationInput = {
     metadata: ComponentMetadataSchema
     knownComponents?: string[]   // optional registry to cross-check component references
   }

   export function validateMetadata(input: MetadataValidationInput): ValidationResult {
     const errors: ValidationIssue[] = []
     const warnings: ValidationIssue[] = []
     const { metadata, knownComponents } = input

     // Name is required
     if (!metadata.name || metadata.name.trim() === "") {
       errors.push({
         code: LBX_METADATA_INCOMPLETE,
         severity: "error",
         message: `Component metadata is missing required "name" field`,
         component: metadata.name,
       })
       return { valid: false, errors, warnings }
     }

     // Props schema integrity
     if (metadata.props) {
       for (const [propName, def] of Object.entries(metadata.props)) {
         if (def.type !== undefined) {
           const validTypes = ["string", "number", "boolean", "object", "array"]
           if (!validTypes.includes(def.type)) {
             errors.push({
               code: LBX_METADATA_SCHEMA_INVALID,
               severity: "error",
               message: `Prop "${propName}" on "${metadata.name}" has invalid type "${def.type}"`,
               path: `props.${propName}.type`,
               component: metadata.name,
             })
           }
         }

         if (def.allowedValues !== undefined && !Array.isArray(def.allowedValues)) {
           errors.push({
             code: LBX_METADATA_SCHEMA_INVALID,
             severity: "error",
             message: `Prop "${propName}" on "${metadata.name}" has invalid allowedValues (must be an array)`,
             path: `props.${propName}.allowedValues`,
             component: metadata.name,
           })
         }
       }
     }

     // Slot definition integrity
     if (metadata.slots) {
       const seenSlotNames = new Set<string>()
       for (const slot of metadata.slots) {
         if (!slot.name || slot.name.trim() === "") {
           errors.push({
             code: LBX_METADATA_INCOMPLETE,
             severity: "error",
             message: `A slot on "${metadata.name}" is missing a name`,
             component: metadata.name,
           })
           continue
         }

         if (seenSlotNames.has(slot.name)) {
           errors.push({
             code: LBX_METADATA_SCHEMA_INVALID,
             severity: "error",
             message: `Duplicate slot name "${slot.name}" on "${metadata.name}"`,
             path: `slots.${slot.name}`,
             component: metadata.name,
           })
         }
         seenSlotNames.add(slot.name)
       }
     }

     // Cross-reference checks against known component registry
     if (knownComponents) {
       const known = new Set(knownComponents)

       const checkRefs = (refs: string[] | undefined, field: string) => {
         if (!refs) return
         for (const ref of refs) {
           if (!known.has(ref)) {
             warnings.push({
               code: LBX_METADATA_CONTRACT_MISMATCH,
               severity: "warning",
               message: `"${metadata.name}" references unknown component "${ref}" in ${field}`,
               path: field,
               component: metadata.name,
             })
           }
         }
       }

       checkRefs(metadata.allowedChildren, "allowedChildren")
       checkRefs(metadata.allowedParents, "allowedParents")

       if (metadata.slots) {
         for (const slot of metadata.slots) {
           checkRefs(slot.allowedComponents, `slots.${slot.name}.allowedComponents`)
         }
       }
     }

     return { valid: errors.length === 0, errors, warnings }
   }
   ```

## Constraints
- Pure function — no side effects
- Cross-reference checks against `knownComponents` produce warnings (not errors) — the registry may be partial
- Invalid metadata must block registration (callers are responsible for acting on `valid: false`)
- Must not mutate input metadata

## Acceptance Criteria
- Missing `name` field produces `LBX_METADATA_INCOMPLETE` error and early returns
- Invalid prop `type` string produces `LBX_METADATA_SCHEMA_INVALID` error
- Non-array `allowedValues` produces `LBX_METADATA_SCHEMA_INVALID` error
- Duplicate slot names produce `LBX_METADATA_SCHEMA_INVALID` error
- Unknown component references produce `LBX_METADATA_CONTRACT_MISMATCH` warnings (not errors)
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
Unknown component cross-references are warnings (not errors) because the registry may be built incrementally. The validator's job is to flag the inconsistency, not block the entire system — callers decide how to handle warnings.
