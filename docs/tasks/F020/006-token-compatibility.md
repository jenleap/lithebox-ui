# Task 006: Token Compatibility Validator

## Feature
F020 - Versioning & Migration System

## Description
Implement token schema compatibility validation. Validates that a set of token keys remains compatible across versions — detecting removed semantic tokens and flagging renamed tokens.

## Files
- `src/versioning/tokenCompatibility.ts` (create)

## Implementation Steps

1. Create `src/versioning/tokenCompatibility.ts`:

   ```ts
   import type { CompatibilityReport, CompatibilityIssue } from "./types"

   export type TokenRenameMap = Record<string, string>

   export type TokenCompatibilityOptions = {
     renames?: TokenRenameMap
   }

   export function validateTokenCompatibility(
     previousKeys: string[],
     currentKeys: string[],
     options: TokenCompatibilityOptions = {}
   ): CompatibilityReport {
     const issues: CompatibilityIssue[] = []
     const currentSet = new Set(currentKeys)
     const renames = options.renames ?? {}

     for (const key of previousKeys) {
       if (currentSet.has(key)) continue

       const renamed = renames[key]
       if (renamed && currentSet.has(renamed)) {
         issues.push({
           code: "LBX_TOKEN_RENAMED",
           severity: "warning",
           message: `Token "${key}" was renamed to "${renamed}".`,
           layer: "tokens",
         })
       } else {
         issues.push({
           code: "LBX_TOKEN_REMOVED",
           severity: "error",
           message: `Token "${key}" was removed. This is a breaking change.`,
           layer: "tokens",
         })
       }
     }

     const errors = issues.filter((i) => i.severity === "error")
     return { compatible: errors.length === 0, issues }
   }
   ```

## Constraints
- Function must be pure — no side effects, no registry access
- Renamed tokens surface as `"warning"` (not breaking if the rename is declared)
- Removed tokens without a rename declaration surface as `"error"` (breaking)
- `compatible` is `true` only when no `"error"` severity issues exist

## Acceptance Criteria
- Returns `{ compatible: true, issues: [] }` when no tokens are removed or renamed
- Returns `{ compatible: false }` when a token is removed without a declared rename
- Returns `{ compatible: true }` with a `"warning"` issue when a token is renamed and the rename is declared
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
This validator operates on token key arrays — it does not import the actual token system. The caller provides the key sets, keeping this module decoupled from the token implementation.
