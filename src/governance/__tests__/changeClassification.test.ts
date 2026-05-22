import { describe, it, expect, afterEach } from "vitest"
import {
  registerClassificationRule,
  classifyChange,
  classifyChanges,
  clearClassificationRules,
  registerDefaultClassificationRules,
  getClassificationRules,
} from "../changeClassification"
import type { SystemChange } from "../types"

afterEach(() => {
  clearClassificationRules()
})

const tokenChange: SystemChange = { id: "c1", description: "remove color.primary", scope: "token" }
const metaChange: SystemChange = { id: "c2", description: "update Button metadata", scope: "metadata" }
const safeChange: SystemChange = { id: "c3", description: "add color.accent", scope: "token" }

describe("changeClassification", () => {
  it("returns safe when no rules registered", () => {
    expect(classifyChange(tokenChange)).toBe("safe")
  })

  it("returns breaking when a breaking rule matches", () => {
    registerClassificationRule({
      id: "r1",
      description: "token removal is breaking",
      applies: c => c.scope === "token",
      classification: "breaking",
    })
    expect(classifyChange(tokenChange)).toBe("breaking")
  })

  it("returns sensitive when only sensitive rule matches", () => {
    registerClassificationRule({
      id: "r1",
      description: "metadata update is sensitive",
      applies: c => c.scope === "metadata",
      classification: "sensitive",
    })
    expect(classifyChange(metaChange)).toBe("sensitive")
  })

  it("breaking wins over sensitive when both match", () => {
    registerClassificationRule({ id: "r1", description: "s", applies: () => true, classification: "sensitive" })
    registerClassificationRule({ id: "r2", description: "b", applies: () => true, classification: "breaking" })
    expect(classifyChange(tokenChange)).toBe("breaking")
  })

  it("classifyChanges maps all changes", () => {
    registerClassificationRule({
      id: "r1",
      description: "token breaking",
      applies: c => c.scope === "token",
      classification: "breaking",
    })
    const map = classifyChanges([tokenChange, safeChange])
    expect(map.get("c1")).toBe("breaking")
    expect(map.get("c3")).toBe("breaking")
  })

  it("registerDefaultClassificationRules registers three rules", () => {
    registerDefaultClassificationRules()
    expect(getClassificationRules()).toHaveLength(3)
  })

  it("default rules: token remove is breaking", () => {
    registerDefaultClassificationRules()
    expect(classifyChange({ id: "x", description: "remove color.primary", scope: "token" })).toBe("breaking")
  })

  it("default rules: contract remove is breaking", () => {
    registerDefaultClassificationRules()
    expect(classifyChange({ id: "x", description: "remove variant prop", scope: "contract" })).toBe("breaking")
  })

  it("default rules: metadata update is sensitive", () => {
    registerDefaultClassificationRules()
    expect(classifyChange({ id: "x", description: "update Button description", scope: "metadata" })).toBe("sensitive")
  })
})
