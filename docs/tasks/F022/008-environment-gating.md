# Task 008: Environment Gating

## Feature
F022 - Diagnostics & Introspection Layer

## Description
Implement the environment gating module. This module determines whether introspection is enabled based on the current environment. Full introspection is only available in non-production environments.

## Files
- `src/diagnostics/environmentGating.ts` (create)

## Implementation Steps

1. Create `src/diagnostics/environmentGating.ts`:

   ```ts
   export type IntrospectionEnvironment = "development" | "production"

   export function detectIntrospectionEnvironment(): IntrospectionEnvironment {
     if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") {
       return "production"
     }
     return "development"
   }

   export function isIntrospectionEnabled(env: IntrospectionEnvironment): boolean {
     return env === "development"
   }

   export function guardIntrospection<T>(
     env: IntrospectionEnvironment,
     produce: () => T,
     fallback: T
   ): T {
     if (!isIntrospectionEnabled(env)) return fallback
     return produce()
   }
   ```

## Constraints
- No React imports — pure environment detection
- No imports from other project modules — standalone leaf module
- `guardIntrospection` must never call `produce` in production
- Detection must safely handle environments where `process` is undefined (e.g., browser without bundler shims)

## Acceptance Criteria
- `detectIntrospectionEnvironment` returns `"production"` when `process.env.NODE_ENV === "production"`
- `detectIntrospectionEnvironment` returns `"development"` in all other cases including when `process` is undefined
- `isIntrospectionEnabled` returns `true` only for `"development"`
- `guardIntrospection` returns `fallback` in production without calling `produce`
- `guardIntrospection` calls `produce` and returns its result in development
- `npm run build` passes

## Test Steps
1. Call `isIntrospectionEnabled("development")` — expect `true`
2. Call `isIntrospectionEnabled("production")` — expect `false`
3. Call `guardIntrospection("production", () => "real", "fallback")` — expect `"fallback"` without calling producer
4. Call `guardIntrospection("development", () => "real", "fallback")` — expect `"real"`
5. Run `npm run build`
