# Task 005: Shell Integration

## Feature
F025 — Token Editor Playground

## Description
Add a "Tokens" toggle button to the TopBar in PlaygroundShell. Render TokenEditorPanel from inside the shell. The button shows a palette icon (◧) and the label "Tokens".

## Files
- `apps/playground/src/shell/PlaygroundShell.tsx` (modify)
- `apps/playground/src/App.tsx` (modify — render TokenEditorPanel at app root)

## Implementation Steps

1. In `PlaygroundShell.tsx`:
   - Import `useTokenEditor` from `../token-editor/TokenEditorContext`
   - Read `isOpen, setIsOpen` from `useTokenEditor()`
   - In the TopBar children, add a spacer (`<div style={{ flex: 1 }} />`) between the title and the button to push the button to the right
   - Add the toggle button after the spacer:
     ```tsx
     <button
       onClick={() => setIsOpen(!isOpen)}
       aria-pressed={isOpen}
       aria-label="Toggle token editor"
       style={{
         background: isOpen ? 'var(--color-primary)' : 'var(--color-surface)',
         color: isOpen ? 'var(--color-background)' : 'var(--color-text)',
         border: '1px solid var(--color-border)',
         borderRadius: 'var(--radius-sm)',
         padding: 'var(--spacing-xs) var(--spacing-sm)',
         cursor: 'pointer',
         fontFamily: 'var(--font-family-base)',
         fontSize: 'var(--font-size-sm)',
         display: 'flex',
         alignItems: 'center',
         gap: 'var(--spacing-xs)',
       }}
     >
       ◧ Tokens
     </button>
     ```

2. In `App.tsx`:
   - Import `TokenEditorPanel` from `./token-editor/TokenEditorPanel`
   - Render `<TokenEditorPanel />` inside `AppContent`, alongside the `LitheboxProvider` tree (not inside it — panel uses its own fixed positioning and needs to read from `TokenEditorContext` which is above `LitheboxProvider`)
   - Structure:
     ```tsx
     function AppContent() {
       const { tokens } = useTokenEditor()
       return (
         <>
           <LitheboxProvider tokens={tokens}>
             <BrowserRouter>
               <AppRoutes />
             </BrowserRouter>
           </LitheboxProvider>
           <TokenEditorPanel />
         </>
       )
     }
     ```
   - `TokenEditorPanel` renders a fixed panel — it is outside `LitheboxProvider` but still reads `TokenEditorContext`. Its CSS variable styles come from the injected CSS variables (which `LitheboxProvider` injects into `:root` via `injectTokens`), so this is fine.

## Constraints
- Button must be visible on both mobile and desktop
- Panel `zIndex: 500` is already set in task 002 — do not lower it
- The hamburger button (mobile) stays on the left, Tokens button on the right

## Acceptance Criteria
- Clicking "◧ Tokens" opens the panel
- Clicking again closes it
- Button shows active state (primary background) when panel is open
- Panel is visible over all page content including modals/drawers

## Test Steps
1. Open playground in browser
2. Click "◧ Tokens" button in top bar — panel slides into view on the right
3. Click again — panel closes
4. Open a modal, then open the token editor — panel appears above the modal
