# Task T001: Install tsup and Create Build Configuration

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Install tsup as a dev dependency and create `tsup.config.ts` with the required library build configuration. Update the `build` script in `package.json` to use tsup. Remove the vite library build config (keep vite only for dev/storybook) to avoid duplication.

## Files
- `package.json` — add tsup to devDependencies, update `build` script
- `tsup.config.ts` — create new file
- `vite.config.ts` — remove `build.lib` and `build.rollupOptions` (keep `plugins` and `test`)

## Implementation Steps
1. Run: `npm install --save-dev tsup`
2. Create `tsup.config.ts` at root:
   ```ts
   import { defineConfig } from "tsup"

   export default defineConfig({
     entry: ["src/index.ts"],
     format: ["esm", "cjs"],
     dts: true,
     clean: true,
     sourcemap: true,
     external: ["react", "react-dom", "react/jsx-runtime"],
   })
   ```
3. Update `package.json` scripts:
   - Change `"build"` to `"tsup"` (so `npm run build` uses tsup)
   - Add `"build:storybook"` entry remains unchanged
4. Update `vite.config.ts` — remove the `build` key entirely (lib build now owned by tsup):
   ```ts
   import { defineConfig } from "vite"
   import react from "@vitejs/plugin-react"

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: "jsdom",
       setupFiles: ["./src/test-setup.ts"],
       globals: true
     }
   })
   ```

## Constraints
- Do not remove the `test` or `plugins` config from vite.config.ts
- tsup must externalize `react`, `react-dom`, and `react/jsx-runtime`
- Output format must be `["esm", "cjs"]` — do not add iife or umd
- `dts: true` is required for type declarations
- `clean: true` ensures stale dist artifacts are removed each build

## Acceptance Criteria
- `tsup` is listed in `devDependencies` in package.json
- `tsup.config.ts` exists at project root
- `npm run build` runs tsup (not vite build)
- `vite.config.ts` no longer contains a `build.lib` section
- Running `npm run build` produces output in `dist/`

## Test Steps
1. Run `npm run build`
2. Confirm `dist/` is created with files present
3. Confirm no errors in build output

## Notes
The existing `vite.config.ts` had a library build using `build.lib`. tsup replaces this for distribution builds. Vite is kept solely for the dev server and Storybook. The `test` config in vite.config.ts must remain as vitest reads it.
