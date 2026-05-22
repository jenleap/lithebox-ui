import { describe, it, expect, afterEach } from "vitest"
import {
  registerGovernancePolicy,
  getPoliciesByCategory,
  getAllPolicies,
  evaluatePolicy,
  evaluatePoliciesByCategory,
  clearPolicyRegistry,
} from "../policySystem"
import type { GovernancePolicy } from "../types"

afterEach(() => {
  clearPolicyRegistry()
})

const failingPolicy: GovernancePolicy = {
  name: "strict-tokens",
  appliesTo: "token",
  rules: [
    { id: "p1", scope: "token", severity: "error", description: "always fails", validate: () => false },
  ],
}

const passingPolicy: GovernancePolicy = {
  name: "lenient-tokens",
  appliesTo: "token",
  rules: [
    { id: "p2", scope: "token", severity: "warning", description: "always passes", validate: () => true },
  ],
}

describe("policySystem", () => {
  it("registers and retrieves by category", () => {
    registerGovernancePolicy(failingPolicy, "structural")
    expect(getPoliciesByCategory("structural")).toHaveLength(1)
    expect(getPoliciesByCategory("semantic")).toHaveLength(0)
  })

  it("getAllPolicies returns all registered policies", () => {
    registerGovernancePolicy(failingPolicy, "structural")
    registerGovernancePolicy(passingPolicy, "semantic")
    expect(getAllPolicies()).toHaveLength(2)
  })

  it("evaluatePolicy returns violations for failing rules", () => {
    const violations = evaluatePolicy(failingPolicy, {})
    expect(violations).toHaveLength(1)
    expect(violations[0].ruleId).toBe("p1")
  })

  it("evaluatePolicy returns no violations for passing rules", () => {
    expect(evaluatePolicy(passingPolicy, {})).toHaveLength(0)
  })

  it("evaluatePoliciesByCategory aggregates violations across policies", () => {
    registerGovernancePolicy(failingPolicy, "structural")
    registerGovernancePolicy(
      { name: "p2", appliesTo: "token", rules: [{ id: "p3", scope: "token", severity: "error", description: "also fails", validate: () => false }] },
      "structural"
    )
    const violations = evaluatePoliciesByCategory("structural", {})
    expect(violations).toHaveLength(2)
  })

  it("clearPolicyRegistry empties the registry", () => {
    registerGovernancePolicy(failingPolicy, "structural")
    clearPolicyRegistry()
    expect(getAllPolicies()).toHaveLength(0)
  })
})
