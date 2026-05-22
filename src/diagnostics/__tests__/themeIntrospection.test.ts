import { describe, it, expect } from "vitest"
import { buildThemeSnapshot, isSystemAligned } from "../themeIntrospection"

describe("buildThemeSnapshot", () => {
  it("builds a theme snapshot with all fields", () => {
    const snap = buildThemeSnapshot({ mode: "dark", systemPreference: "dark", overridden: false })
    expect(snap.mode).toBe("dark")
    expect(snap.systemPreference).toBe("dark")
    expect(snap.overridden).toBe(false)
  })

  it("handles null systemPreference", () => {
    const snap = buildThemeSnapshot({ mode: "light", systemPreference: null, overridden: false })
    expect(snap.systemPreference).toBeNull()
  })
})

describe("isSystemAligned", () => {
  it("returns true when mode matches preference and not overridden", () => {
    expect(
      isSystemAligned({ mode: "light", systemPreference: "light", overridden: false })
    ).toBe(true)
  })

  it("returns false when mode does not match preference", () => {
    expect(
      isSystemAligned({ mode: "dark", systemPreference: "light", overridden: false })
    ).toBe(false)
  })

  it("returns false when overridden even if mode matches", () => {
    expect(
      isSystemAligned({ mode: "dark", systemPreference: "dark", overridden: true })
    ).toBe(false)
  })

  it("returns false when systemPreference is null", () => {
    expect(
      isSystemAligned({ mode: "light", systemPreference: null, overridden: false })
    ).toBe(false)
  })
})
