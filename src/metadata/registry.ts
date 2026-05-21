import type { ComponentMetadata } from "./types"

const _registry: Record<string, ComponentMetadata> = {}

export function registerComponent(metadata: ComponentMetadata): void {
  _registry[metadata.name] = metadata
}

export function getComponent(name: string): ComponentMetadata | undefined {
  return _registry[name]
}

export function getAllComponents(): Readonly<Record<string, ComponentMetadata>> {
  return _registry
}

export function exportRegistryAsJSON(): string {
  return JSON.stringify(_registry, null, 2)
}
