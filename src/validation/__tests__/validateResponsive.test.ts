import { describe, it, expect } from "vitest"
import { validateResponsive } from "../validateResponsive"
import {
  LBX_RESPONSIVE_RULE_MISSING,
  LBX_RESPONSIVE_CONTRACT_INCOMPLETE,
} from "../errorCodes"

describe("validateResponsive", () => {
  it("errors when contract missing for rule-bound component", () => {
    const result = validateResponsive([], [{ component: "Sidebar", requiredBreakpoints: ["sm"] }])
    expect(result.valid).toBe(false)
    expect(result.errors[0].code).toBe(LBX_RESPONSIVE_CONTRACT_INCOMPLETE)
  })

  it("errors when required breakpoint missing from contract", () => {
    const result = validateResponsive(
      [{ component: "Sidebar", breakpoints: { lg: {} } }],
      [{ component: "Sidebar", requiredBreakpoints: ["sm", "lg"] }]
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_RESPONSIVE_RULE_MISSING)).toBe(true)
  })

  it("valid when all required breakpoints defined", () => {
    const result = validateResponsive(
      [{ component: "Sidebar", breakpoints: { sm: {}, lg: {} } }],
      [{ component: "Sidebar", requiredBreakpoints: ["sm", "lg"] }]
    )
    expect(result.valid).toBe(true)
  })

  it("errors when fallback is required but missing", () => {
    const result = validateResponsive(
      [{ component: "Nav", breakpoints: { sm: {} }, hasFallback: false }],
      [{ component: "Nav", requiresFallback: true }]
    )
    expect(result.errors.some((e) => e.code === LBX_RESPONSIVE_CONTRACT_INCOMPLETE)).toBe(true)
  })

  it("valid when fallback is provided", () => {
    const result = validateResponsive(
      [{ component: "Nav", breakpoints: { sm: {} }, hasFallback: true }],
      [{ component: "Nav", requiresFallback: true }]
    )
    expect(result.valid).toBe(true)
  })

  it("no-ops for components with contracts but no rules", () => {
    const result = validateResponsive(
      [{ component: "Box", breakpoints: {} }],
      []
    )
    expect(result.valid).toBe(true)
  })
})
