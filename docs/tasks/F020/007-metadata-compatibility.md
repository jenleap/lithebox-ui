# Task 007: Metadata Compatibility Validator

## Feature
F020 - Versioning & Migration System

## Description
Implement metadata schema compatibility validation. Ensures that AI tooling and external systems remain compatible across metadata evolution by detecting removed or renamed metadata fields.

## Files
- `src/versioning/metadataCompatibility.ts` (create)

## Implementation Steps

1. Create `src/versioning/metadataCompatibility.ts`:

   ```ts
   import type { CompatibilityReport, CompatibilityIssue } from "./types"

   export type MetadataFieldRenameMap = Record<string, string>

   export type MetadataCompatibilityOptions = {
     renames?: MetadataFieldRenameMap
   }

   export function validateMetadataCompatibility(
     previousFields: string[],
     currentFields: string[],
     options: MetadataCompatibilityOptions = {}
   ): CompatibilityReport {
     const issues: CompatibilityIssue[] = []
     const currentSet = new Set(currentFields)
     const renames = options.renames ?? {}

     for (const field of previousFields) {
       if (currentSet.has(field)) continue

       const renamed = renames[field]
       if (renamed && currentSet.has(renamed)) {
         issues.push({
           code: "LBX_METADATA_FIELD_RENAMED",
           severity: "warning",
           message: `Metadata field "${field}" was renamed to "${renamed}".`,
           layer: "metadata",
         })
       } else {
         issues.push({
           code: "LBX_METADATA_FIELD_REMOVED",
           severity: "error",
           message: `Metadata field "${field}" was removed. This is a breaking change requiring a major version increment.`,
           layer: "metadata",
         })
       }
     }

     const errors = issues.filter((i) => i.severity === "error")
     return { compatible: errors.length === 0, issues }
   }
   ```

## Constraints
- Function must be pure — no side effects, no registry access
- Operates on field name arrays — does not import from `src/metadata`
- Removed metadata fields are always `"error"` severity (spec: require major version)
- Renamed fields with a declared rename are `"warning"` severity

## Acceptance Criteria
- Returns `{ compatible: true, issues: [] }` when all previous fields are present in current
- Returns `{ compatible: false }` when a field is removed without a declared rename
- Returns a `"warning"` issue (not an error) when a field is renamed with a declared rename
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
Metadata schema stability is critical for external tooling (e.g., Proto). The validator is intentionally parallel in structure to `tokenCompatibility.ts` to make both easy to reason about together.
