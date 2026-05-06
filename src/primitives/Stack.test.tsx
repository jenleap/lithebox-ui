import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Stack } from "./Stack"

describe("Stack", () => {
  it("always renders with display flex and flexDirection column", () => {
    const { container } = render(<Stack />)
    const el = container.firstChild as HTMLElement
    expect(el.style.display).toBe("flex")
    expect(el.style.flexDirection).toBe("column")
  })

  it("applies gap CSS variable from spacing token", () => {
    const { container } = render(<Stack gap="lg" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-lg)")
  })

  it("maps align=start to alignItems flex-start", () => {
    const { container } = render(<Stack align="start" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("flex-start")
  })

  it("maps align=center to alignItems center", () => {
    const { container } = render(<Stack align="center" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("center")
  })

  it("maps align=end to alignItems flex-end", () => {
    const { container } = render(<Stack align="end" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("flex-end")
  })

  it("maps align=stretch to alignItems stretch", () => {
    const { container } = render(<Stack align="stretch" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("stretch")
  })

  it("does not apply gap when gap prop is omitted", () => {
    const { container } = render(<Stack />)
    const el = container.firstChild as HTMLElement
    const style = el.getAttribute("style") ?? ""
    expect(style).not.toContain("gap")
  })
})
