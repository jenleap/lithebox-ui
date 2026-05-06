import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Heading } from "./Heading"

describe("Heading", () => {
  it("renders h1 for level 1", () => {
    const { container } = render(<Heading level={1}>Title</Heading>)
    expect(container.firstChild?.nodeName).toBe("H1")
  })

  it("renders h2 for level 2", () => {
    const { container } = render(<Heading level={2}>Title</Heading>)
    expect(container.firstChild?.nodeName).toBe("H2")
  })

  it("renders h3 for level 3", () => {
    const { container } = render(<Heading level={3}>Title</Heading>)
    expect(container.firstChild?.nodeName).toBe("H3")
  })

  it("renders h4 for level 4", () => {
    const { container } = render(<Heading level={4}>Title</Heading>)
    expect(container.firstChild?.nodeName).toBe("H4")
  })

  it("defaults to h2 when no level provided", () => {
    const { container } = render(<Heading>Title</Heading>)
    expect(container.firstChild?.nodeName).toBe("H2")
  })

  it("applies xl font size for level 1", () => {
    const { container } = render(<Heading level={1}>Title</Heading>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-size-xl)")
  })

  it("applies sm font size for level 4", () => {
    const { container } = render(<Heading level={4}>Title</Heading>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-size-sm)")
  })

  it("always applies bold font weight", () => {
    const { container } = render(<Heading level={2}>Title</Heading>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-weight-bold)")
  })

  it("always applies margin 0", () => {
    const { container } = render(<Heading>Title</Heading>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("margin: 0")
  })
})
