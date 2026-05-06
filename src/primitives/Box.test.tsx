import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Box } from "./Box"

describe("Box", () => {
  it("renders a div element", () => {
    const { container } = render(<Box />)
    expect(container.firstChild?.nodeName).toBe("DIV")
  })

  it("applies padding CSS variable from spacing token", () => {
    const { container } = render(<Box padding="md" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-md)")
  })

  it("applies margin CSS variable from spacing token", () => {
    const { container } = render(<Box margin="sm" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-sm)")
  })

  it("applies background CSS variable from color token", () => {
    const { container } = render(<Box background="surface" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-surface)")
  })

  it("applies borderRadius CSS variable from radius token", () => {
    const { container } = render(<Box radius="lg" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--radius-lg)")
  })

  it("applies border when border prop is true", () => {
    const { container } = render(<Box border />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })

  it("renders with no style attribute when no styling props are provided", () => {
    const { container } = render(<Box />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toBeFalsy()
  })
})
