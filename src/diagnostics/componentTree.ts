import type { ComponentTreeSnapshot } from "./types"

export type ComponentTreeInput = {
  id: string
  type: string
  props: Record<string, unknown>
  children?: ComponentTreeInput[]
}

export function buildComponentTreeSnapshot(input: ComponentTreeInput): ComponentTreeSnapshot {
  return {
    id: input.id,
    type: input.type,
    props: Object.freeze({ ...input.props }),
    children: input.children?.map(buildComponentTreeSnapshot),
  }
}

export function flattenComponentTree(snapshot: ComponentTreeSnapshot): ComponentTreeSnapshot[] {
  const result: ComponentTreeSnapshot[] = [snapshot]
  if (snapshot.children) {
    for (const child of snapshot.children) {
      result.push(...flattenComponentTree(child))
    }
  }
  return result
}

export function findComponentById(
  snapshot: ComponentTreeSnapshot,
  id: string
): ComponentTreeSnapshot | undefined {
  if (snapshot.id === id) return snapshot
  if (snapshot.children) {
    for (const child of snapshot.children) {
      const found = findComponentById(child, id)
      if (found) return found
    }
  }
  return undefined
}
