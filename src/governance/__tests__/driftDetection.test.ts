import { describe, it, expect } from "vitest"
import { scanForDrift, detectTokenDrift, detectComponentDrift, detectMetadataDrift, detectContractDrift } from "../driftDetection"

const cleanInput = {
  tokenKeys: ["color.primary"],
  componentTokenRefs: { Button: ["color.primary"] },
  componentPropKeys: { Button: ["variant"] },
  metadataPropKeys: { Button: ["variant"] },
  contractPropKeys: { Button: ["variant"] },
}

describe("scanForDrift", () => {
  it("returns hasDrift false for a clean system", () => {
    const result = scanForDrift(cleanInput)
    expect(result.hasDrift).toBe(false)
    expect(result.issues).toHaveLength(0)
  })

  it("detects duplicate token keys", () => {
    const result = scanForDrift({ ...cleanInput, tokenKeys: ["color.primary", "color.primary"] })
    expect(result.hasDrift).toBe(true)
    expect(result.issues.some(i => i.code === "TOKEN_DRIFT_DUPLICATE")).toBe(true)
  })

  it("detects component referencing unknown token", () => {
    const result = scanForDrift({
      ...cleanInput,
      componentTokenRefs: { Button: ["color.unknown"] },
    })
    expect(result.hasDrift).toBe(true)
    expect(result.issues.some(i => i.code === "COMPONENT_DRIFT_UNKNOWN_TOKEN")).toBe(true)
  })

  it("detects metadata prop not in component", () => {
    const result = scanForDrift({
      ...cleanInput,
      metadataPropKeys: { Button: ["ghost"] },
      componentPropKeys: { Button: ["variant"] },
    })
    expect(result.hasDrift).toBe(true)
    expect(result.issues.some(i => i.code === "METADATA_DRIFT_PROP_MISMATCH")).toBe(true)
  })

  it("detects contract prop not in metadata", () => {
    const result = scanForDrift({
      ...cleanInput,
      contractPropKeys: { Button: ["ghost"] },
      metadataPropKeys: { Button: ["variant"] },
    })
    expect(result.hasDrift).toBe(true)
    expect(result.issues.some(i => i.code === "CONTRACT_DRIFT_PROP_MISMATCH")).toBe(true)
  })
})

describe("detectTokenDrift", () => {
  it("returns no issues for unique tokens", () => {
    expect(detectTokenDrift(["a", "b"])).toHaveLength(0)
  })

  it("returns issue for duplicate token", () => {
    const issues = detectTokenDrift(["a", "a"])
    expect(issues).toHaveLength(1)
    expect(issues[0].type).toBe("token")
  })
})

describe("detectComponentDrift", () => {
  it("returns no issues when refs are known", () => {
    expect(detectComponentDrift({ Button: ["a"] }, ["a"])).toHaveLength(0)
  })

  it("returns issue for unknown token ref", () => {
    const issues = detectComponentDrift({ Button: ["x"] }, ["a"])
    expect(issues[0].code).toBe("COMPONENT_DRIFT_UNKNOWN_TOKEN")
  })
})

describe("detectMetadataDrift", () => {
  it("returns warning for prop not in component", () => {
    const issues = detectMetadataDrift({ Button: ["ghost"] }, { Button: ["variant"] })
    expect(issues[0].severity).toBe("warning")
  })
})

describe("detectContractDrift", () => {
  it("returns error for contract prop not in metadata", () => {
    const issues = detectContractDrift({ Button: ["ghost"] }, { Button: ["variant"] })
    expect(issues[0].severity).toBe("error")
  })
})
