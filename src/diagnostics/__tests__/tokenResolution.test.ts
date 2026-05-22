import { describe, it, expect } from "vitest"
import { buildTokenResolutionSnapshot, getTokensBySource, getTokenResolutionPath } from "../tokenResolution"

describe("buildTokenResolutionSnapshot", () => {
  it("maps all inputs into a frozen tokens record", () => {
    const snapshot = buildTokenResolutionSnapshot([
      { key: "color.primary", value: "#000", source: "default", path: ["color", "primary"] },
      { key: "color.accent", value: "#fff", source: "override", path: ["color", "accent"] },
    ])
    expect(snapshot.tokens["color.primary"].source).toBe("default")
    expect(snapshot.tokens["color.accent"].source).toBe("override")
    expect(Object.isFrozen(snapshot.tokens)).toBe(true)
  })

  it("returns empty tokens for empty input", () => {
    const snapshot = buildTokenResolutionSnapshot([])
    expect(Object.keys(snapshot.tokens)).toHaveLength(0)
  })

  it("clones path arrays", () => {
    const path = ["a", "b"]
    const snapshot = buildTokenResolutionSnapshot([
      { key: "x", value: "v", source: "theme", path },
    ])
    path.push("c")
    expect(snapshot.tokens["x"].path).toHaveLength(2)
  })
})

describe("getTokensBySource", () => {
  it("filters by source", () => {
    const snapshot = buildTokenResolutionSnapshot([
      { key: "a", value: "1", source: "theme", path: [] },
      { key: "b", value: "2", source: "default", path: [] },
    ])
    const themed = getTokensBySource(snapshot, "theme")
    expect(Object.keys(themed)).toEqual(["a"])
  })

  it("returns empty object when no tokens match source", () => {
    const snapshot = buildTokenResolutionSnapshot([
      { key: "a", value: "1", source: "default", path: [] },
    ])
    expect(Object.keys(getTokensBySource(snapshot, "mode"))).toHaveLength(0)
  })
})

describe("getTokenResolutionPath", () => {
  it("returns path for known token", () => {
    const snapshot = buildTokenResolutionSnapshot([
      { key: "x", value: "v", source: "mode", path: ["a", "b"] },
    ])
    expect(getTokenResolutionPath(snapshot, "x")).toEqual(["a", "b"])
  })

  it("returns undefined for unknown token", () => {
    const snapshot = buildTokenResolutionSnapshot([])
    expect(getTokenResolutionPath(snapshot, "unknown")).toBeUndefined()
  })
})
