# Task 002: Dark Mode Tokens

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Define the dark mode token values as a complete `Tokens` object. Light mode tokens already exist in `src/tokens/defaultTokens.ts` (renamed to `lightTokens` in this task). Dark tokens override only the color layer; spacing, typography, radius, and shadow remain identical.

## Files
- `src/theme/darkTokens.ts` (create)
- `src/theme/lightTokens.ts` (create)

## Implementation Steps

1. Create `src/theme/lightTokens.ts` that re-exports `defaultTokens` as `lightTokens`:

   ```ts
   import { defaultTokens } from "../tokens/defaultTokens"
   import type { Tokens } from "../tokens/types"

   export const lightTokens: Tokens = defaultTokens
   ```

2. Create `src/theme/darkTokens.ts` with full dark mode token values:

   ```ts
   import type { Tokens } from "../tokens/types"

   export const darkTokens: Tokens = {
     color: {
       primary: "#818CF8",
       secondary: "#34D399",
       background: "#0B0F19",
       surface: "#111827",
       text: {
         primary: "#F9FAFB",
         secondary: "#9CA3AF"
       },
       border: "#374151",
       error: "#F87171"
     },
     radius: {
       sm: "4px",
       md: "8px",
       lg: "16px"
     },
     spacing: {
       xs: "4px",
       sm: "8px",
       md: "16px",
       lg: "24px",
       xl: "32px"
     },
     typography: {
       fontFamily: "Inter, sans-serif",
       size: {
         sm: "12px",
         md: "14px",
         lg: "18px",
         xl: "24px"
       },
       weight: {
         regular: 400,
         medium: 500,
         bold: 700
       }
     },
     shadow: {
       sm: "0 1px 2px rgba(0,0,0,0.3)",
       md: "0 4px 6px rgba(0,0,0,0.4)"
     }
   }
   ```

## Constraints
- Do not modify `src/tokens/defaultTokens.ts`
- Structural shape of `darkTokens` must be identical to `Tokens` type
- Non-color tokens (radius, spacing, typography) must match `defaultTokens` exactly — only shadows and colors differ

## Acceptance Criteria
- `src/theme/darkTokens.ts` exists and exports `darkTokens` typed as `Tokens`
- `src/theme/lightTokens.ts` exists and exports `lightTokens` typed as `Tokens`
- Both objects satisfy the full `Tokens` interface without TypeScript errors
- Dark color values represent a properly contrasted dark palette

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify `darkTokens.color.background` is a dark hex value
3. Verify `lightTokens` and `defaultTokens` resolve to the same values

## Notes
`lightTokens` is a convenience alias — `defaultTokens` is already light mode. The separation makes `resolveTheme` symmetric and readable.
