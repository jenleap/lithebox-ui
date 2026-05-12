import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Badge } from "./Badge"

describe("Badge", () => {
  it("renders children", () => {
    const { getByText } = render(<Badge>Online</Badge>)
    expect(getByText("Online")).toBeTruthy()
  })

  it("renders as span", () => {
    const { container } = render(<Badge>Active</Badge>)
    expect(container.querySelector("span")).toBeTruthy()
  })

  it("default variant renders without error", () => {
    expect(() => render(<Badge variant="default">Default</Badge>)).not.toThrow()
  })

  it("success variant renders without error", () => {
    expect(() => render(<Badge variant="success">Success</Badge>)).not.toThrow()
  })

  it("warning variant renders without error", () => {
    expect(() => render(<Badge variant="warning">Warning</Badge>)).not.toThrow()
  })

  it("error variant renders without error", () => {
    expect(() => render(<Badge variant="error">Error</Badge>)).not.toThrow()
  })

  it("info variant renders without error", () => {
    expect(() => render(<Badge variant="info">Info</Badge>)).not.toThrow()
  })

  it("success variant applies success background color", () => {
    const { container } = render(<Badge variant="success">OK</Badge>)
    const el = container.querySelector("span") as HTMLElement
    expect(el.getAttribute("style")).toContain("rgb(220, 252, 231)")
  })

  it("error variant applies error background color", () => {
    const { container } = render(<Badge variant="error">Fail</Badge>)
    const el = container.querySelector("span") as HTMLElement
    expect(el.getAttribute("style")).toContain("rgb(254, 226, 226)")
  })
})
