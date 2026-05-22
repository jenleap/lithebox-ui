import { describe, it, expect } from "vitest"
import { validateSlots } from "../validateSlots"
import {
  LBX_SLOT_REQUIRED,
  LBX_INVALID_SLOT_CHILD,
  LBX_SLOT_CARDINALITY,
} from "../errorCodes"

const baseInput = {
  componentName: "Card",
  slotDefinitions: [
    { name: "header", required: false },
    { name: "body", required: true },
    { name: "footer", required: false, allowedComponents: ["Button", "Link"], maxItems: 2 },
  ],
}

describe("validateSlots", () => {
  it("errors on missing required slot", () => {
    const result = validateSlots({ ...baseInput, assignments: [] })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_SLOT_REQUIRED)).toBe(true)
  })

  it("valid when required slot is filled", () => {
    const result = validateSlots({
      ...baseInput,
      assignments: [{ slotName: "body", children: ["Text"] }],
    })
    expect(result.valid).toBe(true)
  })

  it("valid when optional slot is empty", () => {
    const result = validateSlots({
      ...baseInput,
      assignments: [{ slotName: "body", children: ["Text"] }],
    })
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it("errors on invalid slot child", () => {
    const result = validateSlots({
      ...baseInput,
      assignments: [
        { slotName: "body", children: ["Text"] },
        { slotName: "footer", children: ["Modal"] },
      ],
    })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_INVALID_SLOT_CHILD)).toBe(true)
  })

  it("errors on slot cardinality exceeded", () => {
    const result = validateSlots({
      ...baseInput,
      assignments: [
        { slotName: "body", children: ["Text"] },
        { slotName: "footer", children: ["Button", "Link", "Button"] },
      ],
    })
    expect(result.errors.some((e) => e.code === LBX_SLOT_CARDINALITY)).toBe(true)
  })

  it("valid with allowed slot children within cardinality", () => {
    const result = validateSlots({
      ...baseInput,
      assignments: [
        { slotName: "body", children: ["Text"] },
        { slotName: "footer", children: ["Button", "Link"] },
      ],
    })
    expect(result.valid).toBe(true)
  })
})
