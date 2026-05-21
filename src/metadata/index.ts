// Types
export type {
  ComponentCategory,
  PropType,
  PropSchema,
  SlotSchema,
  VariantSchema,
  CompositionRules,
  ResponsiveMetadata,
  AccessibilityMetadata,
  UsageGuidelines,
  ComponentMetadata,
  UIPattern,
} from "./types"

// Component registry
export {
  registerComponent,
  getComponent,
  getAllComponents,
  exportRegistryAsJSON,
} from "./registry"

// Pattern registry
export {
  registerPattern,
  getPattern,
  getAllPatterns,
  exportPatternsAsJSON,
} from "./patternRegistry"

// Side-effect imports — registers all components and patterns on import
import "./components/layoutMetadata"
import "./components/primitiveMetadata"
import "./components/formMetadata"
import "./components/navigationMetadata"
import "./components/dataDisplayMetadata"
import "./components/feedbackMetadata"
