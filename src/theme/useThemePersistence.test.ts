import { renderHook, act } from "@testing-library/react"
import { useThemePersistence } from "./useThemePersistence"

function makeLocalStorageMock() {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    reset: () => { store = {} },
  }
}

describe("useThemePersistence", () => {
  const mock = makeLocalStorageMock()

  beforeAll(() => {
    vi.stubGlobal("localStorage", mock)
  })

  beforeEach(() => {
    mock.reset()
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it("returns null when no preference is stored", () => {
    const { result } = renderHook(() => useThemePersistence())
    expect(result.current[0]).toBeNull()
  })

  it("persists dark mode to localStorage", () => {
    const { result } = renderHook(() => useThemePersistence())
    act(() => result.current[1]("dark"))
    expect(mock.getItem("lithebox_theme_mode")).toBe("dark")
    expect(result.current[0]).toBe("dark")
  })

  it("persists light mode to localStorage", () => {
    const { result } = renderHook(() => useThemePersistence())
    act(() => result.current[1]("light"))
    expect(mock.getItem("lithebox_theme_mode")).toBe("light")
    expect(result.current[0]).toBe("light")
  })

  it("restores stored dark mode on mount", () => {
    mock.setItem("lithebox_theme_mode", "dark")
    const { result } = renderHook(() => useThemePersistence())
    expect(result.current[0]).toBe("dark")
  })

  it("restores stored light mode on mount", () => {
    mock.setItem("lithebox_theme_mode", "light")
    const { result } = renderHook(() => useThemePersistence())
    expect(result.current[0]).toBe("light")
  })

  it("ignores invalid stored values", () => {
    mock.setItem("lithebox_theme_mode", "system")
    const { result } = renderHook(() => useThemePersistence())
    expect(result.current[0]).toBeNull()
  })

  it("overwrites a previous stored value", () => {
    mock.setItem("lithebox_theme_mode", "light")
    const { result } = renderHook(() => useThemePersistence())
    act(() => result.current[1]("dark"))
    expect(mock.getItem("lithebox_theme_mode")).toBe("dark")
    expect(result.current[0]).toBe("dark")
  })
})
