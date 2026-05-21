# Task 011: Unit Tests

## Feature
F015 - Component Metadata System

## Description
Write unit tests covering the metadata type system, component registry, pattern registry, and JSON export pipeline. Tests must verify registry correctness, composition rule accuracy on selected components, and JSON serialization integrity.

## Files
- `src/metadata/__tests__/registry.test.ts` (create)
- `src/metadata/__tests__/patternRegistry.test.ts` (create)
- `src/metadata/__tests__/componentMetadata.test.ts` (create)

## Implementation Steps

### 1. `src/metadata/__tests__/registry.test.ts`

Test the core registry API:

```ts
import { registerComponent, getComponent, getAllComponents, exportRegistryAsJSON } from "../registry"
import type { ComponentMetadata } from "../types"
```

Tests:
- `registerComponent` stores the metadata under `metadata.name`
- `getComponent("NonExistent")` returns `undefined`
- `getComponent("TestComp")` returns the registered object after `registerComponent`
- `getAllComponents()` is `Readonly` — attempting to assign a new key throws (TypeScript-level only)
- `exportRegistryAsJSON()` returns a string that `JSON.parse` does not throw on
- `exportRegistryAsJSON()` result includes the registered component name as a key
- Registering the same name twice overwrites the previous entry

Use a minimal valid `ComponentMetadata` fixture:
```ts
const testMeta: ComponentMetadata = {
  name: "TestComp",
  category: "display",
  description: "Test",
  props: {},
  composition: {},
  version: "1.0.0",
}
```

### 2. `src/metadata/__tests__/patternRegistry.test.ts`

Test the pattern registry API:

```ts
import { registerPattern, getPattern, getAllPatterns, exportPatternsAsJSON } from "../patternRegistry"
import type { UIPattern } from "../types"
```

Tests:
- `registerPattern` stores the pattern under `pattern.name`
- `getPattern("NonExistent")` returns `undefined`
- `getPattern("TestPattern")` returns the registered object after `registerPattern`
- `exportPatternsAsJSON()` returns parseable JSON
- `exportPatternsAsJSON()` output contains the registered pattern name as a key
- Registering the same name twice overwrites

Use a minimal valid `UIPattern` fixture:
```ts
const testPattern: UIPattern = {
  name: "TestPattern",
  description: "Test pattern",
  structure: ["Box", "  Text"],
  components: ["Box", "Text"],
  usage: ["Use for testing"],
}
```

### 3. `src/metadata/__tests__/componentMetadata.test.ts`

Test the full populated registry after import:

```ts
import "../components/layoutMetadata"
import "../components/primitiveMetadata"
import "../components/formMetadata"
import "../components/navigationMetadata"
import "../components/dataDisplayMetadata"
import "../components/feedbackMetadata"
import { getComponent, getAllComponents } from "../registry"
```

Tests:
- `getAllComponents()` has at least 30 entries after all metadata imports
- `getComponent("Box")` returns `{ category: "layout", version: "1.0.0", ... }`
- `getComponent("Button")` has `states` array including `"disabled"` and `"loading"`
- `getComponent("Card")` has `slots` with keys `header`, `body`, `footer`
- `getComponent("Field")` has `composition.allowedChildren` including `"Input"`
- `getComponent("TableCell")` has `composition.allowedParents` equal to `["TableRow"]`
- `getComponent("AppShell")` has `composition.maxDepth: 1`
- `getComponent("Modal")` has `accessibility.focusBehavior` defined (not undefined)
- `getComponent("Toast")` has `composition.maxDepth: 0`
- `getComponent("Badge")` has `composition.maxDepth: 0`
- All registered components have `version: "1.0.0"`

## Constraints
- No `any` types
- Tests must import from `../registry` and `../patternRegistry` — not from `src/index.ts`
- Do not test React rendering — metadata is pure data, no component mounting needed
- Use Vitest (`describe`, `it`, `expect`) — same test runner as the rest of the project
- Each test file must be independently runnable (no shared state leakage between files)

## Acceptance Criteria
- All three test files exist
- `npm run test` passes with no failures
- Registry tests cover: `registerComponent`, `getComponent`, `getAllComponents`, `exportRegistryAsJSON`
- Pattern registry tests cover: `registerPattern`, `getPattern`, `getAllPatterns`, `exportPatternsAsJSON`
- Component metadata tests verify at least 10 specific components by name
- TypeScript compiles with no errors in test files

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
3. Verify test output shows 3 test suites from the `metadata/__tests__` directory

## Notes
Each test file must import the metadata modules it needs independently. Because registry state is module-level, tests that import metadata will see accumulated state from all prior imports in the same test run — write tests that are additive-safe (use `toBeDefined()` and `toContain()` rather than exact-count assertions where possible).
