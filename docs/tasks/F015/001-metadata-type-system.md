# Task 001: Metadata Type System

## Feature
F015 - Component Metadata System

## Description
Define all TypeScript types that form the foundation of the metadata system. This includes the base `ComponentMetadata` type and all sub-schemas: `PropSchema`, `SlotSchema`, `VariantSchema`, `CompositionRules`, `ResponsiveMetadata`, `AccessibilityMetadata`, `UsageGuidelines`, and `UIPattern`. These types are the schema contract for the entire F015 system.

## Files
- `src/metadata/types.ts` (create)

## Implementation Steps

1. Create `src/metadata/types.ts` and define the following types exactly as specified:

   ```ts
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
   ```

## Constraints
- No `any` types
- All types must be export-named (no `export default`)
- No React imports — this file is pure TypeScript
- Do not import from component files
- `version` field on `ComponentMetadata` must be a string (e.g. `"1.0.0"`)

## Acceptance Criteria
- `src/metadata/types.ts` exists and exports all 9 types: `ComponentCategory`, `PropType`, `PropSchema`, `SlotSchema`, `VariantSchema`, `CompositionRules`, `ResponsiveMetadata`, `AccessibilityMetadata`, `UsageGuidelines`, `ComponentMetadata`, `UIPattern`
- TypeScript compiles with no errors
- `ComponentMetadata` includes all required fields: `name`, `category`, `description`, `props`, `composition`, `version`

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `ComponentMetadata` in a test file and assert it requires `name`, `category`, `description`, `props`, `composition`, `version`

## Notes
These types are the grammar of the metadata system. All downstream tasks derive from them. Do not add runtime logic here — types only.
