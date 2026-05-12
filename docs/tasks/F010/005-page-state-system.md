# Task 005: Page State System

## Feature
F010 — Page Composition System

## Description
Implement page-level state rendering in the `Page` component. When `state` is `"loading"`, `"error"`, or `"empty"`, the page overrides normal content rendering and displays the appropriate full-page state using existing `LoadingState`, `ErrorState`, and `EmptyState` components. When `state` is `"ready"` (default), normal rendering proceeds.

## Files
- `src/components/Page.tsx` (modify)

## Implementation Steps

1. Modify `src/components/Page.tsx`:
   - Import `LoadingState`, `EmptyState`, and `ErrorState` from their respective files
   - Add a helper function `renderPageState` that returns the correct state component when state is not `"ready"`:
     ```tsx
     function renderPageState(state: PageState): React.ReactNode | null {
       switch (state) {
         case "loading":
           return <LoadingState label="Loading..." />
         case "error":
           return <ErrorState />
         case "empty":
           return <EmptyState title="Nothing here" description="This page has no content yet." />
         default:
           return null
       }
     }
     ```
   - In the `Page` component body, before returning JSX, check for non-ready states:
     ```tsx
     const stateOverride = state !== "ready" ? renderPageState(state) : null
     ```
   - In the JSX, replace the body content when `stateOverride` is present:
     ```tsx
     <div style={bodyStyle}>
       {stateOverride ? (
         <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
           {stateOverride}
         </div>
       ) : (
         <>
           {sidebar}
           {hasContentWrap ? <div style={contentWrapStyle}>{children}</div> : children}
         </>
       )}
     </div>
     ```
   - The header and footer always render regardless of state

## Constraints
- Use the existing `LoadingState`, `EmptyState`, and `ErrorState` components — do not create new ones
- Header and footer must always render, even during loading/error/empty states
- The state override content is centered within the body region
- Default messages for `error` and `empty` states use the component defaults — no custom copy required for MVP
- `state="ready"` must produce identical output to having no `state` prop

## Acceptance Criteria
- `state="loading"` renders `LoadingState` centered in the content body; header and footer still render
- `state="error"` renders `ErrorState` centered in the content body; header and footer still render
- `state="empty"` renders `EmptyState` centered in the content body; header and footer still render
- `state="ready"` (default) renders children normally
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (added in task 009), toggle `state` prop and verify state components appear/disappear correctly

## Notes
The page state system intentionally overrides only the body region. The header region (e.g., page title, primary actions) remains visible during loading and error states so users retain orientation.
