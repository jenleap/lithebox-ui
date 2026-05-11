# Task 008: Radio Component

## Feature
F007 — Form & Input System

## Description
Implement the `Radio` component — a single radio button input for grouped selection. Follows the same pattern as `Checkbox`: token-driven styling, native `<input type="radio">`, label alignment, disabled/error state support.

## Files
- `src/components/Radio.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Radio.tsx`:
   - Define `RadioProps`:
     ```ts
     export type RadioProps = {
       checked: boolean
       onChange: (checked: boolean) => void
       label?: string
       value: string
       name: string
       disabled?: boolean
       error?: boolean
       id?: string
     }
     ```
   - Follow the exact same implementation pattern as `Checkbox`:
     - Wrapper `<div>` with flex layout and gap from `InputContract.spacing.gap`
     - Native `<input type="radio" checked={checked} onChange={e => onChange(e.target.checked)} value={value} name={name} disabled={disabled} id={id} />`
     - Optional `<label>` with token-driven text color
     - Disabled: opacity + `cursor: "not-allowed"`
     - Error: error text color on label
2. In `src/index.ts`, add:
   ```ts
   export { Radio } from "./components/Radio"
   export type { RadioProps } from "./components/Radio"
   ```

## Constraints
- Single `Radio` component — no `RadioGroup` abstraction (that belongs to a future feature)
- `name` and `value` props are required to support native radio grouping
- Controlled component — `checked` and `onChange` required
- No className prop
- Shares token style from `InputContract` — no new contract

## Acceptance Criteria
- Renders a native `<input type="radio">` with optional label
- `name` prop groups radios natively via the DOM
- Disabled and error states match Checkbox visual behavior
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), render two Radio components with the same `name` and verify only one can be checked at a time
3. Verify disabled radio cannot be toggled
