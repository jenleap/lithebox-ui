# Task 003: Toast System

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Implement the `Toast` component and `ToastContainer`. Toast renders a single notification entry. ToastContainer subscribes to the notification manager, renders all active toasts, and positions them in the correct overlay layer.

## Files
- `src/components/Toast.tsx` (create)
- `src/components/ToastContainer.tsx` (create)

## Implementation Steps

1. Create `src/components/Toast.tsx`:
   ```tsx
   import React from "react"
   import { useTheme } from "../theme/ThemeProvider"
   import { resolveSlot } from "../contracts/resolveContract"
   import { ToastContract } from "../contracts/ToastContract"
   import type { ToastEntry } from "../feedback/types"
   import { notificationManager } from "../feedback/notificationManager"

   type ToastProps = {
     toast: ToastEntry
   }

   export function Toast({ toast }: ToastProps) {
     const { tokens } = useTheme()
     const contract = ToastContract[toast.variant]

     const background = resolveSlot(contract.background, tokens)
     const color = resolveSlot(contract.text, tokens)
     const padding = resolveSlot(ToastContract.spacing.padding, tokens)
     const borderRadius = resolveSlot(ToastContract.radius.default, tokens)

     const isExiting = toast.lifecycleState === "exiting"

     return (
       <div
         role="status"
         aria-live="polite"
         style={{
           background,
           color,
           padding,
           borderRadius,
           minWidth: "280px",
           maxWidth: "400px",
           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
           opacity: isExiting ? 0 : 1,
           transform: isExiting ? "translateY(-8px)" : "translateY(0)",
           transition: "opacity 300ms ease, transform 300ms ease",
           display: "flex",
           alignItems: "flex-start",
           justifyContent: "space-between",
           gap: "8px",
         }}
       >
         <div>
           {toast.title && (
             <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: toast.description ? "4px" : 0 }}>
               {toast.title}
             </div>
           )}
           {toast.description && (
             <div style={{ fontSize: "14px", opacity: 0.9 }}>{toast.description}</div>
           )}
         </div>
         {toast.dismissible && (
           <button
             onClick={() => notificationManager.dismissToast(toast.id)}
             aria-label="Dismiss notification"
             style={{
               background: "none",
               border: "none",
               color: "inherit",
               cursor: "pointer",
               padding: "2px",
               fontSize: "16px",
               lineHeight: 1,
               opacity: 0.8,
               flexShrink: 0,
             }}
           >
             ×
           </button>
         )}
       </div>
     )
   }
   ```

2. Create `src/components/ToastContainer.tsx`:
   ```tsx
   import React, { useEffect, useState } from "react"
   import { LAYER_Z_INDEX } from "../layers/layerStack"
   import { notificationManager } from "../feedback/notificationManager"
   import type { NotificationState } from "../feedback/types"
   import { Toast } from "./Toast"

   export function ToastContainer() {
     const [state, setState] = useState<NotificationState>(() => notificationManager.getState())

     useEffect(() => {
       return notificationManager.subscribe(setState)
     }, [])

     const activeToasts = state.toasts.filter((t) => t.lifecycleState !== "removed")

     if (activeToasts.length === 0) return null

     return (
       <div
         aria-label="Notifications"
         style={{
           position: "fixed",
           bottom: "24px",
           right: "24px",
           zIndex: LAYER_Z_INDEX.toast,
           display: "flex",
           flexDirection: "column",
           gap: "8px",
           pointerEvents: "none",
         }}
       >
         {activeToasts.map((toast) => (
           <div key={toast.id} style={{ pointerEvents: "auto" }}>
             <Toast toast={toast} />
           </div>
         ))}
       </div>
     )
   }
   ```

3. Update `src/layers/layerStack.ts` — add `toast` layer level between `dropdown` and `drawer`:

   In `src/layers/types.ts`, update `LayerLevel`:
   ```ts
   export type LayerLevel = "base" | "dropdown" | "toast" | "drawer" | "modal" | "critical"
   ```

   In `src/layers/layerStack.ts`, add:
   ```ts
   toast: 150,
   ```
   between `dropdown: 100` and `drawer: 200`.

## Constraints
- `ToastContainer` is the only consumer of the notification manager's toast state
- No animation library — CSS transitions only via inline styles
- `Toast` component does not manage its own lifecycle — it only reads `lifecycleState` from the manager
- `LAYER_Z_INDEX.toast` must be used — never hardcode z-index values
- `pointerEvents: "none"` on the container prevents blocking page interaction; individual toast items restore `pointer-events: "auto"`

## Acceptance Criteria
- `Toast` renders title, description, and dismiss button correctly for all four variants
- `ToastContainer` subscribes to `notificationManager` and re-renders on state changes
- Dismissed toasts fade out before being removed from the DOM
- `ToastContainer` returns `null` when no active toasts exist
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), trigger a toast and verify it appears, auto-dismisses, and animates out

## Notes
The `LayerLevel` type update in `types.ts` is required before `LAYER_Z_INDEX.toast` is valid. Do both in the same task.
