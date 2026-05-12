# Task 009: Storybook Stories — Navigation & Overlay

## Feature
F008 — Navigation & Overlay System

## Description
Create Storybook stories for all F008 components: the application structure components and all three overlay components. All overlay stories must wrap usage in `OverlayManagerProvider`.

## Files
- `src/stories/navigation/AppShell.stories.tsx` (create)
- `src/stories/overlays/Modal.stories.tsx` (create)
- `src/stories/overlays/Drawer.stories.tsx` (create)
- `src/stories/overlays/Dropdown.stories.tsx` (create)

## Implementation Steps
1. Create `src/stories/navigation/AppShell.stories.tsx`:
   - Title: `"Navigation/AppShell"`
   - Stories:
     - `Default` — AppShell with Sidebar (nav links as Text), TopBar (title text), ContentArea (placeholder content)
     - `WithoutSidebar` — AppShell with TopBar and ContentArea only
     - `WithoutHeader` — AppShell with Sidebar and ContentArea only

2. Create `src/stories/overlays/Modal.stories.tsx`:
   - Title: `"Overlays/Modal"`
   - Wrap all stories in `OverlayManagerProvider`
   - Use `useState` to control `open`
   - Stories:
     - `Default` — button that opens modal with text content and a close button inside
     - `WithLongContent` — modal with scrollable inner content
   - Each story renders a trigger button outside the modal surface that sets `open = true`

3. Create `src/stories/overlays/Drawer.stories.tsx`:
   - Title: `"Overlays/Drawer"`
   - Wrap all stories in `OverlayManagerProvider`
   - Use `useState` to control `open`
   - Stories:
     - `LeftDrawer` — opens from left side, contains nav items as Text components
     - `RightDrawer` — opens from right side with `side="right"`, contains text content

4. Create `src/stories/overlays/Dropdown.stories.tsx`:
   - Title: `"Overlays/Dropdown"`
   - Wrap all stories in `OverlayManagerProvider`
   - Use `useRef<HTMLButtonElement>(null)` for the anchor
   - Use `useState` to control `open`
   - Stories:
     - `Default` — button anchor that opens dropdown with a few Text items as options
     - `RightAligned` — same but anchor is positioned to the right to show basic left-edge positioning

## Constraints
- All overlay stories must wrap usage in `<OverlayManagerProvider>` from `"../../layers"`
- Use `useState` with a render function pattern (not Storybook args) for open/close control
- No className or inline style overrides outside of story layout containers
- Story layout containers (centering wrappers) may use inline styles with literal values only
- Import components from `"../../components/..."` directly, not from `"../../index"`
- Do not add `decorators` to storybook meta — use explicit wrapper divs in each story render

## Acceptance Criteria
- All four story files render without errors in Storybook
- AppShell stories display correct layout structure (sidebar, topbar, content)
- Modal opens and closes via button and ESC and backdrop click in stories
- Drawer opens from left and right and closes correctly
- Dropdown opens below its anchor button and closes on outside click and ESC
- No TypeScript errors
- No console errors in browser during stories

## Test Steps
1. Run `npm run build` — no type errors
2. Run Storybook and manually open each story:
   - AppShell: verify sidebar/topbar/content render in correct positions
   - Modal: open modal, close via ESC, close via backdrop, close via inner button
   - Drawer: open left drawer, open right drawer, close each via ESC and backdrop
   - Dropdown: open dropdown below button, close via outside click, close via ESC

## Notes
Storybook stories that use `useState` must be written as render functions, not as plain objects, since Storybook's CSF3 format requires a render function for stateful stories:
```tsx
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <OverlayManagerProvider>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Text>Modal content</Text>
        </Modal>
      </OverlayManagerProvider>
    )
  }
}
```
