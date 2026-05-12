# Feature Spec: Navigation & Overlay System (MVP — Application Structure Layer)

## Overview

This feature introduces the **Navigation & Overlay System** for Lithebox UI.

It establishes the architectural foundation for:

- application-level structure
- layered UI composition
- visibility orchestration
- overlay interaction management

This layer extends the system from:

> component composition

into:

> full application shell orchestration

---

## Objectives

- Define a deterministic **application shell structure**
- Introduce a standardized **overlay system**
- Establish a global **layer management model**
- Standardize visibility and open/close behavior
- Normalize overlay interaction patterns
- Ensure overlays integrate with:
  - tokens
  - contracts
  - interaction states
  - layout primitives

---

## Core Concept

> Overlays and navigation are not standalone widgets — they are orchestrated UI layers within a deterministic rendering hierarchy.

This feature defines:

- how layered UI exists
- how visibility is controlled
- how focus ownership behaves
- how overlays compose safely

---

## Scope

### Included (MVP)

#### Application Structure
- `AppShell`
- `Sidebar`
- `TopBar`
- `ContentArea`

#### Overlay Components
- `Modal`
- `Drawer`
- `Dropdown` (basic)

#### Internal Systems
- Layer manager
- Visibility state model
- Overlay lifecycle model
- Focus ownership model
- Overlay portal strategy

---

### Not Included

- Tooltip system
- Toast notifications
- Animation system
- Advanced accessibility layer
- Context menu system
- Nested overlay orchestration
- Mobile gesture support
- Complex navigation routing

---

## Design Principles

### 1. Deterministic Layering

All overlays must render within a predictable layer hierarchy.

No arbitrary z-index usage allowed.

---

### 2. Visibility Is System State

Open/closed state is part of the interaction system — not local ad-hoc state.

---

### 3. Overlay Behavior Must Be Standardized

All overlays share:
- lifecycle rules
- visibility transitions
- dismissal behavior
- focus ownership patterns

---

### 4. Structural Composition Over Smart Behavior

Navigation components define structure, not application logic.

---

### 5. No Visual Escape Hatches

All visual behavior must still flow through:
- token contracts
- interaction states
- layout primitives

---

# Part 1 — Application Structure System

---

## AppShell

### Purpose

Defines the top-level application layout structure.

---

### Responsibilities

- coordinate major layout regions
- establish application-level composition boundaries
- host navigation + content regions

---

### Structure

```txt id="appshelltree"
AppShell
 ├── Sidebar
 ├── TopBar
 └── ContentArea
 ```

### Props
```ts
type AppShellProps = {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
}
```

---

## Sidebar

### Purpose
Primary application navigation region.

### Responsibilities
- vertical navigation layout
- navigation grouping
- structural containment only

### Constraints
- no routing logic
- no application state logic
- no responsive collapse behavior (future)

---

## TopBar

### Purpose
Top-level application header region.

### Responsibilities
- actions
- breadcrumbs
- title area
- user actions

### Constraints

Purely structural.

---

## ContentArea

### Purpose
Primary application content container.

### Responsibilities
- host page content
- establish scroll boundaries
- coordinate spacing structure

--

## Part 2 — Overlay System

### Overlay System Philosophy
Overlays are not “floating components”.

They are:
- managed UI layers participating in a global rendering hierarchy

### Overlay Lifecycle Model

All overlays conform to:
- closed
- opening
- open
- closing

### Rules
overlays cannot skip lifecycle states
visibility changes are deterministic
overlay state is externally controlled

---

## Modal

### Purpose
Focused blocking interaction surface.

### Responsibilities
- capture focus ownership
- block background interaction
- establish top-layer priority

### Structure
```text
OverlayLayer
 └── Backdrop
      └── ModalSurface
```

### Props
```ts
type ModalProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}
```

### Behavioral Rules
- ESC closes modal
- backdrop click closes modal (configurable later)
- focus remains trapped inside modal
- only one modal active at a time (MVP)

---

## Drawer

### Purpose
Edge-mounted overlay panel.

### Responsibilities
- slide-in navigation or utility surface
- maintain overlay layering rules

### Constraints
- same lifecycle system as Modal
- same focus ownership model

---

## Dropdown (Basic)

### Purpose
Contextual anchored overlay surface.

### Responsibilities
- anchored positioning
- temporary visibility
- lightweight interaction layer

### Constraints
- no virtualization
- no nested dropdown support
- no smart positioning system yet

---

## Part 3 — Layer Management System

### Core Concept

All layered UI must exist within a deterministic hierarchy.

### Layer Stack
- base
- dropdown
- drawer
- modal
- critical

### Rules
- components cannot define custom z-index values
- overlays resolve layer automatically
- layer order is globally enforced

### Overlay Manager

Introduce internal overlay registry system.

### Responsibilities
- track active overlays
- enforce layer ordering
- coordinate focus ownership
- prevent invalid stacking

### Example
```text
Modal opened
  ↓
OverlayManager assigns "modal" layer
  ↓
Background interaction disabled
  ↓
Focus ownership transferred
```

---

## Part 4 — Focus Ownership System

### Core Principle

Only one interactive layer owns focus at a time.

### Focus Rules
### Modal
- traps focus internally

### Drawer
- owns focus while active

### Dropdown
- temporary focus ownership

### Invalid State Example

Not allowed:
- Modal open
- Dropdown behind modal still interactive

---

## Part 5 — Visibility State System

### Visibility States
- hidden
- visible
- transitioning

### Rules
- visibility is explicit
- overlays never infer open state
- visibility integrates with interaction contracts

---

## Part 6 — Token Contract Extensions

### Example: Modal Contract
```ts
export const ModalContract = {
  backdrop: {
    background: "color.overlay"
  },

  surface: {
    background: "color.surface",
    radius: "radius.lg",
    shadow: "shadow.md"
  },

  spacing: {
    padding: "spacing.lg"
  }
} as const
```

---

## Part 7 — Portal Strategy

### Purpose
Allow overlays to escape layout constraints safely.

### Rules
- overlays render inside managed portal root
- portal root controlled by OverlayManager
- portals do not bypass layer system

---

### Example Usage
```ts
<AppShell
  sidebar={<Sidebar />}
  header={<TopBar />}
>
  <ContentArea>
    <Dashboard />
  </ContentArea>

  <Modal
    open={showModal}
    onClose={closeModal}
  >
    <Text>Confirm action?</Text>
  </Modal>
</AppShell>
```
---

## Acceptance Criteria

- AppShell structure implemented
- Sidebar, TopBar, ContentArea implemented
- Modal, Drawer, Dropdown implemented
- Overlay lifecycle states enforced
- Layer management system operational
- Focus ownership rules implemented
- No arbitrary z-index usage
- All overlays resolve through contracts + tokens
- Storybook overlay scenarios implemented

---

## Definition of Done

- Navigation structure components implemented
- Overlay manager implemented
- Modal lifecycle working
- Drawer lifecycle working
- Dropdown behavior functional
- Layer stack enforced globally
- Focus ownership implemented
- Storybook validation scenarios complete

---

## Risks & Considerations

### 1. Overlay complexity escalation
Overlay systems become difficult quickly — maintain strict constraints.

### 2. Portal abuse
Portals must not become unrestricted rendering escape hatches.

### 3. Layer drift
Allowing arbitrary z-index values will destabilize the system.

### 4. State synchronization
Overlay lifecycle must remain predictable and externally controlled.

---

## Key Insight

This layer transforms Lithebox UI from:

> a component library

into:

> a true application UI architecture system

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
Form System
  ↓
Navigation & Overlay System   ← THIS LAYER
  ↓
Application-Level UI Architecture
```

---

## Final Insight

This feature establishes:
- application structure
- layered rendering
- visibility orchestration
- deterministic overlay behavior

It is the first layer where the system begins managing:

> UI as an application environment, not just a collection of components.