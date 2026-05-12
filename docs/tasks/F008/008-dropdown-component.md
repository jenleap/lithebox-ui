# Task 008: Dropdown Component (Basic)

## Feature
F008 — Navigation & Overlay System

## Description
Implement the basic `Dropdown` component — a contextual anchored overlay surface. It anchors to a trigger element, renders below it at the `dropdown` layer level, and dismisses on outside click or ESC. No virtualization or smart repositioning at MVP.

## Files
- `src/components/Dropdown.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Dropdown.tsx`:
   - Props:
     ```ts
     export type DropdownProps = {
       open: boolean
       onClose: () => void
       anchorRef: React.RefObject<HTMLElement>
       children?: React.ReactNode
     }
     ```
   - Import `DropdownContract` from `"../contracts/DropdownContract"`
   - Import `useOverlay` from `"../layers/useOverlay"`
   - Import `LAYER_Z_INDEX` from `"../layers/layerStack"`
   - Import `ReactDOM` for `createPortal`

   - Call `useOverlay({ id: "dropdown", layer: "dropdown" })` — returns `{ portalRoot, zIndex }`
   - If `!open` or `!portalRoot`, return `null`

   - Compute anchor position via `useLayoutEffect`:
     ```ts
     const [position, setPosition] = React.useState({ top: 0, left: 0 })
     React.useLayoutEffect(() => {
       if (!open || !anchorRef.current) return
       const rect = anchorRef.current.getBoundingClientRect()
       setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
     }, [open, anchorRef])
     ```

   - Build surface style using `DropdownContract.surface` and `DropdownContract.spacing`:
     ```ts
     const surfaceStyle: React.CSSProperties = {
       position: "absolute",
       top: position.top,
       left: position.left,
       zIndex: LAYER_Z_INDEX.dropdown,
       background: /* resolved DropdownContract.surface.background */,
       border: `1px solid /* resolved DropdownContract.surface.border */`,
       borderRadius: /* resolved DropdownContract.surface.radius */,
       boxShadow: /* resolved DropdownContract.surface.shadow */,
       padding: /* resolved DropdownContract.spacing.padding */,
       minWidth: 160,
     }
     ```

   - Implement outside click handler via `useEffect`:
     ```ts
     useEffect(() => {
       if (!open) return
       const handleClick = (e: MouseEvent) => {
         if (
           surfaceRef.current && !surfaceRef.current.contains(e.target as Node) &&
           anchorRef.current && !anchorRef.current.contains(e.target as Node)
         ) {
           onClose()
         }
       }
       document.addEventListener("mousedown", handleClick)
       return () => document.removeEventListener("mousedown", handleClick)
     }, [open, onClose, anchorRef])
     ```

   - Implement ESC handler via `useEffect` (same pattern as Modal/Drawer)
   - Use `useRef<HTMLDivElement>(null)` on the surface div

   - Render via portal:
     ```tsx
     return ReactDOM.createPortal(
       <div ref={surfaceRef} style={surfaceStyle}>
         {children}
       </div>,
       portalRoot
     )
     ```

2. Update `src/index.ts` — add:
   ```ts
   export { Dropdown } from "./components/Dropdown"
   export type { DropdownProps } from "./components/Dropdown"
   ```

## Constraints
- No backdrop — dropdown uses outside-click dismissal only
- No smart repositioning (no viewport edge detection at MVP)
- No nested dropdown support
- No virtualization
- z-index from `LAYER_Z_INDEX.dropdown` only
- `open` is the single source of truth — no internal open state
- Position computed from `anchorRef.current.getBoundingClientRect()` on each open

## Acceptance Criteria
- Dropdown renders below the anchor element via portal
- Outside click (not on anchor, not on surface) calls `onClose`
- ESC key calls `onClose`
- When `open` is false, nothing renders
- Position updates correctly on open
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), verify: dropdown opens below anchor, outside click closes it, ESC closes it, clicking inside does not close it

## Notes
`useLayoutEffect` is used for positioning (not `useEffect`) to avoid a layout flash where the dropdown renders at `0,0` before repositioning. This is intentional.
