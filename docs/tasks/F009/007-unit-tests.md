# Task 007: Unit Tests

## Feature
F009 — Data Display System

## Description
Write unit tests for all F009 components. Tests verify rendering structure, prop behavior, and TypeScript correctness. Follow the existing test pattern in the codebase (Vitest + React Testing Library).

## Files
- `src/components/List.test.tsx` (create)
- `src/components/Table.test.tsx` (create)
- `src/components/Badge.test.tsx` (create)
- `src/components/StatusIndicator.test.tsx` (create)
- `src/components/EmptyState.test.tsx` (create)

## Implementation Steps

1. Create `src/components/List.test.tsx`:
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { List, ListItem, DescriptionList, DescriptionListItem } from "./List"
   // import DescriptionList from DescriptionList.tsx

   describe("List", () => {
     it("renders children", () => {
       render(
         <ThemeProvider>
           <List><ListItem>Item 1</ListItem></List>
         </ThemeProvider>
       )
       expect(screen.getByText("Item 1")).toBeInTheDocument()
     })

     it("renders as ul", () => {
       const { container } = render(
         <ThemeProvider><List><ListItem>A</ListItem></List></ThemeProvider>
       )
       expect(container.querySelector("ul")).toBeInTheDocument()
     })

     it("renders ListItem as li", () => {
       const { container } = render(
         <ThemeProvider><List><ListItem>A</ListItem></List></ThemeProvider>
       )
       expect(container.querySelector("li")).toBeInTheDocument()
     })
   })

   describe("DescriptionList", () => {
     it("renders label and value", () => {
       render(
         <ThemeProvider>
           <DescriptionList>
             <DescriptionListItem label="Name" value="Alice" />
           </DescriptionList>
         </ThemeProvider>
       )
       expect(screen.getByText("Name")).toBeInTheDocument()
       expect(screen.getByText("Alice")).toBeInTheDocument()
     })

     it("renders as dl", () => {
       const { container } = render(
         <ThemeProvider>
           <DescriptionList>
             <DescriptionListItem label="Key" value="Val" />
           </DescriptionList>
         </ThemeProvider>
       )
       expect(container.querySelector("dl")).toBeInTheDocument()
     })
   })
   ```

2. Create `src/components/Table.test.tsx`:
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { Table, TableHeader, TableBody, TableRow, TableCell } from "./Table"

   describe("Table", () => {
     it("renders as table element", () => {
       const { container } = render(
         <ThemeProvider><Table /></ThemeProvider>
       )
       expect(container.querySelector("table")).toBeInTheDocument()
     })

     it("renders header cell as th", () => {
       const { container } = render(
         <ThemeProvider>
           <Table>
             <TableHeader><TableRow><TableCell header>Name</TableCell></TableRow></TableHeader>
           </Table>
         </ThemeProvider>
       )
       expect(container.querySelector("th")).toBeInTheDocument()
     })

     it("renders body cell as td", () => {
       const { container } = render(
         <ThemeProvider>
           <Table>
             <TableBody><TableRow><TableCell>Value</TableCell></TableRow></TableBody>
           </Table>
         </ThemeProvider>
       )
       expect(container.querySelector("td")).toBeInTheDocument()
     })

     it("accepts density prop without error", () => {
       expect(() =>
         render(<ThemeProvider><Table density="compact" /></ThemeProvider>)
       ).not.toThrow()
     })
   })
   ```

3. Create `src/components/Badge.test.tsx`:
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { Badge } from "./Badge"

   describe("Badge", () => {
     it("renders children", () => {
       render(<ThemeProvider><Badge>Online</Badge></ThemeProvider>)
       expect(screen.getByText("Online")).toBeInTheDocument()
     })

     it("renders all variants without error", () => {
       const variants = ["default", "success", "warning", "error", "info"] as const
       variants.forEach(v => {
         expect(() =>
           render(<ThemeProvider><Badge variant={v}>{v}</Badge></ThemeProvider>)
         ).not.toThrow()
       })
     })
   })
   ```

4. Create `src/components/StatusIndicator.test.tsx`:
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { StatusIndicator } from "./StatusIndicator"

   describe("StatusIndicator", () => {
     it("renders label when provided", () => {
       render(<ThemeProvider><StatusIndicator label="Active" /></ThemeProvider>)
       expect(screen.getByText("Active")).toBeInTheDocument()
     })

     it("renders all variants without error", () => {
       const variants = ["default", "success", "warning", "error", "info"] as const
       variants.forEach(v => {
         expect(() =>
           render(<ThemeProvider><StatusIndicator variant={v} /></ThemeProvider>)
         ).not.toThrow()
       })
     })
   })
   ```

5. Create `src/components/EmptyState.test.tsx`:
   ```tsx
   import { render, screen } from "@testing-library/react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { EmptyState } from "./EmptyState"
   import { LoadingState } from "./LoadingState"
   import { ErrorState } from "./ErrorState"

   describe("EmptyState", () => {
     it("renders title", () => {
       render(<ThemeProvider><EmptyState title="No results" /></ThemeProvider>)
       expect(screen.getByText("No results")).toBeInTheDocument()
     })

     it("renders optional description", () => {
       render(<ThemeProvider><EmptyState title="Empty" description="Try adding some data." /></ThemeProvider>)
       expect(screen.getByText("Try adding some data.")).toBeInTheDocument()
     })
   })

   describe("LoadingState", () => {
     it("renders label when provided", () => {
       render(<ThemeProvider><LoadingState label="Loading..." /></ThemeProvider>)
       expect(screen.getByText("Loading...")).toBeInTheDocument()
     })

     it("renders without label", () => {
       expect(() =>
         render(<ThemeProvider><LoadingState /></ThemeProvider>)
       ).not.toThrow()
     })
   })

   describe("ErrorState", () => {
     it("renders default title", () => {
       render(<ThemeProvider><ErrorState /></ThemeProvider>)
       expect(screen.getByText("Something went wrong")).toBeInTheDocument()
     })

     it("renders custom title", () => {
       render(<ThemeProvider><ErrorState title="Failed to load" /></ThemeProvider>)
       expect(screen.getByText("Failed to load")).toBeInTheDocument()
     })
   })
   ```

## Constraints
- All test renders must be wrapped in `ThemeProvider`
- No mocking of contracts or token resolution — test against real output
- Tests verify structure and rendering, not exact CSS values
- Follow Vitest syntax (`describe`, `it`, `expect`)

## Acceptance Criteria
- All test files created
- `npm run test` passes with no failures
- Test coverage includes: rendering, prop variants, semantic HTML elements

## Test Steps
1. Run `npm run test` — all tests pass

## Notes
Import paths for `DescriptionList` and `DescriptionListItem` must match the file created in task 002. Adjust import paths if the exports were placed in `List.tsx` vs a separate file.
