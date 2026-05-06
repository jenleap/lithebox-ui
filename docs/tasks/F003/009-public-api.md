# Task 009: Public API

## Feature
F003 — Core Primitive Component Library

## Description
Extend `src/index.ts` to export all F003 components and their prop types. This makes the entire component layer available as a single import from the library root.

## Files
- Modify: `src/index.ts`

## Implementation Steps
1. Open `src/index.ts`
2. Add the following exports after the existing primitives exports:
   ```ts
   export { Text } from "./components/Text"
   export type { TextProps } from "./components/Text"

   export { Heading } from "./components/Heading"
   export type { HeadingProps } from "./components/Heading"

   export { Label } from "./components/Label"
   export type { LabelProps } from "./components/Label"

   export { Card } from "./components/Card"
   export type { CardProps } from "./components/Card"

   export { Surface } from "./components/Surface"
   export type { SurfaceProps } from "./components/Surface"

   export { Divider } from "./components/Divider"
   export type { DividerProps } from "./components/Divider"

   export { Button } from "./components/Button"
   export type { ButtonProps } from "./components/Button"

   export { Icon } from "./components/Icon"
   export type { IconProps } from "./components/Icon"
   ```

## Constraints
- Do not remove or modify existing exports
- Append only — do not reorder existing lines
- Each component and its props type must be exported separately

## Acceptance Criteria
- All 8 F003 components are importable from the library root
- All 8 prop types are importable from the library root
- Existing exports remain unchanged
- No TypeScript errors in `src/index.ts`

## Test Steps
1. Run `npm run build` — verify no TypeScript errors
2. Verify each component can be imported: `import { Text, Heading, Label, Card, Surface, Divider, Button, Icon } from "lithebox-ui"`
3. Verify each prop type can be imported: `import type { TextProps, HeadingProps, ... } from "lithebox-ui"`

## Notes
No new logic is introduced in this task — it is purely an export wiring task.
