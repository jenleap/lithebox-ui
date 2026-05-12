# Task 006: Modal Component

## Feature
F008 — Navigation & Overlay System

## Description
Implement the `Modal` component — a focused, blocking overlay surface. It renders via React portal into `#overlay-root`, enforces the `modal` layer z-index, traps focus internally, closes on ESC, and closes on backdrop click.

## Files
- `src/components/Modal.tsx` (create)
- `src/index.ts` (modify — add export)

## Implementation Steps
1. Create `src/components/Modal.tsx`:
   - Props:
     ```ts
     export type ModalProps = {
       open: boolean
       onClose: () => void
       children?: React.ReactNode
     }
     ```
   - Import `ModalContract` from `"../contracts/ModalContract"`
   - Import `useOverlay` from `"../layers/useOverlay"`
   - Import `LAYER_Z_INDEX` from `"../layers/layerStack"`
   - Import `ReactDOM` for `createPortal`

   - Call `useOverlay({ id: "modal", layer: "modal" })` — returns `{ portalRoot, zIndex }`
   - If `!open` or `!portalRoot`, return `null`

   - Build backdrop style:
     ```ts
     const backdropStyle: React.CSSProperties = {
       position: "fixed",
       inset: 0,
       zIndex: LAYER_Z_INDEX.modal,
       background: "rgba(0,0,0,0.5)", // fallback; prefer ModalContract.backdrop.background resolved token
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
     }
     ```

   - Build surface style using `ModalContract.surface` and `ModalContract.spacing` via `resolveSlot`

   - Implement ESC key handler via `useEffect`:
     ```ts
     useEffect(() => {
       if (!open) return
       const handleKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose()
       }
       document.addEventListener("keydown", handleKey)
       return () => document.removeEventListener("keydown", handleKey)
     }, [open, onClose])
     ```

   - Implement focus trap via `useRef<HTMLDivElement>(null)` on the surface div:
     - On open, call `surfaceRef.current?.focus()` inside a `useEffect`
     - Add `tabIndex={-1}` to the surface div so it is focusable

   - Render via portal:
     ```tsx
     return ReactDOM.createPortal(
       <div style={backdropStyle} onClick={onClose}>
         <div
           ref={surfaceRef}
           tabIndex={-1}
           style={surfaceStyle}
           onClick={e => e.stopPropagation()}
         >
           {children}
         </div>
       </div>,
       portalRoot
     )
     ```

2. Update `src/index.ts` — add:
   ```ts
   export { Modal } from "./components/Modal"
   export type { ModalProps } from "./components/Modal"
   ```

## Constraints
- Portal target is `portalRoot` from `useOverlay` — never append to `document.body` directly
- z-index must come from `LAYER_Z_INDEX.modal` — no hardcoded values
- Focus trap at MVP level: auto-focus the surface container on open; do not implement full Tab-key cycling trap (future feature)
- Only one modal active at a time (MVP constraint — no stacking support needed)
- No animation — instant visibility only
- `open` prop is the single source of truth — no internal open state

## Acceptance Criteria
- Modal renders children inside a portal into `#overlay-root`
- Backdrop covers full viewport at correct z-index
- Backdrop click calls `onClose`
- ESC key calls `onClose`
- Surface click does not propagate to backdrop
- Surface receives focus on open
- When `open` is false, nothing renders
- Exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), verify: modal opens, ESC closes it, backdrop click closes it, clicking inside does not close it

## Notes
`useOverlay` will throw if called outside `OverlayManagerProvider`. Storybook stories must wrap modal usage in `OverlayManagerProvider`. This is documented in task 009.
