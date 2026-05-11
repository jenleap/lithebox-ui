# Task 004: Input Component

## Feature
F007 — Form & Input System

## Description
Implement the `Input` component — the primary text input primitive. It consumes `InputContract` and `InputInteractionContract`, reflects interaction states (focus, disabled, error), and is a controlled component.

## Files
- `src/components/Input.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Input.tsx`:
   - Define `InputProps`:
     ```ts
     export type InputProps = {
       value: string
       onChange: (value: string) => void
       placeholder?: string
       disabled?: boolean
       error?: boolean
       id?: string
     }
     ```
   - Import `InputContract` from `"../contracts/InputContract"`
   - Import `resolveSlot` from `"../contracts/resolveContract"`
   - Import `useInteractionState` from `"../interactions"`
   - Import `InputInteractionContract` from `"../contracts/InputInteractionContract"`
   - Call `useInteractionState({ disabled, loading: false, contract: InputInteractionContract })`
   - Build base style from `InputContract.base`, `InputContract.spacing`, `InputContract.radius`, `InputContract.typography` using `resolveSlot`
   - Apply state overrides: when `error` is true, apply `InputContract.states.error` (border and text color). When `disabled`, apply `InputContract.states.disabled`
   - Apply focus state via CSS: use `onFocus`/`onBlur` from `interactionProps` and conditionally merge `InputContract.states.focus` border into inline style via a `isFocused` state variable (React `useState`)
   - The final `style` merges: base → disabled/error overrides → focus override (focus takes lowest visual priority if error is present — error wins)
   - Render: `<input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} style={style} id={id} {...interactionProps} />`
2. In `src/index.ts`, add:
   ```ts
   export { Input } from "./components/Input"
   export type { InputProps } from "./components/Input"
   ```

## Constraints
- Controlled component only — `value` and `onChange` are required
- No uncontrolled / ref-based usage
- No className prop
- All styling via inline styles from resolved tokens
- `error` state overrides focus visually (error border wins over focus border)
- `disabled` blocks onChange

## Acceptance Criteria
- Renders a styled `<input type="text" />`
- Reflects token-driven styles for base, focus, error, disabled states
- Controlled: value changes propagate via `onChange`
- `disabled` prevents `onChange` from firing (rely on native `disabled` attribute)
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), verify: idle, focused, error, and disabled visual states all render correctly
3. Verify typing in the input updates the value when controlled

## Notes
`useInteractionState` may not natively handle focus tracking — if it only tracks hover/active, manage focus with local `useState<boolean>` and `onFocus`/`onBlur` handlers in addition to `interactionProps`.
