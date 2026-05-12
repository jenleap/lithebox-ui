# Task 007: Drawer Component

## Feature
F008 — Navigation & Overlay System

## Description
Implement the `Drawer` component — an edge-mounted overlay panel. It follows the same lifecycle and portal strategy as `Modal`, using the `drawer` layer level. It renders as a fixed side panel with a backdrop.

## Files
- `src/components/Drawer.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Drawer.tsx`:
   - Props:
     ```ts
     export type DrawerProps = {
       open: boolean
       onClose: () => void
       side?: "left" | "right"
       children?: React.ReactNode
     }
     ```
   - Import `DrawerContract` from `"../contracts/DrawerContract"`
   - Import `useOverlay` from `"../layers/useOverlay"`
   - Import `LAYER_Z_INDEX` from `"../layers/layerStack"`
   - Import `ReactDOM` for `createPortal`

   - Call `useOverlay({ id: "drawer", layer: "drawer" })` — returns `{ portalRoot, zIndex }`
   - If `!open` or `!portalRoot`, return `null`

   - Build backdrop style:
     ```ts
     const backdropStyle: React.CSSProperties = {
       position: "fixed",
       inset: 0,
       zIndex: LAYER_Z_INDEX.drawer,
       background: "rgba(0,0,0,0.4)",
     }
     ```

   - Build panel style using `DrawerContract.surface` and `DrawerContract.spacing`:
     ```ts
     const panelStyle: React.CSSProperties = {
       position: "fixed",
       top: 0,
       bottom: 0,
       [side === "right" ? "right" : "left"]: 0,
       width: 320, // fallback for spacing.drawer token
       zIndex: LAYER_Z_INDEX.drawer + 1,
       background: /* resolved DrawerContract.surface.background */,
       boxShadow: /* resolved DrawerContract.surface.shadow */,
       padding: /* resolved DrawerContract.spacing.padding */,
       overflowY: "auto",
     }
     ```

   - Implement ESC handler via `useEffect` (same pattern as Modal)
   - Implement focus via `useRef<HTMLDivElement>(null)` on panel with `tabIndex={-1}`, auto-focus on open

   - Render via portal:
     ```tsx
     return ReactDOM.createPortal(
       <>
         <div style={backdropStyle} onClick={onClose} />
         <div
           ref={panelRef}
           tabIndex={-1}
           style={panelStyle}
         >
           {children}
         </div>
       </>,
       portalRoot
     )
     ```

2. Update `src/index.ts` — add:
   ```ts
   export { Drawer } from "./components/Drawer"
   export type { DrawerProps } from "./components/Drawer"
   ```

## Constraints
- `side` defaults to `"left"` if not provided
- z-index must come from `LAYER_Z_INDEX.drawer` — no hardcoded values
- Panel z-index is `LAYER_Z_INDEX.drawer + 1` so it sits above its own backdrop but below the modal layer
- No animation — instant visibility only
- Same focus ownership pattern as Modal (auto-focus container on open)
- Portal target from `useOverlay`, never `document.body` directly

## Acceptance Criteria
- Drawer renders as a fixed side panel via portal into `#overlay-root`
- Backdrop covers full viewport at `LAYER_Z_INDEX.drawer`
- Backdrop click calls `onClose`
- ESC key calls `onClose`
- `side` prop controls left or right positioning
- Panel receives focus on open
- When `open` is false, nothing renders
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), verify: drawer opens on left and right, ESC closes it, backdrop click closes it

## Notes
The panel z-index being `LAYER_Z_INDEX.drawer + 1` is an intentional exception to avoid introducing a new `LayerLevel` entry just for the drawer-above-its-own-backdrop case. Document this clearly with a comment in the component.
