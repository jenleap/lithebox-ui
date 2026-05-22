# Task 010: Integration With Other Systems

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the integration bridge between the diagnostics layer and the existing validation, governance, and metadata systems. This module assembles a full `IntrospectionSnapshot` from live system state using the snapshot builders from tasks 002–007.

## Files
- `src/diagnostics/integration.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/integration.ts`:

   ```ts
   import type { IntrospectionSnapshot } from "./types"
   import type { ComponentTreeInput } from "./componentTree"
   import type { RawTokenInput } from "./tokenResolution"
   import type { ThemeIntrospectionInput } from "./themeIntrospection"
   import type { SystemHealthInput } from "./systemHealth"
   import type { ComponentMetadata } from "../metadata/types"
   import type { ValidationResult } from "../validation/types"

   import { buildComponentTreeSnapshot } from "./componentTree"
   import { buildTokenResolutionSnapshot } from "./tokenResolution"
   import { buildThemeSnapshot } from "./themeIntrospection"
   import { buildValidationSnapshot } from "./validationIntrospection"
   import { buildMetadataSnapshot } from "./metadataIntrospection"
   import { buildSystemHealthSnapshot } from "./systemHealth"

   export type DiagnosticsInput = {
     componentTree: ComponentTreeInput
     tokens: RawTokenInput[]
     theme: ThemeIntrospectionInput
     validation: ValidationResult
     metadataRegistry: Record<string, ComponentMetadata>
     systemHealth: SystemHealthInput
   }

   export function buildFullIntrospectionSnapshot(
     input: DiagnosticsInput
   ): IntrospectionSnapshot {
     return {
       components: buildComponentTreeSnapshot(input.componentTree),
       tokens: buildTokenResolutionSnapshot(input.tokens),
       theme: buildThemeSnapshot(input.theme),
       validation: buildValidationSnapshot(input.validation),
       metadata: buildMetadataSnapshot(input.metadataRegistry),
       system: buildSystemHealthSnapshot(input.systemHealth),
     }
   }
   ```

## Constraints
- This is the only module that imports from outside `src/diagnostics/` (except `./types` modules)
- Must not call the validation engine or governance engine — only consume pre-computed results
- Must not mutate any input
- Imports from: `../metadata/types`, `../validation/types`, `../governance/types` (via `systemHealth.ts`)

## Acceptance Criteria
- `buildFullIntrospectionSnapshot` assembles a structurally complete `IntrospectionSnapshot`
- Each sub-snapshot is built by delegating to the correct builder from tasks 002–007
- No direct calls into validation, governance, or metadata internals
- `npm run build` passes

## Test Steps
1. Construct a full `DiagnosticsInput` with all required fields — call `buildFullIntrospectionSnapshot` — verify all 6 snapshot fields are present and correctly populated
2. Verify `components`, `tokens`, `theme`, `validation`, `metadata`, and `system` match the expected builder outputs
3. Run `npm run build`
