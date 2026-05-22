import type { TokenResolutionEntry, TokenResolutionSnapshot } from "./types"

export type RawTokenInput = {
  key: string
  value: string
  source: "default" | "override" | "theme" | "mode"
  path: string[]
}

export function buildTokenResolutionSnapshot(inputs: RawTokenInput[]): TokenResolutionSnapshot {
  const tokens: Record<string, TokenResolutionEntry> = {}
  for (const input of inputs) {
    tokens[input.key] = {
      value: input.value,
      source: input.source,
      path: [...input.path],
    }
  }
  return { tokens: Object.freeze(tokens) }
}

export function getTokensBySource(
  snapshot: TokenResolutionSnapshot,
  source: TokenResolutionEntry["source"]
): Record<string, TokenResolutionEntry> {
  const result: Record<string, TokenResolutionEntry> = {}
  for (const [key, entry] of Object.entries(snapshot.tokens)) {
    if (entry.source === source) result[key] = entry
  }
  return result
}

export function getTokenResolutionPath(
  snapshot: TokenResolutionSnapshot,
  tokenKey: string
): string[] | undefined {
  return snapshot.tokens[tokenKey]?.path
}
