# F007: Form & Input System (MVP — Application Layer 1)

## Overview

This feature introduces the **Form & Input System** for Lithebox UI.

It is the first **application-grade layer** built on top of:

> Tokens → Layout Primitives → Components → Contracts → Interaction System

The goal is to enable developers to build **real, structured forms** using:

- deterministic layout
- contract-bound components
- standardized interaction states

> This layer validates that Lithebox UI can support real-world application workflows.

---

## Objectives

- Provide a minimal set of **input primitives**
- Establish a **canonical field composition model**
- Integrate with the **interaction & state system**
- Extend the **token contract system** for input-specific states
- Ensure consistent behavior across all form elements
- Maintain full determinism and token purity

---

## Core Concept

> Inputs are not standalone components — they are part of a structured field system.

Instead of:

```tsx
<Input />
```

---

## Scope
### Included (MVP)
Input Primitives
- Input (text)
- Textarea
- Select (basic)
- Checkbox
- Radio

Field System
- Field (composition wrapper)
- HelperText
- ErrorText

Behavior
- Integration with interaction states (focus, disabled, error, loading)
- Controlled component support

Contracts
- Input-specific token contracts
- Validation state mapping

### Not Included
- Form state management library (Formik, React Hook Form, etc.)
- Async validation
- Complex select (searchable, multi-select)
Accessibility deep layer (ARIA — future phase)
- Schema validation systems
- Form submission handling

---

## Design Principles

1. Structured Composition
All inputs must exist within a predictable structure (Field).

2. Token-Driven Styling
All visual states must resolve through:
> contract → semantic slot → token → CSS variable

3. Deterministic Behavior
Given the same:
- props
- state
- tokens
The output must be identical.

4. State System Integration
Inputs must fully conform to:
- global interaction states
- extended validation states

5. No Styling Leakage
No inline styles. No ad-hoc overrides.

---

## Core Components

### Field
Purpose
Defines the canonical structure of a form element.

Responsibilities
- layout composition (via Stack)
- coordinate Label, Input, HelperText, ErrorText
- pass state down to children

Structure
```text
Field
 ├── Label
 ├── InputControl
 ├── HelperText (optional)
 └── ErrorText (conditional)
```
Props
```ts
type FieldProps = {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  children: React.ReactNode
}
```

---

### Input (Text)
Purpose
Basic text input control.

Responsibilities
- render input element
- reflect interaction + validation states
- obey contract mapping

Props
```ts
type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}
```

---

### Textarea
Same contract as Input, but multi-line.

---

### Select (Basic)
Purpose
Simple dropdown selection.

Constraints
- no search
- no async
- minimal feature set

---

### Checkbox & Radio
Purpose
Boolean / grouped selection inputs.

Requirements
- fully token-driven
- consistent state mapping
- alignment with Label

---

### Label
Purpose
Text label for inputs.

Rules
- must align with Field structure
- token-driven typography
- reflects required/disabled state

---

### HelperText
Purpose
Optional supporting text.

Behavior
- lower visual priority
- uses secondary text tokens

---

### ErrorText
Purpose
Displays validation errors.

Behavior
- only visible when error exists
- uses error color tokens
- overrides helper text visually

---

## Input Token Contract Extensions

Extend token contracts for input states:

Example: Input Contract
```ts
export const InputContract = {
  base: {
    background: "color.surface",
    border: "color.border",
    text: "color.text.primary"
  },

  states: {
    focus: {
      border: "color.primary",
      shadow: "shadow.sm"
    },

    error: {
      border: "color.error",
      text: "color.error"
    },

    disabled: {
      background: "color.surface",
      text: "color.text.secondary"
    }
  },

  spacing: {
    padding: "spacing.sm"
  },

  radius: {
    default: "radius.md"
  }
} as const
```

---

## State Integration

Extend interaction states:
```text
idle
focus
disabled
loading
error   ← new
```

Rules
- error overrides visual priority
- disabled blocks interaction
- focus applies visual emphasis

---

### Example Usage
```ts
<Field
  label="Email"
  helperText="We’ll never share your email."
  error={emailError}
>
  <Input
    value={email}
    onChange={setEmail}
  />
</Field>
```

### Resulting Structure
```text
Field
 ├── Label
 ├── Input
 ├── HelperText / ErrorText
```

---

## Composition Rules

Rule 1: Inputs must live inside Field

Rule 2: Field controls layout, not inputs

Rule 3: State flows top-down
Field → Input → visual state

Rule 4: No ad-hoc validation props
Not allowed:
```ts
<Input isInvalid />
```

---

## Acceptance Criteria

- All input primitives implemented
- Field composition enforced
- Interaction states applied consistently
- Error state properly overrides visuals
- All styling flows through token contracts
- No direct styling or token access in components
- Storybook includes full form examples
- Controlled inputs behave predictably

---

## Definition of Done

- Input, Textarea, Select, Checkbox, Radio implemented
- Field abstraction implemented
- HelperText + ErrorText implemented
- Input token contracts defined
- State integration working
- Storybook form scenarios implemented
- All components pass contract enforcement rules

---

## Risks & Considerations

1. Over-flexibility
Allowing inputs outside Field breaks system consistency.

2. Contract complexity
Input states introduce more mapping complexity.

3. State conflicts
Must ensure error, focus, disabled interactions are predictable.

4. Developer ergonomics
Must feel natural despite strict constraints.

---

## Key Insight

Forms are where the system proves itself.

If forms are consistent, everything else will be.

---

## Strategic Role in Architecture
```text
Tokens
  ↓
Layout Primitives
  ↓
Components
  ↓
Contracts
  ↓
Interaction System
  ↓
Form System   ← THIS LAYER
  ↓
Application-Level UI
```

---

## Final Insight

This feature transforms Lithebox UI from:

> a deterministic UI system

into:

> a system capable of supporting real application workflows

It validates:
- structure
- behavior
- contracts
- composability

All in one place.