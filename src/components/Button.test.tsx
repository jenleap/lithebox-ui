import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import React from "react"
import { Button } from "./Button"

describe("Button", () => {
  it("renders a button element", () => {
    const { container } = render(<Button>Click</Button>)
    expect(container.firstChild?.nodeName).toBe("BUTTON")
  })

  it("primary variant applies primary background", () => {
    const { container } = render(<Button variant="primary">Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-primary)")
  })

  it("secondary variant applies surface background and border", () => {
    const { container } = render(<Button variant="secondary">Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-surface)")
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })

  it("ghost variant applies transparent background", () => {
    const { container } = render(<Button variant="ghost">Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("transparent")
  })

  it("sm size applies xs/sm spacing tokens for padding", () => {
    const { container } = render(<Button size="sm">Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-xs)")
    expect(el.getAttribute("style")).toContain("var(--spacing-sm)")
  })

  it("lg size applies md/lg spacing tokens for padding", () => {
    const { container } = render(<Button size="lg">Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-md)")
    expect(el.getAttribute("style")).toContain("var(--spacing-lg)")
  })

  it("always applies md border radius", () => {
    const { container } = render(<Button>Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--radius-md)")
  })

  it("fires onClick when clicked", () => {
    const handler = vi.fn()
    const { container } = render(<Button onClick={handler}>Click</Button>)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(handler).toHaveBeenCalledOnce()
  })

  it("disabled button does not call onClick", () => {
    const handler = vi.fn()
    const { container } = render(<Button disabled onClick={handler}>Click</Button>)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(handler).not.toHaveBeenCalled()
  })

  it("disabled button has disabled attribute", () => {
    const { container } = render(<Button disabled>Click</Button>)
    const el = container.firstChild as HTMLButtonElement
    expect(el.disabled).toBe(true)
  })

  it("loading button renders children unchanged", () => {
    const { getByText } = render(<Button loading>Saving...</Button>)
    expect(getByText("Saving...")).toBeTruthy()
  })

  it("disabled button has opacity 0.5 in style", () => {
    const { container } = render(<Button disabled>Click</Button>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("opacity: 0.5")
  })
})
