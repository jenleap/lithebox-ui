import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { StatusIndicator } from "./StatusIndicator"

describe("StatusIndicator", () => {
  it("renders without error", () => {
    expect(() => render(<StatusIndicator />)).not.toThrow()
  })

  it("renders label when provided", () => {
    const { getByText } = render(<StatusIndicator label="Active" />)
    expect(getByText("Active")).toBeTruthy()
  })

  it("does not render label text when omitted", () => {
    const { container } = render(<StatusIndicator />)
    expect(container.querySelectorAll("span").length).toBe(2)
  })

  it("all variants render without error", () => {
    const variants = ["default", "success", "warning", "error", "info"] as const
    variants.forEach(v => {
      expect(() => render(<StatusIndicator variant={v} />)).not.toThrow()
    })
  })

  it("success variant applies success dot color", () => {
    const { container } = render(<StatusIndicator variant="success" />)
    const spans = container.querySelectorAll("span")
    const dot = spans[1] as HTMLElement
    expect(dot.getAttribute("style")).toContain("rgb(34, 197, 94)")
  })

  it("error variant applies error dot color", () => {
    const { container } = render(<StatusIndicator variant="error" />)
    const spans = container.querySelectorAll("span")
    const dot = spans[1] as HTMLElement
    expect(dot.getAttribute("style")).toContain("rgb(239, 68, 68)")
  })
})
