import React from "react"
import { renderHook } from "@testing-library/react"
import { RuntimeContext, useRuntime } from "../RuntimeContext"
import type { RuntimeContextValue } from "../types"

describe("useRuntime", () => {
  it("returns default context value outside provider", () => {
    const { result } = renderHook(() => useRuntime())
    expect(result.current.environment.isBrowser).toBe(false)
    expect(result.current.config).toEqual({})
  })

  it("returns provided value inside RuntimeContext.Provider", () => {
    const mockValue: RuntimeContextValue = {
      config: { motion: { reducedMotion: true } },
      environment: {
        isBrowser: true,
        supportsReducedMotion: true,
        supportsHover: false,
        supportsPointer: false,
      },
    }
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RuntimeContext.Provider value={mockValue}>{children}</RuntimeContext.Provider>
    )
    const { result } = renderHook(() => useRuntime(), { wrapper })
    expect(result.current.config.motion?.reducedMotion).toBe(true)
    expect(result.current.environment.isBrowser).toBe(true)
  })
})
