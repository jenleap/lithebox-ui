import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import React from "react"
import { Card } from "./Card"

describe("Card", () => {
  it("renders a div element", () => {
    const { container } = render(<Card>content</Card>)
    expect(container.firstChild?.nodeName).toBe("DIV")
  })

  it("applies surface background", () => {
    const { container } = render(<Card>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-surface)")
  })

  it("applies md border radius", () => {
    const { container } = render(<Card>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--radius-md)")
  })

  it("applies border", () => {
    const { container } = render(<Card>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-border)")
  })

  it("applies padding CSS variable when padding prop is provided", () => {
    const { container } = render(<Card padding="md">content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-md)")
  })

  it("does not apply padding when padding prop is omitted", () => {
    const { container } = render(<Card>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("padding")
  })

  it("non-interactive Card renders without pointer cursor", () => {
    const { container } = render(<Card>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).not.toContain("pointer")
  })

  it("interactive Card has pointer cursor", () => {
    const { container } = render(<Card interactive>content</Card>)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("pointer")
  })

  it("onClick fires when Card is interactive and clicked", () => {
    const handler = vi.fn()
    const { container } = render(<Card onClick={handler}>content</Card>)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(handler).toHaveBeenCalledOnce()
  })
})
