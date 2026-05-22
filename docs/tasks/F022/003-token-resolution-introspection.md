# Task 003: Token Resolution Introspection

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the token resolution snapshot builder. This module captures resolved token values, their sources, and the resolution path for full traceability.

## Files
- `src/diagnostics/tokenResolution.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/tokenResolution.ts`:

   ```ts
   import type { TokenResolutionEntry, TokenResolutionSnapshot } from "./types"

   export type RawTokenInput = {
     key: string
     value: string
     source: "default" | "override" | "theme" | "mode"
     path: string[]
   }

   export function buildTokenResolutionSnapshot(inputs: RawTokenInput[]): TokenResolutionSnapshot {
     const tokens: Record<string, TokenResolutionEntry> = {}
     for (const input of inputs) {
       tokens[input.key] = {
         value: input.value,
         source: input.source,
         path: [...input.path],
       }
     }
     return { tokens: Object.freeze(tokens) }
   }

   export function getTokensBySource(
     snapshot: TokenResolutionSnapshot,
     source: TokenResolutionEntry["source"]
   ): Record<string, TokenResolutionEntry> {
     const result: Record<string, TokenResolutionEntry> = {}
     for (const [key, entry] of Object.entries(snapshot.tokens)) {
       if (entry.source === source) result[key] = entry
     }
     return result
   }

   export function getTokenResolutionPath(
     snapshot: TokenResolutionSnapshot,
     tokenKey: string
   ): string[] | undefined {
     return snapshot.tokens[tokenKey]?.path
   }
   ```

## Constraints
- No hidden transformations — every token entry must reflect exactly what was provided
- Snapshot `tokens` map must be frozen
- No imports from other project modules except `./types`
- Path arrays must be cloned (no reference sharing)

## Acceptance Criteria
- `buildTokenResolutionSnapshot` correctly maps all inputs into a frozen `tokens` record
- `getTokensBySource` filters entries by the given source
- `getTokenResolutionPath` returns the path array for a known token or `undefined` for unknown
- `npm run build` passes

## Test Steps
1. Build snapshot with tokens of mixed sources — verify each entry has correct `source` and `value`
2. Call `getTokensBySource("override")` — expect only override-sourced tokens
3. Call `getTokenResolutionPath` with a known key — verify correct path returned
4. Call `getTokenResolutionPath` with unknown key — expect `undefined`
5. Verify `snapshot.tokens` is frozen
6. Run `npm run build`
