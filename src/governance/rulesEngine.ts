import type { GovernanceRule, GovernanceScope, GovernanceViolation } from "./types"

const _rules: GovernanceRule[] = []

export function registerGovernanceRule(rule: GovernanceRule): void {
  _rules.push(rule)
}

export function getGovernanceRules(): readonly GovernanceRule[] {
  return _rules
}

export function getRulesByScope(scope: GovernanceScope): GovernanceRule[] {
  return _rules.filter(r => r.scope === scope)
}

export function runGovernanceRules(
  scope: GovernanceScope,
  input: unknown
): GovernanceViolation[] {
  const rules = getRulesByScope(scope)
  const violations: GovernanceViolation[] = []
  for (const rule of rules) {
    if (!rule.validate(input)) {
      violations.push({
        ruleId: rule.id,
        scope: rule.scope,
        severity: rule.severity,
        message: rule.description,
      })
    }
  }
  return violations
}

export function clearGovernanceRules(): void {
  _rules.length = 0
}
