import { describe, it, expect } from "vitest"
import {
  buildMetadataSnapshot,
  getComponentMetadataEntry,
  listRegisteredComponents,
} from "../metadataIntrospection"
import type { ComponentMetadata } from "../../metadata/types"

const makeMeta = (name: string): ComponentMetadata => ({
  name,
  category: "display",
  description: `${name} component`,
  props: { label: { type: "string", description: "label", required: false } },
  composition: {},
  version: "1.0.0",
})

describe("buildMetadataSnapshot", () => {
  it("creates entries for all registry components", () => {
    const snap = buildMetadataSnapshot({ Button: makeMeta("Button"), Card: makeMeta("Card") })
    expect(Object.keys(snap.components)).toContain("Button")
    expect(Object.keys(snap.components)).toContain("Card")
  })

  it("freezes the components map", () => {
    const snap = buildMetadataSnapshot({ Button: makeMeta("Button") })
    expect(Object.isFrozen(snap.components)).toBe(true)
  })

  it("includes propKeys in each entry", () => {
    const snap = buildMetadataSnapshot({ Button: makeMeta("Button") })
    const entry = snap.components["Button"] as Record<string, unknown>
    expect(entry.propKeys).toEqual(["label"])
  })

  it("returns empty components for empty registry", () => {
    const snap = buildMetadataSnapshot({})
    expect(Object.keys(snap.components)).toHaveLength(0)
  })
})

describe("getComponentMetadataEntry", () => {
  it("returns entry for known component", () => {
    const snap = buildMetadataSnapshot({ Button: makeMeta("Button") })
    expect(getComponentMetadataEntry(snap, "Button")).toBeDefined()
  })

  it("returns undefined for unknown component", () => {
    const snap = buildMetadataSnapshot({})
    expect(getComponentMetadataEntry(snap, "Unknown")).toBeUndefined()
  })
})

describe("listRegisteredComponents", () => {
  it("lists all component names", () => {
    const snap = buildMetadataSnapshot({ A: makeMeta("A"), B: makeMeta("B") })
    expect(listRegisteredComponents(snap)).toEqual(expect.arrayContaining(["A", "B"]))
  })

  it("returns empty array for empty registry", () => {
    const snap = buildMetadataSnapshot({})
    expect(listRegisteredComponents(snap)).toHaveLength(0)
  })
})
