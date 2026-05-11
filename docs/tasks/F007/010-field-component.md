# Task 010: Field Component

## Feature
F007 — Form & Input System

## Description
Implement the `Field` component — the canonical composition wrapper for all form inputs. It orchestrates `Label`, the input child, `HelperText`, and `ErrorText` in a vertical stack layout. State (error, disabled, required) flows from `Field` down to its children via render props or prop injection.

## Files
- `src/components/Field.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Field.tsx`:
   - Define `FieldProps`:
     ```ts
     export type FieldProps = {
       label?: string
       helperText?: string
       error?: string
       required?: boolean
       disabled?: boolean
       htmlFor?: string
       children: React.ReactNode
     }
     ```
   - Import `Label` from `"./Label"`, `HelperText` from `"./HelperText"`, `ErrorText` from `"./ErrorText"`
   - Import `resolveSlot` from `"../contracts/resolveContract"`
   - Import `InputContract` from `"../contracts/InputContract"` for spacing tokens
   - Render structure:
     ```tsx
     <div style={{ display: "flex", flexDirection: "column", gap: resolveSlot(InputContract.spacing.gap) }}>
       {label && <Label htmlFor={htmlFor} required={required} disabled={disabled}>{label}</Label>}
       {children}
       {error ? <ErrorText>{error}</ErrorText> : helperText ? <HelperText>{helperText}</HelperText> : null}
     </div>
     ```
   - `error` takes precedence over `helperText` — when both are present, show only `ErrorText`

2. In `src/index.ts`, add:
   ```ts
   export { Field } from "./components/Field"
   export type { FieldProps } from "./components/Field"
   ```

## Constraints
- `Field` controls layout only — it does not pass `disabled` or `error` state into `children` directly (props are passed explicitly by the developer to both `Field` and the input child)
- No className prop
- `error` string prop renders `ErrorText`; `helperText` string prop renders `HelperText`; both present → only `ErrorText` shown
- Children is an escape hatch — `Field` does not validate or restrict what is placed inside it

## Acceptance Criteria
- Renders a vertical flex container containing: optional Label, children, optional HelperText or ErrorText
- When `error` is set, `ErrorText` renders and `HelperText` is hidden
- When no error, `HelperText` renders if provided
- `Label` receives `htmlFor`, `required`, and `disabled` from `Field`
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), verify:
   - Field with Label + Input + HelperText renders correctly
   - Field with error string hides HelperText and shows ErrorText
   - Required asterisk appears on Label when required=true
   - Disabled Label renders dimmed
3. Verify the `htmlFor` / `id` connection between Label and Input works (clicking label focuses input)

## Notes
Developers are responsible for passing `disabled` and `error` to both `Field` and the input component. `Field` does not clone children or inject props automatically.
