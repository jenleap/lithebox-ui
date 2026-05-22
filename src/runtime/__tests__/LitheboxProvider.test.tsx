import React from "react"
import { render, renderHook, cleanup } from "@testing-library/react"
import { LitheboxProvider } from "../LitheboxProvider"
import { useRuntime } from "../RuntimeContext"

describe("LitheboxProvider", () => {
  afterEach(() => {
    cleanup()
    document.documentElement.style.cssText = ""
  })

  it("renders children without error", () => {
    const { getByText } = render(
      <LitheboxProvider>
        <span>hello</span>
      </LitheboxProvider>
    )
    expect(getByText("hello")).toBeInTheDocument()
  })

  it("injects CSS variables on document.documentElement", () => {
    render(<LitheboxProvider><div /></LitheboxProvider>)
    expect(
      document.documentElement.style.getPropertyValue("--color-primary")
    ).toBeTruthy()
  })

  it("exposes config via useRuntime()", () => {
    const config = { motion: { reducedMotion: true } }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LitheboxProvider config={config}>{children}</LitheboxProvider>
    )
    const { result } = renderHook(() => useRuntime(), { wrapper })
    expect(result.current.config.motion?.reducedMotion).toBe(true)
  })
})
