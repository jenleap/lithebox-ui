import { resolveThemeTokens } from "./resolveTheme"
import { lightTokens } from "./lightTokens"
import { darkTokens } from "./darkTokens"

describe("resolveThemeTokens", () => {
  it("returns light tokens when mode is light", () => {
    const result = resolveThemeTokens("light")
    expect(result.color.background).toBe(lightTokens.color.background)
  })

  it("returns dark tokens when mode is dark", () => {
    const result = resolveThemeTokens("dark")
    expect(result.color.background).toBe(darkTokens.color.background)
  })

  it("merges custom tokens over base tokens", () => {
    const result = resolveThemeTokens("light", { color: { primary: "#FF0000" } })
    expect(result.color.primary).toBe("#FF0000")
    expect(result.color.background).toBe(lightTokens.color.background)
  })

  it("dark and light background values are different", () => {
    const light = resolveThemeTokens("light")
    const dark = resolveThemeTokens("dark")
    expect(light.color.background).not.toBe(dark.color.background)
  })

  it("non-color tokens are identical across modes", () => {
    const light = resolveThemeTokens("light")
    const dark = resolveThemeTokens("dark")
    expect(light.radius).toEqual(dark.radius)
    expect(light.spacing).toEqual(dark.spacing)
    expect(light.typography).toEqual(dark.typography)
  })
})
