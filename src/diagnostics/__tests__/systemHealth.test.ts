import { describe, it, expect } from "vitest"
import { buildSystemHealthSnapshot, isSystemHealthy, getSystemHealthSummary } from "../systemHealth"

const clean = {
  driftReport: { hasDrift: false, issues: [] },
  contractViolationCount: 0,
  metadataWarningCount: 0,
}

describe("buildSystemHealthSnapshot", () => {
  it("maps all fields correctly", () => {
    const snap = buildSystemHealthSnapshot(clean)
    expect(snap.driftDetected).toBe(false)
    expect(snap.contractViolations).toBe(0)
    expect(snap.metadataWarnings).toBe(0)
  })

  it("maps drift hasDrift to driftDetected", () => {
    const snap = buildSystemHealthSnapshot({
      ...clean,
      driftReport: { hasDrift: true, issues: [] },
    })
    expect(snap.driftDetected).toBe(true)
  })

  it("maps contractViolationCount to contractViolations", () => {
    const snap = buildSystemHealthSnapshot({ ...clean, contractViolationCount: 3 })
    expect(snap.contractViolations).toBe(3)
  })
})

describe("isSystemHealthy", () => {
  it("returns true when all signals are clean", () => {
    expect(isSystemHealthy(buildSystemHealthSnapshot(clean))).toBe(true)
  })

  it("returns false when drift detected", () => {
    const snap = buildSystemHealthSnapshot({
      ...clean,
      driftReport: { hasDrift: true, issues: [] },
    })
    expect(isSystemHealthy(snap)).toBe(false)
  })

  it("returns false when contract violations exist", () => {
    expect(isSystemHealthy(buildSystemHealthSnapshot({ ...clean, contractViolationCount: 1 }))).toBe(false)
  })

  it("returns false when metadata warnings exist", () => {
    expect(isSystemHealthy(buildSystemHealthSnapshot({ ...clean, metadataWarningCount: 1 }))).toBe(false)
  })
})

describe("getSystemHealthSummary", () => {
  it("returns healthy when clean", () => {
    const { status, reasons } = getSystemHealthSummary(buildSystemHealthSnapshot(clean))
    expect(status).toBe("healthy")
    expect(reasons).toHaveLength(0)
  })

  it("returns critical when drift detected", () => {
    const snap = buildSystemHealthSnapshot({ ...clean, driftReport: { hasDrift: true, issues: [] } })
    expect(getSystemHealthSummary(snap).status).toBe("critical")
  })

  it("returns critical when contract violations exist", () => {
    const snap = buildSystemHealthSnapshot({ ...clean, contractViolationCount: 2 })
    const summary = getSystemHealthSummary(snap)
    expect(summary.status).toBe("critical")
    expect(summary.reasons).toContain("2 contract violation(s)")
  })

  it("returns degraded when only metadata warnings exist", () => {
    const snap = buildSystemHealthSnapshot({ ...clean, metadataWarningCount: 3 })
    const summary = getSystemHealthSummary(snap)
    expect(summary.status).toBe("degraded")
    expect(summary.reasons).toContain("3 metadata warning(s)")
  })
})
