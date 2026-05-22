import type { DriftReport } from "../governance/types"
import type { SystemHealthSnapshot } from "./types"

export type SystemHealthInput = {
  driftReport: DriftReport
  contractViolationCount: number
  metadataWarningCount: number
}

export function buildSystemHealthSnapshot(input: SystemHealthInput): SystemHealthSnapshot {
  return {
    driftDetected: input.driftReport.hasDrift,
    contractViolations: input.contractViolationCount,
    metadataWarnings: input.metadataWarningCount,
  }
}

export function isSystemHealthy(snapshot: SystemHealthSnapshot): boolean {
  return (
    !snapshot.driftDetected &&
    snapshot.contractViolations === 0 &&
    snapshot.metadataWarnings === 0
  )
}

export function getSystemHealthSummary(snapshot: SystemHealthSnapshot): {
  status: "healthy" | "degraded" | "critical"
  reasons: string[]
} {
  const reasons: string[] = []

  if (snapshot.driftDetected) reasons.push("drift detected")
  if (snapshot.contractViolations > 0)
    reasons.push(`${snapshot.contractViolations} contract violation(s)`)
  if (snapshot.metadataWarnings > 0)
    reasons.push(`${snapshot.metadataWarnings} metadata warning(s)`)

  const status =
    snapshot.contractViolations > 0 || snapshot.driftDetected
      ? "critical"
      : snapshot.metadataWarnings > 0
      ? "degraded"
      : "healthy"

  return { status, reasons }
}
