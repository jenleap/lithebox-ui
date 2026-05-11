# Task 001: Contract Type System

## Feature
F005 — Component Token Contract System

## Description
Create the TypeScript type infrastructure for the contract system. This establishes the foundational types that all component contracts will build on, and creates the barrel export for the contracts module.

## Files
- `src/contracts/types.ts` (create)
- `src/contracts/index.ts` (create)

## Implementation Steps
1. Create the `src/contracts/` directory
2. Create `src/contracts/types.ts` with:
   - `SemanticSlot` — a string union type representing all valid token path keys (e.g. `"color.primary"`, `"spacing.md"`)
   - `ContractSlotMap` — a `Record<string, SemanticSlot | "transparent" | "none">` type for mapping named slots to token paths or literal values
   - `ComponentContract<TVariants, TSizes>` — a generic type that describes the structure of a contract object with `variant`, `size`, and `radius` (or similar dimensions)
   - `ResolvedContract` — a type describing the flattened CSS-property-to-CSS-variable resolution result
3. Create `src/contracts/index.ts` exporting all types from `types.ts`

## Constraints
- No `any` types
- Types must be strict enough to prevent arbitrary string token paths
- `SemanticSlot` must be derived from the existing `Tokens` type structure in `src/tokens/types.ts`
- Do not modify any existing files

## Acceptance Criteria
- `src/contracts/types.ts` exists and exports all required types
- `src/contracts/index.ts` exports the public API
- TypeScript compiles with no errors (`npm run build` passes)
- `SemanticSlot` covers all valid token paths from the `Tokens` type

## Test Steps
1. Run `npm run build` — must pass with no type errors

## Notes
`SemanticSlot` should enumerate token paths like `"color.primary"`, `"color.text.primary"`, `"spacing.md"`, `"typography.size.md"`, etc. — derived from the `Tokens` shape, not hardcoded.
