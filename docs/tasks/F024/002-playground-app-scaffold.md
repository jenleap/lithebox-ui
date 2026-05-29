# Task 002: Playground App Scaffold

## Feature
F024 — Playground Application & Integration Validation System

## Description
Create the `apps/playground` Vite + React + TypeScript application. This becomes the first real consumer of the lithebox-ui package. The app must be a clean, standalone application that references lithebox-ui only via its workspace package dependency.

## Files
- `apps/playground/package.json` (create)
- `apps/playground/vite.config.ts` (create)
- `apps/playground/tsconfig.json` (create)
- `apps/playground/index.html` (create)
- `apps/playground/src/main.tsx` (create)
- `apps/playground/src/App.tsx` (create)

## Implementation Steps
1. Create `apps/playground/package.json`:
   - name: `@lithebox/playground`
   - version: `0.0.1`
   - private: true
   - dependencies: `react`, `react-dom`, `lithebox-ui: workspace:*`
   - devDependencies: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`
   - scripts: `dev`, `build`, `preview`
2. Create `apps/playground/tsconfig.json` extending the root tsconfig, targeting `src`.
3. Create `apps/playground/vite.config.ts` using `@vitejs/plugin-react`, port 5173.
4. Create `apps/playground/index.html` with `<div id="root">` and `<script type="module" src="/src/main.tsx">`.
5. Create `apps/playground/src/main.tsx` with `ReactDOM.createRoot` mounting `<App />`.
6. Create `apps/playground/src/App.tsx` with a minimal `<div>Lithebox Playground</div>` placeholder.
7. From the repo root, run `pnpm install` to link the workspace dependency.
8. Run `pnpm --filter @lithebox/playground dev` and confirm the dev server starts at localhost:5173.

## Constraints
- Import lithebox-ui only as `import { ... } from 'lithebox-ui'` — no relative paths into `../../src`
- TypeScript strict mode
- No CSS frameworks (all styling via Lithebox tokens)
- Use Vite, not CRA or Next.js

## Acceptance Criteria
- `apps/playground` directory exists with all required files
- `pnpm --filter @lithebox/playground dev` starts without errors
- Browser shows "Lithebox Playground" at localhost:5173
- `lithebox-ui` resolves as a workspace dependency (verify in lock file)

## Test Steps
1. `pnpm install` from root — no errors
2. `pnpm --filter @lithebox/playground dev` — dev server starts
3. Navigate to localhost:5173 — page renders without console errors
4. Inspect `node_modules/lithebox-ui` inside playground — it is a symlink to the workspace root

## Notes
This task creates the scaffold only. Routing, providers, and screens are added in subsequent tasks.
