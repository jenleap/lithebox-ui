import type { CompatibilityReport, CompatibilityIssue } from "./types"

export type MetadataFieldRenameMap = Record<string, string>

export type MetadataCompatibilityOptions = {
  renames?: MetadataFieldRenameMap
}

export function validateMetadataCompatibility(
  previousFields: string[],
  currentFields: string[],
  options: MetadataCompatibilityOptions = {}
): CompatibilityReport {
  const issues: CompatibilityIssue[] = []
  const currentSet = new Set(currentFields)
  const renames = options.renames ?? {}

  for (const field of previousFields) {
    if (currentSet.has(field)) continue

    const renamed = renames[field]
    if (renamed && currentSet.has(renamed)) {
      issues.push({
        code: "LBX_METADATA_FIELD_RENAMED",
        severity: "warning",
        message: `Metadata field "${field}" was renamed to "${renamed}".`,
        layer: "metadata",
      })
    } else {
      issues.push({
        code: "LBX_METADATA_FIELD_REMOVED",
        severity: "error",
        message: `Metadata field "${field}" was removed. This is a breaking change requiring a major version increment.`,
        layer: "metadata",
      })
    }
  }

  const errors = issues.filter((i) => i.severity === "error")
  return { compatible: errors.length === 0, issues }
}
