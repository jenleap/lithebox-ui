import { describe, it, expect } from "vitest"
import {
  validateTokenComponentAlignment,
  validateComponentMetadataAlignment,
  validateMetadataContractAlignment,
  validateCrossSystemAlignment,
} from "../alignmentRules"

const aligned = {
  tokenKeys: ["color.primary"],
  componentTokenRefs: { Button: ["color.primary"] },
  componentPropKeys: { Button: ["variant"] },
  metadataPropKeys: { Button: ["variant"] },
  contractPropKeys: { Button: ["variant"] },
}

describe("validateTokenComponentAlignment", () => {
  it("returns aligned for matching token refs", () => {
    const result = validateTokenComponentAlignment(["color.primary"], { Button: ["color.primary"] })
    expect(result.aligned).toBe(true)
  })

  it("returns issue for missing token", () => {
    const result = validateTokenComponentAlignment(["color.primary"], { Button: ["color.unknown"] })
    expect(result.aligned).toBe(false)
    expect(result.issues[0].code).toBe("ALIGN_TOKEN_COMPONENT_MISSING")
  })
})

describe("validateComponentMetadataAlignment", () => {
  it("returns aligned when all props documented", () => {
    const result = validateComponentMetadataAlignment({ Button: ["variant"] }, { Button: ["variant"] })
    expect(result.aligned).toBe(true)
  })

  it("returns warning for undocumented prop", () => {
    const result = validateComponentMetadataAlignment({ Button: ["variant", "ghost"] }, { Button: ["variant"] })
    expect(result.aligned).toBe(false)
    expect(result.issues[0].code).toBe("ALIGN_COMPONENT_METADATA_MISSING")
    expect(result.issues[0].severity).toBe("warning")
  })
})

describe("validateMetadataContractAlignment", () => {
  it("returns aligned when all metadata props in contract", () => {
    const result = validateMetadataContractAlignment({ Button: ["variant"] }, { Button: ["variant"] })
    expect(result.aligned).toBe(true)
  })

  it("returns error for metadata prop missing from contract", () => {
    const result = validateMetadataContractAlignment({ Button: ["variant"] }, { Button: [] })
    expect(result.aligned).toBe(false)
    expect(result.issues[0].code).toBe("ALIGN_METADATA_CONTRACT_MISSING")
    expect(result.issues[0].severity).toBe("error")
  })
})

describe("validateCrossSystemAlignment", () => {
  it("returns aligned for a fully aligned system", () => {
    const result = validateCrossSystemAlignment(aligned)
    expect(result.aligned).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  it("aggregates all alignment issues", () => {
    const result = validateCrossSystemAlignment({
      tokenKeys: ["color.primary"],
      componentTokenRefs: { Button: ["color.unknown"] },
      componentPropKeys: { Button: ["variant", "ghost"] },
      metadataPropKeys: { Button: ["variant"] },
      contractPropKeys: { Button: [] },
    })
    expect(result.aligned).toBe(false)
    const codes = result.issues.map(i => i.code)
    expect(codes).toContain("ALIGN_TOKEN_COMPONENT_MISSING")
    expect(codes).toContain("ALIGN_COMPONENT_METADATA_MISSING")
    expect(codes).toContain("ALIGN_METADATA_CONTRACT_MISSING")
  })
})
