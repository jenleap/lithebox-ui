# Task 011: Unit Tests

## Feature
F020 - Versioning & Migration System

## Description
Write unit tests for all versioning subsystem modules. Tests must cover the deterministic behaviors, failure paths, and mode-gated logic.

## Files
- `src/versioning/__tests__/versionRegistry.test.ts` (create)
- `src/versioning/__tests__/migrationRegistry.test.ts` (create)
- `src/versioning/__tests__/migrationEngine.test.ts` (create)
- `src/versioning/__tests__/deprecationSystem.test.ts` (create)
- `src/versioning/__tests__/tokenCompatibility.test.ts` (create)
- `src/versioning/__tests__/metadataCompatibility.test.ts` (create)
- `src/versioning/__tests__/contractCompatibility.test.ts` (create)
- `src/versioning/__tests__/runtimeVersioning.test.ts` (create)

## Implementation Steps

### 1. `versionRegistry.test.ts`
```ts
import { getSystemVersion, setSubsystemVersion, getSubsystemVersion, resetVersionRegistry } from "../versionRegistry"

beforeEach(() => resetVersionRegistry())

test("getSystemVersion returns all four layers", () => {
  const v = getSystemVersion()
  expect(v).toHaveProperty("core")
  expect(v).toHaveProperty("tokens")
  expect(v).toHaveProperty("metadata")
  expect(v).toHaveProperty("contracts")
})

test("setSubsystemVersion updates only the specified layer", () => {
  setSubsystemVersion("tokens", "2.0.0")
  expect(getSubsystemVersion("tokens")).toBe("2.0.0")
  expect(getSubsystemVersion("core")).toBe("1.0.0")
})

test("getSystemVersion returns a copy — mutation does not affect registry", () => {
  const v = getSystemVersion() as any
  v.core = "99.0.0"
  expect(getSubsystemVersion("core")).toBe("1.0.0")
})
```

### 2. `migrationRegistry.test.ts`
```ts
import { registerMigration, resolveMigrationChain, clearMigrationRegistry } from "../migrationRegistry"

beforeEach(() => clearMigrationRegistry())

const m1 = { fromVersion: "1.0.0", toVersion: "1.1.0", description: "", changeType: "additive" as const, apply: (x: unknown) => x }
const m2 = { fromVersion: "1.1.0", toVersion: "2.0.0", description: "", changeType: "breaking" as const, apply: (x: unknown) => x }

test("resolveMigrationChain returns [] when versions match", () => {
  expect(resolveMigrationChain("1.0.0", "1.0.0")).toEqual([])
})

test("resolveMigrationChain returns ordered chain", () => {
  registerMigration(m1)
  registerMigration(m2)
  const chain = resolveMigrationChain("1.0.0", "2.0.0")
  expect(chain).toHaveLength(2)
  expect(chain[0].fromVersion).toBe("1.0.0")
  expect(chain[1].fromVersion).toBe("1.1.0")
})

test("resolveMigrationChain returns partial chain when path is incomplete", () => {
  registerMigration(m1)
  const chain = resolveMigrationChain("1.0.0", "2.0.0")
  expect(chain).toHaveLength(1)
})
```

### 3. `migrationEngine.test.ts`
```ts
import { applyMigrations, detectVersionMismatch } from "../migrationEngine"
import { registerMigration, clearMigrationRegistry } from "../migrationRegistry"

beforeEach(() => clearMigrationRegistry())

test("detectVersionMismatch returns false when versions match", () => {
  expect(detectVersionMismatch("1.0.0", "1.0.0")).toBe(false)
})

test("applyMigrations returns success when versions match", () => {
  const result = applyMigrations({ data: 1 }, "1.0.0", "1.0.0")
  expect(result.success).toBe(true)
  expect(result.migrationsApplied).toHaveLength(0)
})

test("applyMigrations returns failure when no path exists", () => {
  const result = applyMigrations({}, "1.0.0", "2.0.0")
  expect(result.success).toBe(false)
  expect(result.error).toMatch(/No migration path/)
})

test("applyMigrations applies transformations in order", () => {
  registerMigration({ fromVersion: "1.0.0", toVersion: "1.1.0", description: "", changeType: "additive", apply: (x: any) => ({ ...x, step1: true }) })
  registerMigration({ fromVersion: "1.1.0", toVersion: "2.0.0", description: "", changeType: "breaking", apply: (x: any) => ({ ...x, step2: true }) })
  const result = applyMigrations({}, "1.0.0", "2.0.0")
  expect(result.success).toBe(true)
  expect((result.output as any).step1).toBe(true)
  expect((result.output as any).step2).toBe(true)
})

test("applyMigrations aborts and returns failure when migration validate returns false", () => {
  registerMigration({
    fromVersion: "1.0.0",
    toVersion: "1.1.0",
    description: "",
    changeType: "additive",
    apply: (x: unknown) => x,
    validate: () => false,
  })
  const result = applyMigrations({}, "1.0.0", "1.1.0")
  expect(result.success).toBe(false)
  expect(result.error).toMatch(/validation failed/)
})
```

### 4. `deprecationSystem.test.ts`
```ts
import { registerDeprecation, warnIfDeprecated, clearDeprecationRegistry } from "../deprecationSystem"

beforeEach(() => clearDeprecationRegistry())

test("warnIfDeprecated does not warn for active features", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
  registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "active" })
  warnIfDeprecated("OldButton", "development")
  expect(warn).not.toHaveBeenCalled()
  warn.mockRestore()
})

test("warnIfDeprecated emits console.warn for deprecated features in development mode", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
  registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
  warnIfDeprecated("OldButton", "development")
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("[LBX deprecation]"))
  warn.mockRestore()
})

test("warnIfDeprecated is silent in production mode", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
  registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
  warnIfDeprecated("OldButton", "production")
  expect(warn).not.toHaveBeenCalled()
  warn.mockRestore()
})
```

### 5. `tokenCompatibility.test.ts`
```ts
import { validateTokenCompatibility } from "../tokenCompatibility"

test("returns compatible when token sets match", () => {
  const result = validateTokenCompatibility(["color.primary"], ["color.primary"])
  expect(result.compatible).toBe(true)
  expect(result.issues).toHaveLength(0)
})

test("returns error when token is removed without rename", () => {
  const result = validateTokenCompatibility(["color.primary"], [])
  expect(result.compatible).toBe(false)
  expect(result.issues[0].code).toBe("LBX_TOKEN_REMOVED")
  expect(result.issues[0].severity).toBe("error")
})

test("returns warning when token is renamed with declared rename", () => {
  const result = validateTokenCompatibility(
    ["color.backgroundPrimary"],
    ["color.surface.primary"],
    { renames: { "color.backgroundPrimary": "color.surface.primary" } }
  )
  expect(result.compatible).toBe(true)
  expect(result.issues[0].code).toBe("LBX_TOKEN_RENAMED")
  expect(result.issues[0].severity).toBe("warning")
})
```

### 6. `metadataCompatibility.test.ts`
```ts
import { validateMetadataCompatibility } from "../metadataCompatibility"

test("returns compatible when fields match", () => {
  const result = validateMetadataCompatibility(["name", "category"], ["name", "category"])
  expect(result.compatible).toBe(true)
})

test("returns error when field is removed", () => {
  const result = validateMetadataCompatibility(["name", "category"], ["name"])
  expect(result.compatible).toBe(false)
  expect(result.issues[0].code).toBe("LBX_METADATA_FIELD_REMOVED")
})

test("returns warning when field is renamed with declared rename", () => {
  const result = validateMetadataCompatibility(["label"], ["displayName"], { renames: { label: "displayName" } })
  expect(result.compatible).toBe(true)
  expect(result.issues[0].code).toBe("LBX_METADATA_FIELD_RENAMED")
  expect(result.issues[0].severity).toBe("warning")
})
```

### 7. `contractCompatibility.test.ts`
```ts
import { validateContractCompatibility } from "../contractCompatibility"
import type { ContractSnapshot } from "../contractCompatibility"

const base: ContractSnapshot = {
  props: [{ name: "variant", required: false }],
  slots: ["default"],
  allowedChildren: ["Text"],
}

test("returns compatible when contract is unchanged", () => {
  const result = validateContractCompatibility(base, base)
  expect(result.compatible).toBe(true)
})

test("flags removed prop as error", () => {
  const curr = { ...base, props: [] }
  const result = validateContractCompatibility(base, curr)
  expect(result.compatible).toBe(false)
  expect(result.issues[0].code).toBe("LBX_CONTRACT_PROP_REMOVED")
})

test("flags newly required prop as error", () => {
  const curr = { ...base, props: [...base.props, { name: "size", required: true }] }
  const result = validateContractCompatibility(base, curr)
  expect(result.compatible).toBe(false)
  expect(result.issues[0].code).toBe("LBX_CONTRACT_PROP_REQUIRED_ADDED")
})

test("flags removed slot as error", () => {
  const curr = { ...base, slots: [] }
  const result = validateContractCompatibility(base, curr)
  expect(result.compatible).toBe(false)
  expect(result.issues[0].code).toBe("LBX_CONTRACT_SLOT_REMOVED")
})

test("does not flag new optional prop as error", () => {
  const curr = { ...base, props: [...base.props, { name: "size", required: false }] }
  const result = validateContractCompatibility(base, curr)
  expect(result.compatible).toBe(true)
})
```

### 8. `runtimeVersioning.test.ts`
```ts
import { checkRuntimeVersions, runCompatibilityGuard } from "../runtimeVersioning"
import { resetVersionRegistry } from "../versionRegistry"

beforeEach(() => resetVersionRegistry())

test("checkRuntimeVersions returns no mismatches when all versions match", () => {
  const result = checkRuntimeVersions({ core: "1.0.0", tokens: "1.0.0", metadata: "1.0.0", contracts: "1.0.0" })
  expect(result.anyMismatch).toBe(false)
})

test("checkRuntimeVersions detects mismatch", () => {
  const result = checkRuntimeVersions({ core: "2.0.0", tokens: "1.0.0", metadata: "1.0.0", contracts: "1.0.0" })
  expect(result.anyMismatch).toBe(true)
  expect(result.mismatches.core).toBe(true)
})

test("checkRuntimeVersions emits console.warn in development mode for mismatches", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
  checkRuntimeVersions({ core: "2.0.0", tokens: "1.0.0", metadata: "1.0.0", contracts: "1.0.0" }, "development")
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("[LBX version]"))
  warn.mockRestore()
})

test("checkRuntimeVersions is silent in production mode", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
  checkRuntimeVersions({ core: "2.0.0", tokens: "1.0.0", metadata: "1.0.0", contracts: "1.0.0" }, "production")
  expect(warn).not.toHaveBeenCalled()
  warn.mockRestore()
})
```

## Constraints
- Use the same test framework as the rest of the project (Vitest)
- Use `beforeEach` with `clear*` / `reset*` helpers to isolate registry state between tests
- Tests must not import from `src/validation` or any other subsystem
- Do not test implementation internals — only public API behavior

## Acceptance Criteria
- All test files pass with `npm run test`
- `npm run build` passes with no TypeScript errors
- Each module has at least 3 meaningful tests
- All happy paths and at least one failure path per module are covered

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
