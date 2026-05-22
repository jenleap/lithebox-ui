# Task 001: Introspection Types

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Define all TypeScript types that form the shared contract for every F022 module. These types must exist before any implementation begins.

## Files
- `src/diagnostics/types.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/types.ts`:

   ```ts
   export type ComponentTreeSnapshot = {
     id: string
     type: string
     props: Record<string, unknown>
     children?: ComponentTreeSnapshot[]
   }

   export type TokenResolutionEntry = {
     value: string
     source: "default" | "override" | "theme" | "mode"
     path: string[]
   }

   export type TokenResolutionSnapshot = {
     tokens: Record<string, TokenResolutionEntry>
   }

   export type ThemeSnapshot = {
     mode: "light" | "dark"
     systemPreference: "light" | "dark" | null
     overridden: boolean
   }

   export type ValidationSnapshotIssue = {
     component: string
     code: string
     severity: "error" | "warning"
     message: string
   }

   export type ValidationSnapshot = {
     valid: boolean
     issues: ValidationSnapshotIssue[]
   }

   export type MetadataSnapshot = {
     components: Record<string, unknown>
   }

   export type SystemHealthSnapshot = {
     driftDetected: boolean
     contractViolations: number
     metadataWarnings: number
   }

   export type IntrospectionSnapshot = {
     components: ComponentTreeSnapshot
     tokens: TokenResolutionSnapshot
     theme: ThemeSnapshot
     validation: ValidationSnapshot
     metadata: MetadataSnapshot
     system: SystemHealthSnapshot
   }
   ```

## Constraints
- No runtime code — types only
- No imports from other project files — leaf-level module
- All types must be `export`ed
- `MetadataSnapshot` here is the introspection type — it is distinct from `MetadataSnapshot` in `src/governance/integrityModel.ts` (that is a governance-internal type)

## Acceptance Criteria
- `src/diagnostics/types.ts` exports: `ComponentTreeSnapshot`, `TokenResolutionEntry`, `TokenResolutionSnapshot`, `ThemeSnapshot`, `ValidationSnapshotIssue`, `ValidationSnapshot`, `MetadataSnapshot`, `SystemHealthSnapshot`, `IntrospectionSnapshot`
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
