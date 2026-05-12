# Task 002: Notification Manager

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Create the core notification manager — a global registry and queue system that controls the entire feedback lifecycle. All toast and banner state flows through this module. No component is allowed to render notifications directly without going through the manager.

## Files
- `src/feedback/types.ts` (create)
- `src/feedback/notificationManager.ts` (create)
- `src/feedback/index.ts` (create)

## Implementation Steps

1. Create `src/feedback/types.ts`:
   ```ts
   export type FeedbackVariant = "success" | "error" | "info" | "warning"

   export type ToastLifecycleState = "entering" | "visible" | "exiting" | "removed"

   export type BannerLifecycleState = "visible" | "dismissed"

   export type ToastEntry = {
     id: string
     title?: string
     description?: string
     variant: FeedbackVariant
     duration: number
     dismissible: boolean
     lifecycleState: ToastLifecycleState
   }

   export type BannerEntry = {
     id: string
     title: string
     description?: string
     variant: FeedbackVariant
     dismissible: boolean
     lifecycleState: BannerLifecycleState
   }

   export type NotificationState = {
     toasts: ToastEntry[]
     banners: BannerEntry[]
   }

   export type NotificationListener = (state: NotificationState) => void
   ```

2. Create `src/feedback/notificationManager.ts`:
   ```ts
   import type { ToastEntry, BannerEntry, NotificationState, NotificationListener, FeedbackVariant } from "./types"

   const DEFAULT_TOAST_DURATION = 4000

   let state: NotificationState = { toasts: [], banners: [] }
   const listeners = new Set<NotificationListener>()

   function notify() {
     listeners.forEach((l) => l({ ...state, toasts: [...state.toasts], banners: [...state.banners] }))
   }

   function generateId() {
     return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
   }

   export const notificationManager = {
     subscribe(listener: NotificationListener): () => void {
       listeners.add(listener)
       listener({ ...state })
       return () => listeners.delete(listener)
     },

     addToast(options: {
       title?: string
       description?: string
       variant: FeedbackVariant
       duration?: number
       dismissible?: boolean
     }): string {
       const id = generateId()
       const entry: ToastEntry = {
         id,
         title: options.title,
         description: options.description,
         variant: options.variant,
         duration: options.duration ?? DEFAULT_TOAST_DURATION,
         dismissible: options.dismissible ?? true,
         lifecycleState: "entering",
       }
       state = { ...state, toasts: [...state.toasts, entry] }
       notify()

       // entering → visible
       setTimeout(() => {
         state = {
           ...state,
           toasts: state.toasts.map((t) =>
             t.id === id ? { ...t, lifecycleState: "visible" } : t
           ),
         }
         notify()
       }, 50)

       // visible → exiting after duration
       setTimeout(() => {
         notificationManager.dismissToast(id)
       }, entry.duration + 50)

       return id
     },

     dismissToast(id: string): void {
       state = {
         ...state,
         toasts: state.toasts.map((t) =>
           t.id === id && t.lifecycleState !== "removed"
             ? { ...t, lifecycleState: "exiting" }
             : t
         ),
       }
       notify()

       // exiting → removed after exit animation window
       setTimeout(() => {
         state = { ...state, toasts: state.toasts.filter((t) => t.id !== id) }
         notify()
       }, 300)
     },

     addBanner(options: {
       title: string
       description?: string
       variant: FeedbackVariant
       dismissible?: boolean
     }): string {
       const id = generateId()
       const entry: BannerEntry = {
         id,
         title: options.title,
         description: options.description,
         variant: options.variant,
         dismissible: options.dismissible ?? true,
         lifecycleState: "visible",
       }
       state = { ...state, banners: [...state.banners, entry] }
       notify()
       return id
     },

     dismissBanner(id: string): void {
       state = {
         ...state,
         banners: state.banners.map((b) =>
           b.id === id ? { ...b, lifecycleState: "dismissed" } : b
         ),
       }
       notify()

       setTimeout(() => {
         state = { ...state, banners: state.banners.filter((b) => b.id !== id) }
         notify()
       }, 300)
     },

     getState(): NotificationState {
       return { ...state, toasts: [...state.toasts], banners: [...state.banners] }
     },
   }
   ```

3. Create `src/feedback/index.ts`:
   ```ts
   export type { FeedbackVariant, ToastEntry, BannerEntry, NotificationState, ToastLifecycleState, BannerLifecycleState } from "./types"
   export { notificationManager } from "./notificationManager"
   ```

## Constraints
- The manager is a module-level singleton — no class instantiation
- No React imports in this module — pure TypeScript
- Notifications are immutable once created; only `lifecycleState` changes
- Queue is FIFO — toasts append to the end, displayed in order
- `dismissToast` is safe to call multiple times; guard against double-dismiss via `lifecycleState` check
- No duplicate-prevention logic required at MVP

## Acceptance Criteria
- `notificationManager.addToast(...)` adds a toast and notifies listeners
- `notificationManager.dismissToast(id)` moves toast through `exiting → removed`
- `notificationManager.addBanner(...)` adds a banner in `visible` state
- `notificationManager.dismissBanner(id)` moves banner to `dismissed` then removes it
- `subscribe` returns an unsubscribe function
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Unit tests in task 008 will cover manager behavior

## Notes
The 50ms entering delay simulates an animation frame for CSS transitions. The 300ms removal window after `exiting` matches a standard CSS exit transition duration.
