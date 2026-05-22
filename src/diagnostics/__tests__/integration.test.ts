import { describe, it, expect } from "vitest"
import { buildFullIntrospectionSnapshot } from "../integration"
import type { DiagnosticsInput } from "../integration"
import type { ComponentMetadata } from "../../metadata/types"

const makeMeta = (name: string): ComponentMetadata => ({
  name,
  category: "display",
  description: name,
  props: {},
  composition: {},
  version: "1.0.0",
})

const input: DiagnosticsInput = {
  componentTree: { id: "root", type: "Box", props: { pad: "md" } },
  tokens: [{ key: "color.bg", value: "#fff", source: "default", path: ["color", "bg"] }],
  theme: { mode: "light", systemPreference: "light", overridden: false },
  validation: { valid: true, errors: [], warnings: [] },
  metadataRegistry: { Button: makeMeta("Button") },
  systemHealth: {
    driftReport: { hasDrift: false, issues: [] },
    contractViolationCount: 0,
    metadataWarningCount: 0,
  },
}

describe("buildFullIntrospectionSnapshot", () => {
  it("assembles a complete IntrospectionSnapshot", () => {
    const snap = buildFullIntrospectionSnapshot(input)
    expect(snap.components.id).toBe("root")
    expect(snap.components.type).toBe("Box")
    expect(snap.tokens.tokens["color.bg"].value).toBe("#fff")
    expect(snap.theme.mode).toBe("light")
    expect(snap.validation.valid).toBe(true)
    expect(snap.metadata.components).toHaveProperty("Button")
    expect(snap.system.driftDetected).toBe(false)
  })

  it("propagates validation issues", () => {
    const inputWithErrors: DiagnosticsInput = {
      ...input,
      validation: {
        valid: false,
        errors: [{ code: "E1", severity: "error", message: "bad", component: "Box" }],
        warnings: [],
      },
    }
    const snap = buildFullIntrospectionSnapshot(inputWithErrors)
    expect(snap.validation.valid).toBe(false)
    expect(snap.validation.issues).toHaveLength(1)
  })

  it("propagates system health signals", () => {
    const inputWithDrift: DiagnosticsInput = {
      ...input,
      systemHealth: {
        driftReport: { hasDrift: true, issues: [] },
        contractViolationCount: 1,
        metadataWarningCount: 0,
      },
    }
    const snap = buildFullIntrospectionSnapshot(inputWithDrift)
    expect(snap.system.driftDetected).toBe(true)
    expect(snap.system.contractViolations).toBe(1)
  })
})
