# Task 006: Composition Rules (Dev Mode Enforcement)

## Feature
F010 — Page Composition System

## Description
Implement dev-mode enforcement of the composition rules defined in the F010 spec. Use React context to track nesting and emit `console.warn` when rules are violated. Rules enforced: (1) `Section` must be used inside `PageContent`, (2) `Page` cannot be nested inside another `Page`, (3) `PageSidebar` and `PageFooter` should only be used inside `Page`.

## Files
- `src/components/PageCompositionContext.tsx` (create)
- `src/components/Page.tsx` (modify — provide context)
- `src/components/PageContent.tsx` (modify — provide context)
- `src/components/Section.tsx` (modify — consume context)
- `src/components/PageSidebar.tsx` (modify — consume context)
- `src/components/PageFooter.tsx` (modify — consume context)

## Implementation Steps

1. Create `src/components/PageCompositionContext.tsx`:
   ```tsx
   import React, { createContext, useContext } from "react"

   type PageCompositionContextValue = {
     insidePage: boolean
     insidePageContent: boolean
   }

   const PageCompositionContext = createContext<PageCompositionContextValue>({
     insidePage: false,
     insidePageContent: false,
   })

   export function usePageCompositionContext() {
     return useContext(PageCompositionContext)
   }

   export function PageCompositionProvider({
     value,
     children,
   }: {
     value: PageCompositionContextValue
     children: React.ReactNode
   }) {
     return (
       <PageCompositionContext.Provider value={value}>
         {children}
       </PageCompositionContext.Provider>
     )
   }
   ```

2. Modify `src/components/Page.tsx`:
   - Import `PageCompositionProvider` and `usePageCompositionContext`
   - At the top of the component, read the current context and warn if already inside a Page:
     ```tsx
     const parentCtx = usePageCompositionContext()
     if (process.env.NODE_ENV !== "production" && parentCtx.insidePage) {
       console.warn("[Lithebox] Page cannot be nested inside another Page.")
     }
     ```
   - Wrap the returned JSX in `PageCompositionProvider` with `{ insidePage: true, insidePageContent: false }`

3. Modify `src/components/PageContent.tsx`:
   - Import `PageCompositionProvider` and `usePageCompositionContext`
   - Warn if used outside a `Page`:
     ```tsx
     const ctx = usePageCompositionContext()
     if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
       console.warn("[Lithebox] PageContent must be used inside a Page.")
     }
     ```
   - Wrap the returned `<main>` in `PageCompositionProvider` with `{ insidePage: true, insidePageContent: true }`

4. Modify `src/components/Section.tsx`:
   - Import `usePageCompositionContext`
   - In `Section`, warn if used outside `PageContent`:
     ```tsx
     const ctx = usePageCompositionContext()
     if (process.env.NODE_ENV !== "production" && !ctx.insidePageContent) {
       console.warn("[Lithebox] Section must be used inside PageContent.")
     }
     ```

5. Modify `src/components/PageSidebar.tsx`:
   - Import `usePageCompositionContext`
   - Warn if used outside `Page`:
     ```tsx
     const ctx = usePageCompositionContext()
     if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
       console.warn("[Lithebox] PageSidebar must be used inside a Page.")
     }
     ```

6. Modify `src/components/PageFooter.tsx`:
   - Import `usePageCompositionContext`
   - Warn if used outside `Page`:
     ```tsx
     const ctx = usePageCompositionContext()
     if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
       console.warn("[Lithebox] PageFooter must be used inside a Page.")
     }
     ```

## Constraints
- All warnings must be gated on `process.env.NODE_ENV !== "production"` — zero overhead in production
- Use `console.warn`, not `console.error` or thrown errors (consistent with `validateContract.ts` pattern)
- The context is internal — do not export `PageCompositionContext` directly, only `PageCompositionProvider` and `usePageCompositionContext`
- Do not warn for `PageHeader` — it is commonly used standalone (e.g., in Storybook previews)
- Composition enforcement must not affect rendering — warnings only

## Acceptance Criteria
- Using `<Section>` outside `<PageContent>` logs a `[Lithebox]` console warning in dev mode
- Nesting `<Page>` inside `<Page>` logs a `[Lithebox]` console warning in dev mode
- Using `<PageSidebar>` or `<PageFooter>` outside `<Page>` logs a `[Lithebox]` console warning in dev mode
- No warnings are produced in correct usage
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In dev mode, render `<Section><p>test</p></Section>` outside any `Page` and verify the warning appears in the console
3. Render a fully composed `<Page>` with `<PageContent><Section>…</Section></PageContent>` and verify no warnings

## Notes
The context default values (`insidePage: false`, `insidePageContent: false`) are intentional — they cause warnings when components are rendered outside the expected hierarchy, which is the desired behavior.
