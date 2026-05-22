# Task 003: Composition Validator

## Feature
F019 - Validation & Constraint Engine

## Description
Implement `validateComposition` which validates a component tree's structural correctness: allowed parent-child relationships, forbidden combinations, and max nesting depth.

## Files
- `src/validation/validateComposition.ts` (create)

## Implementation Steps

1. Create `src/validation/validateComposition.ts`:

   ```ts
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
     allowedChildren?: string[]        // if set, only these are valid children
     allowedParents?: string[]         // if set, only these are valid parents
     forbiddenWith?: string[]          // cannot appear alongside these in the same parent
     maxDepth?: number                 // maximum nesting depth from root
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

       // Max depth enforcement
       if (depth > maxDepth) {
         errors.push({
           code: LBX_MAX_DEPTH_EXCEEDED,
           severity: "error",
           message: `Component "${node.component}" exceeds max nesting depth of ${maxDepth}`,
           component: node.component,
         })
         return
       }

       // Per-component depth rule
       if (rule?.maxDepth !== undefined && depth > rule.maxDepth) {
         errors.push({
           code: LBX_MAX_DEPTH_EXCEEDED,
           severity: "error",
           message: `Component "${node.component}" exceeds its allowed depth of ${rule.maxDepth}`,
           component: node.component,
         })
       }

       // Parent validation
       if (rule?.allowedParents && parent !== null && !rule.allowedParents.includes(parent)) {
         errors.push({
           code: LBX_INVALID_PARENT,
           severity: "error",
           message: `"${node.component}" cannot be a child of "${parent}". Allowed parents: ${rule.allowedParents.join(", ")}`,
           component: node.component,
         })
       }

       // Child validation
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

       // Forbidden combination check (siblings)
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
   ```

## Constraints
- Pure function — no side effects, no React runtime dependency
- Traversal must visit entire tree deterministically (depth-first)
- Fails fast on max depth to prevent unbounded recursion
- Must not mutate tree or rules inputs

## Acceptance Criteria
- Invalid child relationships produce `LBX_INVALID_CHILD` errors
- Invalid parent placement produces `LBX_INVALID_PARENT` errors
- Exceeding max depth produces `LBX_MAX_DEPTH_EXCEEDED` errors
- Forbidden sibling combinations produce `LBX_FORBIDDEN_COMBINATION` errors
- `ValidationResult.valid` correctly reflects error state
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 010-unit-tests

## Notes
`forbiddenWith` is checked at the parent level (siblings). The global `maxDepth` parameter defaults to 20 as a safety guard; per-component `maxDepth` in rules is more specific and overrides the global check for that component.
