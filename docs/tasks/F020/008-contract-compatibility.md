# Task 008: Contract Compatibility Validator

## Feature
F020 - Versioning & Migration System

## Description
Implement contract compatibility validation. Checks whether a component contract has changed in a breaking way — covering required props added, props removed, slots removed, and allowed children removed.

## Files
- `src/versioning/contractCompatibility.ts` (create)

## Implementation Steps

1. Create `src/versioning/contractCompatibility.ts`:

   ```ts
   import type { CompatibilityReport, CompatibilityIssue } from "./types"

   export type PropSnapshot = {
     name: string
     required: boolean
   }

   export type ContractSnapshot = {
     props: PropSnapshot[]
     slots: string[]
     allowedChildren: string[]
   }

   export function validateContractCompatibility(
     previous: ContractSnapshot,
     current: ContractSnapshot
   ): CompatibilityReport {
     const issues: CompatibilityIssue[] = []

     // Props: removed prop is breaking; newly required prop is breaking
     const currentPropMap = new Map(current.props.map((p) => [p.name, p]))
     for (const prev of previous.props) {
       const curr = currentPropMap.get(prev.name)
       if (!curr) {
         issues.push({
           code: "LBX_CONTRACT_PROP_REMOVED",
           severity: "error",
           message: `Prop "${prev.name}" was removed. This is a breaking change.`,
           layer: "contracts",
         })
       }
     }

     for (const curr of current.props) {
       const prevProp = previous.props.find((p) => p.name === curr.name)
       if (!prevProp && curr.required) {
         issues.push({
           code: "LBX_CONTRACT_PROP_REQUIRED_ADDED",
           severity: "error",
           message: `Prop "${curr.name}" was added as required. This is a breaking change.`,
           layer: "contracts",
         })
       }
     }

     // Slots: removed slot is breaking
     const currentSlots = new Set(current.slots)
     for (const slot of previous.slots) {
       if (!currentSlots.has(slot)) {
         issues.push({
           code: "LBX_CONTRACT_SLOT_REMOVED",
           severity: "error",
           message: `Slot "${slot}" was removed. This is a breaking change.`,
           layer: "contracts",
         })
       }
     }

     // Allowed children: removed child type is breaking
     const currentChildren = new Set(current.allowedChildren)
     for (const child of previous.allowedChildren) {
       if (!currentChildren.has(child)) {
         issues.push({
           code: "LBX_CONTRACT_CHILD_REMOVED",
           severity: "error",
           message: `Allowed child "${child}" was removed. This is a breaking change.`,
           layer: "contracts",
         })
       }
     }

     const errors = issues.filter((i) => i.severity === "error")
     return { compatible: errors.length === 0, issues }
   }
   ```

## Constraints
- Function must be pure — no imports from `src/contracts`
- `ContractSnapshot` is a plain data shape, not coupled to live contract types
- All detected changes are `"error"` severity (all are breaking per the spec)
- Additive changes (new optional prop, new slot, new allowed child) are not flagged

## Acceptance Criteria
- Flags removed props as `"error"`
- Flags newly required props as `"error"`
- Flags removed slots as `"error"`
- Flags removed allowed children as `"error"`
- Does not flag additive changes (new optional prop, new slot, new allowed child)
- Returns `{ compatible: true, issues: [] }` when no breaking changes detected
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
`ContractSnapshot` is a plain data transfer shape intentionally decoupled from the live contract types in `src/contracts`. Callers are responsible for mapping live contracts into snapshots before calling this validator.
