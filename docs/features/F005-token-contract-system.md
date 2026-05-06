# 🧩 Feature Spec: Component Token Contract System (MVP — Enforcement Layer)

## 📌 Overview

This feature introduces the **Component Token Contract System** for Lithebox UI.

It defines strict rules for how components consume design tokens, ensuring that every component in the library is:

- deterministic
- token-bound
- predictable across all environments

> This is the layer that prevents components from becoming “free-form styled UI”.

---

## 🎯 Objectives

- Define **explicit token usage contracts per component**
- Prevent direct or arbitrary token consumption inside components
- Establish a **semantic mapping layer between tokens and components**
- Ensure all styling decisions are **pre-authorized by contract**
- Enforce consistency across:
  - Application Mode usage
  - Storybook rendering
  - future component expansion

---

## 🧠 Core Concept

> Components do not “use tokens”. They obey contracts.

Instead of:

```txt
Button → uses color.primary directly
```

We define:
```text
Button → uses ButtonContract → maps to allowed token slots
```

---

## Scope

### Included (MVP)
- Contract definition system per component
- Token-to-semantic-slot mapping layer
- Type-safe contract enforcement (TypeScript)
- Runtime validation (dev-only)
- Storybook contract inspection support
- Migration rules for existing components

### Not Included
- New UI components
- Layout primitives (already defined)
- Prototyping engine integration (explicitly out of scope)
- Design tooling integration (Figma, etc.)
- Visual contract editor UI
- Runtime theming engine expansion

---

## Design Principles

### 1. Contract Over Flexibility
Components must NOT accept arbitrary token values.

They only accept pre-defined semantic roles.

### 2. Deterministic Mapping
Given the same contract + tokens:
- component output must never vary unexpectedly

### 3. No Direct Token Access
Components are forbidden from:
- reading raw tokens directly
- bypassing semantic mappings
- constructing ad-hoc styles

### 4. Explicit Capability Model
Every component must declare:
- “These are the only visual behaviors I support”

---

## Contract System Architecture

### 1. Component Contract Definition
Each component defines a contract object describing allowed token usage.

Example: Button Contract
```ts
export const ButtonContract = {
  variant: {
    primary: {
      background: "color.primary",
      text: "color.text.inverse",
      border: "transparent"
    },
    secondary: {
      background: "color.surface",
      text: "color.text.primary",
      border: "color.border"
    },
    ghost: {
      background: "transparent",
      text: "color.primary",
      border: "transparent"
    }
  },

  size: {
    sm: {
      padding: "spacing.sm",
      fontSize: "typography.size.sm"
    },
    md: {
      padding: "spacing.md",
      fontSize: "typography.size.md"
    },
    lg: {
      padding: "spacing.lg",
      fontSize: "typography.size.lg"
    }
  },

  radius: {
    default: "radius.md"
  }
} as const
```

---

### 2. Semantic Token Mapping Layer
Contracts do NOT expose raw tokens to components.

Instead they define semantic slots:
Example mapping:
```text
color.primary → Button.primary.background
color.text.primary → Button.secondary.text
spacing.md → Button.size.md.padding
```
This ensures:
- components never depend on raw token structure
- tokens can evolve without breaking components
- semantic meaning is preserved

---

### 3. Contract Enforcement Rules

Rule 1: No Unmapped Tokens
A component cannot use a token unless it is defined in its contract.

Rule 2: No Inline Styling Bypass
Forbidden:
```ts
style={{ background: tokens.color.primary }}
```

Rule 3: Contract-Only Styling Resolution
All styles must resolve through:

> contract → semantic slot → token → CSS variable

Rule 4: Strict Variant Resolution
Components must not define:
- ad-hoc variants
- dynamic styling outside contract scope

---

### 4. Runtime Validation Layer (Dev Mode Only)

Purpose
Catch contract violations during development.

Checks include:
- usage of undefined token paths
- invalid variant usage
- missing contract mappings
- bypassed semantic slots

Behavior
- warnings in development
- no production overhead
- optional strict mode (throw on violation)

---

### 5. TypeScript Enforcement Layer

Contracts must be fully typed.

Guarantees:
- only valid variants can be used
- only defined sizes accepted
- no arbitrary string tokens allowed
- compile-time safety for contract violations

---

### 6. Storybook Contract Inspection Integration

Storybook must expose:
For each component:
- contract definition
- resolved token mappings
- variant → token resolution preview
- invalid usage detection (if any)

---

### Example Usage (Button)
```ts
<Button variant="primary" size="md">
  Save
</Button>
```
Internally resolves to:
```text
variant.primary.background → color.primary
variant.primary.text → color.text.inverse
size.md.padding → spacing.md
```

---

### Example Invalid Case

Not allowed:
```ts
<Button style={{ color: "#ff0000" }} />
```
Reason:
- bypasses contract system
- introduces non-deterministic styling
- breaks token consistency guarantees

---

## Contract Design Rules

Rule 1: Contracts must be exhaustive
Every visual state must be declared.

Rule 2: Contracts are immutable at runtime
No dynamic contract mutation allowed.

Rule 3: Contracts define limits, not behavior logic
They describe:
- what is allowed
- not how components compute state

Rule 4: Contracts must remain UI-agnostic
They should not depend on:
- business logic
- application state
- external data

---

## Acceptance Criteria

- Every component has an explicit token contract
- No component accesses raw tokens directly
- All styling resolves through contract mapping layer
- TypeScript enforces contract usage
- Storybook displays contract mappings per component
- Runtime validation catches contract violations (dev only)
- No ad-hoc styling escapes contract boundaries

---

## Definition of Done

- Contract system implemented
- Button, Text, Card migrated to contract system
- Semantic token mapping layer implemented
- Runtime validator integrated
- Storybook contract inspector working
- Full TypeScript enforcement active
- No direct token usage inside components

---

## Risks & Considerations

1. Over-constraining components
Contracts must not become so rigid that they block future evolution.

2. Mapping complexity growth
Semantic mapping must remain readable and not become a second “token system”.

3. Developer friction
Strong enforcement must still preserve usability and predictability.

4. Hidden duplication risk
Avoid duplicating token logic across contracts and theme system.

---

## Key Insight

This is the enforcement layer that makes Lithebox UI deterministic by design.

Tokens define possibility.
Layout defines structure.
Contracts define allowed usage.

Together, they ensure:
- components cannot drift
- UI remains predictable
- AI-generated or manual UI both obey the same rules

---

## Strategic Role in Architecture
```text
Tokens
  ↓
Layout Primitives
  ↓
Core Components
  ↓
Component Token Contracts   ← THIS LAYER
  ↓
(Storybook validation)
  ↓
Future systems built on deterministic UI
```

---

## Final Insight

This layer is what transforms Lithebox UI from:

> “a styled component library”

into:

> “a constrained, deterministic UI system with enforced visual rules”