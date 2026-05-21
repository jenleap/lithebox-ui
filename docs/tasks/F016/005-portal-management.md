# Task 005: Portal Management

## Feature
F016 - Application Runtime Integration Layer

## Description
Implement two related utilities:
1. `useIsomorphicLayoutEffect` — SSR-safe layout effect hook
2. Portal root management in `OverlayManagerProvider` — extend it to accept a configurable `portalRootId`

The `OverlayManagerProvider` currently hardcodes `"overlay-root"` as its portal root ID. F016 requires the runtime layer to control this ID via `LitheboxRuntimeConfig.overlays.portalRootId`.

## Files
- `src/runtime/useIsomorphicLayoutEffect.ts` (create)
- `src/layers/OverlayManager.tsx` (modify)

## Implementation Steps

### useIsomorphicLayoutEffect

1. Create `src/runtime/useIsomorphicLayoutEffect.ts`.

2. Implement as follows — uses `useLayoutEffect` in the browser and falls back to `useEffect` on the server:

   ```ts
   import { useEffect, useLayoutEffect } from "react"

   export const useIsomorphicLayoutEffect =
     typeof window !== "undefined" ? useLayoutEffect : useEffect
   ```

### OverlayManagerProvider — portalRootId support

3. Open `src/layers/OverlayManager.tsx`.

4. Update `OverlayManagerProviderProps` to accept an optional `portalRootId`:

   ```ts
   type OverlayManagerProviderProps = {
     children?: React.ReactNode
     portalRootId?: string
   }
   ```

5. Update `OverlayManagerProvider` to accept and use the `portalRootId` prop. Replace the hardcoded `"overlay-root"` with the prop, defaulting to `"overlay-root"` when not provided:

   ```ts
   export function OverlayManagerProvider({ children, portalRootId = "overlay-root" }: OverlayManagerProviderProps) {
     // ... existing code ...
     useEffect(() => {
       const div = document.createElement("div")
       div.id = portalRootId
       document.body.appendChild(div)
       portalRootRef.current = div
       setPortalRoot(div)
       return () => {
         document.body.removeChild(div)
         portalRootRef.current = null
         setPortalRoot(null)
       }
     }, [portalRootId])
     // ... rest unchanged ...
   }
   ```

6. Do not change the return JSX or any other logic in `OverlayManagerProvider`.

## Constraints
- `useIsomorphicLayoutEffect` must not import React — only named hooks from `"react"`
- The `portalRootId` change in `OverlayManagerProvider` must be backward-compatible — existing callers without the prop must continue to work
- Add `portalRootId` to the `useEffect` dependency array to handle prop changes

## Acceptance Criteria
- `src/runtime/useIsomorphicLayoutEffect.ts` exports `useIsomorphicLayoutEffect`
- `OverlayManagerProvider` accepts an optional `portalRootId` prop and uses it as the DOM element ID
- Default behavior (no `portalRootId` prop) is unchanged — still creates `div#overlay-root`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `OverlayManagerProvider` without props — confirm `div#overlay-root` is created
3. Render `OverlayManagerProvider` with `portalRootId="custom-root"` — confirm `div#custom-root` is created
