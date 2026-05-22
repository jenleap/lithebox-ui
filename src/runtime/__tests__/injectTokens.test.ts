import { injectTokens } from "../injectTokens"
import { defaultTokens } from "../../tokens/defaultTokens"

describe("injectTokens", () => {
  afterEach(() => {
    document.documentElement.style.cssText = ""
  })

  it("injects CSS variables on document.documentElement", () => {
    injectTokens(defaultTokens)
    expect(
      document.documentElement.style.getPropertyValue("--color-primary")
    ).toBeTruthy()
  })

  it("cleanup removes injected CSS variables", () => {
    const cleanup = injectTokens(defaultTokens)
    cleanup()
    expect(
      document.documentElement.style.getPropertyValue("--color-primary")
    ).toBe("")
  })
})
