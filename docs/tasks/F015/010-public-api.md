# Task 010: Public API

## Feature
F015 - Component Metadata System

## Description
Create the public index for the metadata system and wire it into the main library entry point. All metadata types, registry utilities, pattern registry utilities, and individual component metadata modules must be exported from a single entry point at `src/metadata/index.ts`. Then add a re-export from `src/index.ts`.

## Files
- `src/metadata/index.ts` (create)
- `src/index.ts` (modify — add metadata re-export)

## Implementation Steps

1. Create `src/metadata/index.ts`:

   ```ts
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

   // Side-effect imports — these register all components and patterns on import
   import "./components/layoutMetadata"
   import "./components/primitiveMetadata"
   import "./components/formMetadata"
   import "./components/navigationMetadata"
   import "./components/dataDisplayMetadata"
   import "./components/feedbackMetadata"
   import "./patternRegistry"
   ```

   Note: The side-effect imports at the bottom ensure that importing from `@lithebox-ui/metadata` (or `src/metadata`) automatically populates both registries.

2. Add a re-export block to `src/index.ts`:

   Open `src/index.ts` and append (do not replace existing exports):

   ```ts
   // Metadata System (F015)
   export * from "./metadata"
   ```

   Place this at the end of the file, after all existing export blocks.

## Constraints
- Do not remove or replace existing exports in `src/index.ts`
- The side-effect imports in `src/metadata/index.ts` must be listed last (after all named exports)
- No `any` types
- No React imports in `src/metadata/index.ts`
- Do not re-export internal registry state (`_registry`, `_patternRegistry`)

## Acceptance Criteria
- `src/metadata/index.ts` exists and re-exports all types and utilities
- Importing `src/metadata` triggers registration of all components and patterns
- `getAllComponents()` after import returns at least 30 component entries
- `getAllPatterns()` after import returns exactly 4 patterns
- `src/index.ts` exports everything from `./metadata` without breaking existing exports
- TypeScript compiles with no errors
- `npm run build` passes with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors, no missing exports
2. Import `{ getAllComponents, getAllPatterns }` from `src/metadata` — verify counts
3. Verify `exportRegistryAsJSON` and `exportPatternsAsJSON` are accessible from `src/index.ts`
4. Confirm existing exports from `src/index.ts` (tokens, components, etc.) are unaffected

## Notes
The side-effect import pattern is intentional — it mirrors how CSS-in-JS libraries register styles on import. This keeps each metadata file self-contained without requiring a manual registration call from consumers.
