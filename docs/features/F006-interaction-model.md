# F006: Interaction & State Model System (MVP — Behavioral Layer)

## Overview

This feature defines the **Interaction & State Model System** for Lithebox UI.

It introduces a **standardized behavioral layer** that governs how all components respond to user interaction and internal state changes.

> This is the first layer that defines *how UI behaves*, not just how it looks or is structured.

It extends the existing system:

- Tokens → visual values  
- Layout Primitives → structure  
- Components → semantic UI  
- Contracts → allowed usage rules  
- **Interaction System → behavioral rules (this layer)**  

---

## Objectives

- Define a **unified interaction state model**
- Standardize behavior across all components
- Map interaction states to design tokens
- Introduce interaction contracts per component
- Ensure deterministic behavior across Application Mode usage
- Establish consistent event and state handling rules

---

## Core Concept

> Components are not just visual systems — they are state machines with deterministic behavior.

This layer ensures that:

- every interaction behaves consistently
- every state transition is predictable
- no component defines ad-hoc behavior logic

---

## Scope

### Included (MVP)

- Global interaction state model
- Standard state lifecycle definitions
- State → token mapping system
- Interaction contract extensions
- Shared interaction hooks
- Component behavior normalization rules
- Storybook interaction state simulation

---

### Not Included

- Complex animation system
- Gesture handling system (drag, swipe, etc.)
- Form validation engine
- Routing/navigation behavior system
- Data fetching/state management (React Query, etc.)
- Prototyping engine integration (explicitly out of scope)

---

## Design Principles

### 1. Deterministic Behavior

Given the same input + state:

> components must always behave identically

No hidden or emergent behavior.

---

### 2. State is Global, Behavior is Local Mapping

All components share a **universal state model**, but interpret it through contracts.

---

### 3. No Ad-Hoc Interaction Logic

Components must NOT define custom or one-off interaction rules.

All behavior must map to system states.

---

### 4. Token-Driven State Styling

All visual changes caused by state must resolve through tokens.

No direct styling overrides allowed.

---

## Global Interaction State Model

All components must conform to this base state system:

```txt id="statecore"
idle
hover
active
focus
disabled
loading
```

---

## State Lifecycle Rules

1. States are finite and explicit
No custom states allowed per component.

2. State transitions must be predictable
Example lifecycle:
```text
idle → hover → active → idle
idle → disabled (terminal until re-enabled)
any → loading → idle
```

3. States cannot conflict
Example invalid state:
```text
hover + disabled (for interactive components)
```

---

## State → Token Mapping System
Each state maps to semantic token overrides.

Example Mapping Rules
```text
hover:
  color.primary → color.primary (slightly elevated opacity)
  shadow → shadow.sm

active:
  color.primary → color.primary (darker tone)
  transform → scale(0.98)

disabled:
  color.text.primary → color.text.secondary
  opacity → 0.5

loading:
  opacity → 0.7
  cursor → progress
```

---

## Interaction Contracts
Each component must declare allowed interaction behaviors.

Example: Button Interaction Contract
```ts
export const ButtonInteractionContract = {
  states: ["idle", "hover", "active", "disabled", "loading"],

  interactions: {
    click: "allowed",
    hover: "system-managed",
    focus: "system-managed"
  },

  transitions: {
    disabled: "terminal",
    loading: "interruptible"
  }
} as const
```

---

## Key Rule

Components do not implement behavior — they declare participation in system behavior.

---

## Shared Interaction Hook Layer

Introduce a standard hook:
```ts
useInteractionState()
```
Responsibilities:
- manage state transitions
- enforce valid state lifecycle
- expose current interaction state
- prevent invalid transitions

Example Usage
```ts
const state = useInteractionState()

return (
  <Button state={state.current}>
    Click me
  </Button>
)
```

---

## Component Behavior Normalization Rules
All components must:

1. Use shared state model
No custom state systems per component.

2. Map state → tokens only
No direct CSS manipulation.

3. Respect interaction contract
No unsupported states or transitions.

4. Avoid internal state divergence
All behavior must align with system model.

---

## Storybook Integration (Critical)

Storybook must simulate:

Interaction states per component:
- idle
- hover
- active
- disabled
- loading

Required features:
- state toggler UI
- live state preview
- token changes per state
- contract validation display

---

### Example: Button Behavior
```ts
<Button
  state="loading"
  variant="primary"
>
  Saving...
</Button>
```
Resolves to:
```text
state.loading → opacity: 0.7
state.loading → cursor: progress
variant.primary → color.primary + text.inverse
```

---

### Invalid Example

Not allowed:
```ts
<Button isSpinning={true} />
```
Reason:
- bypasses system state model
- introduces ad-hoc behavior logic
- breaks deterministic interaction system

---

## Acceptance Criteria

- All components support global interaction state model
- No component defines custom interaction states
- All state changes map to token-driven styles
- Interaction contracts enforced per component
- Storybook supports full state simulation
- Invalid state transitions are blocked or warned
- Behavior remains deterministic across all components

---

## Definition of Done

- Global interaction state model implemented
- useInteractionState hook implemented
- State → token mapping system implemented
- Interaction contracts added to core components
- Button updated to full state model
- Storybook state simulator integrated
- Validation rules active in dev mode

---

## Risks & Considerations

1. Over-generalization risk
Avoid forcing all components into identical interaction behavior where it doesn’t make sense.

2. State explosion risk
Do not allow uncontrolled state expansion beyond core system states.

3. Contract drift risk
Interaction contracts must stay aligned with visual token contracts.

4. Developer friction
Strong enforcement must still feel predictable and intuitive.

---

## Key Insight

This layer completes the transformation of Lithebox UI from:

> a visual system

into:

> a deterministic UI behavior engine

---

## Strategic Role in Architecture
```text
Tokens
  ↓
Layout Primitives
  ↓
Components
  ↓
Component Contracts
  ↓
Interaction & State System   ← THIS LAYER
  ↓
Storybook Validation Layer
```

---

## Final Insight

This system ensures:
- UI is not just styled consistently
- UI behaves consistently
- all interaction patterns are predictable
- future components cannot introduce behavioral drift

This is the layer that makes Lithebox UI feel “alive” without becoming unpredictable.