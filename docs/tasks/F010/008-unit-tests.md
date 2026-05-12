# Task 008: Unit Tests

## Feature
F010 — Page Composition System

## Description
Write unit tests for all F010 components. Tests must cover: structural rendering of Page regions, Section composition behavior, layout preset application via `data-layout`, page state rendering override, and composition rule warnings.

## Files
- `src/components/Page.test.tsx` (create)
- `src/components/Section.test.tsx` (create)

## Implementation Steps

1. Create `src/components/Page.test.tsx`:

   **Imports:**
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { Page } from "./Page"
   import { PageHeader } from "./PageHeader"
   import { PageContent } from "./PageContent"
   import { PageSidebar } from "./PageSidebar"
   import { PageFooter } from "./PageFooter"
   ```

   **Helper:**
   ```tsx
   function wrap(ui: React.ReactNode) {
     return render(<ThemeProvider>{ui}</ThemeProvider>)
   }
   ```

   **Tests:**
   - `renders children inside the page body`:
     ```tsx
     wrap(<Page><PageContent><p>content</p></PageContent></Page>)
     expect(screen.getByText("content")).toBeInTheDocument()
     ```
   - `renders header slot`:
     ```tsx
     wrap(<Page header={<PageHeader><span>Header</span></PageHeader>}><PageContent /></Page>)
     expect(screen.getByText("Header")).toBeInTheDocument()
     ```
   - `renders footer slot`:
     ```tsx
     wrap(<Page footer={<PageFooter><span>Footer</span></PageFooter>}><PageContent /></Page>)
     expect(screen.getByText("Footer")).toBeInTheDocument()
     ```
   - `renders sidebar slot`:
     ```tsx
     wrap(<Page sidebar={<PageSidebar><span>Nav</span></PageSidebar>}><PageContent /></Page>)
     expect(screen.getByText("Nav")).toBeInTheDocument()
     ```
   - `applies data-layout attribute for each preset`:
     ```tsx
     const { container } = wrap(<Page layout="dashboard"><PageContent /></Page>)
     expect(container.firstChild).toHaveAttribute("data-layout", "dashboard")
     ```
     Repeat for `standard`, `detail`, `form`.
   - `state="loading" renders LoadingState and hides children`:
     ```tsx
     wrap(<Page state="loading"><PageContent><p>hidden</p></PageContent></Page>)
     expect(screen.queryByText("hidden")).not.toBeInTheDocument()
     ```
   - `state="error" renders ErrorState`:
     ```tsx
     wrap(<Page state="error"><PageContent /></Page>)
     // ErrorState renders a default message — check for role or known text
     expect(screen.getByRole("main")).toBeInTheDocument() // body still renders
     ```
   - `state="empty" renders EmptyState`:
     ```tsx
     wrap(<Page state="empty"><PageContent><p>hidden</p></PageContent></Page>)
     expect(screen.queryByText("hidden")).not.toBeInTheDocument()
     ```
   - `state="ready" renders children`:
     ```tsx
     wrap(<Page state="ready"><PageContent><p>visible</p></PageContent></Page>)
     expect(screen.getByText("visible")).toBeInTheDocument()
     ```
   - `warns when Page is nested inside another Page (dev mode)`:
     ```tsx
     const spy = jest.spyOn(console, "warn").mockImplementation(() => {})
     wrap(<Page><Page><PageContent /></Page></Page>)
     expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
     spy.mockRestore()
     ```

2. Create `src/components/Section.test.tsx`:

   **Imports:**
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { Page } from "./Page"
   import { PageContent } from "./PageContent"
   import { Section, SectionHeader, SectionContent } from "./Section"
   ```

   **Helper:**
   ```tsx
   function wrap(ui: React.ReactNode) {
     return render(<ThemeProvider>{ui}</ThemeProvider>)
   }
   ```

   **Tests:**
   - `renders title when provided`:
     ```tsx
     wrap(<Page><PageContent><Section title="Overview"><p>body</p></Section></PageContent></Page>)
     expect(screen.getByText("Overview")).toBeInTheDocument()
     ```
   - `renders children`:
     ```tsx
     wrap(<Page><PageContent><Section><p>content</p></Section></PageContent></Page>)
     expect(screen.getByText("content")).toBeInTheDocument()
     ```
   - `renders without title`:
     ```tsx
     wrap(<Page><PageContent><Section><p>no title</p></Section></PageContent></Page>)
     expect(screen.getByText("no title")).toBeInTheDocument()
     ```
   - `warns when Section is used outside PageContent`:
     ```tsx
     const spy = jest.spyOn(console, "warn").mockImplementation(() => {})
     wrap(<Section title="Test"><p>x</p></Section>)
     expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
     spy.mockRestore()
     ```
   - `SectionHeader renders children`:
     ```tsx
     wrap(<Page><PageContent><SectionHeader><span>Header</span></SectionHeader></PageContent></Page>)
     // SectionHeader used outside Section — just verify it renders
     expect(screen.getByText("Header")).toBeInTheDocument()
     ```
   - `SectionContent renders children`:
     ```tsx
     wrap(<Page><PageContent><SectionContent><span>body</span></SectionContent></PageContent></Page>)
     expect(screen.getByText("body")).toBeInTheDocument()
     ```

## Constraints
- Wrap all tests in `ThemeProvider` — tokens resolve via CSS variables set by the provider
- Mock `console.warn` and restore it after each warning test
- Do not test visual styles (colors, spacing values) — only structural and behavioral assertions
- Use `@testing-library/react` patterns consistent with existing test files in the repo

## Acceptance Criteria
- All tests pass: `npm run test`
- Page state rendering tests confirm children are hidden during loading/error/empty
- Composition rule warning tests confirm `console.warn` is called with `[Lithebox]` prefix
- No TypeScript errors

## Test Steps
1. Run `npm run test` — all tests pass
2. Verify no type errors in test files

## Notes
Check the `EmptyState` and `ErrorState` components to identify reliable selectors for the state rendering tests (e.g., look for their default title text or a known role).
