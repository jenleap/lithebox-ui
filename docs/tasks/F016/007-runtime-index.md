# Task 007: Runtime Index and Public API

## Feature
F016 - Application Runtime Integration Layer

## Description
Create the barrel export for the `src/runtime/` module, then update the root `src/index.ts` to expose the runtime layer as part of the public API.

## Files
- `src/runtime/index.ts` (create)
- `src/index.ts` (modify)

## Implementation Steps

### Runtime barrel export

1. Create `src/runtime/index.ts` and export all public runtime symbols:

   ```ts
   export { LitheboxProvider } from "./LitheboxProvider"
   export type { LitheboxProviderProps } from "./LitheboxProvider"
   export { RuntimeContext, useRuntime } from "./RuntimeContext"
   export { detectEnvironment } from "./detectEnvironment"
   export { injectTokens } from "./injectTokens"
   export { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"
   export type {
     LitheboxRuntimeConfig,
     RuntimeEnvironment,
     RuntimeContextValue,
   } from "./types"
   ```

### Public API update

2. Open `src/index.ts`.

3. Add the following block at the end of the file, after the metadata exports:

   ```ts
   // Runtime Integration Layer (F016)
   export {
     LitheboxProvider,
     RuntimeContext,
     useRuntime,
     detectEnvironment,
     injectTokens,
     useIsomorphicLayoutEffect,
   } from "./runtime"
   export type {
     LitheboxProviderProps,
     LitheboxRuntimeConfig,
     RuntimeEnvironment,
     RuntimeContextValue,
   } from "./runtime"
   ```

## Constraints
- Do not remove or reorder any existing exports in `src/index.ts`
- Only add the new runtime block at the end
- Use named exports only — no `export * from "./runtime"` (to keep public API explicit)

## Acceptance Criteria
- `src/runtime/index.ts` exists and re-exports all runtime symbols
- `LitheboxProvider`, `useRuntime`, `LitheboxRuntimeConfig`, `RuntimeEnvironment` are importable from the root `"lithebox-ui"` package entry
- TypeScript compiles with no errors
- `npm run build` produces no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Confirm the dist output contains the runtime module exports
