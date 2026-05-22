import { renderHook, act } from "@testing-library/react"
import { useSystemTheme } from "./useSystemTheme"

function mockMediaQuery(matches: boolean) {
  const listeners: ((e: MediaQueryListEvent) => void)[] = []
  const mq = {
    matches,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => {
      listeners.push(fn)
    },
    removeEventListener: (_: string, fn: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(fn)
      if (idx >= 0) listeners.splice(idx, 1)
    },
    dispatchEvent: () => false,
    trigger: (nextMatches: boolean) => {
      listeners.forEach(fn => fn({ matches: nextMatches } as MediaQueryListEvent))
    },
  }
  window.matchMedia = vi.fn().mockReturnValue(mq)
  return mq
}

describe("useSystemTheme", () => {
  it("returns light when system is light", () => {
    mockMediaQuery(false)
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe("light")
  })

  it("returns dark when system is dark", () => {
    mockMediaQuery(true)
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe("dark")
  })

  it("updates when system preference changes to dark", () => {
    const mq = mockMediaQuery(false)
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe("light")
    act(() => mq.trigger(true))
    expect(result.current).toBe("dark")
  })

  it("updates when system preference changes to light", () => {
    const mq = mockMediaQuery(true)
    const { result } = renderHook(() => useSystemTheme())
    expect(result.current).toBe("dark")
    act(() => mq.trigger(false))
    expect(result.current).toBe("light")
  })
})
