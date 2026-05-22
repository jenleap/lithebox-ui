import type { IntegrityIssue, IntegrityReport } from "./types"

export type TokenSnapshot = {
  keys: string[]
}

export type ComponentSnapshot = {
  name: string
  tokenKeys: string[]
  contractKeys: string[]
}

export type MetadataSnapshot = {
  componentName: string
  propKeys: string[]
}

export type ContractSnapshot = {
  componentName: string
  propKeys: string[]
  slotKeys: string[]
}

function makeReport(issues: IntegrityIssue[]): IntegrityReport {
  return { valid: issues.length === 0, issues }
}

export function validateTokenIntegrity(snapshot: TokenSnapshot): IntegrityReport {
  const issues: IntegrityIssue[] = []
  const seen = new Set<string>()
  for (const key of snapshot.keys) {
    if (seen.has(key)) {
      issues.push({
        layer: "token",
        code: "TOKEN_DUPLICATE",
        severity: "error",
        message: `Duplicate token key: ${key}`,
      })
    }
    seen.add(key)
  }
  return makeReport(issues)
}

export function validateComponentIntegrity(
  snapshot: ComponentSnapshot,
  knownTokenKeys: string[]
): IntegrityReport {
  const issues: IntegrityIssue[] = []
  const tokenSet = new Set(knownTokenKeys)
  for (const key of snapshot.tokenKeys) {
    if (!tokenSet.has(key)) {
      issues.push({
        layer: "component",
        code: "COMPONENT_UNKNOWN_TOKEN",
        severity: "error",
        message: `Component "${snapshot.name}" references unknown token: ${key}`,
      })
    }
  }
  return makeReport(issues)
}

export function validateMetadataIntegrity(
  meta: MetadataSnapshot,
  componentPropKeys: string[]
): IntegrityReport {
  const issues: IntegrityIssue[] = []
  const propSet = new Set(componentPropKeys)
  for (const key of meta.propKeys) {
    if (!propSet.has(key)) {
      issues.push({
        layer: "metadata",
        code: "METADATA_UNKNOWN_PROP",
        severity: "warning",
        message: `Metadata for "${meta.componentName}" references unknown prop: ${key}`,
      })
    }
  }
  return makeReport(issues)
}

export function validateContractIntegrity(
  contract: ContractSnapshot,
  metaPropKeys: string[]
): IntegrityReport {
  const issues: IntegrityIssue[] = []
  const metaSet = new Set(metaPropKeys)
  for (const key of contract.propKeys) {
    if (!metaSet.has(key)) {
      issues.push({
        layer: "contract",
        code: "CONTRACT_PROP_MISMATCH",
        severity: "error",
        message: `Contract for "${contract.componentName}" has prop not in metadata: ${key}`,
      })
    }
  }
  return makeReport(issues)
}
