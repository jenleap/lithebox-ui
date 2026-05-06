import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Divider } from "./Divider"

describe("Divider", () => {
  it("renders an hr element by default", () => {
    const { container } = render(<Divider />)
    expect(container.firstChild?.nodeName).toBe("HR")
  })

  it("renders an hr for horizontal orientation", () => {
    const { container } = render(<Divider orientation="horizontal" />)
    expect(container.firstChild?.nodeName).toBe("HR")
  })

  it("applies borderTop with border color token for horizontal", () => {
    const { container } = render(<Divider />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })

  it("renders a div for vertical orientation", () => {
    const { container } = render(<Divider orientation="vertical" />)
    expect(container.firstChild?.nodeName).toBe("DIV")
  })

  it("applies borderLeft with border color token for vertical", () => {
    const { container } = render(<Divider orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })

  it("applies margin 0 for horizontal", () => {
    const { container } = render(<Divider />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("margin: 0")
  })

  it("applies margin 0 for vertical", () => {
    const { container } = render(<Divider orientation="vertical" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("margin: 0")
  })
})
