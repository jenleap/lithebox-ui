import { describe, test, expect } from "vitest"
import { validateContractCompatibility } from "../contractCompatibility"
import type { ContractSnapshot } from "../contractCompatibility"

const base: ContractSnapshot = {
  props: [{ name: "variant", required: false }],
  slots: ["default"],
  allowedChildren: ["Text"],
}

describe("validateContractCompatibility", () => {
  test("returns compatible when contract is unchanged", () => {
    const result = validateContractCompatibility(base, base)
    expect(result.compatible).toBe(true)
    expect(result.issues).toHaveLength(0)
  })

  test("flags removed prop as error", () => {
    const curr: ContractSnapshot = { ...base, props: [] }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_CONTRACT_PROP_REMOVED")
    expect(result.issues[0].severity).toBe("error")
    expect(result.issues[0].layer).toBe("contracts")
  })

  test("flags newly required prop as error", () => {
    const curr: ContractSnapshot = {
      ...base,
      props: [...base.props, { name: "size", required: true }],
    }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_CONTRACT_PROP_REQUIRED_ADDED")
  })

  test("does not flag new optional prop as error", () => {
    const curr: ContractSnapshot = {
      ...base,
      props: [...base.props, { name: "size", required: false }],
    }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(true)
  })

  test("flags removed slot as error", () => {
    const curr: ContractSnapshot = { ...base, slots: [] }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_CONTRACT_SLOT_REMOVED")
  })

  test("does not flag added slot as error", () => {
    const curr: ContractSnapshot = { ...base, slots: ["default", "footer"] }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(true)
  })

  test("flags removed allowed child as error", () => {
    const curr: ContractSnapshot = { ...base, allowedChildren: [] }
    const result = validateContractCompatibility(base, curr)
    expect(result.compatible).toBe(false)
    expect(result.issues[0].code).toBe("LBX_CONTRACT_CHILD_REMOVED")
  })

  test("reports multiple issues when multiple breaking changes detected", () => {
    const curr: ContractSnapshot = { props: [], slots: [], allowedChildren: [] }
    const result = validateContractCompatibility(base, curr)
    expect(result.issues.length).toBeGreaterThan(1)
    expect(result.compatible).toBe(false)
  })
})
