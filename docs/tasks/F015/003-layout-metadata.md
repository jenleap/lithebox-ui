# Task 003: Layout Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all four layout primitive components: `Box`, `Stack`, `Row`, and `Container`. Each metadata object must fully describe props, composition rules, responsive behavior, and usage guidelines.

## Files
- `src/metadata/components/layoutMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/layoutMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. Define and register metadata for `Box`:
   - category: `"layout"`
   - description: `"Base primitive layout element. A generic container that maps directly to a div with token-driven spacing and display props."`
   - props: `padding`, `margin`, `display`, `flexDirection`, `gap`, `width`, `height` — each with `type`, `description`, optional `default`
   - composition: `allowedChildren: []` (unrestricted — represent as empty meaning anything allowed), `allowedParents: []`
   - responsive: describe that padding and gap can vary per breakpoint
   - usage: recommended for single-dimension layout wrapping; discouraged as a replacement for semantic layout components

4. Define and register metadata for `Stack`:
   - category: `"layout"`
   - description: `"Vertical stack layout. Distributes children in a column with uniform gap spacing derived from tokens."`
   - props: `gap`, `align`, `justify`, `padding`
   - composition: `allowedChildren: []`, `allowedParents: []`
   - responsive: gap collapses at `sm`, alignment adjusts
   - usage: recommended for vertical sequences of content; discouraged for horizontal layouts

5. Define and register metadata for `Row`:
   - category: `"layout"`
   - description: `"Horizontal row layout. Distributes children in a row with optional wrapping and token-driven gap."`
   - props: `gap`, `align`, `justify`, `wrap`, `padding`
   - composition: `allowedChildren: []`, `allowedParents: []`
   - responsive: wraps to column at `sm`
   - usage: recommended for horizontal grouping and action bars; discouraged for complex grid layouts

6. Define and register metadata for `Container`:
   - category: `"layout"`
   - description: `"Page-level content width constraint. Centers content and applies max-width from tokens."`
   - props: `maxWidth`, `padding`, `center`
   - composition: `allowedParents: []`, `allowedChildren: []`
   - responsive: padding reduces at `sm`
   - usage: recommended as the outermost content wrapper; discouraged for use inside other Containers

7. Each `registerComponent(metadata)` call is a module-level side effect (called at import time, not inside a function).

8. Version all metadata at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- Prop descriptions must be human-readable strings, not code references
- Do not import from component source files — metadata is independent

## Acceptance Criteria
- `src/metadata/components/layoutMetadata.ts` exists
- Importing the file registers `Box`, `Stack`, `Row`, `Container` in the registry
- All four metadata objects have: `name`, `category`, `description`, `props`, `composition`, `version`
- `getComponent("Box")` returns the Box metadata after import
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `layoutMetadata.ts` then call `getComponent("Box")` — verify it returns metadata with `category: "layout"`
3. Verify all four components are registered after import

## Notes
Layout primitives have unrestricted composition (any child is valid). Represent this as `allowedChildren: []` meaning "no restriction", not "no children allowed" — document this convention in a code comment.
