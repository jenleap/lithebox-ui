import { describe, it, expect, afterEach } from "vitest"
import {
  registerGovernanceRule,
  getGovernanceRules,
  getRulesByScope,
  runGovernanceRules,
  clearGovernanceRules,
} from "../rulesEngine"

afterEach(() => {
  clearGovernanceRules()
})

describe("rulesEngine", () => {
  it("registers a rule and retrieves it", () => {
    registerGovernanceRule({
      id: "r1",
      scope: "token",
      severity: "error",
      description: "test rule",
      validate: () => true,
    })
    expect(getGovernanceRules()).toHaveLength(1)
  })

  it("getRulesByScope returns only matching scope", () => {
    registerGovernanceRule({ id: "r1", scope: "token", severity: "error", description: "d1", validate: () => true })
    registerGovernanceRule({ id: "r2", scope: "component", severity: "warning", description: "d2", validate: () => true })
    expect(getRulesByScope("token")).toHaveLength(1)
    expect(getRulesByScope("component")).toHaveLength(1)
    expect(getRulesByScope("metadata")).toHaveLength(0)
  })

  it("runGovernanceRules returns a violation for a failing rule", () => {
    registerGovernanceRule({
      id: "r-fail",
      scope: "token",
      severity: "error",
      description: "always fails",
      validate: () => false,
    })
    const violations = runGovernanceRules("token", {})
    expect(violations).toHaveLength(1)
    expect(violations[0].ruleId).toBe("r-fail")
    expect(violations[0].severity).toBe("error")
  })

  it("runGovernanceRules emits no violation for a passing rule", () => {
    registerGovernanceRule({
      id: "r-pass",
      scope: "token",
      severity: "error",
      description: "always passes",
      validate: () => true,
    })
    expect(runGovernanceRules("token", {})).toHaveLength(0)
  })

  it("clearGovernanceRules empties the registry", () => {
    registerGovernanceRule({ id: "r1", scope: "token", severity: "error", description: "d", validate: () => true })
    clearGovernanceRules()
    expect(getGovernanceRules()).toHaveLength(0)
  })
})
