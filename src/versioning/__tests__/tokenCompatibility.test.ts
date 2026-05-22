import { describe, test, expect } from "vitest"
import { validateTokenCompatibility } from "../tokenCompatibility"

describe("validateTokenCompatibility", () => {
  test("returns compatible when token sets are identical", () => {
    const result = validateTokenCompatibility(["color.primary"], ["color.primary"])
    expect(result.compatible).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  test("returns compatible when current has more tokens than previous", () => {
    const result = validateTokenCompatibility(["color.primary"], ["color.primary", "color.secondary"])
    expect(result.compatible).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  test("returns error when token is removed without rename", () => {
    const result = validateTokenCompatibility(["color.primary"], [])
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_TOKEN_REMOVED")
    expect(result.issues[0].severity).toBe("error")
    expect(result.issues[0].layer).toBe("tokens")
  })

  test("returns warning (not error) when token is renamed with declared rename", () => {
    const result = validateTokenCompatibility(
      ["color.backgroundPrimary"],
      ["color.surface.primary"],
      { renames: { "color.backgroundPrimary": "color.surface.primary" } }
    )
    expect(result.compatible).toBe(true)
    expect(result.issues[0].code).toBe("LBX_TOKEN_RENAMED")
    expect(result.issues[0].severity).toBe("warning")
  })

  test("returns error when rename target does not exist in current", () => {
    const result = validateTokenCompatibility(
      ["color.old"],
      ["color.other"],
      { renames: { "color.old": "color.new" } }
    )
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_TOKEN_REMOVED")
  })

  test("reports multiple issues when multiple tokens are affected", () => {
    const result = validateTokenCompatibility(["a", "b", "c"], [])
    expect(result.issues).toHaveLength(3)
    expect(result.compatible).toBe(false)
  })
})
