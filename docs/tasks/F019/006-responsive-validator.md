# Task 006: Responsive Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement `validateResponsive` which statically validates responsive contract completeness and breakpoint rule integrity — without relying on viewport or browser APIs.

## Files
- `src/validation/validateResponsive.ts` (create)

## Implementation Steps

1. Create `src/validation/validateResponsive.ts`:

   ```ts
   import type { ValidationResult, ValidationIssue } from "./types"
   import {
     LBX_RESPONSIVE_RULE_MISSING,
     LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
   } from "./errorCodes"

   export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl"

   export type ResponsiveRule = {
     component: string
     requiredBreakpoints?: BreakpointKey[]   // breakpoints that must be defined
     forbiddenTransformations?: string[]      // named transformations that are not allowed
     requiresFallback?: boolean              // must define behavior when hidden/collapsed
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
     const ruleMap = new Map(rules.map((r) => [r.component, r]))
     const contractMap = new Map(contracts.map((c) => [c.component, c]))

     for (const rule of rules) {
       const contract = contractMap.get(rule.component)

       // Component with responsive rules must have a contract
       if (!contract) {
         errors.push({
           code: LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
           severity: "error",
           message: `"${rule.component}" has responsive rules but no responsive contract defined`,
           component: rule.component,
         })
         continue
       }

       // Required breakpoints check
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

       // Fallback requirement
       if (rule.requiresFallback && !contract.hasFallback) {
         errors.push({
           code: LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
           severity: "error",
           message: `"${rule.component}" must define a fallback behavior when collapsed/hidden`,
           component: rule.component,
         })
       }

       // Forbidden transformation check
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
   ```

## Constraints
- No viewport or browser APIs — static analysis only
- Pure function — no side effects
- Rules are passed in as data; no hardcoded component names
- Must handle components with rules but no contracts (error) and contracts with no rules (no-op)

## Acceptance Criteria
- Missing required breakpoint produces `LBX_RESPONSIVE_RULE_MISSING` errors
- Missing contract for a rule-bound component produces `LBX_RESPONSIVE_CONTRACT_INCOMPLETE` errors
- Missing fallback produces `LBX_RESPONSIVE_CONTRACT_INCOMPLETE` errors
- Forbidden transformations produce `LBX_RESPONSIVE_RULE_MISSING` errors
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
Responsive validation is intentionally static — it checks declared contracts, not runtime behavior. Components that define no responsive rules and have no contract are not validated (no-op), ensuring opt-in behavior.
