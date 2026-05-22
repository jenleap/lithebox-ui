# Task 012: Unit Tests

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Write unit tests for all diagnostics modules. Each test file targets one module and covers the main behavioral paths including edge cases.

## Files
- `src/diagnostics/__tests__/componentTree.test.ts` (create)
- `src/diagnostics/__tests__/tokenResolution.test.ts` (create)
- `src/diagnostics/__tests__/themeIntrospection.test.ts` (create)
- `src/diagnostics/__tests__/validationIntrospection.test.ts` (create)
- `src/diagnostics/__tests__/metadataIntrospection.test.ts` (create)
- `src/diagnostics/__tests__/systemHealth.test.ts` (create)
- `src/diagnostics/__tests__/environmentGating.test.ts` (create)
- `src/diagnostics/__tests__/integration.test.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/__tests__/componentTree.test.ts`:

   ```ts
   import { buildComponentTreeSnapshot, flattenComponentTree, findComponentById } from "../componentTree"

   describe("buildComponentTreeSnapshot", () => {
     it("builds a snapshot from a flat node", () => {
       const result = buildComponentTreeSnapshot({ id: "1", type: "Button", props: { label: "Ok" } })
       expect(result.id).toBe("1")
       expect(result.type).toBe("Button")
       expect(result.props).toEqual({ label: "Ok" })
       expect(Object.isFrozen(result.props)).toBe(true)
     })

     it("recursively builds children", () => {
       const result = buildComponentTreeSnapshot({
         id: "root",
         type: "Box",
         props: {},
         children: [{ id: "child", type: "Text", props: { value: "hi" } }],
       })
       expect(result.children).toHaveLength(1)
       expect(result.children![0].id).toBe("child")
     })
   })

   describe("flattenComponentTree", () => {
     it("returns all nodes in depth-first order", () => {
       const snapshot = buildComponentTreeSnapshot({
         id: "a",
         type: "A",
         props: {},
         children: [{ id: "b", type: "B", props: {} }],
       })
       const flat = flattenComponentTree(snapshot)
       expect(flat.map((n) => n.id)).toEqual(["a", "b"])
     })
   })

   describe("findComponentById", () => {
     it("finds a node by id", () => {
       const snapshot = buildComponentTreeSnapshot({
         id: "root",
         type: "Root",
         props: {},
         children: [{ id: "target", type: "Target", props: {} }],
       })
       const found = findComponentById(snapshot, "target")
       expect(found?.id).toBe("target")
     })

     it("returns undefined for unknown id", () => {
       const snapshot = buildComponentTreeSnapshot({ id: "x", type: "X", props: {} })
       expect(findComponentById(snapshot, "missing")).toBeUndefined()
     })
   })
   ```

2. Create `src/diagnostics/__tests__/tokenResolution.test.ts`:

   ```ts
   import { buildTokenResolutionSnapshot, getTokensBySource, getTokenResolutionPath } from "../tokenResolution"

   describe("buildTokenResolutionSnapshot", () => {
     it("maps all inputs into a frozen tokens record", () => {
       const snapshot = buildTokenResolutionSnapshot([
         { key: "color.primary", value: "#000", source: "default", path: ["color", "primary"] },
         { key: "color.accent", value: "#fff", source: "override", path: ["color", "accent"] },
       ])
       expect(snapshot.tokens["color.primary"].source).toBe("default")
       expect(snapshot.tokens["color.accent"].source).toBe("override")
       expect(Object.isFrozen(snapshot.tokens)).toBe(true)
     })
   })

   describe("getTokensBySource", () => {
     it("filters by source", () => {
       const snapshot = buildTokenResolutionSnapshot([
         { key: "a", value: "1", source: "theme", path: [] },
         { key: "b", value: "2", source: "default", path: [] },
       ])
       const themed = getTokensBySource(snapshot, "theme")
       expect(Object.keys(themed)).toEqual(["a"])
     })
   })

   describe("getTokenResolutionPath", () => {
     it("returns path for known token", () => {
       const snapshot = buildTokenResolutionSnapshot([
         { key: "x", value: "v", source: "mode", path: ["a", "b"] },
       ])
       expect(getTokenResolutionPath(snapshot, "x")).toEqual(["a", "b"])
     })

     it("returns undefined for unknown token", () => {
       const snapshot = buildTokenResolutionSnapshot([])
       expect(getTokenResolutionPath(snapshot, "unknown")).toBeUndefined()
     })
   })
   ```

3. Create `src/diagnostics/__tests__/themeIntrospection.test.ts`:

   ```ts
   import { buildThemeSnapshot, isSystemAligned } from "../themeIntrospection"

   describe("buildThemeSnapshot", () => {
     it("builds a theme snapshot", () => {
       const snap = buildThemeSnapshot({ mode: "dark", systemPreference: "dark", overridden: false })
       expect(snap.mode).toBe("dark")
       expect(snap.overridden).toBe(false)
     })
   })

   describe("isSystemAligned", () => {
     it("returns true when mode matches preference and not overridden", () => {
       expect(isSystemAligned({ mode: "light", systemPreference: "light", overridden: false })).toBe(true)
     })

     it("returns false when overridden", () => {
       expect(isSystemAligned({ mode: "dark", systemPreference: "dark", overridden: true })).toBe(false)
     })

     it("returns false when systemPreference is null", () => {
       expect(isSystemAligned({ mode: "light", systemPreference: null, overridden: false })).toBe(false)
     })
   })
   ```

4. Create `src/diagnostics/__tests__/validationIntrospection.test.ts`:

   ```ts
   import { buildValidationSnapshot, filterSnapshotByComponent, filterSnapshotBySeverity } from "../validationIntrospection"
   import type { ValidationResult } from "../../validation/types"

   const makeResult = (overrides: Partial<ValidationResult> = {}): ValidationResult => ({
     valid: true,
     errors: [],
     warnings: [],
     ...overrides,
   })

   describe("buildValidationSnapshot", () => {
     it("merges errors and warnings into issues", () => {
       const result = makeResult({
         valid: false,
         errors: [{ code: "E1", severity: "error", message: "err", component: "Button" }],
         warnings: [{ code: "W1", severity: "warning", message: "warn", component: "Card" }],
       })
       const snap = buildValidationSnapshot(result)
       expect(snap.valid).toBe(false)
       expect(snap.issues).toHaveLength(2)
     })

     it("uses defaultComponent fallback when component is missing", () => {
       const result = makeResult({
         valid: false,
         errors: [{ code: "E1", severity: "error", message: "err" }],
       })
       const snap = buildValidationSnapshot(result, "Fallback")
       expect(snap.issues[0].component).toBe("Fallback")
     })
   })

   describe("filterSnapshotByComponent", () => {
     it("filters issues by component name", () => {
       const result = makeResult({
         valid: false,
         errors: [
           { code: "E1", severity: "error", message: "a", component: "A" },
           { code: "E2", severity: "error", message: "b", component: "B" },
         ],
       })
       const snap = buildValidationSnapshot(result)
       expect(filterSnapshotByComponent(snap, "A")).toHaveLength(1)
     })
   })

   describe("filterSnapshotBySeverity", () => {
     it("filters issues by severity", () => {
       const result = makeResult({
         valid: false,
         errors: [{ code: "E1", severity: "error", message: "e", component: "X" }],
         warnings: [{ code: "W1", severity: "warning", message: "w", component: "X" }],
       })
       const snap = buildValidationSnapshot(result)
       expect(filterSnapshotBySeverity(snap, "error")).toHaveLength(1)
       expect(filterSnapshotBySeverity(snap, "warning")).toHaveLength(1)
     })
   })
   ```

5. Create `src/diagnostics/__tests__/metadataIntrospection.test.ts`:

   ```ts
   import { buildMetadataSnapshot, getComponentMetadataEntry, listRegisteredComponents } from "../metadataIntrospection"
   import type { ComponentMetadata } from "../../metadata/types"

   const makeMeta = (name: string): ComponentMetadata => ({
     name,
     category: "display",
     description: `${name} component`,
     props: { label: { type: "string", description: "label", required: false } },
     composition: {},
     version: "1.0.0",
   })

   describe("buildMetadataSnapshot", () => {
     it("creates entries for all registry components", () => {
       const snap = buildMetadataSnapshot({ Button: makeMeta("Button"), Card: makeMeta("Card") })
       expect(Object.keys(snap.components)).toContain("Button")
       expect(Object.keys(snap.components)).toContain("Card")
       expect(Object.isFrozen(snap.components)).toBe(true)
     })
   })

   describe("getComponentMetadataEntry", () => {
     it("returns entry for known component", () => {
       const snap = buildMetadataSnapshot({ Button: makeMeta("Button") })
       expect(getComponentMetadataEntry(snap, "Button")).toBeDefined()
     })

     it("returns undefined for unknown component", () => {
       const snap = buildMetadataSnapshot({})
       expect(getComponentMetadataEntry(snap, "Unknown")).toBeUndefined()
     })
   })

   describe("listRegisteredComponents", () => {
     it("lists all component names", () => {
       const snap = buildMetadataSnapshot({ A: makeMeta("A"), B: makeMeta("B") })
       expect(listRegisteredComponents(snap)).toEqual(expect.arrayContaining(["A", "B"]))
     })
   })
   ```

6. Create `src/diagnostics/__tests__/systemHealth.test.ts`:

   ```ts
   import { buildSystemHealthSnapshot, isSystemHealthy, getSystemHealthSummary } from "../systemHealth"

   const clean = { driftReport: { hasDrift: false, issues: [] }, contractViolationCount: 0, metadataWarningCount: 0 }

   describe("buildSystemHealthSnapshot", () => {
     it("maps drift, violations, and warnings", () => {
       const snap = buildSystemHealthSnapshot({ ...clean, contractViolationCount: 2 })
       expect(snap.contractViolations).toBe(2)
       expect(snap.driftDetected).toBe(false)
     })
   })

   describe("isSystemHealthy", () => {
     it("returns true when clean", () => {
       expect(isSystemHealthy(buildSystemHealthSnapshot(clean))).toBe(true)
     })

     it("returns false when drift detected", () => {
       const snap = buildSystemHealthSnapshot({ ...clean, driftReport: { hasDrift: true, issues: [] } })
       expect(isSystemHealthy(snap)).toBe(false)
     })
   })

   describe("getSystemHealthSummary", () => {
     it("returns healthy when clean", () => {
       const { status } = getSystemHealthSummary(buildSystemHealthSnapshot(clean))
       expect(status).toBe("healthy")
     })

     it("returns critical when drift detected", () => {
       const snap = buildSystemHealthSnapshot({ ...clean, driftReport: { hasDrift: true, issues: [] } })
       expect(getSystemHealthSummary(snap).status).toBe("critical")
     })

     it("returns degraded when only metadata warnings", () => {
       const snap = buildSystemHealthSnapshot({ ...clean, metadataWarningCount: 1 })
       expect(getSystemHealthSummary(snap).status).toBe("degraded")
     })
   })
   ```

7. Create `src/diagnostics/__tests__/environmentGating.test.ts`:

   ```ts
   import { isIntrospectionEnabled, guardIntrospection } from "../environmentGating"

   describe("isIntrospectionEnabled", () => {
     it("returns true in development", () => {
       expect(isIntrospectionEnabled("development")).toBe(true)
     })

     it("returns false in production", () => {
       expect(isIntrospectionEnabled("production")).toBe(false)
     })
   })

   describe("guardIntrospection", () => {
     it("calls produce in development", () => {
       const result = guardIntrospection("development", () => "real", "fallback")
       expect(result).toBe("real")
     })

     it("returns fallback in production without calling produce", () => {
       const produce = vi.fn(() => "real")
       const result = guardIntrospection("production", produce, "fallback")
       expect(result).toBe("fallback")
       expect(produce).not.toHaveBeenCalled()
     })
   })
   ```

8. Create `src/diagnostics/__tests__/integration.test.ts`:

   ```ts
   import { buildFullIntrospectionSnapshot } from "../integration"
   import type { DiagnosticsInput } from "../integration"
   import type { ComponentMetadata } from "../../metadata/types"

   const makeMeta = (name: string): ComponentMetadata => ({
     name,
     category: "display",
     description: name,
     props: {},
     composition: {},
     version: "1.0.0",
   })

   const input: DiagnosticsInput = {
     componentTree: { id: "root", type: "Box", props: {} },
     tokens: [{ key: "color.bg", value: "#fff", source: "default", path: ["color", "bg"] }],
     theme: { mode: "light", systemPreference: "light", overridden: false },
     validation: { valid: true, errors: [], warnings: [] },
     metadataRegistry: { Button: makeMeta("Button") },
     systemHealth: {
       driftReport: { hasDrift: false, issues: [] },
       contractViolationCount: 0,
       metadataWarningCount: 0,
     },
   }

   describe("buildFullIntrospectionSnapshot", () => {
     it("assembles a complete IntrospectionSnapshot", () => {
       const snap = buildFullIntrospectionSnapshot(input)
       expect(snap.components.id).toBe("root")
       expect(snap.tokens.tokens["color.bg"].value).toBe("#fff")
       expect(snap.theme.mode).toBe("light")
       expect(snap.validation.valid).toBe(true)
       expect(snap.metadata.components).toHaveProperty("Button")
       expect(snap.system.driftDetected).toBe(false)
     })
   })
   ```

## Constraints
- Use `vi.fn()` (Vitest) for mocks — this project uses Vitest, not Jest
- Do not test internal implementation details — only test public function behavior
- Each test file tests exactly one module

## Acceptance Criteria
- All 8 test files created with passing tests
- `npm run test` passes with no failures
- No TypeScript errors in test files

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
