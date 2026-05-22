import { describe, it, expect, afterEach } from "vitest"
import { runGovernancePipeline } from "../validationPipeline"
import { clearGovernanceRules, registerGovernanceRule } from "../rulesEngine"
import { clearClassificationRules } from "../changeClassification"
import type { GovernancePipelineInput } from "../validationPipeline"

afterEach(() => {
  clearGovernanceRules()
  clearClassificationRules()
})

const cleanInput: GovernancePipelineInput = {
  change: { id: "c1", description: "add color.accent", scope: "token" },
  driftInput: {
    tokenKeys: ["color.primary"],
    componentTokenRefs: { Button: ["color.primary"] },
    componentPropKeys: { Button: ["variant"] },
    metadataPropKeys: { Button: ["variant"] },
    contractPropKeys: { Button: ["variant"] },
  },
  alignmentInput: {
    tokenKeys: ["color.primary"],
    componentTokenRefs: { Button: ["color.primary"] },
    componentPropKeys: { Button: ["variant"] },
    metadataPropKeys: { Button: ["variant"] },
    contractPropKeys: { Button: ["variant"] },
  },
}

describe("runGovernancePipeline", () => {
  it("approves a clean system with no registered rules", () => {
    const result = runGovernancePipeline(cleanInput)
    expect(result.approved).toBe(true)
    expect(result.violations).toHaveLength(0)
    expect(result.driftReport.hasDrift).toBe(false)
    expect(result.alignmentReport.aligned).toBe(true)
  })

  it("rejects when a governance rule fails", () => {
    registerGovernanceRule({
      id: "r1",
      scope: "token",
      severity: "error",
      description: "always fails",
      validate: () => false,
    })
    const result = runGovernancePipeline(cleanInput)
    expect(result.approved).toBe(false)
    expect(result.violations.some(v => v.ruleId === "r1")).toBe(true)
  })

  it("rejects when drift is detected", () => {
    const result = runGovernancePipeline({
      ...cleanInput,
      driftInput: {
        ...cleanInput.driftInput,
        tokenKeys: ["color.primary", "color.primary"],
      },
    })
    expect(result.approved).toBe(false)
    expect(result.driftReport.hasDrift).toBe(true)
  })

  it("rejects when alignment fails", () => {
    const result = runGovernancePipeline({
      ...cleanInput,
      alignmentInput: {
        ...cleanInput.alignmentInput,
        componentTokenRefs: { Button: ["color.unknown"] },
      },
    })
    expect(result.approved).toBe(false)
    expect(result.alignmentReport.aligned).toBe(false)
  })

  it("approves when only warnings exist (no errors)", () => {
    registerGovernanceRule({
      id: "r-warn",
      scope: "token",
      severity: "warning",
      description: "just a warning",
      validate: () => false,
    })
    const result = runGovernancePipeline(cleanInput)
    expect(result.approved).toBe(true)
    expect(result.violations).toHaveLength(1)
    expect(result.violations[0].severity).toBe("warning")
  })

  it("classifies the change correctly", () => {
    const result = runGovernancePipeline({
      ...cleanInput,
      change: { id: "c1", description: "add color.accent", scope: "token" },
    })
    expect(result.classification).toBe("safe")
  })
})
