import type { SystemVersion, VersioningMode, CompatibilityReport } from "./types"
import { getSystemVersion } from "./versionRegistry"
import { detectVersionMismatch } from "./migrationEngine"

export type RuntimeVersionCheckResult = {
  mismatches: Partial<Record<keyof SystemVersion, boolean>>
  anyMismatch: boolean
}

export function checkRuntimeVersions(
  expected: SystemVersion,
  mode: VersioningMode = "development"
): RuntimeVersionCheckResult {
  const current = getSystemVersion()
  const layers = Object.keys(expected) as (keyof SystemVersion)[]
  const mismatches: Partial<Record<keyof SystemVersion, boolean>> = {}
  let anyMismatch = false

  for (const layer of layers) {
    const mismatch = detectVersionMismatch(current[layer], expected[layer])
    if (mismatch) {
      mismatches[layer] = true
      anyMismatch = true

      if (mode === "development") {
        console.warn(
          `[LBX version] Subsystem "${layer}" mismatch: running ${current[layer]}, expected ${expected[layer]}.`
        )
      }
    }
  }

  return { mismatches, anyMismatch }
}

export function runCompatibilityGuard(
  report: CompatibilityReport,
  mode: VersioningMode = "development"
): void {
  if (report.compatible) return
  if (mode !== "development") return

  for (const issue of report.issues) {
    if (issue.severity === "error") {
      console.error(`[LBX compat] ${issue.code}: ${issue.message}`)
    } else {
      console.warn(`[LBX compat] ${issue.code}: ${issue.message}`)
    }
  }
}
