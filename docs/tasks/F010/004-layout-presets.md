# Task 004: Layout Presets

## Feature
F010 — Page Composition System

## Description
Extend the `Page` component to apply deterministic CSS layout based on the `layout` prop. Implement the four layout presets: `standard`, `dashboard`, `detail`, and `form`. Each preset configures the structural arrangement of regions without changing the component API.

## Files
- `src/components/Page.tsx` (modify)
- `src/utils/pageLayouts.ts` (create)

## Implementation Steps

1. Create `src/utils/pageLayouts.ts` — define layout styles for each preset:
   ```ts
   import React from "react"
   import type { PageLayout } from "../components/Page"

   export function getLayoutBodyStyle(layout: PageLayout): React.CSSProperties {
     switch (layout) {
       case "standard":
         // Header + Content: no sidebar
         return { flex: 1, display: "flex", overflow: "hidden" }

       case "dashboard":
         // Sidebar + Content, both under Header
         return { flex: 1, display: "flex", overflow: "hidden" }

       case "detail":
         // Header + Content + optional Sidebar on the right
         return { flex: 1, display: "flex", overflow: "hidden", flexDirection: "row" }

       case "form":
         // Header + centered Content: constrained max-width, centered
         return {
           flex: 1,
           display: "flex",
           justifyContent: "center",
           overflow: "auto",
           padding: "0",
         }

       default:
         return { flex: 1, display: "flex", overflow: "hidden" }
     }
   }

   export function getLayoutContentStyle(layout: PageLayout): React.CSSProperties {
     if (layout === "form") {
       return { maxWidth: "640px", width: "100%", alignSelf: "flex-start" }
     }
     return {}
   }
   ```

2. Modify `src/components/Page.tsx` — import and apply layout styles:
   - Import `getLayoutBodyStyle` and `getLayoutContentStyle` from `"../utils/pageLayouts"`
   - Replace the hardcoded `bodyStyle` with `getLayoutBodyStyle(layout)`
   - Wrap `children` in a `<div>` that receives `getLayoutContentStyle(layout)` when layout is `"form"`:
     ```tsx
     const bodyStyle = getLayoutBodyStyle(layout)
     const contentWrapStyle = getLayoutContentStyle(layout)
     const hasContentWrap = Object.keys(contentWrapStyle).length > 0

     // In JSX:
     <div style={bodyStyle}>
       {sidebar}
       {hasContentWrap ? <div style={contentWrapStyle}>{children}</div> : children}
     </div>
     ```

## Constraints
- Layout logic must live in `pageLayouts.ts`, not inline in `Page.tsx`
- No new props — the `layout` prop already declared in task 002 drives this behavior
- Sidebar position is always left of content (dashboard layout: sidebar on left, content on right)
- Detail layout sidebar position is right of content — the `Page` caller passes sidebar and children in the correct order
- Form layout max-width is hardcoded at `640px` for MVP — no token for this yet
- Do not change the `PageSidebar`, `PageContent`, `PageHeader`, or `PageFooter` component implementations

## Acceptance Criteria
- `layout="standard"` renders header above a full-width content area
- `layout="dashboard"` renders sidebar beside the content area (sidebar left, content right)
- `layout="detail"` renders content with optional sidebar on the right
- `layout="form"` renders content centered with a max-width of 640px
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (added in task 009), verify each layout preset renders structurally correctly

## Notes
For `detail` layout, the caller controls sidebar placement by passing the sidebar prop. The layout preset only controls the CSS flex direction of the body region.
