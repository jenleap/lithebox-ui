# Task 001: Breakpoint Token Types and Default Tokens

## Feature
F014 - Responsive System

## Description
Define the TypeScript type system for breakpoint tokens and create the default values, including responsive density tokens and spacing scaling rules. These are the foundational constants that all responsive behavior in the system derives from.

## Files
- `src/responsive/types.ts` (create)
- `src/responsive/breakpointTokens.ts` (create)

## Implementation Steps

1. Create `src/responsive/types.ts` with the following types:
   - `Breakpoint` — union type: `"sm" | "md" | "lg" | "xl" | "xxl"`
   - `BreakpointTokens` — shape: `{ sm: number; md: number; lg: number; xl: number; xxl: number }`
   - `ResponsiveDensity` — union type: `"compact" | "comfortable"`
   - `ResponsiveDensityTokens` — shape: `{ sm: ResponsiveDensity; md: ResponsiveDensity; lg: ResponsiveDensity }`
   - `ResponsiveValue<T>` — partial record: `Partial<Record<Breakpoint, T>>`

2. Create `src/responsive/breakpointTokens.ts` exporting the default token values:
   ```ts
   export const breakpoints: BreakpointTokens = {
     sm: 640,
     md: 768,
     lg: 1024,
     xl: 1280,
     xxl: 1536,
   } as const

   export const responsiveDensity: ResponsiveDensityTokens = {
     sm: "compact",
     md: "comfortable",
     lg: "comfortable",
   } as const
   ```

3. All exports use `as const` for full literal type inference.

## Constraints
- No `any` types
- All values use `as const`
- Do not import from component files
- Breakpoint values must be numbers (pixel widths, not CSS strings)
- No component-specific breakpoints — these are global system constants only

## Acceptance Criteria
- `src/responsive/types.ts` exports `Breakpoint`, `BreakpointTokens`, `ResponsiveDensity`, `ResponsiveDensityTokens`, `ResponsiveValue`
- `src/responsive/breakpointTokens.ts` exports `breakpoints`, `responsiveDensity`
- TypeScript compiles with no errors
- `breakpoints.lg` resolves to `1024` at type level

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `breakpoints` and verify all 5 keys are present with correct values

## Notes
These tokens are the single source of truth for all screen size logic. No component may use raw pixel values for breakpoints.
