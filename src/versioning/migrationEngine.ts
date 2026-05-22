import type { MigrationResult, VersioningMode } from "./types"
import { resolveMigrationChain } from "./migrationRegistry"

export type MigrationEngineOptions = {
  mode?: VersioningMode
}

export function detectVersionMismatch(
  currentVersion: string,
  targetVersion: string
): boolean {
  return currentVersion !== targetVersion
}

export function applyMigrations(
  input: unknown,
  fromVersion: string,
  toVersion: string,
  options: MigrationEngineOptions = {}
): MigrationResult {
  if (!detectVersionMismatch(fromVersion, toVersion)) {
    return { success: true, output: input, migrationsApplied: [] }
  }

  const chain = resolveMigrationChain(fromVersion, toVersion)

  if (chain.length === 0) {
    return {
      success: false,
      output: input,
      migrationsApplied: [],
      error: `No migration path found from ${fromVersion} to ${toVersion}`,
    }
  }

  const migrationsApplied: string[] = []
  let current = input

  for (const migration of chain) {
    try {
      const transformed = migration.apply(current)

      if (migration.validate && !migration.validate(transformed)) {
        return {
          success: false,
          output: current,
          migrationsApplied,
          error: `Migration validation failed: ${migration.fromVersion} → ${migration.toVersion}`,
        }
      }

      current = transformed
      migrationsApplied.push(`${migration.fromVersion} → ${migration.toVersion}`)
    } catch (err) {
      return {
        success: false,
        output: current,
        migrationsApplied,
        error: `Migration threw during ${migration.fromVersion} → ${migration.toVersion}: ${String(err)}`,
      }
    }
  }

  return { success: true, output: current, migrationsApplied }
}
