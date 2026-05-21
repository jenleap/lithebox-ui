import { describe, it, expect } from "vitest"
import { registerComponent, getComponent, getAllComponents, exportRegistryAsJSON } from "../registry"
import type { ComponentMetadata } from "../types"

const testMeta: ComponentMetadata = {
  name: "TestComp",
  category: "display",
  description: "Test component",
  props: {},
  composition: {},
  version: "1.0.0",
}

describe("component registry", () => {
  it("stores component metadata under its name", () => {
    registerComponent(testMeta)
    expect(getComponent("TestComp")).toBe(testMeta)
  })

  it("returns undefined for unregistered components", () => {
    expect(getComponent("NonExistent")).toBeUndefined()
  })

  it("overwrites previous entry when registering the same name twice", () => {
    const updated: ComponentMetadata = { ...testMeta, description: "Updated" }
    registerComponent(updated)
    expect(getComponent("TestComp")?.description).toBe("Updated")
  })

  it("getAllComponents returns an object containing registered components", () => {
    const all = getAllComponents()
    expect(all["TestComp"]).toBeDefined()
  })

  it("exportRegistryAsJSON returns a parseable JSON string", () => {
    registerComponent(testMeta)
    const json = exportRegistryAsJSON()
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it("exportRegistryAsJSON output contains the registered component name as a key", () => {
    registerComponent(testMeta)
    const parsed = JSON.parse(exportRegistryAsJSON())
    expect(parsed["TestComp"]).toBeDefined()
  })
})
