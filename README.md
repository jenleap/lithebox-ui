
# Lithebox UI

**Lithebox UI** is a token-driven, design-system-first React component library.

All visual decisions originate from a single token structure. Components consume those tokens as CSS variables — no hardcoded styles, no external themes required.

---

## Table of Contents

- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Local Testing](#local-testing)
- [Tokens](#tokens)
- [Layout Primitives](#layout-primitives)
- [Components](#components)
  - [Core](#core)
  - [Forms](#forms)
  - [Navigation & Overlays](#navigation--overlays)
  - [Data Display](#data-display)
- [Theming](#theming)
- [Storybook](#storybook)

---

## Architecture

```
Tokens (defaultTokens + overrides)
        │
        ▼
  mergeTokens()
        │
        ▼
tokensToCSSVariables()
        │
        ▼
  ThemeProvider (injects CSS vars into DOM)
        │
   ┌────┴──────────────────────────────┐
   │                                   │
Layout Primitives                  Components
(Box, Stack, Row,           (Core, Forms, Navigation,
 Container)                  Overlays, Data Display)
```

**Four layers:**

1. **Token types** — A single `Tokens` interface defines all design values: color, spacing, radius, typography, and shadow.
2. **Token pipeline** — `mergeTokens` deep-merges user overrides with `defaultTokens`. `tokensToCSSVariables` compiles the resolved tokens into CSS custom properties.
3. **ThemeProvider** — Injects the compiled CSS variables into the DOM via inline styles and exposes the resolved token object via `useTheme`.
4. **Components & Primitives** — Consume CSS variables directly. No runtime token lookups.

---

## Getting Started

### Install

```bash
npm install lithebox-ui
```

### Basic usage

```tsx
import { ThemeProvider, Button, Stack } from "lithebox-ui"

export default function App() {
  return (
    <ThemeProvider>
      <Stack gap="md">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Stack>
    </ThemeProvider>
  )
}
```

`ThemeProvider` with no props uses the built-in `defaultTokens`.

---

## Local Testing

To test the package in another repository before publishing to npm, use `npm pack` to produce a local tarball.

**1. Build and pack** (in this repo):

```bash
npm run build
npm pack
# produces: lithebox-ui-0.1.0.tgz
```

**2. Install the tarball** (in the consumer repo):

```bash
npm install /absolute/path/to/lithebox-ui/lithebox-ui-0.1.0.tgz
```

**3. Use it exactly as you would the published package:**

```tsx
import { ThemeProvider, Button } from "lithebox-ui"
```

After any change to the library, re-run `npm run build && npm pack` in this repo and re-install in the consumer.

---

## Tokens

The `Tokens` type is the single source of truth for all design values:

```ts
type Tokens = {
  color: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: { primary: string; secondary: string }
    border: string
    error: string
  }
  radius: { sm: string; md: string; lg: string }
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string }
  typography: {
    fontFamily: string
    size: { sm: string; md: string; lg: string; xl: string }
    weight: { regular: number; medium: number; bold: number }
  }
  shadow: { sm: string; md: string }
}
```

### Default tokens

`defaultTokens` ships with sensible defaults (Indigo primary, neutral grays, Inter font family) and can be used as-is or partially overridden.

### Token pipeline

```ts
import { mergeTokens, tokensToCSSVariables, defaultTokens } from "lithebox-ui"

const resolved = mergeTokens(defaultTokens, { color: { primary: "#0EA5E9" } })
const cssVars = tokensToCSSVariables(resolved)
// { "--color-primary": "#0EA5E9", "--spacing-md": "16px", ... }
```

---

## Layout Primitives

Primitives are unstyled building blocks for page structure. They consume spacing and layout tokens.

| Component | Purpose |
|---|---|
| `Box` | Base block element with token-mapped spacing and display props |
| `Stack` | Vertical flex container with a `gap` prop |
| `Row` | Horizontal flex container with `gap` and alignment props |
| `Container` | Max-width wrapper with centered horizontal padding |

```tsx
import { Stack, Row, Box, Container } from "lithebox-ui"

<Container>
  <Stack gap="lg">
    <Row gap="md" align="center">
      <Box padding="sm">Item A</Box>
      <Box padding="sm">Item B</Box>
    </Row>
  </Stack>
</Container>
```

---

## Components

All components are styled via CSS variables injected by `ThemeProvider`.

### Core

| Component | Variants / Props |
|---|---|
| `Button` | `variant`: `primary` \| `secondary` \| `ghost`; `size`: `sm` \| `md` \| `lg` |
| `Card` | Surface-colored container with shadow and radius |
| `Surface` | Semantic background block |
| `Divider` | Horizontal rule using the border token |
| `Text` | Body copy with `size` and `color` props |
| `Heading` | Headings `h1`–`h4` via `level` prop |
| `Label` | Form label with secondary text styling |
| `Icon` | Inline SVG wrapper with token-mapped size and color |

```tsx
import { Card, Heading, Text, Button, Stack } from "lithebox-ui"

<Card>
  <Stack gap="sm">
    <Heading level={2}>Card title</Heading>
    <Text size="md">Supporting description text.</Text>
    <Button size="sm">Action</Button>
  </Stack>
</Card>
```

---

### Forms

| Component | Purpose |
|---|---|
| `Input` | Text input with interaction states and error support |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown select with typed option list |
| `Checkbox` | Controlled checkbox with label |
| `Radio` | Controlled radio button |
| `Field` | Wrapper composing a label, control, helper text, and error |
| `HelperText` | Secondary descriptive text below a form control |
| `ErrorText` | Semantic error message for form validation |

```tsx
import { Field, Input, HelperText } from "lithebox-ui"

<Field label="Email" htmlFor="email">
  <Input id="email" placeholder="you@example.com" />
  <HelperText>We'll never share your email.</HelperText>
</Field>
```

---

### Navigation & Overlays

| Component | Purpose |
|---|---|
| `AppShell` | Top-level layout wrapper composing sidebar and content area |
| `Sidebar` | Fixed side navigation panel |
| `TopBar` | Horizontal top navigation bar |
| `ContentArea` | Main scrollable content region |
| `Modal` | Blocking overlay with backdrop, ESC dismiss, and focus trap |
| `Drawer` | Slide-in panel overlay anchored to a viewport edge |
| `Dropdown` | Lightweight contextual menu overlay |
| `OverlayManagerProvider` | Required context provider for all overlay components |

Overlay components render via React portal and require `OverlayManagerProvider` at the application root.

```tsx
import { OverlayManagerProvider, Modal, Button } from "lithebox-ui"
import { useState } from "react"

function App() {
  const [open, setOpen] = useState(false)
  return (
    <OverlayManagerProvider>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Modal content
      </Modal>
    </OverlayManagerProvider>
  )
}
```

---

### Data Display

| Component | Purpose |
|---|---|
| `List` | Vertical collection with `spacing` prop (`sm` \| `md` \| `lg`) |
| `ListItem` | Single item within a `List` |
| `DescriptionList` | Label/value pair list for metadata and summaries |
| `DescriptionListItem` | A single `label` + `value` row within a `DescriptionList` |
| `Table` | Structured tabular layout with `density` prop (`comfortable` \| `compact`) |
| `TableHeader` | `<thead>` wrapper with header background styling |
| `TableBody` | `<tbody>` wrapper |
| `TableRow` | Single table row with border styling |
| `TableCell` | Table cell; renders as `<th>` when `header` prop is set |
| `Badge` | Inline semantic status label; `variant`: `default` \| `success` \| `warning` \| `error` \| `info` |
| `StatusIndicator` | Dot indicator for online/offline-style states; same variants as `Badge` |
| `EmptyState` | Standardized empty-data UI with title, description, icon, and action slots |
| `LoadingState` | Standardized loading UI with spinner and optional label |
| `ErrorState` | Standardized error UI with title, description, and retry action slot |

```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell, Badge, StatusIndicator } from "lithebox-ui"

<Table density="comfortable">
  <TableHeader>
    <TableRow>
      <TableCell header>Service</TableCell>
      <TableCell header>Status</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>API Server</TableCell>
      <TableCell>
        <Badge variant="success">Online</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

```tsx
import { EmptyState, Button } from "lithebox-ui"

<EmptyState
  title="No results found"
  description="Try adjusting your filters."
  action={<Button variant="secondary">Clear filters</Button>}
/>
```

---

## Theming

Pass a partial `Tokens` object to `ThemeProvider` to override any defaults:

```tsx
import { ThemeProvider } from "lithebox-ui"

const tokens = {
  color: {
    primary: "#0EA5E9",
    secondary: "#F59E0B"
  },
  typography: {
    fontFamily: "Geist, sans-serif"
  }
}

export default function App() {
  return (
    <ThemeProvider tokens={tokens}>
      {/* all components below use the overridden tokens */}
    </ThemeProvider>
  )
}
```

Only the values you provide are overridden — everything else falls back to `defaultTokens`.

To access resolved tokens inside a component:

```tsx
import { useTheme } from "lithebox-ui"

function MyComponent() {
  const tokens = useTheme()
  return <div style={{ color: tokens.color.primary }}>...</div>
}
```

---

## Storybook

The component library ships with Storybook for interactive development and documentation.

```bash
npm run storybook
```

Stories cover:
- Token visualization (color, spacing, typography, radius)
- Every layout primitive
- Every component with all variants
- Form composition examples
- Navigation and overlay patterns
- Data display composition (tables with badges, empty/loading/error states)
- Live token override controls via Storybook addon

---

## License

MIT © Lithebox
