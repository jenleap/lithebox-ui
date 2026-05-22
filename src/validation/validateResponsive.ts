import type { ValidationResult, ValidationIssue } from "./types"
import {
  LBX_RESPONSIVE_RULE_MISSING,
  LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
} from "./errorCodes"

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl"

export type ResponsiveRule = {
  component: string
  requiredBreakpoints?: BreakpointKey[]
  forbiddenTransformations?: string[]
  requiresFallback?: boolean
}

export type ResponsiveContract = {
  component: string
  breakpoints: Partial<Record<BreakpointKey, Record<string, unknown>>>
  hasFallback?: boolean
  appliedTransformations?: string[]
}

export function validateResponsive(
  contracts: ResponsiveContract[],
  rules: ResponsiveRule[]
): ValidationResult {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  const contractMap = new Map(contracts.map((c) => [c.component, c]))

  for (const rule of rules) {
    const contract = contractMap.get(rule.component)

    if (!contract) {
      errors.push({
        code: LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
        severity: "error",
        message: `"${rule.component}" has responsive rules but no responsive contract defined`,
        component: rule.component,
      })
      continue
    }

    if (rule.requiredBreakpoints) {
      for (const bp of rule.requiredBreakpoints) {
        if (!contract.breakpoints[bp]) {
          errors.push({
            code: LBX_RESPONSIVE_RULE_MISSING,
            severity: "error",
            message: `"${rule.component}" is missing required breakpoint definition for "${bp}"`,
            path: bp,
            component: rule.component,
          })
        }
      }
    }

    if (rule.requiresFallback && !contract.hasFallback) {
      errors.push({
        code: LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
        severity: "error",
        message: `"${rule.component}" must define a fallback behavior when collapsed/hidden`,
        component: rule.component,
      })
    }

    if (rule.forbiddenTransformations && contract.appliedTransformations) {
      for (const forbidden of rule.forbiddenTransformations) {
        if (contract.appliedTransformations.includes(forbidden)) {
          errors.push({
            code: LBX_RESPONSIVE_RULE_MISSING,
            severity: "error",
            message: `"${rule.component}" applies forbidden transformation "${forbidden}"`,
            component: rule.component,
          })
        }
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}
