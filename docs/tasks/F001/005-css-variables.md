# Task T005: CSS Variable Conversion Utility

## Feature
F001-theme-token-system

## Description
Create the `tokensToCSSVariables` utility that converts a resolved `Tokens` object into a flat map of CSS custom property names to values, ready for DOM injection.

## Files
- `src/tokens/tokensToCSSVariables.ts` (create)

## Implementation Steps
1. Create `src/tokens/tokensToCSSVariables.ts`
2. Import `Tokens` from `./types`
3. Implement and export `tokensToCSSVariables` exactly as specified:
   ```ts
   export function tokensToCSSVariables(tokens: Tokens): Record<string, string> {
     return {
       "--color-primary": tokens.color.primary,
       "--color-secondary": tokens.color.secondary,
       "--color-background": tokens.color.background,
       "--color-surface": tokens.color.surface,
       "--color-text-primary": tokens.color.text.primary,
       "--color-text-secondary": tokens.color.text.secondary,
       "--color-border": tokens.color.border,
       "--color-error": tokens.color.error,

       "--radius-sm": tokens.radius.sm,
       "--radius-md": tokens.radius.md,
       "--radius-lg": tokens.radius.lg,

       "--spacing-xs": tokens.spacing.xs,
       "--spacing-sm": tokens.spacing.sm,
       "--spacing-md": tokens.spacing.md,
       "--spacing-lg": tokens.spacing.lg,
       "--spacing-xl": tokens.spacing.xl,

       "--font-family": tokens.typography.fontFamily,
       "--font-size-sm": tokens.typography.size.sm,
       "--font-size-md": tokens.typography.size.md,
       "--font-size-lg": tokens.typography.size.lg,
       "--font-size-xl": tokens.typography.size.xl,
       "--font-weight-regular": String(tokens.typography.weight.regular),
       "--font-weight-medium": String(tokens.typography.weight.medium),
       "--font-weight-bold": String(tokens.typography.weight.bold),

       "--shadow-sm": tokens.shadow.sm,
       "--shadow-md": tokens.shadow.md
     }
   }
   ```

## Constraints
- Return type must be `Record<string, string>` — all values are strings
- CSS variable names must exactly match the naming convention: `--color-primary`, `--spacing-md`, `--font-size-lg`, etc.
- All 25 variables from the spec must be present
- Do not add or omit any variables

## Acceptance Criteria
- `src/tokens/tokensToCSSVariables.ts` exists
- `tokensToCSSVariables` is exported as a named function
- All 25 CSS variables are included in the output
- Naming matches the convention in the feature spec exactly
- `npm run lint` passes

## Test Steps
1. Run `npm run lint` — should pass
2. In a test: call `tokensToCSSVariables(defaultTokens)` and verify:
   - Result contains `"--color-primary": "#4F46E5"`
   - Result contains `"--font-weight-bold": "700"` (string, not number)
   - Result has exactly 25 keys

## Notes
The CSS variable names defined here are the stable public API for component authors. They must not change once set.
