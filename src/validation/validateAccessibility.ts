import type { ValidationResult, ValidationIssue } from "./types"
import {
  LBX_ACCESSIBILITY_MISSING_ARIA,
  LBX_ACCESSIBILITY_FOCUS_REQUIRED,
  LBX_ACCESSIBILITY_KEYBOARD_REQUIRED,
  LBX_ACCESSIBILITY_ROLE_INVALID,
} from "./errorCodes"

export type AriaRequirement = {
  attribute: string
  condition?: "always" | "when-interactive"
}

export type A11yRule = {
  component: string
  requiredAriaAttributes?: AriaRequirement[]
  requiresFocusTrap?: boolean
  requiredKeyboardInteractions?: string[]
  allowedRoles?: string[]
}

export type A11yNode = {
  component: string
  props: Record<string, unknown>
  role?: string
  isInteractive?: boolean
  children?: A11yNode[]
}

export function validateAccessibility(
  tree: A11yNode,
  rules: A11yRule[]
): ValidationResult {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  const ruleMap = new Map(rules.map((r) => [r.component, r]))

  function traverse(node: A11yNode): void {
    const rule = ruleMap.get(node.component)

    if (rule) {
      if (rule.requiredAriaAttributes) {
        for (const req of rule.requiredAriaAttributes) {
          const applies =
            req.condition === "when-interactive" ? node.isInteractive : true
          if (applies && !node.props[req.attribute]) {
            errors.push({
              code: LBX_ACCESSIBILITY_MISSING_ARIA,
              severity: "error",
              message: `"${node.component}" is missing required ARIA attribute "${req.attribute}"`,
              path: req.attribute,
              component: node.component,
            })
          }
        }
      }

      if (rule.requiresFocusTrap && !node.props["data-focus-trap"]) {
        errors.push({
          code: LBX_ACCESSIBILITY_FOCUS_REQUIRED,
          severity: "error",
          message: `"${node.component}" must trap focus (data-focus-trap not set)`,
          component: node.component,
        })
      }

      if (rule.requiredKeyboardInteractions) {
        const declared =
          (node.props["data-keyboard-interactions"] as string[] | undefined) ?? []
        for (const key of rule.requiredKeyboardInteractions) {
          if (!declared.includes(key)) {
            errors.push({
              code: LBX_ACCESSIBILITY_KEYBOARD_REQUIRED,
              severity: "error",
              message: `"${node.component}" must support keyboard interaction "${key}"`,
              component: node.component,
            })
          }
        }
      }

      if (rule.allowedRoles && node.role && !rule.allowedRoles.includes(node.role)) {
        errors.push({
          code: LBX_ACCESSIBILITY_ROLE_INVALID,
          severity: "error",
          message: `"${node.component}" has invalid role "${node.role}". Allowed: ${rule.allowedRoles.join(", ")}`,
          component: node.component,
        })
      }
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(tree)
  return { valid: errors.length === 0, errors, warnings }
}
