import type { ValidationResult, ValidationIssue } from "./types"
import {
  LBX_SLOT_REQUIRED,
  LBX_INVALID_SLOT_CHILD,
  LBX_SLOT_CARDINALITY,
} from "./errorCodes"

export type SlotDefinition = {
  name: string
  required?: boolean
  allowedComponents?: string[]
  maxItems?: number
  minItems?: number
}

export type SlotAssignment = {
  slotName: string
  children: string[]
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

    if (def.maxItems !== undefined && children.length > def.maxItems) {
      errors.push({
        code: LBX_SLOT_CARDINALITY,
        severity: "error",
        message: `Slot "${def.name}" on "${input.componentName}" allows at most ${def.maxItems} child(ren), got ${children.length}`,
        path: def.name,
        component: input.componentName,
      })
    }

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
