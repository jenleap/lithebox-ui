# Task 007: Form System Integration

## Feature
F012 - Accessibility Architecture

## Description
Update form components to apply ARIA contracts and the accessibility state model. This ensures inputs are properly associated with labels and error messages, and that invalid/disabled/loading states are communicated to assistive technologies.

## Files
- `src/components/Input.tsx` (modify)
- `src/components/Textarea.tsx` (modify)
- `src/components/Select.tsx` (modify)
- `src/components/Checkbox.tsx` (modify)
- `src/components/Radio.tsx` (modify)
- `src/components/Field.tsx` (modify)

## Implementation Steps

### Input, Textarea, Select

For each of these components:

1. Import `resolveA11yState` from `../a11y/resolveA11yState`
2. Import the corresponding ARIA contract: `InputA11yContract` or `SelectA11yContract` from `../a11y/ariaContracts`

3. Resolve ARIA state from props:
   ```ts
   const a11yProps = resolveA11yState({
     disabled: props.disabled,
     error: !!props.error,
     readOnly: props.readOnly,
   })
   ```

4. Spread `a11yProps` onto the underlying `<input>` / `<textarea>` / `<select>` element

5. If an `id` prop is available, use it for label association. If the component accepts an `id` prop already, ensure it is forwarded to the input element.

6. If an `errorId` or error message is associated (check if the component has error-related props), add `aria-describedby={errorId}` to the input element

### Checkbox and Radio

1. Import `resolveA11yState` from `../a11y/resolveA11yState`
2. Resolve state from `disabled` prop: `resolveA11yState({ disabled })`
3. Spread a11y props onto the underlying `<input type="checkbox">` or `<input type="radio">` element
4. These elements already have implicit ARIA roles via their `type` attribute — do not add a `role` prop

### Field

1. Field is the wrapper that associates a label with an input via `htmlFor` / `id`
2. Read the existing Field implementation to understand its current structure
3. Ensure:
   - If Field renders a label, it uses `htmlFor` pointing to the input's `id`
   - If Field renders an error message, that error element has a unique id (`${fieldId}-error`)
   - The input inside Field receives `aria-describedby={fieldId}-error` when an error exists
4. If Field does not currently manage ids, add an `id` prop (or generate one using a stable internal id) and thread it through to the label and input

## Constraints
- Do not change existing visual behavior or prop APIs
- Only add ARIA props — do not restructure components
- If a component already has an `aria-*` attribute set, preserve it (don't overwrite)
- Do not generate random ids — use a prop-based id or a stable prefix pattern like `field-${name}`
- Checkbox and Radio rely on native `<input type>` for role — do not add explicit `role` props

## Acceptance Criteria
- Input with `error` prop renders `aria-invalid="true"`
- Input with `disabled` prop renders `aria-disabled="true"` and `tabIndex={-1}`
- Field label is associated with input via `htmlFor`/`id`
- Error message in Field is linked via `aria-describedby`
- Checkbox and Radio with `disabled` render `aria-disabled="true"`
- All existing form tests still pass

## Test Steps
1. Render `<Input disabled />` — verify `aria-disabled="true"` in DOM
2. Render `<Input error="Required" />` — verify `aria-invalid="true"` in DOM
3. Render `<Field label="Name"><Input id="name" /></Field>` — verify label `htmlFor="name"`
4. Render Field with error — verify `aria-describedby` points to error element id
5. Run `npm run test` for all form components

## Notes
Read the existing implementations of each component before modifying — some may already have partial ARIA support. Add only what is missing. Preserve existing structure.
