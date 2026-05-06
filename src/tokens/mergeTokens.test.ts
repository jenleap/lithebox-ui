import { describe, it, expect } from "vitest"
import { mergeTokens } from "./mergeTokens"
import { defaultTokens } from "./defaultTokens"

describe("mergeTokens", () => {
  it("returns base unchanged when overrides is undefined", () => {
    const result = mergeTokens(defaultTokens, undefined)
    expect(result).toBe(defaultTokens)
  })

  it("overrides a top-level color value", () => {
    const result = mergeTokens(defaultTokens, { color: { primary: "#FF0000" } as never })
    expect(result.color.primary).toBe("#FF0000")
    expect(result.color.secondary).toBe(defaultTokens.color.secondary)
    expect(result.color.background).toBe(defaultTokens.color.background)
  })

  it("overrides a nested color.text value", () => {
    const result = mergeTokens(defaultTokens, {
      color: { text: { primary: "#000000" } } as never
    })
    expect(result.color.text.primary).toBe("#000000")
    expect(result.color.text.secondary).toBe(defaultTokens.color.text.secondary)
    expect(result.color.primary).toBe(defaultTokens.color.primary)
  })

  it("overrides a full top-level group", () => {
    const newRadius = { sm: "2px", md: "4px", lg: "8px" }
    const result = mergeTokens(defaultTokens, { radius: newRadius })
    expect(result.radius).toEqual(newRadius)
    expect(result.spacing).toEqual(defaultTokens.spacing)
  })

  it("overrides a nested typography.size value", () => {
    const result = mergeTokens(defaultTokens, {
      typography: { size: { xl: "32px" } } as never
    })
    expect(result.typography.size.xl).toBe("32px")
    expect(result.typography.size.md).toBe(defaultTokens.typography.size.md)
    expect(result.typography.fontFamily).toBe(defaultTokens.typography.fontFamily)
  })

  it("overrides a nested typography.weight value", () => {
    const result = mergeTokens(defaultTokens, {
      typography: { weight: { bold: 900 } } as never
    })
    expect(result.typography.weight.bold).toBe(900)
    expect(result.typography.weight.regular).toBe(defaultTokens.typography.weight.regular)
  })

  it("does not mutate the base object", () => {
    const original = defaultTokens.color.primary
    mergeTokens(defaultTokens, { color: { primary: "#FF0000" } as never })
    expect(defaultTokens.color.primary).toBe(original)
  })
})
