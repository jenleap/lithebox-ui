import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react"
import React from "react"
import { ThemeProvider, useTheme } from "./ThemeProvider"
import { defaultTokens } from "../tokens/defaultTokens"

describe("ThemeProvider", () => {
  it("renders children without crashing", () => {
    render(
      <ThemeProvider>
        <span data-testid="child">hello</span>
      </ThemeProvider>
    )
    expect(screen.getByTestId("child")).toBeTruthy()
  })

  it("injects --color-primary as an inline CSS variable on the wrapper div", () => {
    const { container } = render(
      <ThemeProvider>
        <span />
      </ThemeProvider>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.getPropertyValue("--color-primary")).toBe(defaultTokens.color.primary)
  })

  it("useTheme returns defaultTokens when no overrides are provided", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
    })
    expect(result.current.color.primary).toBe(defaultTokens.color.primary)
    expect(result.current.spacing.md).toBe(defaultTokens.spacing.md)
  })

  it("useTheme returns overridden token when override prop is provided", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider tokens={{ color: { primary: "#FF0000" } as never }}>
          {children}
        </ThemeProvider>
      )
    })
    expect(result.current.color.primary).toBe("#FF0000")
    expect(result.current.color.secondary).toBe(defaultTokens.color.secondary)
  })

  it("useTheme returns defaultTokens when called outside any provider", () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current).toEqual(defaultTokens)
  })

  it("CSS variables on wrapper reflect token overrides", () => {
    const { container } = render(
      <ThemeProvider tokens={{ color: { primary: "#123456" } as never }}>
        <span />
      </ThemeProvider>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.getPropertyValue("--color-primary")).toBe("#123456")
  })
})
