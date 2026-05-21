# Task 003: Runtime Context

## Feature
F016 - Application Runtime Integration Layer

## Description
Create the React context that exposes the runtime state (`config` and `environment`) to all components in the Lithebox subtree. Includes the `RuntimeContext` object and the `useRuntime()` hook.

## Files
- `src/runtime/RuntimeContext.ts` (create)

## Implementation Steps

1. Create `src/runtime/RuntimeContext.ts`.

2. Import `createContext` and `useContext` from React.

3. Import `RuntimeContextValue`, `LitheboxRuntimeConfig`, `RuntimeEnvironment` from `./types`.

4. Define safe default values for the context (SSR-safe — `isBrowser: false`):

   ```ts
   const defaultEnvironment: RuntimeEnvironment = {
     isBrowser: false,
     supportsReducedMotion: false,
     supportsHover: false,
     supportsPointer: false,
   }

   const defaultConfig: LitheboxRuntimeConfig = {}
   ```

5. Create the context with these defaults:

   ```ts
   export const RuntimeContext = createContext<RuntimeContextValue>({
     config: defaultConfig,
     environment: defaultEnvironment,
   })
   ```

6. Export the `useRuntime()` hook:

   ```ts
   export function useRuntime(): RuntimeContextValue {
     return useContext(RuntimeContext)
   }
   ```

## Constraints
- The context default must be SSR-safe (no browser assumptions)
- Do not throw in `useRuntime()` — it must work with the default context outside of `LitheboxProvider` (graceful degradation)
- No side effects at module level

## Acceptance Criteria
- `src/runtime/RuntimeContext.ts` exports `RuntimeContext` and `useRuntime`
- `useRuntime()` returns `config: {}` and `isBrowser: false` when used outside of `LitheboxProvider`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. In a test, render a component using `useRuntime()` without a provider — it should return defaults without throwing
