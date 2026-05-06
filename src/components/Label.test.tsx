import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Label } from "./Label"

describe("Label", () => {
  it("renders a span element (via Text)", () => {
    const { container } = render(<Label>Field Name</Label>)
    expect(container.firstChild?.nodeName).toBe("SPAN")
  })

  it("applies sm font size", () => {
    const { container } = render(<Label>Field Name</Label>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-size-sm)")
  })

  it("applies medium font weight", () => {
    const { container } = render(<Label>Field Name</Label>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-weight-medium)")
  })
})
