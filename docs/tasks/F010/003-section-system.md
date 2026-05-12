# Task 003: Section System Components

## Feature
F010 — Page Composition System

## Description
Implement the three Section components: `Section`, `SectionHeader`, and `SectionContent`. Sections are the reusable structural unit inside `PageContent`. They define content grouping logic, not layout behavior.

## Files
- `src/components/Section.tsx` (create)

## Implementation Steps

1. Create `src/components/Section.tsx` with all three exports:
   ```tsx
   import React from "react"
   import { SectionContract } from "../contracts/SectionContract"
   import { resolveSlot } from "../contracts/resolveContract"

   export type SectionProps = {
     title?: string
     children?: React.ReactNode
   }

   export type SectionHeaderProps = {
     children: React.ReactNode
   }

   export type SectionContentProps = {
     children: React.ReactNode
   }

   export function SectionHeader({ children }: SectionHeaderProps) {
     const style: React.CSSProperties = {
       paddingBottom: resolveSlot(SectionContract.header.padding),
       borderBottom: `1px solid ${resolveSlot(SectionContract.header.border)}`,
       marginBottom: resolveSlot(SectionContract.root.gap),
     }
     return <div style={style}>{children}</div>
   }

   export function SectionContent({ children }: SectionContentProps) {
     const style: React.CSSProperties = {
       display: "flex",
       flexDirection: "column",
       gap: resolveSlot(SectionContract.content.gap),
     }
     return <div style={style}>{children}</div>
   }

   export function Section({ title, children }: SectionProps) {
     const style: React.CSSProperties = {
       display: "flex",
       flexDirection: "column",
       gap: resolveSlot(SectionContract.root.gap),
     }

     return (
       <section style={style}>
         {title && (
           <SectionHeader>
             <span
               style={{ color: resolveSlot(SectionContract.header.title.text), fontWeight: 600 }}
             >
               {title}
             </span>
           </SectionHeader>
         )}
         <SectionContent>{children}</SectionContent>
       </section>
     )
   }
   ```

## Constraints
- All three components live in a single file (`Section.tsx`) — they are tightly coupled structural primitives
- Use only `SectionContract` for all token references
- `Section` uses `<section>` HTML element for correct semantics
- `SectionHeader` and `SectionContent` are exported for direct use when `Section`'s `title` shorthand is insufficient
- No application logic, no data fetching concerns

## Acceptance Criteria
- `Section`, `SectionHeader`, and `SectionContent` are all exported from `src/components/Section.tsx`
- `Section` with a `title` prop renders a `SectionHeader` with the title text
- `Section` without a `title` renders only `SectionContent`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify `<Section title="Overview"><p>content</p></Section>` renders a header and content area

## Notes
`SectionHeader` accepts `children` rather than a `title` string to support cases where the header needs more than plain text (e.g., a row with a title and an action button).
