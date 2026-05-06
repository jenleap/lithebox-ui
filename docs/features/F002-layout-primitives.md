# F002: Core Layout Primitives System (MVP — Structural Layer)

## Overview

This feature defines the **core structural layout primitives** for Lithebox UI.

These primitives form the **rendering grammar of the system**, sitting between:

> Design Tokens → Layout Primitives → Component Library → Prototyping Renderer

They establish how UI is **structured, spaced, and composed** in a deterministic way across both Application Mode and Prototyping Mode.

---

## Objectives

- Introduce a minimal set of **layout primitives**
- Ensure all layout is **token-driven and deterministic**
- Provide a consistent structural system for:
  - application development
  - AI/prototyping rendering
- Eliminate ad-hoc layout styling across components
- Create a shared foundation for future component contracts

---

## Core Concept

> Layout primitives define structure. Tokens define appearance.

This separation is critical:

- Tokens → *what things look like*
- Layout primitives → *how things are arranged*

Example:

- Tokens define spacing scale (`spacing.md`)
- Layout primitives decide *where that spacing applies in structure*

---

## Scope

### Included (MVP)

Core layout primitives:

- `Box` (base structural unit)
- `Stack` (vertical layout flow)
- `Row` (horizontal layout flow)
- `Container` (bounded layout wrapper)

Shared system rules:

- Token-based spacing
- Deterministic layout behavior
- No implicit styling logic
- Composition-based structure only

---

### Not Included (Future Layers)

- Grid system
- Responsive breakpoints
- Animations / transitions
- Advanced layout auto-placement
- Component-level UI (Button, Input, Card, etc.)
- Accessibility system
- Prototyping AI parser

---

## Design Principles

### 1. Structural Determinism

Given the same layout tree, output is always identical.

No hidden margins, no implicit spacing rules.

---

### 2. Token-Driven Layout

All spacing, sizing, and visual structure derive from tokens:

- spacing → gaps, padding
- radius → surface rounding
- color → backgrounds and borders

---

### 3. Explicit Composition Only

No “magic layout behavior”.

All structure must be explicitly defined.

---

### 4. Shared Runtime Between Modes

Layout primitives must behave identically in:

- Application Mode (developer-written UI)
- Prototyping Mode (generated UI)

---

## Primitive Definitions

---

## Box (Base Primitive)

### Purpose
The fundamental building block for layout and structure.

Everything in the system ultimately resolves to a Box.

### Responsibilities
- Apply spacing (padding/margin)
- Apply visual tokens (background, border, radius)
- Wrap or contain content
- Serve as base unit for composition

### Props (conceptual)

```ts
type BoxProps = {
  padding?: keyof Tokens["spacing"]
  margin?: keyof Tokens["spacing"]

  background?: keyof Tokens["color"]
  border?: boolean

  radius?: keyof Tokens["radius"]

  children?: React.ReactNode
}
```

## Stack (Vertical Layout)

### Purpose

Defines vertical flow of elements with deterministic spacing.

### Behavior
- Children are stacked top → bottom
- Spacing is derived from tokens
- No implicit margins between children

### Props
```ts
type StackProps = {
  gap?: keyof Tokens["spacing"]
  align?: "start" | "center" | "end" | "stretch"
  children?: React.ReactNode
}
```

### Key Rule
Stack replaces all “vertical margin hacks”

No child is responsible for spacing between siblings.

---

## Row (Horizontal Layout)

### Purpose
Defines horizontal flow of elements.

### Behavior
- Children are arranged left → right
- Gap is token-driven
- Alignment is explicit

### Props
```ts
type RowProps = {
  gap?: keyof Tokens["spacing"]
  justify?: "start" | "center" | "end" | "between"
  align?: "start" | "center" | "end" | "stretch"
  children?: React.ReactNode
}
```

---

## Container

### Purpose
Defines a bounded layout region for page-level structure.

### Responsibilities
- Control max width
- Center content
- Apply background/surface tokens
- Establish layout boundaries

### Props
```ts
type ContainerProps = {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: keyof Tokens["spacing"]
  background?: keyof Tokens["color"]
  children?: React.ReactNode
}
```

---

## Composition Rules

### Rule 1: Layout primitives nest freely
```text
Container
 └── Stack
      ├── Box
      ├── Row
      └── Stack
```

### Rule 2: No spacing outside primitives

Bad:
```ts
<div style={{ marginBottom: "16px" }} />
```
Good:
```ts
<Stack gap="md">
```

### Rule 3: Tokens control all visual spacing

Layout primitives never define raw values.

Only:
- spacing.md
- spacing.lg
- radius.sm
- color.surface

---

## Token Integration Rules

### Spacing Mapping
- `gap` → spacing tokens
- `padding` → spacing tokens
- `margin` → spacing tokens (if exposed)

### Color Mapping
- background → color tokens
- border → color.border

### Radius Mapping
- `radius` → radius tokens only

---

## Example Usage (Application Mode)
```ts
<Container maxWidth="lg">
  <Stack gap="md">
    <Box padding="md" background="surface">
      Header
    </Box>

    <Row gap="sm">
      <Box padding="sm">Left</Box>
      <Box padding="sm">Right</Box>
    </Row>
  </Stack>
</Container>
```

### Example Output (Prototyping Mode Target)

Structured UI spec should map cleanly to:
```text
Container
 └── Stack
      ├── Box
      └── Row
           ├── Box
           └── Box
```

---

## Acceptance Criteria
- All layout primitives exist and are usable in React
- All spacing is token-driven (no hardcoded values)
- No implicit layout margins exist anywhere
- Stack and Row fully control inter-element spacing
- Container provides consistent page-level structure
- Layout behaves identically in both usage modes
- Primitives are composable without edge-case overrides

---

## Definition of Done
- Box, Stack, Row, Container implemented
- Token integration wired into all primitives
- No raw CSS spacing in implementation
- Layout composition is deterministic and predictable
- Verified usage in a sample application layout


## Risks & Considerations

1. Overlapping responsibilities with future components
Layout primitives must stay strictly structural — not semantic.

2. Token dependency lock-in
Changes to spacing tokens will affect all layout behavior.

3. Future grid system complexity
Grid should be introduced later as a separate structural layer, not mixed into this MVP.

---

## Key Insight

This layer defines the grammar of UI composition.

If tokens define the language, layout primitives define the syntax.

> Everything built after this — components, contracts, and AI-generated UI — depends on this structure being stable, minimal, and deterministic.