import { describe, test, expect } from "vitest"
import { validateMetadataCompatibility } from "../metadataCompatibility"

describe("validateMetadataCompatibility", () => {
  test("returns compatible when fields are unchanged", () => {
    const result = validateMetadataCompatibility(["name", "category"], ["name", "category"])
    expect(result.compatible).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  test("returns compatible when current has additional fields", () => {
    const result = validateMetadataCompatibility(["name"], ["name", "description"])
    expect(result.compatible).toBe(true)
  })

  test("returns error when field is removed without rename", () => {
    const result = validateMetadataCompatibility(["name", "category"], ["name"])
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_METADATA_FIELD_REMOVED")
    expect(result.issues[0].severity).toBe("error")
    expect(result.issues[0].layer).toBe("metadata")
  })

  test("returns warning when field is renamed with declared rename", () => {
    const result = validateMetadataCompatibility(
      ["label"],
      ["displayName"],
      { renames: { label: "displayName" } }
    )
    expect(result.compatible).toBe(true)
    expect(result.issues[0].code).toBe("LBX_METADATA_FIELD_RENAMED")
    expect(result.issues[0].severity).toBe("warning")
  })

  test("returns error when rename target does not exist in current", () => {
    const result = validateMetadataCompatibility(
      ["oldField"],
      ["otherField"],
      { renames: { oldField: "newField" } }
    )
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_METADATA_FIELD_REMOVED")
  })
})
