import type { ValidationResult, ValidationIssue } from "./types"
import {
  LBX_INVALID_CHILD,
  LBX_INVALID_PARENT,
  LBX_MAX_DEPTH_EXCEEDED,
  LBX_FORBIDDEN_COMBINATION,
} from "./errorCodes"

export type CompositionNode = {
  component: string
  children?: CompositionNode[]
}

export type CompositionRule = {
  component: string
  allowedChildren?: string[]
  allowedParents?: string[]
  forbiddenWith?: string[]
  maxDepth?: number
}

export function validateComposition(
  tree: CompositionNode,
  rules: CompositionRule[],
  maxDepth = 20
): ValidationResult {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  const ruleMap = new Map(rules.map((r) => [r.component, r]))

  function traverse(node: CompositionNode, parent: string | null, depth: number): void {
    const rule = ruleMap.get(node.component)

    if (depth > maxDepth) {
      errors.push({
        code: LBX_MAX_DEPTH_EXCEEDED,
        severity: "error",
        message: `Component "${node.component}" exceeds max nesting depth of ${maxDepth}`,
        component: node.component,
      })
      return
    }

    if (rule?.maxDepth !== undefined && depth > rule.maxDepth) {
      errors.push({
        code: LBX_MAX_DEPTH_EXCEEDED,
        severity: "error",
        message: `Component "${node.component}" exceeds its allowed depth of ${rule.maxDepth}`,
        component: node.component,
      })
    }

    if (rule?.allowedParents && parent !== null && !rule.allowedParents.includes(parent)) {
      errors.push({
        code: LBX_INVALID_PARENT,
        severity: "error",
        message: `"${node.component}" cannot be a child of "${parent}". Allowed parents: ${rule.allowedParents.join(", ")}`,
        component: node.component,
      })
    }

    if (rule?.allowedChildren && node.children) {
      for (const child of node.children) {
        if (!rule.allowedChildren.includes(child.component)) {
          errors.push({
            code: LBX_INVALID_CHILD,
            severity: "error",
            message: `"${node.component}" does not allow child "${child.component}". Allowed: ${rule.allowedChildren.join(", ")}`,
            component: node.component,
          })
        }
      }
    }

    if (rule?.forbiddenWith && node.children) {
      const childNames = node.children.map((c) => c.component)
      for (const forbidden of rule.forbiddenWith) {
        if (childNames.includes(node.component) && childNames.includes(forbidden)) {
          errors.push({
            code: LBX_FORBIDDEN_COMBINATION,
            severity: "error",
            message: `"${node.component}" and "${forbidden}" cannot appear together`,
            component: node.component,
          })
        }
      }
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child, node.component, depth + 1)
      }
    }
  }

  traverse(tree, null, 0)
  return { valid: errors.length === 0, errors, warnings }
}
