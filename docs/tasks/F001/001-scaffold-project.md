# Task T001: Scaffold Project

## Feature
F001-theme-token-system

## Description
Initialize the npm project with all dependencies required to build a TypeScript React component library. Set up configuration files for TypeScript and Vite (library mode). Create the src directory structure.

## Files
- `package.json` (create)
- `tsconfig.json` (create)
- `vite.config.ts` (create)
- `src/` (create directory structure)

## Implementation Steps
1. Create `package.json` with the following:
   - name: `lithebox-ui`
   - version: `0.0.1`
   - private: `true`
   - type: `module`
   - scripts: `{ "dev": "vite", "build": "vite build", "test": "vitest", "lint": "tsc --noEmit" }`
   - dependencies: `react@^18`, `react-dom@^18`
   - devDependencies: `typescript@^5`, `@types/react@^18`, `@types/react-dom@^18`, `vite@^5`, `@vitejs/plugin-react@^4`, `vitest@^1`, `@vitest/ui@^1`, `@testing-library/react@^14`, `@testing-library/jest-dom@^6`, `jsdom@^24`
2. Create `tsconfig.json` with:
   - `strict: true`
   - `target: "ES2020"`
   - `lib: ["ES2020", "DOM", "DOM.Iterable"]`
   - `module: "ESNext"`
   - `moduleResolution: "bundler"`
   - `jsx: "react-jsx"`
   - `declaration: true`
   - `declarationDir: "dist/types"`
   - `outDir: "dist"`
   - `include: ["src"]`
3. Create `vite.config.ts` configured for library mode:
   - entry: `src/index.ts`
   - formats: `["es", "cjs"]`
   - fileName: `(format) => \`index.${format}.js\``
   - externalise `react` and `react-dom`
   - configure vitest with jsdom environment and setupFiles
4. Create `src/tokens/` directory placeholder (`.gitkeep` or first token file)
5. Create `src/theme/` directory placeholder
6. Run `npm install` to install all dependencies

## Constraints
- Use Vite 5 + React 18 + TypeScript 5
- Library must be buildable without a dev app
- Do not use CSS modules or styled-components — all styling is token-driven via CSS variables
- Do not install a CSS preprocessor

## Acceptance Criteria
- `package.json` exists with all required dependencies listed
- `tsconfig.json` exists with strict mode enabled
- `vite.config.ts` exists in library mode
- `npm install` completes without errors
- `npm run lint` succeeds (no TS errors) on an empty `src/index.ts`

## Test Steps
1. Run `npm install` — should complete with no errors
2. Create empty `src/index.ts`
3. Run `npm run lint` — should pass
4. Run `npm run build` — should produce `dist/` output

## Notes
Directory structure after this task:
```
src/
  tokens/
  theme/
```
