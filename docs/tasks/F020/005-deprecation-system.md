# Task 005: Deprecation System

## Feature
F020 - Versioning & Migration System

## Description
Implement the deprecation tracking and warning system. Provides a registry for deprecation notices and a warning emitter that surfaces deprecations in development mode.

## Files
- `src/versioning/deprecationSystem.ts` (create)

## Implementation Steps

1. Create `src/versioning/deprecationSystem.ts`:

   ```ts
   import type { DeprecationNotice, VersioningMode } from "./types"

   const _notices: Map<string, DeprecationNotice> = new Map()

   export function registerDeprecation(notice: DeprecationNotice): void {
     _notices.set(notice.feature, notice)
   }

   export function getDeprecationNotice(feature: string): DeprecationNotice | undefined {
     return _notices.get(feature)
   }

   export function getAllDeprecations(): readonly DeprecationNotice[] {
     return Array.from(_notices.values())
   }

   export function warnIfDeprecated(
     feature: string,
     mode: VersioningMode = "development"
   ): void {
     if (mode !== "development") return

     const notice = _notices.get(feature)
     if (!notice) return
     if (notice.status === "active") return

     const parts = [`[LBX deprecation] "${notice.feature}": ${notice.message}`]
     if (notice.replacement) parts.push(`Use "${notice.replacement}" instead.`)
     if (notice.removedIn) parts.push(`Will be removed in v${notice.removedIn}.`)

     console.warn(parts.join(" "))
   }

   export function clearDeprecationRegistry(): void {
     _notices.clear()
   }
   ```

## Constraints
- `warnIfDeprecated` must be a no-op in production mode
- Warnings must only emit for features with `status !== "active"`
- `clearDeprecationRegistry` is for test isolation only
- All warning output must use `console.warn` (not `console.log` or `console.error`)

## Acceptance Criteria
- `registerDeprecation` stores a `DeprecationNotice` keyed by `feature`
- `warnIfDeprecated` emits a `console.warn` in development mode for deprecated features
- `warnIfDeprecated` is silent in production mode
- `warnIfDeprecated` is silent when feature status is `"active"`
- `getAllDeprecations` returns all registered notices
- `npm run build` passes with no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Unit tests added in task 011-unit-tests

## Notes
Warnings use a `[LBX deprecation]` prefix for easy filtering in browser/Node consoles. The `warnIfDeprecated` function is designed to be called at component usage sites — callers must pass the feature identifier consistently.
