# Task 001: Token Editor Context

## Feature
F025 — Token Editor Playground

## Description
Create a React context that holds the custom token overrides and panel open state. Wire it into App.tsx so the tokens flow into LitheboxProvider.

## Files
- `apps/playground/src/token-editor/TokenEditorContext.tsx` (create)
- `apps/playground/src/App.tsx` (modify)

## Implementation Steps

1. Create `apps/playground/src/token-editor/TokenEditorContext.tsx`:
   - Import `Partial<Tokens>` from `lithebox-ui`
   - Define `TokenEditorContextValue`:
     ```ts
     type TokenEditorContextValue = {
       tokens: Partial<Tokens>
       setTokens: (tokens: Partial<Tokens>) => void
       isOpen: boolean
       setIsOpen: (open: boolean) => void
     }
     ```
   - Create context with `createContext<TokenEditorContextValue | null>(null)`
   - Create `TokenEditorProvider` that holds `useState<Partial<Tokens>>({})` and `useState(false)` for isOpen
   - Export `useTokenEditor()` hook that reads the context (throw if null)

2. In `App.tsx`:
   - Wrap the tree with `<TokenEditorProvider>` outside `LitheboxProvider`
   - Consume `useTokenEditor()` inside a child component to get `tokens`
   - Pass `tokens` to `<LitheboxProvider tokens={tokens}>`
   - Since `useTokenEditor` must be inside the provider, create an inner `AppContent` component that reads from context and renders `<LitheboxProvider tokens={tokens}><BrowserRouter><AppRoutes /></BrowserRouter></LitheboxProvider>`

## Constraints
- No external dependencies
- `Tokens` type imported from `lithebox-ui`
- Keep the context file small — no UI

## Acceptance Criteria
- `TokenEditorProvider` wraps the app
- `LitheboxProvider` receives the `tokens` from context
- `useTokenEditor()` is exported and usable from any playground component

## Test Steps
1. Dev server starts with no errors
2. `useTokenEditor().setTokens({ color: { primary: '#FF0000' } })` in browser console (via window or component) makes primary color change to red
