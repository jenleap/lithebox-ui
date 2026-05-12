# F010 Spec: Page Composition System (Application Assembly Layer)

## Overview

This feature introduces the **Page Composition System** for Lithebox UI.

It defines a deterministic model for constructing **full application screens** using standardized structural primitives.

This system sits above all existing layers:

- Tokens → visual truth  
- Layout primitives → spatial rules  
- Components → UI elements  
- Contracts → usage constraints  
- Interaction system → behavior rules  
- Forms / Navigation / Data Display → application building blocks  

> The Page Composition System defines how all of these come together into a coherent application screen.

---

## Objectives

- Define a canonical **Page model**
- Standardize **screen-level composition patterns**
- Introduce **layout region system**
- Establish reusable **section architecture**
- Provide **page-level state handling**
- Prevent layout drift across applications
- Ensure deterministic screen assembly

---

## Core Concept

> A page is not a collection of components — it is a structured composition of defined regions.

Instead of ad-hoc layout:

```tsx
<div>
  <Header />
  <Sidebar />
  <Content />
</div>
```

We define:
```text
Page
 ├── HeaderRegion
 ├── SidebarRegion
 ├── ContentRegion
 └── FooterRegion
```

---

## Scope

### Included (MVP)
### Page System
- Page
- PageHeader
- PageContent
- PageSidebar
- PageFooter

### Section System
- Section
- SectionHeader
- SectionContent

### Layout Model
- Region-based layout system
- Layout presets (standard, dashboard, detail, form)

### Page State Model
- loading
- error
- empty
- ready

### Composition Rules
- region constraints
- section nesting rules
- layout consistency enforcement


### Not Included
- Routing system (Next.js, React Router integration)
- Authentication flows
- Data fetching layer
- Page generation engine
- Responsive breakpoint system (future phase)
- Animation/motion system
- URL-driven layout composition

---

## Design Principles

### 1. Pages Are Structured Contracts
A page is a declared structure, not an implementation detail.

### 2. Regions Are Fixed Semantic Zones
Each page is composed of predefined regions:
- Header
- Sidebar
- Content
- Footer

No arbitrary layout regions allowed.

### 3. Composition Over Configuration
Pages are composed using structural primitives, not configuration objects.

### 4. Deterministic Layout Behavior
Given the same page definition:
- layout must always render identically

### 5. Separation of Structure and Content
- Page defines structure
- Sections define grouping
- Components define content

No mixing of responsibilities.

---

# Part 1 — Page System

## Page

### Purpose
Defines the root structural container of an application screen.

### Responsibilities
- coordinate layout regions
- enforce structural consistency
- manage page-level states
- host sections and components

### Structure
```text
Page
 ├── PageHeader
 ├── PageSidebar
 ├── PageContent
 └── PageFooter
```

### Props
```ts
type PageProps = {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  state?: "loading" | "error" | "empty" | "ready"
}
```

---

## PageHeader

### Purpose
Top-level screen identity and actions.

### Responsibilities
- title rendering
- primary actions
- contextual controls

---

## PageSidebar

### Purpose
Secondary navigation or contextual controls.

### Constraints
- structural only
- no application logic ownership

---

## PageContent

### Purpose
Primary content rendering region.

### Responsibilities
- main application content
- section orchestration
- scroll containment

---

## PageFooter

### Purpose
Optional persistent footer region.

### Use Cases
- pagination controls
- global actions
- summary metadata

---

# Part 2 — Section System

## Section Philosophy

Sections are the reusable structural unit inside pages.

They define grouping logic, not layout behavior.

## Section

### Purpose
Group related content within a page.

### Structure
```text
Section
 ├── SectionHeader
 └── SectionContent
```

### Props
```ts
type SectionProps = {
  title?: string
  children?: React.ReactNode
}
```

---

## SectionHeader

### Purpose
Defines section identity and context.

---

## SectionContent

### Purpose
Holds actual content and components.

---

# Part 3 — Layout Region System

## Core Concept

Pages are composed of fixed semantic regions, not arbitrary layouts.

Regions
- Header
- Sidebar
- Content
- Footer

## Rules

### 1. Regions are immutable
No custom regions allowed in MVP.

### 2. Regions define layout behavior
Not styling or content.

### 3. Regions are composition slots
Components are injected into them.


### Layout Presets

Standard Layout
- Header + Content

Dashboard Layout
- Sidebar + Content + Header

Detail Layout
- Header + Content + optional Sidebar

Form Layout
- Header + Centered Content

---

# Part 4 — Page State System

## Core Concept

Pages have global state independent of internal components.

States
- loading
- error
- empty
- ready

### Behavior Rules

loading
- overrides content rendering
- shows Page-level LoadingState

error
- displays PageErrorState
- disables interaction layer

empty
- displays EmptyState at page level

ready
- normal rendering mode

---

# Part 5 — Composition Rules

### Rule 1: Pages Own Structure
Pages define layout — not components.

### Rule 2: Sections Must Live Inside ContentRegion
No sections outside PageContent.

### Rule 3: No Nested Pages
Pages cannot be nested.

### Rule 4: Regions Cannot Be Replaced
All pages must conform to region system.

### Rule 5: State Is Page-Level
Component-level state does not override page state.

### Example Usage
```ts
<Page
  header={<PageHeader title="Dashboard" />}
  sidebar={<Sidebar />}
  state="ready"
>
  <Section title="Overview">
    <MetricsGrid />
  </Section>

  <Section title="Activity">
    <ActivityList />
  </Section>
</Page>
```

---

## Acceptance Criteria

- Page system implemented
- Section system implemented
- Region model enforced
- Layout presets available
- Page state system functional
- No ad-hoc layout structures allowed
- Storybook includes full page templates
- Composition rules enforced in dev mode

---

## Definition of Done

- Page components implemented
- Section primitives implemented
- Layout region system enforced
- Page state handling implemented
- Preset layouts defined
- Contract enforcement active
- Storybook page templates complete

---

## Risks & Considerations

1. Over-constraining layout flexibility
Too rigid a system may limit edge-case UI layouts.

2. Region creep
Avoid introducing ad-hoc regions outside the model.

3. State confusion
Page state must not conflict with component state systems.

4. Composition leakage
Ensure components do not define layout behavior.

---

## Key Insight

This layer defines:

how Lithebox UI becomes a full application system, not just a component framework

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
Page Composition System   ← THIS LAYER
  ↓
Application Assembly Layer
```

---

## Final Insight

This feature completes the transformation from:

“UI component library”

into:

“deterministic application UI architecture system”

It defines how every layer you’ve built so far comes together into real screens.