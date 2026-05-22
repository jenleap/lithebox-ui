import { describe, it, expect } from "vitest"
import {
  buildValidationSnapshot,
  filterSnapshotByComponent,
  filterSnapshotBySeverity,
} from "../validationIntrospection"
import type { ValidationResult } from "../../validation/types"

const makeResult = (overrides: Partial<ValidationResult> = {}): ValidationResult => ({
  valid: true,
  errors: [],
  warnings: [],
  ...overrides,
})

describe("buildValidationSnapshot", () => {
  it("returns valid:true with no issues for a clean result", () => {
    const snap = buildValidationSnapshot(makeResult())
    expect(snap.valid).toBe(true)
    expect(snap.issues).toHaveLength(0)
  })

  it("merges errors and warnings into issues", () => {
    const result = makeResult({
      valid: false,
      errors: [{ code: "E1", severity: "error", message: "err", component: "Button" }],
      warnings: [{ code: "W1", severity: "warning", message: "warn", component: "Card" }],
    })
    const snap = buildValidationSnapshot(result)
    expect(snap.valid).toBe(false)
    expect(snap.issues).toHaveLength(2)
  })

  it("uses defaultComponent fallback when component is missing", () => {
    const result = makeResult({
      valid: false,
      errors: [{ code: "E1", severity: "error", message: "err" }],
    })
    const snap = buildValidationSnapshot(result, "Fallback")
    expect(snap.issues[0].component).toBe("Fallback")
  })

  it("uses 'unknown' as default fallback component", () => {
    const result = makeResult({
      valid: false,
      errors: [{ code: "E1", severity: "error", message: "err" }],
    })
    const snap = buildValidationSnapshot(result)
    expect(snap.issues[0].component).toBe("unknown")
  })
})

describe("filterSnapshotByComponent", () => {
  it("returns only issues for the specified component", () => {
    const result = makeResult({
      valid: false,
      errors: [
        { code: "E1", severity: "error", message: "a", component: "A" },
        { code: "E2", severity: "error", message: "b", component: "B" },
      ],
    })
    const snap = buildValidationSnapshot(result)
    const filtered = filterSnapshotByComponent(snap, "A")
    expect(filtered).toHaveLength(1)
    expect(filtered[0].component).toBe("A")
  })

  it("returns empty array when no issues match", () => {
    const result = makeResult({
      errors: [{ code: "E1", severity: "error", message: "a", component: "A" }],
    })
    const snap = buildValidationSnapshot(result)
    expect(filterSnapshotByComponent(snap, "Z")).toHaveLength(0)
  })
})

describe("filterSnapshotBySeverity", () => {
  it("filters to only error-severity issues", () => {
    const result = makeResult({
      valid: false,
      errors: [{ code: "E1", severity: "error", message: "e", component: "X" }],
      warnings: [{ code: "W1", severity: "warning", message: "w", component: "X" }],
    })
    const snap = buildValidationSnapshot(result)
    expect(filterSnapshotBySeverity(snap, "error")).toHaveLength(1)
    expect(filterSnapshotBySeverity(snap, "warning")).toHaveLength(1)
  })
})
