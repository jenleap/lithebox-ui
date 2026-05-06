import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Text } from "./Text"

describe("Text", () => {
  it("renders a span element", () => {
    const { container } = render(<Text>Hello</Text>)
    expect(container.firstChild?.nodeName).toBe("SPAN")
  })

  it("always applies fontFamily and lineHeight", () => {
    const { container } = render(<Text>Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-family)")
    expect(el.getAttribute("style")).toContain("1.5")
  })

  it("applies font-size CSS variable from size prop", () => {
    const { container } = render(<Text size="md">Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-size-md)")
  })

  it("applies font-weight CSS variable from weight prop", () => {
    const { container } = render(<Text weight="bold">Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--font-weight-bold)")
  })

  it("applies color CSS variable from color prop", () => {
    const { container } = render(<Text color="secondary">Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-text-secondary)")
  })

  it("does not apply fontSize when size prop is omitted", () => {
    const { container } = render(<Text>Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("font-size")
  })

  it("does not apply fontWeight when weight prop is omitted", () => {
    const { container } = render(<Text>Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("font-weight")
  })

  it("does not apply color when color prop is omitted", () => {
    const { container } = render(<Text>Hello</Text>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("color: var")
  })
})
