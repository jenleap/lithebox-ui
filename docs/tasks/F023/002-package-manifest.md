# Task T002: Update Package Manifest for NPM Publishing

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Update `package.json` to be publishable to npm. Remove `"private": true`, set the correct version, add the export map, peer dependencies, `files` whitelist, and `sideEffects: false`.

## Files
- `package.json` — multiple field updates

## Implementation Steps
1. Remove `"private": true`
2. Set `"version"` to `"0.1.0"`
3. Add `"main"`: `"./dist/index.cjs"`
4. Add `"module"`: `"./dist/index.js"`
5. Add `"types"`: `"./dist/index.d.ts"`
6. Add `"files"`: `["dist"]`
7. Add `"sideEffects"`: `false`
8. Add `"exports"` map:
   ```json
   "exports": {
     ".": {
       "import": "./dist/index.js",
       "require": "./dist/index.cjs",
       "types": "./dist/index.d.ts"
     }
   }
   ```
9. Add `"peerDependencies"`:
   ```json
   "peerDependencies": {
     "react": ">=18",
     "react-dom": ">=18"
   }
   ```
10. Move `"react"` and `"react-dom"` from `dependencies` to `devDependencies` (they are peer deps, not bundled deps)
11. Add `"prepublishOnly"` script: `"npm run build"`

## Constraints
- Do not remove any existing devDependencies
- Keep all existing scripts intact (dev, test, lint, storybook, build-storybook)
- React and react-dom must appear in both peerDependencies AND devDependencies (peer for consumers, dev for local development)
- The `files` array must only contain `"dist"` — src is never published
- `sideEffects: false` is required for tree-shaking to work

## Acceptance Criteria
- `package.json` has no `"private"` field
- `"version"` is `"0.1.0"`
- `"main"`, `"module"`, `"types"` fields are present and point to correct dist paths
- `"exports"` map is present with import/require/types entries
- `"peerDependencies"` includes react and react-dom >=18
- `"files"` is `["dist"]`
- `"sideEffects"` is `false`
- `"prepublishOnly"` script runs the build

## Test Steps
1. Run `npm run build` — should complete successfully
2. Run `node -e "console.log(JSON.parse(require('fs').readFileSync('package.json','utf8')).exports)"` — should output the exports map
3. Run `npm pack --dry-run` — should only list dist/ files, not src/

## Notes
Moving react/react-dom to devDependencies prevents them from being installed as direct dependencies in consumer apps. Peer dependencies declare the requirement without bundling.
