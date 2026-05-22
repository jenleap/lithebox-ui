import { describe, test, expect, beforeEach, vi } from "vitest"
import {
  registerDeprecation,
  getDeprecationNotice,
  getAllDeprecations,
  warnIfDeprecated,
  clearDeprecationRegistry,
} from "../deprecationSystem"

describe("deprecationSystem", () => {
  beforeEach(() => clearDeprecationRegistry())

  test("getDeprecationNotice returns undefined for unknown feature", () => {
    expect(getDeprecationNotice("Unknown")).toBeUndefined()
  })

  test("registerDeprecation stores notice by feature", () => {
    registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
    expect(getDeprecationNotice("OldButton")).toBeDefined()
  })

  test("getAllDeprecations returns all registered notices", () => {
    registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
    registerDeprecation({ feature: "OldInput", deprecatedIn: "1.1.0", message: "Use NewInput", status: "deprecated" })
    expect(getAllDeprecations()).toHaveLength(2)
  })

  test("warnIfDeprecated does not warn for active features", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "active" })
    warnIfDeprecated("OldButton", "development")
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  test("warnIfDeprecated emits console.warn for deprecated features in development mode", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
    warnIfDeprecated("OldButton", "development")
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("[LBX deprecation]"))
    warn.mockRestore()
  })

  test("warnIfDeprecated includes replacement and removedIn when provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    registerDeprecation({
      feature: "OldButton",
      deprecatedIn: "1.0.0",
      removedIn: "2.0.0",
      replacement: "NewButton",
      message: "Use NewButton",
      status: "deprecated",
    })
    warnIfDeprecated("OldButton", "development")
    const message = warn.mock.calls[0][0] as string
    expect(message).toContain("NewButton")
    expect(message).toContain("2.0.0")
    warn.mockRestore()
  })

  test("warnIfDeprecated is silent in production mode", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    registerDeprecation({ feature: "OldButton", deprecatedIn: "1.0.0", message: "Use NewButton", status: "deprecated" })
    warnIfDeprecated("OldButton", "production")
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  test("warnIfDeprecated is silent for unknown features", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    warnIfDeprecated("Nonexistent", "development")
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})
