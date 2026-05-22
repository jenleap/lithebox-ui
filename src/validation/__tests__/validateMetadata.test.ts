import { describe, it, expect } from "vitest"
import { validateMetadata } from "../validateMetadata"
import {
  LBX_METADATA_INCOMPLETE,
  LBX_METADATA_SCHEMA_INVALID,
  LBX_METADATA_CONTRACT_MISMATCH,
} from "../errorCodes"

describe("validateMetadata", () => {
  it("errors on missing name", () => {
    const result = validateMetadata({ metadata: { name: "" } })
    expect(result.valid).toBe(false)
    expect(result.errors[0].code).toBe(LBX_METADATA_INCOMPLETE)
  })

  it("errors on invalid prop type", () => {
    const result = validateMetadata({
      metadata: { name: "Button", props: { size: { type: "pixel" } } },
    })
    expect(result.valid).toBe(false)
    expect(result.errors[0].code).toBe(LBX_METADATA_SCHEMA_INVALID)
  })

  it("accepts valid prop types", () => {
    const result = validateMetadata({
      metadata: {
        name: "Button",
        props: {
          label: { type: "string", required: true },
          count: { type: "number" },
          active: { type: "boolean" },
        },
      },
    })
    expect(result.valid).toBe(true)
  })

  it("errors on duplicate slot names", () => {
    const result = validateMetadata({
      metadata: { name: "Card", slots: [{ name: "body" }, { name: "body" }] },
    })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_METADATA_SCHEMA_INVALID)).toBe(true)
  })

  it("warns on unknown component reference in allowedChildren", () => {
    const result = validateMetadata({
      metadata: { name: "ButtonGroup", allowedChildren: ["Ghost"] },
      knownComponents: ["Button"],
    })
    expect(result.valid).toBe(true)
    expect(result.warnings.some((w) => w.code === LBX_METADATA_CONTRACT_MISMATCH)).toBe(true)
  })

  it("no warnings when component references are known", () => {
    const result = validateMetadata({
      metadata: { name: "ButtonGroup", allowedChildren: ["Button"] },
      knownComponents: ["Button"],
    })
    expect(result.valid).toBe(true)
    expect(result.warnings).toHaveLength(0)
  })

  it("skips cross-reference check when knownComponents not provided", () => {
    const result = validateMetadata({
      metadata: { name: "ButtonGroup", allowedChildren: ["Anything"] },
    })
    expect(result.valid).toBe(true)
    expect(result.warnings).toHaveLength(0)
  })
})
