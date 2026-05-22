import type { AlignmentIssue, AlignmentReport } from "./types"

function makeReport(issues: AlignmentIssue[]): AlignmentReport {
  return { aligned: issues.length === 0, issues }
}

export function validateTokenComponentAlignment(
  tokenKeys: string[],
  componentTokenRefs: Record<string, string[]>
): AlignmentReport {
  const issues: AlignmentIssue[] = []
  const tokenSet = new Set(tokenKeys)
  for (const [component, refs] of Object.entries(componentTokenRefs)) {
    for (const ref of refs) {
      if (!tokenSet.has(ref)) {
        issues.push({
          layer: "token-component",
          code: "ALIGN_TOKEN_COMPONENT_MISSING",
          severity: "error",
          message: `Component "${component}" uses token "${ref}" that does not exist`,
        })
      }
    }
  }
  return makeReport(issues)
}

export function validateComponentMetadataAlignment(
  componentPropKeys: Record<string, string[]>,
  metadataPropKeys: Record<string, string[]>
): AlignmentReport {
  const issues: AlignmentIssue[] = []
  for (const [component, implProps] of Object.entries(componentPropKeys)) {
    const metaProps = new Set(metadataPropKeys[component] ?? [])
    for (const prop of implProps) {
      if (!metaProps.has(prop)) {
        issues.push({
          layer: "component-metadata",
          code: "ALIGN_COMPONENT_METADATA_MISSING",
          severity: "warning",
          message: `Component "${component}" has prop "${prop}" not documented in metadata`,
        })
      }
    }
  }
  return makeReport(issues)
}

export function validateMetadataContractAlignment(
  metadataPropKeys: Record<string, string[]>,
  contractPropKeys: Record<string, string[]>
): AlignmentReport {
  const issues: AlignmentIssue[] = []
  for (const [component, metaProps] of Object.entries(metadataPropKeys)) {
    const contractProps = new Set(contractPropKeys[component] ?? [])
    for (const prop of metaProps) {
      if (!contractProps.has(prop)) {
        issues.push({
          layer: "metadata-contract",
          code: "ALIGN_METADATA_CONTRACT_MISSING",
          severity: "error",
          message: `Metadata prop "${prop}" for "${component}" has no corresponding contract definition`,
        })
      }
    }
  }
  return makeReport(issues)
}

export function validateCrossSystemAlignment(input: {
  tokenKeys: string[]
  componentTokenRefs: Record<string, string[]>
  componentPropKeys: Record<string, string[]>
  metadataPropKeys: Record<string, string[]>
  contractPropKeys: Record<string, string[]>
}): AlignmentReport {
  const issues: AlignmentIssue[] = [
    ...validateTokenComponentAlignment(input.tokenKeys, input.componentTokenRefs).issues,
    ...validateComponentMetadataAlignment(input.componentPropKeys, input.metadataPropKeys).issues,
    ...validateMetadataContractAlignment(input.metadataPropKeys, input.contractPropKeys).issues,
  ]
  return makeReport(issues)
}
