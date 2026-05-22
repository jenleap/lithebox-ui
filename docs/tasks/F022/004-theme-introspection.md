# Task 004: Theme Introspection

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the theme introspection snapshot builder. This module captures the active theme mode, system preference state, and whether the mode has been explicitly overridden.

## Files
- `src/diagnostics/themeIntrospection.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/themeIntrospection.ts`:

   ```ts
   import type { ThemeSnapshot } from "./types"

   export type ThemeIntrospectionInput = {
     mode: "light" | "dark"
     systemPreference: "light" | "dark" | null
     overridden: boolean
   }

   export function buildThemeSnapshot(input: ThemeIntrospectionInput): ThemeSnapshot {
     return {
       mode: input.mode,
       systemPreference: input.systemPreference,
       overridden: input.overridden,
     }
   }

   export function isSystemAligned(snapshot: ThemeSnapshot): boolean {
     if (snapshot.systemPreference === null) return false
     return snapshot.mode === snapshot.systemPreference && !snapshot.overridden
   }
   ```

## Constraints
- No partial theme states — all fields must be present
- No React imports — pure data transformation
- No imports from other project modules except `./types`
- `isSystemAligned` must return `false` when `systemPreference` is `null`

## Acceptance Criteria
- `buildThemeSnapshot` returns a correctly structured `ThemeSnapshot`
- `isSystemAligned` returns `true` only when mode matches systemPreference and `overridden` is `false`
- `isSystemAligned` returns `false` when `systemPreference` is `null`
- `npm run build` passes

## Test Steps
1. Build snapshot with `mode: "dark"`, `systemPreference: "dark"`, `overridden: false` — expect `isSystemAligned` to return `true`
2. Build snapshot with `mode: "dark"`, `systemPreference: "light"`, `overridden: true` — expect `isSystemAligned` to return `false`
3. Build snapshot with `systemPreference: null` — expect `isSystemAligned` to return `false`
4. Run `npm run build`
