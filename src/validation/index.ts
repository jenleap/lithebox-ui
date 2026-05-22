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
