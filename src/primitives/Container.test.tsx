import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Container } from "./Container"

describe("Container", () => {
  it("always renders with width 100% and auto margins", () => {
    const { container } = render(<Container />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe("100%")
    expect(el.style.marginLeft).toBe("auto")
    expect(el.style.marginRight).toBe("auto")
  })

  it("maps maxWidth=sm to 640px", () => {
    const { container } = render(<Container maxWidth="sm" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("640px")
  })

  it("maps maxWidth=md to 768px", () => {
    const { container } = render(<Container maxWidth="md" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("768px")
  })

  it("maps maxWidth=lg to 1024px", () => {
    const { container } = render(<Container maxWidth="lg" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("1024px")
  })

  it("maps maxWidth=xl to 1280px", () => {
    const { container } = render(<Container maxWidth="xl" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("1280px")
  })

  it("maps maxWidth=full to 100%", () => {
    const { container } = render(<Container maxWidth="full" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("100%")
  })

  it("applies padding CSS variable from spacing token", () => {
    const { container } = render(<Container padding="lg" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--spacing-lg)")
  })

  it("applies background CSS variable from color token", () => {
    const { container } = render(<Container background="background" />)
    const el = container.firstChild as HTMLElement
    expect(el.getAttribute("style")).toContain("var(--color-background)")
  })

  it("does not apply maxWidth when prop is omitted", () => {
    const { container } = render(<Container />)
    const el = container.firstChild as HTMLElement
    expect(el.style.maxWidth).toBe("")
  })
})
