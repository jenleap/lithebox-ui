import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Row } from "./Row"

describe("Row", () => {
  it("always renders with display flex and flexDirection row", () => {
    const { container } = render(<Row />)
    const el = container.firstChild as HTMLElement
    expect(el.style.display).toBe("flex")
    expect(el.style.flexDirection).toBe("row")
  })

  it("applies gap CSS variable from spacing token", () => {
    const { container } = render(<Row gap="xs" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-xs)")
  })

  it("maps justify=start to justifyContent flex-start", () => {
    const { container } = render(<Row justify="start" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.justifyContent).toBe("flex-start")
  })

  it("maps justify=center to justifyContent center", () => {
    const { container } = render(<Row justify="center" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.justifyContent).toBe("center")
  })

  it("maps justify=end to justifyContent flex-end", () => {
    const { container } = render(<Row justify="end" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.justifyContent).toBe("flex-end")
  })

  it("maps justify=between to justifyContent space-between", () => {
    const { container } = render(<Row justify="between" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.justifyContent).toBe("space-between")
  })

  it("maps align=center to alignItems center", () => {
    const { container } = render(<Row align="center" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("center")
  })

  it("maps align=stretch to alignItems stretch", () => {
    const { container } = render(<Row align="stretch" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.alignItems).toBe("stretch")
  })

  it("does not apply gap when gap prop is omitted", () => {
    const { container } = render(<Row />)
    const el = container.firstChild as HTMLElement
    const style = el.getAttribute("style") ?? ""
    expect(style).not.toContain("gap")
  })
})
