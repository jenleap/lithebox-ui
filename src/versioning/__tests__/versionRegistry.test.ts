import { describe, test, expect, beforeEach } from "vitest"
import {
  getSystemVersion,
  setSubsystemVersion,
  getSubsystemVersion,
  resetVersionRegistry,
} from "../versionRegistry"

describe("versionRegistry", () => {
  beforeEach(() => resetVersionRegistry())

  test("getSystemVersion returns all four layers", () => {
    const v = getSystemVersion()
    expect(v).toHaveProperty("core")
    expect(v).toHaveProperty("tokens")
    expect(v).toHaveProperty("metadata")
    expect(v).toHaveProperty("contracts")
  })

  test("getSystemVersion default values are 1.0.0", () => {
    const v = getSystemVersion()
    expect(v.core).toBe("1.0.0")
    expect(v.tokens).toBe("1.0.0")
    expect(v.metadata).toBe("1.0.0")
    expect(v.contracts).toBe("1.0.0")
  })

  test("setSubsystemVersion updates only the specified layer", () => {
    setSubsystemVersion("tokens", "2.0.0")
    expect(getSubsystemVersion("tokens")).toBe("2.0.0")
    expect(getSubsystemVersion("core")).toBe("1.0.0")
    expect(getSubsystemVersion("metadata")).toBe("1.0.0")
    expect(getSubsystemVersion("contracts")).toBe("1.0.0")
  })

  test("getSystemVersion returns a copy — mutation does not affect registry", () => {
    const v = getSystemVersion() as Record<string, string>
    v["core"] = "99.0.0"
    expect(getSubsystemVersion("core")).toBe("1.0.0")
  })

  test("resetVersionRegistry restores all defaults", () => {
    setSubsystemVersion("core", "3.0.0")
    setSubsystemVersion("tokens", "3.0.0")
    resetVersionRegistry()
    expect(getSubsystemVersion("core")).toBe("1.0.0")
    expect(getSubsystemVersion("tokens")).toBe("1.0.0")
  })
})
