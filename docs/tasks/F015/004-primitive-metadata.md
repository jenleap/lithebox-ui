# Task 004: Core Primitive Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all core primitive components: `Text`, `Heading`, `Label`, `Card`, `Surface`, `Divider`, `Button`, and `Icon`. These are the most commonly used components and must have complete, accurate metadata including variants, states, accessibility, and composition rules.

## Files
- `src/metadata/components/primitiveMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/primitiveMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. **Text** — category: `"display"`:
   - props: `size`, `weight`, `color`, `align`, `truncate`
   - variants: `body`, `caption`, `overline`
   - composition: `allowedParents: ["Box", "Stack", "Row", "Card", "Surface"]`, `disallowedChildren: ["Heading", "Button"]`
   - accessibility: `role: "paragraph"`, `screenReaderDescription: "Renders inline text content"`
   - states: `["default"]`

4. **Heading** — category: `"display"`:
   - props: `level` (enum: `"1"–"6"`), `size`, `weight`, `color`
   - variants: `h1`–`h4`
   - composition: `allowedParents: ["Box", "Stack", "Card", "Surface", "Page", "Section"]`, `disallowedChildren: ["Heading", "Button", "Card"]`
   - accessibility: `role: "heading"`, aria: `{ level: "1" }`, `keyboardInteractions: []`
   - states: `["default"]`

5. **Label** — category: `"input"`:
   - props: `htmlFor`, `required`, `size`
   - composition: `allowedParents: ["Field", "Box", "Stack"]`, `disallowedChildren: ["Button", "Card"]`
   - accessibility: `role: "label"`, `focusBehavior: "Transfers focus to associated input on click"`
   - states: `["default", "error"]`

6. **Card** — category: `"display"`:
   - props: `padding`, `elevation`, `interactive`, `selected`
   - variants: `default`, `elevated`, `flat`
   - slots: `header`, `body`, `footer`
   - composition: `allowedParents: ["Box", "Stack", "Row", "Grid"]`, `allowedChildren: ["Text", "Heading", "Button", "Stack", "Row", "Box", "Surface", "Divider"]`
   - responsive: padding reduces at `sm`, elevation flattens at `sm`
   - accessibility: `role: "article"`, `keyboardInteractions: ["Enter to activate if interactive"]`
   - states: `["default", "hover", "focus", "active", "disabled", "selected"]`

7. **Surface** — category: `"display"`:
   - props: `elevation`, `padding`, `borderRadius`
   - composition: `allowedParents: ["Box", "Stack", "Card"]`, `allowedChildren: ["Text", "Heading", "Box", "Stack", "Row"]`
   - states: `["default"]`

8. **Divider** — category: `"display"`:
   - props: `orientation`, `spacing`, `color`
   - composition: `allowedParents: ["Box", "Stack", "Card"]`, `allowedChildren: []`, `maxDepth: 0`
   - accessibility: `role: "separator"`, `aria: { orientation: "horizontal" }`
   - states: `["default"]`

9. **Button** — category: `"input"`:
   - props: `variant` (enum: `"primary" | "secondary" | "ghost" | "danger"`), `size` (enum: `"sm" | "md" | "lg"`), `disabled`, `loading`, `iconLeft`, `iconRight`, `fullWidth`
   - variants: `primary`, `secondary`, `ghost`, `danger`
   - composition: `allowedParents: ["Box", "Row", "Stack", "Card", "TopBar", "ActionGroup"]`, `disallowedChildren: ["Button", "Card", "Heading"]`
   - accessibility: `role: "button"`, `keyboardInteractions: ["Enter to activate", "Space to activate"]`, `focusBehavior: "Receives focus on Tab"`
   - states: `["default", "hover", "focus", "active", "disabled", "loading"]`

10. **Icon** — category: `"display"`:
    - props: `name`, `size` (enum: `"xs" | "sm" | "md" | "lg"`), `color`, `label`
    - composition: `allowedParents: ["Button", "Box", "Row", "Text"]`, `allowedChildren: []`, `maxDepth: 0`
    - accessibility: `aria: { hidden: "true" }` when decorative, `role: "img"` when labeled, `screenReaderDescription: "Use label prop for accessible icons"`
    - states: `["default"]`

11. Each `registerComponent(metadata)` call is a module-level side effect. Version all at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- All enum props must list `enumValues` in their `PropSchema`
- Slot names must match actual component API expectations

## Acceptance Criteria
- All 8 components registered: `Text`, `Heading`, `Label`, `Card`, `Surface`, `Divider`, `Button`, `Icon`
- `getComponent("Button")` returns metadata with `states` including `"disabled"` and `"loading"`
- `getComponent("Card")` has `slots` defined with `header`, `body`, `footer`
- All components have `accessibility` defined
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import the file, call `getComponent("Button")` — verify `variants` has `primary`, `secondary`, `ghost`, `danger`
3. Call `getComponent("Icon")` — verify `composition.maxDepth` is `0`
4. Call `getComponent("Card")` — verify `slots` has `header`, `body`, `footer`
