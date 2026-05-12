# Task 005: AppShell, Sidebar, TopBar, ContentArea Components

## Feature
F008 — Navigation & Overlay System

## Description
Implement the four application structure components. These are structural layout primitives — they define the application shell, not application logic. Each consumes its token contract and renders with inline styles resolved from tokens.

## Files
- `src/components/AppShell.tsx` (create)
- `src/components/Sidebar.tsx` (create)
- `src/components/TopBar.tsx` (create)
- `src/components/ContentArea.tsx` (create)
- `src/index.ts` (modify — add exports)

## Implementation Steps
1. Create `src/components/AppShell.tsx`:
   - Props:
     ```ts
     export type AppShellProps = {
       sidebar?: React.ReactNode
       header?: React.ReactNode
       children?: React.ReactNode
     }
     ```
   - Import `AppShellContract` from `"../contracts/AppShellContract"`
   - Render a `<div>` with `display: flex`, `height: 100vh`, `background` resolved from `AppShellContract.layout.background`
   - Sidebar slot renders as a left column when `sidebar` prop is provided
   - Main content area renders as a `<div style={{ flex: 1, display: "flex", flexDirection: "column" }}`
   - `header` renders at top of main area; `children` below it

2. Create `src/components/Sidebar.tsx`:
   - Props:
     ```ts
     export type SidebarProps = {
       children?: React.ReactNode
     }
     ```
   - Import `SidebarContract`
   - Render `<aside>` with `width: 240px` (fallback), `background`, `borderRight`, `padding`, `display: flex`, `flexDirection: column`, `gap` resolved from contract slots
   - `children` rendered inside

3. Create `src/components/TopBar.tsx`:
   - Props:
     ```ts
     export type TopBarProps = {
       children?: React.ReactNode
     }
     ```
   - Import `TopBarContract`
   - Render `<header>` with `height: 56px` (fallback), `background`, `borderBottom`, `paddingLeft`/`paddingRight`, `paddingTop`/`paddingBottom`, `display: flex`, `alignItems: center` resolved from contract slots

4. Create `src/components/ContentArea.tsx`:
   - Props:
     ```ts
     export type ContentAreaProps = {
       children?: React.ReactNode
     }
     ```
   - Import `ContentAreaContract`
   - Render `<main>` with `flex: 1`, `overflow: auto`, `background`, `padding` resolved from contract slots

5. Update `src/index.ts` — add:
   ```ts
   export { AppShell } from "./components/AppShell"
   export type { AppShellProps } from "./components/AppShell"
   export { Sidebar } from "./components/Sidebar"
   export type { SidebarProps } from "./components/Sidebar"
   export { TopBar } from "./components/TopBar"
   export type { TopBarProps } from "./components/TopBar"
   export { ContentArea } from "./components/ContentArea"
   export type { ContentAreaProps } from "./components/ContentArea"
   ```

## Constraints
- No routing logic — these are structural containers only
- No responsive collapse behavior
- No className prop on any component
- All styling via inline styles from resolved token slots
- Use `resolveSlot` from `"../contracts/resolveContract"` for token-path resolution; fallback to safe defaults for unresolved tokens
- `AppShell` does not wrap `OverlayManagerProvider` — that is the consumer app's responsibility

## Acceptance Criteria
- All four components render without errors
- `AppShell` composes sidebar, header, and children into a correct flex layout
- `Sidebar` renders as a fixed-width left column using contract tokens
- `TopBar` renders as a fixed-height top bar using contract tokens
- `ContentArea` fills remaining space with correct overflow/scroll behavior
- All four exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), verify AppShell layout renders correctly with sidebar + topbar + content

## Notes
Token resolution may return `undefined` for tokens like `spacing.sidebar` and `spacing.topbar` if they are not in `defaultTokens`. Inline fallbacks (`240px`, `56px`) ensure the layout still works without crashing.
