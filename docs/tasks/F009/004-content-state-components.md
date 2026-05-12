# Task 004: Content State Components

## Feature
F009 — Data Display System

## Description
Implement `EmptyState`, `LoadingState`, and `ErrorState` — the three standardized content-state components. These represent the loading, empty, and error phases of application content areas and must render consistently across the system.

## Files
- `src/components/EmptyState.tsx` (create)
- `src/components/LoadingState.tsx` (create)
- `src/components/ErrorState.tsx` (create)
- `src/index.ts` (modify — add exports)

## Implementation Steps

1. Create `src/components/EmptyState.tsx`:

   **Types:**
   ```ts
   export type EmptyStateProps = {
     title: string
     description?: string
     icon?: React.ReactNode
     action?: React.ReactNode
   }
   ```

   **Implementation:**
   - Import `ContentStateContract` from `"../contracts/ContentStateContract"`
   - Import `Text` from `"./Text"` and `Heading` from `"./Heading"`
   - Render as `<div>` with `display: "flex"`, `flexDirection: "column"`, `alignItems: "center"`, `textAlign: "center"`
   - Apply padding from `ContentStateContract.container.padding` and gap from `ContentStateContract.container.gap` via `resolveSlot`
   - Render optional `icon` slot (any ReactNode)
   - Render `title` using `Heading` component with `level={3}`
   - Render optional `description` using `Text` component with secondary color (inline style from `ContentStateContract.description.text` resolved)
   - Render optional `action` slot below the description

2. Create `src/components/LoadingState.tsx`:

   **Types:**
   ```ts
   export type LoadingStateProps = {
     label?: string
   }
   ```

   **Implementation:**
   - Import `ContentStateContract` from `"../contracts/ContentStateContract"`
   - Render as `<div>` with `display: "flex"`, `flexDirection: "column"`, `alignItems: "center"`, `justifyContent: "center"`, same container padding/gap as `EmptyState`
   - Render a simple CSS spinner:
     - A `<div>` with `width: "32px"`, `height: "32px"`, `borderRadius: "50%"`, `border: "3px solid var(--color-border)"`, `borderTopColor: "var(--color-primary)"` (or fallback `"#6366f1"`), `animation: "spin 0.8s linear infinite"`
     - Inject a `<style>` tag with the keyframe: `@keyframes spin { to { transform: rotate(360deg) } }`
   - Render optional `label` using `Text` component below the spinner
   - No shimmer or skeleton at MVP

3. Create `src/components/ErrorState.tsx`:

   **Types:**
   ```ts
   export type ErrorStateProps = {
     title?: string
     description?: string
     action?: React.ReactNode
   }
   ```

   **Implementation:**
   - Default `title` to `"Something went wrong"`
   - Import `ContentStateContract` from `"../contracts/ContentStateContract"`
   - Import `Text` and `Heading`
   - Render as `<div>` with same layout as `EmptyState` (centered, flex column)
   - Render `title` using `Heading` with `level={3}`
   - Render optional `description` using `Text` with secondary color
   - Render optional `action` slot (e.g. a retry button)

4. Update `src/index.ts` — add:
   ```ts
   export { EmptyState } from "./components/EmptyState"
   export type { EmptyStateProps } from "./components/EmptyState"
   export { LoadingState } from "./components/LoadingState"
   export type { LoadingStateProps } from "./components/LoadingState"
   export { ErrorState } from "./components/ErrorState"
   export type { ErrorStateProps } from "./components/ErrorState"
   ```

## Constraints
- All spacing resolves through `ContentStateContract` and `resolveSlot`
- `LoadingState` must not import any external animation library — CSS keyframe only
- No skeleton/shimmer animation (future feature)
- `action` slots accept any `React.ReactNode` — components do not enforce button usage
- No icon system dependency for `EmptyState` — `icon` is an open `React.ReactNode` slot

## Acceptance Criteria
- `EmptyState` renders title, optional description, optional icon, optional action
- `LoadingState` renders a spinning indicator and optional label
- `ErrorState` renders title, optional description, optional retry action
- All three use `ContentStateContract` for spacing and color
- All exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify in Storybook (task 008): all three states render correctly; loading spinner animates; empty state action slot accepts a Button component

## Notes
The `<style>` tag injection in `LoadingState` is intentional for MVP — no CSS module or styled-component dependency. It is a self-contained, deterministic approach for a simple animation.
