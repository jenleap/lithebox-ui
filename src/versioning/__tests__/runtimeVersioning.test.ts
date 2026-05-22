import { describe, test, expect, beforeEach, vi } from "vitest"
import { checkRuntimeVersions, runCompatibilityGuard } from "../runtimeVersioning"
import { resetVersionRegistry } from "../versionRegistry"
import type { SystemVersion } from "../types"

const defaultExpected: SystemVersion = {
  core: "1.0.0",
  tokens: "1.0.0",
  metadata: "1.0.0",
  contracts: "1.0.0",
}

describe("checkRuntimeVersions", () => {
  beforeEach(() => resetVersionRegistry())

  test("returns no mismatches when all versions match", () => {
    const result = checkRuntimeVersions(defaultExpected)
    expect(result.anyMismatch).toBe(false)
    expect(Object.keys(result.mismatches)).toHaveLength(0)
  })

  test("detects mismatch on a single layer", () => {
    const result = checkRuntimeVersions({ ...defaultExpected, core: "2.0.0" })
    expect(result.anyMismatch).toBe(true)
    expect(result.mismatches.core).toBe(true)
    expect(result.mismatches.tokens).toBeUndefined()
  })

  test("emits console.warn in development mode for mismatches", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    checkRuntimeVersions({ ...defaultExpected, core: "2.0.0" }, "development")
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("[LBX version]"))
    warn.mockRestore()
  })

  test("is silent in production mode", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    checkRuntimeVersions({ ...defaultExpected, core: "2.0.0" }, "production")
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  test("detects mismatches on multiple layers", () => {
    const result = checkRuntimeVersions({ core: "2.0.0", tokens: "2.0.0", metadata: "1.0.0", contracts: "1.0.0" })
    expect(result.mismatches.core).toBe(true)
    expect(result.mismatches.tokens).toBe(true)
    expect(result.mismatches.metadata).toBeUndefined()
  })
})

describe("runCompatibilityGuard", () => {
  test("is a no-op when report is compatible", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    runCompatibilityGuard({ compatible: true, issues: [] }, "development")
    expect(warn).not.toHaveBeenCalled()
    expect(error).not.toHaveBeenCalled()
    warn.mockRestore()
    error.mockRestore()
  })

  test("is a no-op in production mode even when incompatible", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    runCompatibilityGuard({
      compatible: false,
      issues: [{ code: "LBX_TOKEN_REMOVED", severity: "error", message: "Token removed", layer: "tokens" }],
    }, "production")
    expect(warn).not.toHaveBeenCalled()
    expect(error).not.toHaveBeenCalled()
    warn.mockRestore()
    error.mockRestore()
  })

  test("logs errors with console.error in development mode", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    runCompatibilityGuard({
      compatible: false,
      issues: [{ code: "LBX_TOKEN_REMOVED", severity: "error", message: "Token removed", layer: "tokens" }],
    }, "development")
    expect(error).toHaveBeenCalledWith(expect.stringContaining("[LBX compat]"))
    error.mockRestore()
  })

  test("logs warnings with console.warn in development mode", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    runCompatibilityGuard({
      compatible: false,
      issues: [{ code: "LBX_TOKEN_RENAMED", severity: "warning", message: "Token renamed", layer: "tokens" }],
    }, "development")
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("[LBX compat]"))
    warn.mockRestore()
  })
})
