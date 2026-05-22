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
  knownComponents?: string[]
}

export function validateMetadata(input: MetadataValidationInput): ValidationResult {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  const { metadata, knownComponents } = input

  if (!metadata.name || metadata.name.trim() === "") {
    errors.push({
      code: LBX_METADATA_INCOMPLETE,
      severity: "error",
      message: `Component metadata is missing required "name" field`,
      component: metadata.name,
    })
    return { valid: false, errors, warnings }
  }

  if (metadata.props) {
    const validTypes = ["string", "number", "boolean", "object", "array"]
    for (const [propName, def] of Object.entries(metadata.props)) {
      if (def.type !== undefined && !validTypes.includes(def.type)) {
        errors.push({
          code: LBX_METADATA_SCHEMA_INVALID,
          severity: "error",
          message: `Prop "${propName}" on "${metadata.name}" has invalid type "${def.type}"`,
          path: `props.${propName}.type`,
          component: metadata.name,
        })
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
