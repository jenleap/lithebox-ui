import { describe, test, expect, beforeEach } from "vitest"
import {
  registerMigration,
  getMigrations,
  resolveMigrationChain,
  clearMigrationRegistry,
} from "../migrationRegistry"
import type { Migration } from "../types"

const m1: Migration = {
  fromVersion: "1.0.0",
  toVersion: "1.1.0",
  description: "additive change",
  changeType: "additive",
  apply: (x) => x,
}
const m2: Migration = {
  fromVersion: "1.1.0",
  toVersion: "2.0.0",
  description: "breaking change",
  changeType: "breaking",
  apply: (x) => x,
}

describe("migrationRegistry", () => {
  beforeEach(() => clearMigrationRegistry())

  test("getMigrations returns empty array initially", () => {
    expect(getMigrations()).toHaveLength(0)
  })

  test("registerMigration adds migration to registry", () => {
    registerMigration(m1)
    expect(getMigrations()).toHaveLength(1)
  })

  test("resolveMigrationChain returns [] when versions match", () => {
    expect(resolveMigrationChain("1.0.0", "1.0.0")).toEqual([])
  })

  test("resolveMigrationChain returns single-step chain", () => {
    registerMigration(m1)
    const chain = resolveMigrationChain("1.0.0", "1.1.0")
    expect(chain).toHaveLength(1)
    expect(chain[0].fromVersion).toBe("1.0.0")
  })

  test("resolveMigrationChain returns ordered two-step chain", () => {
    registerMigration(m1)
    registerMigration(m2)
    const chain = resolveMigrationChain("1.0.0", "2.0.0")
    expect(chain).toHaveLength(2)
    expect(chain[0].fromVersion).toBe("1.0.0")
    expect(chain[1].fromVersion).toBe("1.1.0")
  })

  test("resolveMigrationChain returns partial chain when path is incomplete", () => {
    registerMigration(m1)
    const chain = resolveMigrationChain("1.0.0", "2.0.0")
    expect(chain).toHaveLength(1)
    expect(chain[0].toVersion).toBe("1.1.0")
  })

  test("resolveMigrationChain returns [] when no migration registered", () => {
    const chain = resolveMigrationChain("1.0.0", "2.0.0")
    expect(chain).toEqual([])
  })
})
