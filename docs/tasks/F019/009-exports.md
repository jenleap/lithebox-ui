# Task 009: Barrel Exports

## Feature
F019 - Validation & Constraint Engine

## Description
Create the barrel export file for the validation module so all public API surface is accessible from `src/validation` and the main library index.

## Files
- `src/validation/index.ts` (create)
- `src/index.ts` (modify — add validation exports)

## Implementation Steps

1. Create `src/validation/index.ts`:

   ```ts
   // Types
   export type {
     ValidationSeverity,
     ValidationIssue,
     ValidationResult,
     Validator,
     ValidationMode,
   } from "./types"

   // Error codes
   export {
     LBX_PROP_REQUIRED,
     LBX_INVALID_VARIANT,
     LBX_INVALID_PROP_TYPE,
     LBX_UNKNOWN_PROP,
     LBX_INVALID_CHILD,
     LBX_INVALID_PARENT,
     LBX_MAX_DEPTH_EXCEEDED,
     LBX_FORBIDDEN_COMBINATION,
     LBX_SLOT_REQUIRED,
     LBX_INVALID_SLOT_CHILD,
     LBX_SLOT_CARDINALITY,
     LBX_ACCESSIBILITY_MISSING_ARIA,
     LBX_ACCESSIBILITY_FOCUS_REQUIRED,
     LBX_ACCESSIBILITY_KEYBOARD_REQUIRED,
     LBX_ACCESSIBILITY_ROLE_INVALID,
     LBX_RESPONSIVE_RULE_MISSING,
     LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
     LBX_METADATA_SCHEMA_INVALID,
     LBX_METADATA_INCOMPLETE,
     LBX_METADATA_CONTRACT_MISMATCH,
   } from "./errorCodes"

   // Prop validator
   export { validateProps } from "./validateProps"
   export type { PropSchema, ComponentPropSchema } from "./validateProps"

   // Composition validator
   export { validateComposition } from "./validateComposition"
   export type { CompositionNode, CompositionRule } from "./validateComposition"

   // Slot validator
   export { validateSlots } from "./validateSlots"
   export type { SlotDefinition, SlotAssignment, SlotValidationInput } from "./validateSlots"

   // Accessibility validator
   export { validateAccessibility } from "./validateAccessibility"
   export type { AriaRequirement, A11yRule, A11yNode } from "./validateAccessibility"

   // Responsive validator
   export { validateResponsive } from "./validateResponsive"
   export type { BreakpointKey, ResponsiveRule, ResponsiveContract } from "./validateResponsive"

   // Metadata validator
   export { validateMetadata } from "./validateMetadata"
   export type {
     MetadataPropDefinition,
     MetadataSlotDefinition,
     ComponentMetadataSchema,
     MetadataValidationInput,
   } from "./validateMetadata"

   // Pipeline
   export { runValidationPipeline, createValidationResult } from "./pipeline"
   export type { PipelineStage, PipelineOptions } from "./pipeline"

   // Registry
   export { registerValidator, getRegisteredValidators, clearValidatorRegistry } from "./registry"
   ```

2. Open `src/index.ts` and add a validation export line after the last existing export:

   ```ts
   export * from "./validation"
   ```

## Constraints
- Export types using `export type` (not `export`) to keep the type-only boundary clean
- Do not re-export internal utilities not part of the public API
- `clearValidatorRegistry` is exported for test use; document in type comment that it's test-only if needed

## Acceptance Criteria
- All public validator functions are importable from `"lithebox-ui"` (the package root)
- All public types are importable from `"lithebox-ui"`
- All error code constants are importable from `"lithebox-ui"`
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify import: `import { validateProps, LBX_PROP_REQUIRED } from "lithebox-ui"` resolves correctly in build output

## Notes
No runtime initialization is needed — the validation module is fully functional via pure function imports. The registry state (`_registry`) is module-level but that is acceptable for a development-time tool.
