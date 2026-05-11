# Task 007: Checkbox Component

## Feature
F007 — Form & Input System

## Description
Implement the `Checkbox` component — a boolean toggle input. It is token-driven, label-aligned, and supports disabled and error states. It renders a native `<input type="checkbox">` with a styled wrapper.

## Files
- `src/components/Checkbox.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Checkbox.tsx`:
   - Define `CheckboxProps`:
     ```ts
     export type CheckboxProps = {
       checked: boolean
       onChange: (checked: boolean) => void
       label?: string
       disabled?: boolean
       error?: boolean
       id?: string
     }
     ```
   - Resolve tokens for label text color and disabled opacity from `InputContract`:
     - Base text: `InputContract.base.text`
     - Disabled text: `InputContract.states.disabled.text`
     - Disabled opacity: `InputContract.states.disabled.opacity`
     - Error text: `InputContract.states.error.text`
   - Render a wrapper `<div>` with `display: "flex"`, `alignItems: "center"`, `gap: resolveSlot(InputContract.spacing.gap)`, and cursor/opacity from disabled state
   - Render `<input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} id={id} />`
   - If `label` is provided, render a `<label>` element next to the checkbox with token-driven text color (error wins over disabled wins over default)
   - Apply `cursor: "not-allowed"` and opacity when disabled
2. In `src/index.ts`, add:
   ```ts
   export { Checkbox } from "./components/Checkbox"
   export type { CheckboxProps } from "./components/Checkbox"
   ```

## Constraints
- Use native `<input type="checkbox">` — no custom checkbox rendering
- No className prop
- Token-driven text and spacing only
- Controlled component

## Acceptance Criteria
- Renders a native checkbox with an optional inline label
- Disabled state applies opacity and `cursor: "not-allowed"`
- Error state applies error text color to the label
- `checked` and `onChange` are controlled
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), verify checked, unchecked, disabled, and error variants
3. Verify clicking the checkbox fires `onChange` with the toggled boolean value
