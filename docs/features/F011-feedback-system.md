# 🧩 Feature Spec: Feedback System (Toast & Banner) — Application Communication Layer

## 📌 Overview

This feature introduces the **Feedback System** for Lithebox UI.

It defines a standardized model for **transient, system-level communication UI**, including:

- Toast notifications
- Banner messages
- Global alerts (MVP scope: implicit via Banner)

This system sits at the same architectural level as Page Composition, but serves a different responsibility:

> Page Composition defines *structure*  
> Feedback System defines *communication over time*

---

## 🎯 Objectives

- Provide a deterministic **notification system architecture**
- Standardize transient UI patterns (Toast + Banner)
- Integrate with Overlay + Layer management system
- Define global **notification lifecycle rules**
- Ensure consistent visual treatment via token contracts
- Prevent ad-hoc notification implementations across apps

---

## 🧠 Core Concept

> Feedback UI is not component UI — it is system communication UI.

This means:

- it is not tied to a page
- it is not part of layout structure
- it is globally orchestrated
- it has lifecycle + priority rules

---

## 🧱 Scope

### ✅ Included (MVP)

#### Toast System
- `Toast`
- `ToastContainer`
- `useToast()` API (imperative trigger)

#### Banner System
- `Banner`
- `BannerContainer`

#### Core Infrastructure
- Notification manager (global registry)
- Queue system (basic FIFO)
- Dismissal lifecycle model
- Integration with Overlay + Layer system
- Token-driven visual variants

---

### ❌ Not Included

- Complex notification stacking algorithms
- Rich action frameworks (multi-action toasts)
- Persistence layers (local storage, server sync)
- Push notifications (OS-level)
- Analytics tracking
- Notification scheduling system
- Advanced animation choreography system

---

## 🧠 Design Principles

### 1. Feedback Is Global

Notifications are not owned by any single component or page.

They exist in a **global UI layer**.

---

### 2. Temporal UI Must Be Deterministic

Every notification has:
- a lifecycle
- a priority
- a dismissal rule

No implicit behavior allowed.

---

### 3. UI Communication Must Be Consistent

All feedback follows a unified structure:
- type
- intent
- duration
- dismissal behavior

---

### 4. No Layout Ownership

Feedback components never participate in page layout.

They always render in a dedicated system layer.

---

### 5. Token-Driven Semantics

All feedback styling is derived from:
- semantic intent tokens
- contract-defined variants

---

# 🧩 Part 1 — Toast System

---

## 🍞 Toast

### Purpose

Transient, non-blocking system messages.

---

### Use Cases

- success confirmation
- error alerts
- informational messages
- background process updates

---

### Structure

```txt id="toaststruct"
ToastContainer
 ├── Toast
 ├── Toast
 └── Toast
 ```

### Props
```ts
type Toast = {
  id: string
  title?: string
  description?: string
  variant: "success" | "error" | "info" | "warning"
  duration?: number
  dismissible?: boolean
}
```

### Behavior Rules
- auto-dismiss after duration
- manual dismissal optional
- multiple toasts stack vertically
- ordering is FIFO by default

---

## useToast API

### Purpose
Imperative API for triggering toasts.

### Example
```ts
const toast = useToast()

toast.success("Saved successfully")
toast.error("Something went wrong")
```

### Constraints
- no direct DOM manipulation
- must go through Notification Manager
- must respect global queue system

---

# Part 2 — Banner System

## Banner

### Purpose
Persistent, context-level feedback displayed within application layout.

### Use Cases
- system maintenance alerts
- contextual warnings
- feature announcements
- persistent errors

### Structure
```text
BannerContainer
 ├── Banner
```

### Props
```ts
type Banner = {
  id: string
  title: string
  description?: string
  variant: "info" | "warning" | "error" | "success"
  dismissible?: boolean
}
```

### Behavior Rules
- remains visible until dismissed
- does not auto-expire
- scoped to application or page context
- does not block interaction

---

# Part 3 — Notification Manager (Core System)

## Core Concept

All feedback flows through a central registry system.

### Responsibilities
- manage toast queue
- manage banner state
- enforce lifecycle rules
- coordinate rendering layer
- prevent duplicate notifications (optional rule)

### Queue Model
```text
incoming → active → dismissed
```

### Rules

1. All notifications must be registered
No direct rendering allowed.

2. Notifications are immutable once created
Only dismissal is allowed.

3. System controls lifecycle
Components do not manage their own lifespan.

---

# Part 4 — Overlay & Layer Integration

## Core Integration Rule

Feedback system uses the Overlay Layer System:
### Layer Priority
```text
toast → low priority overlay layer
banner → layout-bound layer (non-overlay)
modal → higher priority layer
```

### Rules
- Toasts never block interaction
- Banners never overlay content
- Feedback must respect layer hierarchy

---

# Part 5 — Token Contract Extensions

### Toast Contract Example
```ts
export const ToastContract = {
  success: {
    background: "color.success",
    text: "color.text.inverse"
  },

  error: {
    background: "color.error",
    text: "color.text.inverse"
  },

  info: {
    background: "color.primary",
    text: "color.text.inverse"
  },

  warning: {
    background: "color.warning",
    text: "color.text.primary"
  },

  spacing: {
    padding: "spacing.md"
  },

  radius: {
    default: "radius.md"
  }
} as const
```

Banner Contract follows same model

---

# Part 6 — State Model

### Toast States
```text
entering
visible
exiting
removed
```

### Banner States
```text
visible
dismissed
```

### Rules
- transitions must be deterministic
- no skipped lifecycle states
- state changes controlled by manager

### Example Usage

### Toast
```ts
const toast = useToast()

toast.success("Profile updated successfully")
```

### Banner
```ts
<Banner
  variant="warning"
  title="Maintenance Notice"
  description="System will be down at 2 AM"
  dismissible
/>
```

---

## Acceptance Criteria

- Toast system implemented with queue
- Banner system implemented
- Notification manager functional
- useToast API implemented
- Overlay integration working
- Token contracts applied
- Lifecycle states enforced
- No direct rendering outside manager allowed
- Storybook includes notification scenarios

---

## Definition of Done

- Toast system implemented
- Banner system implemented
- Notification manager implemented
- Queue system working
- Layer integration complete
- Contract system applied
- Storybook coverage complete

---

## Risks & Considerations

1. Notification sprawl
Without strict queue control, system can become noisy.

2. Overuse of global state
Notification manager must remain lightweight.

3. Layer conflicts
Must ensure no collision with modal/drawer system.

4. UX consistency
Variations must remain semantically consistent across app contexts.

---

## Key Insight

This layer defines:

> how the system communicates with the user outside of structural UI

It is the emotional + temporal communication layer of Lithebox UI.

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
Forms
  ↓
Navigation & Overlays
  ↓
Data Display
  ↓
Page Composition
  ↓
Feedback System   ← THIS LAYER
  ↓
Application UI Communication Layer
```

---

## Final Insight

This feature completes the application UI system by adding:
- transient communication
- global feedback orchestration
- user-facing system signaling

Without it:
applications feel silent and unresponsive

With it:
applications feel alive, responsive, and communicative