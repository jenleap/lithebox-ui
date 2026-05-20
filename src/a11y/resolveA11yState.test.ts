import { describe, it, expect } from "vitest"
import { resolveA11yState } from "./resolveA11yState"

describe("resolveA11yState", () => {
  it("returns empty object for empty input", () => {
    expect(resolveA11yState({})).toEqual({})
  })

  it("disabled: sets aria-disabled and tabIndex -1", () => {
    expect(resolveA11yState({ disabled: true })).toEqual({
      "aria-disabled": true,
      tabIndex: -1,
    })
  })

  it("loading: sets aria-busy and tabIndex -1", () => {
    expect(resolveA11yState({ loading: true })).toEqual({
      "aria-busy": true,
      tabIndex: -1,
    })
  })

  it("error: sets aria-invalid", () => {
    expect(resolveA11yState({ error: true })).toEqual({
      "aria-invalid": true,
    })
  })

  it("readOnly: sets aria-readonly", () => {
    expect(resolveA11yState({ readOnly: true })).toEqual({
      "aria-readonly": true,
    })
  })

  it("disabled + error: merges both sets of props", () => {
    const result = resolveA11yState({ disabled: true, error: true })
    expect(result["aria-disabled"]).toBe(true)
    expect(result["aria-invalid"]).toBe(true)
    expect(result.tabIndex).toBe(-1)
  })

  it("disabled + loading: tabIndex is -1 from either", () => {
    const result = resolveA11yState({ disabled: true, loading: true })
    expect(result.tabIndex).toBe(-1)
    expect(result["aria-disabled"]).toBe(true)
    expect(result["aria-busy"]).toBe(true)
  })

  it("all false/undefined: returns empty object", () => {
    expect(resolveA11yState({ disabled: false, loading: false, error: false, readOnly: false })).toEqual({})
  })
})
