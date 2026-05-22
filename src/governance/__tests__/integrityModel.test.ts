import { describe, it, expect } from "vitest"
import {
  validateTokenIntegrity,
  validateComponentIntegrity,
  validateMetadataIntegrity,
  validateContractIntegrity,
} from "../integrityModel"

describe("validateTokenIntegrity", () => {
  it("returns valid for unique keys", () => {
    const result = validateTokenIntegrity({ keys: ["color.primary", "color.secondary"] })
    expect(result.valid).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  it("returns invalid for duplicate keys", () => {
    const result = validateTokenIntegrity({ keys: ["color.primary", "color.primary"] })
    expect(result.valid).toBe(false)
    expect(result.issues[0].code).toBe("TOKEN_DUPLICATE")
    expect(result.issues[0].severity).toBe("error")
  })
})

describe("validateComponentIntegrity", () => {
  it("returns valid when all token refs are known", () => {
    const result = validateComponentIntegrity(
      { name: "Button", tokenKeys: ["color.primary"], contractKeys: [] },
      ["color.primary", "color.secondary"]
    )
    expect(result.valid).toBe(true)
  })

  it("returns invalid for unknown token reference", () => {
    const result = validateComponentIntegrity(
      { name: "Button", tokenKeys: ["color.unknown"], contractKeys: [] },
      ["color.primary"]
    )
    expect(result.valid).toBe(false)
    expect(result.issues[0].code).toBe("COMPONENT_UNKNOWN_TOKEN")
  })
})

describe("validateMetadataIntegrity", () => {
  it("returns valid when all meta props are known", () => {
    const result = validateMetadataIntegrity(
      { componentName: "Button", propKeys: ["variant"] },
      ["variant", "size"]
    )
    expect(result.valid).toBe(true)
  })

  it("returns warning for unknown prop in metadata", () => {
    const result = validateMetadataIntegrity(
      { componentName: "Button", propKeys: ["ghost"] },
      ["variant"]
    )
    expect(result.valid).toBe(false)
    expect(result.issues[0].code).toBe("METADATA_UNKNOWN_PROP")
    expect(result.issues[0].severity).toBe("warning")
  })
})

describe("validateContractIntegrity", () => {
  it("returns valid when all contract props are in metadata", () => {
    const result = validateContractIntegrity(
      { componentName: "Button", propKeys: ["variant"], slotKeys: [] },
      ["variant", "size"]
    )
    expect(result.valid).toBe(true)
  })

  it("returns invalid for contract prop not in metadata", () => {
    const result = validateContractIntegrity(
      { componentName: "Button", propKeys: ["ghost"], slotKeys: [] },
      ["variant"]
    )
    expect(result.valid).toBe(false)
    expect(result.issues[0].code).toBe("CONTRACT_PROP_MISMATCH")
    expect(result.issues[0].severity).toBe("error")
  })
})
