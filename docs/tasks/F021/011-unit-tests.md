# Task 011: Unit Tests

## Feature
F021 - Design System Governance Layer

## Description
Write unit tests for all F021 modules. Tests must cover happy paths, edge cases, and key failure modes for each module.

## Files
- `src/governance/__tests__/rulesEngine.test.ts` (create)
- `src/governance/__tests__/integrityModel.test.ts` (create)
- `src/governance/__tests__/driftDetection.test.ts` (create)
- `src/governance/__tests__/alignmentRules.test.ts` (create)
- `src/governance/__tests__/policySystem.test.ts` (create)
- `src/governance/__tests__/changeClassification.test.ts` (create)
- `src/governance/__tests__/validationPipeline.test.ts` (create)

## Implementation Steps

1. Create `src/governance/__tests__/rulesEngine.test.ts`:
   - After each test, call `clearGovernanceRules()`
   - Test: register a failing rule → `runGovernanceRules` returns one violation
   - Test: register a passing rule → no violation
   - Test: `getRulesByScope` returns only rules matching the given scope
   - Test: `clearGovernanceRules` empties the registry

2. Create `src/governance/__tests__/integrityModel.test.ts`:
   - Test: `validateTokenIntegrity` with duplicate keys → `valid: false`, correct code
   - Test: `validateTokenIntegrity` with unique keys → `valid: true`
   - Test: `validateComponentIntegrity` with unknown token ref → `valid: false`
   - Test: `validateMetadataIntegrity` with unknown prop → `valid: false`, severity `warning`
   - Test: `validateContractIntegrity` with prop not in metadata → `valid: false`

3. Create `src/governance/__tests__/driftDetection.test.ts`:
   - Test: `scanForDrift` with clean input → `hasDrift: false`
   - Test: duplicate token keys → `hasDrift: true`, issue code `TOKEN_DRIFT_DUPLICATE`
   - Test: component referencing unknown token → issue code `COMPONENT_DRIFT_UNKNOWN_TOKEN`
   - Test: metadata prop not in component → issue code `METADATA_DRIFT_PROP_MISMATCH`
   - Test: contract prop not in metadata → issue code `CONTRACT_DRIFT_PROP_MISMATCH`

4. Create `src/governance/__tests__/alignmentRules.test.ts`:
   - Test: fully aligned system → `aligned: true`
   - Test: component using undefined token → `ALIGN_TOKEN_COMPONENT_MISSING`
   - Test: component prop not in metadata → `ALIGN_COMPONENT_METADATA_MISSING`
   - Test: metadata prop not in contract → `ALIGN_METADATA_CONTRACT_MISSING`
   - Test: `validateCrossSystemAlignment` aggregates all three alignment issues

5. Create `src/governance/__tests__/policySystem.test.ts`:
   - After each test, call `clearPolicyRegistry()`
   - Test: register a structural policy with failing rule → `evaluatePoliciesByCategory("structural", {})` returns violation
   - Test: `getPoliciesByCategory` filters by category correctly
   - Test: `evaluatePolicy` returns no violations for passing rules

6. Create `src/governance/__tests__/changeClassification.test.ts`:
   - After each test, call `clearClassificationRules()`
   - Test: no rules registered → `classifyChange` returns `"safe"`
   - Test: breaking rule matches → returns `"breaking"`
   - Test: sensitive rule matches → returns `"sensitive"`
   - Test: both breaking and sensitive rules match → returns `"breaking"`
   - Test: `registerDefaultClassificationRules` registers three rules

7. Create `src/governance/__tests__/validationPipeline.test.ts`:
   - After each test, call `clearGovernanceRules()` and `clearClassificationRules()`
   - Test: clean pipeline input, no registered rules → `approved: true`
   - Test: governance rule that always fails → `approved: false`
   - Test: drift input with duplicate token → `approved: false`, `hasDrift: true`
   - Test: alignment input with missing token → `approved: false`, `aligned: false`
   - Test: warning-only violations → `approved: true` (warnings do not block approval)

## Constraints
- Use `vitest` (existing test framework)
- Each test file manages its own state cleanup (`afterEach` / `beforeEach`)
- Do not import from outside `src/governance/`
- No snapshot tests — assert specific values

## Acceptance Criteria
- All test files exist and pass
- `npm run test` passes with no failures
- `npm run build` passes

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no TypeScript errors
