import type { DriftScanInput } from "./driftDetection"
import type { GovernancePipelineInput } from "./validationPipeline"
import type { SystemChange } from "./types"
import { getSystemVersion } from "../versioning/versionRegistry"
import { getGovernanceRules } from "./rulesEngine"

export type GovernanceSystemSnapshot = {
  tokenKeys: string[]
  componentTokenRefs: Record<string, string[]>
  componentPropKeys: Record<string, string[]>
  metadataPropKeys: Record<string, string[]>
  contractPropKeys: Record<string, string[]>
}

export function buildDriftInput(snapshot: GovernanceSystemSnapshot): DriftScanInput {
  return {
    tokenKeys: snapshot.tokenKeys,
    componentTokenRefs: snapshot.componentTokenRefs,
    metadataPropKeys: snapshot.metadataPropKeys,
    componentPropKeys: snapshot.componentPropKeys,
    contractPropKeys: snapshot.contractPropKeys,
  }
}

export function buildAlignmentInput(snapshot: GovernanceSystemSnapshot): {
  tokenKeys: string[]
  componentTokenRefs: Record<string, string[]>
  componentPropKeys: Record<string, string[]>
  metadataPropKeys: Record<string, string[]>
  contractPropKeys: Record<string, string[]>
} {
  return {
    tokenKeys: snapshot.tokenKeys,
    componentTokenRefs: snapshot.componentTokenRefs,
    componentPropKeys: snapshot.componentPropKeys,
    metadataPropKeys: snapshot.metadataPropKeys,
    contractPropKeys: snapshot.contractPropKeys,
  }
}

export function buildPipelineInput(
  change: SystemChange,
  snapshot: GovernanceSystemSnapshot
): GovernancePipelineInput {
  return {
    change,
    driftInput: buildDriftInput(snapshot),
    alignmentInput: buildAlignmentInput(snapshot),
  }
}

export function getVersioningContext(): { core: string; tokens: string; metadata: string; contracts: string } {
  return getSystemVersion()
}

export function getActiveRuleCount(): number {
  return getGovernanceRules().length
}
