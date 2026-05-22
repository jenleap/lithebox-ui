# Task 006: Governance Policy System

## Feature
F021 - Design System Governance Layer

## Description
Implement the governance policy system: a registry for `GovernancePolicy` entries, policy lookup by category, and a policy runner that evaluates all rules within a policy against an input.

## Files
- `src/governance/policySystem.ts` (create)

## Implementation Steps

1. Create `src/governance/policySystem.ts`:

   ```ts
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
   ```

## Constraints
- Registry is module-level — no class instances
- `evaluatePolicy` is a pure function given registered state
- No imports from outside `src/governance/`

## Acceptance Criteria
- `registerGovernancePolicy` appends to the registry with its category
- `getPoliciesByCategory` returns only policies matching the given category
- `evaluatePolicy` emits violations for each failing rule in the policy
- `evaluatePoliciesByCategory` aggregates violations across all policies in a category
- `clearPolicyRegistry` empties the registry
- `npm run build` passes

## Test Steps
1. Register a `structural` policy with a failing rule — call `evaluatePoliciesByCategory("structural", {})` — expect a violation
2. Register a `semantic` policy with a passing rule — expect no violation
3. Call `getPoliciesByCategory` for an unregistered category — expect empty array
4. Run `npm run build`
