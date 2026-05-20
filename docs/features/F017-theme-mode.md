# F017: Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Overview

This feature defines the **Theme Mode System** for Lithebox UI.

It introduces a structured approach to supporting multiple visual themes—primarily **Light and Dark mode**—through a deterministic, token-driven semantic color system.

This system extends the existing Theme & Design Token System by introducing:

- theme modes (light/dark)
- semantic token resolution per mode
- runtime mode switching
- system preference detection
- CSS variable theming layers

It ensures that all components remain **mode-agnostic**, while visual differences are fully handled at the theme resolution layer.

---

## Objectives

- Define a global theme mode system (light/dark)
- Extend token system with mode-aware semantic resolution
- Support runtime theme switching
- Respect OS-level theme preferences
- Ensure consistent semantic color mapping across modes
- Maintain full compatibility with existing ThemeProvider system
- Ensure components never directly reference raw mode logic

---

## Core Concept

> Components never know what “dark mode” is.

They only consume **semantic tokens**, while the theme system decides how those tokens resolve per mode.

---

## Scope

### Included (MVP)

#### Theme Mode System
- light mode definition
- dark mode definition
- system preference detection (`prefers-color-scheme`)
- runtime mode switching

#### Semantic Token Resolution
- mode-aware token mapping
- shared semantic token interface
- per-mode overrides

#### CSS Variable Theming Strategy
- mode-based CSS variable injection
- root + attribute-based theme layering

#### Theme Provider Extension
- mode state management
- mode propagation via context
- integration with existing ThemeProvider

#### Persistence Layer (Optional MVP)
- localStorage theme persistence
- system default fallback behavior

---

### Not Included

- multi-brand theming systems
- user-generated themes
- theme marketplace systems
- runtime theme editing tools
- high-contrast accessibility themes (future extension)
- dynamic runtime color generation algorithms

---

## Design Principles

### 1. Components Are Mode-Agnostic

No component should ever directly reference:
- light mode
- dark mode
- theme switching logic

---

### 2. Modes Modify Tokens, Not Components

The only difference between modes is:

> how tokens resolve, not how components behave

---

### 3. Semantic Consistency Must Be Preserved

A token like `color.surface` must:
- always represent “surface”
- never change meaning between modes

Only its *value* changes.

---

### 4. Mode Switching Must Be Deterministic

Switching themes must:
- not cause layout shift
- not break hydration
- not introduce flicker

---

### 5. System Preference Is the Default Source

The system should respect:

```css
prefers-color-scheme
```
unless explicitly overridden.

---

# Part 1 — Theme Mode Definition

## Theme Modes
```ts
export type ThemeMode = "light" | "dark"
```
### Default Behavior
- If no user preference exists → use system preference
- If system preference unavailable → default to light mode
- If user overrides → persist override

---

# Part 2 — Semantic Token Model

## Core Concept

Semantic tokens remain stable across modes.

Only their resolved values change.

### Example
```text
color.background
color.surface
color.text.primary
color.text.secondary
```

### Mode Resolution Model
Light Mode
```ts
{
  background: "#FFFFFF",
  surface: "#F9FAFB",
  textPrimary: "#111827"
}
```
Dark Mode
```ts
{
  background: "#0B0F19",
  surface: "#111827",
  textPrimary: "#F9FAFB"
}
```

### Rule
- semantic token name NEVER changes across modes

Only resolved values differ.

---

# Part 3 — Theme Resolution Engine

## Core Concept

A theme mode is applied by resolving:
- base tokens + mode overrides → resolved theme tokens

Theme Structure
```ts
export type Theme = {
  mode: ThemeMode
  tokens: Tokens
}
```
Resolution Flow
```text
system tokens
  + mode overrides
  ↓
resolved tokens
  ↓
CSS variables
```

---

# Part 4 — Theme Provider Extension

### Extended Provider

The existing ThemeProvider is extended:
```ts
<ThemeProvider
  mode="dark"
  tokens={tokens}
>
  <App />
</ThemeProvider>
```

### Responsibilities
- store current mode
- resolve semantic tokens
- inject CSS variables
- listen for system preference changes
- expose mode toggle API

### Mode API
```ts
const { mode, setMode, toggleMode } = useThemeMode()
```

---

# Part 5 — CSS Variable Theming Strategy

## Core Concept
Theme mode is applied via DOM attributes.

Strategy
```html
<html data-theme="dark">
```
or
```html
<html data-theme="light">
```

### CSS Layering Model
Base (Light)
```css
:root {
  --color-background: #ffffff;
}
```
Dark Override
```css
[data-theme="dark"] {
  --color-background: #0b0f19;
}
```

### Rules
- no inline mode-based styling
- all mode switching is CSS-variable driven
- no JavaScript style overrides for themes

---

# Part 6 — System Preference Detection

### Behavior
On initial load:
```text
if userPreference exists → use it
else if system preference exists → use system
else → light mode
```

### Listener Support
System must respond to:
- OS theme changes
- runtime preference updates

### Rule
Theme must update dynamically without full re-render.

---

# Part 7 — Persistence Layer

### Optional MVP Behavior
- store user preference in localStorage
- restore on next load

### Storage Key
```text
lithebox_theme_mode
```

### Rules
- persistence must not block first render
- fallback must always exist

---

# Part 8 — Integration with Existing Systems

### Token System Integration
- mode affects token resolution layer
- tokens remain structurally identical across modes

### Component System Integration
- components remain unaware of theme mode
- all styling flows through CSS variables

### Motion System Integration
- transitions must remain consistent across mode switches
- no animation difference between modes

### Accessibility Integration
- contrast ratios must remain valid in both modes
- focus indicators must remain visible in both themes

---

## Acceptance Criteria

- Light and Dark modes defined and implemented
- ThemeProvider supports mode switching
- CSS variable system supports mode overrides
- System preference detection implemented
- Mode persistence optional and functional
- Components remain mode-agnostic
- No hardcoded theme logic in components
- Mode switching does not cause layout shift
- Tokens resolve correctly across both modes

---

## Definition of Done

- Theme mode system implemented
- Light/Dark token mappings defined
- CSS variable layering system operational
- ThemeProvider extended with mode support
- useThemeMode hook implemented
- System preference detection working
- Persistence layer implemented (optional MVP)
- Integration verified across core components

---

## Risks & Considerations

1. Token drift risk
Light/dark tokens must remain semantically aligned.

2. Contrast violations
Dark mode must not degrade accessibility compliance.

3. Hydration mismatch risk
Server/client theme mismatch must be avoided.

4. Overextension risk
Avoid turning this into a multi-theme system too early.

---

## Key Insight

This feature defines:

a semantic contract between visual meaning and environmental presentation

It ensures that:
- components remain universal
- themes become interchangeable representations
- visual mode changes never affect structural behavior

---

## Strategic Role in Architecture
```text
Tokens
  ↓
Theme Mode System   ← THIS LAYER
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
Feedback System
  ↓
Accessibility Architecture
  ↓
Motion & Animation Layer
  ↓
Responsive System
  ↓
Component Metadata System
  ↓
Application Runtime Integration Layer
```

---

## Final Insight

This feature completes the visual semantics layer of Lithebox UI.

It ensures:
- visual consistency across environments
- stable semantic meaning across themes
- deterministic token resolution
- fully mode-agnostic component design

It is the final step in making Lithebox UI a truly environment-independent design system.