# Task 005: Form Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all form components: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, and `Field`. Form components require complete state, accessibility, and composition rule coverage because AI systems must understand valid and invalid form structures.

## Files
- `src/metadata/components/formMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/formMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. **Input** — category: `"input"`:
   - props: `type` (enum: `"text" | "email" | "password" | "number" | "search" | "tel" | "url"`), `placeholder`, `disabled`, `readOnly`, `value`, `onChange`, `size` (enum: `"sm" | "md" | "lg"`)
   - composition: `allowedParents: ["Field", "Box", "Stack"]`, `disallowedChildren: []`, `maxDepth: 0`
   - accessibility: `role: "textbox"`, `aria: { required: "false", invalid: "false" }`, `keyboardInteractions: ["Tab to focus", "Type to enter value"]`
   - states: `["default", "focus", "disabled", "readOnly", "error", "success"]`
   - usage: recommended inside `Field`; discouraged as standalone without a `Label`

4. **Textarea** — category: `"input"`:
   - props: `placeholder`, `disabled`, `readOnly`, `rows`, `resize` (enum: `"none" | "vertical" | "both"`)
   - composition: `allowedParents: ["Field", "Box", "Stack"]`, `maxDepth: 0`
   - accessibility: `role: "textbox"`, `aria: { multiline: "true" }`, `keyboardInteractions: ["Tab to focus", "Enter for new line"]`
   - states: `["default", "focus", "disabled", "readOnly", "error"]`

5. **Select** — category: `"input"`:
   - props: `options`, `value`, `placeholder`, `disabled`, `multiple`
   - composition: `allowedParents: ["Field", "Box", "Stack"]`, `maxDepth: 0`
   - accessibility: `role: "combobox"`, `aria: { expanded: "false", haspopup: "listbox" }`, `keyboardInteractions: ["Space/Enter to open", "Arrow keys to navigate", "Escape to close"]`
   - states: `["default", "focus", "open", "disabled", "error"]`

6. **Checkbox** — category: `"input"`:
   - props: `checked`, `indeterminate`, `disabled`, `label`, `value`
   - composition: `allowedParents: ["Field", "Box", "Stack", "Row"]`, `maxDepth: 0`
   - accessibility: `role: "checkbox"`, `aria: { checked: "false" }`, `keyboardInteractions: ["Space to toggle"]`
   - states: `["default", "checked", "indeterminate", "focus", "disabled", "error"]`

7. **Radio** — category: `"input"`:
   - props: `checked`, `disabled`, `label`, `value`, `name`
   - composition: `allowedParents: ["Field", "Box", "Stack", "RadioGroup"]`, `maxDepth: 0`
   - accessibility: `role: "radio"`, `aria: { checked: "false" }`, `keyboardInteractions: ["Arrow keys to select within group"]`
   - states: `["default", "checked", "focus", "disabled", "error"]`
   - usage: recommended inside a `Field` with grouped Radios; discouraged as a single standalone radio

8. **Field** — category: `"input"`:
   - props: `label`, `helperText`, `errorText`, `required`, `disabled`
   - slots: `label` (required), `input` (required: one of Input/Textarea/Select/Checkbox/Radio), `helper` (optional)
   - composition:
     - `allowedParents: ["Box", "Stack", "Form"]`
     - `allowedChildren: ["Label", "Input", "Textarea", "Select", "Checkbox", "Radio", "HelperText"]`
     - `disallowedChildren: ["Card", "Button", "Heading"]`
   - accessibility: `role: "group"`, `aria: { labelledby: "field-label" }`, `keyboardInteractions: []`
   - states: `["default", "error", "disabled", "success"]`
   - usage: recommended as the standard wrapper for all form inputs; discouraged from nesting Fields inside Fields

9. Each `registerComponent(metadata)` call is a module-level side effect. Version all at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- All form components must have `states` including `"error"`
- `Field` must have `slots` defined for `label` and `input`

## Acceptance Criteria
- All 6 form components registered: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Field`
- `getComponent("Field")` returns metadata with `slots` for `label` and `input`
- All 6 have `states` including `"error"`
- `getComponent("Input")` has `composition.allowedParents` including `"Field"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import the file, call `getComponent("Field")` — verify `slots` has `label` and `input`
3. Call `getComponent("Checkbox")` — verify `states` includes `"indeterminate"`
4. Call `getComponent("Select")` — verify `accessibility.role` is `"combobox"`
