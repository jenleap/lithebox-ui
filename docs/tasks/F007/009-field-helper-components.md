# Task 009: Field Helper Components (HelperText, ErrorText, Label Enhancement)

## Feature
F007 — Form & Input System

## Description
Create `HelperText` and `ErrorText` components, and enhance the existing `Label` component to support `required` and `disabled` props. These are the supporting sub-components used inside `Field`.

## Files
- `src/components/HelperText.tsx` (create)
- `src/components/ErrorText.tsx` (create)
- `src/components/Label.tsx` (modify)
- `src/index.ts` (modify — add HelperText and ErrorText exports; Label is already exported)

## Implementation Steps
1. Create `src/components/HelperText.tsx`:
   ```ts
   export type HelperTextProps = {
     children: React.ReactNode
   }

   export function HelperText({ children }: HelperTextProps) {
     // Render using Text component with secondary text color
     // Use "color.text.secondary" token via resolveSlot or Text component's secondary variant
     // Font size: typography.size.sm
   }
   ```
   - Import `resolveSlot` from `"../contracts/resolveContract"`
   - Apply `color: resolveSlot("color.text.secondary")` and `fontSize: resolveSlot("typography.size.sm")` inline

2. Create `src/components/ErrorText.tsx`:
   ```ts
   export type ErrorTextProps = {
     children: React.ReactNode
   }

   export function ErrorText({ children }: ErrorTextProps) {
     // Render with error color token
     // Uses color.error token
     // Font size: typography.size.sm
   }
   ```
   - Apply `color: resolveSlot("color.error")` and `fontSize: resolveSlot("typography.size.sm")` inline

3. Modify `src/components/Label.tsx` — update `LabelProps` and component:
   ```ts
   export type LabelProps = {
     children: React.ReactNode
     required?: boolean
     disabled?: boolean
     htmlFor?: string
   }
   ```
   - Render as `<label htmlFor={htmlFor}>` instead of relying on `Text`
   - Apply token-driven styles: `fontFamily`, `fontSize` (sm), `fontWeight` (medium), `color.text.primary`
   - When `disabled`, apply `color.text.secondary` and `opacity: 0.5`
   - When `required`, append a `" *"` styled span after the label text using `color.error`
   - Use `resolveSlot` for all token resolution

4. In `src/index.ts`, add:
   ```ts
   export { HelperText } from "./components/HelperText"
   export type { HelperTextProps } from "./components/HelperText"
   export { ErrorText } from "./components/ErrorText"
   export type { ErrorTextProps } from "./components/ErrorText"
   ```
   (Label is already exported — update the type export if `LabelProps` changes)

## Constraints
- `HelperText` and `ErrorText` must use `resolveSlot` for token resolution — no hardcoded colors
- `Label` must render a native `<label>` element so `htmlFor` wires to input `id`
- No className prop on any of these components
- Do not break existing `Label` usage (the `children` prop remains required)

## Acceptance Criteria
- `HelperText` renders with secondary text color and small font size
- `ErrorText` renders with error color and small font size
- `Label` renders as `<label>` with optional `required` asterisk and disabled visual treatment
- `Label` `htmlFor` prop wires correctly to input `id`
- All three components exported from `src/index.ts`
- TypeScript compiles with no errors
- Existing Label stories and tests still pass

## Test Steps
1. Run `npm run build` — no type errors
2. Run `npm test` — existing Label tests pass
3. In Storybook (task 011), verify HelperText shows in secondary color, ErrorText in error color, and Label required asterisk and disabled state render correctly

## Notes
The existing `Label` component is minimal (`Text` wrapper). This task replaces it with a proper `<label>` element. Existing usages of `<Label>` without new props remain backward compatible since `required` and `disabled` default to `false`/`undefined`.
