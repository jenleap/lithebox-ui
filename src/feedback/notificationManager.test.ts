import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { notificationManager } from "./notificationManager"

describe("notificationManager", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Clear state between tests by removing all active entries
    const state = notificationManager.getState()
    state.toasts.forEach((t) => notificationManager.dismissToast(t.id))
    state.banners.forEach((b) => notificationManager.dismissBanner(b.id))
    vi.runAllTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("addToast", () => {
    it("adds a toast in entering state immediately", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Done" })
      const state = notificationManager.getState()
      const toast = state.toasts.find((t) => t.id === id)
      expect(toast).toBeDefined()
      expect(toast?.lifecycleState).toBe("entering")
    })

    it("transitions toast to visible after 50ms", () => {
      const id = notificationManager.addToast({ variant: "info", title: "Hello" })
      vi.advanceTimersByTime(50)
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

    it("defaults dismissible to true", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Hi" })
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast?.dismissible).toBe(true)
    })

    it("respects dismissible: false", () => {
      const id = notificationManager.addToast({ variant: "info", title: "Hi", dismissible: false })
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast?.dismissible).toBe(false)
    })

    it("auto-dismisses after duration + 50ms", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Done", duration: 1000 })
      vi.advanceTimersByTime(1050)
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast?.lifecycleState).toBe("exiting")
    })

    it("removes toast after exit window completes", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Done", duration: 1000 })
      vi.advanceTimersByTime(1050 + 300)
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast).toBeUndefined()
    })
  })

  describe("dismissToast", () => {
    it("moves toast to exiting state", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Done" })
      vi.advanceTimersByTime(50)
      notificationManager.dismissToast(id)
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast?.lifecycleState).toBe("exiting")
    })

    it("removes toast after 300ms exit window", () => {
      const id = notificationManager.addToast({ variant: "success", title: "Done" })
      vi.advanceTimersByTime(50)
      notificationManager.dismissToast(id)
      vi.advanceTimersByTime(300)
      const toast = notificationManager.getState().toasts.find((t) => t.id === id)
      expect(toast).toBeUndefined()
    })

    it("is safe to call multiple times without double-transition", () => {
      const id = notificationManager.addToast({ variant: "info", title: "Note" })
      vi.advanceTimersByTime(50)
      notificationManager.dismissToast(id)
      notificationManager.dismissToast(id)
      const toasts = notificationManager.getState().toasts.filter((t) => t.id === id)
      expect(toasts.length).toBe(1)
      expect(toasts[0].lifecycleState).toBe("exiting")
    })
  })

  describe("addBanner", () => {
    it("adds a banner in visible state", () => {
      const id = notificationManager.addBanner({ variant: "warning", title: "Maintenance" })
      const banner = notificationManager.getState().banners.find((b) => b.id === id)
      expect(banner).toBeDefined()
      expect(banner?.lifecycleState).toBe("visible")
    })

    it("defaults dismissible to true", () => {
      const id = notificationManager.addBanner({ variant: "info", title: "Note" })
      const banner = notificationManager.getState().banners.find((b) => b.id === id)
      expect(banner?.dismissible).toBe(true)
    })

    it("stores description when provided", () => {
      const id = notificationManager.addBanner({ variant: "error", title: "Err", description: "Details" })
      const banner = notificationManager.getState().banners.find((b) => b.id === id)
      expect(banner?.description).toBe("Details")
    })
  })

  describe("dismissBanner", () => {
    it("moves banner to dismissed state", () => {
      const id = notificationManager.addBanner({ variant: "info", title: "Note" })
      notificationManager.dismissBanner(id)
      const banner = notificationManager.getState().banners.find((b) => b.id === id)
      expect(banner?.lifecycleState).toBe("dismissed")
    })

    it("removes banner after 300ms", () => {
      const id = notificationManager.addBanner({ variant: "info", title: "Note" })
      notificationManager.dismissBanner(id)
      vi.advanceTimersByTime(300)
      const banner = notificationManager.getState().banners.find((b) => b.id === id)
      expect(banner).toBeUndefined()
    })
  })

  describe("subscribe", () => {
    it("calls listener immediately with current state on subscribe", () => {
      const listener = vi.fn()
      const unsub = notificationManager.subscribe(listener)
      expect(listener).toHaveBeenCalledTimes(1)
      unsub()
    })

    it("calls listener when a toast is added", () => {
      const listener = vi.fn()
      const unsub = notificationManager.subscribe(listener)
      const callsBefore = listener.mock.calls.length
      notificationManager.addToast({ variant: "success", title: "Hi" })
      expect(listener.mock.calls.length).toBeGreaterThan(callsBefore)
      unsub()
    })

    it("calls listener when a banner is added", () => {
      const listener = vi.fn()
      const unsub = notificationManager.subscribe(listener)
      const callsBefore = listener.mock.calls.length
      notificationManager.addBanner({ variant: "info", title: "Note" })
      expect(listener.mock.calls.length).toBeGreaterThan(callsBefore)
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

    it("passes a state snapshot with both toasts and banners arrays", () => {
      const listener = vi.fn()
      const unsub = notificationManager.subscribe(listener)
      const receivedState = listener.mock.calls[0][0]
      expect(Array.isArray(receivedState.toasts)).toBe(true)
      expect(Array.isArray(receivedState.banners)).toBe(true)
      unsub()
    })
  })
})
