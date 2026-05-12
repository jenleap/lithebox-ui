# Task 002: Page System Components

## Feature
F010 — Page Composition System

## Description
Implement the five Page region components: `Page`, `PageHeader`, `PageContent`, `PageSidebar`, and `PageFooter`. These are the structural primitives that define the root layout of an application screen. Each component maps to a fixed semantic region. This task covers the base structure only — layout presets and page state are handled in later tasks.

## Files
- `src/components/Page.tsx` (create)
- `src/components/PageHeader.tsx` (create)
- `src/components/PageContent.tsx` (create)
- `src/components/PageSidebar.tsx` (create)
- `src/components/PageFooter.tsx` (create)

## Implementation Steps

1. Create `src/components/PageHeader.tsx`:
   ```tsx
   import React from "react"
   import { PageContract } from "../contracts/PageContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type PageHeaderProps = {
     children?: React.ReactNode
   }

   export function PageHeader({ children }: PageHeaderProps) {
     const style: React.CSSProperties = {
       background: resolveSlot(PageContract.header.background),
       borderBottom: `1px solid ${resolveSlot(PageContract.header.border)}`,
       padding: resolveSlot(PageContract.header.padding),
       flexShrink: 0,
     }
     return <header style={style}>{children}</header>
   }
   ```

2. Create `src/components/PageSidebar.tsx`:
   ```tsx
   import React from "react"
   import { PageContract } from "../contracts/PageContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type PageSidebarProps = {
     children?: React.ReactNode
   }

   export function PageSidebar({ children }: PageSidebarProps) {
     const style: React.CSSProperties = {
       background: resolveSlot(PageContract.sidebar.background),
       borderRight: `1px solid ${resolveSlot(PageContract.sidebar.border)}`,
       width: resolveSlot(PageContract.sidebar.width) ?? "240px",
       flexShrink: 0,
       overflowY: "auto",
     }
     return <aside style={style}>{children}</aside>
   }
   ```

3. Create `src/components/PageContent.tsx`:
   ```tsx
   import React from "react"
   import { PageContract } from "../contracts/PageContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type PageContentProps = {
     children?: React.ReactNode
   }

   export function PageContent({ children }: PageContentProps) {
     const style: React.CSSProperties = {
       flex: 1,
       overflowY: "auto",
       padding: resolveSlot(PageContract.content.padding),
       display: "flex",
       flexDirection: "column",
       gap: resolveSlot(PageContract.content.gap),
     }
     return <main style={style}>{children}</main>
   }
   ```

4. Create `src/components/PageFooter.tsx`:
   ```tsx
   import React from "react"
   import { PageContract } from "../contracts/PageContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type PageFooterProps = {
     children?: React.ReactNode
   }

   export function PageFooter({ children }: PageFooterProps) {
     const style: React.CSSProperties = {
       background: resolveSlot(PageContract.footer.background),
       borderTop: `1px solid ${resolveSlot(PageContract.footer.border)}`,
       padding: resolveSlot(PageContract.footer.padding),
       flexShrink: 0,
     }
     return <footer style={style}>{children}</footer>
   }
   ```

5. Create `src/components/Page.tsx`:
   ```tsx
   import React from "react"
   import { PageContract } from "../contracts/PageContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type PageState = "loading" | "error" | "empty" | "ready"
   export type PageLayout = "standard" | "dashboard" | "detail" | "form"

   export type PageProps = {
     header?: React.ReactNode
     sidebar?: React.ReactNode
     footer?: React.ReactNode
     children?: React.ReactNode
     state?: PageState
     layout?: PageLayout
   }

   export function Page({
     header,
     sidebar,
     footer,
     children,
     state = "ready",
     layout = "standard",
   }: PageProps) {
     const rootStyle: React.CSSProperties = {
       display: "flex",
       flexDirection: "column",
       minHeight: resolveSlot(PageContract.root.minHeight) ?? "100vh",
       background: resolveSlot(PageContract.root.background),
     }

     const bodyStyle: React.CSSProperties = {
       flex: 1,
       display: "flex",
       overflow: "hidden",
     }

     return (
       <div style={rootStyle} data-layout={layout} data-state={state}>
         {header}
         <div style={bodyStyle}>
           {sidebar}
           {children}
         </div>
         {footer}
       </div>
     )
   }
   ```

## Constraints
- Use only `PageContract` for all token references — no hardcoded color or spacing values except as noted fallbacks
- `Page` must not contain layout logic beyond the basic column/row flex structure — presets are added in task 004
- `PageContent` uses `<main>`, `PageSidebar` uses `<aside>`, `PageHeader` uses `<header>`, `PageFooter` uses `<footer>` for correct HTML semantics
- No application logic in any region component
- The `state` and `layout` props are declared now but state-driven rendering is implemented in task 005

## Acceptance Criteria
- All five component files created and exported
- `Page` renders `header`, `sidebar`, `children`, `footer` in correct structural order
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Import `Page`, `PageHeader`, `PageContent`, `PageSidebar`, `PageFooter` in a story or test file and verify they render without errors

## Notes
The `data-layout` and `data-state` attributes on the `Page` root div provide hooks for layout preset styles (task 004) and page state rendering (task 005).
