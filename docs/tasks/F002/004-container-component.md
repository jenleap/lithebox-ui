# Task 004: Container Component

## Feature
F002 — Core Layout Primitives System

## Description
Create the `Container` component — a bounded layout wrapper that provides page-level structure. Container controls maximum width, centers content, and optionally applies background color and padding. It establishes the outer boundary of a layout region.

## Files
- Create: `src/primitives/Container.tsx`

## Implementation Steps
1. Create `src/primitives/Container.tsx`
2. Define `ContainerProps`:
   ```ts
   type ContainerProps = {
     maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
     padding?: keyof Tokens["spacing"]
     background?: "primary" | "secondary" | "background" | "surface"
     children?: React.ReactNode
   }
   ```
3. Define a `maxWidthMap` constant inside the file (not exported):
   ```ts
   const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
     sm: "640px",
     md: "768px",
     lg: "1024px",
     xl: "1280px",
     full: "100%",
   }
   ```
4. Render a `div` with a base style of:
   - `width: "100%"`
   - `marginLeft: "auto"`
   - `marginRight: "auto"`
5. Map props to inline styles:
   - `maxWidth` → look up in `maxWidthMap`, set as `maxWidth` style property
   - `padding` → `var(--spacing-{padding})`
   - `background` → `var(--color-{background})`
6. Only include optional style keys when those props are defined
7. Pass `children` through

## Constraints
- `maxWidth` must use the fixed map — no raw pixel values accepted via props
- No hardcoded spacing or color values — use CSS variables only
- `width: 100%` and auto margins must always be applied (centering is the base behavior)
- Functional component only

## Acceptance Criteria
- Container always renders with `width: "100%"`, `marginLeft: "auto"`, `marginRight: "auto"`
- `maxWidth="lg"` produces `style.maxWidth === "1024px"`
- `maxWidth="full"` produces `style.maxWidth === "100%"`
- `padding="xl"` produces `style.padding === "var(--spacing-xl)"`
- `background="background"` produces `style.background === "var(--color-background)"`
- Omitting optional props does not set those style keys

## Test Steps
1. Render `<Container />` — verify `style.width === "100%"`, `style.marginLeft === "auto"`, `style.marginRight === "auto"`
2. Render `<Container maxWidth="sm" />` — verify `style.maxWidth === "640px"`
3. Render `<Container maxWidth="md" />` — verify `style.maxWidth === "768px"`
4. Render `<Container maxWidth="lg" />` — verify `style.maxWidth === "1024px"`
5. Render `<Container maxWidth="xl" />` — verify `style.maxWidth === "1280px"`
6. Render `<Container maxWidth="full" />` — verify `style.maxWidth === "100%"`
7. Render `<Container padding="md" />` — verify `style.padding === "var(--spacing-md)"`
8. Render `<Container background="surface" />` — verify `style.background === "var(--color-surface)"`

## Notes
Container is the outermost layout primitive. It does not use flexbox — layout of its children is delegated to Stack or Row nested inside it. Container is not a Box; it does not accept radius or border props.
