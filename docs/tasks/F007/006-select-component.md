# Task 006: Select Component

## Feature
F007 — Form & Input System

## Description
Implement the `Select` component — a basic native dropdown using `<select>`. It shares `InputContract` styling and `InputInteractionContract` state model. No search, no async, no multi-select.

## Files
- `src/components/Select.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Select.tsx`:
   - Define types:
     ```ts
     export type SelectOption = {
       value: string
       label: string
     }

     export type SelectProps = {
       value: string
       onChange: (value: string) => void
       options: SelectOption[]
       placeholder?: string
       disabled?: boolean
       error?: boolean
       id?: string
     }
     ```
   - Apply the same styling approach as `Input`: use `InputContract` for base, focus, error, and disabled state styles
   - Render:
     ```tsx
     <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} style={style} id={id} {...interactionProps}>
       {placeholder && <option value="" disabled>{placeholder}</option>}
       {options.map(opt => (
         <option key={opt.value} value={opt.value}>{opt.label}</option>
       ))}
     </select>
     ```
   - Add `appearance: "auto"` to base style to preserve native select arrow
2. In `src/index.ts`, add:
   ```ts
   export { Select } from "./components/Select"
   export type { SelectProps, SelectOption } from "./components/Select"
   ```

## Constraints
- Native `<select>` only — no custom dropdown implementation
- Controlled component only
- No className prop
- Shares `InputContract` — do not create a separate SelectContract
- No multi-select

## Acceptance Criteria
- Renders a styled native `<select>`
- Accepts `options: SelectOption[]` and renders them as `<option>` elements
- Optional placeholder renders as a disabled first option
- Reflects focus, error, disabled visual states via `InputContract`
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), verify idle, focus, error, and disabled states render correctly
3. Verify selecting an option fires `onChange` with the correct value string
