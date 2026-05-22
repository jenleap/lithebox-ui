import type { DriftIssue, DriftReport } from "./types"

export type DriftScanInput = {
  tokenKeys: string[]
  componentTokenRefs: Record<string, string[]>
  metadataPropKeys: Record<string, string[]>
  componentPropKeys: Record<string, string[]>
  contractPropKeys: Record<string, string[]>
}

function makeReport(issues: DriftIssue[]): DriftReport {
  return { hasDrift: issues.length > 0, issues }
}

export function detectTokenDrift(tokenKeys: string[]): DriftIssue[] {
  const issues: DriftIssue[] = []
  const seen = new Set<string>()
  for (const key of tokenKeys) {
    if (seen.has(key)) {
      issues.push({
        type: "token",
        code: "TOKEN_DRIFT_DUPLICATE",
        severity: "error",
        message: `Duplicate token detected: ${key}`,
      })
    }
    seen.add(key)
  }
  return issues
}

export function detectComponentDrift(
  componentTokenRefs: Record<string, string[]>,
  tokenKeys: string[]
): DriftIssue[] {
  const issues: DriftIssue[] = []
  const tokenSet = new Set(tokenKeys)
  for (const [component, refs] of Object.entries(componentTokenRefs)) {
    for (const ref of refs) {
      if (!tokenSet.has(ref)) {
        issues.push({
          type: "component",
          code: "COMPONENT_DRIFT_UNKNOWN_TOKEN",
          severity: "error",
          message: `Component "${component}" references unknown token "${ref}"`,
        })
      }
    }
  }
  return issues
}

export function detectMetadataDrift(
  metadataPropKeys: Record<string, string[]>,
  componentPropKeys: Record<string, string[]>
): DriftIssue[] {
  const issues: DriftIssue[] = []
  for (const [component, metaProps] of Object.entries(metadataPropKeys)) {
    const implProps = new Set(componentPropKeys[component] ?? [])
    for (const prop of metaProps) {
      if (!implProps.has(prop)) {
        issues.push({
          type: "metadata",
          code: "METADATA_DRIFT_PROP_MISMATCH",
          severity: "warning",
          message: `Metadata for "${component}" has prop "${prop}" not found in implementation`,
        })
      }
    }
  }
  return issues
}

export function detectContractDrift(
  contractPropKeys: Record<string, string[]>,
  metadataPropKeys: Record<string, string[]>
): DriftIssue[] {
  const issues: DriftIssue[] = []
  for (const [component, contractProps] of Object.entries(contractPropKeys)) {
    const metaProps = new Set(metadataPropKeys[component] ?? [])
    for (const prop of contractProps) {
      if (!metaProps.has(prop)) {
        issues.push({
          type: "contract",
          code: "CONTRACT_DRIFT_PROP_MISMATCH",
          severity: "error",
          message: `Contract for "${component}" has prop "${prop}" not in metadata`,
        })
      }
    }
  }
  return issues
}

export function scanForDrift(input: DriftScanInput): DriftReport {
  const issues: DriftIssue[] = [
    ...detectTokenDrift(input.tokenKeys),
    ...detectComponentDrift(input.componentTokenRefs, input.tokenKeys),
    ...detectMetadataDrift(input.metadataPropKeys, input.componentPropKeys),
    ...detectContractDrift(input.contractPropKeys, input.metadataPropKeys),
  ]
  return makeReport(issues)
}
