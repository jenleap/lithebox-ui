export type {
  SystemVersion,
  ChangeType,
  Migration,
  MigrationChain,
  MigrationResult,
  DeprecationStatus,
  DeprecationNotice,
  CompatibilityReport,
  CompatibilityIssue,
  VersioningMode,
} from "./types"

export {
  getSystemVersion,
  setSubsystemVersion,
  getSubsystemVersion,
  resetVersionRegistry,
} from "./versionRegistry"

export {
  registerMigration,
  getMigrations,
  resolveMigrationChain,
  clearMigrationRegistry,
} from "./migrationRegistry"

export {
  detectVersionMismatch,
  applyMigrations,
} from "./migrationEngine"
export type { MigrationEngineOptions } from "./migrationEngine"

export {
  registerDeprecation,
  getDeprecationNotice,
  getAllDeprecations,
  warnIfDeprecated,
  clearDeprecationRegistry,
} from "./deprecationSystem"

export { validateTokenCompatibility } from "./tokenCompatibility"
export type { TokenRenameMap, TokenCompatibilityOptions } from "./tokenCompatibility"

export { validateMetadataCompatibility } from "./metadataCompatibility"
export type { MetadataFieldRenameMap, MetadataCompatibilityOptions } from "./metadataCompatibility"

export { validateContractCompatibility } from "./contractCompatibility"
export type { PropSnapshot, ContractSnapshot } from "./contractCompatibility"

export {
  checkRuntimeVersions,
  runCompatibilityGuard,
} from "./runtimeVersioning"
export type { RuntimeVersionCheckResult } from "./runtimeVersioning"
