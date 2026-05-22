import { describe, test, expect, beforeEach } from "vitest"
import { applyMigrations, detectVersionMismatch } from "../migrationEngine"
import { registerMigration, clearMigrationRegistry } from "../migrationRegistry"

describe("migrationEngine", () => {
  beforeEach(() => clearMigrationRegistry())

  test("detectVersionMismatch returns false when versions match", () => {
    expect(detectVersionMismatch("1.0.0", "1.0.0")).toBe(false)
  })

  test("detectVersionMismatch returns true when versions differ", () => {
    expect(detectVersionMismatch("1.0.0", "2.0.0")).toBe(true)
  })

  test("applyMigrations returns success with no migrations when versions match", () => {
    const result = applyMigrations({ data: 1 }, "1.0.0", "1.0.0")
    expect(result.success).toBe(true)
    expect(result.migrationsApplied).toHaveLength(0)
    expect(result.output).toEqual({ data: 1 })
  })

  test("applyMigrations returns failure when no path exists", () => {
    const result = applyMigrations({}, "1.0.0", "2.0.0")
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/No migration path/)
  })

  test("applyMigrations applies transformations in chain order", () => {
    registerMigration({
      fromVersion: "1.0.0",
      toVersion: "1.1.0",
      description: "",
      changeType: "additive",
      apply: (x: unknown) => ({ ...(x as object), step1: true }),
    })
    registerMigration({
      fromVersion: "1.1.0",
      toVersion: "2.0.0",
      description: "",
      changeType: "breaking",
      apply: (x: unknown) => ({ ...(x as object), step2: true }),
    })
    const result = applyMigrations({}, "1.0.0", "2.0.0")
    expect(result.success).toBe(true)
    expect((result.output as Record<string, boolean>).step1).toBe(true)
    expect((result.output as Record<string, boolean>).step2).toBe(true)
    expect(result.migrationsApplied).toHaveLength(2)
  })

  test("applyMigrations aborts when migration validate returns false", () => {
    registerMigration({
      fromVersion: "1.0.0",
      toVersion: "1.1.0",
      description: "",
      changeType: "additive",
      apply: (x) => x,
      validate: () => false,
    })
    const result = applyMigrations({}, "1.0.0", "1.1.0")
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/validation failed/)
    expect(result.migrationsApplied).toHaveLength(0)
  })

  test("applyMigrations returns failure when migration throws", () => {
    registerMigration({
      fromVersion: "1.0.0",
      toVersion: "1.1.0",
      description: "",
      changeType: "additive",
      apply: () => { throw new Error("boom") },
    })
    const result = applyMigrations({}, "1.0.0", "1.1.0")
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/boom/)
  })
})
