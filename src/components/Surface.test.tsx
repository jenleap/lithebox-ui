import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Surface } from "./Surface"

describe("Surface", () => {
  it("renders a div element", () => {
    const { container } = render(<Surface>content</Surface>)
    expect(container.firstChild?.nodeName).toBe("DIV")
  })

  it("defaults to base variant with background color", () => {
    const { container } = render(<Surface>content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-background)")
  })

  it("base variant has no border", () => {
    const { container } = render(<Surface variant="base">content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("var(--color-border)")
  })

  it("raised variant applies surface background", () => {
    const { container } = render(<Surface variant="raised">content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-surface)")
  })

  it("raised variant has no border", () => {
    const { container } = render(<Surface variant="raised">content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("var(--color-border)")
  })

  it("sunken variant applies background color", () => {
    const { container } = render(<Surface variant="sunken">content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-background)")
  })

  it("sunken variant applies border", () => {
    const { container } = render(<Surface variant="sunken">content</Surface>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })
})
