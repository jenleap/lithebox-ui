# Task 005: Textarea Component

## Feature
F007 — Form & Input System

## Description
Implement the `Textarea` component — a multi-line text input that uses the same `InputContract` and `InputInteractionContract` as `Input`. It shares the same visual contract and state model, differing only in the rendered element and a `rows` prop.

## Files
- `src/components/Textarea.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Textarea.tsx`:
   - Define `TextareaProps`:
     ```ts
     export type TextareaProps = {
       value: string
       onChange: (value: string) => void
       placeholder?: string
       disabled?: boolean
       error?: boolean
       rows?: number
       id?: string
     }
     ```
   - Mirror `Input` implementation exactly but render `<textarea>` instead of `<input type="text">`
   - Default `rows` to `4`
   - Add `resize: "vertical"` to the base style to allow user resizing, but `resize: "none"` when disabled
   - Apply the same contract and state logic as the `Input` component (focus, error, disabled states from `InputContract`)
2. In `src/index.ts`, add:
   ```ts
   export { Textarea } from "./components/Textarea"
   export type { TextareaProps } from "./components/Textarea"
   ```

## Constraints
- Must reuse `InputContract` — do not create a separate TextareaContract
- No className prop
- All styling from resolved tokens + minimal inline adjustments (resize, height)
- Controlled component only

## Acceptance Criteria
- Renders a styled `<textarea>` element
- Shares identical visual states with `Input` (same border, background, text colors per state)
- Supports `rows` prop (defaults to 4)
- Disabled state sets `resize: "none"`
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 011), verify idle, focus, error, and disabled states render correctly
3. Verify multi-line input works in a controlled fashion
