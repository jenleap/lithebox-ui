# Task T003: Create tsconfig.build.json for Library Compilation

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Create a dedicated `tsconfig.build.json` for library builds. This config extends the base `tsconfig.json` but targets only `src/` for compilation, excludes test files, and sets the correct declaration output path (`dist/`). Update `tsup.config.ts` to reference it.

## Files
- `tsconfig.build.json` — create new file
- `tsup.config.ts` — add `tsconfig` option
- `tsconfig.json` — update `declarationDir` to `"dist"` (aligns with spec)

## Implementation Steps
1. Create `tsconfig.build.json` at project root:
   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "declaration": true,
       "declarationDir": "dist",
       "emitDeclarationOnly": false,
       "noEmit": false
     },
     "include": ["src"],
     "exclude": [
       "src/**/*.test.ts",
       "src/**/*.test.tsx",
       "src/**/__tests__/**",
       "node_modules",
       "dist"
     ]
   }
   ```
2. Update `tsconfig.json`:
   - Change `"declarationDir"` from `"dist/types"` to `"dist"`
3. Update `tsup.config.ts` to reference the build tsconfig:
   ```ts
   import { defineConfig } from "tsup"

   export default defineConfig({
     entry: ["src/index.ts"],
     format: ["esm", "cjs"],
     dts: true,
     clean: true,
     sourcemap: true,
     external: ["react", "react-dom", "react/jsx-runtime"],
     tsconfig: "tsconfig.build.json",
   })
   ```

## Constraints
- Do not change `"strict": true` in tsconfig.json
- Test files must be excluded from the build tsconfig
- `declarationDir` must be `"dist"` (not `"dist/types"`) to match package.json's `"types": "./dist/index.d.ts"`
- Do not disable strict mode or change target/module settings

## Acceptance Criteria
- `tsconfig.build.json` exists and extends `tsconfig.json`
- Test files are excluded from build compilation
- `tsconfig.json` has `declarationDir: "dist"`
- `tsup.config.ts` references `tsconfig.build.json`
- `npm run build` still completes without errors

## Test Steps
1. Run `npm run build`
2. Verify `dist/index.d.ts` is generated (not `dist/types/index.d.ts`)
3. Run `npm run test` — confirm tests still pass (test config uses the base tsconfig)
4. Run `npm run lint` — confirm no type errors

## Notes
The base `tsconfig.json` is used by the IDE and vitest. The build tsconfig excludes test files to keep the published type declarations clean. tsup's `dts: true` delegates declaration generation to the TypeScript compiler via the referenced tsconfig.
