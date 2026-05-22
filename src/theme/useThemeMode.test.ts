import { renderHook, act } from "@testing-library/react"
import React from "react"
import { ThemeModeContext, useThemeMode } from "./ThemeModeContext"
import type { ThemeModeContextValue } from "./types"

describe("useThemeMode", () => {
  it("returns default light mode outside provider", () => {
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe("light")
  })

  it("setMode and toggleMode are callable no-ops outside provider", () => {
    const { result } = renderHook(() => useThemeMode())
    expect(() => result.current.setMode("dark")).not.toThrow()
    expect(() => result.current.toggleMode()).not.toThrow()
  })

  it("returns mode from context when provided", () => {
    const value: ThemeModeContextValue = {
      mode: "dark",
      setMode: vi.fn(),
      toggleMode: vi.fn(),
    }
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ThemeModeContext.Provider, { value }, children)

    const { result } = renderHook(() => useThemeMode(), { wrapper })
    expect(result.current.mode).toBe("dark")
  })

  it("calls setMode from context", () => {
    const setMode = vi.fn()
    const value: ThemeModeContextValue = {
      mode: "light",
      setMode,
      toggleMode: vi.fn(),
    }
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ThemeModeContext.Provider, { value }, children)

    const { result } = renderHook(() => useThemeMode(), { wrapper })
    act(() => result.current.setMode("dark"))
    expect(setMode).toHaveBeenCalledWith("dark")
  })

  it("calls toggleMode from context", () => {
    const toggleMode = vi.fn()
    const value: ThemeModeContextValue = {
      mode: "light",
      setMode: vi.fn(),
      toggleMode,
    }
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ThemeModeContext.Provider, { value }, children)

    const { result } = renderHook(() => useThemeMode(), { wrapper })
    act(() => result.current.toggleMode())
    expect(toggleMode).toHaveBeenCalled()
  })
})
