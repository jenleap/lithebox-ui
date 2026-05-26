# F023: Package Build, Distribution & NPM Publishing System

## Overview

This feature defines the **required setup infrastructure** to make Lithebox UI installable via:

```bash
npm install lithebox-ui
```

It establishes the end-to-end system for:
- building the library
- generating distributable artifacts
- defining public API exports
- handling TypeScript types
- managing peer dependencies
- publishing to npm
- ensuring production-safe output

This system transforms Lithebox from a source code project into a consumable UI library package.

---

## Objectives
- Enable standard npm installation of Lithebox UI
- Produce optimized, production-ready build artifacts
- Ensure correct ESM/CJS + TypeScript compatibility
- Define stable public API surface
- Prevent bundling conflicts (React, ReactDOM)
- Support tree-shakable exports
- Provide repeatable and deterministic build pipeline
- Enable safe publishing to npm registry

---

## Core Concept

Lithebox is not just a codebase — it is a distributed design system runtime.

This feature defines how that runtime is:
- compiled
- packaged
- versioned
- distributed
- consumed

---

## Scope

### Included (MVP)
Package Structure
- library folder architecture
- source vs distribution separation

Build System
- TypeScript compilation
- ESM + CJS output
- declaration file generation

Public API System
- export map definition
- entry point standardization
- tree-shakable exports

Dependency Model
- peer dependency enforcement
- React externalization rules

Asset Handling
- CSS variable injection strategy
- optional style output pipeline

Publishing Pipeline
- npm publish workflow
- versioning alignment
- dry-run validation

### Not Included
- CI/CD automation pipelines (GitHub Actions, etc.)
- multi-package monorepo orchestration (optional future feature)
- CDN distribution
- private registry support
- framework adapters (Vue, Svelte, etc.)
- auto-changelog generation
- visual regression testing pipelines

---

## Design Principles

1. The Package Must Be Framework-Safe
React must never be bundled.

2. The Build Must Be Deterministic
Same input → same output across builds.

3. Public API Must Be Explicit
No implicit or deep imports.

4. Output Must Be Tree-Shakable
Consumers must only receive what they use.

5. Source Code Must Never Be Published Directly
Only compiled artifacts are distributed.

---

## Part 1 — Package Structure

### Recommended Structure
```text
lithebox-ui/
  src/
    components/
    tokens/
    theme/
    forms/
    layout/
    validation/
    metadata/
    index.ts

  dist/
    index.js
    index.cjs
    index.d.ts

  package.json
  tsconfig.json
  tsup.config.ts
```

---

### Rules
- `src/` is never published
- `dist/` is the only publishable output
- `index.ts` is the only public entry point

---

## Part 2 — Build System

### Tooling Requirement
A modern bundler must be used:
- tsup (recommended)
- or rollup (advanced alternative)

### Build Output Requirements
Must generate:
- ESM build
- CommonJS build
- TypeScript declarations

### Example Build Configuration
```ts
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["react", "react-dom"]
})
```

### Rules
- no bundling of React or ReactDOM
- build must be clean and reproducible
- output must be deterministic

---

## Part 3 — Public API Surface

### Entry Point
```text
src/index.ts
```

### Responsibilities
- expose all public components
- expose theme system
- expose token system
- expose form system
- expose utilities

### Example
```text
export * from "./components"
export * from "./theme"
export * from "./tokens"
export * from "./forms"
export * from "./layout"
```

### Rules
- no internal modules exposed
- no deep imports supported
- API surface must remain stable across versions

---

## Part 4 — Package Manifest (package.json)

### Required Fields
```json
{
  "name": "lithebox-ui",
  "version": "0.1.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false
}
```

### Export Map (Critical)
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### Peer Dependencies
```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

### Rules
- React must not be bundled
- only dist/ is published
- exports must be explicit and locked

---

## Part 5 — TypeScript Configuration

### Required Compiler Settings
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "dist",
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

### Rules
- type declarations must be generated
- no type leakage from internal modules
- strict mode must remain enabled

---

## Part 6 — CSS & Styling Output Strategy

### Requirement
Lithebox uses token-driven CSS variables, not static CSS frameworks.

### Strategy Options

Option A (Recommended MVP)
- runtime CSS variable injection via ThemeProvider
- no CSS bundle required

Option B (Optional Extension)
- generate dist/styles.css

### Rules
- no hardcoded CSS frameworks included
- styling must remain token-driven
- theme system must remain source of truth

---

## Part 7 — Publishing Pipeline

### Required Workflow

Step 1 — Build
- npm run build

Step 2 — Validate Output
- check dist/ integrity
- verify type generation
- ensure no internal exports leaked

Step 3 — Dry Run
- npm publish --dry-run

Step 4 — Publish
- npm publish --access public

### Rules
- version must be updated before publish
- no unbuilt source can be published
- builds must be clean before release

---

## Part 8 — Tree Shaking Requirements

### Requirement
Consumers must only receive used modules.

### Rules
- ES modules must be primary build target
- no side-effectful imports
- sideEffects: false must be set

---

## Part 9 — Environment Separation

### Development Environment
- full source access
- introspection enabled
- validation debugging available

### Production Environment
- only compiled artifacts
- introspection stripped or disabled
- validation minimized

### Rules
- dev-only systems must not leak into dist build
- conditional compilation may be used for stripping

---

## Part 10 — Integration With Lithebox Systems

Token System
- compiled into runtime-compatible format

Theme System
- bundled as runtime provider logic

Validation System
- optional dev-only inclusion

Metadata System
- exposed in runtime-safe format only

Introspection Layer
- must be excluded or gated in production builds

---

## Acceptance Criteria
- Library builds successfully into dist/
- ESM + CJS outputs generated
- TypeScript declarations generated
- React is not bundled
- Public API exposed via single entry point
- npm publish succeeds via dry-run
- Tree-shaking verified
- Theme system functional post-install
- Token system functional post-install
- No internal modules exposed

---

## Definition of Done
- Build system implemented (tsup or equivalent)
- Package structure finalized
- Public API surface defined
- TypeScript configuration complete
- npm publish pipeline operational
- Peer dependency strategy enforced
- Output artifacts verified
- Production-safe distribution confirmed

---

## Risks & Considerations

1. Bundle duplication risk
Bundling React will break consumer apps.


2. Export surface drift
Internal modules accidentally exposed.


3. Type leakage risk
Internal types may leak into public API.


4. Tree-shaking failures
Improper exports may increase bundle size.

---

## Key Insight

This feature defines the boundary between:
- a local design system codebase
and
- a production-grade distributed UI platform

It is the transformation layer that makes Lithebox installable, usable, and scalable across external applications.

---

## Strategic Role in Architecture
```text
Tokens
  ↓
Theme Mode System
  ↓
Layout Primitives
  ↓
Components
  ↓
Contracts
  ↓
Interaction System
  ↓
Forms
  ↓
Navigation & Overlays
  ↓
Data Display
  ↓
Page Composition
  ↓
Feedback System
  ↓
Accessibility Architecture
  ↓
Motion & Animation Layer
  ↓
Responsive System
  ↓
Component Metadata System
  ↓
Validation & Constraint Engine
  ↓
Versioning & Migration System
  ↓
Design System Governance Layer
  ↓
Diagnostics & Introspection Layer
  ↓
Application Runtime Integration Layer
  ↓
📦 Package Build & Distribution System   ← THIS LAYER
```

## Final Insight

This feature completes the distribution boundary of Lithebox UI.

Without it:
- Lithebox remains a local system

With it:
- Lithebox becomes a consumable, installable, production-grade design system runtime