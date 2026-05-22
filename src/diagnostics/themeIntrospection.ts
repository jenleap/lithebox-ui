import type { ThemeSnapshot } from "./types"

export type ThemeIntrospectionInput = {
  mode: "light" | "dark"
  systemPreference: "light" | "dark" | null
  overridden: boolean
}

export function buildThemeSnapshot(input: ThemeIntrospectionInput): ThemeSnapshot {
  return {
    mode: input.mode,
    systemPreference: input.systemPreference,
    overridden: input.overridden,
  }
}

export function isSystemAligned(snapshot: ThemeSnapshot): boolean {
  if (snapshot.systemPreference === null) return false
  return snapshot.mode === snapshot.systemPreference && !snapshot.overridden
}
