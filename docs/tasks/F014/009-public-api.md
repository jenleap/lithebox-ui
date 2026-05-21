# Task 009: Public API

## Feature
F014 - Responsive System

## Description
Create the public API barrel file for the responsive system. All consumer-facing types, hooks, utilities, and components must be exported from a single entry point at `src/responsive/index.ts`. Update the root `src/index.ts` to include the responsive module.

## Files
- `src/responsive/index.ts` (create)
- `src/index.ts` (modify)

## Implementation Steps

1. Create `src/responsive/index.ts` exporting:
   - From `types.ts`: `Breakpoint`, `BreakpointTokens`, `ResponsiveDensity`, `ResponsiveDensityTokens`, `ResponsiveValue`
   - From `breakpointTokens.ts`: `breakpoints`, `responsiveDensity`
   - From `ResponsiveContext.ts`: `ResponsiveContext`, `ResponsiveContextValue`
   - From `ResponsiveProvider.tsx`: `ResponsiveProvider`
   - From `useBreakpoint.ts`: `useBreakpoint`, `UseBreakpointResult`
   - From `responsiveContract.ts`: `ComponentResponsiveContract`, `CardResponsiveContract`, `CardResponsiveContractDefault`, `resolveResponsiveValue`

2. Open `src/index.ts` and add the responsive module export:
   ```ts
   export * from "./responsive"
   ```
   Add it after the motion module export, maintaining the existing ordering convention.

## Constraints
- Only export public-facing API — no internal helpers that are not intended for consumers
- Do not create new files — only the barrel and the root update
- Maintain the existing export ordering in `src/index.ts`

## Acceptance Criteria
- `import { useBreakpoint, ResponsiveProvider, breakpoints } from "lithebox-ui"` resolves correctly
- `import { resolveResponsiveValue } from "lithebox-ui"` resolves correctly
- All types are re-exported and accessible
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify `breakpoints` is importable from the root package entry

## Notes
Keep exports minimal — only what consumers need. Internal utilities like `resolveBreakpoint` (used inside the provider) do not need to be in the public API unless they are genuinely useful externally.
