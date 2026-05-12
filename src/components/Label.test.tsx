import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Label } from "./Label"

describe("Label", () => {
  it("renders a label element", () => {
    const { container } = render(<Label>Field Name</Label>)
    expect(container.firstChild?.nodeName).toBe("LABEL")
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

  it("renders required asterisk when required=true", () => {
    const { getByText } = render(<Label required>Email</Label>)
    expect(getByText("*")).toBeTruthy()
  })

  it("applies disabled opacity when disabled=true", () => {
    const { container } = render(<Label disabled>Field Name</Label>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("opacity")
  })

  it("sets htmlFor attribute", () => {
    const { container } = render(<Label htmlFor="email-input">Email</Label>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("for")).toBe("email-input")
  })
})
