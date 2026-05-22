import type { ComponentMetadata } from "../metadata/types"
import type { MetadataSnapshot } from "./types"

export function buildMetadataSnapshot(
  registry: Record<string, ComponentMetadata>
): MetadataSnapshot {
  const components: Record<string, unknown> = {}
  for (const [name, meta] of Object.entries(registry)) {
    components[name] = {
      name: meta.name,
      category: meta.category,
      description: meta.description,
      version: meta.version,
      propKeys: Object.keys(meta.props),
      slotKeys: meta.slots ? Object.keys(meta.slots) : [],
      states: meta.states ?? [],
      compositionRules: meta.composition,
    }
  }
  return { components: Object.freeze(components) }
}

export function getComponentMetadataEntry(
  snapshot: MetadataSnapshot,
  componentName: string
): unknown | undefined {
  return snapshot.components[componentName]
}

export function listRegisteredComponents(snapshot: MetadataSnapshot): string[] {
  return Object.keys(snapshot.components)
}
