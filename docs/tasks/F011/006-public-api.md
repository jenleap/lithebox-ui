# Task 006: Public API

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Export all F011 public surface from `src/index.ts`. This makes Toast, Banner, ToastContainer, BannerContainer, NotificationManagerProvider, useToast, and all related types available to library consumers.

## Files
- `src/index.ts` (modify — append new exports)

## Implementation Steps

1. Append to `src/index.ts`:
   ```ts
   export { Toast } from "./components/Toast"
   export type { } from "./components/Toast"

   export { ToastContainer } from "./components/ToastContainer"

   export { Banner } from "./components/Banner"

   export { BannerContainer } from "./components/BannerContainer"

   export { NotificationManagerProvider } from "./feedback/NotificationManagerProvider"
   export { useToast } from "./feedback/useToast"
   export { notificationManager } from "./feedback/notificationManager"

   export type {
     FeedbackVariant,
     ToastEntry,
     BannerEntry,
     NotificationState,
     ToastLifecycleState,
     BannerLifecycleState,
   } from "./feedback/types"
   ```

   Note: `Toast` has no additional public prop types beyond `ToastEntry` (it takes a managed entry). Clean up the empty type export line — remove it if there are no types to export from the component.

   The actual append should be:
   ```ts
   export { Toast } from "./components/Toast"
   export { ToastContainer } from "./components/ToastContainer"
   export { Banner } from "./components/Banner"
   export { BannerContainer } from "./components/BannerContainer"
   export { NotificationManagerProvider } from "./feedback/NotificationManagerProvider"
   export { useToast } from "./feedback/useToast"
   export { notificationManager } from "./feedback/notificationManager"
   export type {
     FeedbackVariant,
     ToastEntry,
     BannerEntry,
     NotificationState,
     ToastLifecycleState,
     BannerLifecycleState,
   } from "./feedback/types"
   ```

## Constraints
- Do not modify existing exports in `src/index.ts`
- Only append — preserve all prior content exactly
- Export only the public-facing API; internal manager implementation details remain internal
- Exporting `notificationManager` directly allows advanced usage (e.g. triggering toasts outside React)

## Acceptance Criteria
- All listed exports are present in `src/index.ts`
- `npm run build` completes with no errors
- All exported symbols are importable from the package root

## Test Steps
1. Run `npm run build` — no type errors
2. Verify imports resolve: `import { useToast, NotificationManagerProvider } from "lithebox-ui"` (or relative equivalent)

## Notes
None.
