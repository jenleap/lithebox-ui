import type { DeprecationNotice, VersioningMode } from "./types"

const _notices: Map<string, DeprecationNotice> = new Map()

export function registerDeprecation(notice: DeprecationNotice): void {
  _notices.set(notice.feature, notice)
}

export function getDeprecationNotice(feature: string): DeprecationNotice | undefined {
  return _notices.get(feature)
}

export function getAllDeprecations(): readonly DeprecationNotice[] {
  return Array.from(_notices.values())
}

export function warnIfDeprecated(
  feature: string,
  mode: VersioningMode = "development"
): void {
  if (mode !== "development") return

  const notice = _notices.get(feature)
  if (!notice) return
  if (notice.status === "active") return

  const parts = [`[LBX deprecation] "${notice.feature}": ${notice.message}`]
  if (notice.replacement) parts.push(`Use "${notice.replacement}" instead.`)
  if (notice.removedIn) parts.push(`Will be removed in v${notice.removedIn}.`)

  console.warn(parts.join(" "))
}

export function clearDeprecationRegistry(): void {
  _notices.clear()
}
