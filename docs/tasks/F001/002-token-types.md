# Task T002: Token Type Definitions

## Feature
F001-theme-token-system

## Description
Create the `Tokens` TypeScript type that defines the full design token schema. This is the foundational contract all other token work depends on.

## Files
- `src/tokens/types.ts` (create)

## Implementation Steps
1. Create `src/tokens/types.ts`
2. Define and export the `Tokens` type exactly as specified in the feature doc:
   ```ts
   export type Tokens = {
     color: {
       primary: string
       secondary: string
       background: string
       surface: string
       text: {
         primary: string
         secondary: string
       }
       border: string
       error: string
     }
     radius: {
       sm: string
       md: string
       lg: string
     }
     spacing: {
       xs: string
       sm: string
       md: string
       lg: string
       xl: string
     }
     typography: {
       fontFamily: string
       size: {
         sm: string
         md: string
         lg: string
         xl: string
       }
       weight: {
         regular: number
         medium: number
         bold: number
       }
     }
     shadow: {
       sm: string
       md: string
     }
   }
   ```
3. No other exports or logic — this file is types only

## Constraints
- Types only — no runtime values in this file
- No `any` types
- Must export `Tokens` as a named export

## Acceptance Criteria
- `src/tokens/types.ts` exists
- `Tokens` is exported as a named type
- All fields match the schema in the feature spec exactly
- `npm run lint` passes

## Test Steps
1. Run `npm run lint` — should pass with no errors
2. Import `Tokens` in another file and verify TypeScript accepts it

## Notes
This type is the contract for the entire token system. Do not add fields beyond the spec.
