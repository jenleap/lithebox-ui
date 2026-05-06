# F001: Theme & Design Token System (MVP — Foundation Layer)

## Overview

This feature establishes the **foundational theme system** for Lithebox UI.

It defines how **design tokens are structured, merged, and exposed at runtime**, forming the base layer that all components will consume.

> This system is the first step in the broader token pipeline (tokens → future compiler → component contracts → components).

---

## Objectives

- Define a **typed design token schema**
- Provide a **default token set**
- Support **partial user overrides**
- Implement **deterministic deep merging**
- Expose tokens via:
  - React Context provider
  - Runtime hook access
- Inject tokens into the DOM as **CSS variables**

---

## Core Principle

All styling flows from tokens:

> Components never define raw values — they consume **resolved tokens only**

Example:

Hardcoded styling:
```css
background-color: #4F46E5;
```

Token-driven styling:
```css
background-color: var(--color-primary);
```

---

## Scope

### Included (MVP)
- Token type system
- Default token definitions
- Deep merge utility for overrides
- Theme provider (React Context)
- Token access hook
- CSS variable generation
- Runtime injection into DOM

### Not Included (Future Layers)
- Token compiler / semantic transformation layer
- Component token contracts
- UI components
- Dark mode system
- Token validation UI
- Multi-theme orchestration system

---

## Token Schema (MVP)
```ts
export type Tokens = {
  color: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
    }
    border: string
    error: string
  }

  radius: {
    sm: string
    md: string
    lg: string
  }

  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }

  typography: {
    fontFamily: string
    size: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    weight: {
      regular: number
      medium: number
      bold: number
    }
  }

  shadow: {
    sm: string
    md: string
  }
}
```

---

## Default Tokens
```ts
export const defaultTokens: Tokens = {
  color: {
    primary: "#4F46E5",
    secondary: "#22C55E",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: {
      primary: "#111827",
      secondary: "#6B7280"
    },
    border: "#E5E7EB",
    error: "#EF4444"
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px"
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    size: {
      sm: "12px",
      md: "14px",
      lg: "18px",
      xl: "24px"
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)"
  }
}
```

---

## Token Merge Strategy

**Requirement**
Users may provide partial token overrides.

The system must deterministically merge them with defaults.

**Implementation**
```ts
import { Tokens } from "./types"

export function mergeTokens(
  base: Tokens,
  overrides?: Partial<Tokens>
): Tokens {
  if (!overrides) return base

  return {
    ...base,
    ...overrides,

    color: {
      ...base.color,
      ...overrides.color,
      text: {
        ...base.color.text,
        ...overrides.color?.text
      }
    },

    radius: {
      ...base.radius,
      ...overrides.radius
    },

    spacing: {
      ...base.spacing,
      ...overrides.spacing
    },

    typography: {
      ...base.typography,
      ...overrides.typography,
      size: {
        ...base.typography.size,
        ...overrides.typography?.size
      },
      weight: {
        ...base.typography.weight,
        ...overrides.typography?.weight
      }
    },

    shadow: {
      ...base.shadow,
      ...overrides.shadow
    }
  }
}
```

---

## CSS Variable Injection Layer

**Purpose**
Convert resolved tokens into CSS variables for runtime styling.

**Naming Convention**
All variables follow:
```text
--color-primary
--color-text-primary
--spacing-md
--radius-lg
--font-size-md
```

**Implementation**
```ts
import { Tokens } from "./types"

export function tokensToCSSVariables(tokens: Tokens): Record<string, string> {
  return {
    "--color-primary": tokens.color.primary,
    "--color-secondary": tokens.color.secondary,
    "--color-background": tokens.color.background,
    "--color-surface": tokens.color.surface,

    "--color-text-primary": tokens.color.text.primary,
    "--color-text-secondary": tokens.color.text.secondary,
    "--color-border": tokens.color.border,
    "--color-error": tokens.color.error,

    "--radius-sm": tokens.radius.sm,
    "--radius-md": tokens.radius.md,
    "--radius-lg": tokens.radius.lg,

    "--spacing-xs": tokens.spacing.xs,
    "--spacing-sm": tokens.spacing.sm,
    "--spacing-md": tokens.spacing.md,
    "--spacing-lg": tokens.spacing.lg,
    "--spacing-xl": tokens.spacing.xl,

    "--font-family": tokens.typography.fontFamily,

    "--font-size-sm": tokens.typography.size.sm,
    "--font-size-md": tokens.typography.size.md,
    "--font-size-lg": tokens.typography.size.lg,
    "--font-size-xl": tokens.typography.size.xl,

    "--font-weight-regular": String(tokens.typography.weight.regular),
    "--font-weight-medium": String(tokens.typography.weight.medium),
    "--font-weight-bold": String(tokens.typography.weight.bold),

    "--shadow-sm": tokens.shadow.sm,
    "--shadow-md": tokens.shadow.md
  }
}
```

---

## Theme Provider (Runtime Layer)

**Responsibilities**
- Merge default + user tokens
- Generate CSS variables
- Inject variables into DOM
- Provide resolved tokens via React Context

**Implementation**
```ts
import React, { createContext, useContext, useMemo } from "react"
import { defaultTokens } from "../tokens/defaultTokens"
import { mergeTokens } from "../tokens/mergeTokens"
import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
import { Tokens } from "../tokens/types"

const ThemeContext = createContext<Tokens>(defaultTokens)

export function ThemeProvider({
  tokens,
  children
}: {
  tokens?: Partial<Tokens>
  children: React.ReactNode
}) {
  const resolvedTokens = useMemo(
    () => mergeTokens(defaultTokens, tokens),
    [tokens]
  )

  const cssVariables = useMemo(
    () => tokensToCSSVariables(resolvedTokens),
    [resolvedTokens]
  )

  return (
    <ThemeContext.Provider value={resolvedTokens}>
      <div style={cssVariables as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

---

## Usage Example
```ts
<ThemeProvider
  tokens={{
    color: {
      primary: "#FF5733"
    }
  }}
>
  <App />
</ThemeProvider>
```

---

## Acceptance Criteria

- Default tokens are applied when no overrides are provided
- Partial overrides correctly merge with defaults
- CSS variables are injected into the DOM root container
- `useTheme()` returns fully resolved tokens
- Token system is usable without any UI components
- No hardcoded styling values exist outside token definitions

---

## Definition of Done

- Token schema implemented and typed
- Default tokens defined
- Deep merge utility implemented
- ThemeProvider functional
- CSS variable injection working
- Hook provides runtime access to resolved tokens
- Verified in a minimal React test app

---

## Risks & Considerations

- Deep merge complexity will grow with token system expansion
- CSS variable naming must remain stable for long-term compatibility
- Token structure decisions here constrain future compiler and contract layers
- Over-flexibility early may weaken deterministic guarantees later

---

## Key Insight

This layer is not just theming.

It is the runtime foundation of the entire Lithebox system:

> Every component, prototype, and AI-generated UI will ultimately resolve back to this token layer.