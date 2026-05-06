# F003: Core Primitive Component Library (MVP — Structural UI Layer)

## Overview

This feature defines the first **true UI components layer** in Lithebox UI.

It sits on top of:

> Tokens → Layout Primitives → Component Layer (this spec)

This layer introduces **semantic UI building blocks** that are still low-level, but now represent actual interface meaning (not just structure).

They are the foundation for:
- all higher-level components (Button, Input, Card, etc.)
- the Prototyping Renderer output system
- component token contracts (next architecture layer)

---

## Objectives

- Introduce a minimal set of **core UI primitives**
- Ensure every component:
  - is fully token-driven
  - composes layout primitives (Box/Stack/Row/Container)
  - has no internal hardcoded styling
- Establish consistent **visual semantics**
- Create a stable base for future component expansion

---

## Core Concept

> Layout primitives define structure. Core components define meaning.

Example:

- `Stack` → vertical structure
- `Box` → generic container
- `Card` → *a surfaced content container with semantic meaning*

This layer introduces **intent**, not just layout.

---

## Scope

### Included (MVP Core Components)

#### Surface & Structure
- `Card`
- `Surface`
- `Divider`

#### Typography
- `Text`
- `Heading`
- `Label`

#### Interaction (minimal baseline only)
- `Button` (primitive version only)
- `Icon` (token-driven rendering wrapper)

---

### Not Included (Later Layers)

- Forms system (Input, Select, Checkbox, etc.)
- Navigation components
- Data display components (Table, List advanced variants)
- Complex interactive components (Modal, Dropdown, Tabs)
- Animation system
- Accessibility enhancements layer (expanded ARIA system)
- Prototyping-specific components (handled later via renderer layer)

---

## Design Principles

### 1. Token Purity

No component defines raw values.

All styling must come from:

> design tokens → CSS variables → component consumption

---

### 2. Layout Composition Only

No component defines layout logic internally.

All layout uses:

- `Box`
- `Stack`
- `Row`
- `Container`

---

### 3. Semantic First Design

Components represent **meaning**, not structure.

Example:

- `Card` = content grouping surface
- `Text` = typography rendering unit
- `Button` = primary action affordance

---

### 4. Deterministic Output

Given the same props + tokens:

> output must always be identical

---

## Component Specifications

---

## Card

### Purpose
A **structured content surface** used to group related UI elements.

### Implementation Rules
- Uses `Box` internally
- Applies `surface` + `radius` tokens
- Optional shadow token usage
- No layout responsibilities

### Props

```ts
type CardProps = {
  padding?: keyof Tokens["spacing"]
  children?: React.ReactNode
}
```

### Example
```ts
<Card padding="md">
  <Text>Card content</Text>
</Card>
```

---

## Surface

### Purpose
A generic background container abstraction used for layering UI.

### Responsibilities
- Apply background tokens
- Optionally apply border/shadow
- No content semantics

### Props
```ts
type SurfaceProps = {
  variant?: "base" | "raised" | "sunken"
  children?: React.ReactNode
}
```

---

## Divider

### Purpose
A visual separation primitive between content blocks.

### Rules
- Fully token-driven (border color)
- No spacing logic (handled by Stack/Row)
- Purely visual

### Props
```ts
type DividerProps = {
  orientation?: "horizontal" | "vertical"
}
```

---

## Text

### Purpose
Base typography rendering component.

### Responsibilities
- Render text using typography tokens
- No semantic meaning (handled by Heading/Label)
- Fully token-driven font styles

### Props
```ts
type TextProps = {
  size?: keyof Tokens["typography"]["size"]
  weight?: keyof Tokens["typography"]["weight"]
  color?: keyof Tokens["color"]["text"]
  children: React.ReactNode
}
```

---

## Heading

### Purpose
Semantic typography for hierarchy levels.

### Behavior
- Built on Text
- Maps to size scale internally
- No layout behavior

### Props
```ts
type HeadingProps = {
  level?: 1 | 2 | 3 | 4
  children: React.ReactNode
}
```

---

## Label

### Purpose
Small UI label text (forms and metadata context later).

### Rules
- Uses Text internally
- Smaller default size
- No structural meaning

---

## Button (Primitive Version)

### Purpose
Core interactive element for user actions.

### Important Constraint

This is NOT a full design system button.

It is a primitive action surface, not a styled component system.

### Responsibilities
- Uses token-driven background + text color
- Uses radius tokens
- Uses spacing tokens
- Delegates layout to Box

### Props
```ts
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  onClick?: () => void
}
```

---

## Icon

### Purpose
A wrapper for consistent icon rendering.

### Responsibilities
- Enforces size consistency via tokens
- No visual styling logic
- No semantic behavior

---

## Composition Rules

### Rule 1: Components must use layout primitives

Bad:
```ts
<div style={{ display: "flex" }} />
```
Good:
```ts
<Row>
```

### Rule 2: No component defines spacing logic
Spacing is always:
- Stack (vertical)
- Row (horizontal)
- tokens (values only)

### Rule 3: Components are never layout containers
Example:
- Card ≠ layout system
- Card = surface abstraction

### Rule 4: Components are stateless (MVP)
No internal state logic beyond basic interaction hooks.

---

## Example System Composition
```ts
<Container maxWidth="lg">
  <Stack gap="md">

    <Card padding="md">
      <Stack gap="sm">
        <Heading level={2}>Dashboard</Heading>
        <Text color="secondary">
          Overview of your activity
        </Text>
      </Stack>
    </Card>

    <Row gap="sm">
      <Button variant="primary">Save</Button>
      <Button variant="ghost">Cancel</Button>
    </Row>

  </Stack>
</Container>
```

---

## Prototyping Mode Alignment

These components must map cleanly from structured UI:
```text
Card
 └── Stack
      ├── Heading
      ├── Text

Row
 ├── Button
 └── Button
```
No ambiguity allowed in translation.

---

## Acceptance Criteria

- All components are token-driven only
- All layout uses layout primitives exclusively
- No hardcoded spacing, colors, or typography values
- Components are deterministic in rendering
- Components behave identically in App + Prototyping modes
- No component introduces hidden layout behavior
- All components are composable without overrides

---

## Definition of Done

- Card, Surface, Divider implemented
- Text, Heading, Label implemented
- Button (primitive version) implemented
- Icon wrapper implemented
- All components integrated with tokens system
- Verified usage with layout primitives
- Confirmed deterministic rendering

---

## Risks & Considerations

1. Over-abstraction risk
Keep components simple — avoid building a full design system too early.

2. Button scope creep
Button will tend to accumulate variants — resist expanding beyond MVP needs.

3. Semantic confusion
Ensure developers understand:
- Layout primitives = structure
- Components = meaning
- Tokens = appearance

---

## Key Insight

This layer is where the system starts to feel like a UI library.

But internally, it is still just a deterministic projection of tokens + layout primitives.

This is the first layer where:
- AI can reliably generate UI
- developers can build real applications
- structure begins to feel semantic rather than mechanical