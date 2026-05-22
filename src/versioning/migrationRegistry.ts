import type { Migration, MigrationChain } from "./types"

const _migrations: Migration[] = []

export function registerMigration(migration: Migration): void {
  _migrations.push(migration)
}

export function getMigrations(): readonly Migration[] {
  return _migrations
}

export function resolveMigrationChain(
  fromVersion: string,
  toVersion: string
): MigrationChain {
  if (fromVersion === toVersion) return []

  const chain: Migration[] = []
  let current = fromVersion

  while (current !== toVersion) {
    const next = _migrations.find((m) => m.fromVersion === current)
    if (!next) break
    chain.push(next)
    current = next.toVersion
    if (current === toVersion) break
  }

  return chain
}

export function clearMigrationRegistry(): void {
  _migrations.length = 0
}
