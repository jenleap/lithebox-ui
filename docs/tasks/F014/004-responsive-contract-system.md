# Task 004: Responsive Contract System

## Feature
F014 - Responsive System

## Description
Define the responsive contract type system and a resolver utility. Responsive contracts define how a component's behavior changes per breakpoint (density, padding, spacing, visibility). The resolver picks the correct value for the current breakpoint using a "closest smaller breakpoint" fallback strategy.

## Files
- `src/responsive/responsiveContract.ts` (create)

## Implementation Steps

1. Create `src/responsive/responsiveContract.ts` with:

   **Types:**
   ```ts
   export interface ComponentResponsiveContract<T> {
     sm?: T
     md?: T
     lg?: T
     xl?: T
     xxl?: T
   }

   export interface CardResponsiveContract {
     density: ResponsiveDensity
     padding: "sm" | "md" | "lg"
   }
   ```

   **Resolver utility:**
   ```ts
   export function resolveResponsiveValue<T>(
     contract: ComponentResponsiveContract<T>,
     breakpoint: Breakpoint
   ): T | undefined
   ```

   - Breakpoint resolution order: `["sm", "md", "lg", "xl", "xxl"]`
   - Walk from the current breakpoint downward until a defined value is found
   - Return `undefined` if no value is found at any breakpoint

2. Export the built-in component contracts:
   ```ts
   export const CardResponsiveContractDefault: ComponentResponsiveContract<CardResponsiveContract> = {
     sm: { density: "compact", padding: "sm" },
     md: { density: "comfortable", padding: "md" },
     lg: { density: "comfortable", padding: "lg" },
   } as const
   ```

## Constraints
- No `any` types
- The resolver must use fallback logic (not exact match only)
- Do not import from component files — contracts are pure type/data definitions

## Acceptance Criteria
- `ComponentResponsiveContract<T>` type exported
- `resolveResponsiveValue` exported and functional
- `resolveResponsiveValue({ lg: "foo" }, "xl")` returns `"foo"` (fallback to `lg`)
- `resolveResponsiveValue({ lg: "foo" }, "sm")` returns `undefined` (no smaller match)
- `CardResponsiveContractDefault` exported
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Call `resolveResponsiveValue({ md: "bar" }, "lg")` — should return `"bar"`
3. Call `resolveResponsiveValue({}, "md")` — should return `undefined`

## Notes
The fallback strategy ("closest smaller breakpoint") mirrors CSS cascade behavior and prevents gaps in responsive contracts.
