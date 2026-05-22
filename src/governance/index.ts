export type {
  GovernanceScope,
  GovernanceSeverity,
  GovernanceRule,
  GovernancePolicy,
  PolicyCategory,
  ChangeClassification,
  SystemChange,
  DriftType,
  DriftIssue,
  DriftReport,
  AlignmentLayer,
  AlignmentIssue,
  AlignmentReport,
  GovernanceViolation,
  GovernanceResult,
  IntegrityLayer,
  IntegrityIssue,
  IntegrityReport,
} from "./types"

export {
  registerGovernanceRule,
  getGovernanceRules,
  getRulesByScope,
  runGovernanceRules,
  clearGovernanceRules,
} from "./rulesEngine"

export {
  validateTokenIntegrity,
  validateComponentIntegrity,
  validateMetadataIntegrity,
  validateContractIntegrity,
} from "./integrityModel"
export type {
  TokenSnapshot,
  ComponentSnapshot,
  MetadataSnapshot,
  ContractSnapshot,
} from "./integrityModel"

export {
  detectTokenDrift,
  detectComponentDrift,
  detectMetadataDrift,
  detectContractDrift,
  scanForDrift,
} from "./driftDetection"
export type { DriftScanInput } from "./driftDetection"

export {
  validateTokenComponentAlignment,
  validateComponentMetadataAlignment,
  validateMetadataContractAlignment,
  validateCrossSystemAlignment,
} from "./alignmentRules"

export {
  registerGovernancePolicy,
  getPoliciesByCategory,
  getAllPolicies,
  evaluatePolicy,
  evaluatePoliciesByCategory,
  clearPolicyRegistry,
} from "./policySystem"
export type { RegisteredPolicy } from "./policySystem"

export {
  registerClassificationRule,
  getClassificationRules,
  classifyChange,
  classifyChanges,
  clearClassificationRules,
  registerDefaultClassificationRules,
} from "./changeClassification"
export type { ClassificationRule } from "./changeClassification"

export { runGovernancePipeline } from "./validationPipeline"
export type { GovernancePipelineInput } from "./validationPipeline"

export {
  buildDriftInput,
  buildAlignmentInput,
  buildPipelineInput,
  getVersioningContext,
  getActiveRuleCount,
} from "./integration"
export type { GovernanceSystemSnapshot } from "./integration"
