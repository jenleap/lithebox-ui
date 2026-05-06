import { describe, it, expect } from "vitest"
import { tokensToCSSVariables } from "./tokensToCSSVariables"
import { defaultTokens } from "./defaultTokens"
import { mergeTokens } from "./mergeTokens"

describe("tokensToCSSVariables", () => {
  it("produces exactly 26 CSS variables", () => {
    const result = tokensToCSSVariables(defaultTokens)
    expect(Object.keys(result)).toHaveLength(26)
  })

  it("maps --color-primary to the correct value", () => {
    const result = tokensToCSSVariables(defaultTokens)
    expect(result["--color-primary"]).toBe(defaultTokens.color.primary)
  })

  it("maps --color-text-primary to the nested value", () => {
    const result = tokensToCSSVariables(defaultTokens)
    expect(result["--color-text-primary"]).toBe(defaultTokens.color.text.primary)
  })

  it("converts font-weight numbers to strings", () => {
    const result = tokensToCSSVariables(defaultTokens)
    expect(result["--font-weight-bold"]).toBe("700")
    expect(result["--font-weight-medium"]).toBe("500")
    expect(result["--font-weight-regular"]).toBe("400")
    expect(typeof result["--font-weight-bold"]).toBe("string")
  })

  it("reflects a token override in the output", () => {
    const overridden = mergeTokens(defaultTokens, { color: { primary: "#ABC123" } as never })
    const result = tokensToCSSVariables(overridden)
    expect(result["--color-primary"]).toBe("#ABC123")
  })

  it("includes all expected variable names", () => {
    const result = tokensToCSSVariables(defaultTokens)
    const expectedKeys = [
      "--color-primary", "--color-secondary", "--color-background", "--color-surface",
      "--color-text-primary", "--color-text-secondary", "--color-border", "--color-error",
      "--radius-sm", "--radius-md", "--radius-lg",
      "--spacing-xs", "--spacing-sm", "--spacing-md", "--spacing-lg", "--spacing-xl",
      "--font-family",
      "--font-size-sm", "--font-size-md", "--font-size-lg", "--font-size-xl",
      "--font-weight-regular", "--font-weight-medium", "--font-weight-bold",
      "--shadow-sm", "--shadow-md"
    ]
    for (const key of expectedKeys) {
      expect(result).toHaveProperty(key)
    }
  })
})
