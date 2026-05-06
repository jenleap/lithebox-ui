# Task 005: Public API Exports

## Feature
F002 — Core Layout Primitives System

## Description
Export all four layout primitives (Box, Stack, Row, Container) and their prop types from the public API entry point at `src/index.ts`. This makes the primitives available to consumers of the library.

## Files
- Modify: `src/index.ts`

## Implementation Steps
1. Open `src/index.ts`
2. Add export statements for all four primitives after the existing F001 exports:
   ```ts
   export { Box } from "./primitives/Box"
   export type { BoxProps } from "./primitives/Box"

   export { Stack } from "./primitives/Stack"
   export type { StackProps } from "./primitives/Stack"

   export { Row } from "./primitives/Row"
   export type { RowProps } from "./primitives/Row"

   export { Container } from "./primitives/Container"
   export type { ContainerProps } from "./primitives/Container"
   ```
3. Do not remove or modify any existing F001 exports
4. Ensure each primitive file exports its props type (update component files if needed to add `export type { XProps }`)

## Constraints
- Do not change existing exports
- Export both the component and its props type for each primitive
- Keep exports grouped by feature (F001 exports first, then F002 primitives)

## Acceptance Criteria
- `Box`, `Stack`, `Row`, `Container` are importable from the library root
- `BoxProps`, `StackProps`, `RowProps`, `ContainerProps` are importable as types from the library root
- All existing F001 exports remain intact and unchanged
- `npm run build` passes with no errors

## Test Steps
1. Run `npm run build` — verify no TypeScript or build errors
2. Confirm the following imports resolve without error:
   - `import { Box } from "lithebox-ui"`
   - `import { Stack } from "lithebox-ui"`
   - `import { Row } from "lithebox-ui"`
   - `import { Container } from "lithebox-ui"`
   - `import type { BoxProps, StackProps, RowProps, ContainerProps } from "lithebox-ui"`

## Notes
Props types must be explicitly exported from each component file using `export type { XProps }` or by defining them with `export type XProps = ...`. Named re-exports via `export type` in index.ts require the type to be exported from the source file.
