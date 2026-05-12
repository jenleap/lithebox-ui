# Task 007: Unit Tests

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Write unit tests for the notification manager and useToast hook. Tests focus on state transitions, queue behavior, lifecycle enforcement, and the hook's dispatch surface. Component rendering tests are out of scope (covered by Storybook in task 008).

## Files
- `src/feedback/notificationManager.test.ts` (create)
- `src/feedback/useToast.test.ts` (create)

## Implementation Steps

1. Create `src/feedback/notificationManager.test.ts`:
   ```ts
   import { notificationManager } from "./notificationManager"
   import type { NotificationState } from "./types"

   function waitMs(ms: number) {
     return new Promise((r) => setTimeout(r, ms))
   }

   describe("notificationManager", () => {
     beforeEach(() => {
       // Reset by dismissing all active entries
       const state = notificationManager.getState()
       state.toasts.forEach((t) => notificationManager.dismissToast(t.id))
       state.banners.forEach((b) => notificationManager.dismissBanner(b.id))
     })

     describe("addToast", () => {
       it("adds a toast in entering state", () => {
         const id = notificationManager.addToast({ variant: "success", title: "Done" })
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast).toBeDefined()
         expect(toast?.lifecycleState).toBe("entering")
       })

       it("transitions toast to visible after entering", async () => {
         const id = notificationManager.addToast({ variant: "info", title: "Hello" })
         await waitMs(100)
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast?.lifecycleState).toBe("visible")
       })

       it("assigns default duration of 4000ms", () => {
         const id = notificationManager.addToast({ variant: "warning", title: "Watch out" })
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast?.duration).toBe(4000)
       })

       it("uses custom duration when provided", () => {
         const id = notificationManager.addToast({ variant: "error", title: "Err", duration: 2000 })
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast?.duration).toBe(2000)
       })
     })

     describe("dismissToast", () => {
       it("moves toast to exiting state", async () => {
         const id = notificationManager.addToast({ variant: "success", title: "Done" })
         await waitMs(100)
         notificationManager.dismissToast(id)
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast?.lifecycleState).toBe("exiting")
       })

       it("removes toast after exit window", async () => {
         const id = notificationManager.addToast({ variant: "success", title: "Done" })
         await waitMs(100)
         notificationManager.dismissToast(id)
         await waitMs(350)
         const state = notificationManager.getState()
         const toast = state.toasts.find((t) => t.id === id)
         expect(toast).toBeUndefined()
       })
     })

     describe("addBanner", () => {
       it("adds a banner in visible state", () => {
         const id = notificationManager.addBanner({ variant: "warning", title: "Maintenance" })
         const state = notificationManager.getState()
         const banner = state.banners.find((b) => b.id === id)
         expect(banner).toBeDefined()
         expect(banner?.lifecycleState).toBe("visible")
       })
     })

     describe("dismissBanner", () => {
       it("moves banner to dismissed state", () => {
         const id = notificationManager.addBanner({ variant: "info", title: "Note" })
         notificationManager.dismissBanner(id)
         const state = notificationManager.getState()
         const banner = state.banners.find((b) => b.id === id)
         expect(banner?.lifecycleState).toBe("dismissed")
       })

       it("removes banner after dismiss window", async () => {
         const id = notificationManager.addBanner({ variant: "info", title: "Note" })
         notificationManager.dismissBanner(id)
         await waitMs(350)
         const state = notificationManager.getState()
         const banner = state.banners.find((b) => b.id === id)
         expect(banner).toBeUndefined()
       })
     })

     describe("subscribe", () => {
       it("calls listener immediately with current state", () => {
         const listener = vi.fn()
         const unsub = notificationManager.subscribe(listener)
         expect(listener).toHaveBeenCalledTimes(1)
         unsub()
       })

       it("calls listener on state change", () => {
         const listener = vi.fn()
         const unsub = notificationManager.subscribe(listener)
         notificationManager.addBanner({ variant: "success", title: "Hi" })
         expect(listener).toHaveBeenCalledTimes(2)
         unsub()
       })

       it("stops calling listener after unsubscribe", () => {
         const listener = vi.fn()
         const unsub = notificationManager.subscribe(listener)
         unsub()
         const callsBefore = listener.mock.calls.length
         notificationManager.addBanner({ variant: "info", title: "After unsub" })
         expect(listener.mock.calls.length).toBe(callsBefore)
       })
     })
   })
   ```

2. Create `src/feedback/useToast.test.ts`:
   ```ts
   import { useToast } from "./useToast"
   import { notificationManager } from "./notificationManager"

   vi.mock("./notificationManager", () => ({
     notificationManager: {
       addToast: vi.fn(() => "mock-id"),
       dismissToast: vi.fn(),
     },
   }))

   describe("useToast", () => {
     it("success calls addToast with success variant", () => {
       const toast = useToast()
       toast.success("Saved")
       expect(notificationManager.addToast).toHaveBeenCalledWith(
         expect.objectContaining({ variant: "success", title: "Saved" })
       )
     })

     it("error calls addToast with error variant", () => {
       const toast = useToast()
       toast.error("Failed")
       expect(notificationManager.addToast).toHaveBeenCalledWith(
         expect.objectContaining({ variant: "error", title: "Failed" })
       )
     })

     it("info calls addToast with info variant", () => {
       const toast = useToast()
       toast.info("Note")
       expect(notificationManager.addToast).toHaveBeenCalledWith(
         expect.objectContaining({ variant: "info", title: "Note" })
       )
     })

     it("warning calls addToast with warning variant", () => {
       const toast = useToast()
       toast.warning("Careful")
       expect(notificationManager.addToast).toHaveBeenCalledWith(
         expect.objectContaining({ variant: "warning", title: "Careful" })
       )
     })

     it("dismiss calls dismissToast with the id", () => {
       const toast = useToast()
       toast.dismiss("test-id")
       expect(notificationManager.dismissToast).toHaveBeenCalledWith("test-id")
     })
   })
   ```

## Constraints
- Use `vi.fn()` (Vitest) for mocking — not Jest's `jest.fn()`
- `notificationManager` is a module-level singleton; tests must clean up state in `beforeEach` to avoid cross-test contamination
- No React test utilities needed — the manager and hook are pure TypeScript logic
- Do not test toast rendering (CSS, DOM output) — that is Storybook's scope

## Acceptance Criteria
- All tests pass: `npm run test`
- `notificationManager` tests cover: addToast, dismissToast, addBanner, dismissBanner, subscribe/unsubscribe
- `useToast` tests cover all four variant methods and `dismiss`
- No TypeScript errors

## Test Steps
1. Run `npm run test` — all tests pass
2. Run `npm run build` — no errors

## Notes
The `notificationManager` singleton holds state across tests. The `beforeEach` cleanup approach (calling dismiss on all entries) avoids needing a hard reset mechanism while keeping the module's API surface minimal.
