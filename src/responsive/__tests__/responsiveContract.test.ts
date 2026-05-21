import { describe, it, expect } from "vitest"
import { resolveResponsiveValue } from "../responsiveContract"

describe("resolveResponsiveValue", () => {
  it("returns exact match", () => {
    expect(resolveResponsiveValue({ md: "bar" }, "md")).toBe("bar")
  })

  it("falls back to smaller breakpoint", () => {
    expect(resolveResponsiveValue({ md: "bar" }, "lg")).toBe("bar")
  })

  it("returns undefined when no match at or below breakpoint", () => {
    expect(resolveResponsiveValue({ lg: "baz" }, "sm")).toBeUndefined()
  })

  it("falls back to sm when md has no value", () => {
    expect(resolveResponsiveValue({ sm: "a", lg: "b" }, "md")).toBe("a")
  })

  it("returns undefined for empty contract", () => {
    expect(resolveResponsiveValue({}, "md")).toBeUndefined()
  })

  it("returns xxl-exact match", () => {
    expect(resolveResponsiveValue({ xxl: "top" }, "xxl")).toBe("top")
  })

  it("falls back through multiple levels", () => {
    expect(resolveResponsiveValue({ sm: "base" }, "xxl")).toBe("base")
  })
})
