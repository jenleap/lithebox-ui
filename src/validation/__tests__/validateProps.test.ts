import { describe, it, expect } from "vitest"
import { validateProps } from "../validateProps"
import {
  LBX_PROP_REQUIRED,
  LBX_INVALID_VARIANT,
  LBX_INVALID_PROP_TYPE,
  LBX_UNKNOWN_PROP,
} from "../errorCodes"

const schema = {
  componentName: "Button",
  props: {
    label: { required: true, type: "string" as const },
    variant: { allowedValues: ["primary", "secondary"] as const },
    disabled: { type: "boolean" as const },
  },
}

describe("validateProps", () => {
  it("returns valid when all required props are present", () => {
    const result = validateProps(schema, { label: "Click me" })
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it("errors on missing required prop", () => {
    const result = validateProps(schema, {})
    expect(result.valid).toBe(false)
    expect(result.errors[0].code).toBe(LBX_PROP_REQUIRED)
  })

  it("errors on invalid variant", () => {
    const result = validateProps(schema, { label: "x", variant: "ghost" })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_INVALID_VARIANT)).toBe(true)
  })

  it("errors on wrong prop type", () => {
    const result = validateProps(schema, { label: "x", disabled: "yes" })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_INVALID_PROP_TYPE)).toBe(true)
  })

  it("warns on unknown prop", () => {
    const result = validateProps(schema, { label: "x", mystery: true })
    expect(result.valid).toBe(true)
    expect(result.warnings.some((w) => w.code === LBX_UNKNOWN_PROP)).toBe(true)
  })

  it("does not error on valid variant", () => {
    const result = validateProps(schema, { label: "x", variant: "primary" })
    expect(result.valid).toBe(true)
  })

  it("does not type-check undefined optional props", () => {
    const result = validateProps(schema, { label: "x", disabled: undefined })
    expect(result.valid).toBe(true)
  })
})
