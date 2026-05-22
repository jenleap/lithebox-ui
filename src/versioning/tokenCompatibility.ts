import type { CompatibilityReport, CompatibilityIssue } from "./types"

export type TokenRenameMap = Record<string, string>

export type TokenCompatibilityOptions = {
  renames?: TokenRenameMap
}

export function validateTokenCompatibility(
  previousKeys: string[],
  currentKeys: string[],
  options: TokenCompatibilityOptions = {}
): CompatibilityReport {
  const issues: CompatibilityIssue[] = []
  const currentSet = new Set(currentKeys)
  const renames = options.renames ?? {}

  for (const key of previousKeys) {
    if (currentSet.has(key)) continue

    const renamed = renames[key]
    if (renamed && currentSet.has(renamed)) {
      issues.push({
        code: "LBX_TOKEN_RENAMED",
        severity: "warning",
        message: `Token "${key}" was renamed to "${renamed}".`,
        layer: "tokens",
      })
    } else {
      issues.push({
        code: "LBX_TOKEN_REMOVED",
        severity: "error",
        message: `Token "${key}" was removed. This is a breaking change.`,
        layer: "tokens",
      })
    }
  }

  const errors = issues.filter((i) => i.severity === "error")
  return { compatible: errors.length === 0, issues }
}
