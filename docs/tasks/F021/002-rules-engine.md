# Task 002: Governance Rules Engine

## Feature
F021 - Design System Governance Layer

## Description
Implement the governance rules engine: a registry for `GovernanceRule` entries and a runner that executes rules against an input and emits violations. Rules must be deterministic and composable.

## Files
- `src/governance/rulesEngine.ts` (create)

## Implementation Steps

1. Create `src/governance/rulesEngine.ts`:

   ```ts
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
   ```

## Constraints
- Rules are module-level — no class instances
- `runGovernanceRules` is pure relative to registered state
- No imports from outside `src/governance/`

## Acceptance Criteria
- `registerGovernanceRule` appends to the registry
- `getRulesByScope` filters correctly by scope
- `runGovernanceRules` returns a violation for each rule whose `validate` returns `false`
- `clearGovernanceRules` empties the registry
- `npm run build` passes

## Test Steps
1. Register a rule with `validate: () => false` for scope `"token"`
2. Call `runGovernanceRules("token", {})` — expect one violation matching the rule
3. Register a rule with `validate: () => true` — expect no violation emitted for it
4. Run `npm run build`
