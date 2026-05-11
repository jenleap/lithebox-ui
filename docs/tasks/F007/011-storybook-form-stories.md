# Task 011: Storybook Form Stories

## Feature
F007 — Form & Input System

## Description
Create Storybook stories for all F007 components. Include individual component stories and a full form composition story demonstrating the complete field system working together.

## Files
- `src/stories/forms/Input.stories.tsx` (create)
- `src/stories/forms/Textarea.stories.tsx` (create)
- `src/stories/forms/Select.stories.tsx` (create)
- `src/stories/forms/Checkbox.stories.tsx` (create)
- `src/stories/forms/Radio.stories.tsx` (create)
- `src/stories/forms/Field.stories.tsx` (create)
- `src/stories/forms/FormComposition.stories.tsx` (create)

## Implementation Steps
1. Create `src/stories/forms/Input.stories.tsx`:
   - Stories: `Default`, `WithPlaceholder`, `Focused` (use `autoFocus`), `WithError`, `Disabled`
   - All stories are controlled: use `useState` in a render wrapper

2. Create `src/stories/forms/Textarea.stories.tsx`:
   - Stories: `Default`, `WithRows`, `WithError`, `Disabled`

3. Create `src/stories/forms/Select.stories.tsx`:
   - Define a shared `options` array of 3–4 `SelectOption` values
   - Stories: `Default`, `WithPlaceholder`, `WithError`, `Disabled`

4. Create `src/stories/forms/Checkbox.stories.tsx`:
   - Stories: `Unchecked`, `Checked`, `WithLabel`, `Disabled`, `WithError`

5. Create `src/stories/forms/Radio.stories.tsx`:
   - Stories: `Default`, `RadioGroup` (two Radio components sharing same `name`), `Disabled`

6. Create `src/stories/forms/Field.stories.tsx`:
   - Stories:
     - `WithHelperText` — Field wrapping an Input with label and helper text
     - `WithError` — Field with an error string (ErrorText shown, HelperText hidden)
     - `Required` — Field with `required={true}`
     - `Disabled` — Field with `disabled={true}` wrapping a disabled Input
     - `WithSelect` — Field wrapping a Select
     - `WithTextarea` — Field wrapping a Textarea

7. Create `src/stories/forms/FormComposition.stories.tsx`:
   - Single story: `ContactForm` — a complete form using:
     ```tsx
     <Stack gap="md">
       <Field label="Full Name" htmlFor="name" required>
         <Input id="name" value={name} onChange={setName} placeholder="Jane Doe" />
       </Field>
       <Field label="Email" htmlFor="email" required error={emailError}>
         <Input id="email" value={email} onChange={setEmail} placeholder="jane@example.com" error={!!emailError} />
       </Field>
       <Field label="Message" htmlFor="message" helperText="Max 500 characters">
         <Textarea id="message" value={message} onChange={setMessage} rows={4} />
       </Field>
       <Field label="Country" htmlFor="country">
         <Select id="country" value={country} onChange={setCountry} options={countryOptions} placeholder="Select a country" />
       </Field>
       <Checkbox checked={agreed} onChange={setAgreed} label="I agree to the terms" />
       <Button onClick={handleSubmit}>Submit</Button>
     </Stack>
     ```
   - All fields are controlled via `useState`

## Constraints
- All stories use controlled state via `useState`
- No external form libraries
- Follow existing story patterns from `src/stories/components/Button.stories.tsx`
- Import components from `"../../components/..."` or `"../../../"` depending on existing conventions — check Button.stories.tsx for the import style

## Acceptance Criteria
- All 7 story files render without errors in Storybook
- All visual states (idle, focus, error, disabled) are demonstrated
- `ContactForm` story shows full Field composition working end-to-end
- No TypeScript errors in story files
- Stories appear under a "Forms" section in the Storybook sidebar

## Test Steps
1. Run `npm run storybook` and navigate to the Forms section
2. Verify all stories render without errors
3. Interact with the ContactForm story: fill fields, verify error state on email, verify disabled state
4. Run `npm run build` — no type errors
