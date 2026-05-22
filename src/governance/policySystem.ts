import type { GovernancePolicy, GovernanceViolation, PolicyCategory } from "./types"

export type RegisteredPolicy = {
  policy: GovernancePolicy
  category: PolicyCategory
}

const _policies: RegisteredPolicy[] = []

export function registerGovernancePolicy(
  policy: GovernancePolicy,
  category: PolicyCategory
): void {
  _policies.push({ policy, category })
}

export function getPoliciesByCategory(category: PolicyCategory): GovernancePolicy[] {
  return _policies.filter(p => p.category === category).map(p => p.policy)
}

export function getAllPolicies(): readonly RegisteredPolicy[] {
  return _policies
}

export function evaluatePolicy(
  policy: GovernancePolicy,
  input: unknown
): GovernanceViolation[] {
  const violations: GovernanceViolation[] = []
  for (const rule of policy.rules) {
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

export function evaluatePoliciesByCategory(
  category: PolicyCategory,
  input: unknown
): GovernanceViolation[] {
  const policies = getPoliciesByCategory(category)
  const violations: GovernanceViolation[] = []
  for (const policy of policies) {
    violations.push(...evaluatePolicy(policy, input))
  }
  return violations
}

export function clearPolicyRegistry(): void {
  _policies.length = 0
}
