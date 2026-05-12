# Task 004: useToast Hook & NotificationManagerProvider

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Implement the `useToast` imperative API hook and the `NotificationManagerProvider` context provider. The hook gives components a clean, typed interface for triggering toasts. The provider wires `ToastContainer` (and later `BannerContainer`) into the app tree so it renders in the correct layer.

## Files
- `src/feedback/useToast.ts` (create)
- `src/feedback/NotificationManagerProvider.tsx` (create)
- `src/feedback/index.ts` (modify — add new exports)

## Implementation Steps

1. Create `src/feedback/useToast.ts`:
   ```ts
   import { notificationManager } from "./notificationManager"

   export function useToast() {
     return {
       success(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
         return notificationManager.addToast({ variant: "success", title, ...options })
       },
       error(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
         return notificationManager.addToast({ variant: "error", title, ...options })
       },
       info(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
         return notificationManager.addToast({ variant: "info", title, ...options })
       },
       warning(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
         return notificationManager.addToast({ variant: "warning", title, ...options })
       },
       dismiss(id: string) {
         notificationManager.dismissToast(id)
       },
     }
   }
   ```

2. Create `src/feedback/NotificationManagerProvider.tsx`:
   ```tsx
   import React from "react"
   import { ToastContainer } from "../components/ToastContainer"
   import { BannerContainer } from "../components/BannerContainer"

   type NotificationManagerProviderProps = {
     children: React.ReactNode
   }

   export function NotificationManagerProvider({ children }: NotificationManagerProviderProps) {
     return (
       <>
         {children}
         <BannerContainer />
         <ToastContainer />
       </>
     )
   }
   ```

   Note: `BannerContainer` is implemented in task 005. This file will compile after task 005 completes.

3. Update `src/feedback/index.ts` — append:
   ```ts
   export { useToast } from "./useToast"
   export { NotificationManagerProvider } from "./NotificationManagerProvider"
   ```

## Constraints
- `useToast` does not use `useState` or `useEffect` — it is a pure imperative dispatcher
- The hook is stable across re-renders (no object recreation needed; the manager is a singleton)
- `NotificationManagerProvider` must render both containers so apps only need one provider
- Do not use React Context for the notification state — the manager singleton handles subscriptions directly

## Acceptance Criteria
- `useToast().success("message")` adds a toast via notification manager
- `useToast().error("message")` adds an error toast
- `useToast().dismiss(id)` calls `notificationManager.dismissToast`
- `NotificationManagerProvider` renders children + both containers
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), call `useToast().success(...)` via a button click and verify toast appears

## Notes
The import of `BannerContainer` in `NotificationManagerProvider.tsx` will cause a TypeScript error until task 005 creates that file. Execute this task after task 003 and before task 005 only if `BannerContainer` import is temporarily commented out — otherwise execute tasks 003, 004, 005 before running a build check.
