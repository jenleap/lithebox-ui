# Task 007: Change Classification System

## Feature
F021 - Design System Governance Layer

## Description
Implement the change classification system. Given a `SystemChange`, determine whether it is `safe`, `sensitive`, or `breaking` based on configurable classification rules.

## Files
- `src/governance/changeClassification.ts` (create)

## Implementation Steps

1. Create `src/governance/changeClassification.ts`:

   ```ts
   import type { ChangeClassification, SystemChange, GovernanceScope } from "./types"

   export type ClassificationRule = {
     id: string
     description: string
     applies: (change: SystemChange) => boolean
     classification: ChangeClassification
   }

   const _classificationRules: ClassificationRule[] = []

   export function registerClassificationRule(rule: ClassificationRule): void {
     _classificationRules.push(rule)
   }

   export function getClassificationRules(): readonly ClassificationRule[] {
     return _classificationRules
   }

   export function classifyChange(change: SystemChange): ChangeClassification {
     const matched: ChangeClassification[] = []
     for (const rule of _classificationRules) {
       if (rule.applies(change)) {
         matched.push(rule.classification)
       }
     }
     if (matched.includes("breaking")) return "breaking"
     if (matched.includes("sensitive")) return "sensitive"
     return "safe"
   }

   export function classifyChanges(changes: SystemChange[]): Map<string, ChangeClassification> {
     const result = new Map<string, ChangeClassification>()
     for (const change of changes) {
       result.set(change.id, classifyChange(change))
     }
     return result
   }

   export function clearClassificationRules(): void {
     _classificationRules.length = 0
   }

   export function registerDefaultClassificationRules(): void {
     registerClassificationRule({
       id: "breaking-token-removal",
       description: "Removing a token is a breaking change",
       applies: change => change.scope === "token" && change.description.startsWith("remove"),
       classification: "breaking",
     })
     registerClassificationRule({
       id: "breaking-contract-prop-removal",
       description: "Removing a contract prop is a breaking change",
       applies: change => change.scope === "contract" && change.description.startsWith("remove"),
       classification: "breaking",
     })
     registerClassificationRule({
       id: "sensitive-metadata-update",
       description: "Updating metadata is a sensitive change",
       applies: change => change.scope === "metadata" && change.description.startsWith("update"),
       classification: "sensitive",
     })
   }
   ```

## Constraints
- `classifyChange` is deterministic — highest severity classification wins (`breaking` > `sensitive` > `safe`)
- Default classification is `safe` when no rules match
- No imports from outside `src/governance/`

## Acceptance Criteria
- `classifyChange` returns `"breaking"` when any matching rule classifies it as breaking
- `classifyChange` returns `"sensitive"` when no breaking rule matches but a sensitive rule does
- `classifyChange` returns `"safe"` when no rules match
- `classifyChanges` maps all changes by id to their classification
- `registerDefaultClassificationRules` registers the three built-in rules
- `npm run build` passes

## Test Steps
1. Register a rule that marks scope `"token"` as `"breaking"` — classify a token change — expect `"breaking"`
2. Register a sensitive rule and a breaking rule — the breaking rule should win
3. Classify a change with no matching rules — expect `"safe"`
4. Run `npm run build`
