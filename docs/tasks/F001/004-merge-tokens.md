# Task T004: Merge Tokens Utility

## Feature
F001-theme-token-system

## Description
Create the `mergeTokens` utility that deterministically deep-merges a base token set with partial user overrides. This is the core of the override system.

## Files
- `src/tokens/mergeTokens.ts` (create)

## Implementation Steps
1. Create `src/tokens/mergeTokens.ts`
2. Import `Tokens` from `./types`
3. Implement and export `mergeTokens` exactly as specified:
   ```ts
   export function mergeTokens(
     base: Tokens,
     overrides?: Partial<Tokens>
   ): Tokens {
     if (!overrides) return base

     return {
       ...base,
       ...overrides,

       color: {
         ...base.color,
         ...overrides.color,
         text: {
           ...base.color.text,
           ...overrides.color?.text
         }
       },

       radius: {
         ...base.radius,
         ...overrides.radius
       },

       spacing: {
         ...base.spacing,
         ...overrides.spacing
       },

       typography: {
         ...base.typography,
         ...overrides.typography,
         size: {
           ...base.typography.size,
           ...overrides.typography?.size
         },
         weight: {
           ...base.typography.weight,
           ...overrides.typography?.weight
         }
       },

       shadow: {
         ...base.shadow,
         ...overrides.shadow
       }
     }
   }
   ```

## Constraints
- Must return a full `Tokens` object — never a partial
- Overrides must not mutate the base object
- `overrides` is optional — passing `undefined` returns the base unchanged
- No deep-merge library — implement manually as specified

## Acceptance Criteria
- `src/tokens/mergeTokens.ts` exists
- `mergeTokens` is exported as a named function
- Passing `undefined` overrides returns base tokens unchanged
- Partial overrides at any nesting level are correctly merged
- Unspecified fields fall back to base values
- `npm run lint` passes

## Test Steps
1. Run `npm run lint` — should pass
2. In a test: call `mergeTokens(defaultTokens, { color: { primary: "#FF0000" } })` — result should have `color.primary === "#FF0000"` and all other values equal to defaultTokens
3. In a test: call `mergeTokens(defaultTokens, undefined)` — result should be identical to defaultTokens

## Notes
The manual spread approach is intentional for determinism and to avoid deep-merge library dependencies.
