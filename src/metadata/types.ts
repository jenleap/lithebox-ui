export type ComponentCategory =
  | "layout"
  | "input"
  | "display"
  | "feedback"
  | "navigation"
  | "overlay"
  | "data"

export type PropType = "string" | "number" | "boolean" | "enum" | "object"

export type PropSchema = {
  type: PropType
  required?: boolean
  default?: unknown
  description: string
  enumValues?: string[]
}

export type SlotSchema = {
  description: string
  allowedComponents?: string[]
  required?: boolean
}

export type VariantSchema = {
  description: string
  props?: Record<string, unknown>
}

export type CompositionRules = {
  allowedParents?: string[]
  allowedChildren?: string[]
  disallowedChildren?: string[]
  maxDepth?: number
}

export type ResponsiveMetadata = {
  breakpoints: {
    sm?: Record<string, unknown>
    md?: Record<string, unknown>
    lg?: Record<string, unknown>
    xl?: Record<string, unknown>
  }
  behavior?: {
    collapse?: boolean
    hide?: boolean
    transform?: string
  }
}

export type AccessibilityMetadata = {
  role?: string
  aria?: Record<string, string>
  keyboardInteractions?: string[]
  focusBehavior?: string
  screenReaderDescription?: string
}

export type UsageGuidelines = {
  recommended: string[]
  discouraged: string[]
  examples?: string[]
}

export type ComponentMetadata = {
  name: string
  category: ComponentCategory
  description: string
  props: Record<string, PropSchema>
  variants?: Record<string, VariantSchema>
  slots?: Record<string, SlotSchema>
  states?: string[]
  composition: CompositionRules
  responsive?: ResponsiveMetadata
  accessibility?: AccessibilityMetadata
  usage?: UsageGuidelines
  version: string
}

export type UIPattern = {
  name: string
  description: string
  structure: string[]
  components: string[]
  usage: string[]
  constraints?: string[]
}
