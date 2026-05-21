import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import React from "react"
import { useBreakpoint } from "../useBreakpoint"
import { ResponsiveContext } from "../ResponsiveContext"
import type { Breakpoint } from "../types"

function makeWrapper(bp: Breakpoint) {
  const isMobile = bp === "sm"
  const isTablet = bp === "md"
  const isDesktop = bp === "lg" || bp === "xl" || bp === "xxl"
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ResponsiveContext.Provider value={{ breakpoint: bp, isMobile, isTablet, isDesktop }}>
        {children}
      </ResponsiveContext.Provider>
    )
  }
}

describe("useBreakpoint - derived flags", () => {
  it("isMobile is true at sm", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("sm") })
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it("isTablet is true at md", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("md") })
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isDesktop).toBe(false)
  })

  it("isDesktop is true at lg", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("lg") })
    expect(result.current.isDesktop).toBe(true)
  })

  it("isDesktop is true at xl", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("xl") })
    expect(result.current.isDesktop).toBe(true)
  })

  it("isDesktop is true at xxl", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("xxl") })
    expect(result.current.isDesktop).toBe(true)
  })
})

describe("useBreakpoint - isAtLeast", () => {
  it("isAtLeast(sm) is always true", () => {
    for (const bp of ["sm", "md", "lg", "xl", "xxl"] as Breakpoint[]) {
      const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper(bp) })
      expect(result.current.isAtLeast("sm")).toBe(true)
    }
  })

  it("isAtLeast(lg) is false at sm", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("sm") })
    expect(result.current.isAtLeast("lg")).toBe(false)
  })

  it("isAtLeast(lg) is true at lg", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("lg") })
    expect(result.current.isAtLeast("lg")).toBe(true)
  })

  it("isAtLeast(lg) is true at xl", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("xl") })
    expect(result.current.isAtLeast("lg")).toBe(true)
  })
})

describe("useBreakpoint - isAtMost", () => {
  it("isAtMost(xxl) is always true", () => {
    for (const bp of ["sm", "md", "lg", "xl", "xxl"] as Breakpoint[]) {
      const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper(bp) })
      expect(result.current.isAtMost("xxl")).toBe(true)
    }
  })

  it("isAtMost(sm) is false at lg", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("lg") })
    expect(result.current.isAtMost("sm")).toBe(false)
  })

  it("isAtMost(md) is true at sm", () => {
    const { result } = renderHook(() => useBreakpoint(), { wrapper: makeWrapper("sm") })
    expect(result.current.isAtMost("md")).toBe(true)
  })
})
