import type { SystemVersion } from "./types"

const _version: SystemVersion = {
  core: "1.0.0",
  tokens: "1.0.0",
  metadata: "1.0.0",
  contracts: "1.0.0",
}

export function getSystemVersion(): Readonly<SystemVersion> {
  return { ..._version }
}

export function setSubsystemVersion(
  layer: keyof SystemVersion,
  version: string
): void {
  _version[layer] = version
}

export function getSubsystemVersion(layer: keyof SystemVersion): string {
  return _version[layer]
}

export function resetVersionRegistry(): void {
  _version.core = "1.0.0"
  _version.tokens = "1.0.0"
  _version.metadata = "1.0.0"
  _version.contracts = "1.0.0"
}
