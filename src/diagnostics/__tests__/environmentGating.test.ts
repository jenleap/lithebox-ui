import { describe, it, expect, vi } from "vitest"
import { isIntrospectionEnabled, guardIntrospection } from "../environmentGating"

describe("isIntrospectionEnabled", () => {
  it("returns true in development", () => {
    expect(isIntrospectionEnabled("development")).toBe(true)
  })

  it("returns false in production", () => {
    expect(isIntrospectionEnabled("production")).toBe(false)
  })
})

describe("guardIntrospection", () => {
  it("calls produce and returns its result in development", () => {
    const result = guardIntrospection("development", () => "real", "fallback")
    expect(result).toBe("real")
  })

  it("returns fallback in production without calling produce", () => {
    const produce = vi.fn(() => "real")
    const result = guardIntrospection("production", produce, "fallback")
    expect(result).toBe("fallback")
    expect(produce).not.toHaveBeenCalled()
  })

  it("works with non-string types", () => {
    const result = guardIntrospection("development", () => ({ count: 42 }), { count: 0 })
    expect(result).toEqual({ count: 42 })
  })
})
