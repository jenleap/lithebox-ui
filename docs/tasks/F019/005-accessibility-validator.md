# Task 005: Accessibility Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement `validateAccessibility` which validates a component tree's accessibility contracts: required ARIA attributes, focus trapping requirements, keyboard navigation rules, and semantic role validity — all derived from declarative rules, not DOM inspection.

## Files
- `src/validation/validateAccessibility.ts` (create)

## Implementation Steps

1. Create `src/validation/validateAccessibility.ts`:

   ```ts
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
     requiredKeyboardInteractions?: string[]    // e.g. ["ArrowDown", "ArrowUp", "Enter", "Escape"]
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
         // ARIA attribute validation
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

         // Focus trap requirement
         if (rule.requiresFocusTrap && !node.props["data-focus-trap"]) {
           errors.push({
             code: LBX_ACCESSIBILITY_FOCUS_REQUIRED,
             severity: "error",
             message: `"${node.component}" must trap focus (data-focus-trap not set)`,
             component: node.component,
           })
         }

         // Keyboard interaction requirements
         if (rule.requiredKeyboardInteractions) {
           const declared = (node.props["data-keyboard-interactions"] as string[] | undefined) ?? []
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

         // Semantic role validation
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
   ```

## Constraints
- Declarative only — must not inspect the DOM or use browser APIs
- Rules derive from the metadata system (passed in as `A11yRule[]`) — no hardcoded component rules
- Pure function — no side effects
- Must traverse entire tree deterministically

## Acceptance Criteria
- Missing required ARIA attributes produce `LBX_ACCESSIBILITY_MISSING_ARIA` errors
- Missing focus trap produces `LBX_ACCESSIBILITY_FOCUS_REQUIRED` errors
- Missing keyboard interactions produce `LBX_ACCESSIBILITY_KEYBOARD_REQUIRED` errors
- Invalid semantic roles produce `LBX_ACCESSIBILITY_ROLE_INVALID` errors
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
`data-focus-trap` and `data-keyboard-interactions` are structural props used by the validator as declaration signals — actual runtime behavior is handled by `src/a11y`. ARIA validation respects the `when-interactive` condition to avoid false positives on decorative components.
