# Task 007: Public API

## Feature
F010 — Page Composition System

## Description
Export all F010 components and types from `src/index.ts`. This makes the Page Composition System available as part of the Lithebox UI public API.

## Files
- `src/index.ts` (modify — add new exports)

## Implementation Steps

1. Append the following exports to `src/index.ts`:
   ```ts
   export { Page } from "./components/Page"
   export type { PageProps, PageState, PageLayout } from "./components/Page"

   export { PageHeader } from "./components/PageHeader"
   export type { PageHeaderProps } from "./components/PageHeader"

   export { PageContent } from "./components/PageContent"
   export type { PageContentProps } from "./components/PageContent"

   export { PageSidebar } from "./components/PageSidebar"
   export type { PageSidebarProps } from "./components/PageSidebar"

   export { PageFooter } from "./components/PageFooter"
   export type { PageFooterProps } from "./components/PageFooter"

   export { Section, SectionHeader, SectionContent } from "./components/Section"
   export type { SectionProps, SectionHeaderProps, SectionContentProps } from "./components/Section"
   ```

## Constraints
- Do not export `PageCompositionContext`, `PageCompositionProvider`, or `usePageCompositionContext` — these are internal implementation details
- Follow existing export ordering in `src/index.ts`: components grouped by feature layer
- Do not modify any existing exports

## Acceptance Criteria
- All 9 components are importable from the library root: `import { Page, PageHeader, PageContent, PageSidebar, PageFooter, Section, SectionHeader, SectionContent } from "lithebox-ui"`
- All associated prop types are exported
- `PageState` and `PageLayout` union types are exported
- TypeScript compiles with no errors
- `npm run build` passes

## Test Steps
1. Run `npm run build` — no type errors
2. Verify the exports are present in the build output

## Notes
None.
