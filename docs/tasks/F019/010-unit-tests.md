# Task 010: Unit Tests

## Feature
F019 - Validation & Constraint Engine

## Description
Write unit tests for all validation engine modules: prop validator, composition validator, slot validator, accessibility validator, responsive validator, metadata validator, and the pipeline/registry.

## Files
- `src/validation/__tests__/validateProps.test.ts` (create)
- `src/validation/__tests__/validateComposition.test.ts` (create)
- `src/validation/__tests__/validateSlots.test.ts` (create)
- `src/validation/__tests__/validateAccessibility.test.ts` (create)
- `src/validation/__tests__/validateResponsive.test.ts` (create)
- `src/validation/__tests__/validateMetadata.test.ts` (create)
- `src/validation/__tests__/pipeline.test.ts` (create)

## Implementation Steps

1. Create `src/validation/__tests__/validateProps.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateProps } from "../validateProps"
   import { LBX_PROP_REQUIRED, LBX_INVALID_VARIANT, LBX_INVALID_PROP_TYPE, LBX_UNKNOWN_PROP } from "../errorCodes"

   const schema = {
     componentName: "Button",
     props: {
       label: { required: true, type: "string" as const },
       variant: { allowedValues: ["primary", "secondary"] as const },
       disabled: { type: "boolean" as const },
     },
   }

   describe("validateProps", () => {
     it("returns valid when all required props are present", () => {
       const result = validateProps(schema, { label: "Click me" })
       expect(result.valid).toBe(true)
       expect(result.errors).toHaveLength(0)
     })

     it("errors on missing required prop", () => {
       const result = validateProps(schema, {})
       expect(result.valid).toBe(false)
       expect(result.errors[0].code).toBe(LBX_PROP_REQUIRED)
     })

     it("errors on invalid variant", () => {
       const result = validateProps(schema, { label: "x", variant: "ghost" })
       expect(result.valid).toBe(false)
       expect(result.errors.some((e) => e.code === LBX_INVALID_VARIANT)).toBe(true)
     })

     it("errors on wrong prop type", () => {
       const result = validateProps(schema, { label: "x", disabled: "yes" })
       expect(result.valid).toBe(false)
       expect(result.errors.some((e) => e.code === LBX_INVALID_PROP_TYPE)).toBe(true)
     })

     it("warns on unknown prop", () => {
       const result = validateProps(schema, { label: "x", mystery: true })
       expect(result.valid).toBe(true)
       expect(result.warnings.some((w) => w.code === LBX_UNKNOWN_PROP)).toBe(true)
     })
   })
   ```

2. Create `src/validation/__tests__/validateComposition.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateComposition } from "../validateComposition"
   import { LBX_INVALID_CHILD, LBX_INVALID_PARENT, LBX_MAX_DEPTH_EXCEEDED } from "../errorCodes"

   const rules = [
     { component: "ButtonGroup", allowedChildren: ["Button"] },
     { component: "Button", allowedParents: ["ButtonGroup", "Toolbar"] },
   ]

   describe("validateComposition", () => {
     it("returns valid for correct parent-child", () => {
       const tree = { component: "ButtonGroup", children: [{ component: "Button" }] }
       expect(validateComposition(tree, rules).valid).toBe(true)
     })

     it("errors on invalid child", () => {
       const tree = { component: "ButtonGroup", children: [{ component: "Icon" }] }
       const result = validateComposition(tree, rules)
       expect(result.valid).toBe(false)
       expect(result.errors[0].code).toBe(LBX_INVALID_CHILD)
     })

     it("errors on invalid parent", () => {
       const tree = { component: "Modal", children: [{ component: "Button" }] }
       const result = validateComposition(tree, rules)
       expect(result.valid).toBe(false)
       expect(result.errors[0].code).toBe(LBX_INVALID_PARENT)
     })

     it("errors when max depth exceeded", () => {
       const deep = (depth: number): { component: string; children?: { component: string; children?: unknown[] }[] } =>
         depth === 0 ? { component: "Leaf" } : { component: "Wrapper", children: [deep(depth - 1)] }
       const result = validateComposition(deep(25) as Parameters<typeof validateComposition>[0], [], 5)
       expect(result.errors.some((e) => e.code === LBX_MAX_DEPTH_EXCEEDED)).toBe(true)
     })
   })
   ```

3. Create `src/validation/__tests__/validateSlots.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateSlots } from "../validateSlots"
   import { LBX_SLOT_REQUIRED, LBX_INVALID_SLOT_CHILD, LBX_SLOT_CARDINALITY } from "../errorCodes"

   describe("validateSlots", () => {
     const input = {
       componentName: "Card",
       slotDefinitions: [
         { name: "header", required: false },
         { name: "body", required: true },
         { name: "footer", required: false, allowedComponents: ["Button", "Link"], maxItems: 2 },
       ],
       assignments: [],
     }

     it("errors on missing required slot", () => {
       const result = validateSlots({ ...input, assignments: [] })
       expect(result.valid).toBe(false)
       expect(result.errors[0].code).toBe(LBX_SLOT_REQUIRED)
     })

     it("valid when required slot is filled", () => {
       const result = validateSlots({ ...input, assignments: [{ slotName: "body", children: ["Text"] }] })
       expect(result.valid).toBe(true)
     })

     it("errors on invalid slot child", () => {
       const result = validateSlots({
         ...input,
         assignments: [
           { slotName: "body", children: ["Text"] },
           { slotName: "footer", children: ["Modal"] },
         ],
       })
       expect(result.valid).toBe(false)
       expect(result.errors.some((e) => e.code === LBX_INVALID_SLOT_CHILD)).toBe(true)
     })

     it("errors on slot cardinality exceeded", () => {
       const result = validateSlots({
         ...input,
         assignments: [
           { slotName: "body", children: ["Text"] },
           { slotName: "footer", children: ["Button", "Link", "Button"] },
         ],
       })
       expect(result.errors.some((e) => e.code === LBX_SLOT_CARDINALITY)).toBe(true)
     })
   })
   ```

4. Create `src/validation/__tests__/validateAccessibility.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateAccessibility } from "../validateAccessibility"
   import {
     LBX_ACCESSIBILITY_MISSING_ARIA,
     LBX_ACCESSIBILITY_FOCUS_REQUIRED,
     LBX_ACCESSIBILITY_KEYBOARD_REQUIRED,
   } from "../errorCodes"

   const rules = [
     {
       component: "Dialog",
       requiredAriaAttributes: [{ attribute: "aria-label", condition: "always" as const }],
       requiresFocusTrap: true,
       requiredKeyboardInteractions: ["Escape"],
     },
   ]

   describe("validateAccessibility", () => {
     it("errors on missing ARIA attribute", () => {
       const tree = { component: "Dialog", props: {} }
       const result = validateAccessibility(tree, rules)
       expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_MISSING_ARIA)).toBe(true)
     })

     it("errors on missing focus trap", () => {
       const tree = { component: "Dialog", props: { "aria-label": "My dialog" } }
       const result = validateAccessibility(tree, rules)
       expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_FOCUS_REQUIRED)).toBe(true)
     })

     it("errors on missing keyboard interaction", () => {
       const tree = { component: "Dialog", props: { "aria-label": "x", "data-focus-trap": true } }
       const result = validateAccessibility(tree, rules)
       expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_KEYBOARD_REQUIRED)).toBe(true)
     })

     it("valid when all requirements met", () => {
       const tree = {
         component: "Dialog",
         props: { "aria-label": "x", "data-focus-trap": true, "data-keyboard-interactions": ["Escape"] },
       }
       expect(validateAccessibility(tree, rules).valid).toBe(true)
     })
   })
   ```

5. Create `src/validation/__tests__/validateResponsive.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateResponsive } from "../validateResponsive"
   import { LBX_RESPONSIVE_RULE_MISSING, LBX_RESPONSIVE_CONTRACT_INCOMPLETE } from "../errorCodes"

   describe("validateResponsive", () => {
     it("errors when contract missing for rule-bound component", () => {
       const result = validateResponsive([], [{ component: "Sidebar", requiredBreakpoints: ["sm"] }])
       expect(result.errors[0].code).toBe(LBX_RESPONSIVE_CONTRACT_INCOMPLETE)
     })

     it("errors when required breakpoint missing from contract", () => {
       const result = validateResponsive(
         [{ component: "Sidebar", breakpoints: { lg: {} } }],
         [{ component: "Sidebar", requiredBreakpoints: ["sm", "lg"] }]
       )
       expect(result.errors.some((e) => e.code === LBX_RESPONSIVE_RULE_MISSING)).toBe(true)
     })

     it("valid when all required breakpoints defined", () => {
       const result = validateResponsive(
         [{ component: "Sidebar", breakpoints: { sm: {}, lg: {} } }],
         [{ component: "Sidebar", requiredBreakpoints: ["sm", "lg"] }]
       )
       expect(result.valid).toBe(true)
     })
   })
   ```

6. Create `src/validation/__tests__/validateMetadata.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import { validateMetadata } from "../validateMetadata"
   import { LBX_METADATA_INCOMPLETE, LBX_METADATA_SCHEMA_INVALID, LBX_METADATA_CONTRACT_MISMATCH } from "../errorCodes"

   describe("validateMetadata", () => {
     it("errors on missing name", () => {
       const result = validateMetadata({ metadata: { name: "" } })
       expect(result.errors[0].code).toBe(LBX_METADATA_INCOMPLETE)
     })

     it("errors on invalid prop type", () => {
       const result = validateMetadata({ metadata: { name: "Button", props: { size: { type: "pixel" } } } })
       expect(result.errors[0].code).toBe(LBX_METADATA_SCHEMA_INVALID)
     })

     it("errors on duplicate slot names", () => {
       const result = validateMetadata({
         metadata: { name: "Card", slots: [{ name: "body" }, { name: "body" }] },
       })
       expect(result.errors.some((e) => e.code === LBX_METADATA_SCHEMA_INVALID)).toBe(true)
     })

     it("warns on unknown component reference", () => {
       const result = validateMetadata({
         metadata: { name: "ButtonGroup", allowedChildren: ["Ghost"] },
         knownComponents: ["Button"],
       })
       expect(result.valid).toBe(true)
       expect(result.warnings.some((w) => w.code === LBX_METADATA_CONTRACT_MISMATCH)).toBe(true)
     })
   })
   ```

7. Create `src/validation/__tests__/pipeline.test.ts`:

   ```ts
   import { describe, it, expect, beforeEach } from "vitest"
   import { runValidationPipeline, createValidationResult } from "../pipeline"
   import { registerValidator, clearValidatorRegistry } from "../registry"

   beforeEach(() => {
     clearValidatorRegistry()
   })

   describe("runValidationPipeline", () => {
     it("runs all stages in order and merges results", () => {
       const order: number[] = []
       const stages = [
         { name: "s1", run: () => { order.push(1); return createValidationResult([]) } },
         { name: "s2", run: () => { order.push(2); return createValidationResult([]) } },
       ]
       runValidationPipeline(stages)
       expect(order).toEqual([1, 2])
     })

     it("skips development-only stages in production", () => {
       const ran: string[] = []
       const stages = [
         { name: "prod", run: () => { ran.push("prod"); return createValidationResult([]) } },
         { name: "dev", developmentOnly: true, run: () => { ran.push("dev"); return createValidationResult([]) } },
       ]
       runValidationPipeline(stages, { mode: "production" })
       expect(ran).toEqual(["prod"])
     })

     it("stops pipeline on first error in production mode", () => {
       const ran: string[] = []
       const stages = [
         { name: "s1", run: () => { ran.push("s1"); return createValidationResult([{ code: "ERR", severity: "error" as const, message: "fail" }]) } },
         { name: "s2", run: () => { ran.push("s2"); return createValidationResult([]) } },
       ]
       runValidationPipeline(stages, { mode: "production" })
       expect(ran).toEqual(["s1"])
     })

     it("runs external registered validators in development mode", () => {
       let externalRan = false
       registerValidator(() => { externalRan = true; return createValidationResult([]) })
       runValidationPipeline([], { mode: "development" })
       expect(externalRan).toBe(true)
     })

     it("does not run external validators in production mode", () => {
       let externalRan = false
       registerValidator(() => { externalRan = true; return createValidationResult([]) })
       runValidationPipeline([], { mode: "production" })
       expect(externalRan).toBe(false)
     })
   })
   ```

## Constraints
- Use Vitest (`describe`, `it`, `expect`) — matches the project's existing test setup
- Tests must be isolated — `clearValidatorRegistry()` called in `beforeEach` for pipeline tests
- No DOM or browser globals required — all validators are pure functions

## Acceptance Criteria
- All 7 test files created
- `npm run test` passes with all tests green
- Each validator's happy path and primary error paths are covered

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
