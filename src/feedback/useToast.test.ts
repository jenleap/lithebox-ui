import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("./notificationManager", () => ({
  notificationManager: {
    addToast: vi.fn(() => "mock-id"),
    dismissToast: vi.fn(),
  },
}))

import { useToast } from "./useToast"
import { notificationManager } from "./notificationManager"

describe("useToast", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

  it("passes optional description through", () => {
    const toast = useToast()
    toast.success("Done", { description: "All changes saved." })
    expect(notificationManager.addToast).toHaveBeenCalledWith(
      expect.objectContaining({ description: "All changes saved." })
    )
  })

  it("passes optional duration through", () => {
    const toast = useToast()
    toast.error("Oops", { duration: 8000 })
    expect(notificationManager.addToast).toHaveBeenCalledWith(
      expect.objectContaining({ duration: 8000 })
    )
  })

  it("dismiss calls dismissToast with the provided id", () => {
    const toast = useToast()
    toast.dismiss("test-id-123")
    expect(notificationManager.dismissToast).toHaveBeenCalledWith("test-id-123")
  })

  it("returns the id from addToast", () => {
    const toast = useToast()
    const id = toast.success("Hi")
    expect(id).toBe("mock-id")
  })
})
