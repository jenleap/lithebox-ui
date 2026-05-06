# Task 001: Storybook Setup

## Feature
F004 — Storybook / Render Sandbox Integration

## Description
Install Storybook with the Vite builder and configure it for the Lithebox UI project. This establishes the foundation all subsequent story tasks depend on.

## Files
- `package.json` — add Storybook dependencies and scripts
- `.storybook/main.ts` — Storybook main config (framework, stories glob, addons)
- `.storybook/preview.ts` — global preview config (viewport defaults, backgrounds)

## Implementation Steps
1. Install Storybook for React + Vite:
   ```
   npx storybook@latest init --builder vite --type react --skip-install
   ```
   Then install the packages manually to avoid auto-start:
   - `@storybook/react`
   - `@storybook/react-vite`
   - `@storybook/addon-essentials`
   - `@storybook/addon-interactions`
   - `storybook`
2. Add scripts to `package.json`:
   - `"storybook": "storybook dev -p 6006"`
   - `"build-storybook": "storybook build"`
3. Create `.storybook/main.ts`:
   - framework: `@storybook/react-vite`
   - stories glob: `../src/**/*.stories.@(ts|tsx)`
   - addons: `@storybook/addon-essentials`
4. Create `.storybook/preview.ts`:
   - Set `parameters.layout` to `'centered'` as default
   - No raw style overrides — token system handles styling

## Constraints
- Use Storybook v8 (latest stable)
- Builder must be Vite (already used by the project)
- Do not use `npx storybook init` auto-run — manually install packages
- Do not add Storybook-specific CSS resets that could interfere with CSS variables

## Acceptance Criteria
- `npm run storybook` starts without errors
- `npm run build-storybook` completes without errors
- `.storybook/main.ts` and `.storybook/preview.ts` exist and are valid
- No existing src files are modified

## Test Steps
1. Run `npm run storybook` — Storybook opens in browser at port 6006
2. Run `npm run build-storybook` — build completes successfully
3. Run `npm run build` — existing Vite build still passes
4. Run `npm run test` — existing tests still pass

## Notes
The project uses ESM (`"type": "module"` in package.json). Storybook config files use `.ts` extension. Ensure `main.ts` exports a default config object compatible with Storybook v8's `StorybookConfig` type.
