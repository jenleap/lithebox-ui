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
