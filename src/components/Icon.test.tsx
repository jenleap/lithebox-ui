import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Icon } from "./Icon"

describe("Icon", () => {
  it("renders a span element", () => {
    const { container } = render(<Icon>•</Icon>)
    expect(container.firstChild?.nodeName).toBe("SPAN")
  })

  it("defaults to md size", () => {
    const { container } = render(<Icon>•</Icon>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-md)")
  })

  it("applies sm spacing token for size sm", () => {
    const { container } = render(<Icon size="sm">•</Icon>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-sm)")
  })

  it("applies lg spacing token for size lg", () => {
    const { container } = render(<Icon size="lg">•</Icon>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-lg)")
  })

  it("renders children", () => {
    const { getByText } = render(<Icon>★</Icon>)
    expect(getByText("★")).toBeTruthy()
  })
})
