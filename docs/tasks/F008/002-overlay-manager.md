# Task 002: Overlay Manager & Portal

## Feature
F008 — Navigation & Overlay System

## Description
Implement the internal overlay registry and portal infrastructure. The `OverlayManager` is a React context provider that tracks active overlays, enforces layer ordering, and owns the portal root element that overlays render into.

## Files
- `src/layers/OverlayManager.tsx` (create)
- `src/layers/useOverlay.ts` (create)
- `src/layers/index.ts` (modify — add new exports)

## Implementation Steps
1. Create `src/layers/OverlayManager.tsx`:
   - Define internal context type:
     ```ts
     type OverlayContextValue = {
       registerOverlay: (entry: OverlayEntry) => void
       unregisterOverlay: (id: string) => void
       portalRoot: HTMLElement | null
     }
     ```
   - Create `OverlayContext` with `React.createContext<OverlayContextValue | null>(null)`
   - Implement `OverlayManagerProvider` component:
     - Use `useRef<HTMLDivElement>(null)` for a `<div id="overlay-root" />` portal container
     - Mount the portal root div into `document.body` via `useEffect` on first render; remove it on unmount
     - Use `useState<OverlayEntry[]>([])` to track active overlays
     - Implement `registerOverlay` and `unregisterOverlay` — add/remove entries from state
     - Provide context value including the `portalRoot` ref
   - Export `OverlayManagerProvider`
   - Export `useOverlayContext` — a hook that reads the context and throws if used outside the provider

2. Create `src/layers/useOverlay.ts`:
   - Accept `{ id: string; layer: LayerLevel }` config
   - Call `useOverlayContext()` internally
   - Register on mount, unregister on unmount via `useEffect`
   - Return `{ portalRoot, zIndex }` where `zIndex = LAYER_Z_INDEX[layer]`

3. Update `src/layers/index.ts`:
   ```ts
   export { OverlayManagerProvider, useOverlayContext } from "./OverlayManager"
   export { useOverlay } from "./useOverlay"
   ```

## Constraints
- Portal root is managed entirely by `OverlayManagerProvider` — never create `document.body` appends outside this file
- `useOverlay` is the only public hook overlay components call — they must not call `useOverlayContext` directly
- No routing, animation, or focus logic in this task — those belong in individual overlay components
- Do not import from `src/components` — this layer has no dependency on components

## Acceptance Criteria
- `OverlayManagerProvider` mounts a `#overlay-root` div into `document.body` when rendered
- `#overlay-root` div is removed when `OverlayManagerProvider` unmounts
- `registerOverlay` / `unregisterOverlay` correctly maintain active overlay list
- `useOverlay` returns correct `zIndex` value for the given `LayerLevel`
- `useOverlayContext` throws a descriptive error when used outside provider
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Manually verify in Storybook (task 009): `#overlay-root` div exists in DOM when `OverlayManagerProvider` is in the tree

## Notes
Overlays render via `ReactDOM.createPortal(children, portalRoot)` — this pattern keeps them in the DOM overlay root while still participating in the React tree. `portalRoot` may be `null` during SSR; overlay components must guard against this.
