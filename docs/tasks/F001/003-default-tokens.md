# Task T003: Default Token Values

## Feature
F001-theme-token-system

## Description
Create the default token set that serves as the baseline for all theming. These values are applied when no user overrides are provided.

## Files
- `src/tokens/defaultTokens.ts` (create)

## Implementation Steps
1. Create `src/tokens/defaultTokens.ts`
2. Import the `Tokens` type from `./types`
3. Define and export `defaultTokens` as a `const` typed as `Tokens`:
   ```ts
   export const defaultTokens: Tokens = {
     color: {
       primary: "#4F46E5",
       secondary: "#22C55E",
       background: "#FFFFFF",
       surface: "#F9FAFB",
       text: {
         primary: "#111827",
         secondary: "#6B7280"
       },
       border: "#E5E7EB",
       error: "#EF4444"
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
       sm: "0 1px 2px rgba(0,0,0,0.05)",
       md: "0 4px 6px rgba(0,0,0,0.1)"
     }
   }
   ```

## Constraints
- Values must exactly match the feature spec
- Must be typed as `Tokens` — TypeScript will catch any missing fields
- No hardcoded values outside of this file (this is the single source of truth for defaults)

## Acceptance Criteria
- `src/tokens/defaultTokens.ts` exists
- `defaultTokens` is exported as a named const
- All values match the feature spec exactly
- `npm run lint` passes

## Test Steps
1. Run `npm run lint` — should pass with no type errors
2. Verify importing `defaultTokens` in another file gives full type completion

## Notes
This file is the only place default raw token values are defined.
