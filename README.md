
# Lithebox UI

**Lithebox** is a **token-driven, design-system-first UI component framework**.  
Unlike traditional UI libraries, Lithebox does **not** ship with prebuilt styles or themes. Instead, users provide their own **tokens**, which are compiled into **CSS variables** and used throughout the component library via a **recipe system**.

This makes Lithebox:

- Fully **design-system agnostic**
- Flexible and **themeable**
- Scalable across components
- Framework-agnostic at its core (React is the first implementation)

---

## Table of Contents

- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Tokens](#tokens)
- [Component Recipes](#component-recipes)
- [React Components](#react-components)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture

Lithebox has **four core layers**:

### 1. Token Layer (`@lithebox-ui/core`)
- Validates user-provided **raw tokens** (colors, spacing, radius, font sizes)
- Validates **semantic tokens** (design roles like `primary`, `surface`, `danger`)
- Resolves references from semantic tokens to raw tokens
- Compiles tokens into **CSS variables** (e.g., `--lb-color-primary`)

### 2. Recipe System
- Pure functions that define **all component styling logic**
- Include:
  - Slots (root, label, icon, etc.)
  - Base styles
  - Variants (size, type, etc.)
  - Default variants
  - Compound variants (future)
  - State styles (hover, focus, disabled)
- Recipes are **framework-agnostic** and reusable

### 3. React Layer (`lithebox-ui`)
- `DesignSystemProvider`:
  - Injects CSS variables into the DOM
  - Provides token context for components
- React components:
  - Thin wrappers
  - Render JSX
  - Consume styles from recipes
  - Forward props for composability

### 4. Components
- Built from recipes and token variables
- Stateless and flexible
- Fully themeable via token changes

---

## Getting Started

### Install

```bash
pnpm add lithebox-ui
```
or
```bash
npm install lithebox-ui
```

### Example Usage

```bash
import React from "react"
import { DesignSystemProvider, Button } from "lithebox-ui"

const rawTokens = {
  color: { blue500: "#2563eb", white: "#ffffff" },
  spacing: { sm: "8px", md: "12px" },
  radius: { md: "8px" },
  fontSize: {},
  fontWeight: {},
  lineHeight: {}
}

const semanticTokens = {
  color: { primary: "{color.blue500}", onPrimary: "{color.white}" },
  spacing: { sm: "{spacing.sm}", md: "{spacing.md}" },
  radius: { default: "{radius.md}" },
  typography: {}
}

export default function App() {
  return (
    <DesignSystemProvider
      rawTokens={rawTokens}
      semanticTokens={semanticTokens}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <Button>Default</Button>
        <Button variant="outlined">Outlined</Button>
        <Button size="sm">Small</Button>
      </div>
    </DesignSystemProvider>
  )
}
```

## Tokens

#### Raw Tokens

Primitive design values:
```bash
{
  "color": { "blue500": "#2563eb" },
  "spacing": { "sm": "8px" },
  "radius": { "md": "8px" }
}
```

#### Semantic Tokens

Map meaning to raw tokens:
```bash
{
  "color": { "primary": "{color.blue500}", "onPrimary": "{color.white}" },
  "spacing": { "buttonPadding": "{spacing.sm}" }
}
```

## Component Recipes

Recipes define styling logic for all components:
```bash
const buttonRecipe = createRecipe({
  slots: ["root"],
  base: { root: { borderRadius: "var(--lb-radius-default)" } },
  variants: {
    variant: {
      contained: { root: { background: "var(--lb-color-primary)", color: "var(--lb-color-onPrimary)" } }
    }
  },
  defaultVariants: { variant: "contained" }
})
```

License

MIT © Lithebox