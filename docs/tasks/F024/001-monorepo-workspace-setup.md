# Task 001: Monorepo Workspace Setup

## Feature
F024 — Playground Application & Integration Validation System

## Description
Convert the repository into a pnpm monorepo workspace so the playground can coexist with the lithebox-ui package. The current repo root becomes the monorepo root; the existing package.json is the lithebox-ui package. An `apps/` directory is added for consumer applications.

## Files
- `pnpm-workspace.yaml` (create at root)
- `package.json` (update root to add `workspaces` field and mark as private if not already)
- `.gitignore` (ensure `apps/*/node_modules` is covered)

## Implementation Steps
1. Create `pnpm-workspace.yaml` at the repo root with packages:
   ```yaml
   packages:
     - '.'
     - 'apps/*'
   ```
2. In root `package.json`, add `"private": true` (workspace roots must be private).
3. Create the `apps/` directory (empty, just the folder — no files yet).
4. Run `pnpm install` at repo root to verify workspace resolves cleanly.
5. Confirm existing lithebox-ui tests and build still pass after workspace change.

## Constraints
- Use pnpm workspaces (not npm or yarn)
- Do not move any existing source files
- Do not change the root package name (`lithebox-ui`)
- Do not add any new runtime dependencies

## Acceptance Criteria
- `pnpm-workspace.yaml` exists at repo root
- `pnpm install` completes without errors
- `npm run build` and `npm run test` at root still pass
- `apps/` directory exists

## Test Steps
1. Run `pnpm install` — no errors
2. Run `pnpm run build` — build succeeds
3. Run `pnpm run test` — tests pass

## Notes
The monorepo root IS the lithebox-ui package. No files need to move. The workspace simply adds a container for future `apps/*` entries.
