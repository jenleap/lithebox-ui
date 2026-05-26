# Task T006: NPM Publish Dry Run Validation

## Feature
F023 — Package Build, Distribution & NPM Publishing System

## Description
Run `npm publish --dry-run` to validate the full publish manifest. Verify that only `dist/` files are included in the published package, that package metadata is correct, and that the package is ready for a real `npm publish`.

## Files
- `package.json` — may require minor corrections if dry run reveals issues

## Implementation Steps
1. Ensure the build is current: run `npm run build`
2. Run: `npm publish --dry-run`
3. Review the output — it will list all files that would be published
4. Verify the published file list includes ONLY:
   - `dist/index.js`
   - `dist/index.cjs`
   - `dist/index.d.ts`
   - `dist/index.js.map`
   - `dist/index.cjs.map`
   - `package.json`
   - `README.md` (if it exists)
5. Verify the published file list does NOT include:
   - Any files from `src/`
   - `node_modules/`
   - `vite.config.ts`
   - `tsup.config.ts`
   - `tsconfig*.json`
   - `.storybook/`
   - `docs/`
6. Verify the package name is `"lithebox-ui"`
7. Verify the version shown is `"0.1.0"`
8. If any unexpected files are included, add them to a `.npmignore` file at project root
9. If any required dist files are missing, re-run `npm run build` and verify tsup output

## Constraints
- Do NOT run `npm publish` (no `--dry-run` flag) — only the dry run
- Only `dist/` contents should appear in the published package
- If `.npmignore` is needed, only add entries for files that should not be published

## Acceptance Criteria
- `npm publish --dry-run` exits without errors
- Published file list contains only dist/ artifacts + package.json
- No src/ files appear in the published list
- Package name is `lithebox-ui`, version is `0.1.0`
- Total package size reported is reasonable (under 200KB)

## Test Steps
1. `npm run build` — exits 0
2. `npm publish --dry-run` — exits 0, review file list
3. Confirm no src/ files in the output
4. Confirm dist/ files are all present

## Notes
The `"files": ["dist"]` field in package.json is the primary mechanism for controlling what gets published. An `.npmignore` is a fallback if needed. The dry run will also validate that the `exports` map in package.json is correctly structured and that the registry would accept the package.
