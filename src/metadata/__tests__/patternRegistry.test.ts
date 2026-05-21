import { describe, it, expect } from "vitest"
import { registerPattern, getPattern, getAllPatterns, exportPatternsAsJSON } from "../patternRegistry"
import type { UIPattern } from "../types"

const testPattern: UIPattern = {
  name: "TestPattern",
  description: "Test pattern",
  structure: ["Box", "  Text"],
  components: ["Box", "Text"],
  usage: ["Use for testing"],
}

describe("pattern registry", () => {
  it("stores a pattern under its name", () => {
    registerPattern(testPattern)
    expect(getPattern("TestPattern")).toBe(testPattern)
  })

  it("returns undefined for unregistered patterns", () => {
    expect(getPattern("NonExistent")).toBeUndefined()
  })

  it("overwrites previous entry when registering the same name twice", () => {
    const updated: UIPattern = { ...testPattern, description: "Updated" }
    registerPattern(updated)
    expect(getPattern("TestPattern")?.description).toBe("Updated")
  })

  it("getAllPatterns returns an object containing registered patterns", () => {
    const all = getAllPatterns()
    expect(all["TestPattern"]).toBeDefined()
  })

  it("exportPatternsAsJSON returns a parseable JSON string", () => {
    registerPattern(testPattern)
    const json = exportPatternsAsJSON()
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it("exportPatternsAsJSON output contains the registered pattern name as a key", () => {
    registerPattern(testPattern)
    const parsed = JSON.parse(exportPatternsAsJSON())
    expect(parsed["TestPattern"]).toBeDefined()
  })

  it("includes all four built-in patterns after module import", async () => {
    await import("../patternRegistry")
    const all = getAllPatterns()
    expect(all["AnalyticsKPIRow"]).toBeDefined()
    expect(all["SettingsFormLayout"]).toBeDefined()
    expect(all["DashboardHeader"]).toBeDefined()
    expect(all["DataTableToolbar"]).toBeDefined()
  })
})
